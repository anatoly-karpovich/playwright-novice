import productService from "api/services/product.service";
import signInService from "api/services/signIn.service";
import CustomerService from "api/services/customers.service";
import OrdersService from "api/services/orders.service";

export class SalesPortalServices {
  SignInService = signInService;
  ProductService = productService;
  CustomerService = CustomerService;
  OrderService = OrdersService;
}
