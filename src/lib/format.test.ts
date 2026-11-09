import { describe, expect, it } from "vitest";

import { formatDateTime, formatPrice } from "@/lib/format";

describe("formatPrice", () => {
  it.each([
    [12900, "$129.00"],
    [0, "$0.00"],
    [123456, "$1,234.56"],
  ])("formats %i cents as %s", (cents, expected) => {
    expect(formatPrice(cents)).toBe(expected);
  });
});

describe("formatDateTime", () => {
  it("formats a date in UTC with the time", () => {
    expect(formatDateTime(new Date("2026-11-08T21:05:00Z"))).toBe(
      "Nov 8, 2026, 9:05 PM UTC",
    );
  });
});
