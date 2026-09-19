import { Building2, MapPin, Link2 } from "lucide-react";
import Breadcrumbs from "../../components/Academic/Breadcrumbs/Breadcrumbs";
import AcademicPath from "../../components/Academic/AcademicPath/AcademicPath";
import ProgramCard from "../../components/Academic/ProgramCard/ProgramCard";
import { programs } from "../../data/academicDirectoryData";
import styles from "./CollegeDetails.module.css";
import { useEffect, useState } from "react";
import { getPrograms } from "../../services/collegeServices";
import { useParams } from "react-router-dom";

export default function CollegeDetails() {
  let {collegeId} = useParams()
  let [college,setCollege] = useState([])
  let [degrees,setDegrees] =useState([])
  console.log("college page rendered")
  console.log(collegeId)
  useEffect(()=>{
    console.log("college details mounted")
    getPrograms(collegeId)
    .then((response)=>{
      console.log(response.data)
      setCollege(response.data.college)
      setDegrees(response.data.degrees)

    })
    .catch((response)=>{
      console.log(response)
    })
     return ()=>{
      console.log("college details unmounted")
    }
  },[])
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: "JNTUH" }, { label: "MRITS" }]} />
        <AcademicPath active={1} />
        <section className={styles.header}>
          <div className={styles.icon}>
            <Building2 size={25} />
          </div>
          <div>
            <span>{college.name}</span>
            <h1>{college.name}</h1>
            <p>
              <MapPin size={15} /> Mahbubnagar, Telangana
            </p>
            <div className={styles.affiliated}>
              <Link2 size={14} /> Affiliated with JNTUH
            </div>
          </div>
        </section>
        <section>
          <div className={styles.heading}>
            <span>ACADEMIC PROGRAMS</span>
            <h2>Programs</h2>
            <p>Explore programs offered by this college.</p>
          </div>
          <div className={styles.grid}>
            {degrees.map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
          {degrees.length < 1 &&
          <p className={styles.empty}>No programs present in this college.</p> }
        </section>
      </div>
    </main>
  );
}
