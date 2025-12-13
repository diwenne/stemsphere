"use client";
import { cn } from "@/lib/utils";

const stats = [
    {
        key: "students",
        value: "170+",
        label: "Students Reached",
    },
    {
        key: "workshops",
        value: "11",
        label: "Workshops Hosted",
    },
    {
        key: "chapters",
        value: "3",
        label: "Chapters Founded",
    },
    {
        key: "hours",
        value: "115+",
        label: "Hours of Content",
    },
    {
        key: "partners",
        value: "1",
        label: "Partners",
    },
    {
        key: "pursue",
        value: "90%",
        label: "Pursue STEM",
    },
];

export function ImpactSection() {

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-10 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center justify-center p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 hover:shadow-md transition-shadow"
                >
                    <span className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">
                        {stat.value}
                    </span>
                    <span className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-medium text-center">
                        {stat.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
