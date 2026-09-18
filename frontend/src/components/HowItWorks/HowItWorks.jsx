import React from "react";
import { howItWorksSteps } from "../../data/mockData";
import styles from "./HowItWorks.module.css";

const HowItWorks = () => {
  return (
    <section className={styles.howSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>How StudyHub Works</h2>
          <p className={styles.subtitle}>
            A simple 3-step structured process to get you exam-ready without stress.
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {howItWorksSteps.map((step) => (
            <div key={step.stepNumber} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.stepNumber}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;