/*
  # Add Rate Limiting for AI Queries

  1. New Tables
    - `ai_rate_limits`
      - `id` (uuid, primary key)
      - `session_id` (text) - Browser session identifier
      - `query_count` (integer) - Number of queries made
      - `reset_at` (timestamptz) - When the counter resets
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `ai_rate_limits` table
    - Add policies for the edge function to manage rate limits
    - Public read access for checking limits (users can see their own limits)

  3. Indexes
    - Add index on session_id for fast lookups
    - Add index on reset_at for cleanup queries

  4. Notes
    - Session-based rate limiting (not user-based, since users may not be logged in)
    - Default limit: 10 queries per session per day
    - Reset_at determines when the counter resets to 0
*/

CREATE TABLE IF NOT EXISTS ai_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  query_count integer DEFAULT 0 NOT NULL,
  reset_at timestamptz DEFAULT (now() + interval '1 day') NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE ai_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read rate limits"
  ON ai_rate_limits
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role can insert rate limits"
  ON ai_rate_limits
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update rate limits"
  ON ai_rate_limits
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_ai_rate_limits_session_id ON ai_rate_limits(session_id);
CREATE INDEX IF NOT EXISTS idx_ai_rate_limits_reset_at ON ai_rate_limits(reset_at);