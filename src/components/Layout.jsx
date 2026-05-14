import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./Layout.css";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
    </div>
  );
}
