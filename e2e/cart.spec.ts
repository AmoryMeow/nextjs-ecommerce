import { expect, test } from "@playwright/test";

test("shopper adds a product to the cart and changes the quantity", async ({
  page,
}) => {
  await page.goto("/products");
  await page.getByRole("link", { name: "Pulse Earbuds" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Pulse Earbuds" }),
  ).toBeVisible();

  const cartLink = page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link", { name: /Cart/ });
  await expect(cartLink).toHaveText("Cart");

  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(cartLink).toHaveText("Cart1");

  await cartLink.click();
  await expect(page).toHaveURL("/cart");
  await expect(
    page.getByRole("heading", { level: 2, name: "Pulse Earbuds" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Increase quantity" }).click();
  await expect(cartLink).toHaveText("Cart2");
  await expect(page.getByText("$258.00").first()).toBeVisible();

  await page.getByRole("button", { name: "Remove" }).click();
  await expect(page.getByText("Your cart is empty.")).toBeVisible();
  await expect(cartLink).toHaveText("Cart");
});

test("search filters the catalog by name", async ({ page }) => {
  await page.goto("/products");

  const search = page.getByRole("searchbox", { name: "Search products" });
  await search.fill("watch");
  await search.press("Enter");

  await expect(page).toHaveURL("/products?q=watch");
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(3);
  await expect(page.getByText("3 products")).toBeVisible();
});
