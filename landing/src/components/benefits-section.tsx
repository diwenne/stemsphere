"use client";
import { motion } from "framer-motion";
import Image from "next/image";

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
}: {
    children: React.ReactNode;
    bgColor: string;
    borderColor: string;
    index: number;
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
                scale: 1.04,
                rotate: 0,
                transition: { duration: 0.2 },
            }}
            className="rounded-2xl p-8 cursor-default flex flex-col items-center text-center"
            style={{
                backgroundColor: bgColor,
                border: `3px solid ${borderColor}`,
                boxShadow: `4px 4px 0px ${borderColor}`,
            }}
        >
            {children}
        </motion.div>
    );
}

export function BenefitsSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((item, i) => (
                <SketchyCard
                    key={item.title}
                    bgColor={item.bgColor}
                    borderColor={item.borderColor}
                    index={i}
                >
                    {/* 3D Cartoon Icon */}
                    <div className="w-28 h-28 mb-4 relative rounded-2xl overflow-hidden"
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
                        className="text-xl font-bold mb-2"
                        style={{ color: item.accentColor }}
                    >
                        {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {item.description}
                    </p>
                </SketchyCard>
            ))}
        </div>
    );
}
