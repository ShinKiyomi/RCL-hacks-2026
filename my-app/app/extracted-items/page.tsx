"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Item {
  name: string;
  quantity: number;
  price: number;
}

export default function ExtractedItemsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [editingAll, setEditingAll] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("scanResult");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.items) {
        setItems(parsed.items);
      }
    }
  }, []);

  const updateItem = (index: number, field: keyof Item, value: string) => {
    const updated = [...items];
    if (field === "name") {
      updated[index].name = value;
    } else {
      updated[index][field] = parseFloat(value) || 0;
    }
    setItems(updated);
  };

  const addMissingItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
    setEditingAll(true);
  };

  const saveToInventory = () => {
    sessionStorage.setItem("inventory", JSON.stringify(items));
    router.push("/home");
  };

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <button onClick={() => router.push("/upload")} style={styles.backBtn}>←</button>
          <h1 style={styles.title}>Extracted Items</h1>
          <button style={styles.editAll} onClick={() => setEditingAll(!editingAll)}>
            Edit All
          </button>
        </div>

        {/* Banner */}
        <div style={styles.banner}>
          <p style={styles.bannerTitle}>We have found {items.length} items</p>
          <p style={styles.bannerSubtitle}>Please review and confirm</p>
        </div>

        {/* Table */}
        <div style={styles.table}>
          <div style={styles.tableHeaderRow}>
            <span style={{ ...styles.th, flex: 0.6 }}>Sr. No.</span>
            <span style={{ ...styles.th, flex: 1.4 }}>Items</span>
            <span style={{ ...styles.th, flex: 1 }}>Quantity</span>
            <span style={{ ...styles.th, flex: 1 }}>Price</span>
          </div>

          {items.map((item, i) => (
            <div key={i} style={styles.tableRow}>
              <span style={{ ...styles.td, flex: 0.6 }}>{i + 1}</span>
              {editingAll ? (
                <>
                  <input
                    style={{ ...styles.input, flex: 1.4 }}
                    value={item.name}
                    onChange={(e) => updateItem(i, "name", e.target.value)}
                  />
                  <input
                    style={{ ...styles.input, flex: 1 }}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(i, "quantity", e.target.value)}
                  />
                  <input
                    style={{ ...styles.input, flex: 1 }}
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(i, "price", e.target.value)}
                  />
                </>
              ) : (
                <>
                  <span style={{ ...styles.td, flex: 1.4 }}>{item.name}</span>
                  <span style={{ ...styles.td, flex: 1 }}>{item.quantity}</span>
                  <span style={{ ...styles.td, flex: 1 }}>${item.price}</span>
                </>
              )}
            </div>
          ))}
        </div>

        <button style={styles.editBtn} onClick={() => setEditingAll(!editingAll)}>
          {editingAll ? "Done" : "Edit"}
        </button>

        <button style={styles.addMissingBtn} onClick={addMissingItem}>
          + Add Missing Item
        </button>

        <button style={styles.saveBtn} onClick={saveToInventory}>
          Save to inventory
        </button>

        {/* Bottom nav */}
        <div style={styles.bottomNav}>
          <div style={styles.navItem}>🏠<span>Home</span></div>
          <div style={{ ...styles.navItem, color: "#a0592f" }}>🛒<span>Inventory</span></div>
          <div style={styles.navItem}>🍳<span>Recipes</span></div>
          <div style={styles.navItem}>📋<span>Orders</span></div>
          <div style={styles.navItem}>👤<span>Profile</span></div>
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
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  backBtn: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  title: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#2b1c12",
    margin: 0,
  },
  editAll: {
    background: "none",
    border: "none",
    color: "#a0592f",
    fontWeight: 700,
    fontSize: "13px",
    cursor: "pointer",
  },
  banner: {
    backgroundColor: "#a8c99a",
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center",
    marginBottom: "20px",
  },
  bannerTitle: {
    fontWeight: 700,
    color: "#1c2b12",
    margin: "0 0 4px 0",
    fontSize: "15px",
  },
  bannerSubtitle: {
    fontSize: "12px",
    color: "#2b3d1a",
    margin: 0,
  },
  table: {
    border: "1.5px solid #7a5030",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "16px",
  },
  tableHeaderRow: {
    display: "flex",
    backgroundColor: "#e6bb8f",
    padding: "10px 8px",
    borderBottom: "1.5px solid #7a5030",
  },
  th: {
    fontWeight: 700,
    fontSize: "12px",
    color: "#2b1c12",
  },
  tableRow: {
    display: "flex",
    padding: "10px 8px",
    borderBottom: "1px solid #cba374",
    alignItems: "center",
  },
  td: {
    fontSize: "12px",
    color: "#2b1c12",
  },
  input: {
    fontSize: "12px",
    padding: "4px",
    border: "1px solid #a0592f",
    borderRadius: "4px",
    width: "90%",
  },
  editBtn: {
    backgroundColor: "#d99a6c",
    border: "none",
    borderRadius: "8px",
    padding: "10px 24px",
    fontWeight: 700,
    color: "#2b1c12",
    float: "right",
    marginBottom: "20px",
    cursor: "pointer",
  },
  addMissingBtn: {
    width: "100%",
    backgroundColor: "transparent",
    border: "1.5px solid #2b1c12",
    borderRadius: "10px",
    padding: "14px",
    fontWeight: 700,
    color: "#a0592f",
    marginTop: "50px",
    marginBottom: "16px",
    cursor: "pointer",
  },
  saveBtn: {
    width: "100%",
    backgroundColor: "#5a3a1a",
    border: "none",
    borderRadius: "10px",
    padding: "16px",
    fontWeight: 700,
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
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
  },
};