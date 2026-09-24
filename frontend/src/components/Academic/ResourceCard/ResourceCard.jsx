import {
  FileText,
  Eye,
  Download,
  Bookmark,
  MoreVertical,
  BookOpen,
} from "lucide-react";

import styles from "./ResourceCard.module.css";
import { Link } from "react-router-dom";

const ResourceCard = ({ resource }) => {
  const isQuestionPaper = resource.resource_type === "question_paper";

  const resourceType = isQuestionPaper
    ? "Question Paper"
    : resource.resource_type?.replace("_", " ");

  const handleView = () => {
    window.open(resource.file, "_blank", "noopener,noreferrer");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resource.file;
    link.download = resource.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uploader = resource.uploaded_by;

  const uploaderName =
    `${uploader?.first_name || ""} ${uploader?.last_name || ""}`.trim() ||
    uploader?.username ||
    "Unknown contributor";

  return (
    <article className={styles.card}>
      {/* Top Bar: Badges & Bookmark */}
      <div className={styles.header}>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles.typeBadge}`}>
            <FileText size={13} />
            {resourceType}
          </span>

          {resource.subject?.code && (
            <span className={`${styles.badge} ${styles.codeBadge}`}>
              {resource.subject.code}
            </span>
          )}
        </div>

        <div className={styles.quickActions}>
          <button
            className={styles.iconButton}
            title="Bookmark resource"
            aria-label="Bookmark"
          >
            <Bookmark size={16} />
          </button>
          <button
            className={styles.iconButton}
            title="More options"
            aria-label="More"
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.body}>
        <h3 className={styles.title} onClick={handleView}>
          {resource.title}
        </h3>

        {resource.description && (
          <p className={styles.description}>{resource.description}</p>
        )}
      </div>

      {/* Subject Metadata Pills */}
      {resource.subject && (
        <div className={styles.subjectMeta}>
          <span className={styles.metaChip}>
            <BookOpen size={12} />
            {resource.subject.name}
          </span>
          {resource.subject.semester && (
            <span className={styles.metaChip}>
              Sem {resource.subject.semester}
            </span>
          )}
        </div>
      )}

      {/* Footer: Uploader & Primary Actions */}
      
      <div className={styles.footer}>
        <Link to={`/publicProfile/${uploader.id}`}>
        <div className={styles.uploader}>
          {uploader?.avatar ? (
            <img
              src={uploader.avatar}
              alt={uploaderName}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarFallback}>
              {uploaderName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className={styles.uploaderDetails}>
            <span className={styles.uploaderName}>{uploaderName}</span>
            <span className={styles.uploaderRole}>Contributor</span>
          </div>
        </div>
        </Link>
        

        <div className={styles.actionButtons}>
          <button
            className={styles.secondaryButton}
            onClick={handleDownload}
            title="Download file"
          >
            <Download size={15} />
          </button>
          <button
            className={styles.primaryButton}
            onClick={handleView}
            title="View resource"
          >
            <Eye size={15} />
            <span>View</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ResourceCard;