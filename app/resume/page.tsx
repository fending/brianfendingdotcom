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
    period: '2020-2025',
    description: '',
    achievements: [
      'Directed enterprise technology strategy, cybersecurity, and digital transformation.',
      'Partnered with the executive team, board, and executive committee on risk, compliance, and strategy.',
      'Introduced AI governance and workflow automation initiatives.'
    ]
  },
  {
    company: 'American Association for Physician Leadership (AAPL)',
    position: 'Senior Vice President, Information Technology',
    period: '2019-2020',
    description: '',
    achievements: [
      'Stabilized IT operations during a period of transition.',
      'Rebuilt governance structures and modernized platforms.',
      'Developed IT talent and prepared the organization for growth.'
    ]
  },
  {
    company: 'American Association for Physician Leadership (AAPL)',
    position: 'Consultant (via MADE, Inc.) - Fractional Executive',
    period: 'Aug 2016 – Dec 2018',
    description: 'Fractional technology executive guiding enterprise transformation for $10M healthcare association with 40 staff.',
    achievements: [
      'Delivered IT transformation roadmap (governance, cloud migration, vendor rationalization) adopted as 2-year baseline for incoming SVP Technology and CIO',
      'Identified 20+ critical infrastructure gaps blocking organizational growth, including CRM modernization, marketing automation deficit, and fragmented data architecture',
      'Introduced modern IT governance framework (COBIT/NIST-aligned) establishing IT audit cycles and vendor management lifecycle'
    ]
  },
  {
    company: 'MADE, Inc.',
    position: 'Founder and Principal Consultant',
    period: '2015 – 2018',
    description: 'Innovation studio delivering digital products, assessments, and advisory services across healthcare nonprofits, retail, financial services, and SaaS product development. Served 12 enterprise clients over three years maintaining retainer and project-based engagements.',
    achievements: [
      'Developed AI readiness, cybersecurity maturity, and digital transformation assessments adopted by C-suite executives to benchmark security posture and compliance maturity',
      'Architected production AWS (EC2, RDS, S3, Route53, Elasticsearch, SQS, SNS) and Azure environments with multi-AZ configurations, security hardening, and continuous cost optimization',
      'Led COBOL-to-modern-API integration for retail POS serving 20+ locations, bridging 1970s-era systems with contemporary architecture',
      'Created repeatable assessment frameworks spanning cybersecurity, AI readiness, and digital transformation maturity'
    ]
  },
  {
    company: 'Monster Assembly',
    position: 'Founder and Principal Consultant',
    period: 'Dec 2012 – 2015',
    description: 'Boutique product studio launching apps and digital tools across consumer products, financial services, and medical devices. Brought in 3-6 contractors per engagement from network of 10 specialized developers and designers.',
    achievements: [
      'Web, mobile, and SaaS platforms across iOS, Android, and web serving consumer and enterprise markets',
      'iPad showcase application for cardiac device specialists deployed to 500+ medical device sales professionals',
      'Production AWS infrastructure with multi-AZ configurations, custom security groups, and cost optimization for client deployments',
      'Scaled prototypes to production environments for early-stage companies and enterprise clients'
    ]
  },
  {
    company: 'Fending Group',
    position: 'Founder and Principal Consultant',
    period: 'Apr 2010 – Dec 2011',
    description: 'Early consultancy focused on custom business applications and digital infrastructure. Pioneered tablet-based ordering systems years before market adoption became mainstream.',
    achievements: [
      'Built first iPad-based restaurant ordering platform deployed at scale in US hospitality market (2010)',
      'Integrated iPad ordering system with Micros POS, deployed across airport restaurant locations',
      'Created extensible RFP publishing and delivery platform for enterprise procurement workflows',
      'Architected production AWS infrastructure (EC2, RDS, S3, Route53) with multi-AZ configurations and custom security groups'
    ]
  },
  {
    company: 'BuildingGreen, Inc.',
    position: 'Senior Web Developer',
    period: 'Sep 2008 – Jan 2010',
    description: 'Three-person technology team supporting $2M mission-driven publisher in sustainable building sector.',
    achievements: [
      'Lead developer of LEEDuser.com, becoming a standard reference for 200,000+ LEED certification professionals',
      'Partnered with U.S. Department of Energy to modernize High Performance Buildings (HPB) database serving national green building community',
      'Executed digital strategy for sustainable building publisher'
    ]
  }
];

const education: Education[] = [
  {
    institution: 'Information Systems Audit and Control Association (ISACA)',
    degree: 'Certified Information Security Manager (CISM)',
    period: 'Active through 2029',
    certificateId: '252857849',
    certificateUrl: 'https://www.credly.com/badges/d7425071-c00b-42e7-ab2a-b625557499c1/brianfendingdotcom'
  },
  {
    institution: 'Information Systems Audit and Control Association (ISACA)',
    degree: 'Certified in Risk and Information Systems Control (CRISC)',
    period: 'Anticipated Q4 2025'
  },
  {
    institution: 'Information Systems Audit and Control Association (ISACA)',
    degree: 'Advanced in AI Security Management (AAISM)',
    period: 'Anticipated Q1 2026'
  },
  {
    institution: 'UKAS',
    degree: 'ISO/IEC 42001 (AI Management Systems)',
    period: 'Issued 2025',
    certificateId: '3d727ad6-7074-5d9f-e063-6f8d460afaa0',
    certificateUrl: 'https://training-academy.ukas.com/lmt/clmsbadges.pView?bdg=3d727ad6-7074-5d9f-e063-6f8d460afaa0'
  },
  {
    institution: 'Miami University',
    degree: 'Graduate Studies',
    period: ''
  },
  {
    institution: 'SUNY Fredonia',
    degree: 'Undergraduate Studies',
    period: ''
  }
];

export default function ResumePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 pt-8">
        <h1 className="page-header text-gray-900 dark:text-white">Resume</h1>
        <p className="text-xl mt-4 text-gray-700 dark:text-gray-300 max-w-3xl">
          Technology executive with two decades of leadership experience, most recently serving as CIO of a national healthcare association. My work centers on building technology programs that strengthen organizational resilience, ensure regulatory compliance, and enable growth. Specializing in cybersecurity governance, board engagement, and aligning IT operations with mission and strategy.
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