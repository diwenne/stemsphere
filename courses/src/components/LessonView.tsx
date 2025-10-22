import { Lesson } from '../lib/supabase';
import { ArrowLeft, Clock, BookOpen, ArrowRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onNextLesson?: () => void;
  hasNextLesson?: boolean;
}

export function LessonView({ lesson, onBack, onNextLesson, hasNextLesson }: LessonViewProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleBack = () => {
    onBack();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const processInlineMarkdown = (text: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    let currentText = text;
    let key = 0;

    const patterns = [
      { regex: /^(.*?)(`[^`]+`)/s, type: 'code' },
      { regex: /^(.*?)(\*\*[^*]+\*\*)/s, type: 'bold' },
      { regex: /^(.*?)(\*[^*]+\*)/s, type: 'italic' },
      { regex: /^(.*?)(^# .+$)/m, type: 'h1' },
      { regex: /^(.*?)(^## .+$)/m, type: 'h2' },
      { regex: /^(.*?)(^- .+$)/m, type: 'bullet' },
      { regex: /^(.*?)(^\d+\. .+$)/m, type: 'numbered' },
    ];

    while (currentText.length > 0) {
      let earliestMatch: { index: number; before: string; match: string; type: string } | null = null;

      for (const pattern of patterns) {
        const match = currentText.match(pattern.regex);
        if (match && (earliestMatch === null || match[1].length < earliestMatch.index)) {
          earliestMatch = {
            index: match[1].length,
            before: match[1],
            match: match[2],
            type: pattern.type,
          };
        }
      }

      if (earliestMatch) {
        if (earliestMatch.before) {
          elements.push(<span key={key++}>{earliestMatch.before}</span>);
        }

        const matchText = earliestMatch.match;
        if (earliestMatch.type === 'code') {
          const codeText = matchText.slice(1, -1);
          elements.push(
            <code key={key++} className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm font-mono">
              {codeText}
            </code>
          );
        } else if (earliestMatch.type === 'bold') {
          const boldText = matchText.slice(2, -2);
          elements.push(
            <strong key={key++} className="font-bold text-primary-900">
              {boldText}
            </strong>
          );
        } else if (earliestMatch.type === 'italic') {
          const italicText = matchText.slice(1, -1);
          elements.push(
            <em key={key++} className="italic">
              {italicText}
            </em>
          );
        } else if (earliestMatch.type === 'h1') {
          const headingText = matchText.slice(2);
          elements.push(
            <h1 key={key++} className="text-3xl font-bold text-primary-900 mb-4 mt-6 block">
              {headingText}
            </h1>
          );
        } else if (earliestMatch.type === 'h2') {
          const headingText = matchText.slice(3);
          elements.push(
            <h2 key={key++} className="text-2xl font-bold text-primary-900 mb-3 mt-5 block">
              {headingText}
            </h2>
          );
        } else if (earliestMatch.type === 'bullet') {
          const itemText = matchText.slice(2);
          elements.push(
            <li key={key++} className="ml-6 mb-2 block">
              {itemText}
            </li>
          );
        } else if (earliestMatch.type === 'numbered') {
          const itemText = matchText.replace(/^\d+\.\s*/, '');
          elements.push(
            <li key={key++} className="ml-6 mb-2 block">
              {itemText}
            </li>
          );
        }

        currentText = currentText.slice(earliestMatch.index + earliestMatch.match.length);
      } else {
        elements.push(<span key={key++}>{currentText}</span>);
        break;
      }
    }

    return elements;
  };

  const renderContent = () => {
    const content = lesson.content;
    const parts: JSX.Element[] = [];
    const combinedRegex = /```(\w+)?\n?([\s\S]*?)```|\[BOX\]([\s\S]*?)\[\/BOX\]/g;
    let lastIndex = 0;
    let match;
    let key = 0;

    const languageLabels: { [key: string]: string } = {
      python: 'Python',
      bash: 'Bash',
      java: 'Java',
      javascript: 'JavaScript',
      cpp: 'C++',
      csharp: 'C#',
      sql: 'SQL',
      html: 'HTML',
      css: 'CSS',
      json: 'JSON',
      text: 'Text',
      plaintext: 'Text',
    };

    const languageMap: { [key: string]: string } = {
      cpp: 'cpp',
      csharp: 'csharp',
      text: 'plaintext',
    };

    while ((match = combinedRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        const textContent = content.substring(lastIndex, match.index);
        parts.push(
          <div key={key++} className="whitespace-pre-wrap">
            {processInlineMarkdown(textContent)}
          </div>
        );
      }

      if (match[2] !== undefined) {
        const codeContent = match[2].trim();
        const language = match[1] || 'plaintext';
        const langLabel = languageLabels[language] || 'Code';
        const codeIndex = key;
        const hljsLang = languageMap[language] || language || 'plaintext';
        let highlightedCode;
        try {
          highlightedCode = hljs.highlight(codeContent, { language: hljsLang }).value;
        } catch (e) {
          highlightedCode = hljs.highlightAuto(codeContent).value;
        }
        parts.push(
          <div key={key++} className="my-6 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                {langLabel}
              </span>
              <button
                onClick={() => copyCode(codeContent, codeIndex)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-xs font-semibold transition-colors"
              >
                {copiedIndex === codeIndex ? (
                  <>
                    <Check size={14} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="hljs text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
          </div>
        );
      } else if (match[3] !== undefined) {
        const boxContent = match[3].trim();
        parts.push(
          <div key={key++} className="my-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg shadow-sm">
            <div className="text-primary-900 font-body whitespace-pre-wrap">{boxContent}</div>
          </div>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      const textContent = content.substring(lastIndex);
      parts.push(
        <div key={key++} className="whitespace-pre-wrap">
          {processInlineMarkdown(textContent)}
        </div>
      );
    }

    return parts;
  };

  return (
    <div className="min-h-screen bg-primary-50 pt-16">
      <div className="bg-white border-b border-primary-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={handleBack}
            className="group flex items-center gap-2 text-primary-700 hover:text-primary-800 mb-6 transition-colors font-semibold"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Lessons</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg border border-primary-200 overflow-hidden">
          <div className="relative bg-primary-700 text-white p-10 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded font-semibold border border-white/30">
                  Day {lesson.day_number}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded font-semibold border border-white/30">
                  {lesson.programming_language}
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold border border-white/30">
                  <Clock size={16} />
                  {lesson.read_time} min read
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
                {lesson.title}
              </h1>
            </div>
          </div>

          <div className="p-10 md:p-12">
            <div className="mb-10 pb-10 border-b-2 border-primary-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-200 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-primary-700" size={20} />
                </div>
                <h2 className="text-lg font-bold text-primary-900 uppercase tracking-wide">
                  What You'll Learn
                </h2>
              </div>
              <p className="text-xl text-primary-800 leading-relaxed font-body">
                {lesson.excerpt}
              </p>
            </div>

            {lesson.image_url && (
              <div className="mb-10">
                <img
                  src={lesson.image_url}
                  alt={lesson.title}
                  className="w-full h-auto rounded-lg border border-primary-200 shadow-sm"
                />
              </div>
            )}

            <div className="prose prose-xl max-w-none">
              <div className="text-primary-900 leading-relaxed text-lg font-body">
                {renderContent()}
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleBack}
            className="group flex items-center gap-2 text-primary-700 hover:text-primary-800 transition-colors font-semibold"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Lessons</span>
          </button>
          {hasNextLesson && onNextLesson && (
            <button
              onClick={onNextLesson}
              className="group flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md"
            >
              <span>Next Lesson</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
