import { Building2, MapPin, Link2 } from "lucide-react";
import Breadcrumbs from "../../components/Academic/Breadcrumbs/Breadcrumbs";
import AcademicPath from "../../components/Academic/AcademicPath/AcademicPath";
import ProgramCard from "../../components/Academic/ProgramCard/ProgramCard";
import { programs } from "../../data/academicDirectoryData";
import styles from "./CollegeDetails.module.css";

export default function CollegeDetails() {
  return <main className={styles.page}><div className={styles.container}>
    <Breadcrumbs items={[{label:"JNTUH"},{label:"MRITS"}]}/><AcademicPath active={1}/>
    <section className={styles.header}><div className={styles.icon}><Building2 size={25}/></div><div><span>MRITS</span><h1>Mahbubnagar Institute of Technology & Science</h1><p><MapPin size={15}/> Mahbubnagar, Telangana</p><div className={styles.affiliated}><Link2 size={14}/> Affiliated with JNTUH</div></div></section>
    <section><div className={styles.heading}><span>ACADEMIC PROGRAMS</span><h2>Programs</h2><p>Explore programs offered by this college.</p></div><div className={styles.grid}>{programs.map(p=><ProgramCard key={p.id} program={p}/>)}</div></section>
  </div></main>;
}
