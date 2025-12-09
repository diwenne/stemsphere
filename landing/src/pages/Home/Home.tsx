import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Section from '../../components/Section/Section';
import { Trophy, Code, Rocket } from 'lucide-react';
import BenefitCard from '../../components/BenefitCard/BenefitCard';
import Gallery from '../../components/Gallery/Gallery';
import './Home.css';

interface HomeProps {
  setActiveSection: (sectionId: string) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveSection }) => {
  const location = useLocation();
  const { t } = useTranslation();

  const benefits = t('home.benefits.cards', { returnObjects: true }) as { title: string, description: string }[];

  const benefitIcons = [
    <Trophy size={28} strokeWidth={1.5} />,
    <Code size={28} strokeWidth={1.5} />,
    <Rocket size={28} strokeWidth={1.5} />
  ];

  // Scroll to top on initial mount (before hash navigation)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  useEffect(() => {
    const sectionsToObserve = ['home', 'impact', 'benefits', 'gallery'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
          <span className="hero-subtitle">{t('home.hero.subtitle')}</span>
          <h1 className="hero-title">{t('home.hero.title')}</h1>
          <p className="hero-description">{t('home.hero.description')}</p>
          <div className="hero-buttons">
            <a href="/get-involved" className="btn btn-primary">{t('home.hero.getInvolvedBtn')}</a>
            <a href="/about#team" className="btn btn-secondary">{t('home.hero.meetTeamBtn')}</a>
          </div>


        </div>
      </Section>

      <div className="main-content">
        <Section id="impact">
          <h2 className="section-title">{t('home.impact.title')}</h2>
          <p className="section-subtitle">{t('home.impact.subtitle')}</p>
          <div className="impact-stats-container">

            <div className="impact-stat">
              <span className="impact-number">100+</span>
              <span className="impact-label">Students Reached</span>
            </div>
            <div className="impact-stat">
              <span className="impact-number">9</span>
              <span className="impact-label">Workshops Hosted</span>
            </div>
            <div className="impact-stat">
              <span className="impact-number">3</span>
              <span className="impact-label">Chapters Founded</span>
            </div>
            <div className="impact-stat">
              <span className="impact-number">10+</span>
              <span className="impact-label">{t('home.impact.stats.hours')}</span>
            </div>
            <div className="impact-stat">
              <span className="impact-number">5+</span>
              <span className="impact-label">{t('home.impact.stats.projects')}</span>
            </div>
            <div className="impact-stat">
              <span className="impact-number">90%</span>
              <span className="impact-label">{t('home.impact.stats.pursue')}</span>
            </div>
          </div>
        </Section>

        <Section id="benefits">
          <h2 className="section-title">{t('home.benefits.title')}</h2>
          <p className="section-subtitle">{t('home.benefits.subtitle')}</p>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={benefitIcons[index]}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </Section>

        <Section id="gallery">
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">A glimpse into our activities and events.</p>
          <Gallery />
        </Section>
      </div>
    </div>
  );
};

export default Home;