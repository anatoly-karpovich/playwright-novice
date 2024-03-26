import { BasePage } from "./basePage.page";
import { URL } from "../../config/environment";
import { TIMEOUT_10_SEC } from "../../utils/timeouts";
import { logStep } from "../../utils/reporter/decorators/logStep";

export class SalesPortalPage extends BasePage {
  readonly "Notification message" = this.findElement(`.toast-body`);
  readonly "Spinner" = this.findElement(".spinner-border");

  async waitForSpinnerToHide() {
    await this.waitForElement(this.Spinner, "hidden", TIMEOUT_10_SEC);
  }

  async waitForPageIsLoaded() {
    await this.waitForSpinnerToHide();
  }

  async getAuthorizationToken(): Promise<string> {
    const token = await this.getCoockies({ url: URL, cookieName: "Authorization" });
    return token;
  }

  @logStep("Open Sales Portal")
  async openSalesPortal() {
    await this.openPage(URL);
  }
}
