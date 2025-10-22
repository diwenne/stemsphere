export interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
  executionTime?: number;
  language?: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export class CodeExecutionService {
  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('code_execution_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      sessionStorage.setItem('code_execution_session_id', sessionId);
    }
    return sessionId;
  }

  async executeCode(code: string, language: string): Promise<ExecutionResult> {
    const normalizedLanguage = language.toLowerCase().trim();

    if (!code.trim()) {
      return {
        success: false,
        error: 'Code cannot be empty',
        language: normalizedLanguage,
      };
    }

    try {
      const sessionId = this.getSessionId();
      const apiUrl = `${SUPABASE_URL}/functions/v1/code-execution`;

      console.log('Executing code:', { language: normalizedLanguage, codeLength: code.length, apiUrl });

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          code,
          language: normalizedLanguage,
          sessionId,
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`Execution service returned status ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('Execution result:', result);

      return {
        success: result.success,
        output: result.output,
        error: result.error,
        executionTime: result.executionTime,
        language: normalizedLanguage,
      };
    } catch (error) {
      console.error('Code execution error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown execution error occurred',
        language: normalizedLanguage,
      };
    }
  }

  private getFileName(language: string): string {
    const extensionMap: Record<string, string> = {
      python: 'main.py',
      javascript: 'main.js',
      typescript: 'main.ts',
      java: 'Main.java',
      cpp: 'main.cpp',
      'c++': 'main.cpp',
      csharp: 'Main.cs',
      'c#': 'Main.cs',
      c: 'main.c',
      ruby: 'main.rb',
      go: 'main.go',
      rust: 'main.rs',
      php: 'main.php',
      swift: 'main.swift',
      kotlin: 'Main.kt',
      r: 'main.r',
      perl: 'main.pl',
      lua: 'main.lua',
      bash: 'main.sh',
      sql: 'main.sql',
    };

    return extensionMap[language] || 'main.txt';
  }

  getSupportedLanguages(): string[] {
    return Object.keys(LANGUAGE_MAP);
  }

  isLanguageSupported(language: string): boolean {
    return language.toLowerCase() in LANGUAGE_MAP;
  }
}

export const codeExecutionService = new CodeExecutionService();
