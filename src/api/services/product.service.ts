import { IRequestOptions, Id, RequestParams } from "types/api/apiClient.types";
import { IProduct, IProductFromResponse, IProductResponse, IProductsResponse } from "types/products/product.types";
import { apiConfig } from "api/config/apiConfig";
import apiClient from "api/apiClients/apiClient";
import { logStep } from "utils/reporter/decorators/logStep";

class ProductsService {
  @logStep("Get product via API")
  async getById(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Product By Id"](params.data._id),
      options: {
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
      },
      requestType: "json",
    };
    return apiClient.sendRequest<IProductResponse>(options);
  }

  @logStep("Get all products via API")
  async getAll(params: Partial<RequestParams<Id>>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Products,
      options: {
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
      },
      requestType: "json",
    };
    return apiClient.sendRequest<IProductsResponse>(options);
  }

  @logStep("Create product via API")
  async create(params: RequestParams<IProduct>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Products,
      options: {
        method: "post",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest<IProductResponse>(options);
  }

  @logStep("Update product via API")
  async update(params: RequestParams<IProductFromResponse>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Products,
      options: {
        method: "put",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest<IProductResponse>(options);
  }

  @logStep("Delete product via API")
  async delete(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Product By Id"](params.data._id),
      options: {
        method: "delete",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest<null>(options);
  }
}

export default new ProductsService();
