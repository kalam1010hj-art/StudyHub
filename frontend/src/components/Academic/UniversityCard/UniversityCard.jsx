import { ArrowRight, Building2, MapPin, Router } from "lucide-react";
import styles from "./UniversityCard.module.css";
import { Link} from "react-router-dom";

export default function UniversityCard({ university }) {
  return (
    <Link to={`/universities/${university.id}`} className={styles.card}>
      <div className={styles.top}>
        <div className={styles.icon}>
          <Building2 size={22} />
        </div>
        <span className={styles.code}>{university.code}</span>
      </div>
      <h3>{university.name}</h3>
      <p>Description</p>
      <div className={styles.meta}>
        <span>
          <MapPin size={15} />
          Hyderabad
        </span>
        <span>200 Colleges</span>
      </div>
      <div className={styles.footer}>
        <span>Explore University</span>
        <ArrowRight size={17} />
      </div>
    </Link>
  );
}
