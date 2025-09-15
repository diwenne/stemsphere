import { useTranslation } from 'react-i18next';
import Section from '../../components/Section/Section';
import LeadershipCard from '../../components/LeadershipCard/LeadershipCard';
import './About.css';
import diwen from '../../assets/diwen.jpg';
import wilson from '../../assets/wilson.png';
import drishya from '../../assets/drishya.jpg';
import tristan from '../../assets/tristan.png';
import zoe from '../../assets/zoe.jpg';
import eden from '../../assets/eden.jpg';
import timmy from '../../assets/timmy.jpg';
import andy from '../../assets/andy.jpg';

interface Leader {
  name: string;
  title: string;
  affiliation: string;
  bio: string;
  avatarUrl: string;
  tags: string[];
  linkedinUrl: string;
}

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
}

const About = () => {
  const { t } = useTranslation();
  
  const translatedLeaders = t('about.leaders', { returnObjects: true }) as Omit<Leader, 'avatarUrl'>[];
  const valueCards = t('about.values.cards', { returnObjects: true }) as ValueCardProps[];

  const avatarMap: { [key: string]: string } = {
    'Diwen Huang': diwen,
    'Wilson Huang': wilson,
    'Drishya Sharma': drishya,
    'Tristan Du': tristan,
    'Zoe Zhu': zoe,
    'Eden Liang': eden,
    'Timmy Jin': timmy,
    'Andy Guo': andy,
  };

  const leaders: Leader[] = translatedLeaders.map(leader => ({
    ...leader,
    avatarUrl: avatarMap[leader.name] || '',
  }));

  return (
    <>
      {/* --- Header and Content are now inside a SINGLE Section --- */}
      <Section id="about">
        <div className="page-header">
          <h1 className="page-title">{t('about.header.title')}</h1>
          <p className="page-subtitle">{t('about.header.subtitle')}</p>
        </div>

        <div className="about-details">
          <div className="mission-vision-container">
            <div className="vision-box">
              <h2>{t('about.vision.title')}</h2>
              <p>{t('about.vision.description')}</p>
            </div>
            <div className="mission-box">
              <h2>{t('about.mission.title')}</h2>
              <p>{t('about.mission.description')}</p>
            </div>
          </div>
          <h2 className="values-title">{t('about.values.title')}</h2>
          <div className="values-grid">
            {valueCards.map((card, index) => (
              <div className="value-card" key={index}>
                <span className="value-icon">{card.icon}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="team">
        <div className="team-header">
          <span className="header-subtitle">{t('about.team.subtitle')}</span>
          <h1 className="header-title">{t('about.team.title')}</h1>
          <p className="header-description">{t('about.team.description')}</p>
        </div>
        <div className="leadership-grid">
          {leaders.map((leader, index) => (
            <LeadershipCard key={index} {...leader} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default About;