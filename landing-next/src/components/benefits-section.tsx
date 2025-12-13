"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Trophy, Code, Rocket, Star, Zap, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Animated Trophy/Leadership graphic
const LeadershipGraphic = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-orange-950/30 relative overflow-hidden">
        {/* Floating stars */}
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute"
                style={{
                    left: `${20 + i * 15}%`,
                    top: `${15 + (i % 3) * 20}%`,
                }}
                animate={{
                    y: [0, -8, 0],
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Star className="w-4 h-4 text-amber-400 fill-amber-300" />
            </motion.div>
        ))}
        {/* Central trophy */}
        <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
                y: [0, -6, 0],
                rotate: [-2, 2, -2],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <div className="relative">
                <Trophy className="w-16 h-16 text-amber-500" />
                <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                </motion.div>
            </div>
        </motion.div>
    </div>
);

// Animated Code/Technical Skills graphic
const TechSkillsGraphic = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-cyan-950/30 relative overflow-hidden">
        {/* Terminal window */}
        <div className="absolute inset-4 bg-neutral-900 dark:bg-neutral-950 rounded-lg shadow-xl overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-800">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            {/* Terminal content */}
            <div className="p-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                    <span className="text-emerald-400">$</span>
                    <motion.span
                        className="text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        python robot.py
                    </motion.span>
                    <motion.span
                        className="w-2 h-4 bg-emerald-400"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    />
                </div>
                <motion.div
                    className="mt-2 text-emerald-300"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <span className="text-gray-400">{">>> "}</span>
                    <span className="text-cyan-400">Building future innovators...</span>
                </motion.div>
                <motion.div
                    className="flex gap-1 mt-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    {[...Array(3)].map((_, i) => (
                        <Zap key={i} className="w-3 h-3 text-yellow-400" />
                    ))}
                </motion.div>
            </div>
        </div>
    </div>
);

// Animated Rocket/Impact graphic
const ImpactGraphic = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950/30 dark:via-purple-950/20 dark:to-fuchsia-950/30 relative overflow-hidden">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {[...Array(4)].map((_, i) => (
                <motion.line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={30 + i * 15}
                    y2={20 + (i % 2) * 60}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-violet-300 dark:text-violet-700"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0.3, 0.6, 0.3] }}
                    transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </svg>
        {/* People nodes */}
        {[...Array(4)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute"
                style={{
                    left: `${20 + i * 20}%`,
                    top: i % 2 === 0 ? "20%" : "60%",
                }}
                animate={{
                    scale: [0.9, 1.1, 0.9],
                    opacity: [0.6, 1, 0.6],
                }}
                transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg">
                    <Users className="w-4 h-4 text-white" />
                </div>
            </motion.div>
        ))}
        {/* Central rocket */}
        <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
                y: [0, -8, 0],
                rotate: [-5, 5, -5],
            }}
            transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <div className="relative">
                <Rocket className="w-12 h-12 text-violet-500 -rotate-45" />
                {/* Rocket trail */}
                <motion.div
                    className="absolute bottom-0 right-0 w-8 h-2 bg-gradient-to-r from-orange-400 via-yellow-300 to-transparent rounded-full blur-sm"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                        scaleX: [0.8, 1.2, 0.8],
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                />
            </div>
        </motion.div>
    </div>
);

export function BenefitsSection() {
    const benefits = [
        {
            title: "Leadership",
            description: "Develop crucial leadership skills by managing chapters and organizing events.",
            icon: <Trophy className="h-4 w-4 text-amber-500" />,
            header: <LeadershipGraphic />,
        },
        {
            title: "Technical Skills",
            description: "Gain hands-on experience with coding, robotics, and scientific methods.",
            icon: <Code className="h-4 w-4 text-emerald-500" />,
            header: <TechSkillsGraphic />,
        },
        {
            title: "Impact",
            description: "Make a tangible difference in your community by mentoring younger students.",
            icon: <Rocket className="h-4 w-4 text-violet-500" />,
            header: <ImpactGraphic />,
        },
    ];

    return (
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
            {benefits.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                />
            ))}
        </BentoGrid>
    );
}
