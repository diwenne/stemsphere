import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Section from '../../components/Section/Section';
import BenefitCard from '../../components/BenefitCard/BenefitCard';
import './Home.css';

const benefits = [
  { icon: '🏆', title: 'Access to Industry Mentors', description: 'Connect with professionals from top tech companies and research institutions for guidance and inspiration.' },
  { icon: '🧑‍💻', title: 'Collaborative Projects', description: 'Work in teams on real-world challenges, building your portfolio and collaborative skills.' },
  { icon: '🚀', title: 'Exclusive Workshops & Competitions', description: 'Gain priority access to our hands-on workshops in AI, coding, robotics, and more.' },
  { icon: '💡', title: 'Leadership Opportunities', description: 'Lead local initiatives, organize events, and make a tangible impact in your community.' }
];

interface HomeProps {
  setActiveSection: (sectionId: string) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveSection }) => {
  const location = useLocation();

  // This effect for scrolling to a hash link is correct and does not need changes.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const navbarHeight = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  // Effect for scroll-spy logic
  useEffect(() => {
    // We now observe the 'home' section as well
    const sectionsToObserve = ['home', 'benefits', 'impact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // If the 'home' (hero) section is visible, clear the active link.
            // Otherwise, set the active link to the current section's id.
            if (entry.target.id === 'home') {
              setActiveSection('');
            } else {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    sectionsToObserve.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionsToObserve.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [setActiveSection]);

  return (
    <div className="home-page">
      <Section id="home" className="hero-section">
        <div className="hero-content">
          <span className="hero-subtitle">Empowering Student Innovators</span>
          <h1 className="hero-title">Stemsphere Foundation</h1>
          <p className="hero-description">We provide youth with the skills, mentorship, and resources to excel at the intersection of science, technology, engineering, and mathematics.</p>
          <div className="hero-buttons">
            <a href="/get-involved" className="btn btn-primary">Get Involved</a>
            <a href="/leadership" className="btn btn-secondary">Meet The Team</a>
          </div>
          <div className="hero-stats">
            <span>🌍 10+ Students Reached</span>
            <span>🏫 1+ Workshops Hosted</span>
            <span>🇨🇦 1+ Countries</span>
          </div>
        </div>
      </Section>

      {/* The extra className has been removed as it's no longer needed */}
      <Section id="benefits">
        <h2 className="section-title">Why Join Stemsphere?</h2>
        <p className="section-subtitle">Discover the exclusive advantages and opportunities we provide.</p>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} />
          ))}
        </div>
      </Section>

      <Section id="impact">
        <h2 className="section-title">Our Impact</h2>
        <p className="section-subtitle">Fueling curiosity and creating future leaders in STEM.</p>
        <div className="impact-stats-container">
          <div className="impact-stat">
            <span className="impact-number">10+</span>
            <span className="impact-label">Hours of Coding Taught</span>
          </div>
          <div className="impact-stat">
            <span className="impact-number">1+</span>
            <span className="impact-label">Projects Built</span>
          </div>
          <div className="impact-stat">
            <span className="impact-number">90%</span>
            <span className="impact-label">Pursue STEM in College</span>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Home;