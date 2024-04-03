import productService from "api/services/product.service";
import { HTTP_STATUS_CODES } from "data/http/statusCodes";
import { generateNewProduct } from "data/products/productGeneration";
import { IProduct, IProductFromResponse } from "types/products/product.types";
import { Products, Users } from "utils/entities";
import { validateResponse } from "utils/validations/apiValidation";

class ProductApiSteps {
  async createProduct(product?: IProduct, token?: string) {
    const productData = generateNewProduct(product);
    const createdProduct = await productService.create({ data: productData, token: token ?? Users.getToken() });
    validateResponse(createdProduct, HTTP_STATUS_CODES.CREATED, true, null);
    Products.addProduct(createdProduct.data.Product);
    return createdProduct.data.Product;
  }

  async updateProduct(product: IProductFromResponse, token?: string) {
    const createdProduct = await productService.update({ data: product, token: token ?? Users.getToken() });
    validateResponse(createdProduct, HTTP_STATUS_CODES.OK, true, null);
    Products.updateProduct(createdProduct.data.Product);
    return createdProduct.data.Product;
  }

  async getProductById(id: string, token?: string) {
    const product = await productService.getById({ data: { _id: id }, token: token ?? Users.getToken() });
    validateResponse(product, HTTP_STATUS_CODES.OK, true, null);
    return product;
  }

  async getAllProducts(token?: string) {
    const products = await productService.getAll({ token: token ?? Users.getToken() });
    validateResponse(products, HTTP_STATUS_CODES.OK, true, null);
    return products;
  }

  async deleteProduct(id: string, token?: string) {
    const response = await productService.delete({ data: { _id: id }, token: token ?? Users.getToken() });
    validateResponse(response, HTTP_STATUS_CODES.DELETED);
    Products.removeProduct(id);
  }

  async deleteAllCreatedProductsDuringTest(token?: string) {
    const products = Products.getAllCreatedProducts();
    for (const product of products) {
      await this.deleteProduct(product._id, token);
    }
  }
}

export default new ProductApiSteps();
