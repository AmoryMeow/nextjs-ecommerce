import type { Metadata } from "next";

import { CategoryFilter } from "@/components/CategoryFilter/CategoryFilter";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { getProducts } from "@/lib/products/queries";
import { isProductCategory } from "@/lib/products/types";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Catalog",
  alternates: { canonical: "/products" },
};

export default async function CatalogPage({
  searchParams,
}: PageProps<"/products">) {
  const { q, category } = await searchParams;
  const activeCategory = isProductCategory(category) ? category : undefined;
  const query = typeof q === "string" ? q.trim() : "";

  const allProducts = await getProducts();
  const normalizedQuery = query.toLowerCase();
  const products = allProducts.filter(
    (product) =>
      (!activeCategory || product.category === activeCategory) &&
      product.name.toLowerCase().includes(normalizedQuery),
  );

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Catalog</h1>
        <p className={styles.count}>
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </div>
      <SearchBox />
      <CategoryFilter activeCategory={activeCategory} query={query} />
      {products.length === 0 ? (
        <p className={styles.empty}>No products found.</p>
      ) : (
        <ul className={styles.grid}>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
