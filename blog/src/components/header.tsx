import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                        Stemsphere
                    </span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Blog
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors"
                    >
                        All Posts
                    </Link>
                    <Link
                        href="/category/tutorials"
                        className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors"
                    >
                        Tutorials
                    </Link>
                    <Link
                        href="/category/news"
                        className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors"
                    >
                        News
                    </Link>
                    <Link
                        href="https://stemsf.org"
                        className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors"
                        target="_blank"
                    >
                        Main Site ↗
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
