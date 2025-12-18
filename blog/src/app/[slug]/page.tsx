import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { PostHeader } from "@/components/post-header";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
            images: post.image ? [post.image] : [],
        },
    };
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white dark:bg-neutral-950 pt-16">
            <PostHeader post={post} />

            {/* Featured Image */}
            {post.image && (
                <div className="max-w-4xl mx-auto px-6 py-10">
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-100 dark:border-neutral-800 shadow-lg">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose max-w-none">
                    <MDXRemote source={post.content} />
                </div>
            </div>
        </article>
    );
}
