import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

import useThemeStore from "../stores/useThemeStore";

import "./Layout.css";

export default function Layout() {
  const theme = useThemeStore(
    (state) => state.theme
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );
  }, [theme]);

  return (
    <div>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}