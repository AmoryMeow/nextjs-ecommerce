export type ProductCategory = "audio" | "wearables" | "accessories" | "home";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Price in cents to avoid floating-point rounding errors. */
  priceCents: number;
  category: ProductCategory;
  inStock: boolean;
};
