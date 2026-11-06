import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products/types";

import styles from "./ProductDetails.module.css";

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <article className={styles.wrapper}>
      <Link href="/products" className={styles.back}>
        ← Back to catalog
      </Link>
      <div className={styles.layout}>
        <div className={styles.media}>
          <Image
            className={styles.image}
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 544px"
            // The main photo is visible right away, so load it with high priority.
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className={styles.info}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{formatPrice(product.priceCents)}</p>
          <p
            className={product.inStock ? styles.inStock : styles.outOfStock}
          >
            {product.inStock ? "In stock" : "Out of stock"}
          </p>
          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
    </article>
  );
}
