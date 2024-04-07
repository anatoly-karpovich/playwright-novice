import apiClient from "api/apiClients/apiClient";
import { apiConfig } from "api/config/apiConfig";
import { IRequestOptions, Id, RequestParams } from "types/api/apiClient.types";
import { ICustomer, ICustomerFromResponse, ICustomerResponse, ICustomersResponse } from "types/customers/customers.types";
import { logStep } from "utils/reporter/decorators/logStep";

class CustomerService {
  @logStep("Get customer via API")
  async getById(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Customer By Id"](params.data._id),
      options: {
        method: "get",
        headers: { Authorization: `Bearer ${params.token}` },
      },
      requestType: "json",
    };
    return apiClient.sendRequest<ICustomerResponse>(options);
  }

  @logStep("Get all customers via API")
  async getAll(params: Partial<RequestParams<Id>>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Customers,
      options: {
        method: "get",
        headers: { Authorization: `Bearer ${params.token}` },
      },
      requestType: "json",
    };
    return apiClient.sendRequest<ICustomersResponse>(options);
  }

  @logStep("Create customer via API")
  async create(params: Required<RequestParams<ICustomer>>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Customers,
      options: {
        method: "post",
        headers: { Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest<ICustomerResponse>(options);
  }

  @logStep("Update customer via API")
  async update(params: Required<RequestParams<ICustomerFromResponse>>) {
    const options: IRequestOptions<ICustomer> = {
      url: apiConfig.baseURL + apiConfig.endpoints.Customers,
      options: {
        method: "put",
        headers: { Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest<ICustomerResponse>(options);
  }

  @logStep("Delete customer via API")
  async delete(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints["Customer By Id"](params.data._id),
      options: {
        method: "delete",
        headers: { Authorization: `Bearer ${params.token}` },
        data: params.data,
      },
      requestType: "json",
    };
    return apiClient.sendRequest<null>(options);
  }
}

export default new CustomerService();
