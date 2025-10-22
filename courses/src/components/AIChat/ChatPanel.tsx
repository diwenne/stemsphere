import { useState, useEffect, useRef } from 'react';
import { X, Send, Code, Sparkles, Loader2, ChevronDown } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { CodeEditor } from './CodeEditor';
import { aiService } from '../../services/aiService';
import { codeExecutionService } from '../../services/codeExecutionService';
import { chatService } from '../../services/chatService';
import type { ChatMessage as ChatMessageType } from '../../services/chatService';

interface ChatPanelProps {
  lessonTitle?: string;
  programmingLanguage?: string;
  lessonId?: string;
}

export function ChatPanel({ lessonTitle, programmingLanguage, lessonId }: ChatPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    initializeSession();
  }, [lessonId, programmingLanguage]);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  const initializeSession = async () => {
    const storedSessionId = sessionStorage.getItem('chat_session_id');

    if (storedSessionId) {
      const session = await chatService.getSession(storedSessionId);
      if (session) {
        setSessionId(storedSessionId);
        const existingMessages = await chatService.getMessages(storedSessionId);
        setMessages(existingMessages);
        return;
      }
    }

    const newSession = await chatService.createSession(lessonId, programmingLanguage);
    if (newSession) {
      setSessionId(newSession.id);
      sessionStorage.setItem('chat_session_id', newSession.id);

      const welcomeMessage = await chatService.addMessage(
        newSession.id,
        'assistant',
        `Hi! I'm your AI programming tutor. I'm here to help you learn ${programmingLanguage || 'programming'}. You have 10 free AI questions per day. You can:\n\n• Ask me questions about programming concepts\n• Share code for me to review and provide feedback\n• Execute code directly in our chat (unlimited!)\n• Get hints when you're stuck\n\nWhat would you like to learn today?`
      );

      if (welcomeMessage) {
        setMessages([welcomeMessage]);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isBottom = scrollHeight - scrollTop - clientHeight < 50;
      setIsAtBottom(isBottom);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !sessionId || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    const userMsg = await chatService.addMessage(sessionId, 'user', userMessage);
    if (userMsg) {
      setMessages(prev => [...prev, userMsg]);
    }

    const conversationHistory = messages
      .slice(-10)
      .map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

    conversationHistory.push({ role: 'user', content: userMessage });

    const response = await aiService.getChatCompletion(conversationHistory, {
      lessonTitle,
      programmingLanguage,
    });

    const assistantMsg = await chatService.addMessage(sessionId, 'assistant', response.content);
    if (assistantMsg) {
      setMessages(prev => [...prev, assistantMsg]);
    }

    setIsLoading(false);
    setIsAtBottom(true);
  };

  const handleCodeExecution = async (code: string, language: string) => {
    if (!sessionId) return;

    setIsLoading(true);

    const executingMsg = await chatService.addMessage(
      sessionId,
      'system',
      `Executing ${language} code...`
    );
    if (executingMsg) {
      setMessages(prev => [...prev, executingMsg]);
    }

    const result = await codeExecutionService.executeCode(code, language);

    await chatService.addCodeExecution(
      sessionId,
      language,
      code,
      result.output,
      result.error,
      result.executionTime
    );

    const resultMessage = result.success
      ? `✅ Code executed successfully!\n\nOutput:\n${result.output}\n\nExecution time: ${result.executionTime}ms`
      : `❌ Execution failed\n\nError:\n${result.error}`;

    const resultMsg = await chatService.addMessage(sessionId, 'system', resultMessage, {
      codeExecution: { code, language, result },
    });

    if (resultMsg) {
      setMessages(prev => [...prev, resultMsg]);
    }

    const analysisResponse = await aiService.analyzeCode(code, language, {
      output: result.output,
      error: result.error,
      executionTime: result.executionTime,
    });

    const analysisMsg = await chatService.addMessage(sessionId, 'assistant', analysisResponse.content);
    if (analysisMsg) {
      setMessages(prev => [...prev, analysisMsg]);
    }

    setIsLoading(false);
    setShowCodeEditor(false);
    setIsAtBottom(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary-700 hover:bg-primary-800 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50 flex items-center gap-2"
          aria-label="Open AI Chat"
        >
          <Sparkles size={24} />
          <span className="font-semibold hidden sm:inline">AI Tutor</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-0 right-0 w-full sm:w-[420px] h-[600px] sm:h-[700px] bg-white shadow-2xl border-l border-t border-primary-200 z-50 flex flex-col sm:rounded-tl-2xl">
          <div className="bg-gradient-to-r from-primary-700 to-primary-800 text-white p-4 flex items-center justify-between sm:rounded-tl-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Programming Tutor</h3>
                <p className="text-xs text-primary-100">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-2 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-primary-50"
          >
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-primary-600">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {!isAtBottom && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-32 right-6 bg-white hover:bg-primary-50 p-2 rounded-full shadow-lg border border-primary-200 transition-all"
              aria-label="Scroll to bottom"
            >
              <ChevronDown size={20} className="text-primary-700" />
            </button>
          )}

          {showCodeEditor && (
            <div className="border-t border-primary-200 bg-white">
              <CodeEditor
                onExecute={handleCodeExecution}
                onClose={() => setShowCodeEditor(false)}
                defaultLanguage={programmingLanguage}
              />
            </div>
          )}

          <div className="p-4 border-t border-primary-200 bg-white">
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setShowCodeEditor(!showCodeEditor)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  showCodeEditor
                    ? 'bg-primary-700 text-white'
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                }`}
              >
                <Code size={16} />
                Code Editor
              </button>
            </div>

            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question or describe your problem..."
                className="flex-1 p-3 border border-primary-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-primary-700 hover:bg-primary-800 text-white p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
