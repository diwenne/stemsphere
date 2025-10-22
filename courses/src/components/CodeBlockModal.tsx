import { useState, useEffect, useRef } from 'react';
import { X, Code } from 'lucide-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

interface CodeBlockModalProps {
  onInsert: (code: string, language: string) => void;
  onClose: () => void;
}

export function CodeBlockModal({ onInsert, onClose }: CodeBlockModalProps) {
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const previewRef = useRef<HTMLElement>(null);

  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'bash', label: 'Bash' },
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'sql', label: 'SQL' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'json', label: 'JSON' },
    { value: 'text', label: 'Text' },
  ];

  useEffect(() => {
    if (previewRef.current && code && language) {
      const languageMap: { [key: string]: string } = {
        cpp: 'cpp',
        csharp: 'csharp',
        text: 'plaintext',
      };
      const hljsLang = languageMap[language] || language || 'plaintext';
      try {
        const highlighted = hljs.highlight(code, { language: hljsLang });
        previewRef.current.innerHTML = highlighted.value;
      } catch (e) {
        const highlighted = hljs.highlightAuto(code);
        previewRef.current.innerHTML = highlighted.value;
      }
    } else if (previewRef.current) {
      previewRef.current.textContent = code || 'Preview will appear here...';
    }
  }, [code, language]);

  const handleInsert = () => {
    if (code.trim() && language) {
      onInsert(code, language);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-primary-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Code className="text-primary-700" size={20} />
            </div>
            <h2 className="text-xl font-bold text-primary-900">Insert Code Block</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-primary-900 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 font-body"
            >
              <option value="">Select a language...</option>
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Code
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste or type your code here..."
                rows={15}
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 font-mono text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Preview
              </label>
              <div className="bg-gray-900 rounded-lg p-4 h-[360px] overflow-auto">
                <pre className="m-0">
                  <code ref={previewRef} className="hljs text-sm leading-relaxed">
                    Preview will appear here...
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-primary-200">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white border border-primary-300 text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            disabled={!code.trim() || !language}
            className="px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Code size={20} />
            Insert Code Block
          </button>
        </div>
      </div>
    </div>
  );
}
