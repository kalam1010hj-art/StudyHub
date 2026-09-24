import React, { useState, useEffect, useContext } from 'react';
import {
  BadgeCheck,
  Pencil,
  Settings,
  GraduationCap,
  School,
  BookOpen,
  Calendar,
  Award,
  Globe,
  Mail,
  User as UserIcon,
  Phone,
  ExternalLink,
  Sparkles,
  Code2,
  Share2,
  Loader2
} from 'lucide-react';
import styles from './Profile.module.css';
import getProfile from '../../services/UserServices';
import { AuthContext } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';

// Helper Utilities
const formatJoinedDate = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const maskPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length >= 4) {
    const lastFour = cleanPhone.slice(-4);
    return `+1 ••••••${lastFour}`;
  }
  return phone;
};

const getInitials = (firstName, lastName, username) => {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  if (firstName) {
    return firstName.slice(0, 2).toUpperCase();
  }
  return username ? username.slice(0, 2).toUpperCase() : 'U';
};

const formatAcademicYear = (year) => {
  if (!year) return '';
  const suffixes = ['st', 'nd', 'rd', 'th'];
  const suffix = year <= 3 ? suffixes[year - 1] : 'th';
  return `${year}${suffix} Year`;
};

export default function Profile() {
  const { userdata, setProfile } = useContext(AuthContext);
  
  const [isFetching, setIsFetching] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fetch latest user profile on component mount
  useEffect(() => {
    let isMounted = true;
    setIsFetching(true);

    getProfile()
      .then((response) => {
        if (isMounted && response?.data) {
          setProfile(response.data);
        }
      })
      .catch((error) => {
        console.error('Failed to update profile from API:', error);
      })
      .finally(() => {
        if (isMounted) setIsFetching(false);
      });

    return () => {
      isMounted = false;
    };
  }, []); // 👈 Fixed: Empty array ensures fetch runs ONCE on mount

  // Loading Guard: Prevents crashes while profile is loading
  if (!userdata && isFetching) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loadingContainer}>
          <Loader2 className={styles.spinner} size={32} />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Fallback Guard: Prevents crashes if unauthenticated or profile missing
  if (!userdata) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.emptyContainer}>
          <UserIcon size={48} />
          <h2>No Profile Available</h2>
          <p>Please log in to view your profile details.</p>
        </div>
      </div>
    );
  }

  // Safe Property Computations
  const firstName = userdata?.first_name ?? '';
  const lastName = userdata?.last_name ?? '';
  const username = userdata?.username ?? 'user';

  const fullName = `${firstName} ${lastName}`.trim();
  const initials = getInitials(firstName, lastName, username);
  const hasSocialLinks = Boolean(
    userdata?.github_url || userdata?.linkedin_url || userdata?.website_url
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* Sync Indicator */}
        {isFetching && (
          <div className={styles.topSyncBanner}>
            <Loader2 className={styles.spinner} size={14} />
            <span>Updating profile data...</span>
          </div>
        )}

        {/* ==================== PROFILE HERO ==================== */}
        <section className={styles.heroCard}>
          <div className={styles.heroBannerBackground} />
          
          <div className={styles.heroContent}>
            <div className={styles.avatarWrapper}>
              {userdata?.avatar && !imageError ? (
                <img
                  src={userdata.avatar}
                  alt={fullName || username}
                  className={styles.avatarImage}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className={styles.avatarFallback}>
                  <span>{initials}</span>
                </div>
              )}
            </div>

            <div className={styles.identityDetails}>
              <div className={styles.nameHeader}>
                <h1 className={styles.fullName}>{fullName || username}</h1>
                <span className={styles.username}>@{username}</span>
              </div>

              <div className={styles.badgesRow}>
                {userdata?.role && <span className={styles.roleBadge}>{userdata.role}</span>}
                
                {userdata?.is_verified_student && (
                  <span className={styles.verifiedBadge}>
                    <BadgeCheck className={styles.verifiedIcon} size={15} />
                    Verified System
                  </span>
                )}
              </div>

              <div className={styles.academicMeta}>
                <p className={styles.collegeTitle}>
                  <School size={15} className={styles.metaIcon} />
                  {userdata?.college_name || 'Organization Not Specified'}
                </p>
                <p className={styles.degreeSubtext}>
                  <span>{userdata?.branch_or_major || 'Major Not Specified'}</span>
                  {userdata?.academic_year && (
                    <>
                      <span className={styles.dotSeparator}>•</span>
                      <span>{formatAcademicYear(userdata.academic_year)}</span>
                    </>
                  )}
                  {userdata?.graduation_year && (
                    <>
                      <span className={styles.dotSeparator}>•</span>
                      <span>Class of {userdata.graduation_year}</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.heroActions}>
            <Link to="/my-uploads">
              <button className={styles.secondaryButton} type="button">
                <BookOpen size={15} />
                <span>My Uploads</span>
              </button>
            </Link>

            <Link to="/editProfile">
              <button className={styles.primaryButton} type="button">
                <Pencil size={15} />
                <span>Edit Profile</span>
              </button>
              </Link>
              <button className={styles.secondaryButton} type="button" aria-label="Settings">
                <Settings size={15} />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </section>

        {/* ==================== CONTENT GRID ==================== */}
        <div className={styles.contentGrid}>
          
          {/* LEFT MAIN COLUMN */}
          <main className={styles.mainColumn}>
            
            {/* Academic Profile */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <GraduationCap className={styles.sectionIcon} size={18} />
                <h2>Academic Profile</h2>
              </div>
              <div className={styles.academicGrid}>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Organization / Institution</span>
                  <span className={styles.infoValue}>{userdata?.college_name || 'Not specified'}</span>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Major / Core Focus</span>
                  <span className={styles.infoValue}>{userdata?.branch_or_major || 'Not specified'}</span>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Level</span>
                  <span className={styles.infoValue}>{formatAcademicYear(userdata?.academic_year) || 'N/A'}</span>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Version / Epoch</span>
                  <span className={styles.infoValue}>{userdata?.graduation_year || 'N/A'}</span>
                </div>
              </div>
            </section>

            {/* About / Bio */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <UserIcon className={styles.sectionIcon} size={18} />
                <h2>About Me</h2>
              </div>
              <div className={styles.bioContainer}>
                {userdata?.bio ? (
                  <p className={styles.bioText}>"{userdata.bio}"</p>
                ) : (
                  <p className={styles.bioEmptyText}>No bio provided yet.</p>
                )}
              </div>
            </section>

            {/* Reputation Section */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <Award className={styles.sectionIcon} size={18} />
                <h2>Reputation</h2>
              </div>
              <div className={styles.reputationBody}>
                <div className={styles.reputationScoreCard}>
                  <Sparkles className={styles.reputationBadgeIcon} size={20} />
                  <div className={styles.reputationScoreText}>
                    <span className={styles.scoreNumber}>{userdata?.reputation_points ?? 0}</span>
                    <span className={styles.scoreLabel}>Reputation Points</span>
                  </div>
                </div>
                <p className={styles.reputationDescription}>
                  Earn reputation by contributing useful study resources, sharing notes, and assisting students with debugging and learning.
                </p>
              </div>
            </section>

          </main>

          {/* RIGHT SIDEBAR COLUMN */}
          <aside className={styles.sideColumn}>
            
            {/* Social Links */}
            {hasSocialLinks && (
              <section className={styles.card}>
                <div className={styles.cardHeader}>
                  <Globe className={styles.sectionIcon} size={18} />
                  <h2>Links</h2>
                </div>
                <div className={styles.linksList}>
                  {userdata?.github_url && (
                    <a
                      href={userdata.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLinkItem}
                    >
                      <div className={styles.linkLeft}>
                        <Code2 size={16} className={styles.linkIcon} />
                        <span>GitHub</span>
                      </div>
                      <ExternalLink size={14} className={styles.externalIcon} />
                    </a>
                  )}

                  {userdata?.linkedin_url && (
                    <a
                      href={userdata.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLinkItem}
                    >
                      <div className={styles.linkLeft}>
                        <Share2 size={16} className={styles.linkIcon} />
                        <span>LinkedIn</span>
                      </div>
                      <ExternalLink size={14} className={styles.externalIcon} />
                    </a>
                  )}

                  {userdata?.website_url && (
                    <a
                      href={userdata.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLinkItem}
                    >
                      <div className={styles.linkLeft}>
                        <Globe size={16} className={styles.linkIcon} />
                        <span>Website</span>
                      </div>
                      <ExternalLink size={14} className={styles.externalIcon} />
                    </a>
                  )}
                </div>
              </section>
            )}

            {/* Account Information */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <BookOpen className={styles.sectionIcon} size={18} />
                <h2>Account Information</h2>
              </div>
              <div className={styles.accountList}>
                <div className={styles.accountItem}>
                  <UserIcon size={15} className={styles.accountIcon} />
                  <div className={styles.accountItemContent}>
                    <span className={styles.accountLabel}>Username</span>
                    <span className={styles.accountValue}>@{username}</span>
                  </div>
                </div>

                <div className={styles.accountItem}>
                  <Mail size={15} className={styles.accountIcon} />
                  <div className={styles.accountItemContent}>
                    <span className={styles.accountLabel}>Email</span>
                    <span className={styles.accountValue}>{userdata?.email || 'N/A'}</span>
                  </div>
                </div>

                <div className={styles.accountItem}>
                  <Calendar size={15} className={styles.accountIcon} />
                  <div className={styles.accountItemContent}>
                    <span className={styles.accountLabel}>Active Since</span>
                    <span className={styles.accountValue}>{formatJoinedDate(userdata?.date_joined)}</span>
                  </div>
                </div>

                {userdata?.phone_number && (
                  <div className={styles.accountItem}>
                    <Phone size={15} className={styles.accountIcon} />
                    <div className={styles.accountItemContent}>
                      <span className={styles.accountLabel}>Phone</span>
                      <span className={styles.accountValueMasked}>
                        {maskPhoneNumber(userdata.phone_number)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </section>

          </aside>
        </div>

      </div>
    </div>
  );
}