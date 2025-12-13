"use client";
import { Equal, X } from "lucide-react"; // Changed from @aliimam/icons to lucide-react as it's already installed
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
  { name: "Learn", href: "https://learn.stemsf.org", external: true },
];

const Header = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
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
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "text-lg font-medium py-2 px-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                    pathname === item.href ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "text-slate-600 dark:text-slate-300"
                  )}
                  onClick={() => setMenuState(false)}
                >
                  {item.name}
                </Link>
              ))}
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
