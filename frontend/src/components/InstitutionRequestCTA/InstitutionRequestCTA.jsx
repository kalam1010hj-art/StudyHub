import React from "react";
import { ArrowRight, Building2, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./InstitutionRequestCTA.module.css";

export default function InstitutionRequestCTA() {
  return (
    <section className={styles.section} aria-label="Request an institution">
      <div className={styles.card}>
        <div className={styles.icon}>
          <Building2 size={22} />
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow}>Can't find your institution?</span>
          <h2>Want to add a college or university?</h2>
          <p>
            Tell us about a missing university, college, or incorrect
            institution information and we'll review the request.
          </p>

          <div className={styles.actions}>
            <Link to="/contact" className={styles.primary}>
              Contact StudyHub
              <ArrowRight size={17} />
            </Link>

            <a href="mailto:kalam1010hj@gmail.com" className={styles.secondary}>
              <Mail size={16} />
              Email us
            </a>

            <a href="tel:+917013741498" className={styles.secondary}>
              <Phone size={16} />
              Call us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
