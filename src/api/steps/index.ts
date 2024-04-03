import customerApisSteps from "api/steps/customers.steps";
import productsApiSteps from "api/steps/products.steps";
import signInApiSteps from "api/steps/signIn.steps";

class SalesPortalApiSteps {
  ProductApiSteps = productsApiSteps;
  CustomerApiSteps = customerApisSteps;
  SignInApiSteps = signInApiSteps;
}

export default new SalesPortalApiSteps();
