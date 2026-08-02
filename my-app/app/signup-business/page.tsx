"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupBusinessPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [employees, setEmployees] = useState("");
  const [dailyOrders, setDailyOrders] = useState("");

  const options = [
    { label: "Bakery", emoji: "🏪" },
    { label: "Cafe", emoji: "☕" },
    { label: "Home Bakery", emoji: "🍞" },
  ];

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => router.push("/login")} style={styles.backBtn}>←</button>
          <div>
            <h1 style={styles.title}>Tell us about your bakery</h1>
            <p style={styles.subtitle}>This helps us personalize your experience</p>
          </div>
        </div>

        <div style={styles.optionsRow}>
          {options.map((opt) => (
            <div
              key={opt.label}
              onClick={() => setSelected(opt.label)}
              style={{
                ...styles.optionCard,
                borderColor: selected === opt.label ? "#5a3a1a" : "#b97a4a",
                borderWidth: selected === opt.label ? "2.5px" : "1.5px",
              }}
            >
              <div style={styles.optionEmoji}>{opt.emoji}</div>
              <span style={styles.optionLabel}>{opt.label}</span>
            </div>
          ))}
        </div>

        <input
          style={styles.input}
          placeholder="Number of Employees"
          value={employees}
          onChange={(e) => setEmployees(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Daily Orders (approx.)"
          value={dailyOrders}
          onChange={(e) => setDailyOrders(e.target.value)}
        />

        <button
          style={styles.continueBtn}
          onClick={() => router.push("/signup-account")}
          disabled={!selected}
        >
          Continue
        </button>

        <div style={styles.bottomDecor} />
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  outerWrapper: { minHeight: "100vh", width: "100%", backgroundColor: "#1a1a1a", display: "flex", justifyContent: "center" },
  container: { width: "100%", maxWidth: "393px", backgroundColor: "#f3d9bd", minHeight: "100vh", padding: "24px 20px", boxSizing: "border-box", position: "relative", overflow: "hidden" },
  header: { display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "28px" },
  backBtn: { background: "none", border: "none", fontSize: "20px", cursor: "pointer", marginTop: "2px" },
  title: { fontSize: "20px", fontWeight: 800, color: "#2b1c12", margin: "0 0 4px 0" },
  subtitle: { fontSize: "12px", color: "#6a4a2a", margin: 0 },
  optionsRow: { display: "flex", gap: "10px", marginBottom: "24px" },
  optionCard: {
    flex: 1,
    border: "1.5px solid #b97a4a",
    borderRadius: "10px",
    padding: "16px 8px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#fdf1e3",
  },
  optionEmoji: { fontSize: "32px", marginBottom: "8px" },
  optionLabel: { fontSize: "13px", fontWeight: 700, color: "#2b1c12" },
  input: {
    width: "100%",
    border: "1.5px solid #b97a4a",
    borderRadius: "10px",
    padding: "14px",
    marginBottom: "14px",
    fontSize: "14px",
    color: "#2b1c12",
    boxSizing: "border-box",
    backgroundColor: "#fdf1e3",
  },
  continueBtn: {
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
  bottomDecor: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "120px",
    backgroundColor: "#fce8d5",
    borderTopLeftRadius: "50%",
    borderTopRightRadius: "50%",
    zIndex: 0,
  },
};