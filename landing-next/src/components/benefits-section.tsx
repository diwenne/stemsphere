"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import { Trophy, Code, Rocket } from "lucide-react";

export function BenefitsSection() {

    // Fallback data if translation fails or is loading
    const benefits = [
        {
            title: "Leadership",
            description: "Develop crucial leadership skills by managing chapters and organizing events.",
            icon: <Trophy className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "Technical Skills",
            description: "Gain hands-on experience with coding, robotics, and scientific methods.",
            icon: <Code className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "Impact",
            description: "Make a tangible difference in your community by mentoring younger students.",
            icon: <Rocket className="h-4 w-4 text-neutral-500" />,
        },
    ];

    return (
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
            {benefits.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />}
                    icon={item.icon}
                    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                />
            ))}
        </BentoGrid>
    );
}
