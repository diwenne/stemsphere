import { useState, useEffect } from 'react';
import { Play, Save, FolderOpen, Plus, Trash2, Code2, Share2, Copy, Check, BookOpen, ChevronDown, ChevronUp, FileText, Settings, Download, RotateCcw, Type, History, Eye, Wand2 } from 'lucide-react';
import { EnhancedMonacoEditor } from './EnhancedMonacoEditor';
import { BlocklyEditor } from './BlocklyEditor';
import { DebuggerPanel } from './DebuggerPanel';
import { ErrorAssistant } from './ErrorAssistant';
import { codeExecutionService } from '../../services/codeExecutionService';
import { projectService, CodeProject } from '../../services/projectService';
import { codeFormatterService } from '../../services/codeFormatterService';
import { parseExecutionError } from '../../utils/errorParser';

type Language = 'python' | 'javascript' | 'typescript' | 'java' | 'cpp' | 'csharp' | 'c' | 'ruby' | 'go' | 'rust' | 'php' | 'swift' | 'kotlin' | 'r' | 'perl' | 'lua' | 'bash' | 'sql' | 'scratch';
type CellType = 'code' | 'markdown';

interface CodeCell {
  id: string;
  type: CellType;
  content: string;
  output?: string;
  isRunning?: boolean;
  executionTime?: number;
  error?: string;
  errorLine?: number;
}

interface ExecutionHistoryItem {
  timestamp: Date;
  code: string;
  output: string;
  success: boolean;
  executionTime: number;
}

const CODE_EXAMPLES: Record<string, Record<string, string>> = {
  python: {
    'Hello World': '# Hello World in Python\nprint("Hello, World!")',
    'Variables & Math': '# Variables and Math Operations\nx = 10\ny = 5\nsum = x + y\ndifference = x - y\nproduct = x * y\n\nprint(f"Sum: {sum}")\nprint(f"Difference: {difference}")\nprint(f"Product: {product}")',
    'Lists & Loops': '# Working with Lists\nfruits = ["apple", "banana", "cherry", "date"]\n\nprint("My favorite fruits:")\nfor fruit in fruits:\n    print(f"- {fruit}")\n\n# List operations\nfruits.append("elderberry")\nprint(f"\\nTotal fruits: {len(fruits)}")',
    'Functions': '# Functions in Python\ndef greet(name):\n    return f"Hello, {name}!"\n\ndef calculate_area(radius):\n    pi = 3.14159\n    return pi * radius ** 2\n\nprint(greet("Alice"))\nprint(f"Circle area: {calculate_area(5)}")',
    'Conditionals': '# If-Else Statements\nage = 15\n\nif age >= 18:\n    print("You are an adult")\nelif age >= 13:\n    print("You are a teenager")\nelse:\n    print("You are a child")\n\n# Check even or odd\nnum = 7\nif num % 2 == 0:\n    print(f"{num} is even")\nelse:\n    print(f"{num} is odd")',
  },
  javascript: {
    'Hello World': '// Hello World in JavaScript\nconsole.log("Hello, World!");',
    'Variables & Math': '// Variables and Math Operations\nconst x = 10;\nconst y = 5;\nconst sum = x + y;\nconst difference = x - y;\nconst product = x * y;\n\nconsole.log(`Sum: ${sum}`);\nconsole.log(`Difference: ${difference}`);\nconsole.log(`Product: ${product}`);',
    'Arrays & Loops': '// Working with Arrays\nconst fruits = ["apple", "banana", "cherry", "date"];\n\nconsole.log("My favorite fruits:");\nfruits.forEach(fruit => {\n    console.log(`- ${fruit}`);\n});\n\n// Array operations\nfruits.push("elderberry");\nconsole.log(`\\nTotal fruits: ${fruits.length}`);',
    'Functions': '// Functions in JavaScript\nfunction greet(name) {\n    return `Hello, ${name}!`;\n}\n\nfunction calculateArea(radius) {\n    const pi = 3.14159;\n    return pi * radius ** 2;\n}\n\nconsole.log(greet("Alice"));\nconsole.log(`Circle area: ${calculateArea(5)}`);',
    'Conditionals': '// If-Else Statements\nconst age = 15;\n\nif (age >= 18) {\n    console.log("You are an adult");\n} else if (age >= 13) {\n    console.log("You are a teenager");\n} else {\n    console.log("You are a child");\n}\n\n// Check even or odd\nconst num = 7;\nif (num % 2 === 0) {\n    console.log(`${num} is even`);\n} else {\n    console.log(`${num} is odd`);\n}',
  },
  typescript: {
    'Hello World': '// Hello World in TypeScript\nconsole.log("Hello, World!");',
    'Types & Interfaces': '// TypeScript Types\ninterface Person {\n  name: string;\n  age: number;\n}\n\nconst greet = (person: Person): string => {\n  return `Hello, ${person.name}!`;\n};\n\nconst user: Person = { name: "Alice", age: 25 };\nconsole.log(greet(user));',
  },
  java: {
    'Hello World': '// Hello World in Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    'Variables': '// Java Variables\npublic class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        int y = 5;\n        System.out.println("Sum: " + (x + y));\n    }\n}',
  },
  cpp: {
    'Hello World': '// Hello World in C++\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    'Variables': '// C++ Variables\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 10;\n    int y = 5;\n    cout << "Sum: " << (x + y) << endl;\n    return 0;\n}',
  },
  ruby: {
    'Hello World': '# Hello World in Ruby\nputs "Hello, World!"',
    'Variables': '# Ruby Variables\nx = 10\ny = 5\nputs "Sum: #{x + y}"',
  },
  go: {
    'Hello World': '// Hello World in Go\npackage main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
    'Variables': '// Go Variables\npackage main\nimport "fmt"\n\nfunc main() {\n    x := 10\n    y := 5\n    fmt.Printf("Sum: %d\\n", x+y)\n}',
  },
  rust: {
    'Hello World': '// Hello World in Rust\nfn main() {\n    println!("Hello, World!");\n}',
    'Variables': '// Rust Variables\nfn main() {\n    let x = 10;\n    let y = 5;\n    println!("Sum: {}", x + y);\n}',
  },
};

const DEFAULT_CODE: Record<string, string> = {
  python: CODE_EXAMPLES.python?.['Hello World'] || '# Python code',
  javascript: CODE_EXAMPLES.javascript?.['Hello World'] || '// JavaScript code',
  typescript: CODE_EXAMPLES.typescript?.['Hello World'] || '// TypeScript code',
  java: CODE_EXAMPLES.java?.['Hello World'] || '// Java code',
  cpp: CODE_EXAMPLES.cpp?.['Hello World'] || '// C++ code',
  csharp: '// C# Hello World\nusing System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  c: '// C Hello World\n#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  ruby: CODE_EXAMPLES.ruby?.['Hello World'] || '# Ruby code',
  go: CODE_EXAMPLES.go?.['Hello World'] || '// Go code',
  rust: CODE_EXAMPLES.rust?.['Hello World'] || '// Rust code',
  php: '<?php\n// PHP Hello World\necho "Hello, World!";\n?>',
  swift: '// Swift Hello World\nprint("Hello, World!")',
  kotlin: '// Kotlin Hello World\nfun main() {\n    println("Hello, World!")\n}',
  r: '# R Hello World\nprint("Hello, World!")',
  perl: '# Perl Hello World\nprint "Hello, World!\\n";',
  lua: '-- Lua Hello World\nprint("Hello, World!")',
  bash: '# Bash Hello World\necho "Hello, World!"',
  sql: '-- SQL Hello World\nSELECT "Hello, World!";',
  scratch: '',
};

const LANGUAGE_EXTENSIONS: Record<string, string> = {
  python: 'py',
  javascript: 'js',
  typescript: 'ts',
  java: 'java',
  cpp: 'cpp',
  csharp: 'cs',
  c: 'c',
  ruby: 'rb',
  go: 'go',
  rust: 'rs',
  php: 'php',
  swift: 'swift',
  kotlin: 'kt',
  r: 'r',
  perl: 'pl',
  lua: 'lua',
  bash: 'sh',
  sql: 'sql',
  scratch: 'txt',
};

export function CodePlayground() {
  const [language, setLanguage] = useState<Language>('python');
  const [cells, setCells] = useState<CodeCell[]>([
    { id: '1', type: 'code', content: DEFAULT_CODE.python }
  ]);
  const [blocklyXml, setBlocklyXml] = useState('');
  const [currentProject, setCurrentProject] = useState<CodeProject | null>(null);
  const [myProjects, setMyProjects] = useState<CodeProject[]>([]);
  const [showProjects, setShowProjects] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [projectTitle, setProjectTitle] = useState('Untitled Project');
  const [shareUrl, setShareUrl] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [executionHistory, setExecutionHistory] = useState<ExecutionHistoryItem[]>([]);
  const [breakpoints, setBreakpoints] = useState<number[]>([]);
  const [isDebugging, setIsDebugging] = useState(false);
  const [currentDebugLine, setCurrentDebugLine] = useState<number | undefined>();
  const [debugVariables, setDebugVariables] = useState<{ name: string; value: string; type: string; }[]>([]);
  const [debugCallStack, setDebugCallStack] = useState<string[]>([]);
  const [currentError, setCurrentError] = useState<{ line: number; message: string; code?: string; } | null>(null);

  useEffect(() => {
    loadMyProjects();

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveProject();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunAllCells();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cells, projectTitle, language, currentProject, blocklyXml]);

  useEffect(() => {
    if (currentProject) {
      setLanguage(currentProject.language);
      const savedCells = JSON.parse(currentProject.code);
      setCells(savedCells);
      setProjectTitle(currentProject.title);
      if (currentProject.language === 'scratch') {
        setBlocklyXml(currentProject.code);
      }
    }
  }, [currentProject]);

  const loadMyProjects = async () => {
    const projects = await projectService.getMyProjects();
    setMyProjects(projects);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setCells([{ id: '1', type: 'code', content: DEFAULT_CODE[newLanguage] }]);
    setCurrentProject(null);
    setProjectTitle('Untitled Project');
  };

  const addCell = (type: CellType = 'code') => {
    const newCell: CodeCell = {
      id: Date.now().toString(),
      type,
      content: type === 'code' ? '' : '# Write markdown here',
    };
    setCells([...cells, newCell]);
  };

  const deleteCell = (cellId: string) => {
    if (cells.length === 1) {
      showNotification('Must have at least one cell');
      return;
    }
    setCells(cells.filter(cell => cell.id !== cellId));
  };

  const updateCellContent = (cellId: string, content: string) => {
    setCells(cells.map(cell =>
      cell.id === cellId ? { ...cell, content } : cell
    ));
  };

  const moveCellUp = (cellId: string) => {
    const index = cells.findIndex(c => c.id === cellId);
    if (index > 0) {
      const newCells = [...cells];
      [newCells[index - 1], newCells[index]] = [newCells[index], newCells[index - 1]];
      setCells(newCells);
    }
  };

  const moveCellDown = (cellId: string) => {
    const index = cells.findIndex(c => c.id === cellId);
    if (index < cells.length - 1) {
      const newCells = [...cells];
      [newCells[index], newCells[index + 1]] = [newCells[index + 1], newCells[index]];
      setCells(newCells);
    }
  };

  const handleBreakpointToggle = (line: number) => {
    setBreakpoints(prev =>
      prev.includes(line) ? prev.filter(l => l !== line) : [...prev, line]
    );
  };

  const handleStartDebug = () => {
    setIsDebugging(true);
    setCurrentDebugLine(1);
    setDebugVariables([]);
    setDebugCallStack(['main()']);
    showNotification('Debug mode activated');
  };

  const handleStopDebug = () => {
    setIsDebugging(false);
    setCurrentDebugLine(undefined);
    setDebugVariables([]);
    setDebugCallStack([]);
    showNotification('Debug mode stopped');
  };

  const handleStepOver = () => {
    if (currentDebugLine !== undefined) {
      setCurrentDebugLine(prev => (prev || 0) + 1);
    }
  };

  const handleStepInto = () => {
    if (currentDebugLine !== undefined) {
      setCurrentDebugLine(prev => (prev || 0) + 1);
    }
  };

  const handleStepOut = () => {
    if (currentDebugLine !== undefined) {
      setCurrentDebugLine(prev => (prev || 0) + 1);
    }
  };

  const handleFormatCode = (cellId: string) => {
    const cell = cells.find(c => c.id === cellId);
    if (!cell || cell.type !== 'code') return;

    const formatted = codeFormatterService.formatCode(cell.content, language);
    updateCellContent(cellId, formatted);
    showNotification('Code formatted');
  };

  const handleRunCell = async (cellId: string) => {
    const cell = cells.find(c => c.id === cellId);
    if (!cell || cell.type !== 'code') return;

    setCells(cells.map(c =>
      c.id === cellId ? { ...c, isRunning: true, output: 'Running code...', error: undefined, errorLine: undefined } : c
    ));

    try {
      const result = await codeExecutionService.executeCode(cell.content, language);

      const historyItem: ExecutionHistoryItem = {
        timestamp: new Date(),
        code: cell.content,
        output: result.output || result.error || '',
        success: result.success,
        executionTime: result.executionTime || 0,
      };
      setExecutionHistory([historyItem, ...executionHistory]);

      if (!result.success && result.error) {
        const parsedError = parseExecutionError(result.error, language);
        if (parsedError) {
          setCurrentError({
            line: parsedError.line,
            message: parsedError.message,
            code: cell.content,
          });

          setCells(cells.map(c =>
            c.id === cellId ? {
              ...c,
              isRunning: false,
              output: `Error: ${result.error}`,
              executionTime: result.executionTime,
              error: result.error,
              errorLine: parsedError.line,
            } : c
          ));
        } else {
          setCells(cells.map(c =>
            c.id === cellId ? {
              ...c,
              isRunning: false,
              output: `Error: ${result.error}`,
              executionTime: result.executionTime,
            } : c
          ));
        }
      } else {
        setCurrentError(null);
        setCells(cells.map(c =>
          c.id === cellId ? {
            ...c,
            isRunning: false,
            output: result.output,
            executionTime: result.executionTime,
            error: undefined,
            errorLine: undefined,
          } : c
        ));
      }
    } catch (error) {
      setCells(cells.map(c =>
        c.id === cellId ? {
          ...c,
          isRunning: false,
          output: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        } : c
      ));
    }
  };

  const handleRunAllCells = async () => {
    for (const cell of cells) {
      if (cell.type === 'code') {
        await handleRunCell(cell.id);
      }
    }
  };

  const clearAllOutputs = () => {
    setCells(cells.map(cell => ({ ...cell, output: undefined, executionTime: undefined })));
  };

  const downloadNotebook = () => {
    const content = JSON.stringify({ cells, language, title: projectTitle }, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Notebook downloaded');
  };

  const downloadCode = () => {
    const codeContent = cells
      .filter(cell => cell.type === 'code')
      .map(cell => cell.content)
      .join('\n\n');

    const extension = LANGUAGE_EXTENSIONS[language] || 'txt';
    const blob = new Blob([codeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle.replace(/\s+/g, '_')}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Code downloaded');
  };

  const handleSaveProject = async () => {
    setIsSaving(true);
    try {
      const projectData = JSON.stringify(cells);
      if (currentProject) {
        const updated = await projectService.updateProject(currentProject.id, {
          title: projectTitle,
          code: projectData,
        });
        if (updated) {
          setCurrentProject(updated);
          loadMyProjects();
          showNotification('Saved');
        }
      } else {
        const newProject = await projectService.createProject({
          title: projectTitle,
          language,
          code: projectData,
        });
        if (newProject) {
          projectService.saveProjectIdToSession(newProject.id);
          setCurrentProject(newProject);
          loadMyProjects();
          showNotification('Notebook created');
        }
      }
    } finally {
      setIsSaving(false);
    }
  };

  const showNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50 text-sm';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  const handleLoadProject = (project: CodeProject) => {
    setCurrentProject(project);
    setShowProjects(false);
  };

  const handleDeleteProject = async (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this notebook?')) {
      const success = await projectService.deleteProject(projectId);
      if (success) {
        loadMyProjects();
        showNotification('Notebook deleted');
        if (currentProject?.id === projectId) {
          setCurrentProject(null);
          setCells([{ id: '1', type: 'code', content: DEFAULT_CODE[language] }]);
          setProjectTitle('Untitled Project');
        }
      }
    }
  };

  const handleNewProject = () => {
    setCurrentProject(null);
    setCells([{ id: '1', type: 'code', content: DEFAULT_CODE[language] }]);
    setProjectTitle('Untitled Project');
  };

  const handleLoadExample = (exampleName: string) => {
    const examples = CODE_EXAMPLES[language] || {};
    const code = examples[exampleName];
    if (code) {
      setCells([{ id: Date.now().toString(), type: 'code', content: code }]);
      setShowExamples(false);
    }
  };

  const handleShareProject = async () => {
    if (!currentProject) {
      await handleSaveProject();
      setTimeout(() => handleShareProject(), 500);
      return;
    }

    const url = `${window.location.origin}${window.location.pathname}?project=${currentProject.id}`;
    setShareUrl(url);
    setShowShareModal(true);
  };

  const handleCopyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBlocklyChange = (generatedCode: string, xml: string) => {
    updateCellContent(cells[0].id, generatedCode);
    setBlocklyXml(xml);
  };

  const renderMarkdown = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-2xl font-bold mb-2">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-bold mb-2">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={i} className="text-lg font-bold mb-2">{line.substring(4)}</h3>;
      } else if (line.startsWith('- ')) {
        return <li key={i} className="ml-4">{line.substring(2)}</li>;
      } else {
        return <p key={i} className="mb-2">{line}</p>;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg shadow-md">
                <Code2 size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900">Stemsphere</span>
            </div>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="text-sm text-slate-700 bg-transparent border-none focus:outline-none focus:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
              placeholder="Untitled notebook"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as Language)}
              className="text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm hover:border-slate-400 transition-all"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="csharp">C#</option>
              <option value="c">C</option>
              <option value="ruby">Ruby</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="php">PHP</option>
              <option value="swift">Swift</option>
              <option value="kotlin">Kotlin</option>
              <option value="r">R</option>
              <option value="perl">Perl</option>
              <option value="lua">Lua</option>
              <option value="bash">Bash</option>
              <option value="sql">SQL</option>
              <option value="scratch">Scratch (Blocks)</option>
            </select>

            {language !== 'scratch' && (
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="text-sm px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-all font-medium"
              >
                <BookOpen size={16} />
                Examples
              </button>
            )}

            <button
              onClick={() => setShowProjects(!showProjects)}
              className="text-sm px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-all font-medium"
            >
              <FolderOpen size={16} />
              Files
            </button>

            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-sm px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-all font-medium"
            >
              <History size={16} />
              History
            </button>

            <button
              onClick={handleSaveProject}
              disabled={isSaving}
              className="text-sm px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-50 transition-all font-medium"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>

            <button
              onClick={handleShareProject}
              className="text-sm px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-all font-medium"
            >
              <Share2 size={16} />
              Share
            </button>

            <div className="relative group">
              <button className="text-sm px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-all font-medium">
                <Download size={16} />
                Download
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl hidden group-hover:block overflow-hidden">
                <button
                  onClick={downloadNotebook}
                  className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <FileText size={16} className="text-slate-400" />
                  Download as JSON
                </button>
                <button
                  onClick={downloadCode}
                  className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 border-t border-slate-100"
                >
                  <Code2 size={16} className="text-slate-400" />
                  Download as .{LANGUAGE_EXTENSIONS[language] || 'txt'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {showExamples && language !== 'scratch' && CODE_EXAMPLES[language] && (
          <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-600 mb-2">CODE SNIPPETS</div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(CODE_EXAMPLES[language] || {}).map((example) => (
                <button
                  key={example}
                  onClick={() => handleLoadExample(example)}
                  className="text-sm px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        {showHistory && (
          <div className="border-t border-gray-200 px-6 py-3 bg-gray-50 max-h-96 overflow-auto">
            <div className="text-xs font-semibold text-gray-600 mb-2">EXECUTION HISTORY</div>
            {executionHistory.length === 0 ? (
              <p className="text-sm text-gray-500">No execution history yet</p>
            ) : (
              <div className="space-y-2">
                {executionHistory.slice(0, 10).map((item, i) => (
                  <div key={i} className="bg-white p-3 rounded border border-gray-200 text-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                      <span className={`text-xs ${item.success ? 'text-green-600' : 'text-red-600'}`}>
                        {item.success ? '✓ Success' : '✗ Error'} • {item.executionTime}ms
                      </span>
                    </div>
                    <pre className="text-xs text-gray-700 bg-gray-50 p-2 rounded overflow-x-auto">
                      {item.code.substring(0, 100)}{item.code.length > 100 ? '...' : ''}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {showProjects && (
          <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold text-gray-600">MY NOTEBOOKS</div>
              <button
                onClick={handleNewProject}
                className="text-sm px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-100 flex items-center gap-1"
              >
                <Plus size={14} />
                New notebook
              </button>
            </div>
            {myProjects.length === 0 ? (
              <p className="text-sm text-gray-500">No notebooks yet</p>
            ) : (
              <div className="space-y-2">
                {myProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => handleLoadProject(project)}
                    className="bg-white p-3 rounded border border-gray-200 hover:border-blue-500 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <FileText size={16} className="text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.title}</div>
                        <div className="text-xs text-gray-500">
                          {project.language} • {new Date(project.updated_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteProject(project.id, e)}
                      className="text-gray-400 hover:text-red-600 p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => addCell('code')}
            className="text-sm px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-400 flex items-center gap-2 transition-all shadow-sm font-medium"
          >
            <Plus size={16} />
            Code
          </button>
          <button
            onClick={() => addCell('markdown')}
            className="text-sm px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-400 flex items-center gap-2 transition-all shadow-sm font-medium"
          >
            <Type size={16} />
            Text
          </button>
          <button
            onClick={handleRunAllCells}
            className="text-sm px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center gap-2 transition-all shadow-md hover:shadow-lg font-medium"
          >
            <Play size={16} />
            Run all
          </button>
          <button
            onClick={clearAllOutputs}
            className="text-sm px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-400 flex items-center gap-2 transition-all shadow-sm font-medium"
          >
            <RotateCcw size={16} />
            Clear outputs
          </button>
        </div>

        <div className="space-y-6">
          {cells.map((cell, index) => (
            <div key={cell.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200 group">
              <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200">
                <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                  {cell.type === 'code' ? <Code2 size={14} className="text-blue-600" /> : <Type size={14} className="text-green-600" />}
                  <span>{cell.type === 'code' ? 'Code' : 'Text'}</span>
                  <span className="text-slate-400 font-normal">Cell {index + 1}</span>
                </div>
                <div className="flex items-center gap-2">
                  {cell.type === 'code' && (
                    <>
                      <button
                        onClick={() => handleFormatCode(cell.id)}
                        className="flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-600 px-2.5 py-1.5 rounded-lg text-xs transition-all shadow-sm"
                        title="Format code"
                      >
                        <Wand2 size={13} />
                      </button>
                      <button
                        onClick={() => handleRunCell(cell.id)}
                        disabled={cell.isRunning}
                        className="flex items-center gap-1.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-3 py-1.5 rounded-lg text-sm disabled:opacity-50 transition-all shadow-sm font-medium"
                      >
                        <Play size={14} />
                        {cell.isRunning ? 'Running...' : 'Run'}
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => moveCellUp(cell.id)}
                    disabled={index === 0}
                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg disabled:opacity-30 transition-all"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    onClick={() => moveCellDown(cell.id)}
                    disabled={index === cells.length - 1}
                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg disabled:opacity-30 transition-all"
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button
                    onClick={() => deleteCell(cell.id)}
                    className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {cell.type === 'code' ? (
                <>
                  <div className="h-64">
                    {language === 'scratch' ? (
                      <BlocklyEditor value={blocklyXml} onChange={handleBlocklyChange} />
                    ) : (
                      <EnhancedMonacoEditor
                        value={cell.content}
                        onChange={(value) => updateCellContent(cell.id, value)}
                        language={language}
                        theme="light"
                        breakpoints={breakpoints}
                        onBreakpointToggle={handleBreakpointToggle}
                        currentLine={isDebugging ? currentDebugLine : undefined}
                        errors={cell.errorLine ? [{ line: cell.errorLine, message: cell.error || 'Error occurred' }] : []}
                      />
                    )}
                  </div>

                  {cell.output && (
                    <div className="border-t border-slate-200">
                      <div className="flex items-center justify-between px-5 py-2.5 bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200">
                        <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                          <Settings size={14} className="text-blue-600" />
                          <span>Output</span>
                          {cell.executionTime && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{cell.executionTime}ms</span>
                          )}
                        </div>
                      </div>
                      <div className="p-5 font-mono text-sm text-slate-900 whitespace-pre-wrap max-h-64 overflow-auto bg-slate-50">
                        {cell.output}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-5">
                  <textarea
                    value={cell.content}
                    onChange={(e) => updateCellContent(cell.id, e.target.value)}
                    className="w-full min-h-32 p-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y bg-white transition-all"
                    placeholder="Write markdown text here..."
                  />
                  {cell.content && (
                    <div className="mt-4 p-5 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2 text-xs text-slate-600 mb-3 font-medium">
                        <Eye size={14} className="text-green-600" />
                        <span>Preview</span>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        {renderMarkdown(cell.content)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 px-4 py-3 bg-slate-100/50 rounded-xl text-xs text-slate-600 text-center font-medium">
          Keyboard shortcuts: <span className="px-2 py-1 bg-white rounded text-slate-700 font-semibold">Ctrl+S</span> to save • <span className="px-2 py-1 bg-white rounded text-slate-700 font-semibold">Ctrl+Enter</span> to run all cells
        </div>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-slide-down" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md">
                <Share2 size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Share notebook</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">Anyone with this link can view your notebook</p>
            <div className="flex gap-3">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:outline-none font-mono"
              />
              <button
                onClick={handleCopyShareUrl}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-3 rounded-lg text-sm shadow-md hover:shadow-lg transition-all font-medium"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowShareModal(false)}
                className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <DebuggerPanel
        isDebugging={isDebugging}
        onStartDebug={handleStartDebug}
        onStopDebug={handleStopDebug}
        onStepOver={handleStepOver}
        onStepInto={handleStepInto}
        onStepOut={handleStepOut}
        breakpoints={breakpoints.map(line => ({ line, enabled: true }))}
        currentLine={currentDebugLine}
        variables={debugVariables}
        callStack={debugCallStack}
      />

      <ErrorAssistant
        error={currentError}
        language={language}
        onClose={() => setCurrentError(null)}
      />
    </div>
  );
}
