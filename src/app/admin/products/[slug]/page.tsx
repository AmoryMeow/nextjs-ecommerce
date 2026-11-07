import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductForm } from "@/components/ProductForm/ProductForm";
import { updateProduct } from "@/lib/products/actions";
import { getProductBySlug, getProducts } from "@/lib/products/queries";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export const metadata: Metadata = { title: "Edit product" };

export default async function EditProductPage({
  params,
}: PageProps<"/admin/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const action = updateProduct.bind(null, product.slug);

  return (
    <>
      <h1>Edit {product.name}</h1>
      <ProductForm product={product} action={action} />
    </>
  );
}
