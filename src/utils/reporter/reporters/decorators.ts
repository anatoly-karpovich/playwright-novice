import Logger from "../logger/logger.js";
import allure from "@wdio/allure-reporter";
import { Status } from "allure-js-commons";
import { hideSecretData } from "../string/index.js";
import { IRequestOptions, IResponse } from "../../types/api/apiClient.types.js";
import fieldsToHideInReport from "../../data/fieldsToHideInReport.js";
import _ from "lodash";
import { hideValueInObject } from "../object/index.js";
import ENVIRONMENT from "../../config/environment.js";

export function logStep(stepName: string): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    if (descriptor && ENVIRONMENT.FRAMEWORK === "wdio") {
      const originalMethod = descriptor?.value;
      descriptor.value = async function (...args: any[]) {
        const selector = args[0]; // Extract the selector from the arguments
        const value = args[1]; // Extract the value from the arguments
        const isSecretArgument = args.find((el) => typeof el === "object" && "isSecretValue" in el);
        const isSecretValue = isSecretArgument ? isSecretArgument.isSecretValue : false;
        let newStepName = stepName.replace("{selector}", `"${selector}"`).replace("{text}", `"${isSecretValue ? hideSecretData(value) : value}"`);
        allure.startStep(newStepName);
        try {
          const result = await originalMethod.apply(this, args);
          allure.endStep();
          return result;
        } catch (error) {
          allure.endStep(Status.FAILED);
          throw error;
        }
      };
      return descriptor;
    }
  };
}

export function logApiStep(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const options: IRequestOptions = _.cloneDeep(args[0]);
    fieldsToHideInReport.forEach((f) => hideValueInObject(options, f));
    allure.startStep(`Request: ${options.method?.toUpperCase()} ${options.url}`);
    allure.addAttachment("Request Headers", JSON.stringify(options.headers, null, 2), "application/json");
    allure.addAttachment("Request Body", options.data ? JSON.stringify(options.data, null, 2) : {}, "application/json");
    allure.endStep();
    Logger.logApiRequest(JSON.stringify(options));
    try {
      const response: IResponse = await originalMethod.apply(this, args);

      allure.startStep(`Response: ${response.status} ${options.url}`);
      allure.addAttachment("Response Headers", JSON.stringify(response.headers, null, 2), "application/json");
      allure.addAttachment("Response Body", JSON.stringify(response.data, null, 2), "application/json");

      allure.endStep(response.status >= 400 ? Status.FAILED : Status.PASSED);

      Logger.logApiResponse(JSON.stringify({ status: response.status, body: response.data }));

      return response;
    } catch (error) {
      allure.endStep(Status.FAILED);
      throw error;
    }
  };

  return descriptor;
}

export function attachScreenshotToReport(screenshot: string) {
  allure.addAttachment("Screenshot", Buffer.from(screenshot, "base64"), "image/png");
}

export function attachLog(log: string) {
  allure.addAttachment("Test Log", log, "text/plain");
}
