import { IRequestOptions, IResponse, Id, RequestParams } from "../../types/api/apiClient.types.js";
import { IProduct, IProductResponse } from "../../types/products/product.types.js";
import { apiConfig } from "../config/apiConfig.js";
import apiClient from "../apiClients/apiClient.js";

class ProductsService {
  async get(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Product By Id"](params.data._id),
      options: {
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
      },
      requestType: "json",
    };
    return apiClient.sendRequest(options);
  }

  async getAll(params: Partial<RequestParams<Id>>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Products,
      options: {
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
      },
      requestType: "json",
    };
    return apiClient.sendRequest(options);
  }

  async create(params: RequestParams<IProduct>): Promise<IResponse<IProductResponse>> {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Products,
      options: {
        method: "post",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest(options);
  }

  async update(params: RequestParams<IProduct>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Products,
      options: {
        method: "put",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest(options);
  }

  async delete(params: RequestParams<Id>): Promise<IResponse<null>> {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Product By Id"](params.data._id),
      options: {
        method: "delete",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest(options);
  }
}

export default new ProductsService();
