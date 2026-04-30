import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

export default function Dashboard() {
  const navigate = useNavigate();
  const { xp, level, addXP } = useUserStore();

  const nextLevelXP = (level + 1) * 100;
  const progress = Math.min((xp / nextLevelXP) * 100, 100);
  const scoreMapProgress = Math.min((xp / 750) * 100, 100);

  const navItems = [
    {
      label: "FinQuest",
      emoji: "📘",
      desc: "Learn & earn XP",
      path: "/finquest",
      accent: "var(--z-cyan)",
      accentBg: "rgba(0,212,255,0.08)",
      accentBorder: "rgba(0,212,255,0.2)",
    },
    {
      label: "FinCircle",
      emoji: "💬",
      desc: "Ask the community",
      path: "/fincircle",
      accent: "var(--z-purple)",
      accentBg: "rgba(124,92,252,0.08)",
      accentBorder: "rgba(124,92,252,0.2)",
    },
    {
      label: "Bubble",
      emoji: "🌐",
      desc: "Peer challenges",
      path: null,
      accent: "var(--z-green)",
      accentBg: "rgba(0,245,160,0.08)",
      accentBorder: "rgba(0,245,160,0.2)",
      soon: true,
    },
  ];

  return (
    <div
      className="noise-bg"
      style={{
        minHeight: "100vh",
        background: "var(--z-bg)",
        padding: "24px 20px",
        maxWidth: 480,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Background glow blobs */}
      <div style={{
        position: "fixed", top: -80, right: -80,
        width: 300, height: 300,
        background: "radial-gradient(circle, rgba(0,245,160,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: -60, left: -60,
        width: 250, height: 250,
        background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* HEADER */}
        <div className="animate-in" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <p style={{ color: "var(--z-muted)", fontSize: 12, fontFamily: "Syne, sans-serif", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
              WELCOME BACK
            </p>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 26, fontWeight: 800, color: "var(--z-text)" }}>
              Zolve <span className="gradient-text-green">Dashboard</span>
            </h1>
          </div>

          <div style={{
            background: "linear-gradient(135deg, rgba(0,245,160,0.12), rgba(0,212,255,0.12))",
            border: "1px solid rgba(0,245,160,0.25)",
            borderRadius: 12,
            padding: "8px 14px",
            textAlign: "center",
          }}>
            <p style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--z-green)", lineHeight: 1 }}>
              {level}
            </p>
            <p style={{ fontSize: 10, color: "var(--z-muted)", fontFamily: "Syne, sans-serif", letterSpacing: "0.08em", marginTop: 2 }}>
              LEVEL
            </p>
          </div>
        </div>

        {/* ZXP CARD */}
        <div
          className="z-card animate-in animate-in-delay-1"
          style={{ padding: "22px 24px", marginBottom: 16 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 11, color: "var(--z-muted)", fontFamily: "Syne, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                ZXP BALANCE
              </p>
              <p style={{ fontFamily: "Syne, sans-serif", fontSize: 36, fontWeight: 800, lineHeight: 1 }}>
                <span className="gradient-text-green">{xp}</span>
                <span style={{ fontSize: 14, color: "var(--z-muted)", fontWeight: 400, marginLeft: 6 }}>/ {nextLevelXP}</span>
              </p>
            </div>
            <div className="xp-badge">⚡ ZXP</div>
          </div>

          <div className="z-progress-track" style={{ height: 6, marginBottom: 10 }}>
            <div className="z-progress-fill" style={{ width: `${progress}%`, height: 6 }} />
          </div>

          <p style={{ fontSize: 12, color: "var(--z-muted)" }}>
            {nextLevelXP - xp} XP to Level {level + 1}
          </p>
        </div>

        {/* SCOREMAP CARD */}
        <div
          className="z-card animate-in animate-in-delay-2"
          style={{ padding: "22px 24px", marginBottom: 24 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 11, color: "var(--z-muted)", fontFamily: "Syne, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                SCOREMAP JOURNEY
              </p>
              <p style={{ fontFamily: "Syne, sans-serif", fontSize: 13, color: "var(--z-text)" }}>
                Credit score progress
              </p>
            </div>
            <div style={{
              background: "rgba(124,92,252,0.12)",
              border: "1px solid rgba(124,92,252,0.25)",
              borderRadius: 8,
              padding: "6px 10px",
              fontFamily: "Syne, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--z-purple)",
            }}>
              {Math.round((xp / 750) * 750 * 0.8 + 300)}
            </div>
          </div>

          {/* Score track */}
          <div style={{ position: "relative" }}>
            <div className="z-progress-track" style={{ height: 8 }}>
              <div
                style={{
                  width: `${scoreMapProgress}%`,
                  height: 8,
                  background: "linear-gradient(90deg, var(--z-purple), var(--z-cyan))",
                  borderRadius: 100,
                  transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            {["300", "580", "650", "720", "750+"].map((label) => (
              <span key={label} style={{ fontSize: 10, color: "var(--z-muted)", fontFamily: "Syne, sans-serif" }}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* NAV GRID */}
        <p
          className="animate-in animate-in-delay-3"
          style={{ fontSize: 11, color: "var(--z-muted)", fontFamily: "Syne, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}
        >
          MODULES
        </p>

        <div
          className="animate-in animate-in-delay-3"
          style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => item.path && navigate(item.path)}
              style={{
                background: item.accentBg,
                border: `1px solid ${item.accentBorder}`,
                borderRadius: 14,
                padding: "16px 20px",
                cursor: item.path ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                gap: 14,
                transition: "transform 0.15s, border-color 0.2s",
                textAlign: "left",
                width: "100%",
              }}
              onMouseEnter={(e) => { if (item.path) e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <span style={{ fontSize: 24 }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: "var(--z-text)", marginBottom: 2 }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 12, color: "var(--z-muted)" }}>{item.desc}</p>
              </div>
              {item.soon ? (
                <span style={{
                  fontSize: 10,
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  color: item.accent,
                  background: `${item.accentBg}`,
                  border: `1px solid ${item.accentBorder}`,
                  borderRadius: 100,
                  padding: "3px 8px",
                  letterSpacing: "0.06em",
                }}>
                  SOON
                </span>
              ) : (
                <span style={{ color: "var(--z-muted)", fontSize: 18 }}>→</span>
              )}
            </button>
          ))}
        </div>

        {/* EARN XP BUTTON */}
        <button
          className="z-btn-primary animate-in animate-in-delay-4"
          style={{ width: "100%", padding: "14px", fontSize: 15, borderRadius: 14 }}
          onClick={() => addXP(50)}
        >
          ⚡ Earn 50 ZXP
        </button>

      </div>
    </div>
  );
}
