import React, { useEffect, useMemo, useState } from "react";
import { 
  Search, 
  X, 
  Sparkles, 
  FileText, 
  BookOpen, 
  HelpCircle, 
  FileCheck, 
  FileCode, 
  GraduationCap, 
  RefreshCw,
  AlertCircle,
  FolderOpen
} from "lucide-react";

import ResourceCard from "../../components/Academic/ResourceCard/ResourceCard";
import styles from "./ResourceHub.module.css";
import getResoucresfiles from "../../services/resourceServices";

const CATEGORIES = [
  { id: "all", label: "All Types", icon: Sparkles },
  { id: "notes", label: "Notes", icon: FileText },
  { id: "question_paper", label: "Question Papers", icon: HelpCircle },
  { id: "assignment", label: "Assignments", icon: FileCheck },
  { id: "lab_manual", label: "Lab Manuals", icon: FileCode },
  { id: "textbook", label: "Textbooks", icon: BookOpen },
  { id: "syllabus", label: "Syllabus", icon: GraduationCap },
];

export default function ResourceHub() {
  const [resources, setResources] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 

  console.log(resources)
  const fetchResourceData = () => {
    setLoading(true);
    setError("");
   
    getResoucresfiles()
      .then((res) => {
        console.log("resources data",res.data)
        setResources(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching resources:", err);
        
        setError(
          err.response?.data?.detail ||
          err.message ||
          "Unable to connect to the server. Please try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(()=>{
    fetchResourceData()
  },[])

  // Filter Logic
  const visibleResources = useMemo(() => {
    if (!Array.isArray(resources)) return [];

    const search = query.trim().toLowerCase();

    return resources.filter((res) => {
      const matchesSearch =
        !search ||
        res.title?.toLowerCase().includes(search) ||
        res.description?.toLowerCase().includes(search) ||
        res.subject?.name?.toLowerCase().includes(search) ||
        res.subject?.code?.toLowerCase().includes(search);

      const matchesType =
        selectedType === "all" || res.resource_type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [resources, query, selectedType]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.badge}>
            <Sparkles size={14} />
            <span>Academic Resource Library</span>
          </div>

          <h1 className={styles.heroTitle}>
            Centralized <span>Resource Hub</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Access and download verified course notes, past question papers, 
            lab manuals, and syllabus guidelines across all engineering subjects.
          </p>
        </section>

        {/* Search & Filters */}
        <section className={styles.controlsSection}>
          <div className={styles.searchBarWrapper}>
            <Search size={20} className={styles.searchIcon} />

            <input
              type="text"
              placeholder="Search by resource title, subject name, or code (e.g. CS101, Physics)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.searchInput}
            />

            {query && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => setQuery("")}
                aria-label="Clear Search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Type Filter Pills */}
          <div className={styles.filterBar}>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedType === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`${styles.filterChip} ${isActive ? styles.activeChip : ""}`}
                  onClick={() => setSelectedType(cat.id)}
                >
                  <Icon size={15} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Results Summary Info */}
          {!loading && !error && (
            <div className={styles.resultsMeta}>
              <span>
                Showing <strong>{visibleResources.length}</strong>{" "}
                {visibleResources.length === 1 ? "resource" : "resources"}
              </span>

              {(query || selectedType !== "all") && (
                <button
                  className={styles.resetFiltersBtn}
                  onClick={() => {
                    setQuery("");
                    setSelectedType("all");
                  }}
                >
                  Reset filters
                </button>
              )}
            </div>
          )}
        </section>

        {/* Loading Skeletons */}
        {loading && (
          <section className={styles.grid}>
            {Array.from({ length: 8 }).map((_, index) => (
              <div className={styles.skeletonCard} key={index}>
                <div className={styles.skeletonHeader} />
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonText} />
                <div className={styles.skeletonFooter} />
              </div>
            ))}
          </section>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className={styles.errorState}>
            <div className={styles.errorIconWrapper}>
              <AlertCircle size={28} />
            </div>

            <h3>Failed to load resources</h3>
            <p>{error}</p>

            <button className={styles.retryBtn} onClick={fetchResourceData}>
              <RefreshCw size={16} />
              <span>Retry Request</span>
            </button>
          </div>
        )}

        {/* Resource Grid */}
        {!loading && !error && visibleResources.length > 0 && (
          <section className={styles.grid}>
            {visibleResources.map((item) => (
              <ResourceCard key={item.id} resource={item} />
            ))}
          </section>
        )}

        {/* Empty Search State */}
        {!loading && !error && visibleResources.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIconWrapper}>
              <FolderOpen size={32} />
            </div>

            <h3>No matching resources</h3>
            <p>
              We couldn't find any resources matching your search or active filters.
            </p>

            <button
              className={styles.resetSearchBtn}
              onClick={() => {
                setQuery("");
                setSelectedType("all");
              }}
            >
              Clear Search & Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}