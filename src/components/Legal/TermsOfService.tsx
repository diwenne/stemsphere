import React from 'react';
import { useTranslation } from 'react-i18next';
import './Legal.css';

const TermsOfService: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="legal-page-container">
      <h1>{t('terms.title')}</h1>
      <p className="last-updated">{t('terms.lastUpdated')}</p>

      <section>
        <h2>{t('terms.agreement.title')}</h2>
        <p>{t('terms.agreement.p1')}</p>
      </section>
      
      <section>
        <h2>{t('terms.useOfSite.title')}</h2>
        <p>{t('terms.useOfSite.p1')}</p>
      </section>

      <section>
        <h2>{t('terms.intellectualProperty.title')}</h2>
        <p>{t('terms.intellectualProperty.p1')}</p>
      </section>

      <section>
        <h2>{t('terms.donations.title')}</h2>
        <p>{t('terms.donations.p1')}</p>
      </section>

      <section>
        <h2>{t('terms.links.title')}</h2>
        <p>{t('terms.links.p1')}</p>
      </section>
      
      <section>
        <h2>{t('terms.liability.title')}</h2>
        <p>{t('terms.liability.p1')}</p>
      </section>

      <section>
        <h2>{t('terms.law.title')}</h2>
        <p>{t('terms.law.p1')}</p>
      </section>
      
      <section>
        <h2>{t('terms.contact.title')}</h2>
        <p>
          {t('terms.contact.p1')}<a href="mailto:hello@stemsf.org">hello@stemsf.org</a>.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;