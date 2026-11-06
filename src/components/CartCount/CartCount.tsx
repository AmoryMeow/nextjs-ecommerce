import { cookies } from "next/headers";

import { CART_COOKIE, parseCart } from "@/lib/cart/cookie";

import styles from "./CartCount.module.css";

export async function CartCount() {
  const cookieStore = await cookies();

  const items = parseCart(cookieStore.get(CART_COOKIE)?.value);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  if (count === 0) return null;

  return <span className={styles.badge}>{count}</span>;
}
