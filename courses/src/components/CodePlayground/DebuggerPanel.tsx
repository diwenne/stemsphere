import { useState, useEffect } from 'react';
import { Bug, Play, X, CircleDot, ChevronRight, ChevronsRight, ArrowUp } from 'lucide-react';

interface BreakpointInfo {
  line: number;
  enabled: boolean;
}

interface VariableInfo {
  name: string;
  value: string;
  type: string;
}

interface DebuggerPanelProps {
  isDebugging: boolean;
  onStartDebug: () => void;
  onStopDebug: () => void;
  onStepOver: () => void;
  onStepInto: () => void;
  onStepOut: () => void;
  breakpoints: BreakpointInfo[];
  currentLine?: number;
  variables: VariableInfo[];
  callStack: string[];
}

export function DebuggerPanel({
  isDebugging,
  onStartDebug,
  onStopDebug,
  onStepOver,
  onStepInto,
  onStepOut,
  breakpoints,
  currentLine,
  variables,
  callStack,
}: DebuggerPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`fixed right-0 top-20 bg-white border-l border-gray-200 shadow-lg transition-all duration-300 ${
      isExpanded ? 'w-80' : 'w-12'
    } h-[calc(100vh-5rem)] overflow-hidden z-30`}>
      <div className="h-full flex flex-col">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 hover:bg-gray-100 flex items-center justify-center border-b border-gray-200"
          title="Toggle Debugger"
        >
          <Bug size={20} className="text-gray-700" />
        </button>

        {isExpanded && (
          <div className="flex-1 overflow-auto p-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Debug Controls</h3>
              <div className="flex flex-col gap-2">
                {!isDebugging ? (
                  <button
                    onClick={onStartDebug}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm"
                  >
                    <Play size={16} />
                    Start Debugging
                  </button>
                ) : (
                  <>
                    <button
                      onClick={onStopDebug}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
                    >
                      <X size={16} />
                      Stop
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={onStepOver}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1.5 rounded text-xs flex-1"
                        title="Step Over (F10)"
                      >
                        <ChevronRight size={14} />
                        Over
                      </button>
                      <button
                        onClick={onStepInto}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1.5 rounded text-xs flex-1"
                        title="Step Into (F11)"
                      >
                        <ChevronsRight size={14} />
                        Into
                      </button>
                      <button
                        onClick={onStepOut}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1.5 rounded text-xs flex-1"
                        title="Step Out (Shift+F11)"
                      >
                        <ArrowUp size={14} />
                        Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Breakpoints</h3>
              {breakpoints.length === 0 ? (
                <p className="text-xs text-gray-500">Click line numbers to add breakpoints</p>
              ) : (
                <div className="space-y-1">
                  {breakpoints.map((bp) => (
                    <div
                      key={bp.line}
                      className={`flex items-center gap-2 text-xs p-2 rounded ${
                        bp.enabled ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <CircleDot size={12} />
                      <span>Line {bp.line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isDebugging && (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Variables</h3>
                  {variables.length === 0 ? (
                    <p className="text-xs text-gray-500">No variables in scope</p>
                  ) : (
                    <div className="space-y-1">
                      {variables.map((variable, idx) => (
                        <div key={idx} className="text-xs bg-gray-50 p-2 rounded">
                          <div className="font-mono">
                            <span className="text-blue-600">{variable.name}</span>
                            <span className="text-gray-400 mx-1">:</span>
                            <span className="text-purple-600">{variable.type}</span>
                          </div>
                          <div className="font-mono text-gray-700 mt-1">{variable.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Call Stack</h3>
                  {callStack.length === 0 ? (
                    <p className="text-xs text-gray-500">No call stack</p>
                  ) : (
                    <div className="space-y-1">
                      {callStack.map((frame, idx) => (
                        <div
                          key={idx}
                          className="text-xs bg-gray-50 p-2 rounded font-mono text-gray-700"
                        >
                          {frame}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {currentLine !== undefined && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                    <p className="text-xs text-yellow-800">
                      <span className="font-semibold">Current line:</span> {currentLine}
                    </p>
                  </div>
                )}
              </>
            )}

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong>Tip:</strong> Click line numbers to set breakpoints. Use debug controls to step through your code.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
