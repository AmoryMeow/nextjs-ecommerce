import { cache } from "react";

import type { Product } from "./types";
import { products } from "./data";

export function getProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | undefined> => {
    return products.find((product) => product.slug === slug);
  },
);
