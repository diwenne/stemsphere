import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo-placeholder.png";

export default function Navbar(){
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  return (
    <>
      <header className="nav">
        <div className="container nav-row">
          <Link to="/" className="brand" aria-label="Home">
            <img src={logo} alt="" />
            <span className="brand-name">stemsphere</span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            <NavLink to="/" className={({isActive})=>`nav-link ${isActive?"active":""}`}>Home</NavLink>
            <NavLink to="/about" className={({isActive})=>`nav-link ${isActive?"active":""}`}>About</NavLink>
            <NavLink to="/support" className={({isActive})=>`nav-link ${isActive?"active":""}`}>Support</NavLink>
            <button className="nav-cta" onClick={()=>nav("/donate")}>Donate</button>
          </nav>

          <button className="burger" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">
            {open ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </header>

      <div className={`mobile-panel ${open ? "open" : ""}`}>
        <div className="container">
          <div className="mobile-list" onClick={()=>setOpen(false)}>
            <NavLink to="/" className="mobile-link">Home</NavLink>
            <NavLink to="/about" className="mobile-link">About</NavLink>
            <NavLink to="/support" className="mobile-link">Support</NavLink>
            <Link to="/donate" className="mobile-donate">Donate</Link>
          </div>
        </div>
      </div>
    </>
  );
}