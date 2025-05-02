import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Brian Fending\'s professional experience, education, and achievements in technology leadership and software engineering.',
}

interface Experience {
  company: string
  position: string
  period: string
  description: string
  achievements: string[]
}

interface Education {
  institution: string
  degree: string
  period: string
  description?: string
}

// Resume data
const experiences: Experience[] = [
  {
    company: 'American Association for Physician Leadership (AAPL)',
    position: 'CIO',
    period: 'January 2020 – March 2025',
    description: 'Led enterprise IT strategy, governance, and digital transformation, overseeing cloud infrastructure, cybersecurity, and business intelligence operations.',
    achievements: [
      'AI-driven automations and processes, optimizing resource allocation and customer engagement',
      'Established comprehensive IT governance frameworks, ensuring compliance with industry standards and enhancing data security',
      'Managed a hybrid IT team and multiple MSP and development partners, delivering scalable infrastructure to support growth',
      'Migrated all core IT infrastructure to the cloud, improving system resilience, scalability, and remote workforce enablement',
      'Strengthened cybersecurity posture, implementing globally-oriented policies, multi-factor auth/auth, and continuous risk assessment frameworks'
    ]
  },
  {
    company: 'American Association for Physician Leadership (AAPL)',
    position: 'SVP, Information Technology',
    period: 'January 2019 – January 2020',
    description: 'Managed IT infrastructure, audits, and technology initiatives to ensure system resilience and readiness for growth.',
    achievements: [
      'Directed IT staff and led projects to improve service delivery, optimize systems, and prepare the organization with future-facing technology',
      'Implemented both Salesforce CRM and Hubspot marketing automation to replace legacy solutions'
    ]
  },
  {
    company: 'MADE, Inc.',
    position: 'Owner and Principal Consultant',
    period: 'March 2015 – December 2018',
    description: 'Provided strategic IT leadership for startup, SME, and enterprise clients, focusing on IT governance, vendor management, compliance, and product development.',
    achievements: [
      'Led full product and system development lifecycles, from concept to launch, delivering scalable technology solutions for a variety of clients (including AAPL)',
      'Implemented IT governance frameworks to enhance security, regulatory compliance, and risk management'
    ]
  },
  {
    company: 'CrowdBouncer',
    position: 'Chief Technology Officer',
    period: 'February 2013 – December 2014',
    description: 'Designed and launched an API-driven compliance platform, enabling secure, automated, SEC-compliant verification for equity crowdfunding transactions.',
    achievements: [
      'Developed and implemented CrowdSIP protocol, creating a scalable infrastructure for a secondary market in equity crowdfunding',
      'Built a high-availability, distributed API, ensuring secure transactions for exposed services via Apigee'
    ]
  },
  {
    company: 'Monster Assembly',
    position: 'Owner and Principal Consultant',
    period: 'December 2011 – January 2013',
    description: 'Led numerous projects across multiple products with hundreds of releases, delivering scalable technology solutions across industries.',
    achievements: [
      'Designed and deployed tailored technology solutions, optimizing business workflows and customer engagement'
    ]
  },
  {
    company: 'Black Squirrel Distillery',
    position: 'Cofounder | VP, Product Development',
    period: 'August 2013 – September 2019',
    description: 'Built a craft distillery from concept to commercialization, launching four unique spirits into retail and distribution.',
    achievements: [
      'Developed operational and product standards, optimizing production and quality control',
      'Exited via sale to Lafayette Distilling (Buffalo, NY)'
    ]
  }
];

const education: Education[] = [
  {
    institution: 'Miami University, Oxford, OH',
    degree: 'MM',
    period: 'Aug 1996 – Dec 1999'
  },
  {
    institution: 'State University of New York at Fredonia, Fredonia, NY',
    degree: 'BM',
    period: 'Aug 1992 – May 1996'
  }
];

export default function ResumePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 pt-8">
        <h1 className="page-header text-gray-900 dark:text-white">Resume</h1>
        <p className="text-xl mt-4 text-gray-700 dark:text-gray-300 max-w-3xl">
          Strategic IT executive with a track record of driving enterprise-wide digital transformation, optimizing IT spend, and leading high-impact AI and automation initiatives. Adept at aligning technology with business goals, governance, and velocity.
        </p>
        
        <div className="flex mt-6">
          <Link href="/contact" className="btn-primary">
            Contact Me
          </Link>
        </div>
      </div>

      {/* Professional Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Professional Experience
        </h2>
        
        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* Timeline dot and line */}
              <div className="hidden sm:block absolute top-0 left-0 h-full w-6">
                <div className="absolute top-1.5 left-2.5 w-1 h-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="absolute top-1.5 left-1.5 w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400"></div>
              </div>
              
              <div className="sm:pl-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.position}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center text-lg mb-2">
                  <span className="font-medium text-primary-600 dark:text-primary-400">{exp.company}</span>
                  <span className="hidden sm:inline mx-2 text-gray-400">•</span>
                  <span className="text-gray-600 dark:text-gray-400">{exp.period}</span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">{exp.description}</p>
                
                {exp.achievements && exp.achievements.length > 0 && (
                  <>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Contributions:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Education
        </h2>
        
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="relative">
              {/* Timeline dot and line */}
              <div className="hidden sm:block absolute top-0 left-0 h-full w-6">
                {index < education.length - 1 && (
                  <div className="absolute top-1.5 left-2.5 w-1 h-full bg-gray-200 dark:bg-gray-700"></div>
                )}
                <div className="absolute top-1.5 left-1.5 w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400"></div>
              </div>
              
              <div className="sm:pl-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center mb-2">
                  <span className="font-medium text-primary-600 dark:text-primary-400">{edu.institution}</span>
                  <span className="hidden sm:inline mx-2 text-gray-400">•</span>
                  <span className="text-gray-600 dark:text-gray-400">{edu.period}</span>
                </div>
                
                {edu.description && (
                  <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Core Competencies
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Technology Leadership</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">IT Strategy</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Digital Transformation</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Cloud & Infrastructure (AWS, Azure)</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Business Intelligence & Analytics</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Governance & Compliance</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">IT Governance</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Cybersecurity</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Risk Management</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Compliance (GDPR et al, NIST, Data Privacy)</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Business & Operations</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Cross-Functional Leadership</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">New Product and Category Development</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Vendor & Stakeholder Management</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">AI & Automation Initiatives</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="mt-16 mb-12 py-12 px-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Interested in Working Together?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          I'm currently available for consulting, advising, and speaking engagements.
        </p>
        <Link href="/contact" className="btn-primary">
          Get in Touch
        </Link>
      </section>
    </div>
  )
}