import type { Metadata } from "next";

import { ProductCard } from "@/components/ProductCard/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter/CategoryFilter";
import { getProducts } from "@/lib/products/queries";
import { isProductCategory } from "@/lib/products/types";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Catalog",
};

export default async function CatalogPage({
  searchParams,
}: PageProps<"/products">) {
  const { category } = await searchParams;
  const activeCategory = isProductCategory(category) ? category : undefined;

  const allProducts = await getProducts();
  const products = activeCategory
    ? allProducts.filter((product) => product.category === activeCategory)
    : allProducts;

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Catalog</h1>
        <p className={styles.count}>
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </div>
      <CategoryFilter activeCategory={activeCategory} />
      <ul className={styles.grid}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}
