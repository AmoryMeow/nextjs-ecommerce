"use client";

import { useFormStatus } from "react-dom";

import styles from "./CartLine.module.css";

export function RemoveButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={styles.remove} disabled={pending}>
      {pending ? "Removing…" : "Remove"}
    </button>
  );
}
