import { useEffect, useState } from "react";

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
          <h1 className="display">Our Mission</h1>
          <p className="lead mt-24">
            We believe in a future where every young person has the skills and confidence to solve the world's greatest challenges.
          </p>
        </div>
      </header>

      <section className="slice slice--soft slice--diag-top slice--diag-bottom pad-top-diag">
        <div className="slice-inner container" style={{ maxWidth: 1000 }}>
          <div className="grid cols-2" style={{alignItems:"start", gap: 32}}>
            <div>
              <h3 className="subhead">Our Vision</h3>
              <p>To create a global community where every young person can access engaging STEM learning, develop critical thinking skills, and contribute to a better future through technology and innovation.</p>
              <h3 className="subhead mt-32">Our Approach</h3>
              <p>We focus on hands-on challenges, open-source educational materials, and strong educator support to ensure our programs are easy to adopt, scale, and adapt for any community's needs.</p>
            </div>
            <div className="card">
              <h4 style={{marginTop:0}}>By the Numbers</h4>
              <ul style={{margin:0, paddingLeft:18, lineHeight:1.9}}>
                <li><strong>1,200+ hours</strong> of open curriculum (CC BY)</li>
                <li><strong>50,000+ students</strong> reached globally</li>
                <li><strong>300+ partnerships</strong> with schools & libraries</li>
                <li><strong>15,000+ volunteer hours</strong> contributed annually</li>
                <li>Mentor training & ongoing support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="slice">
        <div className="slice-inner container" style={{ maxWidth: 1000 }}>
          <h2 className="section-title center">Our History</h2>
          <p className="lead center" style={{maxWidth: 800, marginInline: 'auto'}}>
            Founded in 2018 by a group of educators and engineers, Stemsphere started as a local workshop series. Seeing the immense demand for accessible, hands-on STEM education, we expanded our mission to create a free, open-source curriculum for the world.
          </p>
        </div>
      </section>
    </>
  );
}
