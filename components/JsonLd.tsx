'use client';

import { usePathname } from 'next/navigation';

export default function JsonLd() {
  const pathname = usePathname() || '';
  const baseUrl = 'https://www.brianfending.com';
  const currentUrl = `${baseUrl}${pathname}`;
  
  // Generate schema for the page
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Person
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: 'Brian Fending',
        url: baseUrl,
        sameAs: [
          'https://www.linkedin.com/in/brianfending/',
          'https://github.com/fending',
          'https://brianfending.substack.com/'
        ],
        jobTitle: 'Technology Leader',
      },
      // Website
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'Brian Fending',
        publisher: { '@id': `${baseUrl}/#person` },
      },
      // WebPage
      {
        '@type': 'WebPage',
        '@id': `${currentUrl}#webpage`,
        url: currentUrl,
        name: pathname === '/' 
          ? 'Brian Fending | Technology Leadership' 
          : `${pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)} | Brian Fending`,
        isPartOf: { '@id': `${baseUrl}/#website` },
        about: { '@id': `${baseUrl}/#person` },
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData)
      }}
    />
  );
}