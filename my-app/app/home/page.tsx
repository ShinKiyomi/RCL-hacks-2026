export default function HomePage() {
  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.greeting}>Good Morning!</h1>
          <div style={styles.bell}>🔔</div>
        </div>

        {/* Snap to Inventory card */}
        <div style={styles.snapCard}>
          <h2 style={styles.snapTitle}>Snap To Inventory</h2>
          <p style={styles.snapSubtitle}>
            Scan a receipt or pantry shelf to automatically update your inventory
          </p>
          <a href="/upload" style={styles.scanButton}>
            Scan Now →
          </a>
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
        <h3 style={styles.sectionTitle}>Quick Actions</h3>
        <div style={styles.quickActions}>
          <a href="/cogs-view" style={styles.quickAction}>
            <div style={styles.quickIcon}>💰</div>
            <span style={styles.quickLabel}>Batch cost</span>
          </a>
          <a href="/forecast" style={styles.quickAction}>
            <div style={styles.quickIcon}>📈</div>
            <span style={styles.quickLabel}>Forecast</span>
          </a>
          <a href="/dispatch-view" style={styles.quickAction}>
            <div style={styles.quickIcon}>⚙️</div>
            <span style={styles.quickLabel}>Demand activator</span>
          </a>
          <a href="/orders" style={styles.quickAction}>
            <div style={styles.quickIcon}>📋</div>
            <span style={styles.quickLabel}>Orders</span>
          </a>
        </div>

        {/* Bottom nav */}
<div style={styles.bottomNav}>
  <a href="/home" style={styles.navItem}>🏠<span>Home</span></a>
  <a href="/inventory" style={styles.navItem}>🛒<span>Inventory</span></a>
  <a href="/recipes" style={styles.navItem}>🍳<span>Recipes</span></a>
  <a href="/orders" style={styles.navItem}>📋<span>Orders</span></a>
  <a href="/profile" style={styles.navItem}>👤<span>Profile</span></a>
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
    padding: "24px 20px 100px",
    boxSizing: "border-box",
    position: "relative",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  greeting: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#2b1c12",
    margin: 0,
  },
  bell: { fontSize: "20px" },
  snapCard: {
    backgroundColor: "#d99a6c",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "24px",
  },
  snapTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#2b1c12",
    margin: "0 0 8px 0",
  },
  snapSubtitle: {
    fontSize: "13px",
    color: "#3d2a1a",
    margin: "0 0 16px 0",
    lineHeight: 1.4,
  },
  scanButton: {
    display: "inline-block",
    backgroundColor: "#3d2a1a",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "14px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#2b1c12",
    margin: "16px 0 12px 0",
  },
  seeAll: { color: "#a0592f", fontSize: "13px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "8px",
  },
  statCard: {
    border: "1.5px solid #b97a4a",
    borderRadius: "12px",
    padding: "16px",
    backgroundColor: "transparent",
  },
  statLabel: {
    fontWeight: 700,
    color: "#2b1c12",
    margin: "0 0 20px 0",
    fontSize: "15px",
  },
  statLink: { color: "#a0592f", fontSize: "13px" },
  quickActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
  },
  quickAction: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    textDecoration: "none",
    width: "22%",
  },
  quickIcon: {
    backgroundColor: "#e6bb8f",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },
  quickLabel: {
    fontSize: "11px",
    color: "#2b1c12",
    textAlign: "center",
    fontWeight: 600,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#2b1c12",
    display: "flex",
    justifyContent: "space-around",
    padding: "12px 0",
    borderRadius: "0 0 0 0",
  },
  navItem: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  color: "#e6bb8f",
  fontSize: "10px",
  textDecoration: "none",
},
};