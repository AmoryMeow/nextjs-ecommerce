import "server-only";

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set. See .env.example.");
}

/** Server-side Stripe client. The secret key must never reach the browser. */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
