/*
  # Expand Supported Languages for Code Projects

  1. Changes
    - Update language constraint to include all 17 supported languages
    - Previously supported: python, javascript, scratch
    - Now adding: typescript, java, cpp, csharp, c, ruby, go, rust, php, swift, kotlin, r, perl, lua, bash, sql

  2. Languages Supported
    - Python - General purpose programming
    - JavaScript - Web development
    - TypeScript - Typed JavaScript
    - Java - Enterprise applications
    - C++ - System programming
    - C# - .NET applications
    - C - Low-level programming
    - Ruby - Web development
    - Go - Cloud services
    - Rust - System programming
    - PHP - Web development
    - Swift - iOS development
    - Kotlin - Android development
    - R - Statistical computing
    - Perl - Text processing
    - Lua - Embedded scripting
    - Bash - Shell scripting
    - SQL - Database queries
    - Scratch - Block-based visual programming

  3. Note
    - This expands the educational platform to support a wider range of programming languages
    - Backend execution already supports all these languages via Piston API
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'code_projects_language_check'
    AND table_name = 'code_projects'
  ) THEN
    ALTER TABLE code_projects DROP CONSTRAINT code_projects_language_check;
  END IF;
END $$;

ALTER TABLE code_projects ADD CONSTRAINT code_projects_language_check
  CHECK (language IN (
    'python', 'javascript', 'typescript', 'java', 'cpp', 'csharp', 'c',
    'ruby', 'go', 'rust', 'php', 'swift', 'kotlin', 'r', 'perl',
    'lua', 'bash', 'sql', 'scratch'
  ));
