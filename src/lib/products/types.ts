export type ProductCategory = "audio" | "wearables" | "accessories" | "home";

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
