"use client";

import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/posts";

interface PostHeaderProps {
    post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="relative border-b border-slate-100 dark:border-neutral-800 py-16 md:py-20 overflow-hidden">
            {/* Animated Grid Background */}
            <AnimatedGridPattern
                numSquares={25}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,white,transparent)]",
                    "fill-teal-500/30 stroke-teal-500/30",
                    "dark:fill-teal-400/20 dark:stroke-teal-400/20"
                )}
            />

            <div className="relative z-10 max-w-3xl mx-auto px-6">
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
                <div className="mb-8">
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
        </div>
    );
}
