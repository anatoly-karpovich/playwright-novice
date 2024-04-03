import { logStep } from "utils/reporter/decorators/logStep";
import { SalesPortalPage } from "ui/pages/salesPortal.page";

export class HomePage extends SalesPortalPage {
  readonly "Products button" = this.findElement("#products-from-home");
  readonly "Orders button" = this.findElement("#orders-from-home");
  readonly "Customers button" = this.findElement("#customers-from-home");

  @logStep("Open Products Page")
  async openProductsPage() {
    await this.click(this["Products button"]);
    await this.waitForSpinnerToHide();
  }

  @logStep("Open Products Page")
  async openCustomersPage() {
    await this.click(this["Customers button"]);
    await this.waitForSpinnerToHide();
  }

  @logStep("Open Products Page")
  async openOrdersPage() {
    await this.click(this["Orders button"]);
    await this.waitForSpinnerToHide();
  }
}
