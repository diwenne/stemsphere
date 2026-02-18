"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/neon-button";

const donationTiers = [
    {
        amount: "$25",
        description: "Provides materials for one student workshop kit.",
        popular: false,
        link: "https://hcb.hackclub.com/donations/start/stemsphere",
        icon: "/icons/workshop-kit.png",
        bgColor: "#EFF6FF",
        borderColor: "#60A5FA",
        accentColor: "#3B82F6",
    },
    {
        amount: "$50",
        description: "Sponsors a student's participation in a semester-long program.",
        popular: true,
        link: "https://hcb.hackclub.com/donations/start/stemsphere",
        icon: "/icons/student-learn.png",
        bgColor: "#E8F5E9",
        borderColor: "#66BB6A",
        accentColor: "#10B981",
    },
    {
        amount: "$100",
        description: "Funds a complete robotics kit for a classroom.",
        popular: false,
        link: "https://hcb.hackclub.com/donations/start/stemsphere",
        icon: "/icons/robot-kit.png",
        bgColor: "#F5F3FF",
        borderColor: "#A78BFA",
        accentColor: "#8B5CF6",
    },
    {
        amount: "Custom",
        description: "Any amount helps us reach more students.",
        popular: false,
        link: "https://hcb.hackclub.com/donations/start/stemsphere",
        icon: "/icons/heart-give.png",
        bgColor: "#FFF0F0",
        borderColor: "#FCA5A5",
        accentColor: "#EF4444",
    },
];

const moneyGoesTo = [
    {
        title: "Educational Materials",
        description: "Purchasing robotics kits, coding licenses, and science experiment supplies.",
        icon: "/icons/books-materials.png",
        bgColor: "#FFF8E1",
        borderColor: "#FFD54F",
        accentColor: "#F59E0B",
    },
    {
        title: "Event Logistics",
        description: "Venue costs, food for students, and transportation for field trips.",
        icon: "/icons/bus-logistics.png",
        bgColor: "#FFF8E1",
        borderColor: "#FDBA74",
        accentColor: "#F97316",
    },
    {
        title: "Scholarships",
        description: "Providing financial aid for students to attend advanced STEM camps.",
        icon: "/icons/grad-cap.png",
        bgColor: "#EFF6FF",
        borderColor: "#60A5FA",
        accentColor: "#3B82F6",
    },
];

export default function DonatePage() {
    return (
        <div className="relative min-h-screen bg-[#FEFCF9] dark:bg-neutral-950 pt-32 pb-20 px-4 overflow-hidden">
            <div className="relative z-10 max-w-5xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-white sm:text-5xl mb-6">
                        Support Our Mission
                    </h1>
                    <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                        Your donation directly impacts students by providing them with the resources they need to explore STEM.
                    </p>
                </motion.div>

                {/* Donation Tiers */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {donationTiers.map((tier, index) => {
                        const rotations = [-1.5, 1, -0.5, 1.5];
                        const rotation = rotations[index % rotations.length];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40, rotate: 0 }}
                                whileInView={{ opacity: 1, y: 0, rotate: rotation }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.12,
                                    type: "spring",
                                    stiffness: 180,
                                    damping: 14,
                                }}
                                whileHover={{
                                    scale: 1.06,
                                    rotate: 0,
                                    transition: { duration: 0.2 },
                                }}
                                className="relative rounded-2xl p-6 flex flex-col items-center text-center cursor-default"
                                style={{
                                    backgroundColor: tier.bgColor,
                                    border: `3px solid ${tier.borderColor}`,
                                    boxShadow: `4px 4px 0px ${tier.borderColor}`,
                                }}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                        <span
                                            className="text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide"
                                            style={{ backgroundColor: tier.accentColor }}
                                        >
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                {/* Cartoon Icon */}
                                <div className="w-24 h-24 mb-3 relative">
                                    <Image
                                        src={tier.icon}
                                        alt={tier.amount}
                                        fill
                                        unoptimized
                                        className="object-contain"
                                    />
                                </div>

                                {/* Amount */}
                                <h3
                                    className="text-3xl font-extrabold mb-2"
                                    style={{ color: tier.accentColor }}
                                >
                                    {tier.amount}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                                    {tier.description}
                                </p>

                                {/* Button */}
                                <Link href={tier.link} target="_blank" rel="noopener noreferrer" className="w-full mt-auto">
                                    <Button variant={tier.popular ? "solid" : "outline"} className="w-full">
                                        Donate
                                    </Button>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Where Does Your Money Go? */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mb-10">
                        Where does your money go?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {moneyGoesTo.map((item, index) => {
                            const rotations = [-2, 1.5, -1];
                            const rotation = rotations[index % rotations.length];
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 30, rotate: 0 }}
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
                                    className="rounded-2xl p-8 flex flex-col items-center text-center cursor-default"
                                    style={{
                                        backgroundColor: item.bgColor,
                                        border: `3px solid ${item.borderColor}`,
                                        boxShadow: `4px 4px 0px ${item.borderColor}`,
                                    }}
                                >
                                    {/* Cartoon Icon */}
                                    <div className="w-24 h-24 mb-4 relative">
                                        <Image
                                            src={item.icon}
                                            alt={item.title}
                                            fill
                                            unoptimized
                                            className="object-contain"
                                        />
                                    </div>

                                    <h3
                                        className="font-bold text-lg mb-2"
                                        style={{ color: item.accentColor }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                        {item.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
