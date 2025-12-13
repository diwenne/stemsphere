"use client";

import Link from "next/link";
import { Mail, Linkedin, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 dark:bg-neutral-950 border-t border-slate-200 dark:border-neutral-800 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand & Mission */}
                    <div className="md:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative w-8 h-8 overflow-hidden rounded-full">
                                <img src="/assets/stemsphere.png" alt="Stemsphere Logo" className="object-cover w-full h-full" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 dark:from-emerald-300 dark:via-white/90 dark:to-emerald-300">
                                    Stemsphere
                                </span>
                            </span>
                        </Link>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                            Empowering the next generation of STEM leaders through accessible education and mentorship.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="mailto:hello@stemsf.org"
                                className="p-2 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-colors"
                                aria-label="Email"
                            >
                                <Mail size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/stemsf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="https://www.instagram.com/stemspherefoundation?igsh=bm9obDliMm90Ym04&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900 dark:text-white">Navigate</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/get-involved" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors">
                                    Get Involved
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://learn.stemsf.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors"
                                >
                                    Learn
                                </a>
                            </li>
                            <li>
                                <Link href="/donate" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors">
                                    Donate
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links (can be added here or bottom) */}
                    <div className="space-y-4 md:hidden">
                        {/* Mobile only extra links if needed */}
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                    <p>© {currentYear} Stemsphere. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="hover:text-emerald-500 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-of-service" className="hover:text-emerald-500 transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

