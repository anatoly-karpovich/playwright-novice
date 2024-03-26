import fieldsToHideInReport from "../../data/report/fieldsToHideInReport.js";
import { IRequestOptions, IResponse } from "../../types/api/apiClient.types.js";
import { hideValueInObject } from "../../utils/object/index.js";
import { logApiStep } from "../../utils/reporter/decorators/logApiStep.js";
import { BaseReporter } from "../../utils/reporter/reporters/baseReporter.js";

export abstract class BaseApiClient {
  protected response;
  protected options: IRequestOptions;
  protected request;

  /**
   * Transforms requestOptions from IRequestOptions to satisfy the api client options type based on the requestType field of requestOptions
   */
  protected abstract transformRequestOptions(): void;

  /**
   * Transforms response to IResponse
   */
  protected abstract transformResponse(): Promise<void>;

  /**
   * Sends request with provided options
   */
  protected abstract send(): Promise<object>;

  /**
   * Logs api errors to console
   * @param error error from your api client
   */
  protected abstract logError(error: any): void;

  // constructor(private reporterService: BaseReporter, private loggerService: Logger) {}
  constructor(private reporterService: BaseReporter) {}

  /**
   * Sends request with provided request IRequestOptions and returns response as IResponse interface
   * @param initOptions Request options like url, method and etc from IRequestOptions interface
   * @returns
   */
  @logApiStep()
  async sendRequest<T>(initOptions: IRequestOptions): Promise<IResponse<T>> {
    try {
      this.options = initOptions;
      if (!this.options) throw new Error(`Request options were not provided`);
      this.transformRequestOptions();
      this.response = await this.send();
      await this.transformResponse();
    } catch (error: any) {
      if (error.response) this.logError(error);
      if (this.response.status >= 500) {
        throw new Error(`Failed to send request. Reason:\n ${(error as Error).message}`);
      }
      this.transformResponse();
    } finally {
      this.secureCheck();
      this.logRequest();
    }
    return this.response;
  }

  private secureCheck() {
    fieldsToHideInReport.forEach((f) => this.options && hideValueInObject(this.options, f));
  }

  private logRequest() {
    this.reporterService.reportApiRequest(this.options!, this.response);
  }
}
