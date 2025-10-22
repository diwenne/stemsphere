import { useRef, useEffect } from 'react';
import { Editor, Monaco } from '@monaco-editor/react';

type IStandaloneCodeEditor = Parameters<NonNullable<Parameters<typeof Editor>[0]['onMount']>>[0];
type IRange = Parameters<IStandaloneCodeEditor['deltaDecorations']>[1][0]['range'];
type IMarkerSeverity = 0 | 1 | 2 | 4 | 8;

interface EnhancedMonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  readOnly?: boolean;
  theme?: 'light' | 'dark';
  breakpoints?: number[];
  onBreakpointToggle?: (line: number) => void;
  currentLine?: number;
  errors?: { line: number; message: string; }[];
}

export function EnhancedMonacoEditor({
  value,
  onChange,
  language,
  readOnly = false,
  theme = 'dark',
  breakpoints = [],
  onBreakpointToggle,
  currentLine,
  errors = [],
}: EnhancedMonacoEditorProps) {
  const editorRef = useRef<IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

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

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  const handleEditorDidMount = (editor: IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    if (onBreakpointToggle) {
      editor.onMouseDown((e) => {
        const target = e.target;
        if (target.type === monaco.editor.MouseTargetType.GUTTER_LINE_NUMBERS) {
          const lineNumber = target.position?.lineNumber;
          if (lineNumber) {
            onBreakpointToggle(lineNumber);
          }
        }
      });
    }
  };

  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;

    const editor = editorRef.current;
    const monaco = monacoRef.current;

    const decorations: string[] = [];

    if (breakpoints.length > 0) {
      const breakpointDecorations = breakpoints.map(line => ({
        range: new monaco.Range(line, 1, line, 1),
        options: {
          isWholeLine: true,
          glyphMarginClassName: 'breakpoint-glyph',
          glyphMarginHoverMessage: { value: 'Breakpoint' },
        },
      }));
      decorations.push(...editor.deltaDecorations([], breakpointDecorations));
    }

    if (currentLine !== undefined) {
      const currentLineDecoration = [{
        range: new monaco.Range(currentLine, 1, currentLine, 1),
        options: {
          isWholeLine: true,
          className: 'current-line-highlight',
          glyphMarginClassName: 'current-line-glyph',
        },
      }];
      decorations.push(...editor.deltaDecorations([], currentLineDecoration));
    }

    if (errors.length > 0) {
      const errorDecorations = errors.map(error => ({
        range: new monaco.Range(error.line, 1, error.line, Number.MAX_VALUE),
        options: {
          isWholeLine: true,
          className: 'error-line',
          glyphMarginClassName: 'error-glyph',
          hoverMessage: { value: error.message },
        },
      }));
      decorations.push(...editor.deltaDecorations([], errorDecorations));

      const model = editor.getModel();
      if (model) {
        monaco.editor.setModelMarkers(model, 'syntax', errors.map(error => ({
          startLineNumber: error.line,
          startColumn: 1,
          endLineNumber: error.line,
          endColumn: Number.MAX_VALUE,
          message: error.message,
          severity: monaco.MarkerSeverity.Error,
        })));
      }
    }

    return () => {
      if (decorations.length > 0) {
        editor.deltaDecorations(decorations, []);
      }
    };
  }, [breakpoints, currentLine, errors]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .breakpoint-glyph {
        background: #e53e3e;
        border-radius: 50%;
        width: 12px !important;
        height: 12px !important;
        margin-left: 4px !important;
        margin-top: 4px !important;
      }
      .current-line-highlight {
        background: rgba(255, 235, 59, 0.2);
      }
      .current-line-glyph {
        background: #fbbf24;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 10px solid #fbbf24;
        margin-left: 4px !important;
        margin-top: 4px !important;
      }
      .error-line {
        background: rgba(239, 68, 68, 0.1);
      }
      .error-glyph {
        background: #ef4444;
        border-radius: 50%;
        width: 12px !important;
        height: 12px !important;
        margin-left: 4px !important;
        margin-top: 4px !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Editor
      height="100%"
      language={monacoLanguage}
      value={value}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
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
        glyphMargin: true,
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
