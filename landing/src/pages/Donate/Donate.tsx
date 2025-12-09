import { useTranslation } from 'react-i18next';
import { Rocket, Wrench, Sprout, Landmark } from 'lucide-react';
import Section from '../../components/Section/Section';
import './Donate.css';

const Donate = () => {
  const { t } = useTranslation();

  const donationCards = t('donate.whereDonationGoes.cards', { returnObjects: true }) as { title: string, description: string }[];

  const donationIcons = [
    <Rocket size={32} strokeWidth={1.5} />,
    <Wrench size={32} strokeWidth={1.5} />,
    <Sprout size={32} strokeWidth={1.5} />,
    <Landmark size={32} strokeWidth={1.5} />
  ];

  return (
    <>
      <Section id="donate" className="donate-hero-section">
        <h1 className="donate-title">{t('donate.title')}</h1>
        <p className="donate-description">{t('donate.description')}</p>

        <div className="etransfer-box">
          <h3 className="etransfer-title">{t('donate.etransfer.title')}</h3>
          <p>{t('donate.etransfer.instruction')}</p>
          <p className="etransfer-email">hello@stemsf.org</p>
          <p className="etransfer-note">{t('donate.etransfer.note')}</p>
        </div>
      </Section>

      <Section id="impact-details">
        <h2 className="section-title">{t('donate.whereDonationGoes.title')}</h2>
        <div className="impact-grid">

          {donationCards.map((card, index) => (
            <div className="impact-card" key={index}>
              <span className="impact-icon">{donationIcons[index]}</span>
              <h3 className="impact-card-title">{card.title}</h3>
              <p className="impact-card-description">{card.description}</p>
            </div>
          ))}

        </div>
      </Section>
    </>
  );
};

export default Donate;