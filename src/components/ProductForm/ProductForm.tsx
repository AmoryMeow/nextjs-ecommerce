import type { Product } from "@/lib/products/types";

import styles from "./ProductForm.module.css";

type ProductFormProps = {
  product: Product;
  /** Server Action that receives the submitted form data. */
  action: (formData: FormData) => Promise<void>;
};

export function ProductForm({ product, action }: ProductFormProps) {
  return (
    <form className={styles.form} action={action}>
      <label className={styles.field}>
        <span className={styles.label}>Name</span>
        <input
          className={styles.input}
          name="name"
          defaultValue={product.name}
          required
          maxLength={120}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Description</span>
        <textarea
          className={styles.input}
          name="description"
          defaultValue={product.description}
          required
          rows={4}
          maxLength={500}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Price, USD</span>
        <input
          className={styles.input}
          name="price"
          type="number"
          defaultValue={(product.priceCents / 100).toFixed(2)}
          required
          min="0.01"
          step="0.01"
        />
      </label>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          name="inStock"
          defaultChecked={product.inStock}
        />
        In stock
      </label>

      <button className={styles.submit} type="submit">
        Save
      </button>
    </form>
  );
}
