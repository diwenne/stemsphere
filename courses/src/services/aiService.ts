export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  error?: string;
  remainingQueries?: number;
  resetAt?: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const AI_PROXY_URL = `${SUPABASE_URL}/functions/v1/ai-proxy`;

export class AIService {
  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('ai_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('ai_session_id', sessionId);
    }
    return sessionId;
  }

  async getChatCompletion(
    messages: ChatMessage[],
    context?: {
      lessonTitle?: string;
      programmingLanguage?: string;
      executionResult?: {
        output?: string;
        error?: string;
        executionTime?: number;
      };
    }
  ): Promise<AIResponse> {
    try {
      const sessionId = this.getSessionId();

      const response = await fetch(AI_PROXY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          messages,
          sessionId,
          context,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          return {
            content: data.message || 'Rate limit exceeded. Please try again later.',
            error: 'rate_limit_exceeded',
            remainingQueries: data.remainingQueries || 0,
            resetAt: data.resetAt,
          };
        }

        throw new Error(data.error || `API request failed: ${response.statusText}`);
      }

      return {
        content: data.content || 'No response generated',
        remainingQueries: data.remainingQueries,
        resetAt: data.resetAt,
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async analyzeCode(
    code: string,
    language: string,
    executionResult?: {
      output?: string;
      error?: string;
      executionTime?: number;
    }
  ): Promise<AIResponse> {
    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: `Please analyze this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n${
          executionResult?.error
            ? `The code failed with this error:\n${executionResult.error}\n\nPlease explain the error and provide hints to fix it.`
            : executionResult?.output
            ? `The code executed successfully with this output:\n${executionResult.output}\n\nExecution time: ${executionResult.executionTime}ms\n\nPlease provide feedback and suggest any improvements.`
            : 'Please review this code and provide feedback.'
        }`,
      },
    ];

    return this.getChatCompletion(messages, { programmingLanguage: language, executionResult });
  }

  isConfigured(): boolean {
    return true;
  }
}

export const aiService = new AIService();
