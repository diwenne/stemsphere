import React, { useEffect, useState, useRef } from "react"; // MODIFIED: Imported useRef
import { ArrowRight, MapPin } from "lucide-react";
import heroImg from '../assets/hero.png';
import DiagonalSlice from "../components/DiagonalSlice";

export default function HomePage(){
  const [y, setY] = useState(0);
  const heroRef = useRef<HTMLElement>(null); // NEW: Create a reference for the hero element

  useEffect(()=>{
    const onScroll = () => setY(window.scrollY || 0);

    // NEW: Use an observer to only run parallax when the hero is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If hero is visible, add the scroll listener
          onScroll(); // Run once on entry
          window.addEventListener("scroll", onScroll, { passive: true });
        } else {
          // If hero is not visible, remove the listener to save resources
          window.removeEventListener("scroll", onScroll);
        }
      },
      { threshold: 0 } // The threshold determines how much of the element needs to be visible
    );

    const currentHeroRef = heroRef.current;
    if (currentHeroRef) {
      observer.observe(currentHeroRef);
    }

    // Cleanup function to disconnect the observer and remove the listener
    return () => {
      if (currentHeroRef) {
        observer.unobserve(currentHeroRef);
      }
      window.removeEventListener("scroll", onScroll);
    };
  },[]); // This effect runs only once on mount

  return (
    <>
      {/* HERO with diagonal cut onto blue slice */}
      <header
        ref={heroRef} // MODIFIED: Attach the ref to the header element
        className="hero hero-cut"
        style={{ ["--scrollY" as any]: `${y}px`, ["--next-bg" as any]: "var(--slice-blue)" }}
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

      {/* FIRST SLICE (blue) */}
      <DiagonalSlice tone="blue" top bottom>
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
      </DiagonalSlice>

      {/* SECOND SLICE (plain) – impact panels */}
      <DiagonalSlice>
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
      </DiagonalSlice>
    </>
  );
}