export const PRODUCT_CATEGORIES = [
  "audio",
  "wearables",
  "accessories",
  "home",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/** Narrows an arbitrary value (e.g. a URL search param) to a known category. */
export function isProductCategory(value: unknown): value is ProductCategory {
  return PRODUCT_CATEGORIES.includes(value as ProductCategory);
}

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Price in cents to avoid floating-point rounding errors. */
  priceCents: number;
  /** Absolute URL of a square product photo. */
  image: string;
  category: ProductCategory;
  inStock: boolean;
};
