import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./EditProfile.module.css";
import { AuthContext } from "../../context/AuthProvider";
import { editUserProfile } from "../../services/UserServices";
import { useNavigate } from "react-router-dom";
// ---------------------------------------------------------
// Reusable Section
// ---------------------------------------------------------

const FormSection = ({
  id,
  title,
  description,
  icon,
  children,
}) => (
  <section id={id} className={styles.sectionCard}>
    <div className={styles.sectionHeader}>
      <div className={styles.sectionTitleRow}>
        {icon && (
          <div className={styles.sectionIconBadge}>
            {icon}
          </div>
        )}

        <div>
          <h2 className={styles.sectionTitle}>
            {title}
          </h2>

          {description && (
            <p className={styles.sectionDescription}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>

    <div className={styles.sectionBody}>
      {children}
    </div>
  </section>
);

// ---------------------------------------------------------
// Loading Skeleton
// ---------------------------------------------------------

const ProfileEditSkeleton = () => {
  return (
    <div
      className={styles.pageWrapper}
      aria-busy="true"
      aria-label="Loading profile data"
    >
      <div className={styles.pageContainer}>

        <div className={styles.header}>
          <div
            className={`${styles.skeleton} ${styles.skeletonBackBtn}`}
          />

          <div
            className={`${styles.skeleton} ${styles.skeletonTitle}`}
          />

          <div
            className={`${styles.skeleton} ${styles.skeletonSubtitle}`}
          />
        </div>

        <div className={styles.layoutGrid}>

          {/* Sidebar */}
          <aside className={styles.sidebar}>

            <div className={styles.sidebarCard}>
              <div
                className={`${styles.skeleton} ${styles.skeletonAvatarLarge}`}
              />

              <div
                className={`${styles.skeleton} ${styles.skeletonName}`}
              />

              <div
                className={`${styles.skeleton} ${styles.skeletonRole}`}
              />
            </div>

            <div className={styles.sidebarCard}>
              <div
                className={`${styles.skeleton} ${styles.skeletonNavItem}`}
              />

              <div
                className={`${styles.skeleton} ${styles.skeletonNavItem}`}
              />

              <div
                className={`${styles.skeleton} ${styles.skeletonNavItem}`}
              />
            </div>

          </aside>

          {/* Main */}
          <main className={styles.mainContent}>

            <div className={styles.sectionCard}>

              <div
                className={`${styles.skeleton} ${styles.skeletonSectionTitle}`}
              />

              <div className={styles.gridTwo}>

                <div
                  className={`${styles.skeleton} ${styles.skeletonInput}`}
                />

                <div
                  className={`${styles.skeleton} ${styles.skeletonInput}`}
                />

              </div>

              <div
                className={`${styles.skeleton} ${styles.skeletonInput}`}
              />

              <div
                className={`${styles.skeleton} ${styles.skeletonTextarea}`}
              />

            </div>

            <div className={styles.sectionCard}>

              <div
                className={`${styles.skeleton} ${styles.skeletonSectionTitle}`}
              />

              <div
                className={`${styles.skeleton} ${styles.skeletonInput}`}
              />

              <div className={styles.gridTwo}>

                <div
                  className={`${styles.skeleton} ${styles.skeletonInput}`}
                />

                <div
                  className={`${styles.skeleton} ${styles.skeletonInput}`}
                />

              </div>

            </div>

          </main>

        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// Edit Profile
// ---------------------------------------------------------

export default function EditProfile() {
let navigate = useNavigate()
  const {
    userdata,
    setUserdata,
  } = useContext(AuthContext);

  // -------------------------------------------------------
  // Loading / Saving
  // -------------------------------------------------------

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [activeTab, setActiveTab] = useState("personal");

  // -------------------------------------------------------
  // Avatar
  // -------------------------------------------------------

  const [avatarPreview, setAvatarPreview] = useState(
    userdata?.avatar || null
  );

  const [avatarFile, setAvatarFile] = useState(null);

  const [avatarRemoved, setAvatarRemoved] = useState(false);

  const fileInputRef = useRef(null);

  // -------------------------------------------------------
  // Form State
  // -------------------------------------------------------

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    bio: "",
    college_name: "",
    branch_or_major: "",
    academic_year: "",
    graduation_year: "",
    github_url: "",
    linkedin_url: "",
    website_url: "",
  });

  // -------------------------------------------------------
  // Initialize form from userdata
  // -------------------------------------------------------

  useEffect(() => {

    if (!userdata) {
      return;
    }

    setFormData({
      first_name: userdata.first_name || "",
      last_name: userdata.last_name || "",
      username: userdata.username || "",
      bio: userdata.bio || "",
      college_name: userdata.college_name || "",
      branch_or_major: userdata.branch_or_major || "",
      academic_year: userdata.academic_year || "",
      graduation_year: userdata.graduation_year || "",
      github_url: userdata.github_url || "",
      linkedin_url: userdata.linkedin_url || "",
      website_url: userdata.website_url || "",
    });

    setAvatarPreview(userdata.avatar || null);

    setAvatarFile(null);

    setAvatarRemoved(false);

    setIsLoading(false);

  }, [userdata]);

  // -------------------------------------------------------
  // Input change
  // -------------------------------------------------------

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -------------------------------------------------------
  // Avatar select
  // -------------------------------------------------------

  const handleAvatarSelect = (e) => {

    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Allowed image types
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {

      alert(
        "Only JPG, PNG, and WEBP images are allowed."
      );

      e.target.value = "";

      return;
    }

    // Maximum 5 MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {

      alert(
        "Image must be smaller than 5MB."
      );

      e.target.value = "";

      return;
    }

    // Store actual file
    setAvatarFile(file);

    // User selected a new image,
    // therefore it is no longer considered removed.
    setAvatarRemoved(false);

    // Create temporary browser preview URL
    const previewUrl = URL.createObjectURL(file);

    setAvatarPreview(previewUrl);
  };

  // -------------------------------------------------------
  // Remove avatar
  // -------------------------------------------------------

  const handleAvatarRemove = () => {

    setAvatarPreview(null);

    setAvatarFile(null);

    setAvatarRemoved(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // -------------------------------------------------------
  // Submit
  // -------------------------------------------------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {

      // Create a NEW object.
      // Do not mutate formData directly.
      const data = {
        ...formData,
      };

      // New image selected
      if (avatarFile) {
        data.avatar = avatarFile;
      }

      // User explicitly removed avatar
      if (avatarRemoved) {
        data.avatar = null;
      }

      console.log("Data being submitted:", data);

      const response = await editUserProfile(data);

      console.log(
        "Profile updated:",
        response.data
      );

      // Update global user
      setUserdata(response.data);

      // Update local form
      setFormData({
        first_name: response.data.first_name || "",
        last_name: response.data.last_name || "",
        username: response.data.username || "",
        bio: response.data.bio || "",
        college_name: response.data.college_name || "",
        branch_or_major:
          response.data.branch_or_major || "",
        academic_year:
          response.data.academic_year || "",
        graduation_year:
          response.data.graduation_year || "",
        github_url:
          response.data.github_url || "",
        linkedin_url:
          response.data.linkedin_url || "",
        website_url:
          response.data.website_url || "",
      });

      // Backend should return the new
      // permanent avatar URL.
      setAvatarPreview(
        response.data.avatar || null
      );

      // File has already been uploaded.
      setAvatarFile(null);

      setAvatarRemoved(false);
      navigate('/profile')

    } catch (error) {

      console.error(
        "Failed to update profile:",
        error
      );

      // If Django returned validation errors
      if (error.response?.data) {
        console.error(
          "Backend errors:",
          error.response.data
        );
      }

    } finally {

      setIsSaving(false);
    }
  };

  // -------------------------------------------------------
  // Back navigation
  // -------------------------------------------------------

  const handleBackNavigation = () => {
    window.history.back();
  };

  // -------------------------------------------------------
  // Section navigation
  // -------------------------------------------------------

  const scrollToSection = (sectionId) => {

    setActiveTab(sectionId);

    const element =
      document.getElementById(sectionId);

    if (element) {

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }
  };

  // -------------------------------------------------------
  // Avatar initials
  // -------------------------------------------------------

  const getInitials = () => {

    const first = formData.first_name
      ? formData.first_name
          .charAt(0)
          .toUpperCase()
      : "";

    const last = formData.last_name
      ? formData.last_name
          .charAt(0)
          .toUpperCase()
      : "";

    return first || last
      ? `${first}${last}`
      : "SH";
  };

  // -------------------------------------------------------
  // Loading
  // -------------------------------------------------------

  if (isLoading) {
    return <ProfileEditSkeleton />;
  }

  // -------------------------------------------------------
  // UI
  // -------------------------------------------------------

  return (
    <div className={styles.pageWrapper}>

      <div className={styles.pageContainer}>

        {/* =================================================
            HEADER
        ================================================= */}

        <header className={styles.header}>

          <button
            type="button"
            onClick={handleBackNavigation}
            className={styles.backButton}
            aria-label="Go back to previous page"
            disabled={isSaving}
          >

            <svg
              className={styles.backIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />

            </svg>

            Back to Dashboard

          </button>

          <div className={styles.headerTitleRow}>

            <div>

              <h1 className={styles.title}>
                Edit Profile
              </h1>

              <p className={styles.subtitle}>
                Update your StudyHub academic profile
                and public information.
              </p>

            </div>

          </div>

        </header>

        {/* =================================================
            TWO COLUMN LAYOUT
        ================================================= */}

        <div className={styles.layoutGrid}>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className={styles.sidebar}>

            {/* Profile summary */}

            <div className={styles.profileSummaryCard}>

              <div className={styles.summaryAvatarWrapper}>

                {avatarPreview ? (

                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className={styles.summaryAvatar}
                  />

                ) : (

                  <div
                    className={
                      styles.summaryAvatarFallback
                    }
                  >
                    {getInitials()}
                  </div>

                )}

              </div>

              <h3 className={styles.summaryName}>

                {formData.first_name ||
                formData.last_name
                  ? `${formData.first_name} ${formData.last_name}`
                  : "Student Profile"}

              </h3>

              <p className={styles.summaryUsername}>
                @{formData.username || "username"}
              </p>

              <div className={styles.badgeRow}>

                <span className={styles.roleBadge}>
                  {`${formData.academic_year}th year` || "Student"}
                </span>

              </div>

            </div>

            {/* Navigation */}

            <nav className={styles.navCard}>

              {/* Personal */}

              <button
                type="button"
                onClick={() =>
                  scrollToSection("personal")
                }
                className={`${styles.navItem} ${
                  activeTab === "personal"
                    ? styles.navItemActive
                    : ""
                }`}
              >

                <svg
                  className={styles.navIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />

                </svg>

                Personal Info

              </button>

              {/* Academic */}

              <button
                type="button"
                onClick={() =>
                  scrollToSection("academic")
                }
                className={`${styles.navItem} ${
                  activeTab === "academic"
                    ? styles.navItemActive
                    : ""
                }`}
              >

                <svg
                  className={styles.navIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />

                </svg>

                Academic Details

              </button>

              {/* Social */}

              <button
                type="button"
                onClick={() =>
                  scrollToSection("social")
                }
                className={`${styles.navItem} ${
                  activeTab === "social"
                    ? styles.navItemActive
                    : ""
                }`}
              >

                <svg
                  className={styles.navIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />

                </svg>

                Social Links

              </button>

            </nav>

          </aside>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <main className={styles.mainContent}>

            <form
              onSubmit={handleSubmit}
              noValidate
            >

              {/* =================================================
                  PERSONAL INFORMATION
              ================================================= */}

              <FormSection
                id="personal"
                title="Personal Information"
                description="Your avatar and public details displayed on your StudyHub profile."
                icon={(
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className={styles.badgeSvg}
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />

                  </svg>
                )}
              >

                {/* Avatar */}

                <div className={styles.avatarRow}>

                  <div className={styles.avatarWrapper}>

                    {avatarPreview ? (

                      <img
                        src={avatarPreview}
                        alt="Profile avatar preview"
                        className={styles.avatarImage}
                      />

                    ) : (

                      <div
                        className={styles.avatarFallback}
                      >
                        {getInitials()}
                      </div>

                    )}

                  </div>

                  <div className={styles.avatarControls}>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarSelect}
                      accept="image/png,image/jpeg,image/webp"
                      className={styles.hiddenFileInput}
                      id="avatar-upload"
                    />

                    <div className={styles.avatarBtnGroup}>

                      <label
                        htmlFor="avatar-upload"
                        className={styles.uploadBtn}
                      >
                        Change photo
                      </label>

                      {avatarPreview && (

                        <button
                          type="button"
                          onClick={handleAvatarRemove}
                          className={
                            styles.removeAvatarBtn
                          }
                          disabled={isSaving}
                        >
                          Remove
                        </button>

                      )}

                    </div>

                    <p className={styles.avatarHelpText}>
                      Supports PNG, JPG or WEBP up to 5MB.
                    </p>

                  </div>

                </div>

                {/* Name */}

                <div className={styles.gridTwo}>

                  <div className={styles.fieldGroup}>

                    <label
                      htmlFor="first_name"
                      className={styles.label}
                    >
                      First Name{" "}
                      <span className={styles.requiredMark}>
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="e.g. Abdul Kalam"
                      className={styles.input}
                      autoComplete="given-name"
                      required
                    />

                  </div>

                  <div className={styles.fieldGroup}>

                    <label
                      htmlFor="last_name"
                      className={styles.label}
                    >
                      Last Name{" "}
                      <span className={styles.requiredMark}>
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="e.g. Azad"
                      className={styles.input}
                      autoComplete="family-name"
                      required
                    />

                  </div>

                </div>

                {/* Username */}

                <div className={styles.fieldGroup}>

                  <label
                    htmlFor="username"
                    className={styles.label}
                  >
                    Username{" "}
                    <span className={styles.requiredMark}>
                      *
                    </span>
                  </label>

                  <div
                    className={
                      styles.inputPrefixWrapper
                    }
                  >

                    <span className={styles.prefixSpan}>
                      studyhub.edu/p/
                    </span>

                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="username"
                      className={styles.inputWithPrefix}
                      autoComplete="username"
                      required
                      disabled
                    />

                  </div>

                </div>

                {/* Bio */}

                <div className={styles.fieldGroup}>

                  <label
                    htmlFor="bio"
                    className={styles.label}
                  >
                    Bio
                  </label>

                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Brief description about your studies, skills, or achievements..."
                    className={styles.textarea}
                  />

                  <span className={styles.helperText}>
                    Shows on your public student card.
                  </span>

                </div>

              </FormSection>

              {/* =================================================
                  ACADEMIC INFORMATION
              ================================================= */}

              <FormSection
                id="academic"
                title="Academic Information"
                description="Specify your college, major, and graduation roadmap."
                icon={(
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className={styles.badgeSvg}
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />

                  </svg>
                )}
              >

                {/* College */}

                <div className={styles.fieldGroup}>

                  <label
                    htmlFor="college"
                    className={styles.label}
                  >
                    College / University
                  </label>

                  <input
                    type="text"
                    id="college"
                    name="college_name"
                    value={formData.college_name}
                    onChange={handleChange}
                    placeholder="e.g. Vishwa Bharathi Institute"
                    className={styles.input}
                  />

                </div>

                {/* Branch */}

                <div className={styles.fieldGroup}>

                  <label
                    htmlFor="branch_or_major"
                    className={styles.label}
                  >
                    Branch / Major
                  </label>

                  <input
                    type="text"
                    id="branch_or_major"
                    name="branch_or_major"
                    value={formData.branch_or_major}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science Engineering"
                    className={styles.input}
                  />

                </div>

                {/* Academic year + Graduation */}

                <div className={styles.gridTwo}>

                  <div className={styles.fieldGroup}>

                    <label
                      htmlFor="academic_year"
                      className={styles.label}
                    >
                      Academic Year
                    </label>

                    <select
                      id="academic_year"
                      name="academic_year"
                      value={formData.academic_year}
                      onChange={handleChange}
                      className={styles.select}
                    >

                      <option value="">
                        Select Academic Year
                      </option>

                      <option value="1">
                        1st Year
                      </option>

                      <option value="2">
                        2nd Year
                      </option>

                      <option value="3">
                        3rd Year
                      </option>

                      <option value="4">
                        4th Year
                      </option>

                    </select>

                  </div>

                  <div className={styles.fieldGroup}>

                    <label
                      htmlFor="graduation_year"
                      className={styles.label}
                    >
                      Expected Graduation
                    </label>

                    <select
                      id="graduation_year"
                      name="graduation_year"
                      value={formData.graduation_year}
                      onChange={handleChange}
                      className={styles.select}
                    >

                      <option value="">
                        Select Year
                      </option>

                      <option value="2026">
                        2026
                      </option>

                      <option value="2027">
                        2027
                      </option>

                      <option value="2028">
                        2028
                      </option>

                      <option value="2029">
                        2029
                      </option>

                      <option value="2030">
                        2030
                      </option>

                      <option value="2031">
                        2031
                      </option>

                      <option value="2032">
                        2032
                      </option>

                    </select>

                  </div>

                </div>

              </FormSection>

              {/* =================================================
                  SOCIAL LINKS
              ================================================= */}

              <FormSection
                id="social"
                title="Social Links"
                description="Connect your repositories, professional networks, and personal web showcase."
                icon={(
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className={styles.badgeSvg}
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />

                  </svg>
                )}
              >

                {/* GitHub */}

                <div className={styles.fieldGroup}>

                  <label
                    htmlFor="github_url"
                    className={styles.label}
                  >
                    GitHub URL
                  </label>

                  <div
                    className={
                      styles.iconInputWrapper
                    }
                  >

                    <svg
                      className={styles.inputIcon}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >

                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />

                    </svg>

                    <input
                      type="url"
                      id="github_url"
                      name="github_url"
                      value={formData.github_url}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                      className={styles.inputWithIcon}
                    />

                  </div>

                </div>

                {/* LinkedIn */}

                <div className={styles.fieldGroup}>

                  <label
                    htmlFor="linkedin_url"
                    className={styles.label}
                  >
                    LinkedIn URL
                  </label>

                  <div
                    className={
                      styles.iconInputWrapper
                    }
                  >

                    <svg
                      className={styles.inputIcon}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >

                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.764 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />

                    </svg>

                    <input
                      type="url"
                      id="linkedin_url"
                      name="linkedin_url"
                      value={formData.linkedin_url}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className={styles.inputWithIcon}
                    />

                  </div>

                </div>

                {/* Website */}

                <div className={styles.fieldGroup}>

                  <label
                    htmlFor="website_url"
                    className={styles.label}
                  >
                    Personal Website
                  </label>

                  <div
                    className={
                      styles.iconInputWrapper
                    }
                  >

                    <svg
                      className={styles.inputIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />

                    </svg>

                    <input
                      type="url"
                      id="website_url"
                      name="website_url"
                      value={formData.website_url}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.com"
                      className={styles.inputWithIcon}
                    />

                  </div>

                </div>

              </FormSection>

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className={styles.actionsBar}>

                <button
                  type="button"
                  onClick={handleBackNavigation}
                  className={styles.cancelBtn}
                  disabled={isSaving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={styles.saveBtn}
                  disabled={isSaving}
                >

                  {isSaving ? (

                    <span className={styles.loadingState}>

                      <svg
                        className={styles.spinner}
                        viewBox="0 0 24 24"
                        fill="none"
                      >

                        <circle
                          className={styles.spinnerTrack}
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />

                        <path
                          className={styles.spinnerHead}
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />

                      </svg>

                      Saving...

                    </span>

                  ) : (

                    "Save Changes"

                  )}

                </button>

              </div>

            </form>

          </main>

        </div>

      </div>

    </div>
  );
}