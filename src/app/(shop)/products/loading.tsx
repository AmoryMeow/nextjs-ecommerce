import { ProductCardSkeleton } from "@/components/ProductCard/ProductCardSkeleton";

import styles from "./page.module.css";

export default function Loading() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Catalog</h1>
      </div>
      <ul className={styles.grid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i}>
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    </>
  );
}
