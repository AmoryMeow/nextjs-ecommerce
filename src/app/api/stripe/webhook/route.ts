import type Stripe from "stripe";

import { fulfillCheckoutSession } from "@/lib/orders/fulfill";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return new Response("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    await fulfillCheckoutSession(event.data.object);
  }

  return Response.json({ received: true });
}
