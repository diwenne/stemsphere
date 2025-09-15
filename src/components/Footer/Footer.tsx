import { useTranslation } from 'react-i18next';
import './Footer.css';
import stemsphereLogo from '../../assets/stemsphere.png';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <div className="footer-logo-container">
            <img src={stemsphereLogo} alt="Stemsphere Logo" className="footer-logo-icon" />
            <span className="footer-logo-text">
              <span className="footer-logo-stem">Stem</span><span className="footer-logo-sphere">sphere</span>
            </span>
          </div>
          <p className="footer-mission">{t('footer.mission')}</p>
          <div className="footer-contact-icons">
            <a href="mailto:hello@stemsf.org" aria-label="Email Stemsphere Foundation" title="Email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/stemsf" target="_blank" rel="noopener noreferrer" aria-label="Stemsphere Foundation on LinkedIn" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="footer-links">
          <h4>{t('footer.navigate')}</h4>
          <a href="/">{t('footer.home')}</a>
          <a href="/leadership">{t('footer.leadership')}</a>
          <a href="/get-involved">{t('footer.getInvolved')}</a>
          <a href="/donate">{t('footer.donate')}</a>
        </div>
        
        <div className="footer-social">
          <h4>{t('footer.followUs')}</h4>
          <a href="https://www.instagram.com/stemspherefoundation?igsh=bm9obDliMm90Ym04&utm_source=qr" target="_blank" rel="noopener noreferrer">{t('footer.instagram')}</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        <div className="footer-legal-links">
          <a href="/privacy-policy">{t('footer.privacyPolicy')}</a>
          <a href="/terms-of-service">{t('footer.termsOfService')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;