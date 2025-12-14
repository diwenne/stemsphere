import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-neutral-800 py-8 mt-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                            Stemsphere
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                            Blog
                        </span>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                        <Link href="https://stemsf.org" className="hover:text-emerald-500 transition-colors">
                            Main Website
                        </Link>
                        <Link href="https://stemsf.org/about" className="hover:text-emerald-500 transition-colors">
                            About
                        </Link>
                        <Link href="https://stemsf.org/get-involved" className="hover:text-emerald-500 transition-colors">
                            Get Involved
                        </Link>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        © {new Date().getFullYear()} Stemsphere Foundation
                    </p>
                </div>
            </div>
        </footer>
    );
}
