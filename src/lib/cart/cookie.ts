import type { CartItem } from "@/lib/cart/types";

export const CART_COOKIE = "cart";
/** Maximum quantity of a single product in the cart. */
export const MAX_QUANTITY = 99;

/** Keep the cart for 30 days after the last change. */
export const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.slug === "string" &&
    Number.isInteger(item.quantity) &&
    (item.quantity as number) > 0
  );
}

/**
 * Reads the cart from a raw cookie value.
 * The cookie can be edited by the user, so anything malformed becomes an empty cart.
 */
export function parseCart(value: string | undefined): CartItem[] {
  if (!value) return [];
  try {
    const data: unknown = JSON.parse(value);
    return Array.isArray(data) ? data.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

export function serializeCart(items: CartItem[]): string {
  return JSON.stringify(items);
}
