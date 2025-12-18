"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import type { Post } from "@/lib/posts";

interface PostCardProps {
    post: Post;
    index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="h-full group"
        >
            <Link href={`/${post.slug}`} className="block h-full">
                <div className="post-card">
                    {/* Image */}
                    {post.image && (
                        <div className="post-card-image">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            {/* Category overlay on image */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-neutral-700/50">
                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                        {post.category}
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="post-card-content">
                        {/* Category badge (when no image) */}
                        {!post.image && (
                            <span className="post-card-category">
                                {post.category}
                            </span>
                        )}

                        <h2 className="post-card-title">
                            {post.title}
                        </h2>

                        <p className="post-card-excerpt">
                            {post.excerpt}
                        </p>

                        <div className="post-card-meta">
                            <div className="post-card-meta-item">
                                <User size={14} />
                                <span>{post.author}</span>
                            </div>
                            <div className="post-card-meta-item">
                                <Calendar size={14} />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="post-card-meta-item">
                                <Clock size={14} />
                                <span>{post.readingTime} min</span>
                            </div>
                        </div>

                        {/* Read More Link */}
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-neutral-800">
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 group-hover:gap-3 transition-all">
                                Read Article
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
