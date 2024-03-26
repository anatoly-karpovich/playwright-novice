import { logStep } from "../../../utils/reporter/decorators/logStep.js";
import { SalesPortalPage } from "../salesPortal.page.js";

export class ProductsListPage extends SalesPortalPage {
  readonly "Add new product button" = this.findElement("button.page-title-header");
  private readonly "Table row selector" = (productName: string) => `//tr[./td[text()="${productName}"]]`;
  readonly "Name by product name" = (productName: string) => this.findElement(`${this["Table row selector"](productName)}/td[1]`);
  readonly "Price by product name" = (productName: string) => this.findElement(`${this["Table row selector"](productName)}/td[2]`);
  readonly "Manufacturer by product name" = (productName: string) => this.findElement(`${this["Table row selector"](productName)}/td[3]`);
  readonly "Created by product name" = (productName: string) => this.findElement(`${this["Table row selector"](productName)}/td[4]`);
  private readonly "Actions by product name selector" = (productName: string) => `${this["Table row selector"](productName)}/td[5]`;
  readonly "Details button by product name" = (productName: string) => this.findElement(`${this["Actions by product name selector"](productName)}/button[@title="Details"]`);
  readonly "Edit button by product name" = (productName: string) => this.findElement(`${this["Actions by product name selector"](productName)}/button[@title="Edit"]`);
  readonly "Delete button by product name" = (productName: string) => this.findElement(`${this["Actions by product name selector"](productName)}/button[@title="Delete"]`);

  @logStep("Open Add New Product Page")
  async openAddNewProductPage() {
    await this["Add new product button"].click();
    await this.waitForPageIsLoaded();
  }

  @logStep("Open Product Details Modal")
  async openDetailsModalForCreatedProduct(productName: string) {
    await this.click(this["Details button by product name"](productName));
    await this.waitForPageIsLoaded();
  }

  @logStep("Open Edit Product Modal")
  async openEditProductModalForCreatedProduct(productName: string) {
    await this.click(this["Edit button by product name"](productName));
    await this.waitForPageIsLoaded();
  }

  @logStep("Open Delete Product Modal")
  async openDeleteProductModalForCreatedProduct(productName: string) {
    await this.click(this["Delete button by product name"](productName));
    await this.waitForPageIsLoaded();
  }
}
