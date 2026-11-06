import Link from "next/link";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Cartly
        </Link>
        <nav aria-label="Main">
          <ul className={styles.nav}>
            <li>
              <Link href="/products">Catalog</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
