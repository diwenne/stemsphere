import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';
import stemsphereLogo from '../../assets/stemsphere.png';

const languages = [
  { code: 'en', name: 'EN' },
  { code: 'es', name: 'ES' },
  { code: 'fr', name: 'FR' },
  { code: 'de', name: 'DE' },
];

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isMobileLangOpen, setMobileLangOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const currentLanguage = languages.find(lang => i18n.language.startsWith(lang.code)) || languages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangDropdownOpen(false);
    setMobileLangOpen(false);
  };

  const navItems = [
    { to: 'impact', label: t('navbar.impact') },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileLangOpen(false);
  }

  const handleLogoClick = () => {
    closeMobileMenu();
    setActiveSection('');
  };

  // NEW: Logic for the hamburger/close button
  const handleHamburgerClick = () => {
    if (isMobileLangOpen) {
      // If the language overlay is open, the first priority is to close it.
      setMobileLangOpen(false);
    } else {
      // Otherwise, toggle the main menu as normal.
      setMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [desktopDropdownRef]);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.navbar-header');
      if (header) {
        // If not on home page, always show as scrolled (solid background)
        if (location.pathname !== '/') {
          header.classList.add('scrolled');
        } else {
          // On home page, toggle based on scroll position
          if (window.scrollY > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }
      }
    };

    // Run once on mount/location change to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        <Link to="/" className="stemsphere-logo" onClick={handleLogoClick}>
          <img src={stemsphereLogo} alt="Stemsphere Logo" className="logo-icon" />
          <span className="logo-text">
            <span className="logo-stem">Stem</span><span className="logo-sphere">sphere</span>
          </span>
        </Link>

        <div className="navbar-links">
          {navItems.map(item => (<NavLink key={item.to} to={`/#${item.to}`} className={() => activeSection === item.to ? 'nav-link active' : 'nav-link'}>{item.label}</NavLink>))}
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>{t('navbar.about')}</NavLink>
          <NavLink to="/gallery" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Gallery</NavLink>
          <NavLink to="/get-involved" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>{t('navbar.getInvolved')}</NavLink>
          <a href="https://learn.stemsf.org" className="nav-link" target="_blank" rel="noopener noreferrer">Learn</a>
        </div>

        <div className="navbar-right">
          <div className="language-switcher" ref={desktopDropdownRef}>
            <button className="current-lang-btn" onClick={() => setLangDropdownOpen(!isLangDropdownOpen)}>
              {currentLanguage.name} <ChevronDown size={14} className="dropdown-arrow" />
            </button>
            {isLangDropdownOpen && (
              <div className="lang-dropdown">
                {languages.filter(lang => lang.code !== currentLanguage.code).map(lang => (<button key={lang.code} onClick={() => changeLanguage(lang.code)}>{lang.name}</button>))}
              </div>
            )}
          </div>
          <NavLink to="/donate" className="navbar-cta">{t('navbar.donate')}</NavLink>
          <button className="hamburger-menu" onClick={handleHamburgerClick}>
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE CONTROLS --- */}
      {isMobileMenuOpen && (
        // NEW: This button now toggles the language overlay
        <button className="mobile-lang-button" onClick={() => setMobileLangOpen(!isMobileLangOpen)}>
          {currentLanguage.name}
        </button>
      )}

      {/* --- MAIN MOBILE MENU --- */}
      <div className={`mobile-nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        {navItems.map(item => (<NavLink key={item.to} to={`/#${item.to}`} onClick={closeMobileMenu} className={() => activeSection === item.to ? 'nav-link active' : 'nav-link'}>{item.label}</NavLink>))}
        <NavLink to="/about" className="nav-link" onClick={closeMobileMenu}>{t('navbar.about')}</NavLink>
        <NavLink to="/gallery" className="nav-link" onClick={closeMobileMenu}>Gallery</NavLink>
        <NavLink to="/get-involved" className="nav-link" onClick={closeMobileMenu}>{t('navbar.getInvolved')}</NavLink>
        <a href="https://learn.stemsf.org" className="nav-link" onClick={closeMobileMenu} target="_blank" rel="noopener noreferrer">Learn</a>
        <NavLink to="/donate" className="nav-link mobile-donate" onClick={closeMobileMenu}>{t('navbar.donate')}</NavLink>
      </div>

      {/* --- FULL-SCREEN LANGUAGE OVERLAY --- */}
      <div className={`mobile-lang-overlay ${isMobileLangOpen ? 'open' : ''}`}>
        {languages.map(lang => (
          <button key={lang.code} onClick={() => changeLanguage(lang.code)} className={currentLanguage.code === lang.code ? 'active' : ''}>
            {lang.name}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Navbar;