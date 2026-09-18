import React from "react";
import { platformStats } from "../../data/mockData";
import styles from "./PlatformStats.module.css";

const PlatformStats = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {platformStats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.value}>{stat.value}</div>
              <div className={styles.label}>{stat.label}</div>
              <div className={styles.change}>{stat.change}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;