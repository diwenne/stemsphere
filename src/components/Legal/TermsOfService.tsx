import React from 'react';
import './Legal.css';

const TermsOfService: React.FC = () => {
  return (
    <div className="legal-page-container">
      <h1>Terms of Service</h1>
      <p className="last-updated">Last Updated: September 14, 2025</p>

      <section>
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using the Stemsphere Foundation website (the "Site"), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you are not authorized to use the Site.
        </p>
      </section>
      
      <section>
        <h2>2. Use of the Site</h2>
        <p>
          You agree to use the Site only for lawful purposes. You are prohibited from any use of the Site that would constitute a violation of any applicable law or regulation.
        </p>
      </section>

      <section>
        <h2>3. Intellectual Property</h2>
        <p>
          All content on this Site, including text, graphics, logos, and images, is the property of Stemsphere Foundation or its content suppliers and is protected by Canadian and international copyright laws.
        </p>
      </section>

      <section>
        <h2>4. Donations</h2>
        <p>
          All donations made to Stemsphere Foundation are processed through secure third-party payment processors. Donations are non-refundable.
        </p>
      </section>

      <section>
        <h2>5. Links to Other Websites</h2>
        <p>
          Our Site may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.
        </p>
      </section>
      
      <section>
        <h2>6. Limitation of Liability</h2>
        <p>
          In no event shall Stemsphere Foundation be liable for any indirect, incidental, or consequential damages arising out of your use of the Site.
        </p>
      </section>

      <section>
        <h2>7. Governing Law</h2>
        <p>
          These Terms shall be governed by the laws of the province of British Columbia, Canada, without regard to its conflict of law provisions.
        </p>
      </section>
      
      <section>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at: <a href="mailto:hello@stemsf.org">hello@stemsf.org</a>.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;