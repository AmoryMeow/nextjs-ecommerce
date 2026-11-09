import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { formatDateTime, formatPrice } from "@/lib/format";
import { getOrderById } from "@/lib/orders/queries";

import styles from "../orders.module.css";

export const metadata: Metadata = {
  title: "Order",
};

export default function OrderPage({ params }: PageProps<"/admin/orders/[id]">) {
  return (
    <>
      <Link className={styles.back} href="/admin/orders">
        ← All orders
      </Link>

      <Suspense fallback={<p className={styles.muted}>Loading order…</p>}>
        <OrderDetails params={params} />
      </Suspense>
    </>
  );
}

async function OrderDetails({
  params,
}: Pick<PageProps<"/admin/orders/[id]">, "params">) {
  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    notFound();
  }

  const order = await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  return (
    <>
      <h1 className={styles.title}>Order #{order.id}</h1>
      <dl className={styles.meta}>
        <dt>Date</dt>
        <dd>{formatDateTime(order.createdAt)}</dd>
        <dt>Email</dt>
        <dd>{order.email ?? "—"}</dd>
        <dt>Stripe session</dt>
        <dd>{order.stripeSessionId}</dd>
      </dl>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th className={styles.number}>Price</th>
              <th className={styles.number}>Qty</th>
              <th className={styles.number}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link href={`/products/${item.productSlug}`}>
                    {item.name}
                  </Link>
                </td>
                <td className={styles.number}>
                  {formatPrice(item.unitPriceCents)}
                </td>
                <td className={styles.number}>{item.quantity}</td>
                <td className={styles.number}>
                  {formatPrice(item.unitPriceCents * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className={styles.total}>
              <td colSpan={3}>Total</td>
              <td className={styles.number}>{formatPrice(order.totalCents)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
