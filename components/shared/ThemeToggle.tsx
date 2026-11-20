"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Dark mode is exclusively for the dashboard
    const saved = localStorage.getItem("skillAuraDashboardTheme");
    if (saved === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }

    return () => {
      // If user navigates away from the dashboard to public site, restore light mode
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/admin") &&
        !window.location.pathname.startsWith("/super-admin")
      ) {
        document.documentElement.classList.remove("dark");
      }
    };
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("skillAuraDashboardTheme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("skillAuraDashboardTheme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className={`w-8 h-8 rounded-[4px] bg-slate-100 dark:bg-slate-800 ${className}`}></div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-[4px] transition-colors cursor-pointer flex items-center justify-center ${className}`}
      aria-label="Toggle dark and light mode"
      title={`Dashboard: Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-slate-700" />
      ) : (
        <Sun className="w-4 h-4 text-amber-400" />
      )}
    </button>
  );
}
