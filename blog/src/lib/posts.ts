import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    author: string;
    category: string;
    image?: string;
    content: string;
    readingTime: number;
}

export function getReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

export function getAllPosts(): Post[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || "Untitled",
                date: data.date || new Date().toISOString(),
                excerpt: data.excerpt || "",
                author: data.author || "Stemsphere Team",
                category: data.category || "General",
                image: data.image,
                content,
                readingTime: getReadingTime(content),
            };
        });

    return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | undefined {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || "Untitled",
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || "",
            author: data.author || "Stemsphere Team",
            category: data.category || "General",
            image: data.image,
            content,
            readingTime: getReadingTime(content),
        };
    } catch {
        return undefined;
    }
}

export function getPostsByCategory(category: string): Post[] {
    const allPosts = getAllPosts();
    return allPosts.filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
    );
}

export function getAllCategories(): string[] {
    const allPosts = getAllPosts();
    const categories = new Set(allPosts.map((post) => post.category));
    return Array.from(categories);
}
