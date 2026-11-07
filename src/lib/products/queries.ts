import { asc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/db";
import { products } from "@/db/schema";
import type { Product } from "@/lib/products/types";

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  return db.select().from(products).orderBy(asc(products.id));
}

export const getProductBySlug = async (
  slug: string,
): Promise<Product | undefined> => {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  return product;
};
