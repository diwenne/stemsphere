import { useState, useRef } from 'react';
import { Play, Trash2, Terminal, Code2, Square } from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { EnhancedMonacoEditor } from './EnhancedMonacoEditor';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind classes
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// Skulpt types (simplified)
declare global {
  interface Window {
    Sk: any;
  }
}

const DEFAULT_PYTHON_CODE = `import turtle

t = turtle.Turtle()
t.speed(10)

# Draw a colorful spiral
colors = ["red", "purple", "blue", "green", "orange", "yellow"]

for x in range(360):
    t.pencolor(colors[x % 6])
    t.width(x / 100 + 1)
    t.forward(x)
    t.left(59)
`;

export function CodePlayground() {
  const [code, setCode] = useState(DEFAULT_PYTHON_CODE);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Initialize Skulpt configuration
  const runCode = async () => {
    if (!window.Sk) {
      setOutput('Error: Skulpt not loaded yet. Please refresh the page.');
      return;
    }

    if (window.Sk) {
      window.Sk.hardInterrupt = false;
    }

    setIsRunning(true);
    setError(null);
    setOutput('');

    // Clear previous canvas if any
    if (canvasRef.current) {
      canvasRef.current.innerHTML = '';
    }

    const builtinRead = (x: string) => {
      if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles['files'][x] === undefined)
        throw "File not found: '" + x + "'";
      return window.Sk.builtinFiles['files'][x];
    };

    window.Sk.configure({
      output: (text: string) => {
        setOutput(prev => prev + text);
      },
      read: builtinRead,
      __future__: window.Sk.python3,
      yieldLimit: 100,
      execLimit: null, // Ensure no time limit by default
    });

    // Configure Turtle Graphics
    // We need to make sure the target element exists
    let targetElement = document.getElementById('turtle-canvas');
    if (!targetElement && canvasRef.current) {
      // If it was cleared or doesn't exist, recreate it
      canvasRef.current.innerHTML = '<div id="turtle-canvas"></div>';
    }

    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'turtle-canvas';

    try {
      await window.Sk.misceval.asyncToPromise(() => {
        return window.Sk.importMainWithBody('<stdin>', false, code, true);
      });
    } catch (e: any) {
      const errorStr = e.toString();
      // Check for hard interrupt or time limit error (which we use to force stop)
      if (window.Sk.hardInterrupt === true || errorStr.includes('Time limit exceeded') || errorStr.includes('ExternalError: TypeError: undefined is not an object')) {
        setOutput(prev => prev + '\n[Execution stopped by user]');
      } else {
        setError(errorStr);
        setOutput(prev => prev + '\n' + errorStr);
      }
    } finally {
      setIsRunning(false);
      if (window.Sk) {
        window.Sk.hardInterrupt = false;
        window.Sk.execLimit = null;
      }
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    console.log('Stop button clicked');
    if (window.Sk) {
      console.log('Setting hardInterrupt to true and execLimit to 1');
      window.Sk.hardInterrupt = true;
      window.Sk.execLimit = 1;

      // Force reset Turtle Graphics
      if (window.Sk.TurtleGraphics) {
        // This is a hacky way to stop the animation loop
        try {
          // Resetting the target or module might help
          window.Sk.TurtleGraphics.reset();
        } catch (e) {
          console.log('Error resetting turtle:', e);
        }
      }

      // Force clear the canvas immediately
      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
        // Re-add the target div for next run
        const newCanvas = document.createElement('div');
        newCanvas.id = 'turtle-canvas';
        canvasRef.current.appendChild(newCanvas);
        // Update Skulpt target
        if (window.Sk.TurtleGraphics) {
          window.Sk.TurtleGraphics.target = 'turtle-canvas';
        }
      }
    } else {
      console.error('Skulpt not found on window');
    }
  };



  const handleClearOutput = () => {
    setOutput('');
    setError(null);
    if (canvasRef.current) {
      canvasRef.current.innerHTML = '';
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <div className="h-14 border-b border-slate-200 bg-white px-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-semibold text-slate-800">Python Playground</h1>
        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={runCode}
            disabled={isRunning}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-white rounded-md transition-all shadow-sm",
              isRunning
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow"
            )}
          >
            <Play className={cn("w-4 h-4", isRunning && "animate-spin")} />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>

          {isRunning && (
            <button
              onClick={handleStop}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors shadow-sm"
            >
              <Square className="w-4 h-4 fill-current" />
              Stop
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Editor Panel */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col bg-white border-r border-slate-200">
              <div className="h-9 border-b border-slate-100 bg-slate-50/50 flex items-center px-4 justify-between">
                <span className="text-xs font-medium text-slate-500 flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5" />
                  main.py
                </span>
              </div>
              <div className="flex-1 relative">
                <EnhancedMonacoEditor
                  value={code}
                  onChange={setCode}
                  language="python"
                  theme="light"
                />
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-slate-200 hover:bg-blue-400 transition-colors cursor-col-resize" />

          {/* Output Panel */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Canvas/Visual Output */}
              <Panel defaultSize={60} minSize={30}>
                <div className="h-full flex flex-col bg-white">
                  <div className="h-9 border-b border-slate-100 bg-slate-50/50 flex items-center px-4 justify-between">
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" />
                      Output / Canvas
                    </span>
                    <button
                      onClick={handleClearOutput}
                      className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      Clear
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto p-4 bg-slate-50/30 flex items-center justify-center min-h-0">
                    <div
                      id="turtle-canvas"
                      ref={canvasRef}
                      className="bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden"
                    ></div>
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-1 bg-slate-200 hover:bg-blue-400 transition-colors cursor-row-resize" />

              {/* Console Output */}
              <Panel defaultSize={40} minSize={20}>
                <div className="h-full flex flex-col bg-slate-900 text-slate-200">
                  <div className="h-8 border-b border-slate-800 bg-slate-950 flex items-center px-4">
                    <span className="text-xs font-medium text-slate-400">Console</span>
                  </div>
                  <div className="flex-1 overflow-auto p-4 font-mono text-sm whitespace-pre-wrap">
                    {output || <span className="text-slate-600 italic">No output yet...</span>}
                    {error && (
                      <div className="mt-2 text-red-400 border-t border-red-900/50 pt-2">
                        {error}
                      </div>
                    )}
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
