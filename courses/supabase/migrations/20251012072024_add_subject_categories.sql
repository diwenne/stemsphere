/*
  # Add Subject Categories and Reorganize Lesson Structure

  1. Changes to `blog_posts` Table
    - Add `subject` (text) - The main subject area (Coding, Engineering, Mathematics, Science)
    - Add `topic` (text) - Specific topic within subject (e.g., Web Development, Robotics, Calculus)
    - Add `difficulty_level` (text) - Beginner, Intermediate, Advanced
    - Rename `programming_language` to be more specific to coding subjects
    - Add composite indexes for efficient filtering

  2. Security
    - Maintain existing RLS policies

  3. Notes
    - Supports multiple subject areas beyond just programming
    - Allows for better organization and filtering
    - Enables Khan Academy-style subject browsing
*/

-- Add new columns for subject organization
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'subject'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN subject text NOT NULL DEFAULT 'Coding';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'topic'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN topic text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'difficulty_level'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN difficulty_level text NOT NULL DEFAULT 'Beginner';
  END IF;
END $$;

-- Add indexes for efficient querying by subject and topic
CREATE INDEX IF NOT EXISTS idx_blog_posts_subject 
  ON blog_posts(subject);

CREATE INDEX IF NOT EXISTS idx_blog_posts_subject_topic 
  ON blog_posts(subject, topic);

CREATE INDEX IF NOT EXISTS idx_blog_posts_difficulty 
  ON blog_posts(difficulty_level);

-- Add composite index for subject + topic + day filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_subject_topic_day 
  ON blog_posts(subject, topic, day_number);