import { Routes, Route } from "react-router-dom";
import BallSimulationPage from "./pages/BallSimulationPage";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/balls" element={<BallSimulationPage />} />
    </Routes>
  );
}