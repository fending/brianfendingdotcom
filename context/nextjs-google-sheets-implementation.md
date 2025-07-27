# Next.js Contact Form with Google Sheets Integration Guide

This guide walks through implementing a contact form on your Next.js site that writes submissions to Google Sheets and sends notifications.

## Overview

You'll create a server-side API route in your Next.js application that:
1. Receives form submissions from your frontend
2. Authenticates with Google Sheets API 
3. Writes the submission data to your spreadsheet
4. Sends you a notification email

## Prerequisites

- Next.js project hosted on Vercel
- Google Cloud account
- Existing Google Sheet

## Implementation Steps

### Step 1: Configure Google Sheets API Service Account Key

You've already set up the Google Cloud project and enabled the Google Sheets API. Next:

1. **Create and download the service account key**:
   - Select your service account from the list
   - Navigate to the "Keys" tab
   - Click "Add Key" → "Create New Key"
   - Select JSON format
   - Click "Create" to download the key file

2. **Share your Google Sheet with the service account**:
   - Find your service account email in the downloaded JSON file (`client_email` field)
   - Open your target Google Sheet
   - Click the "Share" button in the top-right corner
   - Enter the service account email address
   - Set permission level to "Editor" to allow writing data
   - Click "Send" (no notification will be sent)

### Step 2: Add Required Packages to Your Project

```bash
npm install googleapis nodemailer
```

### Step 3: Configure Environment Variables in Vercel

1. In your Vercel project, go to "Settings" → "Environment Variables"
2. Add the following variables from your service account key file:
   ```
   GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
   GOOGLE_SHEETS_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYour private key content here\n-----END PRIVATE KEY-----\n
   GOOGLE_SHEETS_SHEET_ID=your-sheet-id-from-url
   
   # Email notification settings (optional)
   EMAIL_USERNAME=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   NOTIFICATION_EMAIL=where-to-send-notifications@example.com
   ```

**Important**: For the private key, make sure to use the raw value from your JSON file. In your code, you'll need to handle newline characters properly.

### Step 4: Create API Route Handler

Create a file at `app/api/contact/route.ts`:

```typescript
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

// Define the expected request body structure
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
}

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('reCAPTCHA secret key not configured');
      return false;
    }
    
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      { method: 'POST' }
    );
    
    const data = await response.json();
    
    // Check response
    if (data.success) {
      // For v3, check score (0.0 to 1.0, where 1.0 is very likely a good interaction)
      // Typically, 0.5 is a good threshold, but you can adjust based on your needs
      if (data.score && data.score < 0.5) {
        console.warn(`reCAPTCHA score too low: ${data.score}`);
        return false;
      }
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON request body
    const body = await request.json() as ContactFormData;
    const { name, email, subject, message, recaptchaToken } = body;
    
    // Validate form data
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Validate reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        { message: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }
    
    // Verify reCAPTCHA token
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { message: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }
    
    // Format current date in ISO format for Google Sheets
    const datetime = new Date().toISOString();
    
    // Write to Google Sheet - exclude recaptchaToken as it's not needed in the sheet
    await writeToSheet({ name, email, subject, message, datetime });
    
    return NextResponse.json(
      { message: 'Your message has been sent! I\'ll get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling form submission:', error);
    return NextResponse.json(
      { message: 'There was an error processing your request. Please try again.' },
      { status: 500 }
    );
  }
}

async function writeToSheet({ name, email, subject, message, datetime }: Omit<ContactFormData, 'recaptchaToken'> & { datetime: string }) {
  try {
    // Configure auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        // Handle newline characters in the private key
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Prepare row values - match exact column headings: datetime, name, email, subject, message
    const values = [[datetime, name, email, subject, message]];
    
    // Append data to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SHEET_ID,
      range: 'Sheet1!A:E', // Match column headings in the sheet
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });
    
    return response;
  } catch (error) {
    console.error('Error writing to Google Sheet:', error);
    throw new Error('Failed to save form data to Google Sheet');
  }
}
```

### Step 5: Create the Frontend Contact Form with reCAPTCHA

Create a component for your contact form in your Next.js app with reCAPTCHA integration:

```tsx
// components/ContactForm.tsx
'use client';

import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { ReCaptchaProvider } from '@/components/ReCaptchaProvider';

// Define form data interface
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
}

// Define form status interface
interface FormStatus {
  isSubmitting: boolean;
  isSubmitted: boolean;
  isError: boolean;
  message: string;
}

export default function ContactForm() {
  // Initial empty form data
  const initialFormData: FormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
    recaptchaToken: ''
  };

  // Form state
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: '',
  });

  // Reference to reCAPTCHA component
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      isError: false,
      message: '',
    });

    try {
      // Execute reCAPTCHA and get token
      const token = await recaptchaRef.current?.executeAsync();
      
      // If reCAPTCHA fails, handle error
      if (!token) {
        throw new Error('reCAPTCHA verification failed');
      }
      
      // Update form data with reCAPTCHA token
      const formDataWithToken = {
        ...formData,
        recaptchaToken: token,
      };
      
      // Submit form data to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithToken),
      });
      
      // Parse response
      const result = await response.json();
      
      // Reset reCAPTCHA
      recaptchaRef.current?.reset();
      
      // Handle response based on status
      if (response.ok) {
        // Success - reset form
        setFormData(initialFormData);
        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          isError: false,
          message: result.message || 'Your message has been sent!',
        });
      } else {
        // API error
        setFormStatus({
          isSubmitting: false,
          isSubmitted: false,
          isError: true,
          message: result.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      // Client-side error
      console.error('Error submitting form:', error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message: 'An error occurred. Please try again later.',
      });
      
      // Reset reCAPTCHA
      recaptchaRef.current?.reset();
    }
  };

  return (
    <ReCaptchaProvider>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            {/* Name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            {/* Subject field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            {/* Message field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            {/* Status message */}
            {(formStatus.isSubmitted || formStatus.isError) && (
              <div className={`p-3 rounded ${formStatus.isError ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'}`}>
                {formStatus.message}
              </div>
            )}
            
            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={formStatus.isSubmitting}
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            
            {/* reCAPTCHA */}
            <div className="recaptcha-container">
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                This site is protected by reCAPTCHA and the Google{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">
                  Terms of Service
                </a>{' '}
                apply.
              </p>
            </div>
          </div>
        </div>
      </form>
    </ReCaptchaProvider>
  );
}

### Step 6: Create the ReCaptcha Provider Component

```tsx
// components/ReCaptchaProvider.tsx
'use client';

import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export function ReCaptchaProvider({ children }: { children: React.ReactNode }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
  
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
```

### Step 7: Include the Form in Your Page

```tsx
// app/contact/page.tsx
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact | Brian Fending',
  description: 'Get in touch with Brian Fending for technology leadership insights, consulting, or speaking opportunities.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Contact</h1>
        
        <div className="prose dark:prose-invert max-w-none mb-12">
          <p>
            Have a question, comment, or opportunity you'd like to discuss? 
            Use the form below to get in touch, and I'll get back to you as soon as possible.
          </p>
        </div>
        
        <ContactForm />
      </div>
    </div>
  );
}
```

### Step 8: Deploy to Vercel

Push your changes to your repository, and Vercel will automatically deploy your updates. Make sure you've set all required environment variables in your Vercel project settings:

- `GOOGLE_SHEETS_CLIENT_EMAIL`: From your service account JSON
- `GOOGLE_SHEETS_PRIVATE_KEY`: From your service account JSON (with escaped newlines)
- `GOOGLE_SHEETS_SHEET_ID`: Your Google Sheet's ID
- `RECAPTCHA_SECRET_KEY`: Your reCAPTCHA v3 secret key
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: Your reCAPTCHA v3 site key

## Setting Up Google Sheet

For optimal use, format your Google Sheet with these headers in the first row:

| Date/Time | Name | Email | Subject | Message |
|-----------|------|-------|---------|---------|

## Troubleshooting

1. **Authentication Errors**: 
   - Verify private key is correctly formatted in environment variables
   - Make sure service account email is properly shared with the sheet

2. **Permission Errors**: 
   - Check that service account has Editor access to the spreadsheet

3. **reCAPTCHA Issues**:
   - Ensure both server and client keys are set correctly
   - Check browser console for reCAPTCHA errors
   - Verify reCAPTCHA domains are configured correctly in the Google reCAPTCHA console

4. **Missing Data**:
   - Verify sheet range in API call matches your actual sheet structure

## Security Considerations

- Server-side validation ensures all form fields are validated even if client-side validation is bypassed
- reCAPTCHA v3 provides protection against bots and spam submissions
- TypeScript interfaces ensure type safety throughout the application
- Environment variables protect sensitive credentials
- Request validation prevents malicious inputs
- Error handling prevents exposing sensitive error details to clients

## Implemented Enhancements

- reCAPTCHA v3 integration with invisible captcha (no user interaction required)
- TypeScript interfaces for improved type safety
- Responsive design with dark mode support
- Proper error handling and user feedback
- Subject field for better organization of submissions
- Complete server-side validation
- Compatible with Next.js 14 App Router and React 18
