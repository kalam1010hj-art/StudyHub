import { ArrowRight, Building2, GraduationCap, LibraryBig, FolderOpen } from "lucide-react";
import styles from "./AcademicPath.module.css";

const steps=[["University",Building2],["College",LibraryBig],["Program",GraduationCap],["Resources",FolderOpen]];

export default function AcademicPath({ active = 0 }) {
  return <div className={styles.path} aria-label="Academic hierarchy">
    {steps.map(([label,Icon],index)=><div className={styles.stepGroup} key={label}>
      <div className={`${styles.step} ${index<=active?styles.active:""}`}><Icon size={15}/><span>{label}</span></div>
      {index<steps.length-1 && <ArrowRight size={15} className={styles.arrow}/>}
    </div>)}
  </div>;
}
