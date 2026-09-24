import { useEffect, useMemo, useState } from "react";
import { Search, Building2, X } from "lucide-react";

import CollegeCard from "../../components/Academic/CollegeCard/CollegeCard";
import styles from "./College.module.css";

import getColleges from "../../services/collegeServices";

export default function College() {
  const [colleges, setColleges] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    getColleges()
      .then((response) => {
        setColleges(response.data || []);
      })
      .catch((err) => {
        console.error("Error fetching colleges:", err);
        setError(
          err.response?.data?.detail ||
            err.message ||
            "Failed to load colleges. Please try again later."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visibleColleges = useMemo(() => {
    if (!Array.isArray(colleges)) return [];

    const search = query.trim().toLowerCase();

    if (!search) {
      return colleges;
    }

    return colleges.filter((college) => {
      return (
        college.name?.toLowerCase().includes(search) ||
        college.code?.toLowerCase().includes(search)
      );
    });
  }, [colleges, query]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          {/* Hero Ambient Glow Layer */}
          <div className={styles.heroOverlay} />

          {/* Content Wrapper */}
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <Building2 size={15} />
              <span>Academic Institutions</span>
            </div>

            <h1>
              Explore <span>Colleges</span>
            </h1>

            <p>
              Discover colleges and explore their programs, branches,
              semesters, and study resources.
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className={styles.searchSection}>
          <div className={styles.searchBox}>
            <Search size={20} className={styles.searchIcon} />

            <input
              type="text"
              placeholder="Search colleges by name or code..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {query && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {!loading && !error && (
            <div className={styles.resultInfo}>
              <span>
                {visibleColleges.length}{" "}
                {visibleColleges.length === 1 ? "college" : "colleges"}
              </span>

              {query && (
                <span className={styles.searchingFor}> for "{query}"</span>
              )}
            </div>
          )}
        </section>

        {/* Loading */}
        {loading && (
          <section className={styles.loadingGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div className={styles.skeleton} key={index}>
                <div className={styles.skeletonIcon} />

                <div className={styles.skeletonContent}>
                  <div className={styles.skeletonTitle} />
                  <div className={styles.skeletonText} />
                  <div className={styles.skeletonTextSmall} />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Error */}
        {!loading && error && (
          <div className={styles.state}>
            <div className={styles.stateIcon}>
              <Building2 size={24} />
            </div>

            <h2>Something went wrong</h2>
            <p>{error}</p>
          </div>
        )}

        {/* Colleges */}
        {!loading && !error && visibleColleges.length > 0 && (
          <section className={styles.grid}>
            {visibleColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </section>
        )}

        {/* No results */}
        {!loading && !error && visibleColleges.length === 0 && (
          <div className={styles.state}>
            <div className={styles.stateIcon}>
              <Search size={24} />
            </div>

            <h2>No colleges found</h2>

            <p>
              We couldn't find any college matching <strong>"{query}"</strong>.
            </p>

            <button
              className={styles.resetButton}
              onClick={() => setQuery("")}
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </main>
  );
}