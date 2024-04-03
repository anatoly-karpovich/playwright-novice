import { test as base, expect } from "fixtures/common/services.fixture";
import { Users } from "utils/entities/index";
import { HTTP_STATUS_CODES } from "data/http/statusCodes";
import { generateNewCustomer } from "data/customers/customerGeneration";
import { ICustomer, ICustomerFromResponse } from "types/customers/customers.types";

interface CustomerFixture {
  createCustomerViaApi: (customer?: ICustomer, token?: string) => Promise<ICustomerFromResponse>;
  // getProductById: (productId: string, token?: string) => Promise<IProductFromResponse>;
  // getAllProducts: (token?: string) => Promise<IProductFromResponse[]>;
  // deleteProduct: (productId: string, token?: string) => Promise<void>;
}

export const test = base.extend<CustomerFixture>({
  createCustomerViaApi: async ({ services }, use) => {
    let createdCustomer;
    const createdCustomerViaApi = async (customer?: ICustomer, token?: string) => {
      const data = generateNewCustomer(customer);
      const response = await services.CustomerService.create({ data, token: token ?? Users.getToken() });
      expect(response.status).toBe(HTTP_STATUS_CODES.CREATED);
      createdCustomer = response.data.Customer;
      return response.data.Customer;
    };

    await use(createdCustomerViaApi);
    if (createdCustomer) await services.CustomerService.delete({ data: { _id: (createdCustomer as ICustomerFromResponse)._id }, token: Users.getToken() });
  },

  // getProductById: async ({ services }, use) => {
  //   const receivedProduct = async (productId: string, token?: string) => {
  //     const productResponse = await services.ProductService.getById({ data: { _id: productId }, token: token ?? Users.getToken() });
  //     expect(productResponse.status).toBe(HTTP_STATUS_CODES.OK);
  //     return productResponse.data.Customer;
  //   };
  //   await use(receivedProduct);
  // },

  // getAllProducts: async ({ services }, use) => {
  //   const receivedProducts = async (token?: string) => {
  //     const productsResponse = await services.ProductService.getAll({ token: token ?? Users.getToken() });
  //     expect(productsResponse.status).toBe(HTTP_STATUS_CODES.OK);
  //     return productsResponse.data.Products;
  //   };
  //   await use(receivedProducts);
  // },

  // deleteProduct: async ({ services }, use) => {
  //   const deletedProduct = async (productId: string, token?: string) => {
  //     const deleteResponse = await services.ProductService.delete({ data: { _id: productId }, token: token ?? Users.getToken() });
  //     expect(deleteResponse.status).toBe(HTTP_STATUS_CODES.DELETED);
  //   };
  //   await use(deletedProduct);
  // },
});
