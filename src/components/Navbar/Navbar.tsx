import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
        <NavLink to="/" className="navbar-logo" onClick={handleLogoClick}>
          Stemsphere Foundation
        </NavLink>

        {/* Desktop Links */}
        <div className="navbar-links">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={`/#${item.to}`}
              // THE FIX: Use a function to override NavLink's default active class
              className={() => 
                activeSection === item.to ? 'nav-link active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
          {/* These links correctly use the default 'isActive' behavior */}
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
            // THE FIX: Also apply the override here
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