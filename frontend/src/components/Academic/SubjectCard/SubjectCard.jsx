import { BookOpen, ArrowRight } from "lucide-react";
import styles from "./SubjectCard.module.css";
import { Link } from "react-router-dom";

const SubjectCard = ({ subject}) => {
  return (
    <Link to={`/resources/${subject.id}`}>
    <article className={styles.card}>
      <div className={styles.iconWrapper}>
        <BookOpen size={24} />
      </div>

      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.code}>
            {subject.code}
          </span>

          {/* {subject.credits && (
            <span className={styles.credits}>
              {subject.credits} Credits
            </span>
          )} */}
        </div>

        <h3 className={styles.title}>
          {subject.name}
        </h3>

        {/* {subject.description && (
          <p className={styles.description}>
            {subject.description}
          </p>
        )} */}

        <button
          className={styles.button}
        //   onClick={() => onClick?.(subject)}
        >
          View Resources
          <ArrowRight size={17} />
        </button>
      </div>
    </article>
    </Link>
  );
};

export default SubjectCard;