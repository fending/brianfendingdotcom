import { Metadata, Viewport } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Brian Fending\'s professional experience, education, and achievements in technology leadership and software engineering.',
}

export const viewport: Viewport = {
  themeColor: '#ffffff'
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
  certificateId?: string
  certificateUrl?: string
}

// Resume data
const experiences: Experience[] = [
  {
    company: 'American Association for Physician Leadership (AAPL)',
    position: 'Chief Information Officer',
    period: 'January 2020 – March 2025',
    description: 'Led enterprise technology strategy and governance for healthcare-serving membership organization, overseeing business-critical platforms that drive the majority of organizational revenue. Established comprehensive governance frameworks and a security program that enabled international market expansion while maintaining regulatory compliance across multiple jurisdictions including GDPR, US Data Privacy, KSA PDPL, PCI DSS, and similar. Pioneered early AI adoption strategy with robust governance frameworks, implementing pilots and expanding to multiple enterprise LLM models across business units and functions. Orchestrated cloud migration reducing IT costs while maintaining enterprise-grade uptime for mission-critical systems. Presented regularly to Executive Committee and Audit & Risk Committee on technology strategy, enterprise risk posture, and compliance status.',
    achievements: []
  },
  {
    company: 'American Association for Physician Leadership (AAPL)',
    position: 'Senior VP, Information Technology',
    period: 'January 2019 – January 2020',
    description: 'Modernized enterprise infrastructure and established governance frameworks for scalable technology operations. Led comprehensive HubSpot and Salesforce CRM implementations, establishing integrated customer data platform and automated workflows. Established enterprise IT audit cycle. and protocols, disaster recovery / business continuity planning, and compliance frameworks aligned with COBIT standards. Streamlined technology stack through strategic vendor evaluation and platform consolidation, improving operational efficiency while reducing complexity. Moves made in this period directly contributed to the relative ease of moving to a fully-remote workforce in 2020.',
    achievements: []
  },
  {
    company: 'Strategic Technology Consulting Practices',
    position: 'Principal/Owner',
    period: 'April 2010 – December 2018',
    description: 'Led strategic technology consulting practices focused on enterprise architecture and complex systems integration across multiple industries. Started as startup advisory and product development services and evolved into comprehensive enterprise technology leadership, growing practice through referrals and successful project outcomes. Designed world\'s first at-scale iPad ordering system at JFK Terminal 5, managing complex integration with legacy POS systems and real-time inventory management. Built proprietary solutions including graph-based content management systems combining advanced search technologies for enterprise content discovery and workflow optimization. Created 100+ delivered enterprise and commercial mobile apps managing small teams. Transitioned practice focus to fractional CTO/CIO services, providing IT governance, compliance frameworks, vendor management, and strategic technology planning to enterprise clients. Led comprehensive HubSpot deployment and Salesforce CRM implementation for AAPL (2017-2018), establishing integrated marketing automation and customer data platform that directly led to full-time executive role. Specialized in healthcare, manufacturing, financial services, and government sectors with pattern recognition for scaling challenges and regulatory compliance across diverse environments.',
    achievements: []
  },
  {
    company: 'BuildingGreen, LLC',
    position: 'Senior Web Developer',
    period: '2007-2010',
    description: 'Led enterprise platform development for digital publishing serving green building professionals and federal agencies. Principal architect and developer for LEEDuser (https://www.leeduser.com) launch in partnership with USGBC, creating new subscription-based revenue stream. Managed development of U.S. Department of Energy High Performance Buildings Database and enterprise publishing systems for federal agencies.',
    achievements: []
  },
  {
    company: 'Delaware North Companies',
    position: 'Information Analyst',
    period: '2005-2007',
    description: 'Delivered Oracle BI solutions and enterprise analytics for global hospitality operations across sports, travel, and gaming business units. Developed data frameworks supporting real-time and strategic decision-making with custom project management dashboards. Chaired HTNG "Next-Generation Entertainment Systems" working group, setting industry standards for in-room technology later adopted by AHLA (2007).',
    achievements: []
  },
  {
    company: 'LoVullo Associates',
    position: 'Senior Programmer',
    period: '2003-2005',
    description: 'Built custom insurance rating engines and data integration solutions for managing general agent specializing in online rating systems serving specialty P&C products. Translated complex underwriting rules and state-level regulatory requirements into scalable, compliant systems. Led ETL design and execution for historical insurance data migration, ensuring regulatory compliance and system integrity.',
    achievements: []
  },
  {
    company: 'Buffalo & Erie County Public Library',
    position: 'Web Administrator',
    period: '2001-2003',
    description: 'Managed digital services and public web infrastructure for 52-branch library system. Replaced static workflows with database-driven CMS enabling dynamic updates and distributed content authorship. Designed internal knowledge management platform allowing staff librarians to maintain shared, searchable knowledge base across branches. Served as technical liaison on Digitization Committee, consulting on technology direction for the System.',
    achievements: []
  }
];

const education: Education[] = [
  {
    institution: 'Information Systems Audit and Control Association (ISACA)',
    degree: 'Certified Information Security Manager (CISM)',
    period: 'Expires January 2029',
    certificateId: '252857849',
    certificateUrl: 'https://www.credly.com/badges/d7425071-c00b-42e7-ab2a-b625557499c1/brianfendingdotcom'
  },
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
          Technology executive driving revenue growth and digital transformation through strategic IT investments, enterprise governance, and AI innovation. Proven track record of board-level leadership, international compliance management, and scaling digital operations from startup through enterprise levels.
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
                
                <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Education & Certifications
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
                
                {edu.certificateId && edu.certificateUrl && (
                  <div className="mb-2">
                    <span className="text-gray-700 dark:text-gray-300">Certificate ID: </span>
                    <Link 
                      href={edu.certificateUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline inline-flex items-center"
                    >
                      {edu.certificateId}
                      <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                )}
                
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
                <span className="text-gray-700 dark:text-gray-300">Digital Strategy</span>
              </li>
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
                <span className="text-gray-700 dark:text-gray-300">Enterprise Risk Management</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">IT Operations</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Compliance (GDPR, NIST 800-171, US Data Privacy, KSA PDPL)</span>
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
                <span className="text-gray-700 dark:text-gray-300">Board Governance</span>
              </li>
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
                <span className="text-gray-700 dark:text-gray-300">Product Development</span>
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
                <span className="text-gray-700 dark:text-gray-300">Cost Optimization</span>
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
          I'm currently open to employment opportunities, and available for consulting, advising, and speaking engagements.
        </p>
        <Link href="/contact" className="btn-primary">
          Get in Touch
        </Link>
      </section>
    </div>
  )
}