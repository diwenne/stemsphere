export class CodeFormatterService {
  formatCode(code: string, language: string): string {
    switch (language.toLowerCase()) {
      case 'python':
        return this.formatPython(code);
      case 'javascript':
      case 'typescript':
        return this.formatJavaScript(code);
      case 'java':
        return this.formatJava(code);
      case 'cpp':
      case 'c':
      case 'csharp':
        return this.formatCStyle(code);
      case 'ruby':
        return this.formatRuby(code);
      case 'go':
        return this.formatGo(code);
      case 'sql':
        return this.formatSQL(code);
      default:
        return code;
    }
  }

  private formatPython(code: string): string {
    const lines = code.split('\n');
    let indentLevel = 0;
    const formattedLines: string[] = [];

    for (let line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith('elif ') || trimmed.startsWith('else:') ||
          trimmed.startsWith('except') || trimmed.startsWith('finally:')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      if (trimmed) {
        formattedLines.push('    '.repeat(indentLevel) + trimmed);
      } else {
        formattedLines.push('');
      }

      if (trimmed.endsWith(':') && !trimmed.startsWith('#')) {
        indentLevel++;
      }

      if ((trimmed.startsWith('return ') || trimmed === 'return' ||
           trimmed.startsWith('break') || trimmed.startsWith('continue')) &&
          indentLevel > 0) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
    }

    return formattedLines.join('\n');
  }

  private formatJavaScript(code: string): string {
    const lines = code.split('\n');
    let indentLevel = 0;
    const formattedLines: string[] = [];

    for (let line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith('}')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      if (trimmed) {
        formattedLines.push('  '.repeat(indentLevel) + trimmed);
      } else {
        formattedLines.push('');
      }

      if (trimmed.endsWith('{')) {
        indentLevel++;
      }

      if (trimmed.startsWith('}') && trimmed.includes('{')) {
        indentLevel++;
      }
    }

    return formattedLines.join('\n');
  }

  private formatJava(code: string): string {
    return this.formatJavaScript(code);
  }

  private formatCStyle(code: string): string {
    return this.formatJavaScript(code);
  }

  private formatRuby(code: string): string {
    const lines = code.split('\n');
    let indentLevel = 0;
    const formattedLines: string[] = [];

    for (let line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith('end') || trimmed.startsWith('elsif') ||
          trimmed.startsWith('else') || trimmed.startsWith('when')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      if (trimmed) {
        formattedLines.push('  '.repeat(indentLevel) + trimmed);
      } else {
        formattedLines.push('');
      }

      if (trimmed.startsWith('def ') || trimmed.startsWith('class ') ||
          trimmed.startsWith('module ') || trimmed.startsWith('if ') ||
          trimmed.startsWith('unless ') || trimmed.startsWith('while ') ||
          trimmed.startsWith('until ') || trimmed.startsWith('for ') ||
          trimmed.startsWith('case ') || trimmed.startsWith('begin')) {
        indentLevel++;
      }

      if (trimmed.startsWith('elsif') || trimmed.startsWith('else') ||
          trimmed.startsWith('when')) {
        indentLevel++;
      }
    }

    return formattedLines.join('\n');
  }

  private formatGo(code: string): string {
    const lines = code.split('\n');
    let indentLevel = 0;
    const formattedLines: string[] = [];

    for (let line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith('}')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      if (trimmed) {
        formattedLines.push('\t'.repeat(indentLevel) + trimmed);
      } else {
        formattedLines.push('');
      }

      if (trimmed.endsWith('{')) {
        indentLevel++;
      }
    }

    return formattedLines.join('\n');
  }

  private formatSQL(code: string): string {
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN',
      'INNER JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT',
      'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
      'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE'
    ];

    let formatted = code;

    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      formatted = formatted.replace(regex, keyword);
    });

    const lines = formatted.split('\n');
    const formattedLines = lines.map(line => line.trim()).filter(line => line);

    return formattedLines.join('\n');
  }
}

export const codeFormatterService = new CodeFormatterService();
