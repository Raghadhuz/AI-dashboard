// components/Header.jsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContextValue";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <h1>🤖 AI Analytics Dashboard</h1>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}
