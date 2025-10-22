import { useState } from 'react';
import { Menu, X, Home as HomeIcon, BookOpen, Code2 } from 'lucide-react';
import { Home } from './components/Home';
import { LessonList } from './components/LessonList';
import { LessonView } from './components/LessonView';
import { CodePlayground } from './components/CodePlayground/CodePlayground';
import { ChatPanel } from './components/AIChat/ChatPanel';
import { Lesson } from './lib/supabase';

type Page = 'home' | 'lessons' | 'playground';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedLesson(null);
    setMobileMenuOpen(false);
  };

  const navigateToLessons = () => {
    setCurrentPage('lessons');
    setSelectedLesson(null);
    setMobileMenuOpen(false);
  };

  const navigateToPlayground = () => {
    setCurrentPage('playground');
    setSelectedLesson(null);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-white z-50 border-b border-primary-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={navigateToHome}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <img src="/stemsphere.png" alt="Stemsphere Foundation" className="h-8 w-8" />
              <div className="text-xl font-bold text-primary-900">
                Stemsphere Foundation
              </div>
            </button>

            <div className="hidden md:flex space-x-6 items-center">
              <button
                onClick={navigateToHome}
                className={`transition-colors font-medium flex items-center gap-2 ${
                  currentPage === 'home' && !selectedLesson
                    ? 'text-primary-700'
                    : 'text-primary-800 hover:text-primary-700'
                }`}
              >
                <HomeIcon size={18} />
                Home
              </button>
              <button
                onClick={navigateToLessons}
                className={`transition-colors font-medium flex items-center gap-2 ${
                  currentPage === 'lessons' || selectedLesson
                    ? 'text-primary-700'
                    : 'text-primary-800 hover:text-primary-700'
                }`}
              >
                <BookOpen size={18} />
                Lessons
              </button>
              <button
                onClick={navigateToPlayground}
                className={`transition-colors font-medium flex items-center gap-2 ${
                  currentPage === 'playground'
                    ? 'text-primary-700'
                    : 'text-primary-800 hover:text-primary-700'
                }`}
              >
                <Code2 size={18} />
                Coding Playground
              </button>
            </div>

            <button
              className="md:hidden text-primary-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={navigateToHome}
                className="block text-primary-700 hover:text-primary-800 py-2 w-full text-left font-medium flex items-center gap-2"
              >
                <HomeIcon size={18} />
                Home
              </button>
              <button
                onClick={navigateToLessons}
                className="block text-primary-700 hover:text-primary-800 py-2 w-full text-left font-medium flex items-center gap-2"
              >
                <BookOpen size={18} />
                Lessons
              </button>
              <button
                onClick={navigateToPlayground}
                className="block text-primary-700 hover:text-primary-800 py-2 w-full text-left font-medium flex items-center gap-2"
              >
                <Code2 size={18} />
                Coding Playground
              </button>
            </div>
          </div>
        )}
      </nav>

      {selectedLesson ? (
        <LessonView
          lesson={selectedLesson}
          onBack={navigateToLessons}
          onNextLesson={() => {
            const currentIndex = allLessons.findIndex(l => l.id === selectedLesson.id);
            if (currentIndex < allLessons.length - 1) {
              setSelectedLesson(allLessons[currentIndex + 1]);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          hasNextLesson={(() => {
            const currentIndex = allLessons.findIndex(l => l.id === selectedLesson.id);
            return currentIndex < allLessons.length - 1;
          })()}
        />
      ) : currentPage === 'home' ? (
        <Home onNavigateToLessons={navigateToLessons} />
      ) : currentPage === 'playground' ? (
        <CodePlayground />
      ) : (
        <LessonList
          onSelectLesson={(lesson) => {
            setSelectedLesson(lesson);
          }}
          onLessonsLoaded={setAllLessons}
        />
      )}

      <footer className="bg-primary-50 border-t border-primary-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <img src="/stemsphere.png" alt="Stemsphere Foundation" className="h-8 w-8" />
              <div>
                <div className="text-lg font-bold text-primary-900">Stemsphere Foundation</div>
                <div className="text-sm text-primary-700 font-body">Programming education for everyone</div>
              </div>
            </div>
            <p className="text-primary-600 text-sm font-body">
              © 2025 Stemsphere Foundation
            </p>
          </div>
        </div>
      </footer>

      <ChatPanel
        lessonTitle={selectedLesson?.title}
        programmingLanguage={selectedLesson?.programming_language}
        lessonId={selectedLesson?.id}
      />
    </div>
  );
}

export default App;
