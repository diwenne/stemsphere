import { useTranslation } from 'react-i18next';
import { Mail, Linkedin, Instagram } from 'lucide-react';
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
              <Mail size={24} />
            </a>
            <a href="https://www.linkedin.com/company/stemsf" target="_blank" rel="noopener noreferrer" aria-label="Stemsphere Foundation on LinkedIn" title="LinkedIn">
              <Linkedin size={24} />
            </a>
            {/* --- Instagram Icon Added --- */}
            <a href="https://www.instagram.com/stemspherefoundation?igsh=bm9obDliMm90Ym04&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Stemsphere on Instagram" title="Instagram">
              <Instagram size={24} />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>{t('footer.navigate')}</h4>
          <a href="/">{t('footer.home')}</a>
          <a href="/about">{t('footer.about')}</a>
          <a href="/get-involved">{t('footer.getInvolved')}</a>
          <a href="https://learn.stemsf.org" target="_blank" rel="noopener noreferrer">Learn</a>
          <a href="/donate">{t('footer.donate')}</a>
        </div>

        {/* The "Follow Us" div has been removed */}
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