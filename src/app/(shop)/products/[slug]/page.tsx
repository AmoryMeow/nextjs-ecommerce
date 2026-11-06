import { notFound } from "next/navigation";

import { ProductDetails } from "@/components/ProductDetails/ProductDetails";
import { getProductBySlug, getProducts } from "@/lib/products/queries";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetails product={product} />;
}
