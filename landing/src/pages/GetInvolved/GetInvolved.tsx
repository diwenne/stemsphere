import { useTranslation } from 'react-i18next';
import Section from '../../components/Section/Section';
import './GetInvolved.css';

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
          <a href="#" className="btn btn-primary card-cta">{t('getInvolved.workshop.cta')}</a>
        </div>
      </div>
    </Section>
  );
};

export default GetInvolved;