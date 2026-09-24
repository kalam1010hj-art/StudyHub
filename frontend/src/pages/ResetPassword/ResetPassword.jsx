import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Loader2, LockKeyhole, AlertCircle } from "lucide-react";
import { resetPassword } from "../../services/AuthServices";
import styles from "./ResetPassword.module.css";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setStatus("error");
      setMessage("Please enter and confirm your new password.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await resetPassword(
        uid,
        token,
        password,
        confirmPassword
      );
      setStatus("success");
      setMessage(response.data?.detail || "Password reset successfully.");
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => navigate("/login"), 1800);
    } catch (error) {
      setStatus("error");
      setMessage(
        error.response?.data?.detail ||
          "This password reset link is invalid or expired."
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.glow} />
      <section className={styles.card}>
        <div className={styles.icon}>
          {status === "success" ? (
            <CheckCircle2 size={26} />
          ) : (
            <LockKeyhole size={26} />
          )}
        </div>

        <h1>Create a new password</h1>
        <p className={styles.subtitle}>
          Choose a strong password you haven't used before.
        </p>

        {message && (
          <div
            className={status === "success" ? styles.success : styles.error}
            role="alert"
          >
            {status === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="new-password">New password</label>
          <div className={styles.password}>
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              disabled={status === "submitting" || status === "success"}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={status === "submitting" || status === "success"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <label htmlFor="confirm-password">Confirm password</label>
          <div className={styles.password}>
            <input
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              disabled={status === "submitting" || status === "success"}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm((value) => !value)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
              disabled={status === "submitting" || status === "success"}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            className={styles.submit}
            type="submit"
            disabled={status === "submitting" || status === "success"}
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={18} className={styles.spinner} />
                Updating password...
              </>
            ) : status === "success" ? (
              "Password updated"
            ) : (
              "Reset password"
            )}
          </button>
        </form>

        <Link to="/login" className={styles.back}>
          <ArrowLeft size={16} />
          Back to login
        </Link>
      </section>
    </main>
  );
}
