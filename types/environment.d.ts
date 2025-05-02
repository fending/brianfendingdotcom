declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Google Sheets API credentials
      GOOGLE_SHEETS_CLIENT_EMAIL: string;
      GOOGLE_SHEETS_PRIVATE_KEY: string;
      GOOGLE_SHEETS_SHEET_ID: string;
      
      // Email notification settings (optional)
      EMAIL_USERNAME?: string;
      EMAIL_PASSWORD?: string;
      NOTIFICATION_EMAIL?: string;
      
      // Environment variables for image domains
      NEXT_PUBLIC_IMAGE_DOMAINS?: string;
    }
  }
}

// Need this for TypeScript to recognize this as a module
export {};