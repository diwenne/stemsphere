"use client";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { PostCard } from "@/components/post-card";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/posts";

interface PostsSectionProps {
    posts: Post[];
}

export function PostsSection({ posts }: PostsSectionProps) {
    return (
        <section className="relative py-16 md:py-24">
            {/* Extended Grid Background */}
            <AnimatedGridPattern
                numSquares={40}
                maxOpacity={0.08}
                duration={4}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(ellipse_100%_100%_at_50%_30%,white,transparent)]",
                    "fill-teal-500/20 stroke-teal-500/20",
                    "dark:fill-teal-400/10 dark:stroke-teal-400/10"
                )}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
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
    );
}
