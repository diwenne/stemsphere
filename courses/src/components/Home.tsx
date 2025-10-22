import { BookOpen, Code, Target, Users, ArrowRight, CheckCircle } from 'lucide-react';

interface HomeProps {
  onNavigateToLessons: () => void;
}

export function Home({ onNavigateToLessons }: HomeProps) {
  return (
    <div className="min-h-screen bg-white pt-16">
      <section className="relative bg-primary-700 text-white py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_50%)]"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
            Learn Programming<br />at Your Own Pace
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-primary-100 max-w-3xl mx-auto leading-relaxed font-body">
            Master coding fundamentals through structured, self-guided lessons designed for learners of all levels
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onNavigateToLessons}
              className="group bg-accent-600 hover:bg-accent-700 text-white px-10 py-5 rounded text-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Start Learning Today
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button
              onClick={onNavigateToLessons}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-5 rounded text-lg font-semibold transition-all border border-white/20"
            >
              Browse Lessons
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-primary-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
              Why Choose Stemsphere Foundation?
            </h2>
            <p className="text-xl text-primary-700 max-w-2xl mx-auto font-body">
              Everything you need to succeed in your programming journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-primary-200">
              <div className="w-16 h-16 bg-primary-200 rounded-lg flex items-center justify-center mb-6">
                <Target className="text-primary-700" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary-900">Structured Curriculum</h3>
              <p className="text-primary-700 leading-relaxed font-body">
                Follow a carefully designed day-by-day learning path that builds your skills progressively and systematically
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-primary-200">
              <div className="w-16 h-16 bg-primary-200 rounded-lg flex items-center justify-center mb-6">
                <Code className="text-primary-700" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary-900">Multiple Languages</h3>
              <p className="text-primary-700 leading-relaxed font-body">
                Choose from Python, Java, C++, C#, and JavaScript to match your career goals and interests
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-primary-200">
              <div className="w-16 h-16 bg-primary-200 rounded-lg flex items-center justify-center mb-6">
                <Users className="text-primary-700" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary-900">Self-Paced Learning</h3>
              <p className="text-primary-700 leading-relaxed font-body">
                Learn on your schedule with lessons designed for independent study and flexible learning
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-primary-700 font-body">
              Three simple steps to master programming
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white p-8 rounded-lg border-2 border-primary-200 hover:border-primary-400 transition-colors">
                <div className="w-16 h-16 bg-accent-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold mb-6 shadow-md">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-900">Choose Your Language</h3>
                <p className="text-primary-700 leading-relaxed font-body">
                  Select from our comprehensive list of programming languages and start with what interests you most
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-300"></div>
            </div>
            <div className="relative">
              <div className="bg-white p-8 rounded-lg border-2 border-primary-200 hover:border-primary-400 transition-colors">
                <div className="w-16 h-16 bg-accent-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold mb-6 shadow-md">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-900">Follow Daily Lessons</h3>
                <p className="text-primary-700 leading-relaxed font-body">
                  Complete bite-sized lessons day by day, building your knowledge incrementally and confidently
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-300"></div>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-primary-300 transition-colors">
              <div className="w-16 h-16 bg-accent-500 text-white rounded-2xl flex items-center justify-center text-2xl font-black mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Build Your Skills</h3>
              <p className="text-primary-700 leading-relaxed font-body">
                Watch your programming abilities grow each day as you complete lessons and build real projects
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 md:p-12 border border-white/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <BookOpen className="text-white" size={48} />
                </div>
              </div>
              <div className="flex-grow text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-xl text-primary-100 mb-6 font-body">
                  Join thousands of learners mastering programming skills
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle size={18} />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle size={18} />
                    <span>Start learning instantly</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onNavigateToLessons}
                className="group flex-shrink-0 bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded text-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
