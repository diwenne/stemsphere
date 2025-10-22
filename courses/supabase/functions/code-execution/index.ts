import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

interface ExecutionRequest {
  code: string;
  language: string;
  sessionId: string;
}

const LANGUAGE_MAP: Record<string, { language: string; version: string }> = {
  python: { language: "python", version: "3.10.0" },
  javascript: { language: "javascript", version: "18.15.0" },
  java: { language: "java", version: "15.0.2" },
  cpp: { language: "c++", version: "10.2.0" },
  "c++": { language: "c++", version: "10.2.0" },
  csharp: { language: "csharp", version: "6.12.0" },
  "c#": { language: "csharp", version: "6.12.0" },
  c: { language: "c", version: "10.2.0" },
  ruby: { language: "ruby", version: "3.0.1" },
  go: { language: "go", version: "1.16.2" },
  rust: { language: "rust", version: "1.68.2" },
  typescript: { language: "typescript", version: "5.0.3" },
  php: { language: "php", version: "8.2.3" },
  swift: { language: "swift", version: "5.3.3" },
  kotlin: { language: "kotlin", version: "1.8.20" },
  r: { language: "r", version: "4.1.1" },
  perl: { language: "perl", version: "5.36.0" },
  lua: { language: "lua", version: "5.4.4" },
  bash: { language: "bash", version: "5.2.0" },
  sql: { language: "sqlite3", version: "3.36.0" },
};

function getFileName(language: string): string {
  const extensionMap: Record<string, string> = {
    python: "main.py",
    javascript: "main.js",
    typescript: "main.ts",
    java: "Main.java",
    cpp: "main.cpp",
    "c++": "main.cpp",
    csharp: "Main.cs",
    "c#": "Main.cs",
    c: "main.c",
    ruby: "main.rb",
    go: "main.go",
    rust: "main.rs",
    php: "main.php",
    swift: "main.swift",
    kotlin: "Main.kt",
    r: "main.r",
    perl: "main.pl",
    lua: "main.lua",
    bash: "main.sh",
    sql: "main.sql",
  };

  return extensionMap[language] || "main.txt";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { code, language, sessionId }: ExecutionRequest = await req.json();

    if (!code || !language || !sessionId) {
      return new Response(
        JSON.stringify({ error: "Code, language, and sessionId are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const normalizedLanguage = language.toLowerCase().trim();
    const pistonConfig = LANGUAGE_MAP[normalizedLanguage];

    if (!pistonConfig) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Language "${language}" is not supported`,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    await supabaseClient.from("code_executions").insert({
      session_id: sessionId,
      language: normalizedLanguage,
      code: code.substring(0, 1000),
      success: null,
    });

    const startTime = Date.now();

    const pistonResponse = await fetch(PISTON_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: pistonConfig.language,
        version: pistonConfig.version,
        files: [
          {
            name: getFileName(normalizedLanguage),
            content: code,
          },
        ],
        stdin: "",
        args: [],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      }),
    });

    const executionTime = Date.now() - startTime;

    if (!pistonResponse.ok) {
      const errorText = await pistonResponse.text();
      console.error("Piston API error:", errorText);

      await supabaseClient.from("code_executions").insert({
        session_id: sessionId,
        language: normalizedLanguage,
        code: code.substring(0, 1000),
        success: false,
        output: null,
        error: `Execution service error: ${pistonResponse.status}`,
        execution_time_ms: executionTime,
      });

      return new Response(
        JSON.stringify({
          success: false,
          error: `Execution service returned status ${pistonResponse.status}`,
          executionTime,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const result = await pistonResponse.json();

    if (result.compile && result.compile.code !== 0) {
      const compileError = result.compile.stderr || result.compile.output || "Compilation failed";

      await supabaseClient.from("code_executions").insert({
        session_id: sessionId,
        language: normalizedLanguage,
        code: code.substring(0, 1000),
        success: false,
        output: null,
        error: compileError,
        execution_time_ms: executionTime,
      });

      return new Response(
        JSON.stringify({
          success: false,
          error: compileError,
          executionTime,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (result.run.code !== 0) {
      const runtimeError = result.run.stderr || result.run.output || "Runtime error occurred";
      const output = result.run.stdout || "";

      await supabaseClient.from("code_executions").insert({
        session_id: sessionId,
        language: normalizedLanguage,
        code: code.substring(0, 1000),
        success: false,
        output: output,
        error: runtimeError,
        execution_time_ms: executionTime,
      });

      return new Response(
        JSON.stringify({
          success: false,
          output: output,
          error: runtimeError,
          executionTime,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const output = result.run.stdout || result.run.output || "(No output)";

    await supabaseClient.from("code_executions").insert({
      session_id: sessionId,
      language: normalizedLanguage,
      code: code.substring(0, 1000),
      success: true,
      output: output,
      error: null,
      execution_time_ms: executionTime,
    });

    return new Response(
      JSON.stringify({
        success: true,
        output: output,
        executionTime,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
