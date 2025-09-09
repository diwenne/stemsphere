import { Link } from "react-router-dom";
import logo from "../assets/logo-placeholder.png";

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <div style={{display:"grid", gap:24, gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))"}}>
          <div>
            <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:12}}>
              <img src={logo} width={32} height={32} alt="" style={{borderRadius:8, background:"#ccc"}}/>
              <strong>stemsphere</strong>
            </div>
            <p>Accessible STEM programs, resources, and community.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul style={{listStyle:"none", padding:0, margin:0, display:"grid", gap:8}}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>contact@stemsphere.org</p>
            <p className="mono">+1 (555) 555-0133</p>
          </div>
        </div>
        <div className="footer-foot">&copy; {new Date().getFullYear()} Stemsphere.</div>
      </div>
    </footer>
  );
}