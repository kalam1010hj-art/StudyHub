import { ArrowRight, Layers3 } from "lucide-react";
import styles from "./SemesterCard.module.css";
import { Link } from "react-router-dom";

export default function SemesterCard({ semester }) {
  return (
    <Link to={`/semester/${semester.id}`} className={styles.card}>
      <div className={styles.icon}>
        <Layers3 size={19} />
      </div>
      <h3>{semester.number} semester</h3>
      
      <div className={styles.footer}>
        <span>Explore</span>
        <ArrowRight size={16} />
      </div>
    </Link>
  );
}
