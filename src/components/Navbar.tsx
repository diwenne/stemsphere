import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Effect to handle body scroll based on menu state
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);


  return (
    <>
      <header className="nav">
        <div className="container nav-row">
          <Link to="/" className="brand" aria-label="Home">
            {/* Replaced the local image path with a placeholder to resolve the error */}
            <img src="https://placehold.co/36x36/2f6fed/ffffff?text=S" alt="stemsphere logo" />
            <span className="brand-name">stemsphere</span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              About
            </NavLink>
            <NavLink
              to="/involve"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Get Involved
            </NavLink>
            <NavLink
              to="/donate"
              className={({ isActive }) => `nav-link nav-cta ${isActive ? "active" : ""}`}
            >
              Donate
            </NavLink>
          </nav>

          <div className="nav-controls">
            <button className="lang-switcher">EN</button>
            <button className="search-btn" aria-label="Search">
              <Search size={20} />
            </button>
            <button className="burger" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* The mobile panel is now a self-contained unit with its own close button */}
      <div className={`mobile-panel ${open ? "open" : ""}`}>
        <div className="mobile-panel-header">
            <div className="mobile-search-container">
                <Search size={22} />
                <span>Search</span>
            </div>
            <div className="mobile-header-controls">
                <button className="lang-switcher">EN</button>
                <button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close menu">
                    <X size={28} />
                </button>
            </div>
        </div>
        <div className="mobile-list">
            <NavLink to="/" className="mobile-link" onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/about" className="mobile-link" onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/involve" className="mobile-link" onClick={() => setOpen(false)}>Get Involved</NavLink>
            <NavLink to="/donate" className="mobile-link" onClick={() => setOpen(false)}>Donate</NavLink>
        </div>
      </div>
    </>
  );
}

