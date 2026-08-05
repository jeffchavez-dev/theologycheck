import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Theology Check',
  description: 'Privacy Policy for Theology Check and its Facebook Page messaging assistant.',
}

export default function PrivacyPage() {
  return (
    <main className="main" style={{ maxWidth: '680px' }}>
      <div className="post-header" style={{ borderBottom: '1px solid #e8ddd0', marginBottom: '2rem', paddingBottom: '1.5rem' }}>
        <p className="post-meta" style={{ marginBottom: '0.5rem' }}>Legal</p>
        <h1 className="post-title">Privacy Policy</h1>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '15px', color: '#6b5c4e', fontStyle: 'italic' }}>
          Last updated: August 6, 2026
        </p>
      </div>

      <div className="post-content">
        <p>This Privacy Policy describes how Theologycheck (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects information when you interact with our Facebook Page and its automated messaging assistant (&ldquo;the Service&rdquo;).</p>

        <h2>1. Information We Collect</h2>
        <p>When you message our Facebook Page, we may collect:</p>
        <ul>
          <li>Your Facebook name and profile information made available to us through Messenger.</li>
          <li>The content of messages you send to our Page, including questions and inquiries.</li>
          <li>Basic interaction metadata (e.g., timestamps of messages).</li>
        </ul>
        <p>We do not collect sensitive personal information (such as financial account numbers, government IDs, or health data) through this Service.</p>

        <h2>2. How We Use Information</h2>
        <p>We use the information collected to:</p>
        <ul>
          <li>Respond to your inquiries and provide customer support through our automated assistant.</li>
          <li>Improve the accuracy and quality of our responses.</li>
          <li>Maintain records of support conversations for quality assurance.</li>
        </ul>
        <p>Messages you send may be processed by third-party AI service providers (such as Google Gemini or OpenRouter) solely to generate responses to your inquiry. These providers process the message content but do not use it to identify you personally beyond what is necessary to generate a reply.</p>

        <h2>3. Information Sharing</h2>
        <p>We do not sell your personal information. We may share information with:</p>
        <ul>
          <li>Service providers who help us operate the Service (e.g., AI language model providers, workflow automation tools), solely to the extent necessary to provide the Service.</li>
          <li>Authorities, if required by law.</li>
        </ul>

        <h2>4. Data Retention</h2>
        <p>We retain conversation data only as long as necessary to provide support and improve our Service, or as required by applicable law.</p>

        <h2>5. Your Rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data by contacting us at the email below. You may also stop interacting with our Page at any time.</p>

        <h2>6. Children&rsquo;s Privacy</h2>
        <p>This Service is not directed to children under 13, and we do not knowingly collect personal information from children under 13.</p>

        <h2>7. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date.</p>

        <h2>8. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at:</p>
        <p>Email: <a href="mailto:jeffchavez0828@gmail.com">jeffchavez0828@gmail.com</a></p>
      </div>
    </main>
  )
}
