// app/api/subscribe/route.ts
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse request
    const { email } = await req.json();
    
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Parse credentials
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS!);
    
    // Initialize auth and sheets
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    
    const sheets = google.sheets({ version: 'v4', auth });

    // Append data using the correct sheet name
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'Feuille 1'!A:B",  // Note the single quotes around sheet name
      valueInputOption: 'RAW',
      requestBody: {
        values: [[email, new Date().toISOString()]]
      }
    });

    console.log('Successfully added row to sheet');
    
    return NextResponse.json({
      success: true,
      message: 'Thanks for subscribing!'
    });

  } catch (error: any) {
    console.error('Subscription error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      response: error.response?.data
    });

    return NextResponse.json({ 
      error: error.message || 'Failed to process subscription' 
    }, { 
      status: 500 
    });
  }
}