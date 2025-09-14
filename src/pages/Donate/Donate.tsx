import Section from '../../components/Section/Section';
import './Donate.css';

const Donate = () => {
  return (
    <>
      {/* --- Main Donation Section --- */}
      <Section id="donate" className="donate-hero-section">
        <h1 className="donate-title">Support Our Mission</h1>
        <p className="donate-description">
          Your contribution directly funds our workshops, provides resources to underserved students, and helps us expand our reach. Every dollar makes a difference in fostering the next generation of STEM leaders.
        </p>
        
        {/* E-Transfer Information Box */}
        <div className="etransfer-box">
          <h3 className="etransfer-title">Donate via Interac e-Transfer®</h3>
          <p>The simplest way to donate. Send your contribution to:</p>
          <p className="etransfer-email">hello@stemsf.org</p>
          <p className="etransfer-note">(Auto-deposit is enabled, no security question needed)</p>
        </div>
      </Section>

      {/* --- "Where Your Donation Goes" Section --- */}
      <Section id="impact-details">
        <h2 className="section-title">Where Your Donation Goes</h2>
        <div className="impact-grid">
          
          <div className="impact-card">
            <span className="impact-icon">🚀</span>
            <h3 className="impact-card-title">Programs & Outreach</h3>
            <p className="impact-card-description">
              Fuel our hands-on workshops, community hackathons, and mentorship programs, ensuring every student can participate regardless of financial barriers.
            </p>
          </div>

          <div className="impact-card">
            <span className="impact-icon">🛠️</span>
            <h3 className="impact-card-title">Tools & Resources</h3>
            <p className="impact-card-description">
              Equip students with essential tools for success—from robotics kits and lab supplies to the software licenses and digital platforms that power our collaboration.
            </p>
          </div>

          <div className="impact-card">
            <span className="impact-icon">🌱</span>
            <h3 className="impact-card-title">Growth & Accessibility</h3>
            <p className="impact-card-description">
              Help us break down barriers by funding scholarships for underrepresented students and making our educational content accessible to a wider, more diverse audience.
            </p>
          </div>

          <div className="impact-card">
            <span className="impact-icon">🏛️</span>
            <h3 className="impact-card-title">Organizational Sustainability</h3>
            <p className="impact-card-description">
              Provide the stable foundation we need to operate, from covering essential administrative costs to supporting our dedicated volunteers and planning our future expansion.
            </p>
          </div>

        </div>
      </Section>
    </>
  );
};

export default Donate;