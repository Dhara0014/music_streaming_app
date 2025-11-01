import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '20');

  try {
    // Get new releases from New Music Friday playlist
    const playlistId = '3155776842'; // New Music Friday
    
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
    
    const albumMap = new Map();
    tracks.forEach((track: any) => {
      if (track.album && !albumMap.has(track.album.id)) {
        albumMap.set(track.album.id, {
          id: track.album.id,
          title: track.album.title,
          cover_medium: track.album.cover_medium,
          release_date: new Date().toISOString().split('T')[0],
          artist: {
            name: track.artist.name,
          },
        });
      }
    });
    
    const albums = Array.from(albumMap.values()).slice(0, limit);
    
    return NextResponse.json(
      { data: albums, total: albums.length },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching albums:', error);
    return NextResponse.json(
      { error: 'Failed to fetch albums', data: [], total: 0 },
      { status: 500 }
    );
  }
}