import * as z from "zod";

export const productFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(120, "Name must be at most 120 characters"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description must be at most 500 characters"),
  price: z.coerce
    .number({ error: "Price must be a number" })
    .positive("Price must be greater than 0")
    .max(100_000, "Price is too high"),
  inStock: z.boolean(),
});

export type ProductFormFields = "name" | "description" | "price";

export type ProductFormState = {
  errors?: Partial<Record<ProductFormFields, string[]>>;
  values?: {
    name: string;
    description: string;
    price: string;
    inStock: boolean;
  };
};
