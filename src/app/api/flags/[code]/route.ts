import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const response = await fetch(`https://flagcdn.com/${params.code}.svg`);
    
    if (!response.ok) throw new Error('Failed to fetch flag');

    return new NextResponse(await response.arrayBuffer(), {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=604800, immutable'
      }
    });
  } catch (error) {
    return new NextResponse('Flag not found', { status: 404 });
  }
}
