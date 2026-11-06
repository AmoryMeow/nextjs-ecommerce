"use server";

import { cookies } from "next/headers";

import { getProductBySlug } from "@/lib/products/queries";

import {
  CART_COOKIE,
  CART_COOKIE_MAX_AGE,
  parseCart,
  serializeCart,
} from "./cookie";

export async function addToCart(formData: FormData): Promise<void> {
  const slug = formData.get("slug");
  if (typeof slug !== "string") return;

  const product = await getProductBySlug(slug);

  if (!product || !product.inStock) return;

  const cookieStore = await cookies();

  const items = parseCart(cookieStore.get(CART_COOKIE)?.value);
  const item = items.find((cartItem) => cartItem.slug === slug);
  if (item) {
    item.quantity += 1;
  } else {
    items.push({ slug, quantity: 1 });
  }

  cookieStore.set(CART_COOKIE, serializeCart(items), {
    maxAge: CART_COOKIE_MAX_AGE,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });
}
