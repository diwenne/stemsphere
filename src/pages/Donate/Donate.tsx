import Section from '../../components/Section/Section';
import './Donate.css';

const Donate = () => {
  return (
    // THE FIX: Added the required 'id' prop
    <Section id="donate" className="donate-section">
      <h1 className="donate-title">Support Our Work</h1>
      <p className="donate-description">
        Your contribution directly funds our workshops, provides resources to underserved students, and helps us expand our reach. Every dollar makes a difference.
      </p>
      <div className="donate-buttons">
        <a href="#" className="btn btn-primary donate-btn">Donate Securely</a>
      </div>
    </Section>
  );
};

export default Donate;