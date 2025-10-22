import { supabase } from '../lib/supabase';

export interface ChatSession {
  id: string;
  created_at: string;
  last_activity: string;
  lesson_id?: string;
  programming_language?: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface CodeExecution {
  id: string;
  session_id: string;
  message_id?: string;
  language: string;
  code: string;
  output?: string;
  error?: string;
  execution_time_ms?: number;
  created_at: string;
}

export class ChatService {
  async createSession(lessonId?: string, programmingLanguage?: string): Promise<ChatSession | null> {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({
          lesson_id: lessonId,
          programming_language: programmingLanguage,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating session:', error);
      return null;
    }
  }

  async getSession(sessionId: string): Promise<ChatSession | null> {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select()
        .eq('id', sessionId)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }

  async updateSessionActivity(sessionId: string): Promise<void> {
    try {
      await supabase
        .from('chat_sessions')
        .update({ last_activity: new Date().toISOString() })
        .eq('id', sessionId);
    } catch (error) {
      console.error('Error updating session activity:', error);
    }
  }

  async addMessage(
    sessionId: string,
    role: 'user' | 'assistant' | 'system',
    content: string,
    metadata?: Record<string, any>
  ): Promise<ChatMessage | null> {
    try {
      await this.updateSessionActivity(sessionId);

      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          role,
          content,
          metadata: metadata || {},
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding message:', error);
      return null;
    }
  }

  async getMessages(sessionId: string, limit: number = 20): Promise<ChatMessage[]> {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select()
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  }

  async addCodeExecution(
    sessionId: string,
    language: string,
    code: string,
    output?: string,
    error?: string,
    executionTimeMs?: number,
    messageId?: string
  ): Promise<CodeExecution | null> {
    try {
      const { data, error: dbError } = await supabase
        .from('code_executions')
        .insert({
          session_id: sessionId,
          message_id: messageId,
          language,
          code,
          output,
          error,
          execution_time_ms: executionTimeMs,
        })
        .select()
        .single();

      if (dbError) throw dbError;
      return data;
    } catch (error) {
      console.error('Error adding code execution:', error);
      return null;
    }
  }

  async getRecentExecutions(sessionId: string, limit: number = 10): Promise<CodeExecution[]> {
    try {
      const { data, error } = await supabase
        .from('code_executions')
        .select()
        .eq('session_id', sessionId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting code executions:', error);
      return [];
    }
  }
}

export const chatService = new ChatService();
