import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Leadership from './pages/Leadership/Leadership';
import GetInvolved from './pages/GetInvolved/GetInvolved';
import Donate from './pages/Donate/Donate';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;