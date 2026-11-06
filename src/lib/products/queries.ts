import type { Product } from "./types";
import { products } from "./data";

export function getProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}
