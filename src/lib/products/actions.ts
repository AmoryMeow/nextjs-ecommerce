"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

import { db } from "@/db";
import { products } from "@/db/schema";
import { getSession } from "@/lib/auth/session";
import {
  productFormSchema,
  type ProductFormState,
} from "@/lib/products/validation";

export async function updateProduct(
  slug: string,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const session = await getSession();
  if (!session) redirect("/login");

  const values = {
    name: String(formData.get("name") ?? ""),
    description: String(formData.get("description") ?? ""),
    price: String(formData.get("price") ?? ""),
    inStock: formData.get("inStock") === "on",
  };

  const result = productFormSchema.safeParse(values);

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors, values };
  }

  const { name, description, price, inStock } = result.data;

  await db
    .update(products)
    .set({ name, description, priceCents: Math.round(price * 100), inStock })
    .where(eq(products.slug, slug));

  updateTag("products");
  redirect(`/products/${slug}`);
}
