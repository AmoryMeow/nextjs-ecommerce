"use server";

import { cookies } from "next/headers";

import { getProductBySlug } from "@/lib/products/queries";

import {
  CART_COOKIE,
  CART_COOKIE_MAX_AGE,
  MAX_QUANTITY,
  parseCart,
  serializeCart,
} from "./cookie";
import type { CartItem } from "./types";

async function saveCart(items: CartItem[]): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(CART_COOKIE, serializeCart(items), {
    maxAge: CART_COOKIE_MAX_AGE,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });
}

export async function addToCart(formData: FormData): Promise<void> {
  const slug = formData.get("slug");
  if (typeof slug !== "string") return;

  const product = await getProductBySlug(slug);

  if (!product || !product.inStock) return;

  const cookieStore = await cookies();

  const items = parseCart(cookieStore.get(CART_COOKIE)?.value);
  const item = items.find((cartItem) => cartItem.slug === slug);
  if (item) {
    if (item.quantity >= MAX_QUANTITY) return;
    item.quantity += 1;
  } else {
    items.push({ slug, quantity: 1 });
  }

  await saveCart(items);
}

export async function updateQuantity(
  slug: string,
  quantity: number,
): Promise<void> {
  if (typeof slug !== "string") return;
  if (!Number.isInteger(quantity) || quantity < 0 || quantity > MAX_QUANTITY) {
    return;
  }

  const cookieStore = await cookies();

  let items = parseCart(cookieStore.get(CART_COOKIE)?.value);

  if (quantity === 0) {
    items = items.filter((item) => item.slug !== slug);
  } else {
    const item = items.find((cartItem) => cartItem.slug === slug);
    if (item) {
      item.quantity = quantity;
    }
  }

  await saveCart(items);
}
