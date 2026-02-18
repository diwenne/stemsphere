"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import { cn } from "@/lib/utils";

const benefits = [
    {
        title: "Leadership",
        description: "Develop crucial leadership skills by managing chapters and organizing events.",
        icon: "/icons/leadership-v2.png",
        bgColor: "#FFF8E1",
        borderColor: "#FFD54F",
        accentColor: "#F59E0B",
    },
    {
        title: "Technical Skills",
        description: "Gain hands-on experience with coding, robotics, and scientific methods.",
        icon: "/icons/technical-v2.png",
        bgColor: "#E8F5E9",
        borderColor: "#66BB6A",
        accentColor: "#10B981",
    },
    {
        title: "Impact",
        description: "Make a tangible difference in your community by mentoring younger students.",
        icon: "/icons/impact-v2.png",
        bgColor: "#F3E5F5",
        borderColor: "#AB47BC",
        accentColor: "#8B5CF6",
    },
];

function SketchyCard({
    children,
    bgColor,
    borderColor,
    index,
    className,
}: {
    children: React.ReactNode;
    bgColor: string;
    borderColor: string;
    index: number;
    className?: string;
}) {
    const rotations = [-1.5, 1, -0.5];
    const rotation = rotations[index % rotations.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: rotation }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 180,
                damping: 14,
            }}
            whileHover={{
                scale: 1.02,
                rotate: 0,
                transition: { duration: 0.2 },
            }}
            className={cn(
                "rounded-[2.5rem] p-12 cursor-default flex flex-col items-center text-center max-w-[85%] md:max-w-2xl",
                className
            )}
            style={{
                backgroundColor: bgColor,
                border: `4px solid ${borderColor}`,
                boxShadow: `8px 8px 0px ${borderColor}`,
            }}
        >
            {children}
        </motion.div>
    );
}

export function BenefitsSection() {
    return (
        <div className="flex flex-col gap-24 py-10 max-w-6xl mx-auto px-4">
            {benefits.map((item, i) => (
                <SketchyCard
                    key={item.title}
                    bgColor={item.bgColor}
                    borderColor={item.borderColor}
                    index={i}
                    className={cn(
                        // Zig-zag layout using self-alignment
                        i % 3 === 0 ? "self-start" :
                        i % 3 === 1 ? "self-end" :
                        "self-center"
                    )}
                >
                    {/* 3D Cartoon Icon */}
                    <div className="w-40 h-40 mb-8 relative rounded-2xl overflow-hidden"
                        style={{ backgroundColor: item.bgColor }}
                    >
                        <Image
                            src={item.icon}
                            alt={item.title}
                            fill
                            className="object-contain"
                            style={{ mixBlendMode: "multiply" }}
                        />
                    </div>

                    {/* Title */}
                    <h3
                        className="text-3xl font-extrabold mb-4"
                        style={{ color: item.accentColor }}
                    >
                        {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                        {item.description}
                    </p>
                </SketchyCard>
            ))}
        </div>
    );
}
