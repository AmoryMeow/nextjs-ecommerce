import styles from "./layout.module.css";

export default function ShopLayout({ children }: LayoutProps<"/">) {
  return <div className={styles.container}>{children}</div>;
}
