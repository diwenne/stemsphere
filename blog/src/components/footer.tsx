import Link from "next/link";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Logo */}
                <div className="footer-logo flex items-center gap-2">
                    <div className="relative w-8 h-8 overflow-hidden rounded-full">
                        <img src="/images/stemsphere.png" alt="Stemsphere Logo" className="object-cover w-full h-full" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 dark:from-emerald-300 dark:via-white/90 dark:to-emerald-300">
                            Stemsphere
                        </span>
                    </span>
                </div>

                {/* Links */}
                <div className="footer-links">
                    <Link href="https://stemsf.org" className="footer-link">
                        Main Website
                    </Link>
                    <Link href="https://stemsf.org/about" className="footer-link">
                        About
                    </Link>
                    <Link href="https://stemsf.org/get-involved" className="footer-link">
                        Get Involved
                    </Link>
                </div>

                {/* Copyright */}
                <p className="footer-copyright">
                    © {new Date().getFullYear()} Stemsphere Foundation
                </p>
            </div>
        </footer>
    );
}
