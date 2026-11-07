import Link from "next/link";
import { Suspense } from "react";

import { CartCount } from "@/components/CartCount/CartCount";

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
              <Link className={styles.cartLink} href="/cart">
                Cart
                <Suspense fallback={null}>
                  <CartCount />
                </Suspense>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
