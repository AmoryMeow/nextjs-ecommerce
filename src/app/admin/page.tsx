import type { Metadata } from "next";
import Link from "next/link";

import { logout } from "@/lib/auth/actions";
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
      <div className={styles.header}>
        <h1 className={styles.title}>Products</h1>
        <form action={logout}>
          <button className={styles.logout} type="submit">
            Log out
          </button>
        </form>
      </div>
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
