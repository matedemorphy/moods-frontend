import { NavLink } from "react-router-dom";

import useThemeStore from "../stores/useThemeStore";

import "./Navbar.css";

export default function Navbar() {
  const theme = useThemeStore(
    (state) => state.theme
  );

  const toggleTheme = useThemeStore(
    (state) => state.toggleTheme
  );

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          New
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          History
        </NavLink>

        <NavLink
          to="/stats"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Stats
        </NavLink>
      </div>

      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
      >
        {theme === "dark"
          ? "Light"
          : "Dark"}
      </button>
    </nav>
  );
}