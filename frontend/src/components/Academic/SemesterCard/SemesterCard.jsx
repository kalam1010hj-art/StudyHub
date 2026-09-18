import { ArrowRight, Layers3 } from "lucide-react";
import styles from "./SemesterCard.module.css";

export default function SemesterCard({ semester }) {
  return <a href={`#semester-${semester.id}`} className={styles.card}>
    <div className={styles.icon}><Layers3 size={19}/></div>
    <h3>{semester.name}</h3><span>{semester.resources} Resources</span>
    <div className={styles.footer}><span>Explore</span><ArrowRight size={16}/></div>
  </a>;
}
