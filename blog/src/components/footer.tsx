import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Logo */}
                <div className="footer-logo">
                    <Image
                        src="/images/stemsphere.png"
                        alt="Stemsphere Logo"
                        width={28}
                        height={28}
                    />
                    <span className="logo-text text-lg">
                        <span className="logo-stem">Stem</span>
                        <span className="logo-sphere">sphere</span>
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
