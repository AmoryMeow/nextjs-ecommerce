import type { Metadata } from "next";
import Link from "next/link";

import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFoundPage() {
  return (
    <section className={styles.wrapper}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.text}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link className={styles.link} href="/">
        Back to home
      </Link>
    </section>
  );
}
