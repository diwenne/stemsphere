import { useState, useEffect } from 'react';
import { Bot, X, Lightbulb, AlertCircle } from 'lucide-react';
import { aiService } from '../../services/aiService';

interface ErrorInfo {
  line: number;
  message: string;
  code?: string;
}

interface ErrorAssistantProps {
  error: ErrorInfo | null;
  language: string;
  onClose: () => void;
}

export function ErrorAssistant({ error, language, onClose }: ErrorAssistantProps) {
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      explainError();
    }
  }, [error]);

  const explainError = async () => {
    if (!error) return;

    setIsLoading(true);
    try {
      const prompt = `You are a friendly coding tutor helping a student understand an error.

Language: ${language}
Error on line ${error.line}: ${error.message}
${error.code ? `Code: ${error.code}` : ''}

Explain:
1. What this error means in simple terms
2. Why it happened
3. How to fix it with a specific example

Keep it brief, friendly, and educational. Use simple language for beginners.`;

      const response = await aiService.getChatResponse(prompt, []);
      setExplanation(response);
    } catch (err) {
      setExplanation('I had trouble explaining this error. Here\'s what I know: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!error) return null;

  return (
    <div className="fixed right-6 bottom-6 w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 animate-slide-in overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Bot size={22} className="animate-pulse" />
          </div>
          <div>
            <span className="font-bold text-lg">Code Assistant</span>
            <p className="text-xs text-blue-100">AI-powered error helper</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-3 mb-4 p-4 bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200 rounded-xl">
          <div className="bg-red-100 p-2 rounded-lg">
            <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-red-900 mb-2">
              Error on Line {error.line}
            </div>
            <div className="text-xs text-red-800 font-mono bg-red-50 p-2 rounded border border-red-200">
              {error.message}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-3 text-slate-600 py-8 justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-3 border-blue-500 border-t-transparent"></div>
            <span className="text-sm font-medium">Analyzing error...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Lightbulb size={18} className="text-blue-600 flex-shrink-0" />
              </div>
              <div className="text-sm text-slate-800 leading-relaxed flex-1">
                {explanation.split('\n').map((line, i) => (
                  <p key={i} className="mb-2 last:mb-0">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <button
              onClick={explainError}
              className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-medium"
            >
              <Bot size={16} />
              Explain differently
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
