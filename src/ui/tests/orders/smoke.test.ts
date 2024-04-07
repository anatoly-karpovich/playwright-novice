import { mergeTests } from "@playwright/test";
import { test as testFactory } from "fixtures/common/pageFactory.fixture";
import { test as testOrder } from "fixtures/orders/orders.fuxture";
import OrderApiSteps from "api/steps/orders.steps";
import { DELIVERY_CONDITIONS, ORDER_STATUSES } from "types/orders/order.types";

const test = mergeTests(testFactory, testOrder);

test.describe.only("[UI]. [Orders]", () => {
  test("Order Details", async ({ createOrderViaApi, salesPortal, page }) => {
    await salesPortal.signInPage.openSalesPortal();
    await salesPortal.signInPage.signInAsAdmin();
    const order = await createOrderViaApi({ status: ORDER_STATUSES.DRAFT });
    // const order = await OrderApiSteps.createOrderWithReceivedStatus({}, DELIVERY_CONDITIONS.DELIVERY);
    await salesPortal.homePage.openOrdersPage();
    const detailButton = `//tr[./td[text()="${order._id}"]]/td/button[@title='Details']`;
    await salesPortal.productsListPage.click(detailButton);
    await page.pause();
  });
});
