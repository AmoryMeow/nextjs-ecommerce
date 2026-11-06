import Link from "next/link";

import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products/types";

import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.category}>{product.category}</p>
      <h2 className={styles.name}>
        <Link href={`/products/${product.slug}`} className={styles.link}>
          {product.name}
        </Link>
      </h2>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.footer}>
        <span className={styles.price}>{formatPrice(product.priceCents)}</span>
        {!product.inStock && (
          <span className={styles.outOfStock}>Out of stock</span>
        )}
      </div>
    </article>
  );
}
