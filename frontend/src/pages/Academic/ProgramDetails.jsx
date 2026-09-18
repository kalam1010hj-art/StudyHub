import { BookOpen, Clock3, Layers3 } from "lucide-react";
import Breadcrumbs from "../../components/Academic/Breadcrumbs/Breadcrumbs";
import AcademicPath from "../../components/Academic/AcademicPath/AcademicPath";
import SemesterCard from "../../components/Academic/SemesterCard/SemesterCard";
import ResourcePreview from "../../components/Academic/ResourcePreview/ResourcePreview";
import { semesters, recentResources } from "../../data/academicDirectoryData";
import styles from "./ProgramDetails.module.css";

export default function ProgramDetails() {
  return <main className={styles.page}><div className={styles.container}>
    <Breadcrumbs items={[{label:"JNTUH"},{label:"MRITS"},{label:"B.Tech CSE"}]}/><AcademicPath active={2}/>
    <section className={styles.hero}><div className={styles.icon}><BookOpen size={25}/></div><div><span>B.TECH · CSE</span><h1>B.Tech Computer Science & Engineering</h1><p>MRITS · JNTUH</p><div className={styles.description}>A structured collection of resources for this academic program.</div></div></section>
    <section className={styles.overview}><div><span>PROGRAM OVERVIEW</span><h2>Program Overview</h2></div><div className={styles.overviewGrid}><div><small>Degree</small><strong>Bachelor of Technology</strong></div><div><small>Duration</small><strong>4 Years</strong></div><div><small>Department</small><strong>Computer Science & Engineering</strong></div></div></section>
    <section className={styles.semesters}><div className={styles.heading}><div><span>ACADEMIC STRUCTURE</span><h2>Browse by Semester</h2><p>Choose a semester to explore its academic resources.</p></div><div className={styles.total}><Layers3 size={15}/> 240 resources</div></div><div className={styles.semesterGrid}>{semesters.map(s=><SemesterCard key={s.id} semester={s}/>)}</div></section>
    <section className={styles.resources}><div className={styles.heading}><div><span>RECENTLY ADDED</span><h2>Recent Resources</h2><p>A preview of resources available in this program.</p></div><div className={styles.total}><Clock3 size={15}/> Updated recently</div></div><div className={styles.resourceList}>{recentResources.map(r=><ResourcePreview key={r.id} resource={r}/>)}</div></section>
  </div></main>;
}
