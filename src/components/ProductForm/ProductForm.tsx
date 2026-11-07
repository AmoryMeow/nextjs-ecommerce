"use client";

import { useActionState } from "react";

import type { Product } from "@/lib/products/types";
import type { ProductFormState } from "@/lib/products/validation";

import styles from "./ProductForm.module.css";

type ProductFormProps = {
  product: Product;
  action: (
    state: ProductFormState,
    formData: FormData,
  ) => Promise<ProductFormState>;
};

export function ProductForm({ product, action }: ProductFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form className={styles.form} action={formAction}>
      <label className={styles.field}>
        <span className={styles.label}>Name</span>
        <input
          className={styles.input}
          name="name"
          defaultValue={state.values?.name ?? product.name}
          required
          maxLength={120}
          aria-invalid={Boolean(state.errors?.name)}
        />
        {state.errors?.name && (
          <span className={styles.error}>{state.errors.name[0]}</span>
        )}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Description</span>
        <textarea
          className={styles.input}
          name="description"
          defaultValue={state.values?.description ?? product.description}
          required
          rows={4}
          maxLength={500}
          aria-invalid={Boolean(state.errors?.description)}
        />
        {state.errors?.description && (
          <span className={styles.error}>{state.errors.description[0]}</span>
        )}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Price, USD</span>
        <input
          className={styles.input}
          name="price"
          type="number"
          defaultValue={
            state.values?.price ?? (product.priceCents / 100).toFixed(2)
          }
          required
          min="0.01"
          step="0.01"
          aria-invalid={Boolean(state.errors?.price)}
        />
        {state.errors?.price && (
          <span className={styles.error}>{state.errors.price[0]}</span>
        )}
      </label>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          name="inStock"
          defaultChecked={state.values?.inStock ?? product.inStock}
        />
        In stock
      </label>

      <button className={styles.submit} type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
