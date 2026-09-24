import React, { useEffect } from "react";
import {
  BadgeCheck,
  BookOpen,
  Building2,
  CalendarDays,
  FileText,
  GraduationCap,
  Globe,
  Star
} from "lucide-react";
import styles from "./PublicProfile.module.css";
import { useState } from "react";
import { getPublicProfile } from "../../services/UserServices";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ResourceCard from "../../components/Academic/ResourceCard/ResourceCard";

// Accessible inline SVG fallbacks for brand icons to prevent lucide-react version conflicts
const GithubIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);



// Helper to compute fallback initials dynamically
const getInitials = (firstName = "", lastName = "") => {
  const first = firstName.trim().charAt(0);
  const last = lastName.trim().charAt(0);
  return `${first}${last}`.toUpperCase() || "U";
};

// Helper for ordinal academic year suffix (e.g. 4 -> 4th Year)
const getOrdinalSuffix = (year) => {
  if (!year) return "";
  const j = year % 10;
  const k = year % 100;
  if (j === 1 && k !== 11) return `${year}st Year`;
  if (j === 2 && k !== 12) return `${year}nd Year`;
  if (j === 3 && k !== 13) return `${year}rd Year`;
  return `${year}th Year`;
};

// Helper to format uppercase role (e.g. "STUDENT" -> "Student")
const formatRole = (role) => {
  if (!role) return "";
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
};

export default function PublicProfile() {
  const {userId} = useParams()
  const [user,setUSer] = useState({})
  const [isLoading,setLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const fullName = `${user.first_name} ${user.last_name}`.trim();
  const initials = getInitials(user.first_name, user.last_name);
  const formattedReputation = user.reputation_points
    ? user.reputation_points.toLocaleString()
    : "0";
  const uploadedResources = Array.isArray(user.resources) ? user.resources : [];
 
  console.log("public profile rendered")
  useEffect(()=>{
  setLoadError("")
  getPublicProfile(userId)
  .then((response)=>{
    setUSer(response.data)
  })
  .catch((error)=>{
    console.log(error)
    setLoadError(
      error?.response?.data?.error ||
      error?.response?.data?.detail ||
      "This profile could not be loaded."
    )
  })
  .finally(()=>{
    setLoading(false)
  })
  },[userId])  
  if (isLoading){
    return <Loading/>
  }

  if (loadError){
    return (
      <div className={styles.pageContainer}>
        <main className={styles.mainContent}>
          <section className={styles.emptyUploads}>
            <div className={styles.emptyUploadsIcon} aria-hidden="true">
              <FileText size={24} />
            </div>
            <h3>Profile unavailable</h3>
            <p>{loadError}</p>
          </section>
        </main>
      </div>
    )
  }
  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        {/* Section 1: Profile Hero */}
        <section className={styles.heroCard} aria-label="User Profile Hero">
          <div className={styles.heroBody}>
            {/* Avatar / Fallback Initials */}
            <div className={styles.avatarContainer}>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${fullName}'s profile avatar`}
                  className={styles.avatarImage}
                />
              ) : (
                <div
                  className={styles.avatarFallback}
                  aria-label={`${fullName}'s initials fallback avatar`}
                >
                  <span className={styles.avatarInitials}>{initials}</span>
                </div>
              )}
            </div>

            {/* User Identity Details */}
            <div className={styles.identityDetails}>
              <div className={styles.nameHeader}>
                <h1 className={styles.userName}>{fullName}</h1>
                {user.is_verified_student && (
                  <span
                    className={styles.verifiedBadge}
                    title="Verified Student on StudyHub"
                  >
                    <BadgeCheck className={styles.badgeIcon} aria-hidden="true" />
                    <span>Verified Student</span>
                  </span>
                )}
              </div>

              <div className={styles.subMeta}>
                <span className={styles.handle}>@{user.username}</span>
                <span className={styles.dotDivider} aria-hidden="true">
                  •
                </span>
                <span className={styles.roleTag}>{formatRole(user.role)}</span>
              </div>

              {user.bio && <p className={styles.bioText}>{user.bio}</p>}

              {/* Social Links (only renders links that exist) */}
              <div className={styles.socialGroup} aria-label="Social Profiles">
                {user.github_url && (
                  <a
                    href={user.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialButton}
                    aria-label={`${fullName}'s GitHub profile (opens in a new tab)`}
                  >
                    <GithubIcon className={styles.socialIcon} aria-hidden="true" />
                    <span>GitHub</span>
                  </a>
                )}

                {user.linkedin_url && (
                  <a
                    href={user.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialButton}
                    aria-label={`${fullName}'s LinkedIn profile (opens in a new tab)`}
                  >
                    <LinkedinIcon className={styles.socialIcon} aria-hidden="true" />
                    <span>LinkedIn</span>
                  </a>
                )}

                {user.website_url && (
                  <a
                    href={user.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialButton}
                    aria-label={`${fullName}'s personal website (opens in a new tab)`}
                  >
                    <Globe className={styles.socialIcon} aria-hidden="true" />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 & 3 Grid: Academic Information & Reputation */}
        <div className={styles.middleGrid}>
          {/* Academic Information Section */}
          <section
            className={styles.card}
            aria-labelledby="academic-info-heading"
          >
            <h2 id="academic-info-heading" className={styles.cardHeading}>
              Academic Information
            </h2>
            <div className={styles.academicGrid}>
              <div className={styles.academicItem}>
                <div className={styles.iconWrapper} aria-hidden="true">
                  <Building2 className={styles.itemIcon} />
                </div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>College</span>
                  <span className={styles.itemValue}>{user.college_name}</span>
                </div>
              </div>

              <div className={styles.academicItem}>
                <div className={styles.iconWrapper} aria-hidden="true">
                  <BookOpen className={styles.itemIcon} />
                </div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Branch / Major</span>
                  <span className={styles.itemValue}>
                    {user.branch_or_major}
                  </span>
                </div>
              </div>

              <div className={styles.academicItem}>
                <div className={styles.iconWrapper} aria-hidden="true">
                  <CalendarDays className={styles.itemIcon} />
                </div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Academic Year</span>
                  <span className={styles.itemValue}>
                    {getOrdinalSuffix(user.academic_year)}
                  </span>
                </div>
              </div>

              <div className={styles.academicItem}>
                <div className={styles.iconWrapper} aria-hidden="true">
                  <GraduationCap className={styles.itemIcon} />
                </div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Graduation</span>
                  <span className={styles.itemValue}>
                    Class of {user.graduation_year}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Reputation / Contribution Section */}
          <section className={styles.card} aria-labelledby="reputation-heading">
            <h2 id="reputation-heading" className={styles.cardHeading}>
              Community Reputation
            </h2>
            <div className={styles.reputationBox}>
              <div className={styles.reputationValueRow}>
                <div className={styles.starIconBadge} aria-hidden="true">
                  <Star className={styles.starIcon} />
                </div>
                <div className={styles.reputationStat}>
                  <span className={styles.reputationNumber}>
                    {formattedReputation}
                  </span>
                  <span className={styles.reputationLabel}>
                    Reputation Points
                  </span>
                </div>
              </div>
              <p className={styles.reputationDescription}>
                Earned through sharing study resources, verified notes, and
                contributing positively to the StudyHub student community.
              </p>
            </div>
          </section>
        </div>

        {/* Section 5: Uploaded Resources */}
        <section
          className={styles.card}
          aria-labelledby="uploads-heading"
        >
          <div className={styles.sectionHeader}>
            <div>
              <h2 id="uploads-heading" className={styles.cardHeading}>
                Uploaded Resources
              </h2>
              <p className={styles.sectionSubtitle}>
                Academic resources shared by {fullName || "this contributor"}.
              </p>
            </div>

            <span className={styles.countBadge}>
              {uploadedResources.length}{" "}
              {uploadedResources.length === 1 ? "resource" : "resources"}
            </span>
          </div>

          {uploadedResources.length > 0 ? (
            <div className={styles.resourceGrid}>
              {uploadedResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyUploads}>
              <div className={styles.emptyUploadsIcon} aria-hidden="true">
                <FileText size={24} />
              </div>
              <h3>No uploads yet</h3>
              <p>This user hasn't uploaded any study resources yet.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}  