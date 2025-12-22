"use client";

import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/posts";

interface PostContentProps {
    post: Post;
    children: React.ReactNode;
}

export function PostContent({ post, children }: PostContentProps) {
    const formattedDate = new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="main-content min-h-screen pt-16 relative overflow-hidden">
            {/* 3D Animated Grid Pattern - Same as main page */}
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.15}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-50%] h-[250%] skew-y-12",
                    "fill-teal-500/30 stroke-teal-500/30",
                    "dark:fill-teal-400/20 dark:stroke-teal-400/20"
                )}
            />

            {/* Header Section */}
            <header className="relative z-10 py-10 md:py-12">
                <div className="max-w-3xl mx-auto px-6">
                    {/* Back Link */}
                    <div className="mb-6">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Back to Blog
                        </Link>
                    </div>

                    {/* Category Badge */}
                    <div className="mb-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/30 border border-teal-200/50 dark:border-teal-800/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            <span className="text-xs font-medium uppercase tracking-wider text-teal-700 dark:text-teal-300">
                                {post.category}
                            </span>
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
                        {post.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">
                                <User size={14} />
                            </div>
                            <span className="font-medium">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{post.readingTime} min read</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
