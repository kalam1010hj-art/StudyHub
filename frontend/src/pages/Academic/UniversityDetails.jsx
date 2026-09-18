import { University, MapPin } from "lucide-react";
import Breadcrumbs from "../../components/Academic/Breadcrumbs/Breadcrumbs";
import AcademicPath from "../../components/Academic/AcademicPath/AcademicPath";
import AcademicSearch from "../../components/Academic/AcademicSearch/AcademicSearch";
import CollegeCard from "../../components/Academic/CollegeCard/CollegeCard";
import { colleges } from "../../data/academicDirectoryData";
import styles from "./UniversityDetails.module.css";

export default function UniversityDetails() {
  return <main className={styles.page}><div className={styles.container}>
    <Breadcrumbs items={[{label:"Universities"},{label:"JNTUH"}]}/><AcademicPath active={0}/>
    <section className={styles.header}><div className={styles.icon}><University size={26}/></div><div><span>JNTUH</span><h1>Jawaharlal Nehru Technological University Hyderabad</h1><p><MapPin size={15}/> Telangana</p></div></section>
    <section><div className={styles.sectionHead}><div><span>ACADEMIC NETWORK</span><h2>Explore Colleges</h2><p>Find colleges affiliated with this university.</p></div><AcademicSearch placeholder="Search colleges..." /></div><div className={styles.grid}>{colleges.map(c=><CollegeCard key={c.id} college={c}/>)}</div></section>
  </div></main>;
}
