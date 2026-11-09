import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { formatDateTime, formatPrice } from "@/lib/format";
import { getOrders } from "@/lib/orders/queries";

import styles from "./orders.module.css";

export const metadata: Metadata = {
  title: "Orders",
};

export default function OrdersPage() {
  return (
    <>
      <h1 className={styles.title}>Orders</h1>
      <Suspense fallback={<p className={styles.muted}>Loading orders…</p>}>
        <OrdersTable />
      </Suspense>
    </>
  );
}

async function OrdersTable() {
  const orders = await getOrders();

  if (orders.length === 0) {
    return <p className={styles.muted}>No orders yet.</p>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Email</th>
            <th className={styles.number}>Items</th>
            <th className={styles.number}>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <Link href={`/admin/orders/${order.id}`}>#{order.id}</Link>
              </td>
              <td>{formatDateTime(order.createdAt)}</td>
              <td>{order.email ?? "—"}</td>
              <td className={styles.number}>
                {order.items.reduce((sum, item) => sum + item.quantity, 0)}
              </td>
              <td className={styles.number}>{formatPrice(order.totalCents)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
