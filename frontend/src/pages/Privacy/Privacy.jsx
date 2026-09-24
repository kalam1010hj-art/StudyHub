import { ShieldCheck } from "lucide-react";
import styles from "./Privacy.module.css";

const Privacy = () => (
  <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.icon}><ShieldCheck size={24} /></div>
      <span>Privacy Policy</span>
      <h1>Your information, handled responsibly.</h1>
      <p>This policy explains, at a high level, what information StudyHub may collect, why it is used, and the choices available to you.</p>
      <small>Last updated: September 24, 2026</small>
    </section>
    <article className={styles.card}>
      <section><h2>1. Information we collect</h2><p>When you create an account, StudyHub may collect information you provide such as your username, email address, profile details, and profile image. When you upload a resource, we may store the resource metadata and the uploaded file.</p></section>
      <section><h2>2. How we use information</h2><p>We use account and resource information to provide authentication, profiles, resource discovery, uploads, moderation, and platform functionality. We may also use technical information to keep the service secure and reliable.</p></section>
      <section><h2>3. Uploaded content</h2><p>Resources you choose to publish may be visible to other users. Do not upload private, confidential, copyrighted, or otherwise restricted material unless you have the right to share it.</p></section>
      <section><h2>4. Third-party services</h2><p>StudyHub may use infrastructure and service providers such as cloud storage, hosting, databases, and analytics tools. Their handling of information may also be governed by their own policies.</p></section>
      <section><h2>5. Your choices</h2><p>You can manage information available through your account and contact us about corrections or questions. You should also keep your login credentials secure.</p></section>
      <section><h2>6. Changes to this policy</h2><p>This policy may be updated as StudyHub evolves. Material changes will be reflected on this page with an updated date.</p></section>
      <section><h2>7. Contact</h2><p>For privacy questions or requests, please use the <a href="/contact">Contact</a> page.</p></section>
    </article>
  </main>
);

export default Privacy;
