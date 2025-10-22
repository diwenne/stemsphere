import { BlogPost as BlogPostType } from '../lib/supabase';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
}

export function BlogPost({ post, onBack }: BlogPostProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-12 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Blog</span>
        </button>

        <article>
          <div className="mb-8">
            <div className="text-sm text-gray-600 mb-4">{post.category}</div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <User size={18} />
                <div>
                  <div className="font-medium text-gray-900">{post.author}</div>
                  <div className="text-sm">{post.author_role}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{new Date(post.published_date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{post.read_time} min read</span>
              </div>
            </div>
          </div>

          {post.image_url && (
            <div className="mb-12">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div className="text-xl text-gray-700 mb-8 leading-relaxed border-l-4 border-gray-900 pl-6">
              {post.excerpt}
            </div>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </button>
        </div>
      </div>
    </div>
  );
}
