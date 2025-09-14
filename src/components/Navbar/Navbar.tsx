import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false); // Close mobile menu on any click
    if (!isHomePage) {
      navigate(path);
    }
  };

  const navItems = [
    { to: 'benefits', label: 'Benefits' },
    { to: 'impact', label: 'Impact' },
  ];

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
          Stemsphere Foundation
        </NavLink>

        {/* Desktop Links */}
        <div className="navbar-links">
          {isHomePage ? (
            <>
              {navItems.map(item => (
                <ScrollLink key={item.to} to={item.to} spy={true} smooth={true} offset={-70} duration={500} className="nav-link">
                  {item.label}
                </ScrollLink>
              ))}
            </>
          ) : (
            <>
              {navItems.map(item => (
                <NavLink key={item.to} to={`/#${item.to}`} className="nav-link" onClick={() => handleNavClick('/')}>
                  {item.label}
                </NavLink>
              ))}
            </>
          )}
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
        {isHomePage ? (
          <>
            {navItems.map(item => (
              <ScrollLink key={item.to} to={item.to} spy={true} smooth={true} offset={-70} duration={500} className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </ScrollLink>
            ))}
          </>
        ) : (
          <>
            {navItems.map(item => (
              <NavLink key={item.to} to={`/#${item.to}`} className="nav-link" onClick={() => handleNavClick('/')}>
                {item.label}
              </NavLink>
            ))}
          </>
        )}
        <NavLink to="/leadership" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Leadership</NavLink>
        <NavLink to="/get-involved" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Get Involved</NavLink>
      </div>
    </header>
  );
};

export default Navbar;