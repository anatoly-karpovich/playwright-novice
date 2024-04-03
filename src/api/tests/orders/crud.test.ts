import { test } from "fixtures/common/services.fixture";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "config/environment";
import { validateResponse } from "utils/validations/apiValidation";
import { HTTP_STATUS_CODES } from "data/http/statusCodes";
import { ICustomerFromResponse } from "types/customers/customers.types";
import { generateNewCustomer } from "data/customers/customerGeneration";
import { IOrderData, IOrderFromResponse } from "types/orders/order.types";
import { IProductFromResponse } from "types/products/product.types";
import { generateNewProduct } from "data/products/productGeneration";

test.describe("[API]. [Orders]", () => {
  const createdOrders: IOrderFromResponse[] = [];
  const createdCustomers: ICustomerFromResponse[] = [];
  const createdProducts: IProductFromResponse[] = [];
  let token: string = "";

  test.beforeAll(async ({ services }) => {
    const signInResponse = await services.SignInService.login({ data: { username: ADMIN_USERNAME, password: ADMIN_PASSWORD } });
    token = signInResponse.data.token;
  });

  test("Create smoke order", async ({ services }) => {
    const customerData = generateNewCustomer();
    const customerResponse = await services.CustomerService.create({ data: customerData, token });
    createdCustomers.push(customerResponse.data.Customer);
    const products = [];
    for (let i = 0; i < 5; i++) {
      const productData = generateNewProduct();
      const productResponse = await services.ProductService.create({ data: productData, token });
      products.push(productResponse.data.Product);
    }
    createdProducts.push(...products);
    const orderData: IOrderData = {
      customer: customerResponse.data.Customer._id,
      products: products.map((p) => p._id),
    };
    const response = await services.OrderService.create({ data: orderData, token });
    createdOrders.push(response.data.Order);
    validateResponse(response, HTTP_STATUS_CODES.CREATED, true, null);
  });

  test.afterEach(async ({ services }) => {
    for (const order of createdOrders) {
      await services.OrderService.delete({ data: { _id: order._id }, token });
    }
    createdOrders.length = 0;

    for (const customer of createdCustomers) {
      await services.CustomerService.delete({ data: { _id: customer._id }, token });
    }
    createdCustomers.length = 0;

    for (const product of createdProducts) {
      await services.ProductService.delete({ data: { _id: product._id }, token });
    }
    createdProducts.length = 0;
  });
});
