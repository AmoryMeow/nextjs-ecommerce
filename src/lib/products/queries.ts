import { cacheLife } from "next/cache";
import { cache } from "react";

import { delay } from "@/lib/delay";
import { products } from "@/lib/products/data";
import type { Product } from "@/lib/products/types";

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  await delay(1000);
  return products;
}

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | undefined> => {
    return products.find((product) => product.slug === slug);
  },
);
