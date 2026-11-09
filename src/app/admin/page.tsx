import type { Metadata } from "next";
import Link from "next/link";

import { formatPrice } from "@/lib/format";
import { getProducts } from "@/lib/products/queries";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Products",
};

export default async function AdminPage() {
  const products = await getProducts();

  return (
    <>
      <h1 className={styles.title}>Products</h1>
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.id} className={styles.item}>
            <Link href={`/admin/products/${product.slug}`}>{product.name}</Link>
            <span className={styles.price}>
              {formatPrice(product.priceCents)}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
