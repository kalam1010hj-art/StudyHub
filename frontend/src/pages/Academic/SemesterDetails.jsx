import { ArrowLeft, ArrowRight, BookOpen, GraduationCap, Layers3, Library } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./SemesterDetails.module.css";
import { getSubjects } from "../../services/collegeServices";

function SemesterDetails() {
  const [semester, setSemester] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { semesterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(false);

    getSubjects(semesterId)
      .then((response) => {
        if (!active) return;
        setSemester(response.data?.semester ?? null);
        setSubjects(Array.isArray(response.data?.subject) ? response.data.subject : []);
      })
      .catch(() => {
        if (!active) return;
        setSemester(null);
        setSubjects([]);
        setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [semesterId]);

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <div className={styles.loadingBar} />
            <div className={styles.loadingBarShort} />
            <div className={styles.loadingRows}>
              {[1, 2, 3, 4].map((item) => (
                <div className={styles.loadingRow} key={item} />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !semester) {
    return (
      <main className={styles.page}>
        <section className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <BookOpen size={28} />
          </div>
          <h2>Semester not found</h2>
          <p>We couldn't find the semester you're looking for.</p>
          <button type="button" className={styles.backButton} onClick={() => navigate(-1)}>
            <ArrowLeft size={17} />
            Go Back
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <button type="button" className={styles.backLink} onClick={() => navigate(-1)}>
          <ArrowLeft size={17} />
          Back to branch
        </button>

        <section className={styles.hero}>
          <div className={styles.heroIcon}>
            <BookOpen size={30} />
          </div>

          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>SEMESTER {semester.number ?? ""}</span>
            <h1>{semester.name || `Semester ${semester.number}`}</h1>
            <p>Choose a subject to access its study materials and resources.</p>

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

        <section className={styles.stats} aria-label="Semester statistics">
          <div className={styles.statCard}>
            <div className={styles.statIcon}><BookOpen size={19} /></div>
            <div>
              <span>Subjects</span>
              <strong>{semester.subject_count ?? subjects.length}</strong>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}><Library size={19} /></div>
            <div>
              <span>Resources</span>
              <strong>{semester.resource_count ?? 0}</strong>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}><Layers3 size={19} /></div>
            <div>
              <span>Semester</span>
              <strong>{semester.number ?? "—"}</strong>
            </div>
          </div>
        </section>

        <section className={styles.subjectSection}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionLabel}>CURRICULUM</span>
              <h2>Subjects</h2>
              <p>{subjects.length} subject{subjects.length === 1 ? "" : "s"} available in this semester.</p>
            </div>
          </div>

          {subjects.length > 0 ? (
            <div className={styles.subjectList}>
              {subjects.map((subject, index) => {
                const resourceCount = subject.resource_count ?? subject.resources_count ?? 0;

                return (
                  <button
                    type="button"
                    className={styles.subjectRow}
                    key={subject.id ?? subject.code ?? index}
                    onClick={() => navigate(`/resources/${subject.id}`)}
                  >
                    <span className={styles.subjectNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className={styles.subjectContent}>
                      <span className={styles.subjectCode}>{subject.code || "SUBJECT"}</span>
                      <span className={styles.subjectName}>{subject.name}</span>
                    </span>

                    <span className={styles.subjectMeta}>
                      {resourceCount} resource{resourceCount === 1 ? "" : "s"}
                    </span>

                    <ArrowRight className={styles.arrow} size={18} />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className={styles.noSubjects}>
              <div className={styles.noSubjectsIcon}><BookOpen size={23} /></div>
              <h3>No subjects available</h3>
              <p>Subjects for this semester haven't been added yet.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default SemesterDetails;
