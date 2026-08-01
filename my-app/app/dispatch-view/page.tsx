"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DispatchViewPage() {
  const router = useRouter();
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleDispatch = async () => {
    setSending(true);
    await fetch("/api/dispatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item, price: parseFloat(price), pickupTime }),
    });
    setSending(false);
    setSent(true);
  };

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => router.push("/home")} style={styles.backBtn}>←</button>
          <h1 style={styles.title}>Send a Flash Deal</h1>
        </div>

        <input style={styles.input} placeholder="Item (e.g. Cupcake 6-pack)" value={item} onChange={(e) => setItem(e.target.value)} />
        <input style={styles.input} placeholder="Price ($)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input style={styles.input} placeholder="Pickup Time (e.g. Friday 5-7 PM)" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />

        <button style={styles.dispatchBtn} onClick={handleDispatch} disabled={sending || !item || !price}>
          {sending ? "Sending..." : "🚀 Dispatch Offer"}
        </button>

        {sent && <p style={styles.successMsg}>✅ Deal sent to customers!</p>}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  outerWrapper: { minHeight: "100vh", width: "100%", backgroundColor: "#1a1a1a", display: "flex", justifyContent: "center" },
  container: { width: "100%", maxWidth: "393px", backgroundColor: "#f3d9bd", minHeight: "100vh", padding: "20px", boxSizing: "border-box" },
  header: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" },
  backBtn: { background: "none", border: "none", fontSize: "20px", cursor: "pointer" },
  title: { fontSize: "18px", fontWeight: 800, color: "#2b1c12", margin: 0 },
  input: { width: "100%", border: "1px solid #b97a4a", borderRadius: "8px", padding: "12px", marginBottom: "12px", fontSize: "14px", color: "#2b1c12", boxSizing: "border-box" },
  dispatchBtn: { width: "100%", backgroundColor: "#5a3a1a", border: "none", borderRadius: "10px", padding: "16px", fontWeight: 700, color: "#fff", fontSize: "15px", cursor: "pointer", marginTop: "10px" },
  successMsg: { textAlign: "center", color: "#2b6b2b", fontWeight: 700, marginTop: "16px" },
};