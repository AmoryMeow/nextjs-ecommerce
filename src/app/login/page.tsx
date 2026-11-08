import type { Metadata } from "next";

import { LoginForm } from "./LoginForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  );
}
