import { useEffect, useState, useRef } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import heroImg from '../assets/hero.png';

export default function HomePage(){
  const [y, setY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(()=>{
    const onScroll = () => setY(window.scrollY || 0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onScroll();
          window.addEventListener("scroll", onScroll, { passive: true });
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { threshold: 0 }
    );

    const currentHeroRef = heroRef.current;
    if (currentHeroRef) {
      observer.observe(currentHeroRef);
    }

    return () => {
      if (currentHeroRef) {
        observer.unobserve(currentHeroRef);
      }
      window.removeEventListener("scroll", onScroll);
    };
  },[]);

  return (
    <>
      <header
        ref={heroRef}
        className="hero hero-cut" /* Added hero-cut */
        style={{ ["--scrollY" as any]: `${y}px`, ["--next-bg" as any]: "var(--slice-blue)" }} /* next-bg for diagonal */
      >
        <div className="hero-media" style={{ backgroundImage:`url(${heroImg})` }} />
        <div className="container hero-inner">
          <h1 className="display">Who we are</h1>
          <p className="lead mt-24">
            Hands-on STEM for every learner—open resources, real projects, and a global community.
          </p>
          <div className="mt-32" style={{display:"flex", gap:12, flexWrap:"wrap"}}>
            <a className="btn" href="/about">Our mission <ArrowRight size={18}/></a>
            <a className="btn btn-ghost" href="/support">Support</a>
          </div>
        </div>
      </header>

      <section className="slice slice--blue slice--diag-top slice--diag-bottom"> {/* Restored slice classes */}
        <div className="slice-inner container">
          <div className="grid cols-2">
            {[{
              title:"Coquitlam Branch",
              icon:<MapPin />,
              img:"https://picsum.photos/seed/coquitlam/800/500",
              copy:"Visit our main campus in Coquitlam for workshops and events."
            },{
              title:"Maple Ridge Branch",
              icon:<MapPin />,
              img:"https://picsum.photos/seed/mapleridge/800/500",
              copy:"Explore our satellite location in Maple Ridge, now open."
            }].map((c,i)=>(
              <article className="card card-elevated" key={i}>
                <div className="card-hero" style={{backgroundImage:`url(${c.img})`}}/>
                <h3 className="subhead" style={{display:"flex", alignItems:"center", gap:10}}>
                  <span style={{display:"inline-flex", width:28}}>{c.icon}</span>{c.title}
                </h3>
                <p className="mt-16">{c.copy}</p>
                <a className="btn mt-24" href="#">Learn more</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="slice slice--soft"> {/* Restored slice class */}
        <div className="slice-inner container">
          <h2 className="section-title center mb-32">Impact</h2>
          <div className="grid cols-3">
            {[
              {n:"50k+", t:"learners"},
              {n:"120+", t:"events"},
              {n:"30+", t:"countries"},
            ].map((k,i)=>(
              <div className="card center" key={i}>
                <div style={{fontSize:44, fontWeight:900, color:"var(--accent-dark)"}}>{k.n}</div>
                <div style={{fontWeight:700}}>{k.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}