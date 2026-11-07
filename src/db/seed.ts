import { loadEnvConfig } from "@next/env";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

import { products as productData } from "@/lib/products/data";

import { products } from "./schema";

loadEnvConfig(process.cwd());

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  await db.execute(sql`TRUNCATE TABLE ${products} RESTART IDENTITY`);

  const inserted = await db
    .insert(products)
    .values(productData.map(({ id, ...rest }) => rest))
    .returning({ id: products.id });

  console.log(`Seeded ${inserted.length} products`);

  await db.$client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
