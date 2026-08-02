"use client";

import { useState } from "react";
import { Home, ShoppingCart, CookingPot, ClipboardList, User } from "lucide-react";

interface Order {
  customer: string;
  item: string;
  quantity: number;
  status: "Pending" | "Confirmed" | "Completed";
  pickupTime: string;
}

const sampleOrders: Order[] = [
  { customer: "Sarah M.", item: "Chocolate Cupcake 6-pack", quantity: 1, status: "Pending", pickupTime: "Fri, 5 PM" },
  { customer: "James K.", item: "Vanilla Cupcake 12-pack", quantity: 1, status: "Confirmed", pickupTime: "Sat, 11 AM" },
  { customer: "Aisha R.", item: "Red Velvet Cupcake 6-pack", quantity: 2, status: "Completed", pickupTime: "Thu, 3 PM" },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  Pending: { bg: "#e8a087", text: "#5a2010" },
  Confirmed: { bg: "#9fc3e0", text: "#0f2c40" },
  Completed: { bg: "#a8c99a", text: "#1c2b12" },
};

export default function OrdersPage() {
  const [filter, setFilter] = useState<"All" | "Pending" | "Confirmed" | "Completed">("All");

  const filteredOrders = sampleOrders.filter(
    (o) => filter === "All" || o.status === filter
  );

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>Orders</h1>

        <div style={styles.tabs}>
          {(["All", "Pending", "Confirmed", "Completed"] as const).map((tab) => (
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

        {filteredOrders.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6a4a2a", fontSize: "13px", marginTop: "20px" }}>
            No orders in this category yet.
          </p>
        ) : (
          <div style={styles.list}>
            {filteredOrders.map((order, i) => (
              <div key={i} style={styles.card}>
                <div style={styles.cardTop}>
                  <span style={styles.customerName}>{order.customer}</span>
                  <span
                    style={{
                      ...styles.statusTag,
                      backgroundColor: statusColors[order.status].bg,
                      color: statusColors[order.status].text,
                    }}
                  >
                    {order.status}
                  </span>
                </div>
                <p style={styles.itemLine}>{order.quantity}x {order.item}</p>
                <p style={styles.pickupLine}>📅 Pickup: {order.pickupTime}</p>
              </div>
            ))}
          </div>
        )}

        <div style={styles.bottomNav}>
          <a href="/home" style={styles.navItem}><Home size={22} /><span>Home</span></a>
          <a href="/inventory" style={styles.navItem}><ShoppingCart size={22} /><span>Inventory</span></a>
          <a href="/cogs-view" style={styles.navItem}><CookingPot size={22} /><span>Recipes</span></a>
          <a href="/orders" style={{ ...styles.navItem, color: "#e6bb8f" }}><ClipboardList size={22} /><span>Orders</span></a>
          <a href="/profile" style={styles.navItem}><User size={22} /><span>Profile</span></a>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  outerWrapper: { minHeight: "100vh", width: "100%", backgroundColor: "#1a1a1a", display: "flex", justifyContent: "center" },
  container: { width: "100%", maxWidth: "393px", backgroundColor: "#f3d9bd", minHeight: "100vh", padding: "20px 20px 100px", boxSizing: "border-box", position: "relative" },
  title: { textAlign: "center", fontSize: "20px", fontWeight: 800, color: "#1f140c", marginBottom: "16px" },
  tabs: { display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px solid #cba374" },
  tab: { fontSize: "12px", cursor: "pointer", paddingBottom: "4px" },
  list: { display: "flex", flexDirection: "column", gap: "10px" },
  card: { border: "1.5px solid #b97a4a", borderRadius: "10px", padding: "12px" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" },
  customerName: { fontWeight: 800, fontSize: "14px", color: "#1f140c" },
  statusTag: { fontSize: "10px", fontWeight: 700, padding: "5px 10px", borderRadius: "8px" },
  itemLine: { fontSize: "12px", color: "#3d2a1a", margin: "0 0 4px 0", fontWeight: 600 },
  pickupLine: { fontSize: "11px", color: "#6a4a2a", margin: 0 },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#2b1c12", display: "flex", justifyContent: "space-around", padding: "14px 0" },
  navItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#a88a68", fontSize: "10px", textDecoration: "none", fontWeight: 600 },
};