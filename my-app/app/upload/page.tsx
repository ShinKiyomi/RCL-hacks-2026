"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ScanReceiptPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    await handleUpload(selected);
  };

  const handleUpload = async (selectedFile: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("receipt", selectedFile);

    const res = await fetch("/api/test", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    // Store result temporarily and navigate to results page
    sessionStorage.setItem("scanResult", JSON.stringify(data));
    router.push("/extracted-items");
  };

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <button onClick={() => router.push("/home")} style={styles.iconBtn}>←</button>
          <h1 style={styles.title}>Scan Receipt</h1>
          <span style={styles.iconBtn}>⚡</span>
        </div>

        {/* Frame area */}
        <div style={styles.frameArea}>
          <div style={styles.frame}>
            <div style={{ ...styles.corner, top: 0, left: 0, borderRight: "none", borderBottom: "none" }} />
            <div style={{ ...styles.corner, top: 0, right: 0, borderLeft: "none", borderBottom: "none" }} />
            <div style={{ ...styles.corner, bottom: 0, left: 0, borderRight: "none", borderTop: "none" }} />
            <div style={{ ...styles.corner, bottom: 0, right: 0, borderLeft: "none", borderTop: "none" }} />
          </div>
          <p style={styles.instruction}>
            {loading ? "Reading receipt..." : "Place the receipt inside the frame"}
          </p>
        </div>

        {/* Bottom bar */}
        <div style={styles.bottomBar}>
          <button style={styles.sideIcon} onClick={() => fileInputRef.current?.click()}>
            🖼️
          </button>
          <button style={styles.captureBtn} onClick={() => cameraInputRef.current?.click()}>
            <div style={styles.captureInner} />
          </button>
          <button style={styles.sideIcon} onClick={() => cameraInputRef.current?.click()}>
            📷
          </button>
        </div>

        {/* Hidden inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  outerWrapper: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#1a1a1a",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    maxWidth: "393px",
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#6b6b6b",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
  },
  title: {
    color: "#fff",
    fontSize: "18px",
    fontWeight: 700,
    margin: 0,
  },
  frameArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 40px",
  },
  frame: {
    position: "relative",
    width: "260px",
    height: "260px",
  },
  corner: {
    position: "absolute",
    width: "40px",
    height: "40px",
    border: "3px solid #444",
  },
  instruction: {
    marginTop: "24px",
    fontSize: "15px",
    fontWeight: 600,
    color: "#333",
    textAlign: "center",
  },
  bottomBar: {
    backgroundColor: "#6b6b6b",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  sideIcon: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
  },
  captureBtn: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    border: "3px solid #fff",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  captureInner: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#ddd",
  },
};