"use client";

import Link from "next/link";
import { useEffect } from "react";

import styles from "./error.module.css";

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.text}>
        We couldn’t load this page. Please try again.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.button} onClick={retry}>
          Try again
        </button>
        <Link className={styles.link} href="/">
          Back to home
        </Link>
      </div>
    </section>
  );
}
