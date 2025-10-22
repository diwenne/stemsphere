/*
  # Transform Blog Posts to Self-Guided Lessons

  1. Changes to `blog_posts` Table
    - Add `day_number` (integer) - Lesson day number (Day 1, Day 2, etc.)
    - Add `programming_language` (text) - The coding language for this lesson (Java, Python, C++, C#, etc.)
    - Rename conceptually from blog_posts to lessons structure
    - Remove `slug` requirement (not needed for lessons)
    - Update `category` to store programming language
    - Keep existing fields: title, excerpt, content, author, author_role, published_date, read_time, image_url

  2. Security
    - Maintain existing RLS policy for public read access

  3. Notes
    - This migration adds new fields to support lesson organization
    - Existing data is preserved
    - Lessons are organized by programming language and day number
*/

-- Add new columns for lesson structure
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'day_number'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN day_number integer NOT NULL DEFAULT 1;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'programming_language'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN programming_language text NOT NULL DEFAULT 'Python';
  END IF;
END $$;

-- Make slug nullable since we don't need it for lessons
ALTER TABLE blog_posts ALTER COLUMN slug DROP NOT NULL;

-- Add index for efficient querying by programming language and day number
CREATE INDEX IF NOT EXISTS idx_blog_posts_language_day 
  ON blog_posts(programming_language, day_number);

-- Add index for querying by programming language
CREATE INDEX IF NOT EXISTS idx_blog_posts_language 
  ON blog_posts(programming_language);
