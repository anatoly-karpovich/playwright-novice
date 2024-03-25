import { test as base } from "@playwright/test";
import { SalesPortalServices } from "../../api/services/index.js";

interface ServicesFixture {
  services: SalesPortalServices;
}

export const test = base.extend<ServicesFixture>({
  services: async ({}, use) => {
    await use(new SalesPortalServices());
  },
});
