"use client";

import { Home, ShoppingCart, CookingPot, ClipboardList, User } from "lucide-react";
import { getTotalRevenue, transactions } from "@/app/lib/transactions";

export default function RevenuePage() {
  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>Revenue</h1>

        <div style={styles.card}>
          <p style={styles.bigNumber}>
            ${getTotalRevenue().toFixed(2)}
          </p>

          <p style={styles.label}>
            From {transactions.filter((t: { status: string; }) => t.status === "Completed").length} completed orders
          </p>
        </div>

        <div style={styles.bottomNav}>
          <a href="/home" style={styles.navItem}>
            <Home size={22} />
            <span>Home</span>
          </a>

          <a href="/inventory" style={styles.navItem}>
            <ShoppingCart size={22} />
            <span>Inventory</span>
          </a>

          <a href="/cogs-view" style={styles.navItem}>
            <CookingPot size={22} />
            <span>Recipes</span>
          </a>

          <a href="/orders" style={styles.navItem}>
            <ClipboardList size={22} />
            <span>Orders</span>
          </a>

          <a href="/profile" style={styles.navItem}>
            <User size={22} />
            <span>Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  outerWrapper: { minHeight: "100vh", width: "100%", backgroundColor: "#1a1a1a", display: "flex", justifyContent: "center" },
  container: { width: "100%", maxWidth: "393px", backgroundColor: "#f3d9bd", minHeight: "100vh", padding: "20px 20px 100px", boxSizing: "border-box", position: "relative" },
  title: { textAlign: "center", fontSize: "20px", fontWeight: 800, color: "#1f140c", marginBottom: "20px" },
  card: { border: "1.5px solid #b97a4a", borderRadius: "14px", padding: "24px", textAlign: "center" },
  bigNumber: { fontSize: "36px", fontWeight: 800, color: "#1f140c", margin: "0 0 8px 0" },
  label: { fontSize: "13px", color: "#6a4a2a", margin: 0 },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#2b1c12", display: "flex", justifyContent: "space-around", padding: "14px 0" },
  navItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#a88a68", fontSize: "10px", textDecoration: "none", fontWeight: 600 },
};