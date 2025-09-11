import { useEffect, useState, useRef } from "react";

const heroImg = "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2000&auto=format&fit=crop";

export default function InvolvePage() {
  const [y, setY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(()=>{
    const onScroll = () => setY(window.scrollY || 0);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    });
    const currentHeroRef = heroRef.current;
    if (currentHeroRef) observer.observe(currentHeroRef);
    return () => {
      if (currentHeroRef) observer.unobserve(currentHeroRef);
      window.removeEventListener("scroll", onScroll);
    };
  },[]);

  return (
    <>
      <header
        ref={heroRef}
        className="hero hero-cut"
        style={{ ["--scrollY" as any]: `${y}px`, ["--next-bg" as any]: "var(--slice-soft)" }}
      >
        <div className="hero-media" style={{backgroundImage:`url(${heroImg})`}} />
        <div className="container hero-inner">
          <h1 className="display">Join the Movement</h1>
          <p className="lead mt-24">
            Become a part of our mission to empower the next generation of innovators. Contribute your time, skills, and passion to make a difference.
          </p>
        </div>
      </header>

      <section className="slice slice--soft pad-top-diag slice--diag-bottom">
        <div className="slice-inner container" style={{ maxWidth: 1000 }}>
          <div className="grid cols-3">
            {[
              {
                t: "Volunteer",
                d: "Mentor at a workshop, help develop curriculum, or provide technical support. We welcome STEM professionals and enthusiasts from all backgrounds. Roles include: Event Mentor, Curriculum Developer, and Community Ambassador.",
                img: "https://picsum.photos/seed/volunteer/800/500"
              },
              {
                t: "Start a Chapter",
                d: "Bring Stemsphere to your community. We provide the resources and support you need, including a starter kit, mentorship from HQ, and access to our global network of educators.",
                img: "https://picsum.photos/seed/chapter/800/500"
              },
              {
                t: "Request a Workshop",
                d: "Partner with us to host a hands-on STEM workshop for your school, library, or organization. We offer turn-key sessions on Robotics, Intro to Coding, and Data Science.",
                img: "https://picsum.photos/seed/workshop/800/500"
              }
            ].map((c, i) => (
              <article key={i} className="card">
                <div className="card-hero" style={{ backgroundImage: `url(${c.img})` }} />
                <h3 className="subhead">{c.t}</h3>
                <p>{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      <section className="slice">
        <div className="slice-inner container center" style={{ maxWidth: 800 }}>
          <h2 className="section-title">Ready to take the next step?</h2>
          <p className="lead">
            Whether you want to make a financial gift or give your time, your support is vital to creating a world where every learner can thrive.
          </p>
          <div className="mt-32" style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a href="#" className="btn">Contact Us</a>
            <a href="/donate" className="btn">Donate Now</a>
          </div>
        </div>
      </section>
    </>
  );
}