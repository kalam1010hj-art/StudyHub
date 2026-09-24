import React from "react";
import { Mail, Phone, Building2, GraduationCap, ArrowRight } from "lucide-react";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>StudyHub • Contact</span>
          <h1>Help us grow the academic directory.</h1>
          <p>
            Have a college or university that should be available on StudyHub?
            Get in touch and share the details with us.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.intro}>
          <span className={styles.sectionLabel}>Get in touch</span>
          <h2>Want to add a college or university?</h2>
          <p>
            StudyHub keeps its core university and college directory curated.
            If your institution is missing, contact us and we can review the
            details and add it to the platform.
          </p>
        </div>

        <div className={styles.grid}>
          <a className={styles.contactCard} href="mailto:kalam1010hj@gmail.com">
            <div className={styles.icon}><Mail size={22} /></div>
            <div>
              <span className={styles.cardLabel}>Email</span>
              <h3>kalam1010hj@gmail.com</h3>
              <p>Send the institution name, location, and any useful details.</p>
            </div>
            <ArrowRight className={styles.arrow} size={18} />
          </a>

          <a className={styles.contactCard} href="tel:+917013741498">
            <div className={styles.icon}><Phone size={22} /></div>
            <div>
              <span className={styles.cardLabel}>Phone</span>
              <h3>+91 70137 41498</h3>
              <p>Call for questions about adding academic institutions.</p>
            </div>
            <ArrowRight className={styles.arrow} size={18} />
          </a>
        </div>

        <div className={styles.requestCard}>
          <div className={styles.requestIcon}><Building2 size={24} /></div>
          <div className={styles.requestText}>
            <span className={styles.cardLabel}>Institution request</span>
            <h3>What can you contact us about?</h3>
            <ul>
              <li><GraduationCap size={17} /> Request a missing university</li>
              <li><Building2 size={17} /> Request a missing college</li>
              <li><Mail size={17} /> Share corrections or additional institution details</li>
            </ul>
          </div>
        </div>

        <p className={styles.note}>
          Please include accurate information so we can verify the institution
          before adding it to StudyHub.
        </p>
      </section>
    </main>
  );
};

export default Contact;
