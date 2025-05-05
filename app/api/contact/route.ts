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