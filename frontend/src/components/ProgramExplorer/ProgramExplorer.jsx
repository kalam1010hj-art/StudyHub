import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { academicPrograms } from "../../data/mockData";
import styles from "./ProgramExplorer.module.css";

const ProgramExplorer = () => {
  return (
    <section className={styles.explorerSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Browse by Academic Level</h2>
            <p className={styles.sectionSubtitle}>
              Explore vetted resource depositories categorized by academic degree and discipline.
            </p>
          </div>
          <Link to="/programs" className={styles.viewAllLink}>
            <span>View All Programs</span>
            <ChevronRight size={18} />
          </Link>
        </div>

        {/* Program Cards Grid */}
        <div className={styles.cardGrid}>
          {academicPrograms.map((program) => {
            const IconComponent = program.icon;
            return (
              <Link key={program.id} to={`/programs/${program.id}`} className={styles.programCard}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrapper}>
                    <IconComponent size={24} />
                  </div>
                  <span className={styles.resourceBadge}>{program.resourceCount}</span>
                </div>

                <h3 className={styles.programName}>{program.name}</h3>
                <p className={styles.programDescription}>{program.description}</p>

                <div className={styles.cardFooter}>
                  <span>Explore Resources</span>
                  <ArrowRight size={16} className={styles.arrowIcon} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramExplorer;