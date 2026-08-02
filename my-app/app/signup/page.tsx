"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import styles from "./signup.module.css";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [bakeryName, setBakeryName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: fullName });

      // bakeryName / location / phone aren't stored by Firebase Auth itself —
      // save them to your database (e.g. Firestore) here once that's set up.
      // Example:
      // await setDoc(doc(db, "users", cred.user.uid), { fullName, bakeryName, location, phone });

      router.push("/home");
    } catch (err: any) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => router.push("/login")}
            aria-label="Go back"
          >
            ←
          </button>
          <h1 className={styles.title}>Create Your Account</h1>
        </div>
        <p className={styles.subtitle}>Let&apos;s get started with your details</p>

        <form onSubmit={handleSignup} className={styles.form}>
          <div className={styles.inputWrapper}>
            <span className={styles.icon}>👤</span>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputWrapper}>
            <span className={styles.icon}>🏠</span>
            <input
              type="text"
              placeholder="Bakery Name"
              value={bakeryName}
              onChange={(e) => setBakeryName(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputWrapper}>
            <span className={styles.icon}>📍</span>
            <input
              type="text"
              placeholder="Location (City/Address)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputWrapper}>
            <span className={styles.icon}>✉️</span>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputWrapper}>
            <span className={styles.icon}>📞</span>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputWrapper}>
            <span className={styles.icon}>🔑</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className={styles.inputWrapper}>
            <span className={styles.icon}>🔑</span>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label="Toggle password visibility"
            >
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.createButton} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

function friendlyError(code: string) {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account already exists with that email.";
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/weak-password":
      return "Password is too weak — use at least 6 characters.";
    default:
      return "Something went wrong. Please try again.";
  }
}
