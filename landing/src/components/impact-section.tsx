"use client";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
    {
        key: "students",
        value: 220,
        suffix: "+",
        label: "Students Reached",
        color: "#FF6B6B",
        bgColor: "#FFF0F0",
    },
    {
        key: "workshops",
        value: 12,
        suffix: "",
        label: "Workshops Hosted",
        color: "#FF8C00",
        bgColor: "#FFF5E6",
    },
    {
        key: "chapters",
        value: 3,
        suffix: "",
        label: "Chapters Founded",
        color: "#10B981",
        bgColor: "#ECFDF5",
    },
    {
        key: "hours",
        value: 165,
        suffix: "+",
        label: "Hours of Content",
        color: "#3B82F6",
        bgColor: "#EFF6FF",
    },
    {
        key: "partners",
        value: 1,
        suffix: "",
        label: "School Partners",
        color: "#8B5CF6",
        bgColor: "#F5F3FF",
    },
    {
        key: "pursue",
        value: 90,
        suffix: "%",
        label: "Pursue STEM",
        color: "#EC4899",
        bgColor: "#FDF2F8",
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

function StatBubble({ stat, index }: { stat: typeof stats[0]; index: number }) {
    // Slight random rotations for playfulness
    const rotations = [-3, 2, -2, 3, -1, 2];
    const rotation = rotations[index % rotations.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: rotation }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15,
            }}
            whileHover={{
                scale: 1.08,
                rotate: 0,
                transition: { duration: 0.2 },
            }}
            className="flex flex-col items-center justify-center p-6 rounded-3xl cursor-default"
            style={{
                backgroundColor: stat.bgColor,
                border: `3px dashed ${stat.color}40`,
                boxShadow: `0 4px 20px ${stat.color}15`,
            }}
        >

            {/* Big bouncy number */}
            <span
                className="text-4xl md:text-5xl font-extrabold"
                style={{ color: stat.color }}
            >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </span>

            {/* Label */}
            <span
                className="text-sm md:text-base font-bold text-center mt-1"
                style={{
                    color: stat.color,
                    opacity: 0.8,
                }}
            >
                {stat.label}
            </span>
        </motion.div>
    );
}

export function ImpactSection() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-10 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
                <StatBubble key={stat.key} stat={stat} index={index} />
            ))}
        </div>
    );
}
