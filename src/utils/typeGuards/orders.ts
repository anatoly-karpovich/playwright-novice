import { DELIVERY_CONDITIONS, IDelivery } from "types/orders/order.types";

export function isDelivery(deliveryData: IDelivery | DELIVERY_CONDITIONS): deliveryData is IDelivery {
  return typeof deliveryData === "object";
}
