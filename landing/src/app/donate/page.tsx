"use client";
import { Button } from "@/components/ui/neon-button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export default function DonatePage() {

    const donationTiers = [
        {
            amount: "$25",
            description: "Provides materials for one student workshop kit.",
            popular: false,
            link: "https://hcb.hackclub.com/donations/start/stemsphere"
        },
        {
            amount: "$50",
            description: "Sponsors a student's participation in a semester-long program.",
            popular: true,
            link: "https://hcb.hackclub.com/donations/start/stemsphere"
        },
        {
            amount: "$100",
            description: "Funds a complete robotics kit for a classroom.",
            popular: false,
            link: "https://hcb.hackclub.com/donations/start/stemsphere"
        },
        {
            amount: "Custom",
            description: "Any amount helps us reach more students.",
            popular: false,
            link: "https://hcb.hackclub.com/donations/start/stemsphere"
        }
    ];

    return (
        <div className="relative min-h-screen bg-slate-50 dark:bg-black pt-32 pb-20 px-4 overflow-hidden">
            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-6">
                        Support Our Mission
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Your donation directly impacts students by providing them with the resources they need to explore STEM.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {donationTiers.map((tier, index) => (
                        <Card key={index} className={`relative flex flex-col ${tier.popular ? 'border-emerald-500 shadow-lg scale-105 z-10' : 'border-slate-200 dark:border-neutral-800'}`}>
                            {tier.popular && (
                                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                    <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            <CardHeader className="text-center pb-2">
                                <CardTitle className="text-3xl font-bold text-slate-900 dark:text-white">{tier.amount}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col justify-between text-center pt-0">
                                <p className="text-slate-600 dark:text-slate-400 mb-6 mt-4">
                                    {tier.description}
                                </p>
                                <Link href={tier.link} target="_blank" rel="noopener noreferrer" className="w-full">
                                    <Button variant={tier.popular ? "solid" : "outline"} className="w-full">
                                        Donate
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-neutral-800 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        Where does your money go?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 mt-8 text-left">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Check size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Educational Materials</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Purchasing robotics kits, coding licenses, and science experiment supplies.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Check size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Event Logistics</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Venue costs, food for students, and transportation for field trips.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Check size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Scholarships</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Providing financial aid for students to attend advanced STEM camps.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

