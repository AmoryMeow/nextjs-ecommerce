import "server-only";

import { db } from "@/db";
import { requireAdmin } from "@/lib/auth/session";

export async function getOrders() {
  await requireAdmin();

  return db.query.orders.findMany({
    orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    with: { items: true },
  });
}

export async function getOrderById(id: number) {
  await requireAdmin();

  return db.query.orders.findFirst({
    where: (orders, { eq }) => eq(orders.id, id),
    with: { items: true },
  });
}
