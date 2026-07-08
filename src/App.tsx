import { Routes, Route } from "react-router";
import BallSimulationPage from "./pages/simulations/BallSimulationPage";
import Home from "./pages/Home";
import Layout from "./pages/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/balls" element={<BallSimulationPage />} />
      </Route>
    </Routes>
  );
}