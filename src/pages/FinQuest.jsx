import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const modules = [
  {
    id: 1,
    title: "Credit Score Basics",
    xp: 50,
    emoji: "🏦",
    tag: "FOUNDATION",
    tagColor: "var(--z-cyan)",
    tagBg: "rgba(0,212,255,0.08)",
    tagBorder: "rgba(0,212,255,0.2)",
    content:
      "A credit score is a 3-digit number (300–850) that lenders use to evaluate how likely you are to repay debt. It's built from your payment history, credit utilization, length of credit history, credit mix, and new inquiries. For international students, building credit early is crucial — it affects apartments, loans, and even some jobs.",
    quiz: {
      q: "What is considered a good credit score?",
      options: ["300", "450", "700+", "100"],
      answer: "700+",
    },
  },
  {
    id: 2,
    title: "Budgeting 101",
    xp: 60,
    emoji: "📊",
    tag: "ESSENTIALS",
    tagColor: "var(--z-green)",
    tagBg: "rgba(0,245,160,0.08)",
    tagBorder: "rgba(0,245,160,0.2)",
    content:
      "A budget is a plan that tells your money where to go. The 50/30/20 rule is a great start: 50% on needs (rent, food), 30% on wants (entertainment), 20% on savings and debt. Tracking expenses with apps or spreadsheets reveals spending leaks and helps you reach goals faster.",
    quiz: {
      q: "What is a budget?",
      options: ["Loan", "Spending plan", "Credit card", "Bank account"],
      answer: "Spending plan",
    },
  },
  {
    id: 3,
    title: "Smart Saving Habits",
    xp: 70,
    emoji: "💡",
    tag: "GROWTH",
    tagColor: "var(--z-purple)",
    tagBg: "rgba(124,92,252,0.08)",
    tagBorder: "rgba(124,92,252,0.2)",
    content:
      "Pay yourself first: set aside savings before spending. Even $25/week becomes $1,300/year. Use high-yield savings accounts to beat inflation. Automate transfers so saving is effortless. Track your net worth monthly to stay motivated and spot progress.",
    quiz: {
      q: "Best saving habit?",
      options: ["Spend first", "Ignore expenses", "Track spending", "Borrow money"],
      answer: "Track spending",
    },
  },
];

export default function FinQuest() {
  const navigate = useNavigate();
  const { xp, addXP } = useUserStore();

  const [selectedModule, setSelectedModule] = useState(null);
  const [step, setStep] = useState("list"); // list | lesson | quiz
  const [selectedOption, setSelectedOption] = useState("");
  const [quizResult, setQuizResult] = useState(null); // null | "correct" | "wrong"
  const [completedIds, setCompletedIds] = useState([]);

  const startModule = (module) => {
    setSelectedModule(module);
    setStep("lesson");
    setSelectedOption("");
    setQuizResult(null);
  };

  const completeQuiz = () => {
    if (!selectedOption) return;
    if (selectedOption === selectedModule.quiz.answer) {
      setQuizResult("correct");
      addXP(selectedModule.xp); // ✅ Fixed: uses global addXP
      setCompletedIds((prev) => [...prev, selectedModule.id]);
    } else {
      setQuizResult("wrong");
    }
  };

  const backToList = () => {
    setStep("list");
    setSelectedModule(null);
    setSelectedOption("");
    setQuizResult(null);
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
        position: "fixed", top: -60, left: -60,
        width: 280, height: 280,
        background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <button
            onClick={() => step === "list" ? navigate("/") : backToList()}
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
              LEARNING
            </p>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800 }}>
              Fin<span className="gradient-text-green">Quest</span>
            </h1>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <div className="xp-badge">⚡ {xp} ZXP</div>
          </div>
        </div>

        {/* MODULE LIST */}
        {step === "list" && (
          <div>
            <p style={{ fontSize: 13, color: "var(--z-muted)", marginBottom: 20, lineHeight: 1.6 }}>
              Complete lessons, ace quizzes, and earn ZXP to level up your financial IQ.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {modules.map((m, i) => {
                const done = completedIds.includes(m.id);
                return (
                  <div
                    key={m.id}
                    className="z-card animate-in"
                    style={{
                      padding: "20px",
                      animationDelay: `${i * 0.06}s`,
                      opacity: 0,
                      border: done ? "1px solid rgba(0,245,160,0.3)" : undefined,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <div style={{
                        width: 44, height: 44,
                        background: m.tagBg,
                        border: `1px solid ${m.tagBorder}`,
                        borderRadius: 12,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 20, flexShrink: 0,
                      }}>
                        {done ? "✅" : m.emoji}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15 }}>
                            {m.title}
                          </h2>
                          <span style={{
                            fontSize: 9,
                            fontFamily: "Syne, sans-serif",
                            fontWeight: 700,
                            color: m.tagColor,
                            background: m.tagBg,
                            border: `1px solid ${m.tagBorder}`,
                            borderRadius: 100,
                            padding: "2px 7px",
                            letterSpacing: "0.08em",
                          }}>
                            {m.tag}
                          </span>
                        </div>
                        <p style={{ fontSize: 12, color: "var(--z-muted)" }}>
                          +{m.xp} ZXP on completion
                        </p>
                      </div>

                      <button
                        onClick={() => startModule(m)}
                        className="z-btn-primary"
                        style={{ padding: "8px 16px", fontSize: 13, flexShrink: 0 }}
                      >
                        {done ? "Retry" : "Start"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LESSON VIEW */}
        {step === "lesson" && selectedModule && (
          <div className="animate-in">
            <div className="z-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 28 }}>{selectedModule.emoji}</span>
                <div>
                  <span style={{
                    fontSize: 10, fontFamily: "Syne, sans-serif", fontWeight: 700,
                    color: selectedModule.tagColor,
                    background: selectedModule.tagBg,
                    border: `1px solid ${selectedModule.tagBorder}`,
                    borderRadius: 100, padding: "2px 8px", letterSpacing: "0.08em",
                    display: "inline-block", marginBottom: 4,
                  }}>
                    {selectedModule.tag}
                  </span>
                  <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800 }}>
                    {selectedModule.title}
                  </h2>
                </div>
              </div>

              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--z-border)",
                borderRadius: 12,
                padding: "18px",
                marginBottom: 24,
              }}>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(232,237,245,0.85)" }}>
                  📖 {selectedModule.content}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ fontSize: 12, color: "var(--z-muted)" }}>
                  Complete quiz to earn <span style={{ color: "var(--z-green)", fontWeight: 700 }}>+{selectedModule.xp} ZXP</span>
                </p>
                <button
                  className="z-btn-primary"
                  onClick={() => setStep("quiz")}
                  style={{ padding: "10px 20px", fontSize: 14 }}
                >
                  Take Quiz →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* QUIZ VIEW */}
        {step === "quiz" && selectedModule && (
          <div className="animate-in">
            <div className="z-card" style={{ padding: "24px" }}>
              <p style={{ fontSize: 11, color: "var(--z-muted)", fontFamily: "Syne, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                QUIZ
              </p>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 22, lineHeight: 1.4 }}>
                {selectedModule.quiz.q}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
                {selectedModule.quiz.options.map((opt) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = quizResult === "correct" && isSelected;
                  const isWrong = quizResult === "wrong" && isSelected;

                  return (
                    <button
                      key={opt}
                      onClick={() => !quizResult && setSelectedOption(opt)}
                      style={{
                        padding: "13px 16px",
                        borderRadius: 10,
                        border: isCorrect
                          ? "1px solid rgba(0,245,160,0.5)"
                          : isWrong
                          ? "1px solid rgba(255,80,80,0.5)"
                          : isSelected
                          ? "1px solid rgba(0,212,255,0.5)"
                          : "1px solid var(--z-border)",
                        background: isCorrect
                          ? "rgba(0,245,160,0.1)"
                          : isWrong
                          ? "rgba(255,80,80,0.1)"
                          : isSelected
                          ? "rgba(0,212,255,0.08)"
                          : "rgba(255,255,255,0.02)",
                        color: isCorrect ? "var(--z-green)" : isWrong ? "#ff5050" : "var(--z-text)",
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: 14,
                        cursor: quizResult ? "default" : "pointer",
                        textAlign: "left",
                        transition: "all 0.15s",
                        fontWeight: isSelected ? 500 : 400,
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Result messages */}
              {quizResult === "correct" && (
                <div style={{
                  background: "rgba(0,245,160,0.08)",
                  border: "1px solid rgba(0,245,160,0.25)",
                  borderRadius: 10, padding: "12px 16px", marginBottom: 16,
                }}>
                  <p style={{ color: "var(--z-green)", fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
                    🎉 Correct! +{selectedModule.xp} ZXP earned
                  </p>
                </div>
              )}
              {quizResult === "wrong" && (
                <div style={{
                  background: "rgba(255,80,80,0.08)",
                  border: "1px solid rgba(255,80,80,0.25)",
                  borderRadius: 10, padding: "12px 16px", marginBottom: 16,
                }}>
                  <p style={{ color: "#ff5050", fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
                    ✗ Not quite — try again!
                  </p>
                </div>
              )}

              <div style={{ display: "flex", gap: 10 }}>
                {quizResult === "correct" ? (
                  <button className="z-btn-primary" onClick={backToList} style={{ flex: 1, padding: "12px" }}>
                    Back to Modules
                  </button>
                ) : (
                  <>
                    <button
                      className="z-btn-secondary"
                      onClick={backToList}
                      style={{ flex: 1, padding: "12px" }}
                    >
                      Cancel
                    </button>
                    <button
                      className="z-btn-primary"
                      onClick={completeQuiz}
                      disabled={!selectedOption}
                      style={{
                        flex: 1, padding: "12px",
                        opacity: selectedOption ? 1 : 0.4,
                        cursor: selectedOption ? "pointer" : "default",
                      }}
                    >
                      Submit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
