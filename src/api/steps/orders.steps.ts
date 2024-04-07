import { DELIVERY_CONDITIONS, IDelivery, IOrderData, IOrderFromResponse, ORDER_STATUSES } from "types/orders/order.types";
import customersApiSteps from "api/steps/customers.steps";
import productsApiSteps from "api/steps/products.steps";
import ordersService from "api/services/orders.service";
import { Orders, Users } from "utils/entities";
import { validateResponse } from "utils/validations/apiValidation";
import { HTTP_STATUS_CODES } from "data/http/statusCodes";
import { generateDelivery } from "data/orders/deliveryGeneration";
import { isDelivery } from "utils/typeGuards/orders";
import customersService from "api/services/customers.service";
import { logStep } from "utils/reporter/decorators/logStep";

type DeliveryData = IDelivery | DELIVERY_CONDITIONS | undefined;

class OrderApiSteps {
  @logStep("Create Draft order")
  async createOrderWithDraftStatus(orderData: Partial<IOrderData>, deliveryData?: DeliveryData, token?: string): Promise<IOrderFromResponse> {
    const data: IOrderData = {
      customer: orderData?.customer ? orderData.customer : (await customersApiSteps.createCustomer())._id,
      products: [],
    };
    if (!orderData.products) {
      for (let i = 0; i < 5; i++) {
        data.products.push((await productsApiSteps.createProduct())._id);
      }
    } else data.products.push(...orderData.products);
    const order = await ordersService.create({ data, token: token ?? Users.getToken() });
    validateResponse(order, HTTP_STATUS_CODES.CREATED, true, null);
    if (deliveryData) {
      const delivery = isDelivery(deliveryData) ? deliveryData : generateDelivery(deliveryData);
      const orderWithDelivery = await ordersService.addDelivery({ data: { _id: order.data.Order._id, delivery }, token: token ?? Users.getToken() });
      validateResponse(orderWithDelivery, HTTP_STATUS_CODES.OK, true, null);
      Orders.addOrder(order.data.Order);
      return orderWithDelivery.data.Order;
    }
    return order.data.Order;
  }

  @logStep("Create In Process order via API")
  async createOrderWithInProcessStatus(orderData: Partial<IOrderData>, deliveryData: DeliveryData, token?: string) {
    const createdOrder = await this.createOrderWithDraftStatus(orderData, deliveryData, token);
    const order = await ordersService.updateStatus({ data: { _id: createdOrder._id, status: ORDER_STATUSES.IN_PROCESS }, token: token ?? Users.getToken() });
    validateResponse(order, HTTP_STATUS_CODES.OK, true, null);
    Orders.addOrder(order.data.Order);
    return order.data.Order;
  }

  @logStep("Create Partially Received order via API")
  async createOrderWithPartiallyReceivedStatus(orderData: Partial<IOrderData>, deliveryData: DeliveryData, token?: string) {
    if (orderData.products && orderData.products.length < 2) throw new Error("Unable to create Partially Received order with less then 2 products");
    const createdOrder = await this.createOrderWithInProcessStatus(orderData, deliveryData, token);
    const order = await ordersService.receiveProducts({ data: { _id: createdOrder._id, products: [createdOrder.products[0]._id] }, token: token ?? Users.getToken() });
    validateResponse(order, HTTP_STATUS_CODES.OK, true, null);
    Orders.addOrder(order.data.Order);
    return order.data.Order;
  }

  @logStep("Create Received order via API")
  async createOrderWithReceivedStatus(orderData: Partial<IOrderData>, deliveryData: DeliveryData, token?: string) {
    if (orderData.products && orderData.products.length < 2) throw new Error("Unable to create Partially Received order with less then 2 products");
    const createdOrder = await this.createOrderWithInProcessStatus(orderData, deliveryData, token);
    const order = await ordersService.receiveProducts({ data: { _id: createdOrder._id, products: createdOrder.products.map((p) => p._id) }, token: token ?? Users.getToken() });
    validateResponse(order, HTTP_STATUS_CODES.OK, true, null);
    Orders.addOrder(order.data.Order);
    return order.data.Order;
  }

  @logStep("Create Canceled order via API")
  async createOrderWithCanceledStatus(orderData: Partial<IOrderData>, deliveryData?: DeliveryData, token?: string) {
    let createdOrder: IOrderFromResponse;
    deliveryData ? (createdOrder = await this.createOrderWithDraftStatus(orderData, deliveryData, token)) : (createdOrder = await this.createOrderWithDraftStatus(orderData, undefined, token));
    const order = await ordersService.updateStatus({ data: { _id: createdOrder._id, status: ORDER_STATUSES.CANCELED }, token });
    validateResponse(order, HTTP_STATUS_CODES.OK, true, null);
    Orders.addOrder(order.data.Order);
    return order.data.Order;
  }

  @logStep("Update order status via API")
  async updateOrderStatus(orderId: string, status: ORDER_STATUSES.CANCELED | ORDER_STATUSES.IN_PROCESS, token?: string) {
    const order = await ordersService.updateStatus({ data: { _id: orderId, status }, token });
    validateResponse(order, HTTP_STATUS_CODES.OK, true, null);
    Orders.addOrder(order.data.Order);
    return order.data.Order;
  }

  @logStep("Delete order via API")
  async deleteOrder(orderId: string, token?: string) {
    const deleteResponse = await ordersService.delete({ data: { _id: orderId }, token });
    validateResponse(deleteResponse, HTTP_STATUS_CODES.DELETED);
    Orders.removeOrder(orderId);
  }

  @logStep("Delete order with nested customer and products via API")
  async deleteOrderWithNestedCustomerAndProducts(order: IOrderFromResponse, token?: string) {
    await this.deleteOrder(order._id, token);
    await customersApiSteps.deleteCustomer(order.customer._id, token);
    await productsApiSteps.deleteAllCreatedProductsDuringTest(token);
  }
}

export default new OrderApiSteps();
