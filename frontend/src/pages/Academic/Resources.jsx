import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  X,
  Building2,
  FolderX,
} from "lucide-react";

import getResoucresfiles from "../../services/resourceServices";
import ResourceCard from "../../components/Academic/ResourceCard/ResourceCard";
import styles from "./Resources.module.css";
import Breadcrumbs from "../../components/Academic/Breadcrumbs/Breadcrumbs";

const resourceTypes = [
  "All",
  "Notes",
  "Question Papers",
  "Books",
  "Assignments",
  "Videos",
];

const unitOptions = [
  "All Units",
  "Unit 1",
  "Unit 2",
  "Unit 3",
  "Unit 4",
  "Unit 5",
];

const sortOptions = [
  "Recently Updated",
  "Most Downloaded",
  "Newest",
  "Oldest",
];

const Resources = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  // API Data States
  const [resources, setResources] = useState([]);
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter & Search States
  const [activeType, setActiveType] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("All Units");
  const [sortBy, setSortBy] = useState("Recently Updated");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch Resources
  useEffect(() => {
    if (!subjectId) return;

    setLoading(true);
    setError("");

    getResoucresfiles(subjectId)
      .then((response) => {
        const data = response.data || {};
        setSubject(data.subject || null);
        setResources(data.resources || []);
      })
      .catch((err) => {
        console.error("Error fetching resources:", err);
        setError(
          err.response?.data?.detail ||
            err.message ||
            "Failed to load study resources. Please try again later."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [subjectId]);

  // Combined Filter and Sort Logic
  const filteredResources = useMemo(() => {
    if (!Array.isArray(resources)) return [];

    let result = resources.filter((resource) => {
      const matchesType =
        activeType === "All" ||
        resource.type?.toLowerCase() === activeType.toLowerCase();

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        resource.title?.toLowerCase().includes(query) ||
        resource.subject?.toLowerCase().includes(query) ||
        resource.description?.toLowerCase().includes(query) ||
        resource.unit?.toLowerCase().includes(query);

      const matchesUnit =
        selectedUnit === "All Units" ||
        resource.unit?.toLowerCase() === selectedUnit.toLowerCase();

      return matchesType && matchesSearch && matchesUnit;
    });

    return result.sort((a, b) => {
      if (sortBy === "Most Downloaded") {
        return (b.downloads || 0) - (a.downloads || 0);
      }
      if (sortBy === "Newest") {
        return (
          new Date(b.createdAt || b.updated || 0) -
          new Date(a.createdAt || a.updated || 0)
        );
      }
      if (sortBy === "Oldest") {
        return (
          new Date(a.createdAt || a.updated || 0) -
          new Date(b.createdAt || b.updated || 0)
        );
      }
      return (
        new Date(b.updatedAt || b.updated || 0) -
        new Date(a.updatedAt || a.updated || 0)
      );
    });
  }, [resources, activeType, search, selectedUnit, sortBy]);

  const handleResetFilters = () => {
    setSearch("");
    setActiveType("All");
    setSelectedUnit("All Units");
    setSortBy("Recently Updated");
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Navigation & Breadcrumbs */}
        <div className={styles.navigation}>
          <button
            className={styles.backButton}
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
            Back to Subject
          </button>

          {subject?.breadcrumb?.length > 0 && (
            <Breadcrumbs items={subject.breadcrumb} />
          )}
        </div>

        {/* Page Header */}
        <section className={styles.header}>
          <div>
            <div className={styles.eyebrow}>
              {subject?.code || subject?.name || "ACADEMIC RESOURCES"}
            </div>

            <h1>Study Resources</h1>

            <p>
              Find notes, question papers, assignments, books, and other
              learning materials curated for{" "}
              <strong>{subject?.name || "this subject"}</strong>.
            </p>
          </div>

          <div className={styles.resourceCount}>
            <strong>{loading ? "..." : resources.length}</strong>
            <span>Resources</span>
          </div>
        </section>

        {/* Toolbar & Search */}
        <section className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={19} className={styles.searchIcon} />

            <input
              type="text"
              placeholder="Search by title, topic, or unit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className={styles.clearSearchButton}
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <button
            className={`${styles.filterButton} ${
              showFilters ? styles.filterButtonActive : ""
            }`}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </section>

        {/* Filter Panel */}
        <div className={`${styles.filterPanel} ${showFilters ? styles.show : ""}`}>
          <div className={styles.filterGroup}>
            <label htmlFor="unit-select">Unit</label>
            <select
              id="unit-select"
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
            >
              {unitOptions.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="sort-select">Sort By</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {resourceTypes.map((type) => (
            <button
              key={type}
              className={activeType === type ? styles.activeTab : styles.tab}
              onClick={() => setActiveType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingList}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className={styles.skeletonCard}>
                <div className={styles.skeletonIcon} />
                <div className={styles.skeletonContent}>
                  <div className={styles.skeletonTitle} />
                  <div className={styles.skeletonText} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className={styles.stateContainer}>
            <div className={styles.stateIcon}>
              <Building2 size={24} />
            </div>
            <h2>Unable to load resources</h2>
            <p>{error}</p>
          </div>
        )}

        {/* Resource List */}
        {!loading && !error && filteredResources.length > 0 && (
          <div className={styles.resourceGrid}>
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id || resource._id}
                resource={resource}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredResources.length === 0 && (
          <div className={styles.stateContainer}>
            <div className={styles.stateIcon}>
              <FolderX size={24} />
            </div>
            <h2>No resources found</h2>
            <p>
              {search || selectedUnit !== "All Units" || activeType !== "All"
                ? "We couldn't find any resources matching your current filters."
                : "No study materials have been uploaded for this subject yet."}
            </p>
            {(search || selectedUnit !== "All Units" || activeType !== "All") && (
              <button
                className={styles.resetButton}
                onClick={handleResetFilters}
              >
                Reset all filters
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Resources;