import { useState,useEffect } from "react";
import { ArrowRight, GraduationCap } from "lucide-react";
import Breadcrumbs from "../../components/Academic/Breadcrumbs/Breadcrumbs";
import AcademicSearch from "../../components/Academic/AcademicSearch/AcademicSearch";
import UniversityCard from "../../components/Academic/UniversityCard/UniversityCard";
import { universities } from "../../data/academicDirectoryData";
import styles from "./Universities.module.css";
import getUniversities from "../../services/universityService";

export default function Universities() {
  const [universities,setUniversity] = useState([]) 
  const [query, setQuery] = useState("");
  const visible = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.code.toLowerCase().includes(query.toLowerCase()),
  );
  console.log("university rendered")

  useEffect(()=>{
    console.log("university mounted ")
   getUniversities()
   .then((response)=>{
    console.log(response.data)
    setUniversity(response.data)
   })
   .catch((error)=>{
    console.log("got an error",error)
   })

   return ()=>{
    console.log("university unmounted!")
   }
  },[])
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: "Universities" }]} />
        <section className={styles.hero}>
          <div className={styles.badge}>
            <GraduationCap size={14} /> ACADEMIC DIRECTORY
          </div>
          <h1>Explore Academic Programs</h1>
          <p>
            Find your university, college, and program to discover resources
            built for your curriculum.
          </p>
          <AcademicSearch
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </section>
        <div className={styles.stats}>
          <div>
            <strong>120+</strong>
            <span>Universities</span>
          </div>
          <div>
            <strong>450+</strong>
            <span>Colleges</span>
          </div>
          <div>
            <strong>1,200+</strong>
            <span>Programs</span>
          </div>
        </div>
        <section className={styles.listSection}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.kicker}>DIRECTORY</span>
              <h2>Universities</h2>
              <p>
                Browse institutions and continue through the academic hierarchy.
              </p>
            </div>
            <span className={styles.result}>{visible.length} institutions</span>
          </div>
          <div className={styles.grid}>
            {visible.map((u) => (
              <UniversityCard key={u.id} university={u} />
            ))}
          </div>
          {!visible.length && (
            <div className={styles.empty}>
              No universities match this preview search.
            </div>
          )}
        </section>
        <a className={styles.next} href="/universities/1">
          <span>Continue to a university</span>
          <ArrowRight size={17} />
        </a>
      </div>
    </main>
  );
}
