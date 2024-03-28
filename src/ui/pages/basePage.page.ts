import { Locator, Page } from "@playwright/test";
import { ElementState, IWaitUntilOptions, ResizeCoordinates } from "../../types/core/actions.types.js";
import { DEFAULT_TIMEOUT, TIMEOUT_10_SEC } from "../../utils/timeouts.js";
import { isLocator, isLocatorArray } from "../../utils/typeGuards/selector.js";
import { IResponse } from "../../types/api/apiClient.types.js";
import { logStep } from "../../utils/reporter/decorators/logStep.js";

export class BasePage {
  // readonly "Notification message" = this.findElement(`.toast-body`);
  readonly "Spinner" = this.findElement(".spinner-border");
  constructor(protected page: Page) {}

  findElement(selectorOrElement: string | Locator) {
    if (isLocator(selectorOrElement)) {
      return selectorOrElement;
    }
    const element = this.page.locator(selectorOrElement);
    return element;
  }

  async findElementArray(selectorOrElement: string | Locator[]) {
    if (isLocatorArray(selectorOrElement)) {
      return selectorOrElement;
    }
    const elements = await this.findElement(selectorOrElement).all();
    return elements;
  }

  private async waitUntil(condition: () => Promise<boolean>, options?: IWaitUntilOptions) {
    const interval = options?.interval ?? 500;
    const timeout = options?.timeout || TIMEOUT_10_SEC;
    const timeoutMessage = options?.timeoutMsg || `Condition not met within the specified timeout.`;
    let elapsedTime = 0;

    while (elapsedTime < timeout) {
      if (await condition()) {
        return;
      }

      await this.page.waitForTimeout(interval);
      elapsedTime += interval;
    }

    throw new Error(timeoutMessage);
  }

  async waitForElement(selector: string | Locator, state: ElementState, timeout = DEFAULT_TIMEOUT) {
    const element = this.findElement(selector);
    element.waitFor({ state, timeout });
    return element;
  }

  async waitForElementAndScroll(selector: string | Locator, timeout = DEFAULT_TIMEOUT) {
    const element = this.findElement(selector);
    try {
      await element.scrollIntoViewIfNeeded({ timeout });
      return element;
    } catch (error) {
      throw error;
    }
  }

  @logStep()
  async click(selector: string | Locator, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      await element.click({ timeout });
    } catch (error) {
      throw error;
    }
  }

  @logStep()
  async setValue(selector: string | Locator, text: string, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.fill(text, { timeout });
      }
    } catch (error) {
      throw error;
    }
  }

  @logStep()
  async clear(selector: string | Locator, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.fill("", { timeout });
      }
    } catch (error) {
      throw error;
    }
  }

  @logStep()
  async getText(selector: string | Locator, timeout?: number) {
    const element = await this.waitForElementAndScroll(selector, timeout);
    const text = await element.innerText({ timeout });
    return text;
  }

  @logStep()
  async selectDropdownValue(dropdownSelector: string | Locator, optionName: string, timeout?: number) {
    const dropdown = this.findElement(dropdownSelector);
    await dropdown.selectOption(optionName, { timeout });
  }

  @logStep()
  async openPage(url: string) {
    try {
      await this.page.goto(url, { waitUntil: "domcontentloaded" });
    } catch (error) {
      throw error;
    }
  }

  @logStep()
  async hoverElement(selector: string | Locator, timeout?: number) {
    const element = await this.waitForElementAndScroll(selector, timeout);
    await element.hover({ timeout });
  }

  @logStep()
  async dragAndDrop(elementSelector: string | Locator, targetSelector: string | Locator, timeout?: number) {
    const sourceElement = await this.waitForElementAndScroll(elementSelector, timeout);
    const targetElement = await this.waitForElementAndScroll(targetSelector, timeout);
    const sourceElementboundingBox = await sourceElement.boundingBox();
    const targetElementboundingBox = await targetElement.boundingBox();
    if (sourceElementboundingBox && targetElementboundingBox) {
      // Move the mouse to the bottom-right corner
      await this.page.mouse.move(sourceElementboundingBox.x + 5, sourceElementboundingBox.y + 5);

      // Press the mouse button to start resizing
      await this.page.mouse.down();

      // Move the mouse to the new coordinates to resize the element
      await this.page.mouse.move(targetElementboundingBox.x, targetElementboundingBox.y);

      // Release the mouse button to finish resizing
      await this.page.mouse.up();
    }
  }

  @logStep()
  async resizeElement(selector: string | Locator, coordinates: ResizeCoordinates, timeout?: number) {
    const element = await this.waitForElementAndScroll(selector);

    await this.page.waitForTimeout(1000);
    const boundingBox = await element.boundingBox();
    if (boundingBox) {
      const rightDownX = boundingBox.x + boundingBox.width - 3;
      const rightDownY = boundingBox.y + boundingBox.height - 3;

      // Move the mouse to the bottom-right corner
      await this.page.mouse.move(rightDownX, rightDownY);

      // Press the mouse button to start resizing
      await this.page.mouse.down();

      // Move the mouse to the new coordinates to resize the element
      await this.page.mouse.move(rightDownX + coordinates.xOffset, rightDownY + coordinates.yOffset);

      // Release the mouse button to finish resizing
      await this.page.mouse.up();
    }
  }

  async waitForResponse(url: string) {
    return this.page.waitForResponse(url);
  }

  async interceptResponse<T>(url: string, triggerAction?: () => Promise<void>): Promise<IResponse<T>> {
    if (triggerAction) {
      const [response] = await Promise.all([this.waitForResponse(url), triggerAction()]);
      return {
        data: (await response.json()) as T,
        status: response.status(),
        headers: response.headers(),
      };
    }
    const response = await this.waitForResponse(url);
    return response.json();
  }

  // async checkNotificationWithText(text: string) {
  //   let expectedNotification: Locator | undefined;
  //   await this.waitUntil(
  //     async () => {
  //       const notifications = await this.findElementArray(this["Notification message"]);
  //       for (const n of notifications) {
  //         let actualText = await this.getText(n);
  //         if (text === actualText) {
  //           expectedNotification = n;
  //           await this.click(n);
  //           await this.waitForElement(n, "hidden");
  //           break;
  //         }
  //       }
  //       return !!expectedNotification;
  //     },
  //     { timeoutMsg: `Notification message with text "${text}" was not found` }
  //   );
  // }

  async waitForElementToChangeText(selector: string | Locator, text: string, timeout = DEFAULT_TIMEOUT) {
    await this.waitUntil(
      async () => {
        const elementText = await this.getText(selector);
        return elementText === text;
      },
      { timeout, timeoutMsg: `Element still does not has text ${text}` }
    );
  }

  async waitForElementsArrayToBeDisplayed(selector: string | Locator[], reverse?: boolean, timeout = DEFAULT_TIMEOUT) {
    await this.waitUntil(async () => {
      const elements = await this.findElementArray(selector);
      for (const element of elements) {
        await this.waitForElement(element, reverse ? "visible" : "hidden", timeout);
      }
      return true;
    });
  }

  async getCookies(url: string) {
    const cookies = await this.page.context().cookies(url);
    return cookies;
  }
}
