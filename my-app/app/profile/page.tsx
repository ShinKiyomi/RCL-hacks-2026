"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Mail, Phone, MapPin, Calendar, LogOut, Home, ShoppingCart, CookingPot, ClipboardList, User } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => router.push("/home")} style={styles.backBtn}>
            <ArrowLeft size={22} color="#1f140c" />
          </button>
          <div>
            <h1 style={styles.title}>Profile</h1>
            <p style={styles.subtitle}>Let's get started with your details</p>
          </div>
        </div>

        <div style={styles.avatarWrapper}>
          <div style={styles.avatarCircle}>
            <User size={54} color="#6b6b6b" />
          </div>
          <div style={styles.editBadge}>
            <Pencil size={14} color="#2b1c12" />
          </div>
        </div>

        <p style={styles.nameText}>Your Name</p>

        <div style={styles.inputWrapper}>
          <Mail size={18} color="#a0592f" />
          <input style={styles.input} placeholder="Email Address" />
        </div>
        <div style={styles.inputWrapper}>
          <Phone size={18} color="#a0592f" />
          <input style={styles.input} placeholder="Phone Number" />
        </div>
        <div style={styles.inputWrapper}>
          <MapPin size={18} color="#a0592f" />
          <input style={styles.input} placeholder="Location (City/Address)" />
        </div>
        <div style={styles.inputWrapper}>
          <Calendar size={18} color="#a0592f" />
          <input style={styles.input} placeholder="Member Since" disabled />
        </div>

        <button style={styles.logoutBtn} onClick={() => router.push("/login")}>
          <LogOut size={18} color="#c0392b" style={{ marginRight: "8px" }} />
          Log Out
        </button>

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
  header: { display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "24px" },
  backBtn: { background: "none", border: "none", cursor: "pointer", marginTop: "2px" },
  title: { fontSize: "20px", fontWeight: 800, color: "#1f140c", margin: "0 0 4px 0" },
  subtitle: { fontSize: "12px", color: "#6a4a2a", margin: 0 },
  avatarWrapper: { position: "relative", width: "110px", height: "110px", margin: "0 auto 12px auto" },
  avatarCircle: { width: "110px", height: "110px", borderRadius: "50%", backgroundColor: "#c9c9c9", display: "flex", alignItems: "center", justifyContent: "center" },
  editBadge: { position: "absolute", bottom: "4px", right: "4px", width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" },
  nameText: { textAlign: "center", fontSize: "20px", fontWeight: 800, color: "#1f140c", marginBottom: "20px" },
  inputWrapper: { display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#fdf1e3", border: "1.5px solid #b97a4a", borderRadius: "10px", padding: "12px 14px", marginBottom: "12px" },
  input: { flex: 1, border: "none", outline: "none", background: "none", fontSize: "14px", color: "#a0592f", fontWeight: 600 },
  logoutBtn: { width: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "transparent", border: "1.5px solid #c0392b", borderRadius: "10px", padding: "16px", fontWeight: 800, color: "#c0392b", fontSize: "15px", cursor: "pointer", marginTop: "20px" },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#2b1c12", display: "flex", justifyContent: "space-around", padding: "14px 0" },
  navItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#a88a68", fontSize: "10px", textDecoration: "none", fontWeight: 600 },
};