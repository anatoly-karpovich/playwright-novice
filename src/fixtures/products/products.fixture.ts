import { IProduct, IProductFromResponse } from "../../types/products/product.types.js";
import { generateNewProduct } from "../../data/products/productGeneration.js";
import { test as base } from "../common/services.fixture.js";
import { Users } from "../../utils/entities/index.js";

interface ProductFixture {
  createProductViaApi: (product?: IProduct, token?: string) => Promise<IProductFromResponse>;
  getProductById: (productId: string, token?: string) => Promise<IProductFromResponse>;
  getAllProducts: (token?: string) => Promise<IProductFromResponse[]>;
  deleteProduct: (productId: string, token?: string) => Promise<void>;
}

export const test = base.extend<ProductFixture>({
  createProductViaApi: async ({ services }, use) => {
    let createdProduct;
    const createdProductViaApi = async (product?: IProduct, token?: string) => {
      const data = generateNewProduct(product);
      createdProduct = await services.ProductService.create({ data, token: token ?? Users.getToken() });
      return createdProduct.data.Product;
    };

    await use(createdProductViaApi);
    await services.ProductService.delete({ data: { _id: createdProduct._id }, token: Users.getToken() });
  },

  getProductById: async ({ services }, use) => {
    const receivedProduct = async (productId: string, token?: string) => {
      const productResponse = await services.ProductService.get({ data: { _id: productId }, token: token ?? Users.getToken() });
      return productResponse.data.Product;
    };
    await use(receivedProduct);
  },

  getAllProducts: async ({ services }, use) => {
    const receivedProducts = async (token?: string) => {
      const productsResponse = await services.ProductService.getAll({ token: token ?? Users.getToken() });
      return productsResponse.data.Products;
    };
    await use(receivedProducts);
  },

  deleteProduct: async ({ services }, use) => {
    const deletedProduct = async (productId: string, token?: string) => {
      const deleteResponse = await services.ProductService.delete({ data: { _id: productId }, token: token ?? Users.getToken() });
    };
    await use(deletedProduct);
  },
});
