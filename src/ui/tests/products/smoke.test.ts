import { mergeTests } from "@playwright/test";
import { test as testProduct } from "fixtures/products/products.fixture";
import { test as testPageFactory } from "fixtures/common/pageFactory.fixture";
import { generateNewProduct } from "data/products/productGeneration";
import { Products } from "utils/entities/index";

const test = mergeTests(testPageFactory, testProduct);

test.describe("test", () => {
  test.beforeEach(async ({ salesPortal }) => {
    await salesPortal.signInPage.openSalesPortal();
    await salesPortal.signInPage.signInAsAdmin();
  });

  test("[Products]. [Open details modal for created product]", async ({ salesPortal, createProductViaApi }) => {
    const product = await createProductViaApi();
    await salesPortal.homePage.openProductsPage();
    await salesPortal.productsListPage.openDetailsModalForCreatedProduct(product.name);
  });

  test("[Products]. [Create product]", async ({ salesPortal }) => {
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
