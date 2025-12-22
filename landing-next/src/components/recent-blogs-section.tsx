"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User, ExternalLink } from "lucide-react";
import Image from "next/image";

// Blog post data - can be updated manually or fetched from an API
const recentPosts = [
    {
        slug: "moody-middle-workshop-dec-2024",
        title: "STEM Workshop at Moody Middle School",
        excerpt:
            "Our youth-led team delivered hands-on engineering and coding sessions for Grade 6–8 students, featuring an earthquake-tower challenge and Python Turtle graphics.",
        author: "Diwen Huang",
        date: "2024-12-08",
        category: "Workshop Recap",
        image: "/images/12.8_mms/python1.JPG",
        readingTime: 4,
    },
    // Add more blog posts here as they are published
];

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    image?: string;
    readingTime: number;
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
    const formattedDate = new Date(post.date + "T12:00:00").toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
        }
    );

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group h-full"
        >
            <a
                href={`https://blog.stemsf.org/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
            >
                <div className="h-full bg-white dark:bg-neutral-900/70 rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 hover:-translate-y-1">
                    {/* Image */}
                    {post.image && (
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {/* Category badge */}
                            <div className="absolute top-4 left-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                        {post.category}
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                        {/* Category badge (when no image) */}
                        {!post.image && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20 mb-4">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                    {post.category}
                                </span>
                            </span>
                        )}

                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                            {post.title}
                        </h3>

                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
                            {post.excerpt}
                        </p>

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-500 mb-4">
                            <div className="flex items-center gap-1.5">
                                <User size={14} className="text-neutral-400" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar size={14} className="text-neutral-400" />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={14} className="text-neutral-400" />
                                <span>{post.readingTime} min read</span>
                            </div>
                        </div>

                        {/* Read More Link */}
                        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 group-hover:gap-3 transition-all">
                                Read Article
                                <ArrowRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </a>
        </motion.article>
    );
}

export function RecentBlogsSection() {
    if (recentPosts.length === 0) return null;

    return (
        <div className="w-full">
            {/* Section Header */}
            <div className="text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20 mb-4">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                            From Our Blog
                        </span>
                    </span>
                    <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                        Recent Stories
                    </h2>
                    <p className="text-neutral-500 max-w-2xl mx-auto">
                        Explore our latest workshops, events, and STEM education insights.
                    </p>
                </motion.div>
            </div>

            {/* Blog Cards Grid */}
            <div
                className={`grid gap-8 ${recentPosts.length === 1
                    ? "max-w-lg mx-auto"
                    : recentPosts.length === 2
                        ? "md:grid-cols-2 max-w-3xl mx-auto"
                        : "md:grid-cols-2 lg:grid-cols-3"
                    }`}
            >
                {recentPosts.map((post, index) => (
                    <BlogCard key={post.slug} post={post} index={index} />
                ))}
            </div>

            {/* View All Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center mt-12"
            >
                <a
                    href="https://blog.stemsf.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-lg shadow-neutral-900/10 dark:shadow-white/10"
                >
                    View All Posts
                    <ExternalLink size={16} />
                </a>
            </motion.div>
        </div>
    );
}
