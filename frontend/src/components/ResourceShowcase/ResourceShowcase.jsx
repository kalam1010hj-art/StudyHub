import React from "react";
import { Link } from "react-router-dom";
import { Download, ShieldCheck, ChevronRight } from "lucide-react";
import { featuredResources } from "../../data/mockData";
import styles from "./ResourceShowcase.module.css";

const ResourceShowcase = () => {
  return (
    <section className={styles.resourceSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Featured Academic Resources</h2>
            <p className={styles.sectionSubtitle}>
              Recent top-rated notes, verified question papers, and syllabus solutions.
            </p>
          </div>
          <Link to="/resourceHub" className={styles.exploreLink}>
            <span>Explore All Materials</span>
            <ChevronRight size={18} />
          </Link>
        </div>

        {/* Resources Grid */}
        <div className={styles.resourceGrid}>
          {featuredResources.map((resource) => {
            const Icon = resource.typeIcon;
            return (
              <div key={resource.id} className={styles.resourceCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.typeTag}>
                    <Icon size={14} />
                    {resource.type}
                  </span>
                  <span className={styles.programTag}>{resource.program}</span>
                </div>

                <h3 className={styles.resourceTitle}>{resource.title}</h3>

                <div className={styles.metaRow}>
                  <span>{resource.subject}</span>
                  <span>•</span>
                  <span>{resource.university}</span>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.uploadInfo}>
                    {resource.verified && (
                      <span className={styles.verifiedTag}>
                        <ShieldCheck size={14} /> Verified
                      </span>
                    )}
                    <span className={styles.date}>{resource.uploadDate}</span>
                  </div>

                  <Link to={`/resources/${resource.id}`} className={styles.downloadBtn}>
                    <Download size={15} />
                    <span>View / PDF</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourceShowcase;