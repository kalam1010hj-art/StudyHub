import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({ items = [] }) {
  const normalized = items
    .filter((item) => item?.label)
    .map((item) => ({ label: item.label, path: item.path || null }));

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      {normalized.map((item, index) => {
        const first = index === 0;
        const last = index === normalized.length - 1;

        return (
          <span className={styles.group} key={`${item.label}-${index}`}>
            {first ? (
              item.path ? (
                <Link to={item.path} className={styles.item}>
                  <Home size={14} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className={styles.item}>
                  <Home size={14} aria-hidden="true" />
                  <span>{item.label}</span>
                </span>
              )
            ) : (
              <>
                <ChevronRight size={14} aria-hidden="true" />
                {last || !item.path ? (
                  <span className={styles.current}>{item.label}</span>
                ) : (
                  <Link to={item.path} className={styles.itemText}>{item.label}</Link>
                )}
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
}
