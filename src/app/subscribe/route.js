// app/api/subscribe/route.js
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req) {
  if (!process.env.GOOGLE_CREDENTIALS) {
    console.error('Missing GOOGLE_CREDENTIALS');
    return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
  }

  try {
    const { email } = await req.json();
    console.log('Processing email:', email);

    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A:B',  // Just specify the sheet name
      valueInputOption: 'RAW',
      requestBody: {
        values: [[email, new Date().toISOString()]]
      }
    });

    console.log('Sheet response:', response.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      credentials: !!process.env.GOOGLE_CREDENTIALS,
      sheetId: process.env.GOOGLE_SHEET_ID
    });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
