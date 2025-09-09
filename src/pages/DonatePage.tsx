export default function DonatePage() {
  return (
    <>
      {/* Clean angled header band (soft tone + diagonal bottom) */}
      <section className="slice slice--soft slice--diag-bottom">
        <div className="container" style={{ maxWidth: 900 }}>
          <h1 className="section-title" style={{ marginBottom: 8 }}>Donation</h1>
          <h2 className="subhead" style={{ marginTop: 0 }}>
            Support Stemsphere
          </h2>

          <p style={{ marginTop: 24 }}>
            Your donation helps us create accessible STEM programs and open resources.
            Together, we empower young people to explore real-world challenges.
          </p>

          <div style={{ marginTop: 24 }}>
            <button
              className="btn"
              onClick={() => window.alert("Hook this to your donation flow")}
            >
              Donate
            </button>
          </div>
        </div>
      </section>

      {/* Plain white content */}
      <section className="slice" style={{ paddingTop: 96 }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <h3 className="subhead">Bank transfer</h3>
          <p>
            If you prefer to transfer your donation directly into our bank account,
            please use the details below:
          </p>

          <div className="card" style={{ marginTop: 16 }}>
            <h4 style={{ marginTop: 0 }}>Bank details</h4>
            <pre
              className="mono"
              style={{
                whiteSpace: "pre-wrap",
                background: "#f7f7f5",
                padding: 12,
                borderRadius: 10,
                margin: 0,
              }}
            >{`Account name: Stemsphere Education Org
IBAN: NL00 EXAM 0123 4567 89
BIC: EXAMNL2A`}</pre>
          </div>

          <div className="grid cols-2" style={{ marginTop: 24 }}>
            <div className="card">
              <h4 style={{ marginTop: 0 }}>Monthly giving</h4>
              <p>Provide stable, predictable funding for workshops and resource development.</p>
            </div>
            <div className="card">
              <h4 style={{ marginTop: 0 }}>Corporate partnerships</h4>
              <p>Partner with us to scale impact across regions with content grants and equipment sponsorships.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}