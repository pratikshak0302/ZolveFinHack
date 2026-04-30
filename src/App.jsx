import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FinQuest from "./pages/FinQuest";
import FinCircle from "./pages/FinCircle";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/finquest" element={<FinQuest />} />
      <Route path="/fincircle" element={<FinCircle />} />
    </Routes>
  );
}
