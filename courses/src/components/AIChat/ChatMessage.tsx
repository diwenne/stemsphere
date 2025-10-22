import { Bot, User, Info } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../../services/chatService';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  const formatContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('```') && !line.endsWith('```')) {
        return null;
      }
      if (line.endsWith('```')) {
        return null;
      }

      const codeBlockMatch = content.match(/```(\w+)?\n([\s\S]*?)```/g);
      if (codeBlockMatch) {
        const parts = [];
        let lastIndex = 0;

        content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code, offset) => {
          if (offset > lastIndex) {
            parts.push(
              <span key={`text-${offset}`}>
                {content.substring(lastIndex, offset)}
              </span>
            );
          }

          parts.push(
            <div key={`code-${offset}`} className="my-2 bg-gray-900 rounded-lg overflow-hidden">
              <div className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-semibold">
                {lang || 'Code'}
              </div>
              <pre className="p-3 overflow-x-auto">
                <code className="text-sm text-gray-100 font-mono">{code}</code>
              </pre>
            </div>
          );

          lastIndex = offset + match.length;
          return match;
        });

        if (lastIndex < content.length) {
          parts.push(
            <span key={`text-end`}>
              {content.substring(lastIndex)}
            </span>
          );
        }

        return <div key={index}>{parts}</div>;
      }

      return (
        <span key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  if (isSystem) {
    return (
      <div className="flex gap-2 items-start">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Info size={16} className="text-blue-600" />
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-[85%]">
          <pre className="text-sm text-blue-900 whitespace-pre-wrap font-mono">
            {message.content}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-2 items-start ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-primary-200' : 'bg-accent-100'
        }`}
      >
        {isUser ? (
          <User size={16} className="text-primary-700" />
        ) : (
          <Bot size={16} className="text-accent-700" />
        )}
      </div>
      <div
        className={`rounded-lg p-3 max-w-[85%] ${
          isUser
            ? 'bg-primary-700 text-white'
            : 'bg-white border border-primary-200 text-primary-900'
        }`}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {formatContent(message.content)}
        </div>
      </div>
    </div>
  );
}
