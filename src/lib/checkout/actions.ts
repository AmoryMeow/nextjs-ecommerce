"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type Stripe from "stripe";

import { CART_COOKIE, parseCart } from "@/lib/cart/cookie";
import { getProducts } from "@/lib/products/queries";
import { getSiteUrl } from "@/lib/site";
import { stripe } from "@/lib/stripe";

export async function checkout(): Promise<void> {
  const items = parseCart((await cookies()).get(CART_COOKIE)?.value);
  const products = await getProducts();
  const bySlug = new Map(products.map((product) => [product.slug, product]));

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    items.flatMap((item) => {
      const product = bySlug.get(item.slug);
      return product && product.inStock
        ? [
            {
              quantity: item.quantity,
              price_data: {
                currency: "usd",
                unit_amount: product.priceCents,
                product_data: {
                  name: product.name,
                  images: [product.image],
                  metadata: { slug: product.slug },
                },
              },
            },
          ]
        : [];
    });

  if (lineItems.length === 0) {
    redirect("/cart");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${getSiteUrl()}/checkout/complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getSiteUrl()}/cart`,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  redirect(session.url);
}
