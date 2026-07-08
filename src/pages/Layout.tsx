import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";

export default function Layout() {
  return (
    <div className="flex flex-grow">
        <aside className="border-r border-gray-300 p-4 w-[15%]">
            <Menu />
        </aside>
        <main  className="w-[85%]">
            <Outlet />
        </main>
    </div>
  );
}