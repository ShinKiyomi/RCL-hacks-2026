"use client";
import { Home, ShoppingCart, CookingPot, ClipboardList, User, Search } from "lucide-react";
import { useState, useEffect } from "react";

interface InventoryItem {
  name: string;
  quantity: string;
  status: "Good" | "Low Stock" | "Expiring Soon";
}

const statusColors: Record<string, { bg: string; text: string }> = {
  Good: { bg: "#a8c99a", text: "#1c2b12" },
  "Low Stock": { bg: "#e8a087", text: "#5a2010" },
  "Expiring Soon": { bg: "#9fc3e0", text: "#0f2c40" },
};

export default function InventoryPage() {
  const [filter, setFilter] = useState<"All" | "Low Stock" | "Expiring Soon">("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("inventoryItems");
    if (stored) {
      const parsed = JSON.parse(stored);
      const withStatus: InventoryItem[] = parsed.map((item: any) => ({
        name: item.name,
        quantity: `${item.quantity ?? 1} unit(s)`,
        status: "Good",
      }));
      setItems(withStatus);
    }
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesFilter = filter === "All" || item.status === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>Inventory</h1>

        <div style={styles.searchBar}>
          <Search size={16} color="#5a3a1a" />
          <input
            style={styles.searchInput}
            placeholder="Search ingredients"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={styles.tabs}>
          {(["All", "Low Stock", "Expiring Soon"] as const).map((tab) => (
            <span
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                ...styles.tab,
                fontWeight: filter === tab ? 800 : 600,
                color: filter === tab ? "#5a3a1a" : "#8a6a4a",
                borderBottom: filter === tab ? "2px solid #5a3a1a" : "none",
              }}
            >
              {tab}
            </span>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6a4a2a", fontSize: "13px", marginTop: "20px" }}>
            No items yet — scan a receipt to add ingredients!
          </p>
        ) : (
          <div style={styles.list}>
            {filteredItems.map((item, i) => (
              <div key={i} style={styles.row}>
                <div style={styles.thumbnail}><ShoppingCart size={18} color="#fff" /></div>
                <div style={styles.info}>
                  <p style={styles.itemName}>{item.name}</p>
                  <p style={styles.quantity}>{item.quantity}</p>
                </div>
                <span
                  style={{
                    ...styles.statusTag,
                    backgroundColor: statusColors[item.status].bg,
                    color: statusColors[item.status].text,
                  }}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}

       <div style={styles.bottomNav}>
  <a href="/home" style={styles.navItem}><Home size={20} /><span>Home</span></a>
  <a href="/inventory" style={{ ...styles.navItem, color: "#a0592f" }}><ShoppingCart size={20} /><span>Inventory</span></a>
  <a href="/cogs-view" style={styles.navItem}><CookingPot size={20} /><span>Recipes</span></a>
  <a href="/orders" style={styles.navItem}><ClipboardList size={20} /><span>Orders</span></a>
  <a href="/profile" style={styles.navItem}><User size={20} /><span>Profile</span></a>
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
    padding: "20px 20px 100px",
    boxSizing: "border-box",
    position: "relative",
  },
  title: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: 800,
    color: "#2b1c12",
    marginBottom: "16px",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#e6bb8f",
    border: "1.5px solid #7a5030",
    borderRadius: "10px",
    padding: "10px 14px",
    marginBottom: "20px",
  },
  searchInput: {
    border: "none",
    background: "none",
    outline: "none",
    fontSize: "14px",
    color: "#5a3a1a",
    fontWeight: 600,
    flex: 1,
  },
  tabs: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
    paddingBottom: "8px",
    borderBottom: "1px solid #cba374",
  },
  tab: {
    fontSize: "13px",
    cursor: "pointer",
    paddingBottom: "4px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1.5px solid #b97a4a",
    borderRadius: "10px",
    padding: "10px",
  },
  thumbnail: {
    width: "36px",
    height: "36px",
    backgroundColor: "#d99a6c",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },
  info: { flex: 1 },
  itemName: {
    fontWeight: 700,
    fontSize: "13px",
    color: "#2b1c12",
    margin: 0,
  },
  quantity: {
    fontSize: "11px",
    color: "#6a4a2a",
    margin: 0,
  },
  statusTag: {
    fontSize: "11px",
    fontWeight: 700,
    padding: "6px 10px",
    borderRadius: "8px",
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