import { test as base } from "fixtures/common/apiSteps.fixture";
import { Users } from "utils/entities/index";
import { DELIVERY_CONDITIONS, IDelivery, IOrderData, IOrderFromResponse, ORDER_STATUSES } from "types/orders/order.types";

interface IOrderCreationData<T extends ORDER_STATUSES> {
  status: T;
  customerId?: string;
  productsIds?: string[];
  delivery: T extends ORDER_STATUSES.DRAFT | ORDER_STATUSES.CANCELED ? IDelivery | DELIVERY_CONDITIONS | undefined : IDelivery | DELIVERY_CONDITIONS;
}

interface CustomerFixture {
  createOrderViaApi: <T extends ORDER_STATUSES>(orderCreationData: IOrderCreationData<T>, token?: string) => Promise<IOrderFromResponse>;
}

export const test = base.extend<CustomerFixture>({
  createOrderViaApi: async ({ apiSteps }, use) => {
    let createdOrder: IOrderFromResponse;
    const createdOrderViaApi = async <T extends ORDER_STATUSES>(orderCreationData: IOrderCreationData<T>, token?: string) => {
      const order: Partial<IOrderData> = {};
      if (orderCreationData.customerId) order.customer = orderCreationData.customerId;
      if (orderCreationData.productsIds) order.products = orderCreationData.productsIds;
      switch (orderCreationData.status) {
        case ORDER_STATUSES.DRAFT: {
          createdOrder = await apiSteps.OrderApiSteps.createOrderWithDraftStatus(order, orderCreationData.delivery, token);
          break;
        }
        case ORDER_STATUSES.CANCELED: {
          createdOrder = await apiSteps.OrderApiSteps.createOrderWithCanceledStatus(order, orderCreationData.delivery, token);
          break;
        }
        case ORDER_STATUSES.IN_PROCESS: {
          createdOrder = await apiSteps.OrderApiSteps.createOrderWithInProcessStatus(order, orderCreationData.delivery, token);
          break;
        }
        case ORDER_STATUSES.PARTIALLY_RECEIVED: {
          createdOrder = await apiSteps.OrderApiSteps.createOrderWithPartiallyReceivedStatus(order, orderCreationData.delivery, token);
          break;
        }
        case ORDER_STATUSES.RECEIVED: {
          createdOrder = await apiSteps.OrderApiSteps.createOrderWithReceivedStatus(order, orderCreationData.delivery, token);
          break;
        }
      }
      return createdOrder;
    };

    await use(createdOrderViaApi);
    if (createdOrder!) await apiSteps.OrderApiSteps.deleteOrderWithNestedCustomerAndProducts(createdOrder, Users.getToken());
  },
});
