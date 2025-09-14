import Section from '../../components/Section/Section';
import BenefitCard from '../../components/BenefitCard/BenefitCard';
import './Home.css';

const benefits = [
  {
    icon: '⭐',
    title: 'Access to Industry Mentors',
    description: 'Connect with professionals from top tech companies and research institutions for guidance and inspiration.'
  },
  {
    icon: '🤝',
    title: 'Collaborative Projects',
    description: 'Work in teams on real-world challenges, building your portfolio and collaborative skills.'
  },
  {
    icon: '🏆',
    title: 'Exclusive Workshops & Competitions',
    description: 'Gain priority access to our hands-on workshops in AI, coding, robotics, and more.'
  },
  {
    icon: '🎓',
    title: 'Leadership Opportunities',
    description: 'Lead local initiatives, organize events, and make a tangible impact in your community.'
  }
];

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <Section className="hero-section" id="home">
        <div className="hero-content">
          <span className="hero-subtitle">Empowering Student Innovators</span>
          <h1 className="hero-title">Stemsphere Foundation</h1>
          <p className="hero-description">
            We provide youth with the skills, mentorship, and resources to excel at the intersection of science, technology, engineering, and mathematics.
          </p>
          <div className="hero-buttons">
            <a href="/get-involved" className="btn btn-primary">Get Involved</a>
            <a href="/leadership" className="btn btn-secondary">Meet The Team</a>
          </div>
          <div className="hero-stats">
            <span>👥 5000+ Students Reached</span>
            <span>💻 50+ Workshops Hosted</span>
            <span>🌍 10+ Countries</span>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section id="benefits">
        <h2 className="section-title">Why Join Stemsphere?</h2>
        <p className="section-subtitle">Discover the exclusive advantages and opportunities we provide.</p>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} />
          ))}
        </div>
      </Section>

      {/* Impact Section */}
      <Section className="impact-section" id="impact">
         <h2 className="section-title">Our Impact</h2>
         <p className="section-subtitle">Fueling curiosity and creating future leaders in STEM.</p>
         <div className="impact-stats-container">
            <div className="impact-stat">
              <span className="impact-number">10,000+</span>
              <span className="impact-label">Hours of Coding Taught</span>
            </div>
            <div className="impact-stat">
              <span className="impact-number">500+</span>
              <span className="impact-label">Projects Built</span>
            </div>
            <div className="impact-stat">
              <span className="impact-number">95%</span>
              <span className="impact-label">Pursue STEM in College</span>
            </div>
         </div>
      </Section>
    </div>
  );
};

export default Home;