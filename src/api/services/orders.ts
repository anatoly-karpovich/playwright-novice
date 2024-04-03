import apiClient from "api/apiClients/apiClient";
import { apiConfig } from "api/config/apiConfig";
import { IRequestOptions, Id, RequestParams } from "types/api/apiClient.types";
import { IOrderData, IOrderDataWithId, IOrderResponse, IOrdersResponse } from "types/orders/order.types";
import { logStep } from "utils/reporter/decorators/logStep";

class OrdersService {
  @logStep("Get order via API")
  async getById(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Order By Id"](params.data._id),
      options: {
        method: "get",
        headers: { Authorization: `Bearer ${params.token}` },
      },
      requestType: "json",
    };
    return apiClient.sendRequest<IOrderResponse>(options);
  }

  @logStep("Get orders via API")
  async getAll(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Orders"],
      options: {
        method: "get",
        headers: { Authorization: `Bearer ${params.token}` },
      },
      requestType: "json",
    };
    return apiClient.sendRequest<IOrdersResponse>(options);
  }

  @logStep("Create order via API")
  async create(params: RequestParams<IOrderData>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Orders"],
      options: {
        method: "post",
        headers: { Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest<IOrderResponse>(options);
  }

  @logStep("Update order via API")
  async update(params: RequestParams<IOrderDataWithId>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Order By Id"](params.data._id),
      options: {
        method: "put",
        headers: { Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest<IOrderResponse>(options);
  }

  @logStep("Delete order via API")
  async delete(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Order By Id"](params.data._id),
      options: {
        method: "delete",
        headers: { Authorization: `Bearer ${params.token}` },
      },
      requestType: "json",
    };
    return apiClient.sendRequest<null>(options);
  }
}

export default new OrdersService();
