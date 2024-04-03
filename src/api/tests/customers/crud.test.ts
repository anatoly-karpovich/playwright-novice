import { expect, test } from "fixtures/common/services.fixture";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "config/environment";
import { validateResponse } from "utils/validations/apiValidation";
import { HTTP_STATUS_CODES } from "data/http/statusCodes";
import { ICustomerFromResponse } from "types/customers/customers.types";
import { generateNewCustomer } from "data/customers/customerGeneration";

test.describe("[API]. [Customers]", () => {
  const createdCustomers: ICustomerFromResponse[] = [];
  let token: string = "";

  test.beforeAll(async ({ services }) => {
    const signInResponse = await services.SignInService.login({ data: { username: ADMIN_USERNAME, password: ADMIN_PASSWORD } });
    token = signInResponse.data.token;
  });

  test("Create smoke customer", async ({ services }) => {
    const customerData = generateNewCustomer();
    const response = await services.CustomerService.create({ data: customerData, token });
    createdCustomers.push(response.data.Customer);
    validateResponse(response, HTTP_STATUS_CODES.CREATED, true, null);
    expect(response.data.Customer).toMatchObject({ ...customerData, _id: response.data.Customer._id });
  });

  test.afterAll(async ({ services }) => {
    for (const customer of createdCustomers) {
      await services.CustomerService.delete({ data: { _id: customer._id }, token });
    }
  });
});
