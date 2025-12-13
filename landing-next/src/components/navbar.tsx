"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import "@/lib/i18n"; // Initialize i18n

const languages = [
    { code: "en", name: "EN" },
    { code: "es", name: "ES" },
    { code: "fr", name: "FR" },
    { code: "de", name: "DE" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const currentLanguage = languages.find((lang) => i18n.language.startsWith(lang.code)) || languages[0];

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsLangDropdownOpen(false);
    };

    const navItems = [
        { href: "/#impact", label: t("navbar.impact") },
        { href: "/about", label: t("navbar.about") },
        { href: "/gallery", label: "Gallery" },
        { href: "/get-involved", label: t("navbar.getInvolved") },
        { href: "https://learn.stemsf.org", label: "Learn", external: true },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                isScrolled
                    ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-2 shadow-sm"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
                        {/* Assuming logo is in public/assets or similar. Using text for now if image fails, but trying image path from original */}
                        <div className="relative w-8 h-8 overflow-hidden rounded-full">
                            <img src="/assets/stemsphere.png" alt="Stemsphere Logo" className="object-cover w-full h-full" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">
                            <span className="text-primary">Stem</span>
                            <span className="text-slate-700 dark:text-slate-200">sphere</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Language Switcher */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                {currentLanguage.name}
                                <ChevronDown size={14} />
                            </button>

                            <AnimatePresence>
                                {isLangDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 top-full mt-2 w-24 bg-white rounded-lg shadow-lg border border-gray-100 py-1 overflow-hidden"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang.code)}
                                                className={cn(
                                                    "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors",
                                                    currentLanguage.code === lang.code ? "text-primary font-medium" : "text-gray-600"
                                                )}
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Button asChild className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                            <Link href="/donate">{t("navbar.donate")}</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-gray-700 hover:text-primary py-2"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <hr className="border-gray-100" />
                            <div className="flex items-center justify-between py-2">
                                <span className="text-gray-500">Language</span>
                                <div className="flex gap-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => changeLanguage(lang.code)}
                                            className={cn(
                                                "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                                                currentLanguage.code === lang.code
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-gray-500 hover:bg-gray-100"
                                            )}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <Button asChild className="w-full rounded-full mt-2">
                                <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)}>
                                    {t("navbar.donate")}
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
