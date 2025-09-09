import { useEffect, useState } from "react";
import DiagonalSlice from "../components/DiagonalSlice";

const heroImg = "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=2000&auto=format&fit=crop";

export default function AboutPage(){
  const [y, setY] = useState(0);
  useEffect(()=>{
    const onScroll = () => setY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive:true });
    return ()=> window.removeEventListener("scroll", onScroll);
  },[]);

  return (
    <>
      <header
        className="hero hero-cut"
        style={{ ["--scrollY" as any]: `${y}px`, ["--next-bg" as any]: "var(--slice-soft)" }}
      >
        <div className="hero-media" style={{backgroundImage:`url(${heroImg})`}} />
        <div className="container hero-inner">
          <h1 className="section-title">About</h1>
          <p className="lead">The story behind Stemsphere.</p>
        </div>
      </header>

      <DiagonalSlice tone="soft" top bottom>
        <div className="grid cols-2" style={{alignItems:"start"}}>
          <div>
            <h3 className="subhead">Vision</h3>
            <p>Every young person can access engaging STEM learning and contribute to a better future.</p>
            <h3 className="subhead mt-32">Approach</h3>
            <p>Hands-on challenges, open materials, and strong educator support for easy adoption and scale.</p>
          </div>
          <div className="card">
            <h4 style={{marginTop:0}}>By the numbers</h4>
            <ul style={{margin:0, paddingLeft:18, lineHeight:1.9}}>
              <li>Open curriculum (CC BY)</li>
              <li>Partnerships with schools & libraries</li>
              <li>Mentor training & support</li>
            </ul>
          </div>
        </div>
      </DiagonalSlice>

      <DiagonalSlice>
        <h3 className="subhead center mb-32">Team</h3>
        <div className="grid cols-3">
          {["Evelyn Reed — CEO","Marcus Chen — Programs","Aisha Patel — Community","Leo Martinez — Technology","Priya Nair — Research","Samir Ali — Partnerships"].map((name,i)=>(
            <div key={i} className="card center">
              <div style={{
                width:140, height:140, margin:"0 auto 12px",
                borderRadius:"50%", backgroundImage:`url(https://picsum.photos/seed/person${i}/400)`,
                backgroundSize:"cover", backgroundPosition:"center"
              }}/>
              <strong>{name}</strong>
            </div>
          ))}
        </div>
      </DiagonalSlice>
    </>
  );
}