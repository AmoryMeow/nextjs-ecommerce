import { describe, expect, it } from "vitest";
import * as z from "zod";

import { productFormSchema } from "@/lib/products/validation";

const validInput = {
  name: "Lamp",
  description: "A desk lamp",
  price: "19.99",
  inStock: true,
};

describe("productFormSchema", () => {
  it("accepts valid input and converts price to a number", () => {
    const result = productFormSchema.safeParse(validInput);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.price).toBe(19.99);
    }
  });

  it("trims whitespace around the name", () => {
    const result = productFormSchema.safeParse({
      ...validInput,
      name: "   Lamp   ",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Lamp");
    }
  });

  it.each([
    ["name", "is blank", "   ", "Name is required"],
    [
      "name",
      "is too long",
      "x".repeat(121),
      "Name must be at most 120 characters",
    ],
    ["price", "is not a number", "abc", "Price must be a number"],
    ["price", "is zero", "0", "Price must be greater than 0"],
    ["price", "is too high", "100001", "Price is too high"],
    // z.coerce turns "" into 0, so an empty price reports "greater than 0".
    ["price", "is empty", "", "Price must be greater than 0"],
  ] as const)("rejects input when %s %s", (field, _label, value, message) => {
    const result = productFormSchema.safeParse({
      ...validInput,
      [field]: value,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(z.flattenError(result.error).fieldErrors[field]).toEqual([
        message,
      ]);
    }
  });
});
