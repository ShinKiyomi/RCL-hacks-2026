import { Home, ShoppingCart, CookingPot, ClipboardList, User, Bell } from "lucide-react";

export default function HomePage() {
  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.greeting}>Good Morning!</h1>
          <Bell size={22} color="#2b1c12" fill="#2b1c12" />
        </div>

        {/* Snap to Inventory card */}
        <div style={styles.snapCard}>
          <div style={styles.snapTextArea}>
            <h2 style={styles.snapTitle}>Snap To Inventory</h2>
            <p style={styles.snapSubtitle}>
              Scan a receipt or pantry shelf to automatically update your inventory
            </p>
            <a href="/upload" style={styles.scanButton}>
              Scan Now <span style={{ marginLeft: "6px" }}>→</span>
            </a>
          </div>
          <div style={styles.snapImage}>🧁</div>
        </div>

        {/* Today's Overview */}
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Today's Overview</h3>
          <span style={styles.seeAll}>See all</span>
        </div>

        <div style={styles.grid}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Orders</p>
            <span style={styles.statLink}>View all</span>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Revenue</p>
            <span style={styles.statLink}>See all</span>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Low stock</p>
            <span style={styles.statLink}>Check now</span>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Waste Risk</p>
          </div>
        </div>

        {/* Quick Actions */}
        <h3 style={{ ...styles.sectionTitle, marginTop: "24px" }}>Quick Actions</h3>
        <div style={styles.quickActions}>
          <a href="/cogs-view" style={styles.quickAction}>
            <div style={styles.quickIcon}>💰</div>
            <span style={styles.quickLabel}>Batch cost</span>
          </a>
          <a href="/forecast" style={styles.quickAction}>
            <div style={styles.quickIcon}>📊</div>
            <span style={styles.quickLabel}>Forecast</span>
          </a>
          <a href="/dispatch-view" style={styles.quickAction}>
            <div style={styles.quickIcon}>⚙️</div>
            <span style={styles.quickLabel}>Demand activator</span>
          </a>
          <a href="/orders" style={styles.quickAction}>
            <div style={styles.quickIcon}>📝</div>
            <span style={styles.quickLabel}>Orders</span>
          </a>
        </div>

        {/* Bottom nav */}
        <div style={styles.bottomNav}>
          <a href="/home" style={{ ...styles.navItem, color: "#e6bb8f" }}><Home size={22} /><span>Home</span></a>
          <a href="/inventory" style={styles.navItem}><ShoppingCart size={22} /><span>Inventory</span></a>
          <a href="/cogs-view" style={styles.navItem}><CookingPot size={22} /><span>Recipes</span></a>
          <a href="/orders" style={styles.navItem}><ClipboardList size={22} /><span>Orders</span></a>
          <a href="/profile" style={styles.navItem}><User size={22} /><span>Profile</span></a>
        </div>
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
    backgroundColor: "#f3d9bd",
    minHeight: "100vh",
    padding: "20px 20px 90px",
    boxSizing: "border-box",
    position: "relative",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },
  greeting: {
    fontSize: "26px",
    fontWeight: 800,
    color: "#1f140c",
    margin: 0,
  },
  snapCard: {
    backgroundColor: "#d99a6c",
    borderRadius: "16px",
    padding: "18px",
    marginBottom: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "8px",
  },
  snapTextArea: { flex: 1 },
  snapTitle: {
    fontSize: "22px",
    fontWeight: 800,
    color: "#1f140c",
    margin: "0 0 6px 0",
  },
  snapSubtitle: {
    fontSize: "12.5px",
    color: "#3d2a1a",
    margin: "0 0 14px 0",
    lineHeight: 1.35,
    maxWidth: "210px",
  },
  scanButton: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#8a5a2f",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "24px",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "13px",
  },
  snapImage: {
    fontSize: "48px",
    lineHeight: 1,
    marginTop: "4px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  sectionTitle: {
    fontSize: "19px",
    fontWeight: 800,
    color: "#1f140c",
    margin: "0 0 12px 0",
  },
  seeAll: { color: "#a0592f", fontSize: "13px", fontWeight: 600 },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "4px",
  },
  statCard: {
    border: "1.5px solid #b97a4a",
    borderRadius: "12px",
    padding: "16px",
    backgroundColor: "transparent",
    minHeight: "78px",
  },
  statLabel: {
    fontWeight: 700,
    color: "#1f140c",
    margin: "0 0 22px 0",
    fontSize: "15px",
  },
  statLink: { color: "#a0592f", fontSize: "13px", fontWeight: 600 },
  quickActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "6px",
  },
  quickAction: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    width: "22%",
  },
  quickIcon: {
    backgroundColor: "#e6bb8f",
    borderRadius: "50%",
    width: "52px",
    height: "52px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },
  quickLabel: {
    fontSize: "11.5px",
    color: "#1f140c",
    textAlign: "center",
    fontWeight: 600,
    lineHeight: 1.2,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#2b1c12",
    display: "flex",
    justifyContent: "space-around",
    padding: "14px 0",
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    color: "#a88a68",
    fontSize: "10px",
    textDecoration: "none",
    fontWeight: 600,
  },
};