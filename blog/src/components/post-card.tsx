"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import type { Post } from "@/lib/posts";

interface PostCardProps {
    post: Post;
    index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link href={`/${post.slug}`}>
                <div className="group bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 overflow-hidden hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800 hover:-translate-y-1 transition-all duration-300">
                    {post.image && (
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="px-3 py-1 text-xs font-medium bg-emerald-500 text-white rounded-full">
                                    {post.category}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="p-6">
                        {!post.image && (
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full mb-3">
                                {post.category}
                            </span>
                        )}

                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors line-clamp-2">
                            {post.title}
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                            <div className="flex items-center gap-1">
                                <User className="h-3.5 w-3.5" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{post.readingTime} min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
