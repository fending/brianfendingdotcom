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

Create a file at `pages/api/contact.js`:

```javascript
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;
    
    // Validate form data
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Format current date
    const date = new Date().toLocaleString();
    
    // 1. Write to Google Sheet
    await writeToSheet({ name, email, message, date });
    
    // 2. Send notification email (optional)
    await sendNotificationEmail({ name, email, message });
    
    return res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error handling form submission:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function writeToSheet({ name, email, message, date }) {
  // Configure auth
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      // Handle newline characters in the private key
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  
  // Prepare row values
  const values = [[date, name, email, message]];
  
  // Append data to sheet
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SHEET_ID,
    range: 'Sheet1!A:D', // Adjust range as needed
    valueInputOption: 'USER_ENTERED',
    resource: { values },
  });
}

async function sendNotificationEmail({ name, email, message }) {
  // Skip if email settings not configured
  if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD || !process.env.NOTIFICATION_EMAIL) {
    return;
  }

  // Configure transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD, // Use app password for Gmail
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
      Date: ${new Date().toLocaleString()}
    `,
  };

  // Send email
  await transporter.sendMail(mailOptions);
}
```

### Step 5: Create the Frontend Contact Form

Create a component for your contact form in your Next.js app:

```jsx
// components/ContactForm.jsx
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.status === 200) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: data.message }
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          info: { error: true, msg: data.message || 'Something went wrong' }
        });
      }
    } catch (error) {
      setStatus({
        submitting: false,
        info: { error: true, msg: 'Error submitting form' }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <button
        type="submit"
        disabled={status.submitting}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {status.submitting ? 'Submitting...' : 'Send Message'}
      </button>

      {status.info.error && (
        <div className="text-red-500 text-sm mt-2">{status.info.msg}</div>
      )}
      
      {status.submitted && (
        <div className="text-green-500 text-sm mt-2">{status.info.msg}</div>
      )}
    </form>
  );
}
```

### Step 6: Include the Form in Your Page

```jsx
// pages/contact.js (or wherever you want to include the form)
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      <ContactForm />
    </div>
  );
}
```

### Step 7: Deploy to Vercel

Push your changes to your repository, and Vercel will automatically deploy your updates.

## Setting Up Google Sheet

For optimal use, format your Google Sheet with these headers in the first row:

| Date/Time | Name | Email | Message |
|-----------|------|-------|---------|

## Troubleshooting

1. **Authentication Errors**: 
   - Verify private key is correctly formatted in environment variables
   - Make sure service account email is properly shared with the sheet

2. **Permission Errors**: 
   - Check that service account has Editor access to the spreadsheet

3. **Missing Data**:
   - Verify sheet range in API call matches your actual sheet structure

## Security Considerations

- Validate form inputs on both client and server
- Consider adding rate limiting to prevent abuse
- Use environment variables for all sensitive credentials
- Never expose your service account key in client-side code

## Next Steps & Enhancements

- Add reCAPTCHA to prevent spam
- Implement form validation with a library like Formik or React Hook Form
- Add custom fields to collect additional information
- Set up a scheduled function to automatically create backups of form submissions
