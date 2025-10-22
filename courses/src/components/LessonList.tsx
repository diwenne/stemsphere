import { useState, useEffect } from 'react';
import { supabase, Lesson, authService } from '../lib/supabase';
import { Clock, Lock, Code, BookOpen, Shield } from 'lucide-react';
import { AdminLoginModal } from './AdminLoginModal';
import { AdminDashboard } from './AdminDashboard';
import './LessonList.css';

interface LessonListProps {
  onSelectLesson: (lesson: Lesson) => void;
  onLessonsLoaded?: (lessons: Lesson[]) => void;
}

export function LessonList({ onSelectLesson, onLessonsLoaded }: LessonListProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [showCourseView, setShowCourseView] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  useEffect(() => {
    if (selectedLanguage && showCourseView) {
      fetchLessons();
    }
  }, [selectedLanguage, showCourseView]);

  async function fetchLessons() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('programming_language', selectedLanguage)
        .order('day_number', { ascending: true });

      if (error) throw error;
      const lessonsData = data || [];
      setLessons(lessonsData);
      if (onLessonsLoaded) {
        onLessonsLoaded(lessonsData);
      }
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  }

  const languages = ['Python', 'Java', 'C++', 'C#', 'JavaScript'];

  const handleLanguageClick = (language: string) => {
    setSelectedLanguage(language);
    setShowCourseView(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowAdminLogin(false);
    setShowAdminDashboard(true);
  };

  const handleCloseAdminDashboard = () => {
    setShowAdminDashboard(false);
    fetchLessons();
  };

  if (showAdminDashboard && isAuthenticated) {
    return <AdminDashboard onClose={handleCloseAdminDashboard} />;
  }

  if (showCourseView && selectedLanguage) {
    return (
      <div className="min-h-screen bg-white pt-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-700 rounded-full animate-spin"></div>
            <p className="mt-6 text-primary-700 font-medium font-body">Loading course...</p>
          </div>
        ) : (
          <>
            <div className="bg-primary-700 text-white py-12 px-4">
              <div className="max-w-4xl mx-auto">
                <button
                  onClick={() => {
                    setShowCourseView(false);
                    setSelectedLanguage(null);
                    setLessons([]);
                  }}
                  className="text-primary-100 hover:text-white mb-4 flex items-center gap-2 transition-colors"
                >
                  ← Back to Content Library
                </button>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Code className="text-white" size={32} />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold">{selectedLanguage} Course</h1>
                    <p className="text-primary-100 font-body">Master {selectedLanguage} from the ground up</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {lessons.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock size={32} className="text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">
                    Coming soon
                  </h3>
                  <p className="text-primary-700 font-body">
                    {selectedLanguage} lessons are currently being developed.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson)}
                      className="group w-full bg-white border border-primary-200 rounded-lg hover:shadow-md hover:border-primary-400 transition-all p-5 text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 pt-1">
                          <div className="w-12 h-12 rounded-lg bg-primary-500 flex items-center justify-center transition-all group-hover:bg-primary-600">
                            <span className="text-lg font-bold text-white">
                              {index + 1}
                            </span>
                          </div>
                        </div>

                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-1">
                            <h3 className="text-lg font-bold text-primary-900 group-hover:text-primary-700 transition-colors">
                              {lesson.title}
                            </h3>
                            <div className="flex-shrink-0 flex items-center gap-1.5 text-sm text-primary-600 font-body">
                              <Clock size={16} />
                              <span>{lesson.read_time} min</span>
                            </div>
                          </div>

                          <p className="text-primary-700 text-sm leading-relaxed line-clamp-2 mb-2 font-body">
                            {lesson.excerpt}
                          </p>

                          <div className="flex items-center gap-3">
                            <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
                              Day {lesson.day_number}
                            </span>
                            <span className="text-xs text-primary-400">•</span>
                            <span className="text-xs text-primary-600">
                              {lesson.programming_language}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {lessons.length > 0 && (
                <div className="mt-12 pt-8 border-t border-primary-200">
                  <h3 className="text-xl font-bold text-primary-900 mb-3">
                    About this course
                  </h3>
                  <p className="text-primary-800 leading-relaxed mb-4 font-body">
                    This {selectedLanguage} course takes you from beginner to confident programmer through {lessons.length} structured lessons.
                    Each lesson builds on the previous one, introducing new concepts and reinforcing what you've learned.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Whether you're completely new to programming or looking to add {selectedLanguage} to your skillset,
                    this course provides a solid foundation in syntax, best practices, and problem-solving techniques.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {showAdminLogin && (
        <AdminLoginModal
          onClose={() => setShowAdminLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      <section className="lesson-library-hero">
        <button
          onClick={() => isAuthenticated ? setShowAdminDashboard(true) : setShowAdminLogin(true)}
          className="admin-button"
        >
          <Shield size={18} />
          Admin Panel
        </button>

        <div className="lesson-library-content">
          <div className="library-header">
            <h1 className="library-title">Content Library</h1>
            <p className="library-subtitle">
              Explore our comprehensive programming courses. Choose a language to begin your learning journey.
            </p>
          </div>

          <div className="languages-grid">
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => handleLanguageClick(language)}
                className="language-card"
              >
                <div className="language-card-header">
                  <div className="language-icon">
                    <Code size={28} />
                  </div>
                  <h3 className="language-name">{language}</h3>
                </div>
                <p className="language-description">
                  Master {language} through structured lessons and hands-on practice
                </p>
                <div className="language-cta">
                  <BookOpen size={18} />
                  <span>View Course</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
