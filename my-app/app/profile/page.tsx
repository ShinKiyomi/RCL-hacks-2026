"use client";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const menuItems = [
    { icon: "🏪", label: "Bakery Details" },
    { icon: "💳", label: "Billing & Pricing Rules" },
    { icon: "🔔", label: "Notifications" },
    { icon: "🔒", label: "Privacy & Security" },
    { icon: "❓", label: "Help & Support" },
  ];

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>Profile</h1>

        <div style={styles.profileCard}>
          <div style={styles.avatar}>🧑‍🍳</div>
          <div>
            <p style={styles.name}>Siri's Bakery</p>
            <p style={styles.subtitle}>Home Bakery</p>
          </div>
        </div>

        <div style={styles.menuList}>
          {menuItems.map((item) => (
            <div key={item.label} style={styles.menuItem}>
              <span style={styles.menuIcon}>{item.icon}</span>
              <span style={styles.menuLabel}>{item.label}</span>
              <span style={styles.chevron}>›</span>
            </div>
          ))}
        </div>

        <button style={styles.logoutBtn} onClick={() => router.push("/login")}>
          Log Out
        </button>

        <div style={styles.bottomNav}>
          <a href="/home" style={styles.navItem}>🏠<span>Home</span></a>
          <a href="/inventory" style={styles.navItem}>🛒<span>Inventory</span></a>
          <a href="/cogs-view" style={styles.navItem}>🍳<span>Recipes</span></a>
          <a href="/orders" style={styles.navItem}>📋<span>Orders</span></a>
          <a href="/profile" style={{ ...styles.navItem, color: "#a0592f" }}>👤<span>Profile</span></a>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  outerWrapper: { minHeight: "100vh", width: "100%", backgroundColor: "#1a1a1a", display: "flex", justifyContent: "center" },
  container: { width: "100%", maxWidth: "393px", backgroundColor: "#f3d9bd", minHeight: "100vh", padding: "20px 20px 100px", boxSizing: "border-box", position: "relative" },
  title: { textAlign: "center", fontSize: "20px", fontWeight: 800, color: "#2b1c12", marginBottom: "20px" },
  profileCard: { display: "flex", alignItems: "center", gap: "14px", border: "1.5px solid #7a5030", borderRadius: "12px", padding: "16px", marginBottom: "20px", backgroundColor: "#e6bb8f" },
  avatar: { width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#d99a6c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" },
  name: { fontWeight: 800, fontSize: "15px", color: "#2b1c12", margin: "0 0 2px 0" },
  subtitle: { fontSize: "12px", color: "#5a3a1a", margin: 0 },
  menuList: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" },
  menuItem: { display: "flex", alignItems: "center", gap: "12px", border: "1.5px solid #b97a4a", borderRadius: "10px", padding: "14px", cursor: "pointer" },
  menuIcon: { fontSize: "18px" },
  menuLabel: { flex: 1, fontSize: "13px", fontWeight: 700, color: "#2b1c12" },
  chevron: { fontSize: "18px", color: "#8a6a4a" },
  logoutBtn: { width: "100%", backgroundColor: "transparent", border: "1.5px solid #a52f22", borderRadius: "10px", padding: "14px", fontWeight: 700, color: "#a52f22", fontSize: "14px", cursor: "pointer" },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#2b1c12", display: "flex", justifyContent: "space-around", padding: "12px 0" },
  navItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#e6bb8f", fontSize: "10px", textDecoration: "none" },
};