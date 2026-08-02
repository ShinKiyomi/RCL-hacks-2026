"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DispatchViewPage() {
  const router = useRouter();
  const [currentIdea, setCurrentIdea] = useState("Generating your promo idea...");
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const generateIdea = async () => {
    setGenerating(true);
    const stored = localStorage.getItem("inventoryItems");
    const inventory = stored ? JSON.parse(stored) : [];

    const res = await fetch("/api/generate-promo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inventory }),
    });
    const data = await res.json();
    setCurrentIdea(data.message);
    setGenerating(false);
  };

  useEffect(() => {
    generateIdea();
  }, []);

  const copyMessage = () => {
    navigator.clipboard.writeText(currentIdea);
    alert("Copied to clipboard!");
  };

  const shareOnWhatsapp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(currentIdea)}`;
    window.open(url, "_blank");
  };

  const dispatchOffer = async () => {
    setSending(true);
    await fetch("/api/dispatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item: "Cupcake Special",
        price: 12,
        pickupTime: "This weekend",
        message: currentIdea,
      }),
    });
    setSending(false);
    setSent(true);
  };

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => router.push("/home")} style={styles.backBtn}>←</button>
          <h1 style={styles.title}>Morale Boosting Demand Activator</h1>
        </div>

        <div style={styles.promoCard}>
          <h3 style={styles.promoTitle}>Promotion Ideas</h3>
          <p style={styles.promoSubtitle}>(Suggested offers or ideas to boost sales)</p>
          <p style={styles.promoText}>{currentIdea}</p>
          <span style={styles.giftIcon}>🎁</span>
        </div>

        <button style={styles.outlineBtn} onClick={copyMessage}>
          Copy Message
        </button>

        <button style={styles.whatsappBtn} onClick={shareOnWhatsapp}>
          📱 Share on Whatsapp
        </button>

        <button style={styles.outlineBtn} onClick={generateIdea} disabled={generating}>
          {generating ? "Generating..." : "🔄 Generate another idea"}
        </button>

        <button style={styles.dispatchBtn} onClick={dispatchOffer} disabled={sending}>
          {sending ? "Sending..." : "🚀 Dispatch to Customers"}
        </button>

        {sent && <p style={styles.successMsg}>✅ Deal sent to customers!</p>}

        <div style={styles.bottomNav}>
          <a href="/home" style={styles.navItem}>🏠<span>Home</span></a>
          <a href="/inventory" style={styles.navItem}>🛒<span>Inventory</span></a>
          <a href="/cogs-view" style={styles.navItem}>🍳<span>Recipes</span></a>
          <a href="/orders" style={styles.navItem}>📋<span>Orders</span></a>
          <a href="/profile" style={styles.navItem}>👤<span>Profile</span></a>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  outerWrapper: { minHeight: "100vh", width: "100%", backgroundColor: "#1a1a1a", display: "flex", justifyContent: "center" },
  container: { width: "100%", maxWidth: "393px", backgroundColor: "#f3d9bd", minHeight: "100vh", padding: "20px 20px 100px", boxSizing: "border-box", position: "relative" },
  header: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" },
  backBtn: { background: "none", border: "none", fontSize: "20px", cursor: "pointer" },
  title: { fontSize: "19px", fontWeight: 800, color: "#2b1c12", margin: 0, lineHeight: 1.3 },
  promoCard: { position: "relative", border: "1.5px solid #7a5030", borderRadius: "12px", padding: "18px", backgroundColor: "#d9a876", marginBottom: "20px" },
  promoTitle: { fontSize: "16px", fontWeight: 800, color: "#2b1c12", margin: "0 0 6px 0" },
  promoSubtitle: { fontSize: "11px", color: "#4a3320", margin: "0 0 14px 0" },
  promoText: { fontSize: "13px", fontWeight: 600, color: "#2b1c12", margin: 0, paddingRight: "40px" },
  giftIcon: { position: "absolute", top: "18px", right: "16px", fontSize: "28px" },
  outlineBtn: { width: "100%", backgroundColor: "transparent", border: "1.5px solid #5a3a1a", borderRadius: "10px", padding: "14px", fontWeight: 700, color: "#5a3a1a", fontSize: "14px", cursor: "pointer", marginBottom: "12px" },
  whatsappBtn: { width: "100%", backgroundColor: "#25D366", border: "none", borderRadius: "10px", padding: "14px", fontWeight: 700, color: "#fff", fontSize: "14px", cursor: "pointer", marginBottom: "12px" },
  dispatchBtn: { width: "100%", backgroundColor: "#5a3a1a", border: "none", borderRadius: "10px", padding: "16px", fontWeight: 700, color: "#fff", fontSize: "15px", cursor: "pointer", marginTop: "12px" },
  successMsg: { textAlign: "center", color: "#2b6b2b", fontWeight: 700, marginTop: "14px" },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#2b1c12", display: "flex", justifyContent: "space-around", padding: "12px 0" },
  navItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#e6bb8f", fontSize: "10px", textDecoration: "none" },
};