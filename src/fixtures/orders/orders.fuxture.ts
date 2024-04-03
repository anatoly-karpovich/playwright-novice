import { test as testServices, expect } from "fixtures/common/services.fixture";
import { test as testCustomer } from "fixtures/customers/customers.fixture";
import { test as testProduct } from "fixtures/products/products.fixture";
import { Users } from "utils/entities/index";
import { HTTP_STATUS_CODES } from "data/http/statusCodes";
import { IOrderData, IOrderFromResponse } from "types/orders/order.types";
import { mergeTests } from "@playwright/test";

const base = mergeTests(testServices, testCustomer, testProduct);

interface CustomerFixture {
  createOrderViaApi: (numberOfProducts: number, token?: string) => Promise<IOrderFromResponse>;
}

export const test = base.extend<CustomerFixture>({
  createOrderViaApi: async ({ services, createCustomerViaApi, createProductViaApi }, use) => {
    let createdOrder;
    const createdOrderViaApi = async (numberOfProducts: number, token?: string) => {
      if (numberOfProducts < 0 || numberOfProducts > 5) {
        throw new Error(`Unable to create order with ${numberOfProducts} products`);
      }
      const customer = (await createCustomerViaApi())._id;
      const products: string[] = [];
      for (let i = 0; i < numberOfProducts; i++) {
        const product = await createProductViaApi();
        products.push(product._id);
      }
      const data: IOrderData = { customer, products };
      const response = await services.OrderService.create({ data, token: token ?? Users.getToken() });
      expect(response.status).toBe(HTTP_STATUS_CODES.CREATED);
      createdOrder = response.data.Order;
      return response.data.Order;
    };

    await use(createdOrderViaApi);
    if (createdOrder) await services.OrderService.delete({ data: { _id: (createdOrder as IOrderFromResponse)._id }, token: Users.getToken() });
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
