export interface ParsedError {
  line: number;
  message: string;
  type: string;
}

export function parseExecutionError(errorMessage: string, language: string): ParsedError | null {
  if (!errorMessage) return null;

  const patterns: Record<string, RegExp[]> = {
    python: [
      /line (\d+)/i,
      /File ".*", line (\d+)/i,
      /^\s*File ".*", line (\d+)/m,
    ],
    javascript: [
      /at.*:(\d+):\d+/,
      /line (\d+)/i,
    ],
    typescript: [
      /at.*:(\d+):\d+/,
      /line (\d+)/i,
    ],
    java: [
      /at .*\(.*:(\d+)\)/,
      /Exception.*line (\d+)/i,
    ],
    cpp: [
      /error.*:(\d+):/i,
      /line (\d+)/i,
    ],
    c: [
      /error.*:(\d+):/i,
      /line (\d+)/i,
    ],
    csharp: [
      /line (\d+)/i,
    ],
    ruby: [
      /:(\d+):in/,
      /line (\d+)/i,
    ],
    go: [
      /:\d+:(\d+):/,
      /line (\d+)/i,
    ],
    rust: [
      /-->.*:(\d+):/,
      /line (\d+)/i,
    ],
  };

  const languagePatterns = patterns[language.toLowerCase()] || [/line (\d+)/i];

  for (const pattern of languagePatterns) {
    const match = errorMessage.match(pattern);
    if (match && match[1]) {
      const lineNumber = parseInt(match[1], 10);

      const errorType = extractErrorType(errorMessage);
      const cleanMessage = cleanErrorMessage(errorMessage);

      return {
        line: lineNumber,
        message: cleanMessage,
        type: errorType,
      };
    }
  }

  return {
    line: 1,
    message: errorMessage.split('\n')[0] || 'An error occurred',
    type: 'Error',
  };
}

function extractErrorType(errorMessage: string): string {
  const typePatterns = [
    /^(\w+Error):/,
    /^(\w+Exception):/,
    /^(SyntaxError)/,
    /^(TypeError)/,
    /^(NameError)/,
    /^(ValueError)/,
    /^(AttributeError)/,
    /^(KeyError)/,
    /^(IndexError)/,
  ];

  for (const pattern of typePatterns) {
    const match = errorMessage.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return 'Error';
}

function cleanErrorMessage(errorMessage: string): string {
  const lines = errorMessage.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('File ') && !trimmed.startsWith('at ') &&
        !trimmed.startsWith('Traceback') && !trimmed.match(/^\s*\^/)) {
      return trimmed;
    }
  }

  return errorMessage.split('\n')[0] || errorMessage;
}
