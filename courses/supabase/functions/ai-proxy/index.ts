import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const QUERIES_PER_SESSION = 10;

interface ChatMessage {
  role: string;
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  sessionId: string;
  context?: {
    lessonTitle?: string;
    programmingLanguage?: string;
  };
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

    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { messages, sessionId, context }: RequestBody = await req.json();

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: "Session ID is required" }),
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

    const { data: rateLimit, error: rateLimitError } = await supabaseClient
      .from("ai_rate_limits")
      .select("*")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (rateLimitError && rateLimitError.code !== "PGRST116") {
      console.error("Rate limit check error:", rateLimitError);
      return new Response(
        JSON.stringify({ error: "Failed to check rate limit" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const now = new Date();

    if (rateLimit) {
      const resetAt = new Date(rateLimit.reset_at);

      if (now > resetAt) {
        await supabaseClient
          .from("ai_rate_limits")
          .update({
            query_count: 1,
            reset_at: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
            updated_at: now.toISOString(),
          })
          .eq("session_id", sessionId);
      } else if (rateLimit.query_count >= QUERIES_PER_SESSION) {
        const hoursUntilReset = Math.ceil(
          (resetAt.getTime() - now.getTime()) / (1000 * 60 * 60)
        );
        return new Response(
          JSON.stringify({
            error: "Rate limit exceeded",
            message: `You've reached your limit of ${QUERIES_PER_SESSION} AI queries per day. Your limit will reset in ${hoursUntilReset} hours. You can still use the code execution feature!`,
            remainingQueries: 0,
            resetAt: resetAt.toISOString(),
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      } else {
        await supabaseClient
          .from("ai_rate_limits")
          .update({
            query_count: rateLimit.query_count + 1,
            updated_at: now.toISOString(),
          })
          .eq("session_id", sessionId);
      }
    } else {
      await supabaseClient.from("ai_rate_limits").insert({
        session_id: sessionId,
        query_count: 1,
        reset_at: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      });
    }

    const systemMessage = {
      role: "system",
      content: `You are a friendly and helpful programming tutor. You help students learn to code by:
- Explaining concepts in simple terms
- Providing clear examples
- Encouraging them to try things themselves
- Offering hints rather than complete solutions when appropriate
- Being patient and supportive

${context?.lessonTitle ? `Current lesson: ${context.lessonTitle}` : ""}
${context?.programmingLanguage ? `Programming language: ${context.programmingLanguage}` : ""}

Keep your responses concise and focused on helping the student learn.`,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    const { data: updatedLimit } = await supabaseClient
      .from("ai_rate_limits")
      .select("query_count, reset_at")
      .eq("session_id", sessionId)
      .single();

    return new Response(
      JSON.stringify({
        content: aiResponse,
        remainingQueries: QUERIES_PER_SESSION - (updatedLimit?.query_count || 0),
        resetAt: updatedLimit?.reset_at,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});