import { Link } from "react-router-dom";

const simulations = [
  {
    title: "⚪ Bolas",
    path: "/balls",
  },
  {
    title: "✨ Partículas",
    path: "/particles",
  },
  {
    title: "🏖️ Areia",
    path: "/sand",
  },
  {
    title: "🌊 Fluídos",
    path: "/fluid",
  },
  {
    title: "🧬 Game of Life",
    path: "/life",
  },
  {
    title: "🪐 Gravidade",
    path: "/gravity",
  },
];

export default function Home() {
  return (
    <div className="home">
      <h1>Simulation Lab</h1>

      <p>Escolha uma simulação.</p>

      <div className="grid">
        {simulations.map((simulation) => (
          <Link
            key={simulation.path}
            to={simulation.path}
            className="card"
          >
            {simulation.title}
          </Link>
        ))}
      </div>
    </div>
  );
}