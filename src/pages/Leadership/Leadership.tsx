import { useTranslation } from 'react-i18next';
import Section from '../../components/Section/Section';
import LeadershipCard from '../../components/LeadershipCard/LeadershipCard';
import './Leadership.css';
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

const Leadership = () => {
  const { t } = useTranslation();
  
  const translatedLeaders = t('leadership.leaders', { returnObjects: true }) as Omit<Leader, 'avatarUrl'>[];

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
    <Section id="leadership">
      <div className="leadership-header">
        <span className="header-subtitle">{t('leadership.subtitle')}</span>
        <h1 className="header-title">{t('leadership.title')}</h1>
        <p className="header-description">{t('leadership.description')}</p>
      </div>
      <div className="leadership-grid">
        {leaders.map((leader, index) => (
          <LeadershipCard key={index} {...leader} />
        ))}
      </div>
    </Section>
  );
};

export default Leadership;