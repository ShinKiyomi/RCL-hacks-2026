"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Gift, MessageCircle, RefreshCw, Home, ShoppingCart, CookingPot, ClipboardList, User } from "lucide-react";

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
          <button onClick={() => router.push("/home")} style={styles.backBtn}>
            <ArrowLeft size={22} color="#1f140c" />
          </button>
          <h1 style={styles.title}>Morale Boosting Demand Activator</h1>
        </div>

        <div style={styles.promoCard}>
          <h3 style={styles.promoTitle}>Promotion Ideas</h3>
          <p style={styles.promoSubtitle}>(Suggested offers or ideas to boost sales)</p>
          <p style={styles.promoText}>{currentIdea}</p>
          <div style={styles.giftIcon}><Gift size={30} color="#c0392b" fill="#e8544a" /></div>
        </div>

        <button style={styles.outlineBtn} onClick={copyMessage}>
          Copy Message
        </button>

        <button style={styles.whatsappBtn} onClick={shareOnWhatsapp}>
          <MessageCircle size={18} fill="#fff" color="#25D366" style={{ marginRight: "8px" }} />
          Share on Whatsapp
        </button>

        <button style={styles.outlineBtn} onClick={generateIdea} disabled={generating}>
          <RefreshCw size={16} style={{ marginRight: "8px" }} />
          {generating ? "Generating..." : "Generate another idea"}
        </button>

        <button style={styles.dispatchBtn} onClick={dispatchOffer} disabled={sending}>
          {sending ? "Sending..." : "🚀 Dispatch to Customers"}
        </button>

        {sent && <p style={styles.successMsg}>✅ Deal sent to customers!</p>}

        <div style={styles.bottomNav}>
          <a href="/home" style={styles.navItem}><Home size={22} /><span>Home</span></a>
          <a href="/inventory" style={styles.navItem}><ShoppingCart size={22} /><span>Inventory</span></a>
          <a href="/cogs-view" style={styles.navItem}><CookingPot size={22} /><span>Recipes</span></a>
          <a href="/orders" style={styles.navItem}><ClipboardList size={22} /><span>Orders</span></a>
          <a href="/profile" style={{ ...styles.navItem, color: "#e6bb8f" }}><User size={22} /><span>Profile</span></a>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  outerWrapper: { minHeight: "100vh", width: "100%", backgroundColor: "#1a1a1a", display: "flex", justifyContent: "center" },
  container: { width: "100%", maxWidth: "393px", backgroundColor: "#f3d9bd", minHeight: "100vh", padding: "20px 20px 100px", boxSizing: "border-box", position: "relative" },
  header: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "28px", position: "relative" },
  backBtn: { position: "absolute", left: 0, top: "2px", background: "none", border: "none", cursor: "pointer" },
  title: { fontSize: "22px", fontWeight: 800, color: "#1f140c", margin: 0, textAlign: "center", lineHeight: 1.3, paddingTop: "2px" },
  promoCard: { position: "relative", border: "1.5px solid #7a5030", borderRadius: "14px", padding: "20px", backgroundColor: "#d9a876", marginBottom: "18px" },
  promoTitle: { fontSize: "18px", fontWeight: 800, color: "#1f140c", margin: "0 0 6px 0" },
  promoSubtitle: { fontSize: "12px", color: "#4a3320", margin: "0 0 16px 0" },
  promoText: { fontSize: "13px", fontWeight: 600, color: "#2b1c12", margin: 0, paddingRight: "44px", lineHeight: 1.4 },
  giftIcon: { position: "absolute", top: "20px", right: "18px" },
  outlineBtn: { width: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "transparent", border: "1.5px solid #5a3a1a", borderRadius: "12px", padding: "16px", fontWeight: 700, color: "#5a3a1a", fontSize: "14px", cursor: "pointer", marginBottom: "14px" },
  whatsappBtn: { width: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#25D366", border: "none", borderRadius: "12px", padding: "16px", fontWeight: 700, color: "#fff", fontSize: "14px", cursor: "pointer", marginBottom: "14px" },
  dispatchBtn: { width: "100%", backgroundColor: "#5a3a1a", border: "none", borderRadius: "12px", padding: "16px", fontWeight: 700, color: "#fff", fontSize: "15px", cursor: "pointer", marginTop: "10px" },
  successMsg: { textAlign: "center", color: "#2b6b2b", fontWeight: 700, marginTop: "14px" },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#2b1c12", display: "flex", justifyContent: "space-around", padding: "14px 0" },
  navItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#a88a68", fontSize: "10px", textDecoration: "none", fontWeight: 600 },
};