import { Link, Outlet } from "react-router-dom";

const simulations = [
  {title: "🏠 Home",           path: "/"},
  {title: "⚪ Bolas",           path: "/balls"},
  {title: "✨ Partículas",      path: "/particles"},
  {title: "🏖️ Areia",           path: "/sand"},
  {title: "🌊 Fluídos",         path: "/fluid"},
  {title: "🧬 Game of Life",    path: "/life"},
  {title: "🪐 Gravidade",       path: "/gravity"},
];

export default function Menu() {
  return (
    <div className="p-4">
        <h2 className="pb-4">Simulações</h2>
        <div className="grid text-start">
            {simulations.map((simulation) => (
            <Link
                key={simulation.path}
                to={simulation.path}
                className="card duration-300 hover:translate-x-2" 
            >
                {simulation.title}
            </Link>
            ))}
        </div>
    </div>
  );
}