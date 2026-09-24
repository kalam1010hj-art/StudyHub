import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styles from "./FinalCTA.module.css";

const FinalCTA = () => {
  return (
    <section className={styles.finalCtaSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Everything you need to study, <br /> in one unified place.
        </h2>
        <p className={styles.subtitle}>
          Join thousands of engineering and degree students who prepare smarter and save time with StudyHub.
        </p>
        <div className={styles.buttonGroup}>
          <Link to="/resourceHub" className={styles.primaryBtn}>
            <span>Explore Resources</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/register" className={styles.secondaryBtn}>
            Create an Account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;