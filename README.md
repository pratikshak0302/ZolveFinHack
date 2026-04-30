# 🚀 Zolve — Financial Engagement Ecosystem

> A gamified financial learning and community platform built for international students.


## 💡 What is this?

Zolve is **not just a banking app** — it's a gamified financial behavior system for international students.

Most students arrive in the US with zero credit history, zero financial knowledge, and zero community support. Zolve fixes all three.

### The Core Loop

```
Learn (FinQuest) → Engage (FinCircle) → Earn ZXP → Level Up → Repeat
```

---

## ✨ Features

### 🏠 Dashboard
- Global ZXP (Zolve XP) balance and level display
- Animated progress bar to next level
- ScoreMap — visual credit score journey tracker
- Navigation hub to all modules

### 📘 FinQuest — Gamified Financial Education
- Curated financial learning modules (Credit, Budgeting, Saving)
- Lesson → Quiz flow for each module
- Earn ZXP on correct quiz answers
- Module completion tracking
- Topics: Credit Score Basics, Budgeting 101, Smart Saving Habits

### 💬 FinCircle — Community Q&A
- Post financial questions and get community answers
- Earn ZXP for asking (+10 ZXP) and answering (+20 ZXP)
- Expandable answer threads
- Community feed with avatar system

### ⚡ ZXP System (Global Gamification Engine)
- Unified XP state across all pages via Zustand
- Automatic level calculation
- Real-time XP updates across the entire app

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS v4 |
| State Management | Zustand |
| Deployment | Vercel |
| Fonts | Syne + DM Sans (Google Fonts) |

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Route definitions
├── main.jsx                 # App entry point
├── index.css                # Global design system + Tailwind
│
├── pages/
    ├── Dashboard.jsx        # Main hub + XP display
   ├── FinQuest.jsx         # Learning modules + quiz system
   └── FinCircle.jsx        # Community Q&A feed
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/zolve-hackathon.git
cd zolve-hackathon

# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 🌐 Deployment (Vercel)

This project is configured for Vercel with React Router support.

The `vercel.json` at the root handles client-side routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

To deploy:
1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — click Deploy


## 👥 Team

Built for the **Zolve Hackathon** 🏆


<p align="center">
  Built with ❤️ for international students navigating finance in a new country
</p>
