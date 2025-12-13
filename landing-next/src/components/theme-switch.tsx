"use client";

import * as React from "react";
import { Moon, Sun } from "@aliimam/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

export function ModeToggle({ isHeroIdle = false }: { isHeroIdle?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col justify-center">
      <div>
        <Toggle
          className={cn(
            "group cursor-pointer size-9 data-[state=on]:bg-transparent",
            isHeroIdle
              ? "bg-transparent hover:bg-white/10 data-[state=on]:hover:bg-white/10"
              : "bg-secondary dark:bg-secondary data-[state=on]:hover:bg-muted"
          )}
          pressed={theme === "dark"}
          onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <Moon
            size={16}
            className={cn(
              "shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100",
              isHeroIdle && "text-white"
            )}
            aria-hidden="true"
          />
          <Sun
            size={16}
            className={cn(
              "absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0",
              isHeroIdle && "text-white"
            )}
            aria-hidden="true"
          />
        </Toggle>
      </div>
    </div>
  );
}

