import { BookOpen, Clock3, Layers3 } from "lucide-react";
import Breadcrumbs from "../../components/Academic/Breadcrumbs/Breadcrumbs";
import AcademicPath from "../../components/Academic/AcademicPath/AcademicPath";
import BranchCard from "../../components/BranchCard/BranchCard";
import ResourcePreview from "../../components/Academic/ResourcePreview/ResourcePreview";

import styles from "./ProgramDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBranches } from "../../services/collegeServices";
import { getSemesters } from "../../services/collegeServices";


export default function ProgramDetails() {
  let {programId} = useParams()
  let [branches,setBranch] = useState([])
  let [program,setProgram] = useState({
    name:"Name of the program / degree",
    code:"code",  
    id:"Not Loaded",

  }) 
  useEffect(()=>{
    getBranches(programId)
    .then((response)=>{
    
    setProgram(response.data.degree)
    setBranch(response.data.branches)
    })
    .catch((response)=>{
       console.log(response)
    })
  },[])
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs
          items={[
            { label: "JNTUH" },
            { label: "MRITS" },
            { label: "B.Tech CSE" },
          ]}
        />
        <AcademicPath active={2} />
        <section className={styles.hero}>
          <div className={styles.icon}>
            <BookOpen size={25} />
          </div>
          <div>
            <span>{program.code}</span>
            <h1>{program.name}</h1>
            <p>MRITS · JNTUH</p>
            <div className={styles.description}>
             {program.description}
            </div>
          </div>
        </section>
        <section className={styles.overview}>
          <div>
            <span>PROGRAM OVERVIEW</span>
            <h2>Program Overview</h2>
          </div>
          <div className={styles.overviewGrid}>
            <div>
              <small>Degree</small>
              <strong>{program.name}</strong>
            </div>
            <div>
              <small>Duration</small>
              <strong>{program.duration_years}</strong>
            </div>
            {/* <div>
              <small>Department</small>
              <strong>Computer Science & Engineering</strong>
            </div> */}
          </div>
        </section>
        <section className={styles.semesters}>
          <div className={styles.heading}>
            <div>
              <span>ACADEMIC STRUCTURE</span>
              <h2>Browse by Branch</h2>
              <p>Choose a Branch to explore its academic resources.</p>
            </div>
            <div className={styles.total}>
              <Layers3 size={15} /> 240 resources
            </div>
          </div>
          <div className={styles.semesterGrid}>
            {branches.map((s) => {
              
             return (<BranchCard key={s.id} branch={s} />)
              }
             )
            }
          </div>
        </section>
        <section className={styles.resources}>
          <div className={styles.heading}>
            <div>
              <span>RECENTLY ADDED</span>
              <h2>Recent Resources</h2>
              <p>A preview of resources available in this program.</p>
            </div>
            <div className={styles.total}>
              <Clock3 size={15} /> Updated recently
            </div>
          </div>
          {/* <div className={styles.resourceList}>
            {recentResources.map((r) => (
              <ResourcePreview key={r.id} resource={r} />
            ))}
          </div> */}
        </section>
      </div>
    </main>
  );
}
