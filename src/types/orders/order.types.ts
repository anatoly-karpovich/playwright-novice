import { IResponseFields } from "types/api/apiClient.types";
import { COUNTRIES, ICustomerFromResponse } from "types/customers/customers.types";
import { IProductFromResponse } from "types/products/product.types";

export enum ORDER_STATUSES {
  DRAFT = "Draft",
  IN_PROCESS = "In Process",
  PARTIALLY_RECEIVED = "Partially Received",
  RECEIVED = "Received",
  CANCELED = "Canceled",
}

export enum ORDER_HISTORY_ACTIONS {
  CREATED = "Order created",
  CUSTOMER_CHANGED = "Customer changed",
  REQUIRED_PRODUCTS_CHANGED = "Requested products changed",
  PROCESSED = "Order processing started",
  DELIVERY_SCHEDULED = "Delivery Scheduled",
  DELIVERY_EDITED = "Delivery Edited",
  RECEIVED = "Received",
  RECEIVED_ALL = "All products received",
  CANCELED = "Order canceled",
}

export enum DELIVERY_CONDITIONS {
  DELIVERY = "Delivery",
  PICK_UP = "Pickup",
}

export interface IDelivery {
  finalDate: string;
  condition: DELIVERY_CONDITIONS;
  address: {
    country: (typeof COUNTRIES)[number];
    city: string;
    street: string;
    house: number;
    flat: number;
  };
}

export interface IHistory {
  readonly action: ORDER_HISTORY_ACTIONS;
  readonly status: string;
  readonly customer: string;
  readonly products: IProductFromResponse[];
  readonly delivery: IDelivery | null;
  readonly total_price: number;
  readonly changedOn: string;
}

export interface ICommentFromResponse {
  readonly _id: string;
  readonly text: string;
  readonly createdOn: string;
}

export interface IAddCommentRequest {
  _id: string;
  comments: {
    text: string;
  };
}

export interface IOrderData {
  customer: string;
  products: string[];
}

export interface IOrderDataWithId extends IOrderData {
  _id: string;
}

export interface IOrderStatus {
  _id: string;
  status: ORDER_STATUSES.CANCELED | ORDER_STATUSES.IN_PROCESS;
}

export interface IOrder {
  readonly status: ORDER_STATUSES;
  readonly customer: ICustomerFromResponse;
  readonly products: IProductFromResponse[];
  readonly delivery: IDelivery | null;
  readonly total_price: number;
  readonly createdOn: string;
  readonly history: IHistory[];
  readonly comments: ICommentFromResponse[];
}

export interface IOrderFromResponse extends IOrder {
  readonly _id: string;
}

export interface IOrderResponse extends IResponseFields {
  Order: IOrderFromResponse;
}

export interface IOrdersResponse extends IResponseFields {
  Orders: IOrderFromResponse[];
}
