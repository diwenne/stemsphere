/*
  # Add code_blocks column to blog_posts table

  1. Changes
    - Add `code_blocks` column to `blog_posts` table to store JSON array of code examples
    - Column is nullable and defaults to NULL
    - Stores stringified JSON containing array of code blocks with language and code

  2. Notes
    - Each code block contains: { language: string, code: string }
    - Existing lessons will have NULL value, which is handled gracefully in the UI
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'code_blocks'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN code_blocks TEXT;
  END IF;
END $$;