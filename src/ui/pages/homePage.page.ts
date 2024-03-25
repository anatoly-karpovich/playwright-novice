import { SalesPortalPage } from "./salesPortal.page.js";

export class HomePage extends SalesPortalPage {
  readonly "Products button" = this.findElement("#products-from-home");

  async openProductsPage() {
    await this.click(this["Products button"]);
    await this.waitForSpinnerToHide();
  }
}
