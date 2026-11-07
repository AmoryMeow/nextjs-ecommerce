import { productCategoryEnum } from "@/db/schema";

export type { Product } from "@/db/schema";

export const PRODUCT_CATEGORIES = productCategoryEnum.enumValues;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/** Narrows an arbitrary value (e.g. a URL search param) to a known category. */
export function isProductCategory(value: unknown): value is ProductCategory {
  return PRODUCT_CATEGORIES.includes(value as ProductCategory);
}
