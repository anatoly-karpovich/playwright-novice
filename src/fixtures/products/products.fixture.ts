import { IProduct, IProductFromResponse } from "../../types/products/product.types.js";
import { generateNewProduct } from "../../data/products/productGeneration.js";
import { test as base } from "../common/services.fixture.js";
import { Products, Users } from "../../utils/entities/index.js";

interface ProductFixture {
  createProductViaApi: (product?: IProduct) => Promise<IProductFromResponse>;
  getProduct: (productId: string) => Promise<IProductFromResponse>;
  deleteProduct: (productId: string) => Promise<void>;
}

export const test = base.extend<ProductFixture>({
  createProductViaApi: async ({ services }, use) => {
    const createdProductViaApi = async (product?: IProduct) => {
      const data = generateNewProduct(product);
      const createdProduct = await services.ProductService.create({ data, token: Users.getToken() });
      Products.addProduct(createdProduct.data.Product);
      return createdProduct.data.Product;
    };

    await use(createdProductViaApi);
    await services.ProductService.delete({ data: { _id: Products.getProduct()._id }, token: Users.getToken() });
    Products.removeProduct();
  },

  getProduct: async ({ services }, use) => {
    const receivedProduct = async (productId: string) => {
      const productResponse = await services.ProductService.get({ data: { _id: productId }, token: Users.getToken() });
      return productResponse.data.Product;
    };
    await use(receivedProduct);
  },

  deleteProduct: async ({ services }, use) => {
    const deletedProduct = async (productId: string) => {
      const deleteResponse = await services.ProductService.delete({ data: { _id: productId }, token: Users.getToken() });
    };
    await use(deletedProduct);
  },
});
