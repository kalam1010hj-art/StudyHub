import { ArrowRight, BookOpen } from "lucide-react";
import styles from "./BranchCard.module.css";
import { Link} from "react-router-dom";

function BranchCard({branch}) {
  return (
    <Link to={`/branch/${branch.id}`}>
    <article className={styles.card} >
      <div className={styles.iconWrapper}>
        <BookOpen size={24} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{branch.name}</h3>

        {branch.code && (
          <span className={styles.code}>
            {branch.code}
          </span>
        )}

        {/* {branch.description && (
          <p className={styles.description}>
            {branch.description}
          </p>
        )} */}

        {/* {branch.semesterCount !== undefined && (
          <span className={styles.semesters}>
            {branch.semesterCount} Semesters
          </span>
        )} */}
      </div>

      <div className={styles.arrow}>
        <ArrowRight size={20} />
      </div>
    </article>
    </Link>
   
  );
}

export default BranchCard;