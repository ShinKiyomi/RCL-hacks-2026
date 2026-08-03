"use client";

import { useState, useEffect } from "react";
import { Home, ShoppingCart, CookingPot, ClipboardList, User, Plus } from "lucide-react";

interface Order {
  customer: string;
  item: string;
  quantity: number;
  price: number;
  status: "Pending" | "Confirmed" | "Completed";
  pickupTime: string;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  Pending: { bg: "#e8a087", text: "#5a2010" },
  Confirmed: { bg: "#9fc3e0", text: "#0f2c40" },
  Completed: { bg: "#a8c99a", text: "#1c2b12" },
};

export default function OrdersPage() {
  const [filter, setFilter] = useState<"All" | "Pending" | "Confirmed" | "Completed">("All");
  const [orders, setOrders] = useState<Order[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [customer, setCustomer] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [status, setStatus] = useState<Order["status"]>("Pending");

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  const addOrder = () => {
    if (!customer || !item) return;
    const newOrder: Order = {
      customer,
      item,
      quantity: parseInt(quantity) || 1,
      price: parseFloat(price) || 0,
      status,
      pickupTime: pickupTime || "TBD",
    };
    const updated = [...orders, newOrder];
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    setCustomer("");
    setItem("");
    setQuantity("1");
    setPrice("");
    setPickupTime("");
    setStatus("Pending");
    setShowForm(false);
  };

  const filteredOrders = orders.filter(
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

        <button style={styles.addBtn} onClick={() => setShowForm(!showForm)}>
          <Plus size={16} style={{ marginRight: "6px" }} />
          {showForm ? "Cancel" : "Add New Order"}
        </button>

        {showForm && (
          <div style={styles.form}>
            <input style={styles.input} placeholder="Customer Name" value={customer} onChange={(e) => setCustomer(e.target.value)} />
            <input style={styles.input} placeholder="Item" value={item} onChange={(e) => setItem(e.target.value)} />
            <input style={styles.input} placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <input style={styles.input} placeholder="Price per item ($)" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input style={styles.input} placeholder="Pickup Time (e.g. Fri, 5 PM)" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
            <select style={styles.input} value={status} onChange={(e) => setStatus(e.target.value as Order["status"])}>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
            </select>
            <button style={styles.saveBtn} onClick={addOrder}>Save Order</button>
          </div>
        )}

        {filteredOrders.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6a4a2a", fontSize: "13px", marginTop: "20px" }}>
            No orders yet — add your first one above!
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
                <p style={styles.itemLine}>${(order.price * order.quantity).toFixed(2)}</p>
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
  addBtn: { width: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#5a3a1a", border: "none", borderRadius: "10px", padding: "12px", fontWeight: 700, color: "#fff", fontSize: "13px", cursor: "pointer", marginBottom: "16px" },
  form: { border: "1.5px solid #b97a4a", borderRadius: "10px", padding: "14px", marginBottom: "16px", display: "flex", flexDirection: "column", gap: "8px" },
  input: { border: "1px solid #b97a4a", borderRadius: "8px", padding: "10px", fontSize: "13px", color: "#2b1c12" },
  saveBtn: { backgroundColor: "#8a5a2f", border: "none", borderRadius: "8px", padding: "10px", fontWeight: 700, color: "#fff", cursor: "pointer" },
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
