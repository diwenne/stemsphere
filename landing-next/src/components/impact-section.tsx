"use client";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, Calendar, MapPin, Clock, Handshake, TrendingUp, Sparkles } from "lucide-react";

const stats = [
    {
        key: "students",
        value: 170,
        suffix: "+",
        label: "Students Reached",
        icon: Users,
        gradient: "from-blue-500/20 via-cyan-500/10 to-blue-500/5",
        iconColor: "text-blue-500",
    },
    {
        key: "workshops",
        value: 11,
        suffix: "",
        label: "Workshops Hosted",
        icon: Calendar,
        gradient: "from-violet-500/20 via-purple-500/10 to-violet-500/5",
        iconColor: "text-violet-500",
    },
    {
        key: "chapters",
        value: 3,
        suffix: "",
        label: "Chapters Founded",
        icon: MapPin,
        gradient: "from-rose-500/20 via-pink-500/10 to-rose-500/5",
        iconColor: "text-rose-500",
    },
    {
        key: "hours",
        value: 115,
        suffix: "+",
        label: "Hours of Content",
        icon: Clock,
        gradient: "from-amber-500/20 via-orange-500/10 to-amber-500/5",
        iconColor: "text-amber-500",
    },
    {
        key: "partners",
        value: 1,
        suffix: "",
        label: "School Partners",
        icon: Handshake,
        gradient: "from-emerald-500/20 via-teal-500/10 to-emerald-500/5",
        iconColor: "text-emerald-500",
    },
    {
        key: "pursue",
        value: 90,
        suffix: "%",
        label: "Pursue STEM",
        icon: TrendingUp,
        gradient: "from-indigo-500/20 via-blue-500/10 to-indigo-500/5",
        iconColor: "text-indigo-500",
    },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 2,
            ease: "easeOut",
            onUpdate: (v) => setDisplayValue(Math.floor(v)),
        });
        return () => controls.stop();
    }, [value]);

    return (
        <span>
            {displayValue}{suffix}
        </span>
    );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
    const Icon = stat.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className={cn(
                "relative group flex flex-col items-center justify-center p-6",
                "bg-white dark:bg-neutral-900 rounded-2xl",
                "shadow-sm border border-neutral-100 dark:border-neutral-800",
                "hover:shadow-xl hover:border-neutral-200 dark:hover:border-neutral-700",
                "transition-all duration-300 overflow-hidden"
            )}
        >
            {/* Gradient background */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                stat.gradient
            )} />

            {/* Floating sparkles on hover */}
            <motion.div
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <Sparkles className={cn("w-4 h-4", stat.iconColor)} />
            </motion.div>

            {/* Icon */}
            <motion.div
                className={cn(
                    "mb-3 p-3 rounded-xl",
                    "bg-neutral-100 dark:bg-neutral-800",
                    "group-hover:scale-110 transition-transform duration-300"
                )}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
            >
                <Icon className={cn("w-6 h-6", stat.iconColor)} />
            </motion.div>

            {/* Animated number */}
            <span className={cn(
                "relative z-10 text-4xl md:text-5xl font-bold mb-2",
                "bg-clip-text text-transparent",
                "bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-900",
                "dark:from-white dark:via-neutral-200 dark:to-white"
            )}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </span>

            {/* Label */}
            <span className="relative z-10 text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-medium text-center">
                {stat.label}
            </span>

            {/* Bottom accent line */}
            <div className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full",
                "group-hover:w-1/2 transition-all duration-500",
                stat.iconColor.replace("text-", "bg-")
            )} />
        </motion.div>
    );
}

export function ImpactSection() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-10 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
                <StatCard key={stat.key} stat={stat} index={index} />
            ))}
        </div>
    );
}

