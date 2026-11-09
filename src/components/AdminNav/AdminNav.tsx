"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

import { logout } from "@/lib/auth/actions";

import styles from "./AdminNav.module.css";

const LINKS = [
  { href: "/admin", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
] as const;

function isActive(pathname: string, href: string): boolean {
  // "/admin" also prefixes "/admin/orders", so the products link matches
  // the dashboard and product editing pages only.
  if (href === "/admin") {
    return pathname === "/admin" || pathname.startsWith("/admin/products");
  }
  return pathname.startsWith(href);
}

function NavLinks({ pathname }: { pathname: string | null }) {
  return (
    <ul className={styles.links}>
      {LINKS.map(({ href, label }) => (
        <li key={href}>
          <Link
            className={styles.link}
            href={href}
            aria-current={
              pathname && isActive(pathname, href) ? "page" : undefined
            }
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function CurrentNavLinks() {
  const pathname = usePathname();
  return <NavLinks pathname={pathname} />;
}

export function AdminNav() {
  return (
    <nav className={styles.nav} aria-label="Admin">
      {/* On dynamic routes (e.g. /admin/orders/[id]) the pathname is only known
          at request time, so the active state streams in; links render instantly. */}
      <Suspense fallback={<NavLinks pathname={null} />}>
        <CurrentNavLinks />
      </Suspense>
      <form action={logout}>
        <button className={styles.logout} type="submit">
          Log out
        </button>
      </form>
    </nav>
  );
}
