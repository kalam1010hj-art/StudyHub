import { ArrowRight, Building2, MapPin } from "lucide-react";
import styles from "./CollegeCard.module.css";

export default function CollegeCard({ college }) {
  return (
    <a href={`/colleges/${college.id}`} className={styles.card}>
      <div className={styles.icon}>
        <Building2 size={21} />
      </div>
      <div className={styles.body}>
        <span className={styles.code}>{college.code}</span>
        <h3>{college.name}</h3>
        <p>
          <MapPin size={14} />
          Hyderabad
        </p>
      </div>
      <div className={styles.footer}>
        <span>20 Programs</span>
        <ArrowRight size={17} />
      </div>
    </a>
  );
}
