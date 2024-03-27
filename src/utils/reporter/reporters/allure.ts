import { BaseReporter } from "./baseReporter.js";
import { allure } from "allure-playwright";
import * as rimraf from "rimraf";

class AllureReporter extends BaseReporter {
  protected async reportApiRequestData(): Promise<void> {
    await allure.step(`Request: ${this.requestOptions?.options.method?.toUpperCase()} ${this.requestOptions?.url}`, async () => {
      await allure.attachment("Request Headers", JSON.stringify(this.requestOptions?.options.headers, null, 2), "application/json");
      await allure.attachment("Request Body", this.requestOptions?.options.data ? JSON.stringify(this.requestOptions?.options.data, null, 2) : "{}", "application/json");
    });
  }

  protected async reportApiResponseData(): Promise<void> {
    await allure.step(`Response: ${this.requestOptions?.options.method?.toUpperCase()} ${this.requestOptions?.url}`, async () => {
      await allure.attachment("Response Headers", JSON.stringify(this.response?.headers, null, 2), "application/json");
      await allure.attachment("Response Body", this.requestOptions?.options.data ? JSON.stringify(this.requestOptions?.options.data, null, 2) : "{}", "application/json");
    });
  }

  attachLog(log: string) {
    // allure.addAttachment("Test Log", log, "text/plain");
    //TBD
  }

  clearReportResults() {
    rimraf.sync("src/report/allure-results");
  }
}

export default new AllureReporter();
