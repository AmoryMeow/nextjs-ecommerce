import type { Metadata } from "next";

import { AdminNav } from "@/components/AdminNav/AdminNav";

import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin | Cartly" },
  // Admin pages must never show up in search results.
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className={styles.container}>
      <AdminNav />
      {children}
    </div>
  );
}
