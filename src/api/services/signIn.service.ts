import { IRequestOptions, IResponse, RequestParams } from "types/api/apiClient.types";
import { ILoginResponse, IUserCredentials } from "types/user/user.types";
import { apiConfig } from "api/config/apiConfig";
import apiClient from "api/apiClients/apiClient";
import { logStep } from "utils/reporter/decorators/logStep";

class SignInService {
  @logStep("Sign in via API")
  async login(params: RequestParams<IUserCredentials>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Login,
      options: {
        method: "post",
        headers: {},
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest<ILoginResponse>(options);
  }
}
export default new SignInService();
