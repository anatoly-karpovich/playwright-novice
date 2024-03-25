import { expect } from "@playwright/test";
import { apiConfig } from "../../../api/config/apiConfig.js";
import { IResponse } from "../../../types/api/apiClient.types.js";
import { IProduct, IProductResponse } from "../../../types/products/product.types.js";
import { SalesPortalPage } from "../salesPortal.page.js";
import { validateResponse } from "../../../utils/validations/apiValidation.js";
import { HTTP_STATUS_CODES } from "../../../data/http/statusCodes.js";
import { Products } from "../../../utils/entities/index.js";

export class AddNewProductPage extends SalesPortalPage {
  readonly "Name input" = this.findElement(`#inputName`);
  readonly "Manufacturer dropdown" = this.findElement(`#inputManufacturer`);
  readonly "Price input" = this.findElement(`#inputPrice`);
  readonly "Amount input" = this.findElement(`#inputAmount`);
  readonly "Notes input" = this.findElement(`#textareaNotes`);
  readonly "Save New Product button" = this.findElement(`#save-new-product`);

  async fillProductInputs(product: IProduct) {
    await this.setValue(this["Name input"], product.name);
    await this.selectDropdownValue(this["Manufacturer dropdown"], product.manufacturer);
    await this.setValue(this["Price input"], `${product.price}`);
    await this.setValue(this["Amount input"], `${product.amount}`);

    if (product.notes) {
      await this.setValue(this["Notes input"], product.notes);
    }
  }

  async clickOnSaveNewProductButton() {
    await this.click(this["Save New Product button"]);
  }

  async createProduct(product: IProduct) {
    await this.fillProductInputs(product);
    const response = await this.interceptCreateProductResponse();
    await this.waitForSpinnerToHide();
    Products.addProduct(response.data.Product);
  }

  private async interceptCreateProductResponse() {
    const url = apiConfig.baseURL + apiConfig.endpoints.Products;
    const response = await this.interceptResponse<IProductResponse>(url, this.clickOnSaveNewProductButton.bind(this));
    validateResponse(response, HTTP_STATUS_CODES.CREATED, true, null);
    return response;
  }
}
