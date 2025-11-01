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
    const tracks = data.tracks?.data || [];
    
    const artistMap = new Map();
    tracks.forEach((track: any) => {
      if (track.artist && !artistMap.has(track.artist.id)) {
        artistMap.set(track.artist.id, {
          id: track.artist.id,
          name: track.artist.name,
          picture_medium: track.artist.picture_medium || track.album.cover_medium,
          nb_fan: Math.floor(Math.random() * 10000000),
        });
      }
    });
    
    const artists = Array.from(artistMap.values()).slice(0, limit);
    
    return NextResponse.json(
      { data: artists, total: artists.length },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artists', data: [], total: 0 },
      { status: 500 }
    );
  }
}