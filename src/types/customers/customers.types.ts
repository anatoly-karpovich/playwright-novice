import { IResponseFields } from "types/api/apiClient.types";

export const COUNTRIES = ["USA", "Canada", "Belarus", "Ukraine", "Germany", "France", "Great Britain", "USA"] as const;

export interface ICustomer {
  email: string;
  name: string;
  country: (typeof COUNTRIES)[number];
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  notes?: string;
}

export interface ICustomerFromResponse extends ICustomer {
  _id: string;
  createdOn: string;
}

export interface ICustomerResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
}

export interface ICustomersResponse extends IResponseFields {
  Customers: ICustomerFromResponse[];
}
