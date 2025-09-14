import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Leadership from './pages/Leadership/Leadership';
import GetInvolved from './pages/GetInvolved/GetInvolved';
import Donate from './pages/Donate/Donate';
import PrivacyPolicy from './components/Legal/PrivacyPolicy';
import TermsOfService from './components/Legal/TermsOfService';

const AppContent = () => {
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    // If we are not on the homepage, clear the active section highlight
    if (location.pathname !== '/') {
      setActiveSection('');
    }

    // Scroll to top on page change, but only if there isn't a hash
    // This allows fragment links to work correctly on page load
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]); // Reruns when path or hash changes

  return (
    <>
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <main>
        <Routes>
          <Route 
            path="/" 
            element={<Home setActiveSection={setActiveSection} />} 
          />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;