"use client";

import { useOptimistic } from "react";

import { updateQuantity } from "@/lib/cart/actions";
import { MAX_QUANTITY } from "@/lib/cart/cookie";

import styles from "./CartLine.module.css";

type QuantityStepperProps = {
  slug: string;
  quantity: number;
};

export function QuantityStepper({ slug, quantity }: QuantityStepperProps) {
  const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity);

  async function changeQuantity(next: number) {
    setOptimisticQuantity(next);
    await updateQuantity(slug, next);
  }

  return (
    <div className={styles.stepper}>
      <form action={() => changeQuantity(optimisticQuantity - 1)}>
        <button
          type="submit"
          className={styles.stepButton}
          aria-label="Decrease quantity"
        >
          −
        </button>
      </form>
      <span className={styles.qty}>{optimisticQuantity}</span>
      <form action={() => changeQuantity(optimisticQuantity + 1)}>
        <button
          type="submit"
          className={styles.stepButton}
          aria-label="Increase quantity"
          disabled={optimisticQuantity >= MAX_QUANTITY}
        >
          +
        </button>
      </form>
    </div>
  );
}
