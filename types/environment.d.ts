declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Google Sheets API credentials
      GOOGLE_SHEETS_CLIENT_EMAIL: string;
      GOOGLE_SHEETS_PRIVATE_KEY: string;
      GOOGLE_SHEETS_SHEET_ID: string;
      
      // Environment variables for image domains
      NEXT_PUBLIC_IMAGE_DOMAINS?: string;
      
      // Site URL for metadata
      NEXT_PUBLIC_SITE_URL?: string;
      VERCEL_URL?: string;
      
      // reCAPTCHA v3 keys
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
      RECAPTCHA_SECRET_KEY: string;
    }
  }
}

// Need this for TypeScript to recognize this as a module
export {};