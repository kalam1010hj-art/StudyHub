import { ArrowRight, Building2, MapPin } from "lucide-react";
import styles from "./UniversityCard.module.css";

export default function UniversityCard({ university }) {
  return <a href={`/universities/${university.id}`} className={styles.card}>
    <div className={styles.top}><div className={styles.icon}><Building2 size={22}/></div><span className={styles.code}>{university.code}</span></div>
    <h3>{university.name}</h3><p>{university.description}</p>
    <div className={styles.meta}><span><MapPin size={15}/>{university.location}</span><span>{university.collegeCount} Colleges</span></div>
    <div className={styles.footer}><span>Explore University</span><ArrowRight size={17}/></div>
  </a>;
}
