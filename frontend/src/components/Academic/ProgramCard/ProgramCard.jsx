import { ArrowRight, GraduationCap } from "lucide-react";
import styles from "./ProgramCard.module.css";

export default function ProgramCard({ program }) {
  return <a href={`/programs/${program.id}`} className={styles.card}>
    <div className={styles.top}><div className={styles.icon}><GraduationCap size={21}/></div><span>{program.degree}</span></div>
    <h3>{program.name}</h3><p>{program.department}</p>
    <div className={styles.footer}><span>{program.resourceCount} Resources</span><ArrowRight size={17}/></div>
  </a>;
}
