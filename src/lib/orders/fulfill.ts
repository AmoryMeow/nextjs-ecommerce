import "server-only";

import type Stripe from "stripe";

import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { stripe } from "@/lib/stripe";

/**
 * Saves a paid Checkout Session as an order.
 *
 * Idempotent: Stripe may deliver the same event more than once, and the
 * unique stripe_session_id makes every repeat a no-op.
 * Returns false when the order already existed.
 */
export async function fulfillCheckoutSession(
  session: Stripe.Checkout.Session,
): Promise<boolean> {
  if (session.payment_status !== "paid") return false;

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    expand: ["data.price.product"],
    limit: 100,
  });

  const items = lineItems.data.map((item) => {
    const product = item.price?.product;
    const slug =
      product && typeof product === "object" && !product.deleted
        ? product.metadata.slug
        : undefined;

    return {
      productSlug: slug ?? "unknown",
      name: item.description ?? "Unknown product",
      unitPriceCents: item.price?.unit_amount ?? 0,
      quantity: item.quantity ?? 1,
    };
  });

  return db.transaction(async (tx) => {
    const [order] = await tx
      .insert(orders)
      .values({
        stripeSessionId: session.id,
        email: session.customer_details?.email ?? null,
        totalCents: session.amount_total ?? 0,
      })
      .onConflictDoNothing({ target: orders.stripeSessionId })
      .returning({ id: orders.id });

    // Already saved by an earlier delivery of the same event.
    if (!order) return false;

    if (items.length > 0) {
      await tx
        .insert(orderItems)
        .values(items.map((item) => ({ ...item, orderId: order.id })));
    }
    return true;
  });
}
