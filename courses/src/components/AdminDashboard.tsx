import { useState, useEffect } from 'react';
import { X, Plus, Edit, Trash2, LogOut, Eye } from 'lucide-react';
import { supabase, Lesson, authService } from '../lib/supabase';
import { LessonEditor } from './LessonEditor';
import { LessonView } from './LessonView';

interface AdminDashboardProps {
  onClose: () => void;
}

export function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [viewingLesson, setViewingLesson] = useState<Lesson | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  const languages = ['All', 'Python', 'Java', 'C++', 'C#', 'JavaScript'];

  useEffect(() => {
    fetchLessons();
  }, []);

  async function fetchLessons() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('programming_language', { ascending: true })
        .order('day_number', { ascending: true });

      if (error) throw error;
      setLessons(data || []);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    authService.logout();
    onClose();
  };

  const handleCreateNew = () => {
    setEditingLesson(null);
    setShowEditor(true);
  };

  const handleEdit = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setShowEditor(true);
  };

  const handleView = (lesson: Lesson) => {
    setViewingLesson(lesson);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchLessons();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      alert('Failed to delete lesson. Please try again.');
    }
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setEditingLesson(null);
    fetchLessons();
  };

  const handleViewClose = () => {
    setViewingLesson(null);
  };

  const filteredLessons = selectedLanguage === 'All'
    ? lessons
    : lessons.filter(lesson => lesson.programming_language === selectedLanguage);

  if (showEditor) {
    return <LessonEditor lesson={editingLesson} onClose={handleEditorClose} />;
  }

  if (viewingLesson) {
    return <LessonView lesson={viewingLesson} onBack={handleViewClose} />;
  }

  return (
    <div className="min-h-screen bg-primary-50 pt-16">
      <div className="bg-primary-700 text-white py-8 px-4 border-b border-primary-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-primary-100 font-body">Manage lessons and content</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-5 py-2.5 bg-accent-600 hover:bg-accent-700 rounded-lg font-semibold transition-colors"
            >
              <Plus size={20} />
              New Lesson
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-semibold transition-colors border border-white/20"
            >
              <LogOut size={20} />
              Logout
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-semibold transition-colors border border-white/20"
            >
              <X size={20} />
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-sm font-semibold text-primary-900">Filter by language:</span>
          <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => setSelectedLanguage(language)}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  selectedLanguage === language
                    ? 'bg-primary-700 text-white shadow-sm'
                    : 'bg-white text-primary-700 border border-primary-300 hover:border-primary-500'
                }`}
              >
                {language}
                {language !== 'All' && (
                  <span className="ml-2 text-xs opacity-75">
                    ({lessons.filter(l => l.programming_language === language).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-700 rounded-full animate-spin"></div>
            <p className="mt-4 text-primary-700 font-body">Loading lessons...</p>
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-primary-200">
            <p className="text-primary-700 text-lg font-body">
              {selectedLanguage === 'All'
                ? 'No lessons found. Create your first lesson!'
                : `No ${selectedLanguage} lessons found.`}
            </p>
            <button
              onClick={handleCreateNew}
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-semibold transition-colors"
            >
              <Plus size={20} />
              Create Lesson
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-primary-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-100 border-b border-primary-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-bold text-primary-900">Day</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-primary-900">Language</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-primary-900">Title</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-primary-900">Excerpt</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-primary-900">Read Time</th>
                    <th className="text-right px-6 py-4 text-sm font-bold text-primary-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-100">
                  {filteredLessons.map((lesson) => (
                    <tr key={lesson.id} className="hover:bg-primary-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-primary-900">
                        {lesson.day_number}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-primary-200 text-primary-900 rounded text-xs font-semibold">
                          {lesson.programming_language}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-primary-900">
                        {lesson.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-primary-700 font-body max-w-xs truncate">
                        {lesson.excerpt}
                      </td>
                      <td className="px-6 py-4 text-sm text-primary-700 font-body">
                        {lesson.read_time} min
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleView(lesson)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Preview"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleEdit(lesson)}
                            className="p-2 text-primary-700 hover:bg-primary-100 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(lesson.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
