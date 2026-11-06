import styles from "./ProductCardSkeleton.module.css";

/** Gray placeholder with the same shape as ProductCard, shown while products load. */
export function ProductCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.media} />
      <div className={styles.body}>
        <div className={`${styles.line} ${styles.short}`} />
        <div className={`${styles.line} ${styles.title}`} />
        <div className={styles.line} />
        <div className={`${styles.line} ${styles.medium}`} />
        <div className={`${styles.line} ${styles.price}`} />
      </div>
    </div>
  );
}
