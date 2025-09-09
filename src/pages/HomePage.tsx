import { useEffect, useState } from "react";
import { ArrowRight, Atom, Microscope, Cpu } from "lucide-react";
import DiagonalSlice from "../components/DiagonalSlice";

/* STEM-y hero image */
const heroImg = "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2000&auto=format&fit=crop";

export default function HomePage(){
  const [y, setY] = useState(0);
  useEffect(()=>{
    const onScroll = () => setY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive:true });
    return ()=> window.removeEventListener("scroll", onScroll);
  },[]);

  return (
    <>
      {/* HERO with diagonal cut onto blue slice */}
      <header
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
        <div className="grid cols-3">
          {[{
            title:"Robotics lab kits",
            icon:<Cpu />,
            img:"https://picsum.photos/seed/robot/800/500",
            copy:"Starter activities for sensors, control, and autonomy."
          },{
            title:"Microbiology at home",
            icon:<Microscope />,
            img:"https://picsum.photos/seed/micro/800/500",
            copy:"Low-cost experiments and safety-first guides."
          },{
            title:"Atomic modeling",
            icon:<Atom />,
            img:"https://picsum.photos/seed/atom/800/500",
            copy:"Materials + worksheets to visualize the unseen."
          }].map((c,i)=>(
            <article className="card card-elevated" key={i}>
              <div className="card-hero" style={{backgroundImage:`url(${c.img})`}}/>
              <h3 className="subhead" style={{display:"flex", alignItems:"center", gap:10}}>
                <span style={{display:"inline-flex", width:28}}>{c.icon}</span>{c.title}
              </h3>
              <p className="mt-16">{c.copy}</p>
              <a className="btn mt-24" href="#">View resources</a>
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
              <div style={{fontSize:44, fontWeight:900, color:"var(--accent)"}}>{k.n}</div>
              <div style={{fontWeight:700}}>{k.t}</div>
            </div>
          ))}
        </div>
      </DiagonalSlice>
    </>
  );
}