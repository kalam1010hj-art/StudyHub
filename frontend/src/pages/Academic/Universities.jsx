import { useState, useEffect } from "react";
import { ArrowRight, GraduationCap, Search } from "lucide-react";

import Breadcrumbs from "../../components/Academic/Breadcrumbs/Breadcrumbs";
import AcademicSearch from "../../components/Academic/AcademicSearch/AcademicSearch";
import UniversityCard from "../../components/Academic/UniversityCard/UniversityCard";
import InstitutionRequestCTA from "../../components/InstitutionRequestCTA/InstitutionRequestCTA";

import styles from "./Universities.module.css";
import getUniversities from "../../services/universityService";

export default function Universities() {
  const [universities, setUniversities] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUniversities()
      .then((response) => {
        console.log("Universities:", response.data);
        setUniversities(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch universities:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visibleUniversities = universities.filter((university) => {
    const search = query.toLowerCase().trim();

    return (
      university.name.toLowerCase().includes(search) ||
      university.code.toLowerCase().includes(search)
    );
  });

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <Breadcrumbs items={[{ label: "Universities" }]} />

        {/* HERO */}
        <section className={styles.hero}>

          <div className={styles.badge}>
            <GraduationCap size={14} />
            ACADEMIC DIRECTORY
          </div>

          <h1>Explore Academic Programs</h1>

          <p>
            Find your university, college, and program to discover resources
            built for your curriculum.
          </p>

          <div className={styles.searchWrapper}>
            <AcademicSearch
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* SEARCH RESULTS */}
          {query.trim() && (
            <div className={styles.searchResults}>

              {loading ? (
                <div className={styles.searchMessage}>
                  Searching universities...
                </div>
              ) : visibleUniversities.length > 0 ? (
                <>
                  <div className={styles.searchResultHeader}>
                    <span>Universities</span>
                    <span>
                      {visibleUniversities.length} found
                    </span>
                  </div>

                  <div className={styles.searchResultGrid}>
                    {visibleUniversities.map((university) => (
                      <UniversityCard
                        key={university.id}
                        university={university}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className={styles.searchMessage}>
                  <Search size={20} />
                  <span>
                    No universities found for "{query}"
                  </span>
                </div>
              )}

            </div>
          )}

        </section>

        {/* DIRECTORY */}
        <section className={styles.listSection}>

          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.kicker}>DIRECTORY</span>

              <h2>Universities</h2>

              <p>
                Browse institutions and continue through the academic hierarchy.
              </p>
            </div>

            <span className={styles.result}>
              {universities.length} institutions
            </span>
          </div>

          {/* Show all universities when search is empty */}
          {!query.trim() && (
            <div className={styles.grid}>
              {loading ? (
                <div className={styles.empty}>
                  Loading universities...
                </div>
              ) : (
                universities.map((university) => (
                  <UniversityCard
                    key={university.id}
                    university={university}
                  />
                ))
              )}
            </div>
          )}

        </section>

     

        <InstitutionRequestCTA />
      </div>
    </main>
  );
}