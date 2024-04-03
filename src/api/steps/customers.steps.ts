import customerService from "api/services/customers";
import { HTTP_STATUS_CODES } from "data/http/statusCodes";
import { generateNewCustomer } from "data/customers/customerGeneration";
import { ICustomer, ICustomerFromResponse } from "types/customers/customers.types";
import { Customers, Users } from "utils/entities";
import { validateResponse } from "utils/validations/apiValidation";

class CustomerApiSteps {
  async createCustomer(customer?: ICustomer, token?: string) {
    const customerData = generateNewCustomer(customer);
    const createdCustomer = await customerService.create({ data: customerData, token: token ?? Users.getToken() });
    validateResponse(createdCustomer, HTTP_STATUS_CODES.CREATED, true, null);
    Customers.addCustomer(createdCustomer.data.Customer);
    return createdCustomer.data.Customer;
  }

  async updateCustomer(customer: ICustomerFromResponse, token?: string) {
    const createdCustomer = await customerService.update({ data: customer, token: token ?? Users.getToken() });
    validateResponse(createdCustomer, HTTP_STATUS_CODES.OK, true, null);
    Customers.updateCustomer(createdCustomer.data.Customer);
    return createdCustomer.data.Customer;
  }

  async getCustomerById(id: string, token?: string) {
    const customer = await customerService.getById({ data: { _id: id }, token: token ?? Users.getToken() });
    validateResponse(customer, HTTP_STATUS_CODES.OK, true, null);
    return customer;
  }

  async getAllCustomers(token?: string) {
    const customers = await customerService.getAll({ token: token ?? Users.getToken() });
    validateResponse(customers, HTTP_STATUS_CODES.OK, true, null);
    return customers;
  }

  async deleteCustomer(id: string, token?: string) {
    const response = await customerService.delete({ data: { _id: id }, token: token ?? Users.getToken() });
    validateResponse(response, HTTP_STATUS_CODES.DELETED);
    Customers.removeCustomer(id);
  }

  async deleteAllCreatedCustomersDuringTest(token?: string) {
    const customers = Customers.getAllCreatedCustomers();
    for (const customer of customers) {
      await this.deleteCustomer(customer._id, token);
    }
  }
}

export default new CustomerApiSteps();
