import React from 'react';
import Section from '../../components/Section/Section';
import './GetInvolved.css';

const GetInvolved = () => {
  return (
    <Section className="get-involved-section">
      <h1 className="get-involved-title">Join Our Mission</h1>
      <p className="get-involved-description">
        Whether you want to start a program, volunteer your time, or partner with us, there are many ways to contribute to the future of STEM.
      </p>
      <div className="get-involved-buttons">
        <a href="#" className="btn btn-primary">Become a Program Lead</a>
        <a href="#" className="btn btn-secondary">Request a Workshop</a>
      </div>
    </Section>
  );
};

export default GetInvolved;