import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

// Define the expected request body structure
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON request body
    const body = await request.json() as ContactFormData;
    const { name, email, subject, message } = body;
    
    // Validate form data
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Format current date in ISO format for Google Sheets
    const datetime = new Date().toISOString();
    
    // 1. Write to Google Sheet
    await writeToSheet({ name, email, subject, message, datetime });
    
    // 2. Send notification email (optional)
    if (process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD && process.env.NOTIFICATION_EMAIL) {
      try {
        await sendNotificationEmail({ name, email, subject, message, datetime });
      } catch (emailError) {
        console.error('Error sending notification email:', emailError);
        // Continue even if email fails - data is saved to sheet
      }
    }
    
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

async function writeToSheet({ name, email, subject, message, datetime }: ContactFormData & { datetime: string }) {
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

async function sendNotificationEmail({ name, email, subject, message, datetime }: ContactFormData & { datetime: string }) {
  // Configure transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD, // Use app password for Gmail
    },
  });

  // Format date for email display
  const formattedDate = new Date(datetime).toLocaleString('en-US', {
    timeZone: 'America/New_York'
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `New Contact Form Submission: ${subject}`,
    text: `
      New contact form submission from brianfending.com:
      
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Date: ${formattedDate}
      
      Message:
      ${message}
    `,
    html: `
      <h2>New contact form submission from brianfending.com</h2>
      
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Date:</strong> ${formattedDate}</p>
      
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  // Send email
  return transporter.sendMail(mailOptions);
}