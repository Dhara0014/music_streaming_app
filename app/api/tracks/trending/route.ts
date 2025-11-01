import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '50');

  try {
    const playlistId = '3155776842';
    
    const response = await fetch(
      `https://api.deezer.com/playlist/${playlistId}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Deezer API error: ${response.status}`);
    }

    const data = await response.json();
    const tracks = data.tracks?.data?.slice(0, limit) || [];
    
    return NextResponse.json(
      { data: tracks, total: tracks.length },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracks', data: [], total: 0 },
      { status: 500 }
    );
  }
}