export interface IProduct {
  name: string;
  price: number;
  amount: number;
  notes?: string;
  manufacturer: (typeof manufacturerNames)[number];
}

export const manufacturerNames = ["Apple", "Samsung", "Google", "Microsoft", "Sony", "Xiaomi", "Amazon", "Tesla"] as const;

export interface IProductFromResponse extends IProduct {
  _id: string;
  createdOn: string;
}

export interface IProductResponse {
  Product: IProductFromResponse;
}

export interface IProductsResponse {
  Products: IProductFromResponse[];
}
