import React from "react";
import { Link } from "react-router-dom";
import { Landmark, Building2, ArrowRight } from "lucide-react";
import styles from "./AcademicDiscovery.module.css";

const AcademicDiscovery = () => {
  return (
    <section className={styles.discoverySection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Explore Your Academic Community</h2>
          <p className={styles.subtitle}>
            Navigate structured resource trees directly linked to your institution.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Universities Banner Card */}
          <div className={styles.discoveryCard}>
            <div className={styles.cardIcon}>
              <Landmark size={28} />
            </div>
            <h3 className={styles.cardTitle}>Universities</h3>
            <p className={styles.cardText}>
              Browse recognized state, central, and private universities to access university-wide syllabi and regulation archives.
            </p>
            <Link to="/universities" className={styles.ctaButton}>
              <span>Explore Universities</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Colleges Banner Card */}
          <div className={styles.discoveryCard}>
            <div className={styles.cardIconAlt}>
              <Building2 size={28} />
            </div>
            <h3 className={styles.cardTitle}>Colleges & Institutes</h3>
            <p className={styles.cardText}>
              Find affiliated college campuses, autonomous institution branches, and specific department portals.
            </p>
            <Link to="/colleges" className={styles.ctaButton}>
              <span>Explore Colleges</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicDiscovery;