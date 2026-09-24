import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Terms.module.css";

const Terms = () => (
  <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.icon}><FileText size={24} /></div>
      <span>Terms of Service</span>
      <h1>Simple rules for a useful StudyHub.</h1>
      <p>These terms describe the basic rules for using StudyHub and contributing academic resources.</p>
      <small>Last updated: September 24, 2026</small>
    </section>
    <article className={styles.card}>
      <section><h2>1. Using StudyHub</h2><p>Use StudyHub lawfully and responsibly. You are responsible for activity performed through your account and for keeping your credentials secure.</p></section>
      <section><h2>2. Accounts</h2><p>Provide accurate information when creating or updating an account. Do not impersonate another person or attempt to access another user's account.</p></section>
      <section><h2>3. Uploading resources</h2><p>You should only upload material that you are allowed to share. Do not upload malware, private information, unlawful content, or material that infringes another person's rights.</p></section>
      <section><h2>4. Community content</h2><p>Uploaded content may be reviewed, limited, or removed when it violates these terms, applicable law, or StudyHub's platform rules.</p></section>
      <section><h2>5. Academic information</h2><p>StudyHub provides academic information and resources for discovery and study purposes. Check important institutional or academic information with the relevant university or college.</p></section>
      <section><h2>6. Availability and changes</h2><p>Features may change as StudyHub develops. We may modify, suspend, or discontinue features when necessary.</p></section>
      <section><h2>7. Contact</h2><p>Questions about these terms can be sent through our <Link to="/contact">Contact</Link> page.</p></section>
    </article>
  </main>
);

export default Terms;
