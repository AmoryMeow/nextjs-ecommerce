import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import type Stripe from "stripe";

import { CART_COOKIE } from "@/lib/cart/cookie";
import { stripe } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    redirect("/cart");
  }

  let session: Stripe.Checkout.Session;

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    redirect("/cart");
  }

  if (session.payment_status === "paid") {
    (await cookies()).delete(CART_COOKIE);
  }

  redirect(`/checkout/success?session_id=${encodeURIComponent(sessionId)}`);
}
