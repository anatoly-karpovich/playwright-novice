import type { IOrderFromResponse } from "types/orders/order.types.js";

export class CreatedOrders {
  private static instance: CreatedOrders;
  private orders: IOrderFromResponse[] = [];

  constructor() {
    if (CreatedOrders.instance) {
      return CreatedOrders.instance;
    }
    CreatedOrders.instance = this;
  }

  addOrder(order: IOrderFromResponse) {
    const storedOrder = this.orders.find((p) => p._id === order._id);
    if (storedOrder) {
      this.updateOrder(order);
    } else {
      this.orders.push(order);
    }
  }

  updateOrder(order: IOrderFromResponse) {
    const orderIndex = this.findOrderIndexById(order._id);
    this.orders[orderIndex] = order;
  }

  getOrder(id?: string) {
    if (id) {
      const orderIndex = this.findOrderIndexById(id);
      return this.orders[orderIndex];
    }
    return this.orders.at(-1);
  }

  getAllCreatedOrders() {
    return this.orders;
  }

  removeOrder(id?: string) {
    this.orders.splice(id ? this.findOrderIndexById(id) : this.orders.length - 1, 1);
  }

  private findOrderIndexById(orderId: string) {
    return this.orders.findIndex((o) => o._id === orderId);
  }
}
