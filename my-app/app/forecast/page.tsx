"use client";
import { Home, ShoppingCart, CookingPot, ClipboardList, User, Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";

const forecastData = [
  { day: "Day 1", value: 8 },
  { day: "Day 2", value: 18 },
  { day: "Day 3", value: 24 },
  { day: "Day 4", value: 20 },
  { day: "Day 5", value: 28 },
  { day: "Day 6", value: 22 },
  { day: "Day 7", value: 33 },
];

export default function ForecastPage() {
  const router = useRouter();
  const maxVal = 40;
  const chartWidth = 320;
  const chartHeight = 160;
  const stepX = chartWidth / (forecastData.length - 1);

  const points = forecastData.map((d, i) => {
    const x = i * stepX;
    const y = chartHeight - (d.value / maxVal) * chartHeight;
    return { x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => router.push("/home")} style={styles.backBtn}>←</button>
          <h1 style={styles.title}>Forecast & Insights (Predictive Pre-order)</h1>
        </div>

        <div style={styles.chartCard}>
          <p style={styles.chartTitle}>Demand Forecast (Next 7 Days)</p>
          <div style={styles.chartBox}>
            <svg width="100%" viewBox={`-10 -10 ${chartWidth + 20} ${chartHeight + 40}`}>
              <defs>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a3a8e0" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#a3a8e0" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 8, 16, 24, 32, 40].map((v) => (
                <text key={v} x={-8} y={chartHeight - (v / maxVal) * chartHeight + 4} fontSize="9" fill="#888" textAnchor="end">
                  {v}
                </text>
              ))}
              <path d={areaPath} fill="url(#areaFill)" />
              <path d={linePath} fill="none" stroke="#6c72c9" strokeWidth="2" />
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="4" fill="#fff" stroke="#6c72c9" strokeWidth="2" />
              ))}
              {forecastData.map((d, i) => (
                <text key={d.day} x={points[i].x} y={chartHeight + 20} fontSize="9" fill="#888" textAnchor="middle">
                  {d.day.toUpperCase()}
                </text>
              ))}
            </svg>
          </div>
          <p style={styles.legend}>○— FORECAST</p>
        </div>

        <div style={styles.aiCard}>
          <div>
            <h3 style={styles.aiTitle}>AI Recommendation</h3>
            <p style={styles.aiText}>Based on the forecast, you may need to adjust your production</p>
          </div>
         <div style={styles.aiIcon}><Lightbulb size={26} color="#2b1c12" /></div>
        </div>

        <div style={styles.wasteCard}>
          <h3 style={styles.wasteTitle}>Waste Risk</h3>
          <p style={styles.riskLevel}>Risk Level ______</p>
          <p style={styles.wasteText}>Keep tracking to reduce waste</p>
        </div>

        <div style={styles.bottomNav}>
  <a href="/home" style={styles.navItem}><Home size={20} /><span>Home</span></a>
  <a href="/inventory" style={styles.navItem}><ShoppingCart size={20} /><span>Inventory</span></a>
  <a href="/cogs-view" style={{ ...styles.navItem, color: "#a0592f" }}><CookingPot size={20} /><span>Recipes</span></a>
  <a href="/orders" style={styles.navItem}><ClipboardList size={20} /><span>Orders</span></a>
  <a href="/profile" style={styles.navItem}><User size={20} /><span>Profile</span></a>
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
  title: { fontSize: "17px", fontWeight: 800, color: "#2b1c12", margin: 0, lineHeight: 1.3 },
  chartCard: { backgroundColor: "#fff", border: "1.5px solid #7a5030", borderRadius: "10px", padding: "14px", marginBottom: "16px" },
  chartTitle: { fontWeight: 800, fontSize: "13px", color: "#2b1c12", margin: "0 0 10px 0" },
  chartBox: { width: "100%" },
  legend: { fontSize: "10px", color: "#6c72c9", textAlign: "center", marginTop: "6px", fontWeight: 700 },
  aiCard: { backgroundColor: "#c58a5a", borderRadius: "10px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  aiTitle: { fontSize: "14px", fontWeight: 800, color: "#2b1c12", margin: "0 0 6px 0" },
  aiText: { fontSize: "11px", color: "#3d2a1a", margin: 0, maxWidth: "230px" },
  aiIcon: { fontSize: "28px" },
  wasteCard: { backgroundColor: "#a8c99a", borderRadius: "10px", padding: "16px" },
  wasteTitle: { fontSize: "14px", fontWeight: 800, color: "#1c2b12", margin: "0 0 8px 0" },
  riskLevel: { fontSize: "12px", fontWeight: 700, color: "#1c2b12", margin: "0 0 4px 0" },
  wasteText: { fontSize: "11px", color: "#2b3d1a", margin: 0 },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#2b1c12", display: "flex", justifyContent: "space-around", padding: "12px 0" },
  navItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#e6bb8f", fontSize: "10px" },
};