"use client";

import { useActionState } from "react";

import { login } from "@/lib/auth/actions";

import styles from "./page.module.css";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, {});

  return (
    <form className={styles.card} action={formAction}>
      <h1 className={styles.title}>Admin login</h1>
      <label className={styles.field}>
        <span className={styles.label}>Password</span>
        <input
          className={styles.input}
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={Boolean(state.error)}
        />
      </label>
      {state.error && <p className={styles.error}>{state.error}</p>}
      <button className={styles.submit} type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
