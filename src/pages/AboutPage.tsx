// src/pages/AboutPage.tsx
import React from "react";

export default function AboutPage() {
  return (
    <main id="main">
      {/* Diagonal hero */}
      <section className="hero hero-cut" style={{ ["--next-bg" as any]: "var(--slice-soft)" }}>
        <div
          className="hero-media"
          style={{
            backgroundImage:
              "url(/assets/hero/about-hero.jpg)" // ← replace with your image
          }}
        />
        <div className="container hero-inner">
          <h1 className="display">About Us</h1>
          <p className="lead">
            Our mission is to expand access to STEM through community-led programs,
            mentorship, and hands-on learning.
          </p>
        </div>
      </section>

      {/* Content slices */}
      <section className="slice slice--soft slice--diag-top slice--diag-bottom">
        <div className="container slice-inner">
          <h2 className="section-title">Our Mission</h2>
          <p className="lead">
            We design programs that make complex topics approachable and fun.
          </p>
        </div>
      </section>

      <section className="slice">
        <div className="container slice-inner">
          <h2 className="section-title">Our Story</h2>
          <p className="lead">
            Started by students, for students—growing into a network of local partners,
            volunteers, and schools.
          </p>
        </div>
      </section>
    </main>
  );
}