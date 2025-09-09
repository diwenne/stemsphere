export default function InvolvePage() {
  return (
    <>
      <section className="slice slice--soft slice--diag-bottom">
        <div className="container" style={{ maxWidth: 900 }}>
          <h1 className="section-title" style={{ marginBottom: 8 }}>Get Involved</h1>
          <p className="lead" style={{ marginTop: 0 }}>
            Join our mission to empower the next generation of innovators. There are many ways to contribute your time, skills, and passion.
          </p>
        </div>
      </section>

      <section className="slice">
        <div className="container" style={{ maxWidth: 1000 }}>
          <div className="grid cols-3">
            {[
              {
                t: "Volunteer",
                d: "Mentor at a workshop, help develop new curriculum, or provide technical support. We welcome STEM professionals and enthusiasts from all backgrounds.",
                img: "https://picsum.photos/seed/volunteer/800/500"
              },
              {
                t: "Start a Chapter",
                d: "Bring Stemsphere to your community. We provide the resources and support you need to launch and run a local chapter for learners in your area.",
                img: "https://picsum.photos/seed/chapter/800/500"
              },
              {
                t: "Request a Workshop",
                d: "Are you an educator or community leader? Partner with us to host a hands-on STEM workshop for your school, library, or organization.",
                img: "https://picsum.photos/seed/workshop/800/500"
              }
            ].map((c, i) => (
              <article key={i} className="card card-elevated">
                <div className="card-hero" style={{ backgroundImage: `url(${c.img})` }} />
                <h3 className="subhead">{c.t}</h3>
                <p>{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      <section className="slice slice--soft slice--diag-top">
        <div className="container center" style={{ maxWidth: 800 }}>
          <h2 className="section-title">Ready to take the next step?</h2>
          <p className="lead">
            Whether you want to make a financial gift or give your time, your support is vital.
          </p>
          <div className="mt-32" style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a href="#" className="btn">Contact Us</a>
            <a href="/donate" className="btn" style={{background: 'var(--accent-red)'}}>Donate Now</a>
          </div>
        </div>
      </section>
    </>
  );
}