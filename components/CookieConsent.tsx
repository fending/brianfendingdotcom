'use client';

import { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import Cookies from 'js-cookie';

// Cookie names
const CONSENT_COOKIE_NAME = 'cookie-consent-accepted';
const GA_DISABLED_COOKIE = 'ga-disabled';
const GA_MEASUREMENT_ID = 'G-VEVM3PBSFQ';

// Define the global window property for TypeScript
declare global {
  interface Window {
    [key: `ga-disable-${string}`]: boolean;
  }
}

export default function CookieConsentBanner() {
  const [hasConsent, setHasConsent] = useState(true); // Default to true to prevent flash
  
  useEffect(() => {
    try {
      // Check if consent cookie exists
      const consentCookie = Cookies.get(CONSENT_COOKIE_NAME);
      setHasConsent(!!consentCookie);
      
      // If no consent has been given yet, disable GA by default
      if (!consentCookie) {
        window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
        Cookies.set(GA_DISABLED_COOKIE, 'true', { expires: 365 });
      }
    } catch (error) {
      console.error('Error setting initial cookie consent state:', error);
    }
  }, []);

  const handleAccept = () => {
    try {
      // Set cookie consent for 1 year
      Cookies.set(CONSENT_COOKIE_NAME, 'true', { expires: 365 });
      
      // Enable Google Analytics
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
      Cookies.remove(GA_DISABLED_COOKIE);
      
      // Reload page to ensure GA is initialized correctly
      window.location.reload();
    } catch (error) {
      console.error('Error accepting cookies:', error);
      setHasConsent(true); // Hide the banner even if error occurs
    }
  };

  const handleDecline = () => {
    try {
      // Set declined consent cookie for 1 year
      Cookies.set(CONSENT_COOKIE_NAME, 'false', { expires: 365 });
      
      // Disable Google Analytics
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      Cookies.set(GA_DISABLED_COOKIE, 'true', { expires: 365 });
    } catch (error) {
      console.error('Error declining cookies:', error);
      setHasConsent(true); // Hide the banner even if error occurs
    }
  };

  // Don't render if consent has already been given or explicitly declined
  if (hasConsent) {
    return null;
  }

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      onAccept={handleAccept}
      onDecline={handleDecline}
      cookieName={CONSENT_COOKIE_NAME}
      expires={365}
      style={{ 
        background: 'rgba(20, 20, 20, 0.95)',
        maxWidth: '1200px',
        width: '95%',
        margin: '0 auto',
        left: '0',
        right: '0',
        bottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
        padding: '16px 20px',
        zIndex: 1000
      }}
      buttonStyle={{ 
        background: '#2563eb', 
        color: 'white', 
        fontSize: '14px',
        borderRadius: '6px',
        padding: '8px 16px' 
      }}
      declineButtonStyle={{ 
        background: 'transparent', 
        color: 'white', 
        border: '1px solid white', 
        fontSize: '14px',
        borderRadius: '6px',
        padding: '8px 16px' 
      }}
      contentStyle={{ 
        flex: '1',
        margin: '0 50px 0 0' 
      }}
    >
      <p className="text-sm">
        This website uses cookies to enhance your browsing experience. We use analytics 
        cookies to understand how you use our website and to improve your experience. 
        You can choose to accept or decline these cookies at any time.
      </p>
      <a 
        href="/privacy" 
        style={{ 
          textDecoration: 'underline', 
          color: '#60a5fa', 
          display: 'inline-block',
          marginTop: '8px',
          fontSize: '0.8rem'
        }}
      >
        Privacy Policy
      </a>
    </CookieConsent>
  );
}