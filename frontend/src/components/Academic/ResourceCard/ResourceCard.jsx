
import {
  FileText,
  Download,
  Eye,
  Bookmark,
  MoreVertical,
} from "lucide-react";

import styles from "./ResourceCard.module.css";

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

  return (
    <article className={styles.card}>

      {/* Resource icon */}
      <div className={styles.iconWrapper}>
        <FileText size={23} />
      </div>

      <div className={styles.content}>

        {/* Top information */}
        <div className={styles.top}>
          <span className={styles.type}>
            {resourceType}
          </span>

          <span className={styles.fileId}>
            #{resource.id}
          </span>
        </div>

        {/* Title */}
        <h3 className={styles.title}>
          {resource.title}
        </h3>

        {/* Description */}
        <p className={styles.description}>
          {resource.description}
        </p>

        {/* Subject information */}
        <div className={styles.subjectInfo}>
          <span>{resource.subject?.code}</span>

          <span className={styles.dot}>•</span>

          <span>
            {resource.subject?.name}
          </span>

          {resource.subject?.semester && (
            <>
              <span className={styles.dot}>•</span>

              <span>
                Semester {resource.subject.semester}
              </span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>

          <button
            className={styles.primaryButton}
            onClick={handleView}
          >
            <Eye size={17} />
            View
          </button>

          {/* <button
            className={styles.secondaryButton}
            onClick={handleDownload}
          >
            <Download size={17} />
            Download
          </button> */}

          <button
            className={styles.iconButton}
            title="Bookmark"
          >
            <Bookmark size={18} />
          </button>

          <button
            className={styles.iconButton}
            title="More"
          >
            <MoreVertical size={18} />
          </button>

        </div>

      </div>
    </article>
  );
};

export default ResourceCard;

