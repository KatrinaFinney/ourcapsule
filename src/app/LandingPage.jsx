"use client";
import React, { useState } from "react";
import styles from "./Landing.module.css";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.headerSection}>
        <h1 className={`${styles.title} ${styles.fadeInDown}`}>
          Preserve Your Story, Forever.
        </h1>
        <p className={`${styles.subtitle} ${styles.fadeInInverse}`}>
          <span className={styles.brand}>OurCapsule.org</span> aims to safeguard
          the legacies of families across the globe through meaningful
          storytelling and permanent documentation.
        </p>
        <p className={styles.subtitle}>
          Your experiences and traditions deserve to be treasured, shared, and
          passed down for generations to come. We’re here to help you capture
          and protect them — forever.
        </p>
      </header>

      <section className={styles.formSection}>
        <h2 className={styles.formTitle}>Stay Informed</h2>
        <p className={styles.formDescription}>
          Sign up to learn when we begin welcoming participants. Help us honor
          family memories, cultural heritage, and cherished connections.
        </p>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input
            type="email"
            placeholder="Your email address"
            className={styles.emailInput}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Stay Updated"}
          </button>
        </form>

        {status === "success" && (
          <p className={styles.privacyNote}>
            Thanks for subscribing! We’ll keep you posted.
          </p>
        )}
        {status === "error" && (
          <p className={styles.privacyNote}>
            Something went wrong. Please try again.
          </p>
        )}
        {status !== "success" && (
          <p className={styles.privacyNote}>We respect your privacy. No spam, ever.</p>
        )}
      </section>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} OurCapsule.org | Crafted with purpose
      </footer>
    </div>
  );
}
