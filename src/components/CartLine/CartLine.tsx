import Image from "next/image";
import Link from "next/link";

import { updateQuantity } from "@/lib/cart/actions";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products/types";

import styles from "./CartLine.module.css";
import { QuantityStepper } from "./QuantityStepper";
import { RemoveButton } from "./RemoveButton";

type CartLineProps = {
  product: Product;
  quantity: number;
};

/** One row of the cart: photo, name, unit price, quantity and line total. */
export function CartLine({ product, quantity }: CartLineProps) {
  return (
    <article className={styles.line}>
      <div className={styles.media}>
        <Image
          className={styles.image}
          src={product.image}
          alt=""
          fill
          sizes="80px"
        />
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h2>
        <p className={styles.meta}>{formatPrice(product.priceCents)} each</p>
        <div className={styles.controls}>
          <QuantityStepper slug={product.slug} quantity={quantity} />
          <form action={updateQuantity.bind(null, product.slug, 0)}>
            <RemoveButton />
          </form>
        </div>
      </div>
      <p className={styles.total}>
        {formatPrice(product.priceCents * quantity)}
      </p>
    </article>
  );
}
