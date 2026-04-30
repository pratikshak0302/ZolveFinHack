import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

export default function Dashboard() {
  const navigate = useNavigate();
  const { xp, level } = useUserStore();

  const [showReferral, setShowReferral] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scoreboardTab, setScoreboardTab] = useState("weekly");

  const weeklyData = [
    { day: "Mon", xp: 40, modules: 1 },
    { day: "Tue", xp: 70, modules: 2 },
    { day: "Wed", xp: 20, modules: 0 },
    { day: "Thu", xp: 90, modules: 3 },
    { day: "Fri", xp: 50, modules: 1 },
    { day: "Sat", xp: 30, modules: 1 },
    { day: "Sun", xp: 60, modules: 2 },
  ];

  const monthlyData = [
    { label: "Week 1", xp: 180, modules: 5 },
    { label: "Week 2", xp: 310, modules: 8 },
    { label: "Week 3", xp: 240, modules: 6 },
    { label: "Week 4", xp: 360, modules: 10 },
  ];

  const activeData = scoreboardTab === "weekly" ? weeklyData : monthlyData;
  const maxXP = Math.max(...activeData.map((d) => d.xp));
  const totalXP = activeData.reduce((acc, d) => acc + d.xp, 0);
  const totalModules = activeData.reduce((acc, d) => acc + d.modules, 0);

  const REFERRAL_CODE = "ZOLVE-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  const REFERRAL_LINK = `https://zolve.com/signup?ref=${REFERRAL_CODE}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(REFERRAL_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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

        {/* SCOREBOARD CARD */}
        <div className="z-card animate-in animate-in-delay-3" style={{ padding: "22px 24px", marginBottom: 24 }}>

          {/* Header + Tab Toggle */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 11, color: "var(--z-muted)", fontFamily: "Syne, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                LEARNING PROGRESS
              </p>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 800, color: "var(--z-text)" }}>
                Scoreboard
              </h2>
            </div>

            {/* Toggle */}
            <div style={{
              display: "flex",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--z-border)",
              borderRadius: 8, padding: 3, gap: 3,
            }}>
              {["weekly", "monthly"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setScoreboardTab(tab)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    transition: "all 0.2s",
                    background: scoreboardTab === tab
                      ? "linear-gradient(135deg, var(--z-green), var(--z-cyan))"
                      : "transparent",
                    color: scoreboardTab === tab ? "#080b12" : "var(--z-muted)",
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {[
              { label: "Total ZXP", value: totalXP, color: "var(--z-green)", bg: "rgba(0,245,160,0.08)", border: "rgba(0,245,160,0.2)" },
              { label: "Modules", value: totalModules, color: "var(--z-cyan)", bg: "rgba(0,212,255,0.08)", border: "rgba(0,212,255,0.2)" },
              { label: "Streak 🔥", value: "5d", color: "var(--z-purple)", bg: "rgba(124,92,252,0.08)", border: "rgba(124,92,252,0.2)" },
            ].map((stat) => (
              <div key={stat.label} style={{
                flex: 1,
                background: stat.bg,
                border: `1px solid ${stat.border}`,
                borderRadius: 10, padding: "10px 8px",
                textAlign: "center",
              }}>
                <p style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 800, color: stat.color, lineHeight: 1, marginBottom: 4 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 10, color: "var(--z-muted)", fontFamily: "Syne, sans-serif" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bar Chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80, marginBottom: 10 }}>
            {activeData.map((d, i) => {
              const barHeight = Math.max((d.xp / maxXP) * 80, 6);
              const isToday = scoreboardTab === "weekly" && i === new Date().getDay() - 1;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
                    {/* XP tooltip on hover */}
                    <div
                      title={`${d.xp} ZXP`}
                      style={{
                        width: "100%",
                        height: barHeight,
                        background: isToday
                          ? "linear-gradient(180deg, var(--z-green), var(--z-cyan))"
                          : d.xp === maxXP
                          ? "linear-gradient(180deg, var(--z-cyan), var(--z-purple))"
                          : "rgba(255,255,255,0.1)",
                        borderRadius: "4px 4px 2px 2px",
                        transition: "height 0.5s cubic-bezier(0.4,0,0.2,1)",
                        cursor: "default",
                        border: isToday ? "1px solid rgba(0,245,160,0.4)" : "1px solid transparent",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* X-axis labels */}
          <div style={{ display: "flex", gap: 6 }}>
            {activeData.map((d, i) => {
              const isToday = scoreboardTab === "weekly" && i === new Date().getDay() - 1;
              return (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <p style={{
                    fontSize: 9,
                    fontFamily: "Syne, sans-serif",
                    fontWeight: isToday ? 800 : 400,
                    color: isToday ? "var(--z-green)" : "var(--z-muted)",
                  }}>
                    {"day" in d ? d.day : d.label.replace("Week ", "W")}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Best day callout */}
          <div style={{
            marginTop: 16,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--z-border)",
            borderRadius: 10, padding: "10px 14px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <p style={{ fontSize: 12, color: "var(--z-muted)" }}>
              🏆 Best {scoreboardTab === "weekly" ? "day" : "week"}
            </p>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "var(--z-green)" }}>
              {activeData.reduce((best, d) => d.xp > best.xp ? d : best, activeData[0])["day" in activeData[0] ? "day" : "label"]} · {maxXP} ZXP
            </p>
          </div>
        </div>

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

        {/* REFERRAL BUTTON */}
        <button
          className="z-btn-primary animate-in animate-in-delay-4"
          style={{ width: "100%", padding: "14px", fontSize: 15, borderRadius: 14 }}
          onClick={() => setShowReferral(true)}
        >
          🎁 Refer a Friend · Earn Rewards
        </button>

        {/* REFERRAL MODAL */}
        {showReferral && (
          <div
            onClick={() => setShowReferral(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(6px)",
              zIndex: 100,
              display: "flex", alignItems: "flex-end", justifyContent: "center",
              padding: "0 16px 32px",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="z-card"
              style={{
                width: "100%", maxWidth: 440,
                padding: "28px 24px",
                borderRadius: 20,
                background: "var(--z-card)",
              }}
            >
              {/* Modal Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: 11, color: "var(--z-muted)", fontFamily: "Syne, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                    REFERRAL PROGRAM
                  </p>
                  <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800 }}>
                    Share & <span className="gradient-text-green">Earn</span>
                  </h2>
                </div>
                <button
                  onClick={() => setShowReferral(false)}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid var(--z-border)",
                    borderRadius: 8, width: 32, height: 32,
                    color: "var(--z-muted)", cursor: "pointer", fontSize: 16,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Reward cards */}
              <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
                {[
                  { label: "You get", value: "$25", desc: "for each referral", color: "var(--z-green)", bg: "rgba(0,245,160,0.08)", border: "rgba(0,245,160,0.2)" },
                  { label: "Friend gets", value: "$10", desc: "welcome bonus", color: "var(--z-cyan)", bg: "rgba(0,212,255,0.08)", border: "rgba(0,212,255,0.2)" },
                ].map((r) => (
                  <div key={r.label} style={{
                    flex: 1,
                    background: r.bg,
                    border: `1px solid ${r.border}`,
                    borderRadius: 12, padding: "14px",
                    textAlign: "center",
                  }}>
                    <p style={{ fontSize: 10, color: "var(--z-muted)", fontFamily: "Syne, sans-serif", letterSpacing: "0.08em", marginBottom: 6 }}>
                      {r.label.toUpperCase()}
                    </p>
                    <p style={{ fontFamily: "Syne, sans-serif", fontSize: 26, fontWeight: 800, color: r.color, lineHeight: 1 }}>
                      {r.value}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--z-muted)", marginTop: 4 }}>{r.desc}</p>
                  </div>
                ))}
              </div>

              {/* Referral link box */}
              <p style={{ fontSize: 11, color: "var(--z-muted)", fontFamily: "Syne, sans-serif", letterSpacing: "0.08em", marginBottom: 8 }}>
                YOUR REFERRAL LINK
              </p>
              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--z-border)",
                borderRadius: 10,
                padding: "12px 14px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 14, gap: 10,
              }}>
                <p style={{
                  fontSize: 12, color: "var(--z-cyan)",
                  fontFamily: "DM Sans, monospace",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  flex: 1,
                }}>
                  {REFERRAL_LINK}
                </p>
                <button
                  onClick={handleCopy}
                  style={{
                    background: copied ? "rgba(0,245,160,0.15)" : "rgba(255,255,255,0.06)",
                    border: copied ? "1px solid rgba(0,245,160,0.3)" : "1px solid var(--z-border)",
                    borderRadius: 7, padding: "6px 12px",
                    color: copied ? "var(--z-green)" : "var(--z-text)",
                    fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12,
                    cursor: "pointer", flexShrink: 0,
                    transition: "all 0.2s",
                  }}
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              </div>

              {/* Share buttons */}
              <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                {[
                  { label: "WhatsApp", emoji: "💬", url: `https://wa.me/?text=Join%20Zolve%20and%20get%20$10!%20${encodeURIComponent(REFERRAL_LINK)}` },
                  { label: "Twitter", emoji: "🐦", url: `https://twitter.com/intent/tweet?text=Join%20Zolve%20and%20get%20$10!&url=${encodeURIComponent(REFERRAL_LINK)}` },
                  { label: "Email", emoji: "📧", url: `mailto:?subject=Join%20Zolve&body=Use%20my%20link:%20${REFERRAL_LINK}` },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--z-border)",
                      borderRadius: 10, padding: "10px 8px",
                      textAlign: "center", textDecoration: "none",
                      color: "var(--z-text)",
                      fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 12,
                      transition: "border-color 0.2s",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{s.emoji}</span>
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>

              {/* Terms */}
              <p style={{ fontSize: 11, color: "var(--z-muted)", textAlign: "center", lineHeight: 1.6 }}>
                Rewards credited when your friend opens a Zolve account and makes their first transaction. T&Cs apply.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
