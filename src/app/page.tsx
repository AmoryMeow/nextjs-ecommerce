import styles from "./page.module.css";

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Cartly</h1>
      <p className={styles.description}>A modern e-commerce storefront</p>
    </section>
  );
}
