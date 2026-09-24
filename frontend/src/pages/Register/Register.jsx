import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  BookOpen, 
  UserPlus, 
  AlertCircle 
} from "lucide-react";
import styles from "./Register.module.css";
import { CreateAccount } from "../../services/AuthServices";

const Register = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const first_name = formData.first_name.trim();
    const last_name = formData.last_name.trim();
    const email = formData.email.trim().toLowerCase();
    const username = formData.username.trim();

    if (!first_name) return setError("Please enter your first name.");
    if (!last_name) return setError("Please enter your last name.");
    if (!email) return setError("Please enter your email address.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError("Please enter a valid email address.");
    }
    if (!username) return setError("Please choose a username.");
    if (username.length < 3) return setError("Username must be at least 3 characters.");
    if (!formData.password) return setError("Please create a password.");
    if (formData.password.length < 8) {
      return setError("Password must be at least 8 characters long.");
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.agreeToTerms) {
      return setError("Please agree to the Terms of Service and Privacy Policy.");
    }

    setLoading(true);

    try {
      await CreateAccount({
        first_name,
        last_name,
        email,
        username,
        password: formData.password,
      });

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      });

      navigate("/login", {
        replace: true,
        state: { message: "Account created successfully. Please log in." },
      });
    } catch (err) {
      const data = err?.response?.data;
      const errors = data?.error || data?.errors;

      if (errors && typeof errors === "object") {
        const messages = Object.values(errors).flat().filter(Boolean);
        setError(messages.join(" ") || "Unable to create your account.");
      } else {
        setError(
          data?.detail ||
          data?.message ||
          "Unable to create your account. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* Header / Brand Banner */}
        <div className={styles.header}>
          <Link to="/" className={styles.brand}>
            <div className={styles.logoWrapper}>
              <BookOpen size={24} className={styles.logoIcon} />
            </div>
            <span className={styles.brandText}>
              Study<span className={styles.brandHighlight}>Hub</span>
            </span>
          </Link>
          <h1 className={styles.title}>Create an Account</h1>
          <p className={styles.subtitle}>
            Join thousands of students and share study resources
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className={styles.errorAlert} role="alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          
          <div className={styles.nameGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="first_name" className={styles.label}>First name</label>
              <div className={styles.inputWrapper}>
                <User size={18} className={styles.inputIcon} />
                <input id="first_name" type="text" name="first_name" value={formData.first_name}
                  onChange={handleChange} placeholder="John" className={styles.input}
                  autoComplete="given-name" maxLength={150} required />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="last_name" className={styles.label}>Last name</label>
              <div className={styles.inputWrapper}>
                <User size={18} className={styles.inputIcon} />
                <input id="last_name" type="text" name="last_name" value={formData.last_name}
                  onChange={handleChange} placeholder="Doe" className={styles.input}
                  autoComplete="family-name" maxLength={150} required />
              </div>
            </div>
          </div>

          {/* Username */}
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.inputIcon} />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="john_doe"
                className={styles.input}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email address</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input type="email" id="email" name="email" value={formData.email}
                onChange={handleChange} placeholder="you@example.com" className={styles.input}
                autoComplete="email" inputMode="email" maxLength={254} required />
            </div>
            <span className={styles.helpText}>
              Used for password recovery and important StudyHub account emails.
            </span>
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={styles.input}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={styles.input}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                tabIndex="-1"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <label className={styles.checkboxLabel}>
            <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms}
              onChange={handleChange} className={styles.checkbox} />
            <span>
              I agree to the <Link to="/terms" className={styles.inlineLink}>Terms of Service</Link>{" "}
              and <Link to="/privacy" className={styles.inlineLink}>Privacy Policy</Link>.
            </span>
          </label>

          {/* Submit Button */}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <>
                <UserPlus size={18} />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className={styles.footer}>
          <p>
            Already have an account?{" "}
            <Link to="/login" className={styles.loginLink}>
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;