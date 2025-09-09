import DiagonalSlice from "../components/DiagonalSlice";

export default function SupportPage(){
  return (
    <>
      {/* Angled soft band header — clean and spacious */}
      <section className="slice slice--soft slice--diag-bottom">
        <div className="container" style={{maxWidth: 900}}>
          <h1 className="section-title" style={{marginBottom: 8}}>Support us</h1>
          <h2 className="subhead" style={{marginTop: 0}}>Donate to Stemsphere</h2>
        </div>
      </section>

      {/* Explanatory copy on white, like the reference */}
      <section className="slice" style={{paddingTop: 96}}>
        <div className="container" style={{maxWidth: 1000}}>
          <div style={{display:"grid", gap:28, gridTemplateColumns:"1fr"}}>
            <h3 className="subhead" style={{margin:0}}>
              As an independent, non-subsidized organization, we welcome your support.
              Every donation, large or small, goes towards our activities.
            </h3>
            <div style={{color:"var(--ink)", maxWidth:900}}>
              <p>
                Your donation helps us carry out our mission. We design and run open STEM
                programs and publish free learning resources. Our aim is to help young
                people explore real-world challenges with curiosity and care, while
                supporting educators with practical, field-tested materials.
              </p>
              <p>
                If you feel strongly about what we do, there are several ways you can support us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to support (image cards) */}
      <DiagonalSlice tone="soft" top>
        <div className="container slice-inner" style={{maxWidth: 1100}}>
          <h3 className="subhead" style={{marginBottom: 16}}>Ways in which you can support us</h3>
          <div className="grid cols-3">
            {[
              {
                t:"One-time donation",
                d:"Make a single, impactful contribution to fund workshops and open resources.",
                img:"https://picsum.photos/seed/support1/800/500"
              },
              {
                t:"Monthly giving",
                d:"Provide stable, predictable funding so we can plan long-term programs.",
                img:"https://picsum.photos/seed/support2/800/500"
              },
              {
                t:"Corporate partnership",
                d:"Sponsor equipment, grants, or content to scale impact in your region.",
                img:"https://picsum.photos/seed/support3/800/500"
              }
            ].map((c,i)=>(
              <article key={i} className="card card-elevated">
                <div className="card-hero" style={{backgroundImage:`url(${c.img})`, height:160}} />
                <h4 style={{margin:"10px 0 6px", fontSize:20, fontWeight:900}}>{c.t}</h4>
                <p>{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </DiagonalSlice>

      {/* Gentle CTA to the actual Donate page */}
      <section className="slice">
        <div className="container center" style={{maxWidth: 900}}>
          <p className="subhead" style={{marginBottom: 16}}>Ready to make a gift?</p>
          <a className="btn" href="/donate">Go to Donate</a>
        </div>
      </section>
    </>
  );
}