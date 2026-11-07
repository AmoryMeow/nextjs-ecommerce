"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { SubmitEvent } from "react";

import styles from "./SearchBox.module.css";

export function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("q") ?? "";

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = String(formData.get("q") ?? "").trim();

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    const search = params.toString();
    router.push(search ? `${pathname}?${search}` : pathname);
  }

  return (
    <form className={styles.form} role="search" onSubmit={handleSubmit}>
      <input
        key={currentQuery}
        className={styles.input}
        type="search"
        name="q"
        placeholder="Search products"
        aria-label="Search products"
        defaultValue={currentQuery}
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}
