import { useEffect, useState, useRef } from "react";

const heroImg = "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2000&auto=format&fit=crop";

export default function DonatePage() {
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
          <h1 className="display">Power Our Mission</h1>
          <p className="lead mt-24">
            Your contribution helps us provide free, accessible STEM programs and open resources to learners everywhere.
          </p>
          <div className="mt-32">
            <button
              className="btn"
              onClick={() => window.alert("Hook this to your donation flow")}
            >
              Donate Securely
            </button>
          </div>
        </div>
      </header>

      <section className="slice slice--soft pad-top-diag">
        <div className="slice-inner container" style={{ maxWidth: 900 }}>
            <h2 className="section-title center">Your Impact</h2>
            <p className="lead center">Every donation, no matter the size, directly supports our ability to create and deliver high-quality STEM experiences.</p>
            <div className="grid cols-3 mt-32">
              <div className="card center">
                <h3 className="subhead">$25</h3>
                <p>Provides a complete robotics kit for one learner's first project.</p>
              </div>
              <div className="card center">
                <h3 className="subhead">$75</h3>
                <p>Funds a community workshop for up to 10 students.</p>
              </div>
              <div className="card center">
                <h3 className="subhead">$250</h3>
                <p>Helps us develop and publish a new open-source learning module.</p>
              </div>
            </div>
        </div>
      </section>

      <section className="slice">
        <div className="slice-inner container" style={{ maxWidth: 900 }}>
          <h3 className="subhead">Ways to Give</h3>
          <p>
            Whether you prefer a one-time gift via bank transfer or a recurring contribution, your support is vital.
          </p>

          <div className="grid cols-2" style={{ marginTop: 24, alignItems: 'stretch' }}>
            <div className="card">
              <h4 style={{ marginTop: 0 }}>Monthly Giving</h4>
              <p>Provide stable, predictable funding that allows us to plan future workshops, invest in new equipment, and expand our curriculum development.</p>
            </div>
            <div className="card">
              <h4 style={{ marginTop: 0 }}>Corporate Partnerships</h4>
              <p>Partner with us to scale impact across entire regions. We collaborate on content grants, equipment sponsorships, and employee volunteer programs.</p>
            </div>
          </div>

          <div className="card" style={{ marginTop: 24 }}>
            <h4 style={{ marginTop: 0 }}>Direct Bank Transfer</h4>
            <p>If you prefer to transfer your donation directly into our bank account, please use the details below:</p>
            <pre
              className="mono"
              style={{
                whiteSpace: "pre-wrap",
                background: "#f7f7f5",
                padding: 12,
                borderRadius: 10,
                marginTop: 12,
              }}
            >{`Account name: Stemsphere Education Org
IBAN: NL00 EXAM 0123 4567 89
BIC: EXAMNL2A`}</pre>
          </div>
        </div>
      </section>
    </>
  );
}