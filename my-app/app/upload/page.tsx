"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("receipt", file);

    const res = await fetch("/api/test", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
   <div style={{ padding: "40px", fontFamily: "sans-serif", color: "black", background: "white", minHeight: "100vh" }}>
      <h1>Upload a Receipt</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <br /><br />

      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Reading receipt..." : "Upload"}
      </button>

      {result && (
        <pre style={{ marginTop: "20px", background: "#eee", padding: "10px", color: "black" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}