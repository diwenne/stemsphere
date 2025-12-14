import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-50 dark:from-emerald-950/20 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Stemsphere{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
              Blog
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            STEM education insights, workshop recaps, tutorials, and updates
            from the Stemsphere Foundation.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Coming Soon
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                We're working on our first blog posts. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
