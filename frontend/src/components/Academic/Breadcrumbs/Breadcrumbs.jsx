import { ChevronRight, Home } from "lucide-react";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <a href="/" className={styles.item}><Home size={14} aria-hidden="true" /> <span>Home</span></a>
      {items.map((item, index) => (
        <span className={styles.group} key={`${item.label}-${index}`}>
          <ChevronRight size={14} aria-hidden="true" />
          <span className={index === items.length - 1 ? styles.current : styles.itemText}>{item.label}</span>
        </span>
      ))}
    </nav>
  );
}
