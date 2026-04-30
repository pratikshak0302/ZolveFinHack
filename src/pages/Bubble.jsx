import { useState } from "react";
import { useUserStore } from "../store/UseUserStore";

const mockUsers = [
  { id: 1, name: "Alex", goal: "Save Money" },
  { id: 2, name: "Maya", goal: "Build Credit" },
  { id: 3, name: "John", goal: "Reduce Spending" },
];

const challenges = [
  "Spend under $20 on food today",
  "No coffee purchases for 3 days",
  "Save $50 in 7 days",
  "Track all expenses for 5 days",
];

export default function Bubble() {
  const { addXP } = useUserStore();

  const [matchedUser, setMatchedUser] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [status, setStatus] = useState("idle"); 
  // idle | matched | completed

  const findBubble = () => {
    console.log("🔵 findBubble clicked - status before:", status);
    
    const randomUser =
      mockUsers[Math.floor(Math.random() * mockUsers.length)];

    const randomChallenge =
      challenges[Math.floor(Math.random() * challenges.length)];

    console.log("✅ Setting matched user:", randomUser.name);
    console.log("✅ Setting challenge:", randomChallenge);
    
    setMatchedUser(randomUser);
    setChallenge(randomChallenge);
    setStatus("matched");
    
    console.log("🔵 Status set to 'matched'");
  };

  const completeChallenge = () => {
    console.log("🏁 completeChallenge clicked");
    
    try {
      if (addXP) {
        addXP(100); // BIG reward for Bubble completion
        console.log("✅ XP added: +100");
      } else {
        console.error("❌ addXP function not found!");
      }
    } catch (error) {
      console.error("❌ Error adding XP:", error);
    }
    
    setStatus("completed");
    console.log("🔵 Status set to 'completed'");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-2xl font-bold mb-4">🌐 Bubble</h1>

      {/* IDLE STATE */}
      {status === "idle" && (
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-600 mb-4">
            Find a peer and complete a financial challenge together.
          </p>

          <button
            onClick={findBubble}
            className="bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Find My Bubble
          </button>
        </div>
      )}

      {/* MATCHED STATE */}
      {status === "matched" && matchedUser && (
        <div className="space-y-4">

          {/* USER CARD */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold">
              Matched With: {matchedUser.name}
            </h2>
            <p className="text-sm text-gray-500">
              Goal: {matchedUser.goal}
            </p>
          </div>

          {/* CHALLENGE */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-2">
              Your 7-Day Challenge
            </h2>

            <p className="text-gray-700">{challenge}</p>
          </div>

          {/* ACTION */}
          <button
            onClick={completeChallenge}
            className="w-full bg-blue-600 text-white p-3 rounded-xl"
          >
            Mark Challenge Complete (+100 XP)
          </button>
        </div>
      )}

      {/* COMPLETED STATE */}
      {status === "completed" && (
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold text-green-600">
            🎉 Challenge Completed!
          </h2>

          <p className="text-gray-600 mt-2">
            You earned 100 XP
          </p>

          <button
            onClick={() => {
              setStatus("idle");
              setMatchedUser(null);
              setChallenge(null);
            }}
            className="mt-4 bg-black text-white px-5 py-2 rounded-lg"
          >
            Find New Bubble
          </button>
        </div>
      )}
    </div>
  );
}