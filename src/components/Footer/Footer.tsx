import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3 className="footer-logo">Stemsphere Foundation</h3>
          <p className="footer-mission">Empowering the next generation of innovators through STEM education.</p>
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
          {/* Add actual links */}
          <a href="https://www.instagram.com/stemspherefoundation?igsh=bm9obDliMm90Ym04&utm_source=qr">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Stemsphere Foundation. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;