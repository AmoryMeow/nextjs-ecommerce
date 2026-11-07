import Link from "next/link";

import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/products/types";

import styles from "./CategoryFilter.module.css";

type CategoryFilterProps = {
  /** Currently selected category, or undefined for "All". */
  activeCategory: ProductCategory | undefined;
  /** Current search query; kept in the links so switching category doesn't reset the search. */
  query?: string;
};

export function CategoryFilter({ activeCategory, query }: CategoryFilterProps) {
  const q = query || undefined;

  return (
    <nav aria-label="Categories">
      <ul className={styles.list}>
        <li>
          <Link
            className={styles.link}
            href={{ pathname: "/products", query: { q } }}
            aria-current={activeCategory === undefined ? "page" : undefined}
          >
            All
          </Link>
        </li>
        {PRODUCT_CATEGORIES.map((category) => (
          <li key={category}>
            <Link
              className={styles.link}
              href={{ pathname: "/products", query: { category, q } }}
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
