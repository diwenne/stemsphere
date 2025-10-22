import { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import stemsphereLogo from '/stemsphere.png';

interface NavbarProps {
  currentPage: 'home' | 'lessons' | 'playground';
  onNavigateHome: () => void;
  onNavigateLessons: () => void;
  onNavigatePlayground: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigateHome,
  onNavigateLessons,
  onNavigatePlayground
}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    closeMobileMenu();
    onNavigateHome();
  };

  const handleHomeClick = () => {
    closeMobileMenu();
    onNavigateHome();
  };

  const handleLessonsClick = () => {
    closeMobileMenu();
    onNavigateLessons();
  };

  const handlePlaygroundClick = () => {
    closeMobileMenu();
    onNavigatePlayground();
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        <div className="stemsphere-logo" onClick={handleLogoClick}>
          <img src={stemsphereLogo} alt="Stemsphere Logo" className="logo-icon" />
          <span className="logo-text">
            <span className="logo-stem">Stem</span><span className="logo-sphere">sphere</span>
          </span>
        </div>

        <div className="navbar-links">
          <button
            onClick={handleHomeClick}
            className={currentPage === 'home' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </button>
          <button
            onClick={handleLessonsClick}
            className={currentPage === 'lessons' ? 'nav-link active' : 'nav-link'}
          >
            Lessons
          </button>
          <button
            onClick={handlePlaygroundClick}
            className={currentPage === 'playground' ? 'nav-link active' : 'nav-link'}
          >
            Playground
          </button>
        </div>

        <div className="navbar-right">
          <a href="https://stemsf.org" className="navbar-cta" target="_blank" rel="noopener noreferrer">
            Main Site
          </a>
          <button className="hamburger-menu" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <div className={`mobile-nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <button onClick={handleHomeClick} className="nav-link">
          Home
        </button>
        <button onClick={handleLessonsClick} className="nav-link">
          Lessons
        </button>
        <button onClick={handlePlaygroundClick} className="nav-link">
          Playground
        </button>
        <a
          href="https://stemsf.org"
          className="nav-link mobile-main-site"
          onClick={closeMobileMenu}
          target="_blank"
          rel="noopener noreferrer"
        >
          Main Site
        </a>
      </div>
    </header>
  );
};

export default Navbar;
