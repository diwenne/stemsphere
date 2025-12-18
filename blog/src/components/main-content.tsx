"use client";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { PostCard } from "@/components/post-card";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/posts";

interface MainContentProps {
    posts: Post[];
}

export function MainContent({ posts }: MainContentProps) {
    return (
        <div className="main-content min-h-screen pt-16 relative overflow-hidden">
            {/* 3D Animated Grid Pattern with skew effect and edge fading */}
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

            {/* Hero Section */}
            <section className="relative z-10 py-20 md:py-28">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/30 border border-teal-200/50 dark:border-teal-800/30 mb-6">
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                            Stemsphere Foundation
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                        Blog
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
                        STEM education insights, workshop recaps, tutorials, and updates from our community.
                    </p>
                </div>
            </section>

            {/* Posts Section */}
            <section className="relative z-10 py-16 md:py-20">
                <div className="max-w-6xl mx-auto px-6">
                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">
                                <span className="text-4xl">📝</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
                                Coming Soon
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                                We're working on our first blog posts. Check back soon for STEM education content!
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    Latest Posts
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400">
                                    Discover our most recent articles
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post, index) => (
                                    <PostCard key={post.slug} post={post} index={index} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
