import { test as base } from "@playwright/test";
import { Application } from "./application.js";

interface PageFactoryFixture {
  salesPortal: Application;
}

export const test = base.extend<PageFactoryFixture>({
  salesPortal: async ({ page }, use) => {
    await use(new Application(page));
  },
});
