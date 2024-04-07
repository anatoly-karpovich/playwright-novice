import apiClient from "api/apiClients/apiClient";
import { apiConfig } from "api/config/apiConfig";
import { IRequestOptions, Id, RequestParams } from "types/api/apiClient.types";
import { IAddCommentRequest, IDelivery, IOrderData, IOrderDataWithId, IOrderResponse, IOrderStatus, IOrdersResponse } from "types/orders/order.types";
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

  @logStep("Update order status via API")
  async updateStatus(params: RequestParams<IOrderStatus>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Order Status"],
      options: {
        method: "put",
        headers: { Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest<IOrderResponse>(options);
  }

  @logStep("Add or update delivery for order via API")
  async addDelivery(params: RequestParams<Id & { delivery: IDelivery }>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Order Delivery"],
      options: {
        method: "post",
        headers: { Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest<IOrderResponse>(options);
  }

  @logStep("Receive orders for order via API")
  async receiveProducts(params: RequestParams<Id & { products: string[] }>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Order Receive"],
      options: {
        method: "post",
        headers: { Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest<IOrderResponse>(options);
  }

  @logStep("Add comment for order via API")
  async addComment(params: RequestParams<IAddCommentRequest>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Order Comments"],
      options: {
        method: "post",
        headers: { Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest<IOrderResponse>(options);
  }

  @logStep("Delete comment from order via API")
  async deleteComment(params: RequestParams<Id & { comments: Id }>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Order Comments"],
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
