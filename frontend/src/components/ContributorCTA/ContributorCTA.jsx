import React from "react";
import { Link } from "react-router-dom";
import { Upload, Users } from "lucide-react";
import styles from "./ContributorCTA.module.css";

const ContributorCTA = () => {
  return (
    <section className={styles.contributorSection}>
      <div className={styles.container}>
        <div className={styles.banner}>
          <div className={styles.badge}>
            <Users size={14} />
            <span>Community Driven</span>
          </div>

          <h2 className={styles.title}>Have Useful Study Material?</h2>

          <p className={styles.subtitle}>
            Share your lecture notes, assignment solutions, and question papers to help thousands of fellow students excel in their academic journey.
          </p>

          <Link to="/upload" className={styles.uploadBtn}>
            <Upload size={18} />
            <span>Upload a Resource</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContributorCTA;