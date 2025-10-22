import { useTranslation } from 'react-i18next';
import Section from '../../components/Section/Section';
import './GetInvolved.css';
import handbookPdf from '../../assets/handbook.pdf';

const GetInvolved = () => {
  const { t } = useTranslation();

  return (
    <Section id="get-involved" className="get-involved-page">
      <div className="get-involved-header">
        <span className="page-pill">{t('getInvolved.pill')}</span>
        <h1 className="page-title">{t('getInvolved.title')}</h1>
        <p className="page-subtitle">{t('getInvolved.subtitle')}</p>
      </div>

      <div className="paths-container">
        <div className="path-card">
          <div className="card-icon-wrapper">
            <span className="card-icon">🌍</span>
          </div>
          <h2 className="card-title">{t('getInvolved.chapter.title')}</h2>
          <p className="card-description">{t('getInvolved.chapter.description')}</p>
          <ul className="card-features">
            {(t('getInvolved.chapter.features', { returnObjects: true }) as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <a href="#" className="btn btn-primary card-cta">{t('getInvolved.chapter.cta')}</a>
        </div>

        <div className="path-card">
          <div className="card-icon-wrapper">
            <span className="card-icon">🏫</span>
          </div>
          <h2 className="card-title">{t('getInvolved.workshop.title')}</h2>
          <p className="card-description">{t('getInvolved.workshop.description')}</p>
          <ul className="card-features">
            {(t('getInvolved.workshop.features', { returnObjects: true }) as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <div className="card-cta-group">
            <a href="#" className="btn btn-primary card-cta">{t('getInvolved.workshop.cta')}</a>
            <a href={handbookPdf} className="btn btn-secondary-outline card-cta" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              View School Handbook
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default GetInvolved;