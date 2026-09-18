import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  FileText,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import styles from "./Hero.module.css";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();

    if (query) {
      navigate(`/resources?q=${encodeURIComponent(query)}`);
    } else {
      navigate("/resources");
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.backgroundGlow} />
      <div className={styles.container}>
        <div className={styles.contentColumn}>
          <div className={styles.badge}>
            <Sparkles size={14} />
            <span>A smarter way to study</span>
          </div>

          <h1 className={styles.title}>
            Your academics,
            <span className={styles.gradientText}> organized.</span>
          </h1>

          <p className={styles.subtitle}>
            Find notes, question papers, assignments, and study material
            organized around your university, college, program, and semester.
          </p>

          <form className={styles.searchForm} onSubmit={handleSearch}>
            <div className={styles.inputWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="search"
                placeholder="Search notes, question papers, subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Search study resources"
              />
            </div>
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>

          <div className={styles.ctaGroup}>
            <Link to="/resources" className={styles.primaryCta}>
              <span>Explore Resources</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/programs" className={styles.secondaryCta}>
              Browse Programs
            </Link>
          </div>

          <div className={styles.trustRow}>
            <div className={styles.trustIcon}>
              <ShieldCheck size={16} />
            </div>
            <span>Structured academic discovery</span>
            <span className={styles.trustDot}>•</span>
            <span>Student-focused</span>
          </div>
        </div>

        <div className={styles.visualColumn}>
          <div className={styles.visualCardContainer}>
            <div className={styles.cardHeader}>
              <div className={styles.dotGroup} aria-hidden="true">
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.cardLabel}>StudyHub</span>
            </div>

            <div className={styles.pathRow}>
              <GraduationCap size={16} />
              <span>JNTUH</span>
              <span>/</span>
              <span>B.Tech</span>
              <span>/</span>
              <strong>CSE</strong>
              <span>/</span>
              <span>Sem 4</span>
            </div>

            <div className={styles.resourceList}>
              <div className={styles.mockResourceCard}>
                <div className={styles.mockIconBox}>
                  <BookOpen size={20} />
                </div>
                <div className={styles.mockDetails}>
                  <div className={styles.mockTitleRow}>
                    <span className={styles.mockTitle}>Design & Analysis of Algorithms</span>
                    <ShieldCheck size={16} className={styles.verifiedBadge} />
                  </div>
                  <div className={styles.mockMeta}>Handwritten Notes · PDF</div>
                </div>
                <ArrowRight size={16} className={styles.resourceArrow} />
              </div>

              <div className={styles.mockResourceCard}>
                <div className={styles.mockIconBoxAlt}>
                  <FileText size={20} />
                </div>
                <div className={styles.mockDetails}>
                  <div className={styles.mockTitleRow}>
                    <span className={styles.mockTitle}>Mid-2 Solved Question Papers</span>
                    <ShieldCheck size={16} className={styles.verifiedBadge} />
                  </div>
                  <div className={styles.mockMeta}>Previous Papers · 2024–25</div>
                </div>
                <ArrowRight size={16} className={styles.resourceArrow} />
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div>
                <span className={styles.footerKicker}>Academic path</span>
                <strong>University → College → Program → Resources</strong>
              </div>
              <div className={styles.footerBadge}>Ready to explore</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
