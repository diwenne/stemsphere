import React from 'react';
import './Legal.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="legal-page-container">
      <h1>Privacy Policy</h1>
      <p className="last-updated">Last Updated: September 14, 2025</p>

      <p>
        Stemsphere Foundation ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
      </p>

      <section>
        <h2>Information We Collect</h2>
        <p>
          We may collect personal information that you voluntarily provide to us when you fill out a contact form, sign up for a newsletter, make a donation, or otherwise contact us. This information may include your name, email address, and any other information you choose to provide.
        </p>
        <p>
          Donations made through our website are processed by a third-party payment processor. We do not store or collect your payment card details.
        </p>
      </section>
      
      <section>
        <h2>How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Respond to your inquiries and fulfill your requests.</li>
          <li>Send you newsletters, updates, and promotional materials that you have opted into.</li>
          <li>Process donations and send acknowledgments.</li>
          <li>Improve our website and services.</li>
          <li>Comply with applicable Canadian laws and regulations, including the Personal Information Protection and Electronic Documents Act (PIPEDA).</li>
        </ul>
      </section>

      <section>
        <h2>Data Sharing and Disclosure</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website or servicing you, so long as those parties agree to keep this information confidential.
        </p>
      </section>

      <section>
        <h2>Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
        </p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <p>
          You have the right to access, update, or request deletion of your personal information. If you wish to exercise any of these rights, please contact us.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:hello@stemsf.org">hello@stemsf.org</a>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;