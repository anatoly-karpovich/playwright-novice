import type { IProductFromResponse } from "types/products/product.types.js";

export class CreatedProducts {
  private static instance: CreatedProducts;
  private products: IProductFromResponse[] = [];

  constructor() {
    if (CreatedProducts.instance) {
      return CreatedProducts.instance;
    }
    CreatedProducts.instance = this;
  }

  addProduct(product: IProductFromResponse) {
    const productIndex = this.products.findIndex((p) => p._id === product._id);
    if (productIndex !== -1) {
      this.updateProduct(product, productIndex);
    } else {
      this.products.push(product);
    }
  }

  updateProduct(product: IProductFromResponse, productIndex: number = this.products.length - 1) {
    this.products[productIndex] = product;
  }

  getProduct(productIndex: number = this.products.length - 1) {
    return this.products[productIndex];
  }

  getAllCreatedProducts() {
    return this.products;
  }

  removeProduct(id?: string) {
    this.products.splice(id ? this.findProductIndexById(id) : this.products.length - 1, 1);
  }

  private findProductIndexById(productId: string) {
    return this.products.findIndex((p) => p._id === productId);
  }
}
