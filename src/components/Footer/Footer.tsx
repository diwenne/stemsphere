import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3 className="footer-logo">Stemsphere Foundation</h3>
          <p className="footer-mission">Empowering the next generation of innovators through STEM education.</p>
          
          {/* --- Icons are now here, below the mission statement --- */}
          <div className="footer-contact-icons">
            <a href="mailto:hello@stemsf.org" aria-label="Email Stemsphere Foundation" title="Email">
              {/* New, cleaner email icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/stemsf" target="_blank" rel="noopener noreferrer" aria-label="Stemsphere Foundation on LinkedIn" title="LinkedIn">
              {/* New, cleaner LinkedIn icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="footer-links">
          <h4>Navigate</h4>
          <a href="/">Home</a>
          <a href="/leadership">Leadership</a>
          <a href="/get-involved">Get Involved</a>
          <a href="/donate">Donate</a>
        </div>
        
        <div className="footer-social">
          <h4>Follow Us</h4>
          <a href="https://www.instagram.com/stemspherefoundation?igsh=bm9obDliMm90Ym04&utm_source=qr" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Stemsphere Foundation. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;