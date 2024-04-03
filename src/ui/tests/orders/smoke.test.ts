import { mergeTests } from "@playwright/test";
import { test as testFactory } from "fixtures/common/pageFactory.fixture";
import { test as testOrder } from "fixtures/orders/orders.fuxture";

const test = mergeTests(testFactory, testOrder);

test.describe("[UI]. [Orders]", () => {
  test("Order Details", async ({ createOrderViaApi, salesPortal, page }) => {
    await salesPortal.signInPage.openSalesPortal();
    await salesPortal.signInPage.signInAsAdmin();
    const order = await createOrderViaApi(5);
    await salesPortal.homePage.openOrdersPage();
    const detailButton = `//tr[./td[text()="${order._id}"]]/td/button[@title='Details']`;
    await salesPortal.productsListPage.click(detailButton);
  });
});
