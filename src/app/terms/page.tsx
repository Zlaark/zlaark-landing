import styles from '../privacy/Legal.module.css';

export const metadata = {
  title: 'Terms of Service | Zlaark',
  description: 'Terms of Service for Zlaark Agency',
};

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.lastUpdated}>Last updated: January 2025</p>
        </header>

        <div className={styles.content}>
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using our website and services, you agree to be bound by these Terms of Service. 
            If you disagree with any part of these terms, you may not access our services.
          </p>

          <h2>Services</h2>
          <p>
            Zlaark provides digital design and development services including, but not limited to, 
            web design, web development, mobile app development, and brand identity design.
          </p>

          <h2>Client Responsibilities</h2>
          <p>When engaging our services, you agree to:</p>
          <ul>
            <li>Provide accurate and complete project requirements</li>
            <li>Respond to requests for information in a timely manner</li>
            <li>Pay all invoices according to agreed terms</li>
            <li>Provide all necessary content, assets, and approvals</li>
          </ul>

          <h2>Intellectual Property</h2>
          <h3>Client Materials</h3>
          <p>
            You retain ownership of all content and materials you provide to us. By providing these materials, 
            you grant us a license to use them for the purpose of completing your project.
          </p>

          <h3>Deliverables</h3>
          <p>
            Upon full payment, you will own the final deliverables created specifically for your project. 
            We retain ownership of any pre-existing materials, tools, or frameworks used in the creation process.
          </p>

          <h3>Portfolio Rights</h3>
          <p>
            We reserve the right to display completed work in our portfolio and marketing materials 
            unless otherwise agreed in writing.
          </p>

          <h2>Payment Terms</h2>
          <p>
            Payment terms and schedules will be outlined in your project proposal. 
            Late payments may result in project delays or cessation of work.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Zlaark shall not be liable for any indirect, incidental, special, or consequential damages 
            resulting from the use or inability to use our services.
          </p>

          <h2>Termination</h2>
          <p>
            Either party may terminate a project with written notice. In the event of termination, 
            payment is due for all work completed up to the termination date.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately 
            upon posting to our website.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these Terms of Service, please contact us at:{' '}
            <a href="mailto:legal@zlaark.com">legal@zlaark.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}
