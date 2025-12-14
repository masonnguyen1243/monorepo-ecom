import type { Product, Category } from "@repo/product-db";

export type StripeProductType = {
  id: string;
  name: string;
  price: number;
};

export type ProductType = Product;

export type ProductsType = Product[];

export type CategoryType = Category;
