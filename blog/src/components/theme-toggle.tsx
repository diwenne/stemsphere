"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5 text-slate-600 dark:text-slate-400 hidden dark:block" />
            <Moon className="h-5 w-5 text-slate-600 dark:text-slate-400 block dark:hidden" />
        </button>
    );
}
