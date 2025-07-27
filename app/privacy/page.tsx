import { Metadata, Viewport } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Comprehensive privacy policy for all Brian Fending digital properties including brianfending.com and ai.brianfending.com regarding data collection, usage, and your rights.',
}

export const viewport: Viewport = {
  themeColor: '#ffffff'
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 pt-8">
        <h1 className="page-header text-gray-900 dark:text-white">Privacy Policy</h1>
        <p className="text-xl mt-4 text-gray-700 dark:text-gray-300 max-w-3xl">
          <strong>Effective Date:</strong> May 15, 2025<br />
          <strong>Last Updated:</strong> July 27, 2025
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Scope and Application</h2>
        <p>
          This Privacy Policy applies to all digital properties operated by Brian Fending, including:
        </p>
        <ul>
          <li><strong>Main website:</strong> brianfending.com</li>
          <li><strong>AI Assistant service:</strong> ai.brianfending.com</li>
          <li><strong>All subdomains:</strong> *.brianfending.com</li>
          <li><strong>Future services and applications</strong> hosted on these domains</li>
        </ul>

        <h2>Contact Information</h2>
        <p>
          <strong>Data Controller:</strong> Brian Fending<br />
          <strong>Email:</strong> hello@brianfending.com<br />
          <strong>Primary Website:</strong> brianfending.com
        </p>
        <p>
          For all privacy-related inquiries, data subject requests, or concerns across any of our services, please contact: <strong>hello@brianfending.com</strong>
        </p>

        <h2>Information We Collect</h2>

        <h3>Portfolio Website (brianfending.com)</h3>
        <p><strong>Information You Provide:</strong></p>
        <ul>
          <li><strong>Name</strong> (required)</li>
          <li><strong>Email address</strong> (required)</li>
          <li><strong>Company name</strong> (optional)</li>
          <li><strong>Subject category</strong> (required)</li>
          <li><strong>Message content</strong> (required)</li>
          <li><strong>Additional subject details</strong> (when "Other" is selected)</li>
        </ul>

        <p><strong>Automatically Collected:</strong></p>
        <ul>
          <li><strong>Technical data:</strong> IP address, browser type, operating system, referring website</li>
          <li><strong>Usage data:</strong> Pages visited, time spent on site, click patterns</li>
          <li><strong>Device information:</strong> Screen resolution, device type, browser settings</li>
          <li><strong>Analytics data:</strong> Google Analytics 4 (GA4) website usage metrics</li>
        </ul>

        <h3>AI Assistant Service (ai.brianfending.com)</h3>
        <p><strong>Information You Provide:</strong></p>
        <ul>
          <li><strong>Email address</strong> (required for session access)</li>
          <li><strong>Chat messages</strong> (all questions and interactions during sessions)</li>
          <li><strong>Feedback</strong> (ratings or comments about service quality)</li>
        </ul>

        <p><strong>Automatically Collected:</strong></p>
        <ul>
          <li><strong>Session data:</strong> Session duration, timestamps, activity logs, queue position</li>
          <li><strong>Technical information:</strong> IP address, browser type, device information, access times</li>
          <li><strong>Usage analytics:</strong> Interaction patterns, response times, feature usage</li>
          <li><strong>Conversation metadata:</strong> Message counts, session patterns, response quality metrics</li>
        </ul>

        <h3>All Services - Common Data Collection</h3>
        <p><strong>Cookies and Tracking Technologies:</strong></p>
        <ul>
          <li><strong>Essential cookies:</strong> Basic site functionality across all services</li>
          <li><strong>Preference cookies:</strong> User settings (dark mode, language preferences)</li>
          <li><strong>Analytics cookies:</strong> Google Analytics 4 for usage analysis</li>
          <li><strong>Session cookies:</strong> Maintaining login states and service access</li>
        </ul>

        <h2>How We Use Your Information</h2>

        <h3>Portfolio Website</h3>
        <ul>
          <li><strong>Communication:</strong> Responding to inquiries and business requests</li>
          <li><strong>Professional networking:</strong> Following up on opportunities and collaborations</li>
          <li><strong>Site improvement:</strong> Understanding visitor behavior and optimizing user experience</li>
          <li><strong>Analytics:</strong> Measuring site performance and popular content</li>
        </ul>

        <h3>AI Assistant Service</h3>
        <ul>
          <li><strong>Service delivery:</strong> Providing AI-powered responses about Brian Fending's professional background</li>
          <li><strong>Session management:</strong> Operating waiting room system and managing 60-minute session limits</li>
          <li><strong>Access control:</strong> Sending session notifications and queue status updates</li>
          <li><strong>Service improvement:</strong> Analyzing conversation patterns to enhance AI response quality</li>
          <li><strong>Performance optimization:</strong> Monitoring system performance and response times</li>
          <li><strong>Feature development:</strong> Creating better user experience and new capabilities</li>
        </ul>

        <h3>Legal Basis for Processing (GDPR)</h3>
        <p><strong>Across All Services:</strong></p>
        <ul>
          <li><strong>Legitimate interest:</strong> Site analytics, service improvement, security monitoring</li>
          <li><strong>Consent:</strong> Contact form submissions, optional communications, AI service usage</li>  
          <li><strong>Contract performance:</strong> Delivering requested services and responding to inquiries</li>
          <li><strong>Legal obligations:</strong> Compliance with applicable laws and regulations</li>
        </ul>

        <h2>Ownership and Rights to Submitted Content</h2>

        <h3>Portfolio Website</h3>
        <ul>
          <li><strong>Your content remains yours:</strong> Contact form submissions retain your ownership</li>
          <li><strong>Limited use rights:</strong> We may use inquiries to improve our services</li>
          <li><strong>No commercial exploitation:</strong> Contact messages are not used for training or commercial purposes</li>
        </ul>

        <h3>AI Assistant Service</h3>
        <p><strong>Important Notice:</strong> By using ai.brianfending.com, you acknowledge and agree that:</p>
        <ul>
          <li><strong>Content ownership transfer:</strong> All messages, questions, and content you submit become the property of Brian Fending</li>
          <li><strong>Unlimited usage rights:</strong> You grant Brian Fending unlimited, perpetual, worldwide rights to use, modify, reproduce, and distribute your submitted content</li>
          <li><strong>Commercial applications:</strong> Your submitted content may be used to improve AI models, create training data, or for any other business purpose</li>
          <li><strong>Waiver of attribution:</strong> You waive any moral rights or attribution claims to submitted content</li>
        </ul>

        <p><strong>AI-Generated Responses:</strong></p>
        <ul>
          <li>All AI-generated responses are the exclusive property of Brian Fending</li>
          <li>Users receive no ownership rights in AI-generated content</li>
          <li>AI responses may be reused, republished, or incorporated into other materials</li>
        </ul>

        <p><strong>Conversation Data:</strong></p>
        <ul>
          <li>Complete conversation logs belong to Brian Fending</li>
          <li>May be analyzed, shared with third parties, or used for commercial purposes</li>
          <li>Anonymized conversation data may be published or used in research</li>
        </ul>

        <h2>Data Storage and Processing</h2>

        <h3>Storage Infrastructure</h3>
        <ul>
          <li><strong>Contact form data:</strong> Google Forms/Google Workspace (US-based)</li>
          <li><strong>Website hosting:</strong> Vercel (US-based, global CDN)</li>
          <li><strong>AI service hosting:</strong> Railway, Fly.io, or similar cloud providers (US-based)</li>
          <li><strong>Database services:</strong> Supabase or equivalent (US-based)</li>
          <li><strong>Email services:</strong> AWS SES, Postmark, or similar providers</li>
        </ul>

        <h3>Data Retention Schedules</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Data Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Retention Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Purpose</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Contact form submissions</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Portfolio</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">3 years</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Business communication</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Email correspondence</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">All services</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">7 years</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Legal and business requirements</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">AI conversations</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">AI Assistant</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Indefinite</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Service improvement, training</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">AI session logs</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">AI Assistant</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">7 years</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Operational analysis</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">GA4 analytics data</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">All services</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">14-50 months</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Performance analysis</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Technical logs</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">All services</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">30 days</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Security and troubleshooting</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">User email addresses</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">AI Assistant</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Until removal requested</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Access management</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Security Measures</h3>
        <p>We implement comprehensive security measures across all services:</p>
        <ul>
          <li><strong>Encryption:</strong> HTTPS/TLS for all data transmission</li>
          <li><strong>Access controls:</strong> Role-based authentication and authorization</li>
          <li><strong>Infrastructure security:</strong> Enterprise-grade hosting with SOC 2 compliance</li>
          <li><strong>Monitoring:</strong> Continuous security assessment and incident response</li>
          <li><strong>Data minimization:</strong> Collecting only necessary information</li>
          <li><strong>Regular audits:</strong> Periodic security and privacy assessments</li>
        </ul>

        <h2>International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries outside your residence, including:
        </p>
        <ul>
          <li><strong>United States:</strong> Primary hosting and operations for all services</li>
          <li><strong>Global CDN locations:</strong> For performance optimization</li>
          <li><strong>Service provider locations:</strong> Where our vendors operate</li>
        </ul>

        <h3>Data Transfer Safeguards</h3>
        <p>We ensure appropriate protection for all international transfers through:</p>

        <p><strong>For EU/UK Data Subjects:</strong></p>
        <ul>
          <li><strong>Standard Contractual Clauses (SCCs):</strong> We use the European Commission's approved SCCs with all data processors</li>
          <li><strong>UK Transfer Risk Assessments:</strong> Conducted for all UK data transfers under UK GDPR</li>
          <li><strong>Supplementary measures:</strong> Additional technical and organizational safeguards where required</li>
          <li><strong>Adequacy decisions:</strong> We rely on adequacy decisions where available (currently none for US transfers)</li>
        </ul>

        <p><strong>For Other Jurisdictions:</strong></p>
        <ul>
          <li><strong>Contractual protections:</strong> Data processing agreements with equivalent protections</li>
          <li><strong>Cross-border privacy rules:</strong> Compliance with APEC frameworks where applicable</li>
          <li><strong>Local law assessments:</strong> Evaluation of data protection laws in destination countries</li>
        </ul>

        <p><strong>US Government Access Limitations:</strong></p>
        <p>We implement technical measures to limit exposure to potential government surveillance:</p>
        <ul>
          <li>Data encryption in transit and at rest</li>
          <li>Access logging and monitoring</li>
          <li>Data minimization practices</li>
          <li>Regular security assessments</li>
        </ul>

        <p><strong>Transfer Impact Assessments:</strong></p>
        <p>We conduct regular assessments of:</p>
        <ul>
          <li>Legal frameworks in destination countries</li>
          <li>Technical safeguards effectiveness</li>
          <li>Alternative processing locations</li>
          <li>Data subject rights enforcement mechanisms</li>
        </ul>

        <h2>Data Sharing and Disclosure</h2>

        <h3>Service Providers</h3>
        <p>We share information with trusted third parties who assist in operating our services:</p>

        <p><strong>Common to All Services:</strong></p>
        <ul>
          <li>Hosting providers (Vercel, Railway, Fly.io)</li>
          <li>Email services (AWS SES, Postmark)</li>
          <li>Analytics services (Google Analytics 4)</li>
          <li>Security and monitoring services</li>
        </ul>

        <p><strong>AI Assistant Service Specific:</strong></p>
        <ul>
          <li>Database providers (Supabase)</li>
          <li>AI model providers (may change at any time, including but not limited to models from Anthropic, OpenAI, Google, and other hosted or open source providers)</li>
          <li>Queue management services</li>
        </ul>

        <h3>Business Purposes (AI Assistant Service)</h3>
        <p>Your information and submitted content may be shared for:</p>
        <ul>
          <li>Creating case studies of AI assistant capabilities</li>
          <li>Training improved AI models</li>
          <li>Marketing and promotional materials</li>
          <li>Research and development purposes</li>
          <li>Business partnerships and collaborations</li>
        </ul>

        <h3>Legal Requirements</h3>
        <p>We may disclose information when required by law or to:</p>
        <ul>
          <li>Comply with legal process, subpoenas, or court orders</li>
          <li>Protect our rights, property, or safety</li>
          <li>Prevent fraud or illegal activities</li>
          <li>Enforce our Terms of Service</li>
        </ul>

        <h2>Your Rights Under Data Privacy Laws</h2>

        <h3>Universal Rights (All Users)</h3>
        <p>Regardless of location, you have the right to:</p>
        <ul>
          <li>Know what personal information we collect and how it's used</li>
          <li>Request access to your personal information</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your information (subject to limitations below)</li>
          <li>Withdraw consent for optional communications</li>
        </ul>

        <h3>GDPR Rights (EU/UK Residents)</h3>
        <ul>
          <li><strong>Right to rectification:</strong> Correct inaccurate personal data</li>
          <li><strong>Right to erasure:</strong> Delete personal data under certain circumstances</li>
          <li><strong>Right to restrict processing:</strong> Limit how we use your data</li>
          <li><strong>Right to data portability:</strong> Receive your data in portable format</li>
          <li><strong>Right to object:</strong> Object to processing based on legitimate interests</li>
          <li><strong>Rights regarding automated decision-making:</strong> We don't use automated decision-making</li>
        </ul>

        <h3>CCPA Rights (California Residents)</h3>
        <ul>
          <li><strong>Right to know:</strong> Categories and specific pieces of personal information collected</li>
          <li><strong>Right to delete:</strong> Request deletion of personal information</li>
          <li><strong>Right to opt-out:</strong> Opt-out of sale of personal information (we don't sell data)</li>
          <li><strong>Right to non-discrimination:</strong> Equal service regardless of privacy choices</li>
        </ul>

        <h3>Important Limitations on Rights</h3>
        <p><strong>AI Assistant Service Limitations:</strong></p>
        <ul>
          <li><strong>Submitted conversations:</strong> Cannot be deleted after processing due to integration into AI training systems</li>
          <li><strong>Business operations:</strong> Some data retained based on legitimate business interests</li>
          <li><strong>Technical constraints:</strong> Inability to extract data from trained AI models</li>
          <li><strong>Trade secrets:</strong> Protection of proprietary AI training methodologies</li>
        </ul>

        <p><strong>Legal Basis for Limitations:</strong></p>
        <ul>
          <li>Legitimate business interests in AI model improvement</li>
          <li>Technical impossibility of extraction from trained systems</li>
          <li>Protection of intellectual property</li>
          <li>Compliance with other legal obligations</li>
        </ul>

        <h2>Third-Party Services</h2>

        <h3>Google Services</h3>
        <ul>
          <li><strong>Google Forms:</strong> Contact form submissions</li>
          <li><strong>Google Workspace:</strong> Email processing</li>
          <li><strong>Google Analytics 4:</strong> Website traffic analysis and user behavior insights</li>
        </ul>
        <p>
          Privacy policies:
        </p>
        <ul>
          <li>Google Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400">https://policies.google.com/privacy</a></li>
          <li>Google Analytics Data Processing: <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400">https://support.google.com/analytics/answer/6004245</a></li>
        </ul>

        <h3>Vercel (Website Hosting)</h3>
        <ul>
          <li><strong>Hosting and deployment:</strong> All static websites</li>
          <li><strong>Content delivery network:</strong> Global performance optimization</li>
          <li><strong>Basic analytics:</strong> Performance metrics</li>
        </ul>
        <p>
          Privacy policy: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400">https://vercel.com/legal/privacy-policy</a>
        </p>

        <h3>Other Service Providers</h3>
        <p>Additional services may be integrated for AI assistant functionality:</p>
        <ul>
          <li>Cloud hosting providers (Railway, Fly.io)</li>
          <li>Database services (Supabase)</li>
          <li>Email delivery services</li>
          <li>AI model providers</li>
        </ul>
        <p>We maintain data processing agreements with all third-party processors.</p>

        <h2>How to Exercise Your Rights</h2>

        <h3>Data Subject Access Requests (DSAR)</h3>
        <p>Submit all requests to: <strong>hello@brianfending.com</strong></p>

        <p><strong>Required Information:</strong></p>
        <ul>
          <li>Your full name and email address</li>
          <li>Specific service(s) you've used</li>
          <li>Specific right you wish to exercise</li>
          <li>Relevant details to help locate your information</li>
          <li>Proof of identity for security purposes</li>
        </ul>

        <h3>Request Processing</h3>
        <p><strong>Timeline:</strong></p>
        <ul>
          <li><strong>Acknowledgment:</strong> Within 5 business days</li>
          <li><strong>Standard requests:</strong> Within 30 days (GDPR) or as required by law</li>
          <li><strong>Complex requests:</strong> Up to 60 days with notification</li>
          <li><strong>AI service requests:</strong> May require additional time due to technical complexity</li>
        </ul>

        <p><strong>Verification:</strong></p>
        <p>We may request additional information to verify identity before processing requests, including:</p>
        <ul>
          <li>Confirmation of email address used with our services</li>
          <li>Approximate dates of service usage</li>
          <li>Sample interactions (for AI assistant requests)</li>
        </ul>

        <h2>Disclaimers and Limitations</h2>

        <h3>AI-Generated Content (ai.brianfending.com)</h3>

        <p><strong>Service Nature and Limitations:</strong></p>
        <ul>
          <li><strong>Experimental technology:</strong> This AI assistant service uses experimental artificial intelligence technology that may produce unpredictable results</li>
          <li><strong>AI hallucination risk:</strong> The AI may generate responses that appear factual but contain inaccurate, incomplete, or entirely fabricated information</li>
          <li><strong>Not professional advice:</strong> AI responses should not be considered professional, legal, financial, career, or personal advice of any kind</li>
          <li><strong>Human judgment required:</strong> All AI-generated content requires human verification and should not be relied upon for important decisions</li>
          <li><strong>Training data limitations:</strong> AI responses are based on training data that may be outdated, biased, or incomplete</li>
        </ul>

        <p><strong>Accuracy and Reliability Disclaimers:</strong></p>
        <ul>
          <li><strong>No warranty of accuracy:</strong> We make no representations about the accuracy, completeness, or reliability of AI-generated responses</li>
          <li><strong>Factual errors expected:</strong> AI responses may contain factual errors, outdated information, or logical inconsistencies</li>
          <li><strong>Context limitations:</strong> The AI may misunderstand context, nuance, or specific circumstances relevant to your inquiry</li>
          <li><strong>Bias and perspective:</strong> AI responses may reflect biases present in training data or model architecture</li>
          <li><strong>User responsibility:</strong> Users must independently verify all information obtained through the service</li>
        </ul>

        <p><strong>Professional and Legal Disclaimers:</strong></p>
        <ul>
          <li><strong>No attorney-client relationship:</strong> Use of the AI service does not create any professional advisory relationship</li>
          <li><strong>No substitute for professional consultation:</strong> Users should consult qualified professionals for advice relevant to their specific circumstances</li>
          <li><strong>Liability limitation:</strong> Brian Fending disclaims liability for any decisions, actions, or outcomes based on AI-generated responses</li>
          <li><strong>Information only:</strong> All responses are provided for informational purposes only</li>
        </ul>

        <p><strong>Technical Limitations:</strong></p>
        <ul>
          <li><strong>Model constraints:</strong> AI responses are limited by model capabilities, training data cutoffs, and processing constraints</li>
          <li><strong>Inconsistent responses:</strong> The same question may generate different responses at different times</li>
          <li><strong>Language processing errors:</strong> The AI may misinterpret questions, especially those with ambiguous phrasing</li>
          <li><strong>Knowledge boundaries:</strong> The AI cannot access real-time information or personal data beyond its training</li>
        </ul>

        <h3>Service Availability</h3>
        <ul>
          <li>Services provided "as is" without warranties</li>
          <li>No guarantee of continuous availability or reliability</li>
          <li>Features may change, be suspended, or discontinued</li>
          <li>Performance estimates are not guarantees</li>
        </ul>

        <h3>Limitation of Liability</h3>
        <ul>
          <li>Liability limited to maximum extent permitted by law</li>
          <li>Not liable for indirect, incidental, or consequential damages</li>
          <li>Total liability for any claims will not exceed $100</li>
          <li>Some jurisdictions may not allow these limitations</li>
        </ul>

        <h2>Children's Privacy</h2>
        <p>
          Our services are not intended for users under 16 (or under 13 in the US). We do not knowingly collect personal information from children. If we become aware that a child has provided personal information, we will delete it promptly.
        </p>

        <h2>Changes to This Policy</h2>
        <p>We may update this privacy policy to reflect:</p>
        <ul>
          <li>Changes in our practices across any service</li>
          <li>Changes in applicable law</li>
          <li>New features or services on any domain</li>
        </ul>

        <h3>Notification of Changes</h3>
        <ul>
          <li><strong>Material changes:</strong> Prominent notice on affected websites</li>
          <li><strong>Service-specific changes:</strong> Notification on relevant service</li>
          <li><strong>Rights-affecting changes:</strong> Direct notification where possible</li>
          <li><strong>Minor updates:</strong> Updated effective date</li>
        </ul>

        <h2>Complaints and Regulatory Contact</h2>

        <h3>Filing Complaints</h3>
        <p>If we haven't adequately addressed your privacy concerns, you may file complaints with:</p>

        <p><strong>EU/UK Residents:</strong></p>
        <ul>
          <li>Your local data protection authority</li>
          <li>UK: Information Commissioner's Office (ICO)</li>
          <li>EU: Find your authority at <a href="https://edpb.europa.eu/about-edpb/board/members_en" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400">https://edpb.europa.eu/about-edpb/board/members_en</a></li>
        </ul>

        <p><strong>California Residents:</strong></p>
        <ul>
          <li>California Attorney General's Office</li>
          <li>Email: privacy@oag.ca.gov</li>
        </ul>

        <p><strong>Other Jurisdictions:</strong></p>
        <ul>
          <li>Canada: Privacy Commissioner of Canada</li>
          <li>Australia: Office of the Australian Information Commissioner</li>
          <li>Contact your local privacy regulator</li>
        </ul>

        <h2>International Framework Compliance</h2>
        <p>This privacy policy complies with:</p>
        <ul>
          <li><strong>GDPR</strong> (General Data Protection Regulation) - EU/UK</li>
          <li><strong>CCPA</strong> (California Consumer Privacy Act) - California, US</li>
          <li><strong>PIPEDA</strong> (Personal Information Protection and Electronic Documents Act) - Canada</li>
          <li><strong>Privacy Act 1988</strong> - Australia</li>
          <li><strong>LGPD</strong> (Lei Geral de Proteção de Dados) - Brazil</li>
          <li>Other applicable privacy laws</li>
        </ul>

        <h2>Emergency Privacy Contacts</h2>
        <p>For urgent privacy concerns or suspected data breaches:</p>
        <ul>
          <li><strong>Email:</strong> hello@brianfending.com</li>
          <li><strong>Subject Line:</strong> "URGENT - Privacy Incident"</li>
          <li>Include your contact information for immediate response</li>
        </ul>

        <h2>Contact for Privacy Matters</h2>
        <p>For all privacy-related questions, requests, or concerns across any service:</p>
        <p>
          <strong>Email:</strong> hello@brianfending.com<br />
          <strong>Subject Line:</strong> Privacy Inquiry - [Service] - [Type of Request]
        </p>
        <p>Examples:</p>
        <ul>
          <li>"Privacy Inquiry - AI Assistant - Data Deletion Request"</li>
          <li>"Privacy Inquiry - Portfolio - Access Request"</li>
          <li>"Privacy Inquiry - General - Question about Policy"</li>
        </ul>
        <p>
          We are committed to protecting your privacy across all our digital properties and will respond to all inquiries promptly and professionally.
        </p>

        <hr className="my-8" />

        <p className="text-sm text-gray-500 dark:text-gray-400">
          <em>This privacy policy covers all services operated under brianfending.com and its subdomains. It was last updated on July 27, 2025 and is effective as of May 15, 2025.</em>
        </p>
      </div>
    </div>
  )
}