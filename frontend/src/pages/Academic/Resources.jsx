import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  FileText,
  Download,
  Eye,
  Bookmark,
  BookmarkCheck,
  MoreVertical,
  BookOpen,
  ClipboardList,
  Video,
  FileQuestion,
  X,
} from "lucide-react";
import getResoucresfiles from "../../services/resourceServices";
import styles from "./Resources.module.css";
import { useParams } from "react-router-dom";
import ResourceCard from "../../components/Academic/ResourceCard/ResourceCard";

const resourceTypes = [
  "All",
  "Notes",
  "Question Papers",
  "Books",
  "Assignments",
  "Videos",
];

const resources = [
  {
    id: 1,
    title: "Data Structures Complete Notes",
    description:
      "Complete unit-wise notes covering arrays, linked lists, stacks, queues, trees and graphs.",
    type: "Notes",
    subject: "Data Structures",
    unit: "All Units",
    size: "4.2 MB",
    downloads: 1280,
    updated: "2 days ago",
    bookmarked: false,
  },
  {
    id: 2,
    title: "Data Structures Previous Question Papers",
    description:
      "Previous semester examination papers for Data Structures.",
    type: "Question Papers",
    subject: "Data Structures",
    unit: "All Units",
    size: "2.8 MB",
    downloads: 940,
    updated: "5 days ago",
    bookmarked: true,
  },
  {
    id: 3,
    title: "DBMS Unit 1 Notes",
    description:
      "Introduction to databases, ER models, relational models and SQL fundamentals.",
    type: "Notes",
    subject: "Database Management Systems",
    unit: "Unit 1",
    size: "1.6 MB",
    downloads: 760,
    updated: "1 week ago",
    bookmarked: false,
  },
  {
    id: 4,
    title: "Operating Systems Assignment",
    description:
      "Process management and CPU scheduling assignment questions.",
    type: "Assignments",
    subject: "Operating Systems",
    unit: "Unit 2",
    size: "850 KB",
    downloads: 420,
    updated: "1 week ago",
    bookmarked: false,
  },
];

const getIcon = (type) => {
  switch (type) {
    case "Notes":
      return <FileText size={20} />;
    case "Question Papers":
      return <FileQuestion size={20} />;
    case "Books":
      return <BookOpen size={20} />;
    case "Assignments":
      return <ClipboardList size={20} />;
    case "Videos":
      return <Video size={20} />;
    default:
      return <FileText size={20} />;
  }
};

const Resources = () => {
    let {subjectId} = useParams()
 let [resources,setResources] = useState([])
 let [subject,setSubject] = useState({})
  const [activeType, setActiveType] = useState("All");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredResources = resources.filter((resource) => {
    const matchesType =
      activeType === "All" || resource.type === activeType;

    const query = search.toLowerCase();

    const matchesSearch =
      resource.title.toLowerCase().includes(query) ||
      resource.subject.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query);

    return matchesType && matchesSearch;
  });

  useEffect(()=>{
    getResoucresfiles(subjectId)
    .then((response)=>{
        console.log(response.data)
        setSubject(response.data.subject)
        setResources(response.data.resources)
    })
    .catch((response)=>{
        console.log(response)
    })
  },[])
  return (
    <main className={styles.page}>
      <div className={styles.container}>

        {/* Breadcrumb / Back */}
        <div className={styles.navigation}>
          <button className={styles.backButton}>
            <ArrowLeft size={18} />
            Back to Subject
          </button>

          <div className={styles.breadcrumb}>
            <span>JNTUH</span>
            <span>/</span>
            <span>CSE</span>
            <span>/</span>
            <span>3-1</span>
            <span>/</span>
            <strong>Data Structures</strong>
          </div>
        </div>

        {/* Header */}
        <section className={styles.header}>
          <div>
            <div className={styles.eyebrow}>
              DATA STRUCTURES
            </div>

            <h1>Study Resources</h1>

            <p>
              Find notes, question papers, assignments, books and
              other learning materials for this subject.
            </p>
          </div>

          <div className={styles.resourceCount}>
            <strong>{resources.length}</strong>
            <span>Resources</span>
          </div>
        </section>


        {/* Search */}
        <section className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={19} />

            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button onClick={() => setSearch("")}>
                <X size={17} />
              </button>
            )}
          </div>

          <button
            className={styles.filterButton}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </section>

        {/* Filters */}
        <div
          className={`${styles.filterPanel} ${
            showFilters ? styles.show : ""
          }`}
        >
          <div className={styles.filterGroup}>
            <label>Unit</label>

            <select>
              <option>All Units</option>
              <option>Unit 1</option>
              <option>Unit 2</option>
              <option>Unit 3</option>
              <option>Unit 4</option>
              <option>Unit 5</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Sort By</label>

            <select>
              <option>Recently Updated</option>
              <option>Most Downloaded</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>


        {/* Resource Type Tabs */}
        <div className={styles.tabs}>
          {resourceTypes.map((type) => (
            <button
              key={type}
              className={
                activeType === type ? styles.activeTab : ""
              }
              onClick={() => setActiveType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        
        {resources.map((resource,index)=>{
            return (<ResourceCard key={index} resource={resource}/>)
        })}

      </div>
    </main>
  );
};

export default Resources;

