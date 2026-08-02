"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupAccountPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const fields = [
    { icon: "👤", placeholder: "Full Name" },
    { icon: "🏠", placeholder: "Bakery Name" },
    { icon: "📍", placeholder: "Location (City/Address)" },
    { icon: "✉️", placeholder: "Email Address" },
    { icon: "📞", placeholder: "Phone Number" },
  ];

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => router.push("/signup-business")} style={styles.backBtn}>←</button>
          <div>
            <h1 style={styles.title}>Create Your Account</h1>
            <p style={styles.subtitle}>Let's get started with your details</p>
          </div>
        </div>

        {fields.map((f) => (
          <div key={f.placeholder} style={styles.inputWrapper}>
            <span style={styles.icon}>{f.icon}</span>
            <input style={styles.input} placeholder={f.placeholder} />
          </div>
        ))}

        <div style={styles.inputWrapper}>
          <span style={styles.icon}>🔑</span>
          <input
            style={styles.input}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
          />
          <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
            👁️
          </span>
        </div>

        <div style={styles.inputWrapper}>
          <span style={styles.icon}>🔑</span>
          <input
            style={styles.input}
            placeholder="Confirm Password"
            type={showConfirm ? "text" : "password"}
          />
          <span style={styles.eyeIcon} onClick={() => setShowConfirm(!showConfirm)}>
            👁️
          </span>
        </div>

        <button style={styles.createBtn} onClick={() => router.push("/home")}>
          Create Account
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  outerWrapper: { minHeight: "100vh", width: "100%", backgroundColor: "#1a1a1a", display: "flex", justifyContent: "center" },
  container: { width: "100%", maxWidth: "393px", backgroundColor: "#f3d9bd", minHeight: "100vh", padding: "24px 20px 40px", boxSizing: "border-box" },
  header: { display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "24px" },
  backBtn: { background: "none", border: "none", fontSize: "20px", cursor: "pointer", marginTop: "2px" },
  title: { fontSize: "20px", fontWeight: 800, color: "#2b1c12", margin: "0 0 4px 0" },
  subtitle: { fontSize: "12px", color: "#6a4a2a", margin: 0 },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#fdf1e3",
    border: "1.5px solid #b97a4a",
    borderRadius: "10px",
    padding: "12px 14px",
    marginBottom: "12px",
  },
  icon: { fontSize: "16px" },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "none",
    fontSize: "14px",
    color: "#2b1c12",
  },
  eyeIcon: { cursor: "pointer", fontSize: "14px" },
  createBtn: {
    width: "100%",
    backgroundColor: "#5a3a1a",
    border: "none",
    borderRadius: "10px",
    padding: "16px",
    fontWeight: 700,
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
