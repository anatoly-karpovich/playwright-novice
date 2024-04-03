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
    const storedProduct = this.products.find((p) => p._id === product._id);
    if (storedProduct) {
      this.updateProduct(product);
    } else {
      this.products.push(product);
    }
  }

  updateProduct(product: IProductFromResponse) {
    const productIndex = this.findProductIndexById(product._id);
    this.products[productIndex] = product;
  }

  getProduct(id?: string) {
    if (id) {
      const productIndex = this.findProductIndexById(id);
      return this.products[productIndex];
    }
    return this.products.at(-1);
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
