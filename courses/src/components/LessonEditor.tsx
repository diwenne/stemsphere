import { useState, useEffect, useRef } from 'react';
import { X, Eye, Save, FileText, Bold, Italic, Heading1, Heading2, List, ListOrdered, Code as CodeIcon, Square, FileCode } from 'lucide-react';
import { supabase, Lesson } from '../lib/supabase';
import { CodeBlockModal } from './CodeBlockModal';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

interface LessonEditorProps {
  lesson: Lesson | null;
  onClose: () => void;
}

export function LessonEditor({ lesson, onClose }: LessonEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    programming_language: 'Python',
    day_number: 1,
    excerpt: '',
    content: '',
    read_time: 5,
    author: 'Stemsphere Foundation Team',
    author_role: 'Content Creator',
    category: 'Programming',
    image_url: ''
  });

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title,
        programming_language: lesson.programming_language,
        day_number: lesson.day_number,
        excerpt: lesson.excerpt,
        content: lesson.content,
        read_time: lesson.read_time,
        author: lesson.author,
        author_role: lesson.author_role,
        category: lesson.category,
        image_url: lesson.image_url || ''
      });
    }
  }, [lesson]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'day_number' || name === 'read_time' ? parseInt(value) || 0 : value
    }));
  };

  const insertFormatting = (before: string, after: string = '') => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const scrollTop = textarea.scrollTop;
    const pageScrollY = window.scrollY;
    const selectedText = formData.content.substring(start, end);
    const newText = formData.content.substring(0, start) + before + selectedText + after + formData.content.substring(end);

    setFormData(prev => ({ ...prev, content: newText }));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, pageScrollY);
        textarea.scrollTop = scrollTop;
        textarea.focus();
        textarea.setSelectionRange(start + before.length, end + before.length);
      });
    });
  };

  const formatBold = (e: React.MouseEvent) => {
    e.preventDefault();
    insertFormatting('**', '**');
  };
  const formatItalic = (e: React.MouseEvent) => {
    e.preventDefault();
    insertFormatting('*', '*');
  };
  const formatHeading1 = (e: React.MouseEvent) => {
    e.preventDefault();
    insertFormatting('# ', '\n');
  };
  const formatHeading2 = (e: React.MouseEvent) => {
    e.preventDefault();
    insertFormatting('## ', '\n');
  };
  const formatBulletList = (e: React.MouseEvent) => {
    e.preventDefault();
    insertFormatting('- ', '\n');
  };
  const formatNumberedList = (e: React.MouseEvent) => {
    e.preventDefault();
    insertFormatting('1. ', '\n');
  };
  const formatCode = (e: React.MouseEvent) => {
    e.preventDefault();
    insertFormatting('`', '`');
  };
  const formatTextBox = (e: React.MouseEvent) => {
    e.preventDefault();
    insertFormatting('[BOX]\n', '\n[/BOX]');
  };

  const handleCodeInsert = (code: string, language: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const scrollTop = textarea.scrollTop;
    const pageScrollY = window.scrollY;
    const codeBlock = `\n\`\`\`${language}\n${code}\n\`\`\`\n`;
    const newText = formData.content.substring(0, start) + codeBlock + formData.content.substring(end);

    setFormData(prev => ({ ...prev, content: newText }));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, pageScrollY);
        textarea.scrollTop = scrollTop;
        textarea.focus();
        const newPosition = start + codeBlock.length;
        textarea.setSelectionRange(newPosition, newPosition);
      });
    });
  };

  const renderMarkdown = (text: string) => {
    const parts: { type: 'text' | 'code' | 'box'; content: string; language?: string }[] = [];
    const combinedRegex = /```(\w+)?\n?([\s\S]*?)```|\[BOX\]([\s\S]*?)\[\/BOX\]/g;
    let lastIndex = 0;
    let match;

    while ((match = combinedRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
      }
      if (match[2] !== undefined) {
        const language = match[1] || 'plaintext';
        parts.push({ type: 'code', content: match[2].trim(), language });
      } else if (match[3] !== undefined) {
        parts.push({ type: 'box', content: match[3].trim() });
      }
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.substring(lastIndex) });
    }

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

    return parts.map((part, index) => {
      if (part.type === 'code') {
        const langLabel = languageLabels[part.language || ''] || 'Code';
        const hljsLang = languageMap[part.language || ''] || part.language || 'plaintext';
        let highlightedCode;
        try {
          highlightedCode = hljs.highlight(part.content, { language: hljsLang }).value;
        } catch (e) {
          highlightedCode = hljs.highlightAuto(part.content).value;
        }
        return `<div key="${index}" class="my-6 bg-gray-900 rounded-lg overflow-hidden shadow-lg relative group"><div class="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700"><span class="text-xs font-semibold text-gray-300 uppercase tracking-wide">${langLabel}</span><button class="copy-code-btn bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-xs font-semibold transition-colors" data-code="${part.content.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}">Copy</button></div><pre class="p-4 overflow-x-auto"><code class="hljs text-sm leading-relaxed">${highlightedCode}</code></pre></div>`;
      } else if (part.type === 'box') {
        return `<div key="${index}" class="my-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg shadow-sm"><div class="text-primary-900 font-body">${part.content.replace(/\n/g, '<br>')}</div></div>`;
      } else {
        let html = part.content;
        html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-primary-900 mb-4 mt-6">$1</h1>');
        html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-primary-900 mb-3 mt-5">$1</h2>');
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-primary-900">$1</strong>');
        html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
        html = html.replace(/`(.+?)`/g, '<code class="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm font-mono">$1</code>');
        html = html.replace(/^- (.+)$/gm, '<li class="ml-6 mb-2">$1</li>');
        html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-6 mb-2">$1</li>');
        html = html.replace(/\n\n/g, '</p><p class="mb-4">');
        return '<p class="mb-4">' + html + '</p>';
      }
    }).join('');
  };

  const handleSave = async () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      alert('Please fill in all required fields (Title, Excerpt, Content)');
      return;
    }

    setSaving(true);

    try {
      const lessonData = {
        title: formData.title,
        programming_language: formData.programming_language,
        day_number: formData.day_number,
        excerpt: formData.excerpt,
        content: formData.content,
        read_time: formData.read_time,
        author: formData.author,
        author_role: formData.author_role,
        category: formData.category,
        image_url: formData.image_url || null,
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        published_date: new Date().toISOString().split('T')[0]
      };

      let error;

      if (lesson) {
        const result = await supabase
          .from('blog_posts')
          .update(lessonData)
          .eq('id', lesson.id);
        error = result.error;
      } else {
        const result = await supabase
          .from('blog_posts')
          .insert([lessonData]);
        error = result.error;
      }

      if (error) throw error;

      alert(`Lesson ${lesson ? 'updated' : 'created'} successfully!`);
      onClose();
    } catch (error) {
      console.error('Error saving lesson:', error);
      alert('Failed to save lesson. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const languages = ['Python', 'Java', 'C++', 'C#', 'JavaScript'];

  return (
    <>
      {showCodeModal && (
        <CodeBlockModal
          onInsert={handleCodeInsert}
          onClose={() => setShowCodeModal(false)}
        />
      )}
    <div className="min-h-screen bg-primary-50 pt-16">
      <div className="bg-primary-700 text-white py-6 px-4 border-b border-primary-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {lesson ? 'Edit Lesson' : 'Create New Lesson'}
              </h1>
              <p className="text-sm text-primary-100 font-body">
                {showPreview ? 'Preview Mode' : 'Edit Mode'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-semibold transition-colors border border-white/20 text-sm"
            >
              <Eye size={18} />
              {showPreview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-700 rounded-lg font-semibold transition-colors text-sm disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-semibold transition-colors border border-white/20 text-sm"
            >
              <X size={18} />
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showPreview ? (
          <div className="bg-white rounded-lg shadow-lg border border-primary-200 overflow-hidden">
            <div className="relative bg-primary-700 text-white p-10 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded font-semibold border border-white/30">
                  Day {formData.day_number}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded font-semibold border border-white/30">
                  {formData.programming_language}
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded font-semibold border border-white/30">
                  {formData.read_time} min read
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {formData.title || 'Untitled Lesson'}
              </h1>
            </div>

            <div className="p-10 md:p-12">
              <div className="mb-10 pb-10 border-b-2 border-primary-100">
                <h2 className="text-lg font-bold text-primary-900 uppercase tracking-wide mb-4">
                  What You'll Learn
                </h2>
                <p className="text-xl text-primary-800 leading-relaxed font-body">
                  {formData.excerpt || 'No excerpt provided'}
                </p>
              </div>

              <div className="prose prose-xl max-w-none">
                <div
                  className="text-primary-900 leading-relaxed text-lg font-body"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(formData.content || 'No content provided') }}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (target.classList.contains('copy-code-btn')) {
                      const code = target.getAttribute('data-code');
                      if (code) {
                        const decodedCode = code.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                        navigator.clipboard.writeText(decodedCode);
                        const originalText = target.textContent;
                        target.textContent = 'Copied!';
                        setTimeout(() => {
                          target.textContent = originalText;
                        }, 2000);
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-primary-200 shadow-sm">
              <h3 className="text-lg font-bold text-primary-900 mb-4">Basic Information</h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Programming Language *
                  </label>
                  <select
                    name="programming_language"
                    value={formData.programming_language}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 font-body"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Day Number *
                  </label>
                  <input
                    type="number"
                    name="day_number"
                    value={formData.day_number}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 font-body"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Read Time (min) *
                  </label>
                  <input
                    type="number"
                    name="read_time"
                    value={formData.read_time}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 font-body"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-primary-200 shadow-sm">
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter lesson title..."
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-lg font-body"
              />
            </div>

            <div className="bg-white p-6 rounded-lg border border-primary-200 shadow-sm">
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Excerpt / Summary *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Write a brief summary of what students will learn in this lesson..."
                rows={3}
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 font-body resize-none"
              />
              <p className="mt-2 text-sm text-primary-600 font-body">
                This appears as a preview on the lesson list page
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-primary-200 shadow-sm">
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Lesson Content *
              </label>
              <p className="text-sm text-primary-600 font-body mb-4">
                Write the main text content here. Use the Insert Code Block button for language-specific code. Use [BOX]...[/BOX] for callout boxes.
              </p>
              <div className="sticky top-16 z-10 bg-white border border-primary-300 rounded-lg shadow-sm p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-primary-600 font-body">Formatting Toolbar</div>
                  <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={formatBold}
                    className="p-2 hover:bg-primary-100 rounded transition-colors relative group"
                  >
                    <Bold size={18} />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-[2000ms] pointer-events-none">
                      Bold text
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={formatItalic}
                    className="p-2 hover:bg-primary-100 rounded transition-colors relative group"
                  >
                    <Italic size={18} />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-[2000ms] pointer-events-none">
                      Italic text
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={formatHeading1}
                    className="p-2 hover:bg-primary-100 rounded transition-colors relative group"
                  >
                    <Heading1 size={18} />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-[2000ms] pointer-events-none">
                      Large heading
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={formatHeading2}
                    className="p-2 hover:bg-primary-100 rounded transition-colors relative group"
                  >
                    <Heading2 size={18} />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-[2000ms] pointer-events-none">
                      Medium heading
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={formatBulletList}
                    className="p-2 hover:bg-primary-100 rounded transition-colors relative group"
                  >
                    <List size={18} />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-[2000ms] pointer-events-none">
                      Bullet list
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={formatNumberedList}
                    className="p-2 hover:bg-primary-100 rounded transition-colors relative group"
                  >
                    <ListOrdered size={18} />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-[2000ms] pointer-events-none">
                      Numbered list
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={formatCode}
                    className="p-2 hover:bg-primary-100 rounded transition-colors relative group"
                  >
                    <CodeIcon size={18} />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-[2000ms] pointer-events-none">
                      Inline code
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowCodeModal(true);
                    }}
                    className="p-2 hover:bg-primary-100 rounded transition-colors relative group"
                  >
                    <FileCode size={18} />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-[2000ms] pointer-events-none">
                      Insert code block
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={formatTextBox}
                    className="p-2 hover:bg-primary-100 rounded transition-colors relative group"
                  >
                    <Square size={18} />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-[2000ms] pointer-events-none">
                      Callout box
                    </span>
                  </button>
                </div>
                </div>
              </div>
              <textarea
                ref={contentRef}
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your lesson content here...\n\nFormatting tips:\n- **bold text** for bold\n- *italic text* for italic\n- # Heading 1\n- ## Heading 2\n- `code` for inline code\n- ``` for code blocks (wrap multiple lines)\n- [BOX]text[/BOX] for callout boxes\n\nExample:\nThis is some text.\n\n```\nprint('Hello World')\nx = 10\n```\n\n[BOX]\nImportant note: This is a callout box!\n[/BOX]\n\nMore text here."
                rows={20}
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 font-body text-base resize-none"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white border border-primary-300 text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Save size={20} />
                {saving ? 'Saving...' : lesson ? 'Update Lesson' : 'Create Lesson'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
