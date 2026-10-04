import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data";

export const alt = `${siteConfig.name}, ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Deterministic star positions so the image is identical on every build.
const stars = Array.from({ length: 90 }, (_, i) => ({
  x: (i * 97) % 1200,
  y: (i * 211) % 630,
  s: 1 + ((i * 7) % 3),
  o: 0.25 + ((i * 13) % 10) / 14,
}));

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#03040a",
          color: "#f5f3ff",
          fontFamily: "sans-serif",
        }}
      >
        {stars.map((st, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: st.x,
              top: st.y,
              width: st.s,
              height: st.s,
              borderRadius: 9999,
              background: "white",
              opacity: st.o,
            }}
          />
        ))}

        {/* Black hole: glow, disk, horizon */}
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 65,
            width: 500,
            height: 500,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(167,139,250,0.45) 0%, rgba(124,58,237,0.15) 40%, transparent 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 255,
            width: 580,
            height: 120,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, transparent 30%, rgba(255,245,230,0.95) 36%, rgba(251,146,60,0.9) 50%, rgba(139,92,246,0.6) 72%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 200,
            top: 225,
            width: 180,
            height: 180,
            borderRadius: 9999,
            background: "#000",
            boxShadow: "0 0 0 3px rgba(255,214,170,0.9), 0 0 40px 10px rgba(251,146,60,0.55)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", padding: "72px 72px", width: 720, height: "100%" }}>
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#8a88a3" }}>
            Kuwait · GMT+3
          </div>
          <div style={{ marginTop: 28, fontSize: 84, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
            {siteConfig.name}
          </div>
          <div style={{ marginTop: 22, fontSize: 38, color: "#fdba74" }}>{siteConfig.title}</div>
          <div style={{ marginTop: 34, fontSize: 26, lineHeight: 1.4, color: "#b4b2c8" }}>
            ERP & POS · WhatsApp platforms · Clinics · E-commerce · AI SaaS · 30+ apps in production
          </div>
          <div style={{ marginTop: "auto", fontSize: 24, color: "#a78bfa" }}>mustaqeembangi.vercel.app</div>
        </div>
      </div>
    ),
    size,
  );
}
