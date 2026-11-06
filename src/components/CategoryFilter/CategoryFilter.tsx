import Link from "next/link";

import { PRODUCT_CATEGORIES } from "@/lib/products/types";
import type { ProductCategory } from "@/lib/products/types";

import styles from "./CategoryFilter.module.css";

type CategoryFilterProps = {
  /** Currently selected category, or undefined for "All". */
  activeCategory: ProductCategory | undefined;
};

export function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  return (
    <nav aria-label="Categories">
      <ul className={styles.list}>
        <li>
          <Link
            className={styles.link}
            href="/products"
            aria-current={activeCategory === undefined ? "page" : undefined}
          >
            All
          </Link>
        </li>
        {PRODUCT_CATEGORIES.map((category) => (
          <li key={category}>
            <Link
              className={styles.link}
              href={{ pathname: "/products", query: { category } }}
              aria-current={activeCategory === category ? "page" : undefined}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
