import { useEffect, useMemo, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Bell,
  Check,
  ChevronRight,
  KeyRound,
  LogOut,
  Mail,
  Moon,
  Shield,
  Sun,
  Trash2,
  User,
} from "lucide-react";

import { AuthContext } from "../../context/AuthProvider";
import {
  changePassword,
  deleteAccount,
  logoutAccount,
} from "../../services/AuthServices";
import styles from "./Settings.module.css";

const getStoredBoolean = (key, fallback = false) => {
  const value = localStorage.getItem(key);
  return value === null ? fallback : value === "true";
};

const getErrorMessage = (error, fallback) => {
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

  return error?.message || fallback;
};

export default function Settings() {
  const { userdata, Logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [changePasswordMessage, setChangePasswordMessage] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");

  const [emailNotifications, setEmailNotifications] = useState(() =>
    getStoredBoolean("studyhub_email_notifications", true)
  );
  const [uploadNotifications, setUploadNotifications] = useState(() =>
    getStoredBoolean("studyhub_upload_notifications", true)
  );
  const [reduceMotion, setReduceMotion] = useState(() =>
    getStoredBoolean("studyhub_reduce_motion", false)
  );

  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const fullName = useMemo(() => {
    return `${userdata?.first_name || ""} ${userdata?.last_name || ""}`.trim();
  }, [userdata]);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduceMotion);
    localStorage.setItem("studyhub_reduce_motion", String(reduceMotion));

    return () => {
      document.documentElement.classList.remove("reduce-motion");
    };
  }, [reduceMotion]);

  const handleNotificationChange = (setter, key, value) => {
    setter(value);
    localStorage.setItem(key, String(value));
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    setChangePasswordError("");
    setChangePasswordMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setChangePasswordError("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setChangePasswordError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangePasswordError("New password and confirmation do not match.");
      return;
    }

    setChangePasswordLoading(true);

    try {
      const response = await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      setChangePasswordMessage(
        response?.data?.detail || "Your password has been changed successfully."
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setChangePasswordError(
        getErrorMessage(error, "Unable to change your password.")
      );
    } finally {
      setChangePasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    setLogoutError("");
    setLogoutLoading(true);

    try {
      await logoutAccount();
    } catch (error) {
      console.error("Server logout failed:", error);
      setLogoutError(
        getErrorMessage(error, "Could not notify the server. Signing out locally.")
      );
    } finally {
      Logout();
      setLogoutLoading(false);
      navigate("/login", { replace: true });
    }
  };

  const handleDeleteAccount = async (event) => {
    event.preventDefault();
    setDeleteError("");

    if (!deletePassword) {
      setDeleteError("Enter your password to continue.");
      return;
    }

    if (deleteConfirmation !== "DELETE") {
      setDeleteError('Type "DELETE" exactly to confirm account deletion.');
      return;
    }

    setDeleteLoading(true);

    try {
      await deleteAccount(deletePassword);
      Logout();
      navigate("/register", { replace: true });
    } catch (error) {
      setDeleteError(
        getErrorMessage(error, "Unable to delete your account.")
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Account settings</span>
            <h1>Settings</h1>
            <p>
              Manage your StudyHub account, security, and personal preferences.
            </p>
          </div>

          <Link to="/profile" className={styles.backLink}>
            <User size={16} />
            Back to profile
          </Link>
        </header>

        <section className={styles.accountCard}>
          <div className={styles.avatar}>
            {userdata?.avatar ? (
              <img src={userdata.avatar} alt={fullName || userdata?.username || "User"} />
            ) : (
              (userdata?.username || "U").charAt(0).toUpperCase()
            )}
          </div>

          <div className={styles.accountIdentity}>
            <strong>{fullName || userdata?.username || "StudyHub user"}</strong>
            <span>@{userdata?.username || "user"}</span>
          </div>

          <div className={styles.accountActions}>
            <Link to="/editProfile" className={styles.secondaryButton}>
              Edit profile
              <ChevronRight size={15} />
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div className={styles.sectionIcon}><Shield size={18} /></div>
            <div>
              <h2>Account</h2>
              <p>Review your account information and profile status.</p>
            </div>
          </div>

          <div className={styles.settingsList}>
            <div className={styles.settingRow}>
              <div>
                <strong>Username</strong>
                <span>@{userdata?.username || "—"}</span>
              </div>
              <span className={styles.readOnly}>Managed</span>
            </div>

            <div className={styles.settingRow}>
              <div>
                <strong>Email address</strong>
                <span>{userdata?.email || "—"}</span>
              </div>
              <span className={styles.readOnly}>Managed</span>
            </div>

            <div className={styles.settingRow}>
              <div>
                <strong>Account role</strong>
                <span>{userdata?.role || "Student"}</span>
              </div>
              <span className={styles.statusBadge}>
                {userdata?.is_verified_student ? "Verified student" : "Standard account"}
              </span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div className={styles.sectionIcon}><KeyRound size={18} /></div>
            <div>
              <h2>Security</h2>
              <p>Keep your account protected with a strong password.</p>
            </div>
          </div>

          <form className={styles.form} onSubmit={handlePasswordSubmit}>
            <div className={styles.formGrid}>
              <label>
                <span>Current password</span>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </label>

              <label>
                <span>New password</span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  autoComplete="new-password"
                />
              </label>

              <label>
                <span>Confirm new password</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                />
              </label>
            </div>

            <p className={styles.helper}>Use at least 8 characters.</p>

            {changePasswordError && (
              <div className={styles.errorMessage}>{changePasswordError}</div>
            )}

            {changePasswordMessage && (
              <div className={styles.successMessage}>
                <Check size={16} />
                {changePasswordMessage}
              </div>
            )}

            <button
              className={styles.primaryButton}
              type="submit"
              disabled={changePasswordLoading}
            >
              {changePasswordLoading ? "Changing password…" : "Change password"}
            </button>
          </form>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div className={styles.sectionIcon}><Bell size={18} /></div>
            <div>
              <h2>Preferences</h2>
              <p>These preferences are saved on this browser.</p>
            </div>
          </div>

          <div className={styles.settingsList}>
            <div className={styles.settingRow}>
              <div>
                <strong>Email notifications</strong>
                <span>Keep email notification preferences ready for future StudyHub notifications.</span>
              </div>
              <button
                type="button"
                className={`${styles.toggle} ${emailNotifications ? styles.toggleActive : ""}`}
                onClick={() =>
                  handleNotificationChange(
                    setEmailNotifications,
                    "studyhub_email_notifications",
                    !emailNotifications
                  )
                }
                aria-pressed={emailNotifications}
              >
                <span />
              </button>
            </div>

            <div className={styles.settingRow}>
              <div>
                <strong>Upload confirmations</strong>
                <span>Remember that you prefer confirmation feedback after uploads.</span>
              </div>
              <button
                type="button"
                className={`${styles.toggle} ${uploadNotifications ? styles.toggleActive : ""}`}
                onClick={() =>
                  handleNotificationChange(
                    setUploadNotifications,
                    "studyhub_upload_notifications",
                    !uploadNotifications
                  )
                }
                aria-pressed={uploadNotifications}
              >
                <span />
              </button>
            </div>

            <div className={styles.settingRow}>
              <div>
                <strong>Reduce motion</strong>
                <span>Reduce animation and motion preferences for this browser.</span>
              </div>
              <button
                type="button"
                className={`${styles.toggle} ${reduceMotion ? styles.toggleActive : ""}`}
                onClick={() =>
                  handleNotificationChange(
                    setReduceMotion,
                    "studyhub_reduce_motion",
                    !reduceMotion
                  )
                }
                aria-pressed={reduceMotion}
              >
                <span />
              </button>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div className={styles.sectionIcon}><LogOut size={18} /></div>
            <div>
              <h2>Session</h2>
              <p>Sign out from this StudyHub account on this device.</p>
            </div>
          </div>

          {logoutError && <div className={styles.errorMessage}>{logoutError}</div>}

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleLogout}
            disabled={logoutLoading}
          >
            <LogOut size={16} />
            {logoutLoading ? "Signing out…" : "Sign out"}
          </button>
        </section>

        <section className={styles.dangerSection}>
          <div className={styles.sectionHeading}>
            <div className={styles.dangerIcon}><AlertTriangle size={18} /></div>
            <div>
              <h2>Danger zone</h2>
              <p>Deleting your account is permanent and cannot be undone.</p>
            </div>
          </div>

          {!deleteOpen ? (
            <button
              type="button"
              className={styles.dangerButton}
              onClick={() => {
                setDeleteOpen(true);
                setDeleteError("");
              }}
            >
              <Trash2 size={16} />
              Delete account
            </button>
          ) : (
            <form className={styles.deletePanel} onSubmit={handleDeleteAccount}>
              <div className={styles.warningBox}>
                Your profile will be removed. Resources you uploaded may remain
                available without your account attribution.
              </div>

              <label>
                <span>Your password</span>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(event) => setDeletePassword(event.target.value)}
                  autoComplete="current-password"
                />
              </label>

              <label>
                <span>Type DELETE to confirm</span>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(event) => setDeleteConfirmation(event.target.value)}
                />
              </label>

              {deleteError && <div className={styles.errorMessage}>{deleteError}</div>}

              <div className={styles.deleteActions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => {
                    setDeleteOpen(false);
                    setDeletePassword("");
                    setDeleteConfirmation("");
                    setDeleteError("");
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={styles.dangerButton}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Deleting…" : "Permanently delete account"}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
