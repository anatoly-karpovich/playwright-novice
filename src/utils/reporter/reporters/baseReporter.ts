import { IRequestOptions, IResponse } from "../../../types/api/apiClient.types.js";

export abstract class BaseReporter {
  protected requestOptions: IRequestOptions;
  protected response: IResponse;

  /**
   * Attaches api request data to the report
   */
  protected abstract reportApiRequestData(): void;

  /**
   * Attaches api response data to the report
   */
  protected abstract reportApiResponseData(): void;

  /**
   * Attaches logs from Logger to report
   */
  public abstract attachLog(log: string): void;

  /**
   * Attaches request and response data to report
   * @param requestOptions Request options provided to api client
   * @param response Response received from api client
   */
  public reportApiRequest(requestOptions: IRequestOptions, response: IResponse): void {
    this.requestOptions = requestOptions;
    this.response = response;
    this.reportApiRequestData();
    this.reportApiResponseData();
  }
}
