import { Metadata, Viewport } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service and conditions for using brianfending.com',
}

export const viewport: Viewport = {
  themeColor: '#ffffff'
}

export default function TermsOfServicePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 pt-8">
        <h1 className="page-header text-gray-900 dark:text-white">Terms of Service</h1>
        <p className="text-xl mt-4 text-gray-700 dark:text-gray-300 max-w-3xl">
          Last updated: May 2025
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>1. Introduction</h2>
        <p>
          Welcome to brianfending.com. These Terms of Service ("Terms") govern your use of brianfending.com (the "Site") operated by Brian Fending ("we," "us," or "our"). By accessing or using the Site, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Site.
        </p>

        <h2>2. Intellectual Property</h2>
        <p>
          The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable intellectual property laws, including copyrights and trademarks. You may not copy, reproduce, republish, upload, post, transmit, or distribute such material in any way without our prior written consent.
        </p>

        <h2>3. User Conduct</h2>
        <p>
          You agree to use the Site only for lawful purposes and in a way that does not infringe the rights of any third party. You shall not:
        </p>
        <ul>
          <li>Use the Site in any way that could disable, overburden, damage, or impair the Site</li>
          <li>Use any robot, spider, or other automatic device to access the Site</li>
          <li>Introduce any viruses, trojan horses, worms, or other harmful material</li>
          <li>Attempt to gain unauthorized access to any portion of the Site</li>
          <li>Interfere with the proper working of the Site</li>
        </ul>

        <h2>4. Disclaimer of Warranties</h2>
        <p>
          The Site is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the operation or availability of the Site. We do not warrant that the Site will be uninterrupted or error-free, that defects will be corrected, or that the Site is free of viruses or other harmful components.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          In no event shall we be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Site or inability to use the Site.
        </p>

        <h2>6. External Links</h2>
        <p>
          The Site may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
        </p>

        <h2>7. Privacy Policy</h2>
        <p>
          Your use of the Site is also governed by our <Link href="/privacy" className="text-primary-600 dark:text-primary-400">Privacy Policy</Link>, which is incorporated into these Terms by reference.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on the Site. You are advised to review these Terms periodically for any changes.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the United States and the State of New York, without regard to its conflict of law provisions.
        </p>

        <h2>10. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please <Link href="/contact" className="text-primary-600 dark:text-primary-400">contact us</Link>.
        </p>
        <p>&nbsp;</p>
      </div>
    </div>
  )
}