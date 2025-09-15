import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import stemsphereLogo from '../../assets/stemsphere.png'; // Make sure this path is correct

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
        
        {/* --- MODIFICATION: Use stemsphere.png and keep special text --- */}
        <Link to="/" className="stemsphere-logo" onClick={handleLogoClick}>
          <img src={stemsphereLogo} alt="Stemsphere Logo" className="logo-icon" />
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