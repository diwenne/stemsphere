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
                "relative flex items-center justify-center gap-1",
                "h-8 min-w-[136px] whitespace-nowrap rounded-[28px] px-3 py-2",
                "text-sm font-semibold leading-tight",
                // Base gradient
                isDark
                    ? "bg-emerald-600 hover:bg-emerald-500"
                    : "bg-[radial-gradient(61.35%_50.07%_at_48.58%_50%,rgb(255,255,255)_0%,rgba(0,0,0,0.02)_100%)]",
                // Shadows
                isDark
                    ? "[box-shadow:0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]"
                    : "[box-shadow:inset_0_0_0_0.5px_hsl(var(--border)),inset_1px_1px_0_-0.5px_hsl(var(--border)),inset_-1px_-1px_0_-0.5px_hsl(var(--border))]",
                // Disabled state
                "disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
            {...props}
        >
            <span className={cn(
                "flex items-center gap-1",
                isDark ? "text-white" : "text-slate-800"
            )}>
                <Mail size={16} strokeWidth={1.5} />
                {children}
            </span>
        </button>
    )
}
