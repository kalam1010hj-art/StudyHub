import { ArrowRight, Building2, MapPin, Router } from "lucide-react";
import styles from "./UniversityCard.module.css";
import { Link} from "react-router-dom";

export default function UniversityCard({ university }) {
  return (
    <Link to={`/universities/${university.id}`} className={styles.card}>
      <div className={styles.top}>
        {/* <div className={styles.icon}>
          <Building2 size={22} />
        </div> */}
         {university.logo ? (
            <img
              src={university.logo}
              alt={`${university.name} logo`}
            />
          ) : (
            <span>
              {university.code?.charAt(0)}
            </span>
          )}
        <span className={styles.code}>{university.code}</span>
      </div>
      <h3>{university.name}</h3>
      <p>{university.description}</p>
      <div className={styles.meta}>
        <span>
          <MapPin size={15} />
          {university.city || "India"}
        </span>
        <span></span>
      </div>
      <div className={styles.footer}>
        <span>Explore University</span>
        <ArrowRight size={17} />
      </div>
    </Link>
  );
}
