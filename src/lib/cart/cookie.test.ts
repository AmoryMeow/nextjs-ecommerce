import { describe, expect, it } from "vitest";

import { parseCart, serializeCart } from "@/lib/cart/cookie";

describe("parseCart", () => {
  it("returns an empty cart when the cookie is missing", () => {
    expect(parseCart(undefined)).toEqual([]);
  });

  it.each([
    ["an empty string", ""],
    ["broken JSON", "{oops"],
    ["an object instead of an array", '{"slug":"a","quantity":1}'],
    ["a number", "42"],
  ])("returns an empty cart for %s", (_label, value) => {
    expect(parseCart(value)).toEqual([]);
  });

  it("returns items from a valid cookie", () => {
    expect(parseCart('[{"slug":"a","quantity":2}]')).toEqual([
      { slug: "a", quantity: 2 },
    ]);
  });

  it("drops malformed items and keeps valid ones", () => {
    const value = JSON.stringify([
      { slug: "zero", quantity: 0 },
      { slug: "negative", quantity: -1 },
      { slug: "fraction", quantity: 1.5 },
      { slug: "string", quantity: "2" },
      { quantity: 1 },
      null,
      { slug: "valid", quantity: 2 },
    ]);

    expect(parseCart(value)).toEqual([{ slug: "valid", quantity: 2 }]);
  });

  it("reads back what serializeCart wrote", () => {
    const items = [
      { slug: "a", quantity: 1 },
      { slug: "b", quantity: 2 },
    ];

    expect(parseCart(serializeCart(items))).toEqual(items);
  });
});
