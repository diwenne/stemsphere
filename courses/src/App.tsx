import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Home } from './components/Home';
import { LessonList } from './components/LessonList';
import { LessonView } from './components/LessonView';
import { CodePlayground } from './components/CodePlayground/CodePlayground';
import { ChatPanel } from './components/AIChat/ChatPanel';
import { Lesson } from './lib/supabase';

type Page = 'home' | 'lessons' | 'playground';

function App() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);

  // Scroll to top whenever page or lesson changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedLesson]);

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedLesson(null);
  };

  const navigateToLessons = () => {
    setCurrentPage('lessons');
    setSelectedLesson(null);
  };

  const navigateToPlayground = () => {
    setCurrentPage('playground');
    setSelectedLesson(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar
        currentPage={selectedLesson ? 'lessons' : currentPage}
        onNavigateHome={navigateToHome}
        onNavigateLessons={navigateToLessons}
        onNavigatePlayground={navigateToPlayground}
      />

      <main>
        {selectedLesson ? (
          <LessonView
            lesson={selectedLesson}
            onBack={navigateToLessons}
            onNextLesson={() => {
              const currentIndex = allLessons.findIndex(l => l.id === selectedLesson.id);
              if (currentIndex < allLessons.length - 1) {
                setSelectedLesson(allLessons[currentIndex + 1]);
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
      </main>

      <Footer />

      <ChatPanel
        lessonTitle={selectedLesson?.title}
        programmingLanguage={selectedLesson?.programming_language}
        lessonId={selectedLesson?.id}
      />
    </div>
  );
}

export default App;
