import { Link } from "react-router-dom";
import { BookOpen, Search, Users, ShieldCheck, ArrowRight } from "lucide-react";
import styles from "./About.module.css";

const About = () => {
  const features = [
    { icon: Search, title: "Discover resources", text: "Find academic materials through a structured university, college, program, branch, semester, and subject hierarchy." },
    { icon: Users, title: "Built for students", text: "StudyHub is designed around the everyday needs of students looking for useful, accessible learning material." },
    { icon: ShieldCheck, title: "Community driven", text: "Students can contribute resources while the platform keeps academic information organized and easier to discover." },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.badge}><BookOpen size={16} /> About StudyHub</div>
        <h1>Making academic resources easier to discover.</h1>
        <p>StudyHub is an academic resource platform created to bring university, college, course, and study material information into one simple place.</p>
      </section>

      <section className={styles.content}>
        <div className={styles.story}>
          <span className={styles.eyebrow}>Our mission</span>
          <h2>Less searching. More studying.</h2>
          <p>Academic resources are often spread across different websites, groups, drives, and personal collections. StudyHub aims to make that experience more organized by connecting academic information with the resources students actually need.</p>
          <p>The platform is being developed with a focus on clarity, useful discovery, and a community where students can contribute materials for others.</p>
        </div>

        <div className={styles.grid}>
          {features.map(({ icon: Icon, title, text }) => (
            <article className={styles.card} key={title}>
              <div className={styles.icon}><Icon size={20} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className={styles.cta}>
          <div>
            <span className={styles.eyebrow}>Help expand the directory</span>
            <h2>Can't find your university or college?</h2>
            <p>Contact us with the institution details and we can review the request for addition or correction.</p>
          </div>
          <Link to="/contact" className={styles.button}>Contact us <ArrowRight size={17} /></Link>
        </div>
      </section>
    </main>
  );
};

export default About;
