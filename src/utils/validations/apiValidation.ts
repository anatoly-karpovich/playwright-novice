import Ajv from "ajv";
import { expect } from "@playwright/test";
import { IResponse } from "../../types/api/apiClient.types";
import { HTTP_STATUS_CODES } from "../../data/http/statusCodes";

export function validateResponseWithSchema(response: IResponse, schema: object, status: number, IsSuccess?: boolean, ErrorMessage?: null | string) {
  validateSchema(response, schema);
  validateResponse(response, status, IsSuccess, ErrorMessage);
}

export function validateResponse(response: IResponse, status: HTTP_STATUS_CODES, IsSuccess?: boolean, ErrorMessage?: null | string) {
  expect(response.status).toBe(status);
  if (IsSuccess) expect(response.data.IsSuccess).toBe(IsSuccess);
  if (ErrorMessage) expect(response.data.ErrorMessage).toBe(ErrorMessage);
}

export function validateSchema(response: IResponse, schema: object) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValidSchema = validate(response.data);
  // if (!isValidSchema) {
  //   Logger.log(JSON.stringify(validate.errors), "error");
  // }
  expect(isValidSchema).toBe(true);
}
