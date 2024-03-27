import { generateNewProduct } from "../../../data/products/productGeneration.js";
import { expect, test } from "../../../fixtures/common/services.fixture.js";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../../config/environment.js";
import { IProductFromResponse } from "../../../types/products/product.types.js";
import { validateResponseWithSchema } from "../../../utils/validations/apiValidation.js";
import { createdProductSchema } from "../../../data/schema/product.schema.js";
import { HTTP_STATUS_CODES } from "../../../data/http/statusCodes.js";

test.describe("[API]. [Products]", () => {
  const createdProducts: IProductFromResponse[] = [];
  let token: string = "";

  test.beforeAll(async ({ services }) => {
    const signInResponse = await services.SignInService.login({ data: { username: ADMIN_USERNAME, password: ADMIN_PASSWORD } });
    token = signInResponse.data.token;
  });

  test("Create smoke product", async ({ services }) => {
    const productData = generateNewProduct();
    const productResponse = await services.ProductService.create({ data: productData, token });
    createdProducts.push(productResponse.data.Product);
    validateResponseWithSchema(productResponse, createdProductSchema, HTTP_STATUS_CODES.CREATED, true, null);
    expect(productResponse.data.Product).toMatchObject({ ...productData, _id: productResponse.data.Product._id });
  });

  test.afterAll(async ({ services }) => {
    for (const product of createdProducts) {
      await services.ProductService.delete({ data: { _id: product._id }, token });
    }
  });
});
