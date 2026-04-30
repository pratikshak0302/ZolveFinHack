import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const initialQuestions = [
  {
    id: 1,
    user: "Alex",
    avatar: "A",
    avatarColor: "rgba(0,212,255,0.2)",
    avatarBorder: "rgba(0,212,255,0.4)",
    avatarText: "var(--z-cyan)",
    question: "How do I build credit score from zero as an international student?",
    answers: [
      { user: "Priya", text: "Start with a secured credit card and pay on time every month." },
      { user: "Zolve AI", text: "Use small transactions and maintain low utilization (under 30%)." },
    ],
    time: "2h ago",
  },
  {
    id: 2,
    user: "Maya",
    avatar: "M",
    avatarColor: "rgba(124,92,252,0.2)",
    avatarBorder: "rgba(124,92,252,0.4)",
    avatarText: "var(--z-purple)",
    question: "What happens if I miss a credit card payment?",
    answers: [
      { user: "Community", text: "Your credit score drops and interest increases. Set up autopay to avoid this." },
    ],
    time: "5h ago",
  },
];

function Avatar({ letter, color, border, textColor, size = 32 }) {
  return (
    <div style={{
      width: size, height: size,
      background: color,
      border: `1px solid ${border}`,
      borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Syne, sans-serif",
      fontWeight: 700,
      fontSize: size * 0.4,
      color: textColor,
      flexShrink: 0,
    }}>
      {letter}
    </div>
  );
}

export default function FinCircle() {
  const navigate = useNavigate();
  const { xp, addXP } = useUserStore(); // ✅ Fixed: single source of truth

  const [questions, setQuestions] = useState(initialQuestions);
  const [newQ, setNewQ] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const askQuestion = () => {
    if (!newQ.trim()) return;

    const newQuestion = {
      id: Date.now(),
      user: "You",
      avatar: "Y",
      avatarColor: "rgba(0,245,160,0.15)",
      avatarBorder: "rgba(0,245,160,0.35)",
      avatarText: "var(--z-green)",
      question: newQ.trim(),
      answers: [],
      time: "Just now",
    };

    setQuestions([newQuestion, ...questions]);
    setNewQ("");
    addXP(10); // ✅ Fixed: actually calls addXP
  };

  const addMockAnswer = (id) => {
    const updated = questions.map((q) => {
      if (q.id === id) {
        return {
          ...q,
          answers: [
            ...q.answers,
            { user: "Community", text: "This is a community verified answer. Always consult a financial advisor for personalized advice. 💡" },
          ],
        };
      }
      return q;
    });

    setQuestions(updated);
    addXP(20); // ✅ Fixed: actually calls addXP
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--z-bg)",
        padding: "24px 20px",
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "fixed", top: -60, right: -60,
        width: 280, height: 280,
        background: "radial-gradient(circle, rgba(124,92,252,0.07) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--z-border)",
              borderRadius: 10,
              width: 38, height: 38,
              color: "var(--z-text)",
              cursor: "pointer",
              fontSize: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ←
          </button>
          <div>
            <p style={{ fontSize: 11, color: "var(--z-muted)", fontFamily: "Syne, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              COMMUNITY
            </p>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800 }}>
              Fin<span className="gradient-text-purple">Circle</span>
            </h1>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <div className="xp-badge">⚡ {xp} ZXP</div>
          </div>
        </div>

        {/* XP INFO STRIP */}
        <div style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
        }}>
          {[
            { label: "Ask question", xp: "+10 ZXP", color: "var(--z-cyan)", bg: "rgba(0,212,255,0.06)", border: "rgba(0,212,255,0.15)" },
            { label: "Add answer", xp: "+20 ZXP", color: "var(--z-green)", bg: "rgba(0,245,160,0.06)", border: "rgba(0,245,160,0.15)" },
          ].map((item) => (
            <div key={item.label} style={{
              flex: 1,
              background: item.bg,
              border: `1px solid ${item.border}`,
              borderRadius: 10,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <p style={{ fontSize: 11, color: "var(--z-muted)", fontFamily: "Syne, sans-serif" }}>{item.label}</p>
              <p style={{ fontSize: 12, fontWeight: 700, fontFamily: "Syne, sans-serif", color: item.color }}>{item.xp}</p>
            </div>
          ))}
        </div>

        {/* ASK QUESTION CARD */}
        <div className="z-card" style={{ padding: "20px", marginBottom: 20 }}>
          <p style={{ fontSize: 11, color: "var(--z-muted)", fontFamily: "Syne, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
            ASK A QUESTION
          </p>
          <textarea
            value={newQ}
            onChange={(e) => setNewQ(e.target.value)}
            placeholder="What's your financial question?"
            rows={3}
            className="z-input"
            style={{ marginBottom: 12, resize: "none", lineHeight: 1.6 }}
          />
          <button
            className="z-btn-primary"
            onClick={askQuestion}
            style={{ width: "100%", padding: "12px", fontSize: 14 }}
          >
            Post Question · +10 ZXP
          </button>
        </div>

        {/* QUESTIONS FEED */}
        <p style={{ fontSize: 11, color: "var(--z-muted)", fontFamily: "Syne, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
          COMMUNITY FEED
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {questions.map((q, i) => (
            <div
              key={q.id}
              className="z-card animate-in"
              style={{ padding: "18px 20px", animationDelay: `${i * 0.05}s`, opacity: 0 }}
            >
              {/* Question header */}
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                <Avatar
                  letter={q.avatar}
                  color={q.avatarColor}
                  border={q.avatarBorder}
                  textColor={q.avatarText}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "var(--z-text)" }}>
                      {q.user}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--z-muted)" }}>{q.time}</p>
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(232,237,245,0.85)", lineHeight: 1.5 }}>
                    {q.question}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "var(--z-border)", marginBottom: 12 }} />

              {/* Answers */}
              <div style={{ marginBottom: 12 }}>
                {q.answers.length === 0 ? (
                  <p style={{ fontSize: 12, color: "var(--z-muted)", fontStyle: "italic" }}>
                    No answers yet — be the first to help!
                  </p>
                ) : (
                  <div>
                    {/* Show first answer always, rest on expand */}
                    {(expandedId === q.id ? q.answers : q.answers.slice(0, 1)).map((a, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex", gap: 10, alignItems: "flex-start",
                          marginBottom: idx < q.answers.length - 1 ? 10 : 0,
                        }}
                      >
                        <div style={{
                          width: 6, height: 6,
                          background: "var(--z-green)",
                          borderRadius: "50%",
                          marginTop: 7, flexShrink: 0,
                        }} />
                        <div>
                          <p style={{ fontSize: 11, color: "var(--z-green)", fontFamily: "Syne, sans-serif", fontWeight: 700, marginBottom: 2 }}>
                            {a.user}
                          </p>
                          <p style={{ fontSize: 13, color: "rgba(232,237,245,0.75)", lineHeight: 1.5 }}>
                            {a.text}
                          </p>
                        </div>
                      </div>
                    ))}

                    {q.answers.length > 1 && (
                      <button
                        onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                        style={{
                          background: "none", border: "none",
                          color: "var(--z-cyan)", fontSize: 12,
                          fontFamily: "Syne, sans-serif", fontWeight: 700,
                          cursor: "pointer", marginTop: 8, padding: 0,
                        }}
                      >
                        {expandedId === q.id ? "Show less ↑" : `+${q.answers.length - 1} more answers ↓`}
                      </button>
                    )}
                  </div>
                )}
              </div>

              <button
                className="z-btn-secondary"
                onClick={() => addMockAnswer(q.id)}
                style={{ width: "100%", padding: "9px", fontSize: 13 }}
              >
                💡 Add Answer · +20 ZXP
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
