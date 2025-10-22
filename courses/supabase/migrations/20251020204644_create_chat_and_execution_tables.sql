/*
  # Create AI Chat and Code Execution Tables

  ## Overview
  This migration creates tables to support the AI learning assistant feature,
  including chat history and code execution tracking.

  ## New Tables
  
  ### `chat_sessions`
  Stores chat session metadata for continuity across page refreshes
  - `id` (uuid, primary key) - Unique session identifier
  - `created_at` (timestamptz) - When the session was created
  - `last_activity` (timestamptz) - Last message timestamp
  - `lesson_id` (uuid, nullable) - Associated lesson if chat started from lesson context
  - `programming_language` (text, nullable) - Language context for the session
  
  ### `chat_messages`
  Stores individual chat messages for conversation history
  - `id` (uuid, primary key) - Unique message identifier
  - `session_id` (uuid, foreign key) - References chat_sessions
  - `role` (text) - Message role: 'user', 'assistant', or 'system'
  - `content` (text) - Message content
  - `created_at` (timestamptz) - Message timestamp
  - `metadata` (jsonb, nullable) - Additional metadata (code blocks, execution results, etc.)
  
  ### `code_executions`
  Tracks code execution attempts for learning analytics
  - `id` (uuid, primary key) - Unique execution identifier
  - `session_id` (uuid, foreign key) - References chat_sessions
  - `message_id` (uuid, foreign key, nullable) - References chat_messages
  - `language` (text) - Programming language used
  - `code` (text) - Code that was executed
  - `output` (text, nullable) - Execution output
  - `error` (text, nullable) - Error message if execution failed
  - `execution_time_ms` (integer, nullable) - Execution duration in milliseconds
  - `created_at` (timestamptz) - Execution timestamp
  
  ## Security
  - Enable RLS on all tables
  - All tables are publicly readable (for educational content)
  - All tables are publicly writable (anonymous users can learn)
  - This is appropriate for an educational platform where users don't need accounts
  
  ## Notes
  - Sessions auto-expire after 24 hours of inactivity (handled by application logic)
  - Chat history limited to last 20 messages per session (handled by application logic)
  - No authentication required to allow seamless learning experience
*/

-- Create chat_sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  last_activity timestamptz DEFAULT now(),
  lesson_id uuid,
  programming_language text
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Create code_executions table
CREATE TABLE IF NOT EXISTS code_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE,
  message_id uuid REFERENCES chat_messages(id) ON DELETE SET NULL,
  language text NOT NULL,
  code text NOT NULL,
  output text,
  error text,
  execution_time_ms integer,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_code_executions_session_id ON code_executions(session_id);
CREATE INDEX IF NOT EXISTS idx_code_executions_created_at ON code_executions(created_at);

-- Enable Row Level Security
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_executions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (educational platform - no auth required)
CREATE POLICY "Anyone can create chat sessions"
  ON chat_sessions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read chat sessions"
  ON chat_sessions FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update chat sessions"
  ON chat_sessions FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can create chat messages"
  ON chat_messages FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read chat messages"
  ON chat_messages FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can create code executions"
  ON code_executions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read code executions"
  ON code_executions FOR SELECT
  TO anon
  USING (true);