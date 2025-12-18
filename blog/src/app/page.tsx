import { getAllPosts } from "@/lib/posts";
import { MainContent } from "@/components/main-content";

export default function HomePage() {
  const posts = getAllPosts();

  return <MainContent posts={posts} />;
}
