import React from "react";
import diwen from "../assets/team/diwen.jpg";
import drishya from "../assets/team/drishya.jpg";
import tristan from "../assets/team/tristan.png";

type Member = {
  name: string;
  role: string;
  photo: string;
  bio: string;
};

const EXEC_TEAM: Member[] = [
  {
    name: "Diwen Huang",
    role: "President",
    photo: diwen,
    bio:
      "Leads strategy, programs, and partnerships. Focused on bringing practical AI and engineering experiences to students."
  },
  {
    name: "Drishya Sharma",
    role: "Operations Lead",
    photo: drishya,
    bio:
      "Oversees logistics and volunteer coordination to ensure smooth delivery of workshops and events."
  },
  {
    name: "Tristan Du",
    role: "Programs Lead",
    photo: tristan,
    bio:
      "Designs hands-on curricula and trains facilitators to run engaging, accessible sessions."
  }
];

function PersonCard({ name, role, photo, bio }: Member) {
  return (
    <article className="person">
      <div className="person-portrait">
        <img src={photo} alt={`${name} portrait`} />
      </div>
      <h3 className="person-name">{name}</h3>
      <p className="person-role">{role}</p>
      <p className="person-bio">{bio}</p>
    </article>
  );
}

export default function TeamPage() {
  return (
    <main id="main">
      {/* Diagonal hero: ONLY big "Our Team" */}
      <section
        className="hero hero-cut"
        style={{ ["--next-bg" as any]: "var(--slice-soft)" }}
      >
        <div
          className="hero-media"
          style={{ backgroundImage: "url(/assets/hero/team-hero.jpg)" }}
        />
        <div className="container hero-inner">
          <h1 className="display hero-title">Our Team</h1>
        </div>
      </section>

      {/* Intro block below diagonal */}
      <section className="slice slice--soft slice--diag-top team-intro">
        <div className="container slice-inner">
          <div className="hq-intro">
            <h2 className="hq-title-small">
              The <span className="accent-inner">Stemsphere</span> Foundation HQ
              Team
            </h2>
            <p className="hq-copy">
              Officially announced at the Stemsphere Foundation Annual General
              Meeting in March 2025, this executive group will guide the
              foundation through the 2025–2026 term. We look forward to
              continuing our work with students, schools, and community partners.
            </p>

            <h3 className="section-title hq-subtitle">
              Executive Committee 2025–2026
            </h3>
          </div>

          <div className="people-grid">
            {EXEC_TEAM.map((m) => (
              <PersonCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}