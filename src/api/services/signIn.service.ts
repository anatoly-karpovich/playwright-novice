import { IRequestOptions, IResponse, RequestParams } from "../../types/api/apiClient.types.js";
import { ILoginResponse, IUserCredentials } from "../../types/user/user.types.js";
import { apiConfig } from "../config/apiConfig.js";
import apiClient from "../apiClients/apiClient.js";

class SignInService {
  async login(params: RequestParams<IUserCredentials>): Promise<IResponse<ILoginResponse>> {
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
