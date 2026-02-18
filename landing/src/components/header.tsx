"use client";
import { Equal, X, ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/neon-button";
import { ModeToggle } from "@/components/theme-switch";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Get Involved", href: "/get-involved" },
];

const exploreItems = [
  { name: "Learn", href: "https://learn.stemsf.org", external: true, description: "Interactive STEM courses" },
  { name: "Blog", href: "https://blog.stemsf.org", external: true, description: "News and workshop recaps" },
  { name: "The Team", href: "/about#team", external: false, description: "Meet the people behind Stemsphere" },
];

const Header = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [exploreOpen, setExploreOpen] = React.useState(false);
  const pathname = usePathname();
  const exploreRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={cn(
          "fixed z-50 w-full px-3 md:px-4 transition-all duration-300 ease-in-out",
          isScrolled ? "pt-2" : "pt-4"
        )}
      >
        <div
          className={cn(
            "mx-auto transition-all duration-300",
            isScrolled
              ? "bg-white/80 dark:bg-neutral-900/80 max-w-5xl rounded-full border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl px-6 py-2 shadow-sm"
              : "max-w-7xl px-4 py-2"
          )}
        >
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              aria-label="home"
              className="flex gap-2 items-center"
              onClick={() => setMenuState(false)}
            >
              <div className="relative w-8 h-8 overflow-hidden rounded-full">
                <img src="/assets/stemsphere.png" alt="Stemsphere Logo" className="object-cover w-full h-full" />
              </div>
              <span className="font-bold text-xl tracking-tight hidden sm:block">
                <span className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700 dark:from-slate-200 dark:via-white dark:to-slate-200",
                  pathname === "/" && !isScrolled && "text-white bg-none"
                )}>
                  Stemsphere
                </span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-emerald-500",
                    pathname === item.href
                      ? "text-emerald-500"
                      : pathname === "/" && !isScrolled
                        ? "text-white/90 hover:text-white"
                        : "text-slate-600 dark:text-slate-300"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              {/* Explore Dropdown */}
              <div className="relative" ref={exploreRef}>
                <button
                  onClick={() => setExploreOpen(!exploreOpen)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-emerald-500 flex items-center gap-1",
                    pathname === "/" && !isScrolled
                      ? "text-white/90 hover:text-white"
                      : "text-slate-600 dark:text-slate-300"
                  )}
                >
                  Explore
                  <ChevronDown size={14} className={cn("transition-transform", exploreOpen && "rotate-180")} />
                </button>

                {exploreOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xl p-2 z-50">
                    {exploreItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="block px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        onClick={() => setExploreOpen(false)}
                      >
                        <span className="block text-sm font-medium text-slate-900 dark:text-white">{item.name}</span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <ModeToggle isHeroIdle={pathname === "/" && !isScrolled} />
              </div>
              <Link href="/donate" className="hidden sm:block">
                <Button variant="solid" className="rounded-full">
                  Donate
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="lg:hidden p-2 text-slate-600 dark:text-slate-300"
              >
                {menuState ? <X /> : <Equal />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuState && (
            <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl lg:hidden flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-lg font-medium py-2 px-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                    pathname === item.href ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "text-slate-600 dark:text-slate-300"
                  )}
                  onClick={() => setMenuState(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Explore Section in Mobile */}
              <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4 mt-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 px-4 mb-2 block">Explore</span>
                {exploreItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-lg font-medium py-2 px-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-slate-600 dark:text-slate-300 block"
                    onClick={() => setMenuState(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-between px-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <span className="text-sm text-slate-500">Theme</span>
                <ModeToggle />
              </div>
              <Link href="/donate" onClick={() => setMenuState(false)} className="w-full">
                <Button variant="solid" className="w-full rounded-full">
                  Donate
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export { Header };
