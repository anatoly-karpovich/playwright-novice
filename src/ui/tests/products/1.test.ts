import { mergeTests } from "@playwright/test";
import { test as testProduct } from "../../../fixtures/products/products.fixture.js";
import { test as testPageFactory } from "../../../fixtures/common/pageFactory.fixture.js";
import { generateNewProduct } from "../../../data/products/productGeneration.js";
import { Products } from "../../../utils/entities/index.js";

const test = mergeTests(testPageFactory, testProduct);

test.describe("test", () => {
  test.skip("Temp test to check how it works", async ({ salesPortal, createProductViaApi, getProduct }) => {
    await salesPortal.signInPage.openSalesPortal();
    await salesPortal.signInPage.signInAsAdmin();
    const product = await createProductViaApi();
    await salesPortal.homePage.openProductsPage();
    await salesPortal.productsListPage.openDetailsModalForCreatedProduct(product.name);
  });

  test("[Products]. [Create product]", async ({ salesPortal }) => {
    await salesPortal.signInPage.openSalesPortal();
    await salesPortal.signInPage.signInAsAdmin();
    await salesPortal.homePage.openProductsPage();
    await salesPortal.productsListPage.openAddNewProductPage();
    const product = generateNewProduct();
    await salesPortal.addNewProductPage.createProduct(product);
  });

  test.afterEach(async ({ deleteProduct }) => {
    const products = Products.getAllCreatedProducts();
    for (const product of products) {
      await deleteProduct(product._id);
      Products.removeProduct(product._id);
    }
  });
});
