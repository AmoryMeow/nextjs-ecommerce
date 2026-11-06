import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.inner}>Cartly — a learning project built with Next.js</p>
    </footer>
  );
}
