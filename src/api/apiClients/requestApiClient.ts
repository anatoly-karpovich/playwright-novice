import { request } from "@playwright/test";
import { BaseApiClient } from "api/apiClients/baseApiClient";
import ReporterService from "utils/reporter/reporters/reporter";
class RequestApiClient extends BaseApiClient {
  protected async send() {
    const apiContext = await request.newContext();
    const resp = await apiContext.fetch(this.options!.url, this.options!.options);
    apiContext.dispose();
    return resp;
  }

  protected transformRequestOptions() {
    if (this.options?.requestType === "formData") {
      //TBD
    }
  }

  protected async transformResponse() {
    const transformedResponse = {
      data: this.options!.options.method === "delete" ? null : await this.response.json(),
      status: this.response.status(),
      headers: this.response.headers(),
    };
    this.response = transformedResponse;
  }

  protected logError(error: any) {
    console.log("Error", error.message);
    console.log("Request URL:", this.options!.options.method, this.options?.url);
  }
}

export default new RequestApiClient(ReporterService);
