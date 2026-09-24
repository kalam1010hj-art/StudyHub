import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Home, 
  BookOpen, 
  Search, 
  HelpCircle, 
  FileCheck, 
  FileCode, 
  Sparkles,
  Compass
} from "lucide-react";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  const QUICK_LINKS = [
    { label: "Resource Hub", path: "/resources", icon: BookOpen, desc: "Explore notes & textbooks" },
    { label: "Question Papers", path: "/resources?type=question_paper", icon: HelpCircle, desc: "Practice with past exams" },
    { label: "Assignments", path: "/resources?type=assignment", icon: FileCheck, desc: "Review coursework & solutions" },
    { label: "Lab Manuals", path: "/resources?type=lab_manual", icon: FileCode, desc: "Access practical guides" },
  ];

  return (
    <main className={styles.page}>
      {/* Background Decorative Ambient Elements */}
      <div className={styles.glowTop} />
      <div className={styles.glowBottom} />

      <div className={styles.container}>
        {/* Hero Visual Block */}
        <section className={styles.heroSection}>
          <div className={styles.badge}>
            <Sparkles size={14} />
            <span>404 Error • Off The Syllabus</span>
          </div>

          <div className={styles.numberWrapper}>
            <span className={styles.digit}>4</span>
            <div className={styles.iconBox}>
              <Compass className={styles.compassIcon} />
            </div>
            <span className={styles.digit}>4</span>
          </div>

          <h1 className={styles.title}>
            Lost in the <span>Library?</span>
          </h1>

          <p className={styles.subtitle}>
            The page or academic resource you're looking for doesn't exist, has been 
            moved, or is temporarily misplaced. Let’s get you back on track!
          </p>

          {/* Primary Action Buttons */}
          <div className={styles.actions}>
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className={styles.backBtn}
            >
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>

            <Link to="/" className={styles.homeBtn}>
              <Home size={18} />
              <span>Return to StudyHub Home</span>
            </Link>
          </div>
        </section>

        {/* Quick Navigation Cards */}
        {/* <section className={styles.suggestionsSection}>
          <div className={styles.suggestionsHeader}>
            <h2>Looking for study materials?</h2>
            <p>Jump directly to our most popular academic hubs:</p>
          </div>

          <div className={styles.grid}>
            {QUICK_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} to={item.path} className={styles.card}>
                  <div className={styles.cardIconWrapper}>
                    <Icon size={20} />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{item.label}</h3>
                    <p>{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section> */}
      </div>
    </main>
  );
}