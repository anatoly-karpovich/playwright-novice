import { test as base } from "@playwright/test";
import { Application } from "fixtures/common/application";

interface PageFactoryFixture {
  salesPortal: Application;
}

export const test = base.extend<PageFactoryFixture>({
  salesPortal: async ({ page }, use) => {
    await use(new Application(page));
  },
});
