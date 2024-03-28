import { faker } from "@faker-js/faker";
import { IProduct } from "types/products/product.types";
import { manufacturerNames } from "types/products/product.types";
import { generateNumberInRange } from "utils/number/number";

export function generateNewProduct(customProductFields?: Partial<IProduct>) {
  const product: IProduct = {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    price: 100,
    amount: 2,
    manufacturer: manufacturerNames[generateNumberInRange(0, manufacturerNames.length - 1)],
    notes: "Test product",
    ...customProductFields,
  };
  return product;
}
