import { BasePage } from "ui/pages/basePage.page";
import { URL } from "config/environment";
import { TIMEOUT_10_SEC } from "utils/timeouts";
import { logStep } from "utils/reporter/decorators/logStep";
import { expect } from "playwright/test";
import find from "utils/array/find";

export class SalesPortalPage extends BasePage {
  readonly "Spinner" = this.findElement(".spinner-border");
  readonly "Notification message" = this.findElement(`.toast-body`);
  readonly "Clost Notification button" = this.findElement(`#toast button`);
  readonly "Signed in user dropdown" = this.findElement("#dropdownUser1");
  readonly "Sign out button" = this.findElement("#signOut");

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

  async verifyAndCloseNotification(notificationText: string) {
    this.waitForElement(this["Notification message"], "visible");
    const notifications = await this.findElementArray(this["Notification message"]);
    const expectedNotification = await find(notifications, async (notification) => (await this.getText(notification)) === notificationText);

    if (!expectedNotification) throw new Error(`Notification message with text ${notificationText} was not found`);

    const actualText = await this.getText(expectedNotification);
    expect(actualText).toBe(notificationText);
    await this.click(this["Clost Notification button"]);
  }

  @logStep("Open Sales Portal")
  async openSalesPortal(url?: string) {
    await this.openPage(url ?? URL);
  }

  async signOut() {
    await this.click(this["Signed in user dropdown"]);
    await this.click(this["Sign out button"]);
  }
}
