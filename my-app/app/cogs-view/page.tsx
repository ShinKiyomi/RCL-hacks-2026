"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Ingredient {
  name: string;
  price: number;
}

export default function CogsViewPage() {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [batchSize, setBatchSize] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", price: 0 }]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const useCupcakeTemplate = () => {
    const stored = localStorage.getItem("inventoryItems");
    if (stored) {
      const parsed = JSON.parse(stored);
      setIngredients(parsed.map((i: any) => ({ name: i.name, price: i.price })));
      setProductName("Cupcake Batch");
    } else {
      alert("No inventory items found yet — scan a receipt first!");
    }
  };

  const calculate = async () => {
    setLoading(true);
    const res = await fetch("/api/cogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: ingredients.filter((i) => i.name),
        batchYield: parseFloat(batchSize) || 1,
      }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => router.push("/home")} style={styles.backBtn}>←</button>
          <h1 style={styles.title}>Automated Batch Cost And Price Calculation</h1>
        </div>

        <div style={styles.card}>
          <div style={styles.topRow}>
            <div style={styles.thumbnail}>🖼️</div>
            <div style={{ flex: 1 }}>
              <input
                style={styles.nameInput}
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <input
                style={styles.batchInput}
                placeholder="e.g. Number of units"
                value={batchSize}
                onChange={(e) => setBatchSize(e.target.value)}
              />
            </div>
          </div>

          <div style={styles.templateBtn} onClick={useCupcakeTemplate}>
            🧁 Use Cupcake Template (from Inventory)
          </div>

          <h3 style={styles.sectionLabel}>Ingredient Cost Breakdown</h3>
          {ingredients.map((ing, i) => (
            <div key={i} style={styles.ingredientRow}>
              <input
                style={styles.ingInput}
                placeholder="Ingredient"
                value={ing.name}
                onChange={(e) => {
                  const updated = [...ingredients];
                  updated[i].name = e.target.value;
                  setIngredients(updated);
                }}
              />
              <input
                style={{ ...styles.ingInput, width: "70px" }}
                type="number"
                placeholder="$"
                value={ing.price || ""}
                onChange={(e) => {
                  const updated = [...ingredients];
                  updated[i].price = parseFloat(e.target.value) || 0;
                  setIngredients(updated);
                }}
              />
            </div>
          ))}
          <span
            style={styles.addIngredient}
            onClick={() => setIngredients([...ingredients, { name: "", price: 0 }])}
          >
            + Add ingredient
          </span>

          <div style={styles.totalsRow}>
            <span>Total Batch Cost</span>
            <span>{result ? `$${result.totalBatchCost}` : "____"}</span>
          </div>
          <div style={styles.totalsRow}>
            <span>Cost per unit</span>
            <span>{result ? `$${result.costPerUnit}` : "____"}</span>
          </div>
        </div>

        <h3 style={styles.suggestedTitle}>Suggested Selling Price</h3>
        <div style={styles.priceRow}>
          <div style={styles.priceCard}>
            <p style={styles.priceLabel}>Minimum</p>
            <p style={styles.priceValue}>{result ? `$${result.suggestedPriceRange.min}` : "___"}</p>
            <p style={styles.priceNote}>(2x Cost)</p>
          </div>
          <div style={{ ...styles.priceCard, backgroundColor: "#e0824f" }}>
            <p style={styles.priceLabel}>Recommended</p>
            <p style={styles.priceValue}>
              {result ? `$${((result.suggestedPriceRange.min + result.suggestedPriceRange.max) / 2).toFixed(2)}` : "___"}
            </p>
            <p style={styles.priceNote}>(2.5x Cost)</p>
          </div>
          <div style={styles.priceCard}>
            <p style={styles.priceLabel}>Premium</p>
            <p style={styles.priceValue}>{result ? `$${result.suggestedPriceRange.max}` : "___"}</p>
            <p style={styles.priceNote}>(3x Cost)</p>
          </div>
        </div>

        <button style={styles.saveBtn} onClick={calculate}>
          {loading ? "Calculating..." : "Save Batch"}
        </button>

        <div style={styles.bottomNav}>
          <a href="/home" style={styles.navItem}>🏠<span>Home</span></a>
          <a href="/inventory" style={styles.navItem}>🛒<span>Inventory</span></a>
          <a href="/cogs-view" style={{ ...styles.navItem, color: "#a0592f" }}>🍳<span>Recipes</span></a>
          <a href="/orders" style={styles.navItem}>📋<span>Orders</span></a>
          <a href="/profile" style={styles.navItem}>👤<span>Profile</span></a>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  outerWrapper: { minHeight: "100vh", width: "100%", backgroundColor: "#1a1a1a", display: "flex", justifyContent: "center" },
  container: { width: "100%", maxWidth: "393px", backgroundColor: "#f3d9bd", minHeight: "100vh", padding: "20px 20px 100px", boxSizing: "border-box", position: "relative" },
  header: { display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "16px" },
  backBtn: { background: "none", border: "none", fontSize: "20px", cursor: "pointer", marginTop: "4px" },
  title: { fontSize: "18px", fontWeight: 800, color: "#2b1c12", margin: 0, lineHeight: 1.3 },
  card: { border: "1.5px solid #7a5030", borderRadius: "10px", padding: "14px", marginBottom: "20px" },
  topRow: { display: "flex", gap: "10px", marginBottom: "16px" },
  thumbnail: { width: "60px", height: "60px", backgroundColor: "#e6bb8f", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" },
  nameInput: { width: "100%", border: "1px solid #b97a4a", borderRadius: "6px", padding: "6px 8px", marginBottom: "6px", fontSize: "13px", boxSizing: "border-box", color: "#2b1c12" },
  batchInput: { width: "100%", border: "1px solid #b97a4a", borderRadius: "6px", padding: "6px 8px", fontSize: "12px", boxSizing: "border-box", color: "#2b1c12" },
  templateBtn: {
    backgroundColor: "#d99a6c",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "12px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "13px",
    color: "#2b1c12",
    textAlign: "center",
  },
  sectionLabel: { fontSize: "13px", fontWeight: 800, color: "#2b1c12", margin: "0 0 8px 0" },
  ingredientRow: { display: "flex", gap: "6px", marginBottom: "6px" },
  ingInput: { flex: 1, border: "1px solid #cba374", borderRadius: "6px", padding: "6px 8px", fontSize: "12px", color: "#2b1c12" },
  addIngredient: { fontSize: "12px", color: "#a0592f", fontWeight: 700, cursor: "pointer", display: "inline-block", marginBottom: "16px" },
  totalsRow: { display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 700, color: "#2b1c12", padding: "6px 0", borderTop: "1px solid #cba374" },
  suggestedTitle: { fontSize: "16px", fontWeight: 800, color: "#2b1c12", margin: "0 0 12px 0" },
  priceRow: { display: "flex", gap: "8px", marginBottom: "20px" },
  priceCard: { flex: 1, backgroundColor: "#d99a6c", borderRadius: "8px", padding: "10px", textAlign: "center" },
  priceLabel: { fontSize: "11px", fontWeight: 700, color: "#2b1c12", margin: "0 0 8px 0" },
  priceValue: { fontSize: "14px", fontWeight: 800, color: "#2b1c12", margin: "0 0 4px 0" },
  priceNote: { fontSize: "10px", color: "#3d2a1a", margin: 0 },
  saveBtn: { width: "100%", backgroundColor: "#5a3a1a", border: "none", borderRadius: "10px", padding: "16px", fontWeight: 700, color: "#fff", fontSize: "15px", cursor: "pointer" },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#2b1c12", display: "flex", justifyContent: "space-around", padding: "12px 0" },
  navItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#e6bb8f", fontSize: "10px", textDecoration: "none" },
};