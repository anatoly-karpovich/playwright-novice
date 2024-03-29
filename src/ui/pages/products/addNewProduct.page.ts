import { apiConfig } from "api/config/apiConfig";
import { IProduct, IProductResponse } from "types/products/product.types";
import { SalesPortalPage } from "ui/pages/salesPortal.page";
import { validateResponse } from "utils/validations/apiValidation";
import { HTTP_STATUS_CODES } from "data/http/statusCodes";
import { Products } from "utils/entities/index";
import { logStep } from "utils/reporter/decorators/logStep";
import { NOTIFICATION_MESSAGES } from "data/notifications";

export class AddNewProductPage extends SalesPortalPage {
  readonly "Name input" = this.findElement(`#inputName`);
  readonly "Manufacturer dropdown" = this.findElement(`#inputManufacturer`);
  readonly "Price input" = this.findElement(`#inputPrice`);
  readonly "Amount input" = this.findElement(`#inputAmount`);
  readonly "Notes input" = this.findElement(`#textareaNotes`);
  readonly "Save New Product button" = this.findElement(`#save-new-product`);

  @logStep("Fill in New Product inputs")
  async fillProductInputs(product: IProduct) {
    await this.setValue(this["Name input"], product.name);
    await this.selectDropdownValue(this["Manufacturer dropdown"], product.manufacturer);
    await this.setValue(this["Price input"], `${product.price}`);
    await this.setValue(this["Amount input"], `${product.amount}`);

    if (product.notes) {
      await this.setValue(this["Notes input"], product.notes);
    }
  }

  @logStep(`Click on Save New Product button`)
  async clickOnSaveNewProductButton() {
    await this.click(this["Save New Product button"]);
  }

  @logStep("Create New Product")
  async createProduct(product: IProduct) {
    await this.fillProductInputs(product);
    const response = await this.interceptCreateProductResponse();
    await this.waitForSpinnerToHide();
    await this.verifyAndCloseNotification(NOTIFICATION_MESSAGES.PRODUCT_CREATED);
    Products.addProduct(response.data.Product);
  }

  private async interceptCreateProductResponse() {
    const url = apiConfig.baseURL + apiConfig.endpoints.Products;
    const response = await this.interceptResponse<IProductResponse>(url, this.clickOnSaveNewProductButton.bind(this));
    validateResponse(response, HTTP_STATUS_CODES.CREATED, true, null);
    return response;
  }
}
