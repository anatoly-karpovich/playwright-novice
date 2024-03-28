import { BasePage } from "./basePage.page";
import { URL } from "../../config/environment";
import { TIMEOUT_10_SEC } from "../../utils/timeouts";
import { logStep } from "../../utils/reporter/decorators/logStep";

export class SalesPortalPage extends BasePage {
  async waitForSpinnerToHide() {
    await this.waitForElement(this.Spinner, "hidden", TIMEOUT_10_SEC);
  }

  async waitForPageIsLoaded() {
    await this.waitForSpinnerToHide();
  }

  async getAuthorizationToken() {
    const cookies = await this.getCookies(URL);
    const token = cookies.find((cookie) => cookie.name === "Authorization");
    return token?.value;
  }

  @logStep("Open Sales Portal")
  async openSalesPortal() {
    await this.openPage(URL);
  }
}
