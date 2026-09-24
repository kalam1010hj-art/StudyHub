import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Columns */}
        <div className={styles.brandCol}>
          <Link to="/" className={styles.logo}>
            <BookOpen className={styles.logoIcon} size={22} />
            <span>StudyHub</span>
          </Link>
          <p className={styles.tagline}>
            The academic resource discovery engine built for modern students and higher education communities.
          </p>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Navigation</h4>
          <ul className={styles.linkList}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/universities">Universities</Link></li>
            <li><Link to="/colleges">Colleges</Link></li>
           
            <li><Link to="/resourceHub">Resources</Link></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Account</h4>
          <ul className={styles.linkList}>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/upload">Upload Material</Link></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Platform</h4>
          <ul className={styles.linkList}>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>© {new Date().getFullYear()} StudyHub. All rights reserved.</p>
          <p className={styles.builtWith}>Engineered with Django & React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;