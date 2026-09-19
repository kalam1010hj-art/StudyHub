
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}>
        <div className={styles.orbit}></div>
        <div className={styles.orbit}></div>
        <div className={styles.orbit}></div>

        <div className={styles.center}>
          <span>SH</span>
        </div>
      </div>

      <div className={styles.content}>
        <h2>Loading StudyHub</h2>
        <p>Preparing your academic resources...</p>

        <div className={styles.progress}>
          <div className={styles.progressBar}></div>
        </div>
      </div>
    </div>
  );
}

