
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Layers3,
  Library,
} from "lucide-react";

import styles from "./SemesterDetails.module.css";
import { useEffect, useState } from "react";
import { getSubjects } from "../../services/collegeServices";
import { useParams } from "react-router-dom";
import SubjectCard from "../../components/Academic/SubjectCard/SubjectCard";

function SemesterDetails() {
  let [semester,setSemester] =useState({})
  let [subjects,setSubjects] = useState([])
  let {semesterId} = useParams()
  

  useEffect(()=>{
  getSubjects(semesterId)
  .then((response)=>{
    console.log(response.data)
    setSemester(response.data.semester)
    setSubjects(response.data.subject)
  })
  .catch((response)=>{
    console.log(response)
  })
  },[])
  if (!semester) {
    return (
      <section className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <BookOpen size={28} />
        </div>

        <h2>Semester not found</h2>

        <p>
          We couldn't find the semester you're looking for.
        </p>

        <button
          className={styles.backButton}
         
        >
          <ArrowLeft size={17} />
          Go Back
        </button>
      </section>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        {/* Back */}
        <button
          className={styles.backLink}
       
        >
          <ArrowLeft size={17} />
          Back to branch
        </button>

        {/* Header */}
        <section className={styles.hero}>
          <div className={styles.heroIcon}>
            <BookOpen size={34} />
          </div>

          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              ACADEMIC SEMESTER
            </span>

            <h1>
              {semester.name ||
                `Semester ${semester.number}`}
            </h1>

            <p>
              Explore subjects, study materials and
              academic resources for this semester.
            </p>

            <div className={styles.meta}>
              {semester.branch?.name && (
                <span>
                  <GraduationCap size={15} />
                  {semester.branch.name}
                </span>
              )}

              {semester.branch?.degree?.name && (
                <span>
                  <Layers3 size={15} />
                  {semester.branch.degree.name}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <BookOpen size={20} />
            </div>

            <div>
              <span>Subjects</span>
              <strong>
                {semester.subject_count ?? 0}
              </strong>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Library size={20} />
            </div>

            <div>
              <span>Resources</span>
              <strong>
                {semester.resource_count ?? 0}
              </strong>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Layers3 size={20} />
            </div>

            <div>
              <span>Semester</span>
              <strong>
                {semester.number ?? "—"}
              </strong>
            </div>
          </div>
        </section>

        {/* Subjects */}
        <section className={styles.subjectSection}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionLabel}>
                CURRICULUM
              </span>

              <h2>Subjects</h2>

              <p>
                Select a subject to explore its study
                materials and resources.
              </p>
            </div>
          </div>

          {subjects.length > 0 ? (
            <div className={styles.subjectGrid}>
              {subjects.map((subject, index) => (
                <SubjectCard key={index} subject={subject}/>
              ))}
            </div>
          ) : (
            <div className={styles.noSubjects}>
              <div className={styles.noSubjectsIcon}>
                <BookOpen size={24} />
              </div>

              <h3>No subjects available</h3>

              <p>
                Subjects for this semester haven't been
                added yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default SemesterDetails;
