"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Mail } from "lucide-react"

interface FeyButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export function FeyButton({
    className,
    children,
    ...props
}: FeyButtonProps) {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'

    return (
        <button
            className={cn(
                "group relative flex items-center justify-center gap-1",
                "h-8 min-w-[136px] whitespace-nowrap rounded-[28px] px-3 py-2",
                "text-sm font-semibold leading-tight",
                // Text color using CSS variables
                "text-foreground",
                // Base gradient
                isDark
                    ? "bg-[radial-gradient(61.35%_50.07%_at_48.58%_50%,rgb(0,0,0)_0%,rgba(255,255,255,0.04)_100%)]"
                    : "bg-[radial-gradient(61.35%_50.07%_at_48.58%_50%,rgb(255,255,255)_0%,rgba(0,0,0,0.02)_100%)]",
                // Shadows
                isDark
                    ? "[box-shadow:inset_0_0_0_0.5px_rgba(134,143,151,0.2),inset_1px_1px_0_-0.5px_rgba(134,143,151,0.4),inset_-1px_-1px_0_-0.5px_rgba(134,143,151,0.4)]"
                    : "[box-shadow:inset_0_0_0_0.5px_hsl(var(--border)),inset_1px_1px_0_-0.5px_hsl(var(--border)),inset_-1px_-1px_0_-0.5px_hsl(var(--border))]",
                // Hover effect pseudo-element
                "after:absolute after:inset-0 after:rounded-[28px] after:opacity-0 after:transition-opacity after:duration-200",
                // Hover gradient
                isDark
                    ? "after:bg-[radial-gradient(61.35%_50.07%_at_48.58%_50%,rgb(0,0,0)_0%,rgb(24,24,24)_100%)]"
                    : "after:bg-[radial-gradient(61.35%_50.07%_at_48.58%_50%,rgb(255,255,255)_0%,rgb(242,242,242)_100%)]",
                // Hover shadows
                isDark
                    ? "after:[box-shadow:inset_0_0_0_0.5px_hsl(var(--border)),inset_1px_1px_0_-0.5px_hsl(var(--border)),inset_-1px_-1px_0_-0.5px_hsl(var(--border)),0_0_3px_rgba(255,255,255,0.1)]"
                    : "after:[box-shadow:inset_0_0_0_0.5px_hsl(var(--border)),inset_1px_1px_0_-0.5px_hsl(var(--border)),inset_-1px_-1px_0_-0.5px_hsl(var(--border)),0_0_3px_hsl(var(--ring))]",
                "hover:after:opacity-100",
                // Disabled state
                "disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-1">
                <Mail size={16} strokeWidth={1.5} />
                {children}
            </span>
        </button>
    )
}
