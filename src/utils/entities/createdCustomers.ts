import { ICustomerFromResponse } from "types/customers/customers.types";

export class CreatedCustomers {
  private static instance: CreatedCustomers;
  private customers: ICustomerFromResponse[] = [];

  constructor() {
    if (CreatedCustomers.instance) {
      return CreatedCustomers.instance;
    }
    CreatedCustomers.instance = this;
  }

  addCustomer(customer: ICustomerFromResponse) {
    const storedCustomer = this.customers.find((p) => p._id === customer._id);
    if (storedCustomer) {
      this.updateCustomer(customer);
    } else {
      this.customers.push(customer);
    }
  }

  updateCustomer(customer: ICustomerFromResponse) {
    const customerIndex = this.findEnitiIndexById(customer._id);
    this.customers[customerIndex] = customer;
  }

  getCustomer(id?: string) {
    if (id) {
      const customerIndex = this.findEnitiIndexById(id);
      return this.customers[customerIndex];
    }
    return this.customers.at(-1);
  }

  getAllCreatedCustomers() {
    return this.customers;
  }

  removeCustomer(id?: string) {
    this.customers.splice(id ? this.findEnitiIndexById(id) : this.customers.length - 1, 1);
  }

  private findEnitiIndexById(customerId: string) {
    return this.customers.findIndex((p) => p._id === customerId);
  }
}
