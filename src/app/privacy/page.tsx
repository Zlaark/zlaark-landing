import styles from './Legal.module.css';

export const metadata = {
  title: 'Privacy Policy | Zlaark',
  description: 'Privacy Policy for Zlaark Agency',
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last updated: January 2025</p>
        </header>

        <div className={styles.content}>
          <h2>Introduction</h2>
          <p>
            At Zlaark, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website or engage our services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide when you:
          </p>
          <ul>
            <li>Fill out our contact forms</li>
            <li>Subscribe to our newsletter</li>
            <li>Request a consultation</li>
            <li>Apply for a position</li>
          </ul>
          <p>
            This information may include your name, email address, phone number, company name, 
            and any other information you choose to provide.
          </p>

          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information, including:
          </p>
          <ul>
            <li>IP address and browser type</li>
            <li>Device information</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide requested services</li>
            <li>Send periodic emails about our services (if subscribed)</li>
            <li>Improve our website and user experience</li>
            <li>Analyze usage patterns and trends</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties 
            without your consent, except as required by law or to protect our rights.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. However, 
            no method of transmission over the Internet is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:{' '}
            <a href="mailto:privacy@zlaark.com">privacy@zlaark.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}
