import { logStep } from "../../utils/reporter/decorators/logStep.js";
import { SalesPortalPage } from "./salesPortal.page.js";

export class HomePage extends SalesPortalPage {
  readonly "Products button" = this.findElement("#products-from-home");

  @logStep("Open Products Page")
  async openProductsPage() {
    await this.click(this["Products button"]);
    await this.waitForSpinnerToHide();
  }
}
