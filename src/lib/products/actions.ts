"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { products } from "@/db/schema";

export async function updateProduct(
  slug: string,
  formData: FormData,
): Promise<void> {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priceCents = Math.round(Number(formData.get("price")) * 100);
  const inStock = formData.get("inStock") === "on";

  if (
    !name ||
    !description ||
    !Number.isInteger(priceCents) ||
    priceCents <= 0
  ) {
    return;
  }

  await db
    .update(products)
    .set({ name, description, priceCents, inStock })
    .where(eq(products.slug, slug));
  updateTag("products");
  redirect(`/products/${slug}`);
}
