import customerApisSteps from "api/steps/customers.steps";
import productsApiSteps from "api/steps/products.steps";
import signInApiSteps from "api/steps/signIn.steps";
import ordersApisSteps from "./orders.steps";

class SalesPortalApiSteps {
  ProductApiSteps = productsApiSteps;
  CustomerApiSteps = customerApisSteps;
  SignInApiSteps = signInApiSteps;
  OrderApiSteps = ordersApisSteps;
}

export default new SalesPortalApiSteps();
