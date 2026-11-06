import type { Product } from "./types";
import { products } from "./data";

export function getProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}

export function getProductBySlug(slug: string): Promise<Product | undefined> {
  return Promise.resolve(products.find((product) => product.slug === slug));
}
