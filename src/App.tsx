import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SupportPage from "./pages/SupportPage";
import DonatePage from "./pages/DonatePage"; // NEW
import InvolvePage from "./pages/InvolvePage";

export default function App() {
  return (
    <div className="site">
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/involve" element={<InvolvePage />} />
          <Route path="/donate" element={<DonatePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}