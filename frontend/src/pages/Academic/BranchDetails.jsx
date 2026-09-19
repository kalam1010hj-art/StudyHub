import { ArrowLeft, BookOpen, GraduationCap, Layers3 } from "lucide-react";
import styles from "./BranchDetails.module.css";
import { useEffect, useState } from "react";
import { getSemesters } from "../../services/collegeServices";
import { useParams } from "react-router-dom";
import SemesterCard from "../../components/Academic/SemesterCard/SemesterCard";
function BranchDetails() {
  let [branch,setBranch] =useState({
    name:"branch name",
    id:2000,
  })
  let [semesters,setSemester] = useState([])
  let {branchId} = useParams()
  useEffect(()=>{
    getSemesters(branchId)
    .then((response)=>{
        console.log(response.data)
        setBranch(response.data.branch)
        setSemester(response.data.semesters)
    })
    .catch((response)=>{
      console.log(response)
    })
  },[])

  if (!branch) {
    return (
      <section className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <Layers3 size={28} />
        </div>

        <h2>Branch not found</h2>
        <p>
          We couldn't find the branch you're looking for.
        </p>

        <button  className={styles.backButton}>
          <ArrowLeft size={18} />
          Go Back
        </button>
      </section>
    );
  }
 

  return (
    <section className={styles.container}>
      {/* Back */}
      <button className={styles.backLink} >
        <ArrowLeft size={18} />
        Back to branches
      </button>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <GraduationCap size={34} />
        </div>

        <div className={styles.headerContent}>
          <span className={styles.label}>ACADEMIC BRANCH</span>

          <h1>{branch.name}</h1>

          {branch.code && (
            <span className={styles.code}>
              {branch.code}
            </span>
          )}

          {/* {branch.description && (
            <p className={styles.description}>
              {branch.description}
            </p>
          )} */}
        </div>
      </div>

      {/* Academic information */}
      {/* <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>
            <GraduationCap size={21} />
          </div>

          <div>
            <span>Degree</span>
            <strong>
              {branch.degree?.name || "Not available"}
            </strong>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>
            <BookOpen size={21} />
          </div>

          <div>
            <span>Semesters</span>
            <strong>
              {branch.semesters?.length || 0}
            </strong>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>
            <Layers3 size={21} />
          </div>

          <div>
            <span>Resources</span>
            <strong>
              {branch.resource_count || 0}
            </strong>
          </div>
        </div>
      </div> */}

      {/* Semesters */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionLabel}>
              YOUR ACADEMIC JOURNEY
            </span>

            <h2>Explore Semesters</h2>

            <p>
              Select a semester to discover subjects and
              study resources.
            </p>
          </div>
        </div>

        {semesters.length > 0 ? (
          <div className={styles.semesterGrid}>
            {semesters.map((semester,id) => (
              <SemesterCard key={id} semester={semester}/>
            ))}
          </div>
        ) : (
          <div className={styles.noSemesters}>
            <BookOpen size={26} />

            <h3>No semesters available</h3>

            <p>
              Semester information for this branch hasn't
              been added yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default BranchDetails;