import { loadEnvConfig } from "@next/env";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

import { products } from "./schema";
import { seedProducts } from "./seed-data";

loadEnvConfig(process.cwd());

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  await db.execute(sql`TRUNCATE TABLE ${products} RESTART IDENTITY`);

  const inserted = await db
    .insert(products)
    .values(seedProducts)
    .returning({ id: products.id });

  console.log(`Seeded ${inserted.length} products`);

  await db.$client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
