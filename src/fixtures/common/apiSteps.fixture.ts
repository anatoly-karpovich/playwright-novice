import { test as base } from "@playwright/test";
import SalesPortalApiSteps from "api/steps";

interface ApiStepsFixture {
  apiSteps: typeof SalesPortalApiSteps;
}

export const test = base.extend<ApiStepsFixture>({
  apiSteps: async ({}, use) => {
    await use(SalesPortalApiSteps);
  },
});

export { expect } from "@playwright/test";
