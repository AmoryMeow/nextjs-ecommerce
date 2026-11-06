import type { Metadata } from "next";

import { ProductCard } from "@/components/ProductCard/ProductCard";
import { getProducts } from "@/lib/products/queries";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Catalog",
};

export default async function CatalogPage() {
  const products = await getProducts();
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Catalog</h1>
        <p className={styles.count}>
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </div>
      <ul className={styles.grid}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}
