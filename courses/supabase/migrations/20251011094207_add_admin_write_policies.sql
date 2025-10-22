/*
  # Add Admin Write Policies

  1. Changes
    - Add policy to allow all users to INSERT blog posts (admin operations)
    - Add policy to allow all users to UPDATE blog posts (admin operations)
    - Add policy to allow all users to DELETE blog posts (admin operations)
    - Keep existing public read policy unchanged

  2. Security Notes
    - For now, these policies allow unrestricted write access for testing
    - In production, these should be restricted to authenticated admin users only
    - Admin authentication is currently handled at application level via session storage

  3. Future Improvements
    - When Supabase Auth is integrated, update policies to check for admin role
    - Example: USING (auth.jwt()->>'role' = 'admin')
*/

-- Allow insert operations (for creating new lessons)
CREATE POLICY "Allow insert for admin operations"
  ON blog_posts
  FOR INSERT
  WITH CHECK (true);

-- Allow update operations (for editing lessons)
CREATE POLICY "Allow update for admin operations"
  ON blog_posts
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow delete operations (for removing lessons)
CREATE POLICY "Allow delete for admin operations"
  ON blog_posts
  FOR DELETE
  USING (true);
