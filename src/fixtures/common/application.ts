import { Page } from "@playwright/test";
import { HomePage } from "ui/pages/homePage.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { SignInPage } from "ui/pages/signInPage.page";

export class Application {
  constructor(protected page: Page) {}

  homePage = new HomePage(this.page);
  productsListPage = new ProductsListPage(this.page);
  addNewProductPage = new AddNewProductPage(this.page);
  signInPage = new SignInPage(this.page);
}
