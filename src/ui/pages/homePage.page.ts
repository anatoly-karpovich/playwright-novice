import { logStep } from "utils/reporter/decorators/logStep";
import { SalesPortalPage } from "ui/pages/salesPortal.page";

export class HomePage extends SalesPortalPage {
  readonly "Products button" = this.findElement("#products-from-home");

  @logStep("Open Products Page")
  async openProductsPage() {
    await this.click(this["Products button"]);
    await this.waitForSpinnerToHide();
  }
}
