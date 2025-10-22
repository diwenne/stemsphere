import { BookOpen, Code, Target, Users, CheckCircle } from 'lucide-react';
import './Home.css';

interface HomeProps {
  onNavigateToLessons: () => void;
}

export function Home({ onNavigateToLessons }: HomeProps) {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-subtitle">Interactive Learning Platform</span>
          <h1 className="hero-title">Learn Programming at Your Own Pace</h1>
          <p className="hero-description">
            Master coding fundamentals through structured, self-guided lessons designed for learners of all levels
          </p>
          <div className="hero-buttons">
            <button onClick={onNavigateToLessons} className="btn btn-primary">
              Start Learning Today
            </button>
            <button onClick={onNavigateToLessons} className="btn btn-secondary">
              Browse Lessons
            </button>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose Stemsphere Foundation?</h2>
          <p className="section-subtitle">
            Everything you need to succeed in your programming journey
          </p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <Target size={32} />
              </div>
              <h3 className="benefit-title">Structured Curriculum</h3>
              <p className="benefit-description">
                Follow a carefully designed day-by-day learning path that builds your skills progressively and systematically
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Code size={32} />
              </div>
              <h3 className="benefit-title">Multiple Languages</h3>
              <p className="benefit-description">
                Choose from Python, Java, C++, C#, and JavaScript to match your career goals and interests
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Users size={32} />
              </div>
              <h3 className="benefit-title">Self-Paced Learning</h3>
              <p className="benefit-description">
                Learn on your schedule with lessons designed for independent study and flexible learning
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Three simple steps to master programming
          </p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Choose Your Language</h3>
              <p className="step-description">
                Select from our comprehensive list of programming languages and start with what interests you most
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Follow Daily Lessons</h3>
              <p className="step-description">
                Complete bite-sized lessons day by day, building your knowledge incrementally and confidently
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Build Your Skills</h3>
              <p className="step-description">
                Watch your programming abilities grow each day as you complete lessons and build real projects
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-icon">
            <BookOpen size={48} />
          </div>
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Journey?</h2>
            <p className="cta-description">
              Join thousands of learners mastering programming skills
            </p>
            <div className="cta-features">
              <div className="cta-feature">
                <CheckCircle size={18} />
                <span>No credit card required</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={18} />
                <span>Start learning instantly</span>
              </div>
            </div>
          </div>
          <button onClick={onNavigateToLessons} className="btn btn-primary">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
