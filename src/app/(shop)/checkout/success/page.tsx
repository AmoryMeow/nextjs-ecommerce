import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type Stripe from "stripe";

import { formatPrice } from "@/lib/format";
import { stripe } from "@/lib/stripe";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

export default function SuccessPage({
  searchParams,
}: PageProps<"/checkout/success">) {
  return (
    <div className={styles.wrapper}>
      <Suspense fallback={<p className={styles.loading}>Loading…</p>}>
        <OrderSummary searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function OrderSummary({
  searchParams,
}: Pick<PageProps<"/checkout/success">, "searchParams">) {
  const { session_id } = await searchParams;

  if (typeof session_id !== "string") {
    notFound();
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    notFound();
  }

  if (session.payment_status !== "paid") {
    return (
      <>
        <h1 className={styles.title}>Payment not completed</h1>
        <p className={styles.text}>
          Your card was not charged.{" "}
          <Link className={styles.link} href="/cart">
            Back to cart
          </Link>
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className={styles.title}>Thank you!</h1>
      <p className={styles.text}>
        We received your payment of {formatPrice(session.amount_total ?? 0)}.
        {session.customer_details?.email &&
          ` A receipt was sent to ${session.customer_details.email}.`}
      </p>
      <Link className={styles.link} href="/products">
        Continue shopping
      </Link>
    </>
  );
}
