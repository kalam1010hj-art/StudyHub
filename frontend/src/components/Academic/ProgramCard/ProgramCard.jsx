import { ArrowRight, GraduationCap } from "lucide-react";
import styles from "./ProgramCard.module.css";
import { Link} from "react-router-dom";
export default function ProgramCard({ program }) {
  return (
    <Link to={`/programs/${program.id}`} className={styles.card}>
      <div className={styles.top}>
        <div className={styles.icon}>
          <GraduationCap size={21} />
        </div>
        <span>{program.code}</span>
      </div>
      <h3>{program.name}</h3>
      <p></p>
      <div className={styles.footer}>
        <span>Explore</span>
        <ArrowRight size={17} />
      </div>
    </Link>
  );
}
