import { ArrowUpRight, FileText } from "lucide-react";
import styles from "./ResourcePreview.module.css";

export default function ResourcePreview({ resource }) {
  const Icon = resource.icon || FileText;
  return (
    <a href={`/resources/${resource.id}`} className={styles.card}>
      <div className={styles.icon}>
        <Icon size={19} />
      </div>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3>{resource.title}</h3>
          <span>{resource.type}</span>
        </div>
        <p>
          {resource.semester} · {resource.meta}
        </p>
      </div>
      <ArrowUpRight size={18} className={styles.arrow} />
    </a>
  );
}
