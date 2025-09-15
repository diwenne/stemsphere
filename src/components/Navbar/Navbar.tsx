import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: 'benefits', label: 'Benefits' },
    { to: 'impact', label: 'Impact' },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogoClick = () => {
    closeMobileMenu();
    setActiveSection('');
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        
        {/* MODIFICATION: New Stemsphere Logo */}
        <Link to="/" className="stemsphere-logo" onClick={handleLogoClick}>
          <svg className="logo-icon" width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0D9488" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="#2DD4BF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.03027 4.07031C9.13027 6.36031 9.68027 8.91031 9.68027 11.5C9.68027 12.0103 9.65027 12.5203 9.60027 13.0203" stroke="#2DD4BF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="logo-text">
            <span className="logo-stem">Stem</span><span className="logo-sphere">sphere</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={`/#${item.to}`}
              className={() => 
                activeSection === item.to ? 'nav-link active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/leadership" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Leadership
          </NavLink>
          <NavLink to="/get-involved" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Get Involved
          </NavLink>
        </div>

        {/* Donate CTA & Hamburger */}
        <div className="navbar-right">
          <NavLink to="/donate" className="navbar-cta">
            Donate Now
          </NavLink>
          <button className="hamburger-menu" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={`/#${item.to}`}
            onClick={closeMobileMenu}
            className={() => 
              activeSection === item.to ? 'nav-link active' : 'nav-link'
            }
          >
            {item.label}
          </NavLink>
        ))}
        <NavLink to="/leadership" className="nav-link" onClick={closeMobileMenu}>Leadership</NavLink>
        <NavLink to="/get-involved" className="nav-link" onClick={closeMobileMenu}>Get Involved</NavLink>

        <NavLink to="/donate" className="nav-link mobile-donate" onClick={closeMobileMenu}>Donate Now</NavLink>
      </div>
    </header>
  );
};

export default Navbar;