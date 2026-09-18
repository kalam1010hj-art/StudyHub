import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight, BookOpen, ShieldCheck, FileText, Sparkles } from "lucide-react";
import styles from "./Hero.module.css";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/resources?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        {/* Left Column: Headline, CTAs, Search */}
        <div className={styles.contentColumn}>
          <div className={styles.badge}>
            <Sparkles size={14} className={styles.badgeIcon} />
            <span>The Premier Academic Repository</span>
          </div>

          <h1 className={styles.title}>
            Learn. Share. <span className={styles.gradientText}>Grow.</span>
          </h1>

          <p className={styles.subtitle}>
            StudyHub empowers students to discover, access, and contribute verified academic materials—tailored precisely to your university, college, and program hierarchy.
          </p>

          {/* Search Bar */}
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <div className={styles.inputWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Search notes, question papers, subjects, or programs..."
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

          {/* Action CTAs */}
          <div className={styles.ctaGroup}>
            <Link to="/resources" className={styles.primaryCta}>
              <span>Explore Resources</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/programs" className={styles.secondaryCta}>
              Browse Programs
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Product Card Preview */}
        <div className={styles.visualColumn}>
          <div className={styles.visualCardContainer}>
            {/* Visual Glass Header */}
            <div className={styles.cardHeader}>
              <div className={styles.dotGroup}>
                <span className={styles.dotRed}></span>
                <span className={styles.dotYellow}></span>
                <span className={styles.dotGreen}></span>
              </div>
              <div className={styles.cardBreadcrumb}>
                JNTUH &gt; B.Tech &gt; CSE &gt; Sem 4
              </div>
            </div>

            {/* Mock Resource Item Card 1 */}
            <div className={styles.mockResourceCard}>
              <div className={styles.mockIconBox}>
                <BookOpen size={20} />
              </div>
              <div className={styles.mockDetails}>
                <div className={styles.mockTitleRow}>
                  <span className={styles.mockTitle}>Design & Analysis of Algorithms</span>
                  <ShieldCheck size={16} className={styles.verifiedBadge} />
                </div>
                <div className={styles.mockMeta}>
                  <span>Handwritten Notes</span> • <span>PDF (14.2 MB)</span>
                </div>
              </div>
            </div>

            {/* Mock Resource Item Card 2 */}
            <div className={styles.mockResourceCard}>
              <div className={styles.mockIconBoxAlt}>
                <FileText size={20} />
              </div>
              <div className={styles.mockDetails}>
                <div className={styles.mockTitleRow}>
                  <span className={styles.mockTitle}>Mid-2 Solved Question Papers</span>
                  <ShieldCheck size={16} className={styles.verifiedBadge} />
                </div>
                <div className={styles.mockMeta}>
                  <span>Verified PYQ</span> • <span>2024-2025</span>
                </div>
              </div>
            </div>

            {/* Floating Info Capsule */}
            <div className={styles.floatingCapsule}>
              <div className={styles.capsulePulse}></div>
              <span>Over 85,000 verified resources ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;