import { useState } from 'react';
import { Play, X } from 'lucide-react';

interface CodeEditorProps {
  onExecute: (code: string, language: string) => void;
  onClose: () => void;
  defaultLanguage?: string;
}

const LANGUAGES = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'c', label: 'C' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
];

const DEFAULT_CODE_TEMPLATES: Record<string, string> = {
  python: '# Write your Python code here\nprint("Hello, World!")',
  javascript: '// Write your JavaScript code here\nconsole.log("Hello, World!");',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
  csharp: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  typescript: '// Write your TypeScript code here\nconsole.log("Hello, World!");',
  go: 'package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
  rust: 'fn main() {\n    println!("Hello, World!");\n}',
  ruby: '# Write your Ruby code here\nputs "Hello, World!"',
  php: '<?php\necho "Hello, World!\\n";\n?>',
  swift: 'import Foundation\nprint("Hello, World!")',
  kotlin: 'fun main() {\n    println("Hello, World!")\n}',
};

export function CodeEditor({ onExecute, onClose, defaultLanguage }: CodeEditorProps) {
  const initialLanguage = defaultLanguage?.toLowerCase() || 'python';
  const [code, setCode] = useState(DEFAULT_CODE_TEMPLATES[initialLanguage] || DEFAULT_CODE_TEMPLATES.python);
  const [language, setLanguage] = useState(initialLanguage);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(DEFAULT_CODE_TEMPLATES[newLanguage] || '// Write your code here');
  };

  const handleExecute = () => {
    if (code.trim()) {
      onExecute(code, language);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="p-4 bg-gray-50 border-t border-primary-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-primary-900">Language:</label>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="px-3 py-1 border border-primary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onClose}
          className="text-primary-600 hover:text-primary-800 p-1"
          aria-label="Close code editor"
        >
          <X size={20} />
        </button>
      </div>

      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-48 p-3 font-mono text-sm border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white resize-none"
          placeholder="Write your code here..."
          spellCheck={false}
        />
      </div>

      <div className="flex justify-end mt-3">
        <button
          onClick={handleExecute}
          disabled={!code.trim()}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={18} />
          Run Code
        </button>
      </div>
    </div>
  );
}
