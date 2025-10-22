/*
  # Create Blog Posts Table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key) - Unique identifier for each blog post
      - `title` (text) - Blog post title
      - `slug` (text, unique) - URL-friendly version of title
      - `excerpt` (text) - Short preview of the post
      - `content` (text) - Full blog post content
      - `author` (text) - Author name
      - `author_role` (text) - Author's role/title
      - `published_date` (date) - Date the post was published
      - `read_time` (integer) - Estimated reading time in minutes
      - `category` (text) - Blog post category (e.g., "Education", "Technology", "Community")
      - `image_url` (text) - URL to featured image
      - `created_at` (timestamptz) - When the record was created

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public read access (blog posts are public)
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  author_role text NOT NULL DEFAULT 'Team Member',
  published_date date NOT NULL DEFAULT CURRENT_DATE,
  read_time integer NOT NULL DEFAULT 5,
  category text NOT NULL DEFAULT 'General',
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog posts are publicly readable"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (true);