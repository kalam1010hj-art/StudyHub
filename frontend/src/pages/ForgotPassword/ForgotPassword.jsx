import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Loader2, Mail, AlertCircle } from "lucide-react";
import { requestPasswordReset } from "../../services/AuthServices";
import styles from "./ForgotPassword.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await requestPasswordReset(email.trim());
      setStatus("success");
      setMessage(
        response.data?.detail ||
          "If an account exists for that email, a reset link has been sent."
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setStatus("error");
      setMessage(
        error.response?.data?.detail ||
          "We couldn't process your request. Please try again."
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.glow} />
      <section className={styles.card}>
        <div className={styles.icon}>
          {status === "success" ? <CheckCircle2 size={26} /> : <Mail size={26} />}
        </div>

        <h1>Forgot your password?</h1>
        <p className={styles.subtitle}>
          Enter the email address linked to your StudyHub account and we'll
          send you a password reset link.
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
          <label htmlFor="reset-email">Email address</label>
          <input
            id="reset-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={status === "submitting"}
            required
          />

          <button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <Loader2 size={18} className={styles.spinner} />
                Sending link...
              </>
            ) : (
              "Send reset link"
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
