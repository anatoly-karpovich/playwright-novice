import { SalesPortalPage } from "../salesPortal.page";

export class CreateOrderModal extends SalesPortalPage {
  readonly ["Customer Dropdown"] = this.findElement(`#inputCustomerOrder`);
  readonly ["Customer Dropdown options"] = this.findElement(`#inputCustomerOrder > option`);
  readonly ["Product dropdown"] = this.findElement(`select[name="Product"]`);
  readonly ["Last Product Dropdown"] = this.findElement(`select[name="Product"]:last-of-type`);
}
