import React from 'react';
import { useTranslation } from 'react-i18next';
import './Legal.css';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="legal-page-container">
      <h1>{t('privacy.title')}</h1>
      <p className="last-updated">{t('privacy.lastUpdated')}</p>

      <p>{t('privacy.intro')}</p>

      <section>
        <h2>{t('privacy.collect.title')}</h2>
        <p>{t('privacy.collect.p1')}</p>
        <p>{t('privacy.collect.p2')}</p>
      </section>
      
      <section>
        <h2>{t('privacy.use.title')}</h2>
        <p>{t('privacy.use.p1')}</p>
        <ul>
            {(t('privacy.use.list', { returnObjects: true }) as string[]).map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </section>

      <section>
        <h2>{t('privacy.sharing.title')}</h2>
        <p>{t('privacy.sharing.p1')}</p>
      </section>

      <section>
        <h2>{t('privacy.security.title')}</h2>
        <p>{t('privacy.security.p1')}</p>
      </section>

      <section>
        <h2>{t('privacy.rights.title')}</h2>
        <p>{t('privacy.rights.p1')}</p>
      </section>

      <section>
        <h2>{t('privacy.contact.title')}</h2>
        <p>
          {t('privacy.contact.p1')}<a href="mailto:hello@stemsf.org">hello@stemsf.org</a>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;