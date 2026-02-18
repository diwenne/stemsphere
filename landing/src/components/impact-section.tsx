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
        value: 20,
        suffix: "",
        label: "Workshops Hosted",
        color: "#FF8C00",
        bgColor: "#FFF5E6",
    },
    {
        key: "chapters",
        value: 7,
        suffix: "",
        label: "Chapters Founded",
        color: "#10B981",
        bgColor: "#ECFDF5",
    },
    {
        key: "projects",
        value: 90,
        suffix: "%",
        label: "Project Completion",
        color: "#3B82F6",
        bgColor: "#EFF6FF",
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
    
    // Stagger layout for "scattered" feel
    const marginTop = index % 2 === 0 ? "0px" : "40px";

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
                scale: 1.05,
                rotate: 0,
                transition: { duration: 0.2 },
            }}
            className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] cursor-default aspect-square"
            style={{
                backgroundColor: stat.bgColor,
                border: `4px dashed ${stat.color}40`,
                boxShadow: `0 8px 30px ${stat.color}20`,
                marginTop: marginTop,
            }}
        >

            {/* Big bouncy number */}
            <span
                className="text-5xl md:text-6xl font-extrabold mb-2"
                style={{ color: stat.color }}
            >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </span>

            {/* Label */}
            <span
                className="text-base md:text-lg font-bold text-center mt-2"
                style={{
                    color: stat.color,
                    opacity: 0.9,
                }}
            >
                {stat.label}
            </span>
        </motion.div>
    );
}

export function ImpactSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 py-10 max-w-3xl mx-auto items-start">
            {stats.map((stat, index) => (
                <StatBubble key={stat.key} stat={stat} index={index} />
            ))}
        </div>
    );
}
