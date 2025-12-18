"use client";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export function HeroSection() {
    return (
        <section className="relative py-20 md:py-28 overflow-hidden border-b border-slate-100 dark:border-neutral-800">
            {/* Animated Grid Background */}
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,white,transparent)]",
                    "fill-teal-500/30 stroke-teal-500/30",
                    "dark:fill-teal-400/20 dark:stroke-teal-400/20"
                )}
            />

            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/30 border border-teal-200/50 dark:border-teal-800/30 mb-6">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                        Stemsphere Foundation
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                    Blog
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
                    STEM education insights, workshop recaps, tutorials, and updates from our community.
                </p>
            </div>
        </section>
    );
}
