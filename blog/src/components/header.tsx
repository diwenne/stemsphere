"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
    { href: "/", label: "All Posts" },
    { href: "https://stemsf.org", label: "Main Site", external: true },
    { href: "https://stemsf.org/about", label: "About", external: true },
    { href: "https://stemsf.org/get-involved", label: "Get Involved", external: true },
];

export function Header() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <header className="navbar-header">
            <nav className="navbar-container">
                {/* Logo */}
                <Link href="/" className="stemsphere-logo flex items-center gap-2" onClick={closeMobileMenu}>
                    <div className="relative w-9 h-9 overflow-hidden rounded-full">
                        <img src="/images/stemsphere.png" alt="Stemsphere Logo" className="object-cover w-full h-full" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700 dark:from-slate-200 dark:via-white dark:to-slate-200">
                            Stemsphere
                        </span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="navbar-links">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="nav-link"
                            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                            {item.label}
                            {item.external && <span className="ml-1 text-xs opacity-60">↗</span>}
                        </Link>
                    ))}
                </div>

                {/* Right side controls */}
                <div className="navbar-right">
                    <ThemeToggle />
                    <button
                        className="hamburger-menu"
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div className={`mobile-nav-links ${isMobileMenuOpen ? "open" : ""}`}>
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="nav-link"
                        onClick={closeMobileMenu}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </header>
    );
}
