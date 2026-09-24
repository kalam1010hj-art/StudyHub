import React, { useState, useContext } from "react";
import {
  GraduationCap,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import LoginLock from "./LoginLock";
import AccountLogin from "../../services/AuthServices";
import { AuthContext } from "../../context/AuthProvider";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Auth related
  const { LoginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Flow State: 'idle' | 'submitting' | 'success' | 'error'
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!identifier.trim()) {
      errors.identifier = "Username or email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "submitting" || status === "success") return;

    setErrorMessage("");
    if (!validateForm()) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 500);
      return;
    }

    setStatus("submitting");

    // Passed `remember` state to AccountLogin
    AccountLogin(identifier.trim(), password)
      .then((response) => {
        setStatus("success");

        // Context login & redirection
        const token = response.data.token;
        const profile = response.data.userprofile;

        LoginUser(token, profile);
        navigate("/");
      })
      .catch((error) => {
        console.log("Full error object:", error);
        setStatus("error");

        let message = "An unexpected error occurred.";

        if (!error.response) {
          // Server is unreachable or offline
          message =
            "Server is unreachable. Please check if your backend is running.";
        } else if (error.response.status === 500) {
          // Backend crashed (Internal Server Error)
          message =
            "Internal Server Error (500). Check your backend console logs.";
        } else if (
          error.response.status === 400 ||
          error.response.status === 401
        ) {
          // Bad credentials or invalid form data
          message =
            error.response.data?.detail ||
            error.response.data?.non_field_errors?.[0] ||
            "Invalid username/email or password.";
        }

        setErrorMessage(message);
      });
  };

  return (
    <div className={styles.wrapper}>
      {/* Background Decorative Ambient Canvas */}
      <div className={styles.ambientGlow} />
      <div className={styles.gridPattern} />

      <div className={styles.card}>
        {/* Brand Header */}
        <div className={styles.header}>
          <div className={styles.brandBadge}>
            <GraduationCap className={styles.brandIcon} size={22} />
            <span className={styles.brandName}>StudyHub</span>
          </div>

          {/* Signature Animated Lock Illustration */}
          <div className={styles.lockContainerWrapper}>
            <LoginLock state={status} />
          </div>

          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Accessibility Status Region */}
        <div aria-live="polite" className={styles.srOnly}>
          {status === "submitting" && "Signing in..."}
          {status === "success" && "Authentication successful. Redirecting..."}
          {errorMessage && `Error: ${errorMessage}`}
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className={styles.errorBanner} role="alert">
            <AlertCircle size={18} className={styles.errorBannerIcon} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Username Field */}
          <div className={styles.fieldGroup}>
            <label htmlFor="identifier" className={styles.label}>
              Username
            </label>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (fieldErrors.identifier)
                  setFieldErrors({ ...fieldErrors, username: "" });
              }}
              placeholder="Enter username or email"
              className={`${styles.input} ${fieldErrors.username ? styles.inputError : ""}`}
              disabled={status === "submitting" || status === "success"}
              autoComplete="username"
              required
            />
            {fieldErrors.identifier && (
              <span className={styles.fieldErrorText}>
                {fieldErrors.identifier}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className={styles.fieldGroup}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <Link to="/forgot-password" className={styles.forgotLink}>
                {/* Password recovery */}
                Forgot password?
              </Link>
            </div>

            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password)
                    setFieldErrors({ ...fieldErrors, password: "" });
                }}
                placeholder="Enter your password"
                className={`${styles.input} ${fieldErrors.password ? styles.inputError : ""}`}
                disabled={status === "submitting" || status === "success"}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={status === "submitting" || status === "success"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {fieldErrors.password && (
              <span className={styles.fieldErrorText}>
                {fieldErrors.password}
              </span>
            )}
          </div>

          {/* Remember Me Controls */}
          {/* <div className={styles.rememberRow}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className={styles.checkbox}
                disabled={status === "submitting" || status === "success"}
              />
              <span>Remember me on this device</span>
            </label>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className={`${styles.submitBtn} ${status === "success" ? styles.submitSuccess : ""}`}
            disabled={status === "submitting" || status === "success"}
          >
            {status === "submitting" ? (
              <span className={styles.btnContent}>
                <Loader2 size={18} className={styles.spinner} />
                <span>Signing in...</span>
              </span>
            ) : status === "success" ? (
              <span className={styles.btnContent}>
                <span>Authenticated</span>
              </span>
            ) : (
              <span className={styles.btnContent}>
                <span>Sign In</span>
                <ArrowRight size={18} className={styles.btnArrow} />
              </span>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className={styles.footerText}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.signupLink}>
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
