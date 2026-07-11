import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg border p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {theme === "light" ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
}