'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

// Define the global window property for TypeScript
declare global {
  interface Window {
    [key: `ga-disable-${string}`]: boolean;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-VEVM3PBSFQ';
  
  useEffect(() => {
    // Check if user has declined cookies
    try {
      const gaDisabled = Cookies.get('ga-disabled');
      
      if (gaDisabled === 'true') {
        window[`ga-disable-${measurementId}`] = true;
      }
    } catch (error) {
      console.error('Error checking cookie consent status:', error);
    }
  }, [measurementId]);
  
  // Only render in production and if the ID is available
  if (!measurementId || process.env.NODE_ENV !== 'production') {
    return null;
  }

  // Create the analytics script content
  const analyticsScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    // Initialize GA with respect to user's consent preference
    const gaDisabled = document.cookie.includes('ga-disabled=true');
    if (gaDisabled) {
      window['ga-disable-${measurementId}'] = true;
    }
    
    gtag('config', '${measurementId}', {
      anonymize_ip: true
    });
  `;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script 
        id="google-analytics" 
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: analyticsScript }}
      />
    </>
  );
}