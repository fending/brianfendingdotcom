import { Metadata, Viewport } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for brianfending.com regarding data collection and cookie usage',
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
          Last updated: May 2024
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Introduction</h2>
        <p>
          This Privacy Policy describes how your personal information is collected, used, and shared when you visit brianfending.com ("the Site").
        </p>

        <h2>Personal Information We Collect</h2>
        <p>
          When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
        </p>

        <h2>Cookies</h2>
        <p>
          We use the following types of cookies on our website:
        </p>

        <h3>Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
        </p>

        <h3>Analytics Cookies</h3>
        <p>
          We use Google Analytics to help us understand how our visitors use the Site. Google Analytics uses cookies to collect anonymous information such as the number of visitors to the site, which pages they visited, and how they navigate around the site. These cookies do not collect personally identifiable information.
        </p>
        <p>
          You can opt out of these cookies by declining cookies when you first visit our site or by using the cookie settings in your browser.
        </p>

        <h2>How We Use Your Personal Information</h2>
        <p>
          We use the information we collect to help us screen for potential risk and fraud, and to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site).
        </p>

        <h2>Changes</h2>
        <p>
          We may update this privacy policy from time to time in order to reflect changes to our practices or for other operational, legal or regulatory reasons.
        </p>

        <h2>Contact Us</h2>
        <p>
          For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please <Link href="/contact" className="text-primary-600 dark:text-primary-400">contact us</Link>.
        </p>
      </div>
    </div>
  )
}