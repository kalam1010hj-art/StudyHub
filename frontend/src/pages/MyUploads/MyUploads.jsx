import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  FileText,
  RefreshCw,
  Search,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";

import ResourceCard from "../../components/Academic/ResourceCard/ResourceCard";
import { getMyUploads } from "../../services/resourceServices";
import styles from "./MyUploads.module.css";

const TYPE_FILTERS = [
  { value: "all", label: "All" },
  { value: "notes", label: "Notes" },
  { value: "question_paper", label: "Question Papers" },
  { value: "assignment", label: "Assignments" },
  { value: "lab_manual", label: "Lab Manuals" },
  { value: "textbook", label: "Textbooks" },
  { value: "syllabus", label: "Syllabus" },
  { value: "other", label: "Other" },
];

const getErrorMessage = (error) => {
  const data = error?.response?.data;

  if (typeof data === "string" && data.trim()) return data;
  if (data?.detail) return data.detail;
  if (data?.message) return data.message;

  if (data && typeof data === "object") {
    const firstError = Object.values(data)
      .flat(Infinity)
      .find((value) => typeof value === "string" && value.trim());

    if (firstError) return firstError;
  }

  return error?.message || "Unable to load your uploads.";
};

const MyUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUploads = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getMyUploads();
      setUploads(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to load my uploads:", error);
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const visibleUploads = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return uploads.filter((resource) => {
      const searchableText = [
        resource.title,
        resource.description,
        resource.subject?.name,
        resource.subject?.code,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        !normalizedQuery || searchableText.includes(normalizedQuery);

      const matchesType =
        activeType === "all" || resource.resource_type === activeType;

      return matchesQuery && matchesType;
    });
  }, [uploads, query, activeType]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.eyebrow}>
            <Sparkles size={14} />
            Your contributions
          </div>

          <div className={styles.heroTop}>
            <div>
              <h1>My Uploads</h1>
              <p>
                View every academic resource you have contributed to StudyHub
                and quickly find a specific upload.
              </p>
            </div>

            <Link to="/upload" className={styles.uploadButton}>
              <UploadCloud size={17} />
              Upload resource
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        <section className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <FileText size={20} />
          </div>

          <div>
            <strong>{loading ? "…" : uploads.length}</strong>
            <span>
              {uploads.length === 1 ? "resource uploaded" : "resources uploaded"}
            </span>
          </div>

          {!loading && !error && (
            <span className={styles.summaryMeta}>
              Showing {visibleUploads.length} of {uploads.length}
            </span>
          )}
        </section>

        <section className={styles.controls}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="text"
              value={query}
              placeholder="Search your uploads by title, subject, or code..."
              onChange={(event) => setQuery(event.target.value)}
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className={styles.filters}>
            {TYPE_FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={
                  activeType === filter.value
                    ? styles.activeFilter
                    : styles.filter
                }
                onClick={() => setActiveType(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {loading && (
          <section className={styles.grid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div className={styles.skeletonCard} key={index}>
                <div className={styles.skeletonSmall} />
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonText} />
                <div className={styles.skeletonTextShort} />
                <div className={styles.skeletonFooter} />
              </div>
            ))}
          </section>
        )}

        {!loading && error && (
          <section className={styles.state}>
            <div className={styles.stateIcon}>
              <RefreshCw size={24} />
            </div>
            <h2>Couldn't load your uploads</h2>
            <p>{error}</p>
            <button type="button" className={styles.retryButton} onClick={fetchUploads}>
              <RefreshCw size={16} />
              Try again
            </button>
          </section>
        )}

        {!loading && !error && visibleUploads.length > 0 && (
          <section className={styles.grid}>
            {visibleUploads.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </section>
        )}

        {!loading && !error && visibleUploads.length === 0 && (
          <section className={styles.state}>
            <div className={styles.stateIcon}>
              <FileText size={24} />
            </div>

            <h2>{uploads.length === 0 ? "No uploads yet" : "No matching uploads"}</h2>

            <p>
              {uploads.length === 0
                ? "Resources you contribute to StudyHub will appear here."
                : "Try another search term or clear the selected filter."}
            </p>

            {uploads.length === 0 ? (
              <Link to="/upload" className={styles.retryButton}>
                <UploadCloud size={16} />
                Upload your first resource
              </Link>
            ) : (
              <button
                type="button"
                className={styles.retryButton}
                onClick={() => {
                  setQuery("");
                  setActiveType("all");
                }}
              >
                Clear filters
              </button>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default MyUploads;
