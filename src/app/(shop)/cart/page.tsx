import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Link from "next/link";

import { CART_COOKIE, parseCart } from "@/lib/cart/cookie";
import { getProducts } from "@/lib/products/queries";
import { CartLine } from "@/components/CartLine/CartLine";
import { formatPrice } from "@/lib/format";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <>
      <h1 className={styles.title}>Cart</h1>
      <Suspense fallback={<p className={styles.loading}>Loading cart…</p>}>
        <CartContents />
      </Suspense>
    </>
  );
}

async function CartContents() {
  const cookieStore = await cookies();

  const items = parseCart(cookieStore.get(CART_COOKIE)?.value);

  const products = await getProducts();
  const bySlug = new Map(products.map((product) => [product.slug, product]));

  const lines = items.flatMap((item) => {
    const product = bySlug.get(item.slug);
    return product ? [{ product, quantity: item.quantity }] : [];
  });

  if (lines.length === 0) {
    return (
      <p className={styles.empty}>
        Your cart is empty. <Link href="/products">Browse the catalog</Link>
      </p>
    );
  }

  const total = lines.reduce(
    (sum, line) => sum + line.product.priceCents * line.quantity,
    0,
  );

  return (
    <>
      <ul className={styles.list}>
        {lines.map(({ product, quantity }) => (
          <li key={product.slug}>
            <CartLine product={product} quantity={quantity} />
          </li>
        ))}
      </ul>
      <div className={styles.summary}>
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </>
  );
}
