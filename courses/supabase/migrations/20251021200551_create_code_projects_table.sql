/*
  # Create Code Projects Table for Coding Playground

  1. New Tables
    - `code_projects`
      - `id` (uuid, primary key)
      - `title` (text) - Project name
      - `description` (text) - Optional project description
      - `language` (text) - Programming language: python, javascript, scratch
      - `code` (text) - The actual code content
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `code_projects` table
    - Public can read all projects (for sharing/learning)
    - Public can create projects (anonymous users)
    - Public can update/delete projects (session-based ownership through client)

  3. Indexes
    - Add index on language for filtering projects by language
    - Add index on created_at for sorting

  4. Notes
    - Projects are publicly accessible for educational purposes
    - Session-based management handled on client side
    - Students can save their work and come back to it later
*/

CREATE TABLE IF NOT EXISTS code_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  language text NOT NULL CHECK (language IN ('python', 'javascript', 'scratch')),
  code text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE code_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read code projects"
  ON code_projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create code projects"
  ON code_projects
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update code projects"
  ON code_projects
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete code projects"
  ON code_projects
  FOR DELETE
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS idx_code_projects_language ON code_projects(language);
CREATE INDEX IF NOT EXISTS idx_code_projects_created_at ON code_projects(created_at DESC);