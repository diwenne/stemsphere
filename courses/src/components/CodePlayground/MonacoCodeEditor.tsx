import { Editor } from '@monaco-editor/react';

interface MonacoCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  readOnly?: boolean;
  theme?: 'light' | 'dark';
}

export function MonacoCodeEditor({ value, onChange, language, readOnly = false, theme = 'dark' }: MonacoCodeEditorProps) {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  const languageMap: Record<string, string> = {
    python: 'python',
    javascript: 'javascript',
    typescript: 'typescript',
    java: 'java',
    cpp: 'cpp',
    csharp: 'csharp',
    c: 'c',
    ruby: 'ruby',
    go: 'go',
    rust: 'rust',
    php: 'php',
    swift: 'swift',
    kotlin: 'kotlin',
    r: 'r',
    perl: 'perl',
    lua: 'lua',
    bash: 'shell',
    sql: 'sql',
  };

  const monacoLanguage = languageMap[language] || 'plaintext';

  return (
    <Editor
      height="100%"
      language={monacoLanguage}
      value={value}
      onChange={handleEditorChange}
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on',
        suggestOnTriggerCharacters: true,
        quickSuggestions: {
          other: true,
          comments: false,
          strings: true,
        },
        parameterHints: {
          enabled: true,
        },
        suggest: {
          snippetsPreventQuickSuggestions: false,
          showMethods: true,
          showFunctions: true,
          showConstructors: true,
          showFields: true,
          showVariables: true,
          showClasses: true,
          showStructs: true,
          showInterfaces: true,
          showModules: true,
          showProperties: true,
          showKeywords: true,
          showSnippets: true,
        },
        snippetSuggestions: 'top',
        formatOnPaste: true,
        formatOnType: true,
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        autoIndent: 'full',
        padding: { top: 16, bottom: 16 },
        scrollbar: {
          vertical: 'visible',
          horizontal: 'visible',
          useShadows: false,
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10,
        },
      }}
    />
  );
}
