import { DeezerTrack, Track } from '@/types';

const DEEZER_API = 'https://api.deezer.com';

function convertDeezerTrack(deezerTrack: DeezerTrack): Track {
  return {
    id: deezerTrack.id,
    title: deezerTrack.title,
    artist: deezerTrack.artist.name,
    album: deezerTrack.album.title,
    duration: deezerTrack.duration,
    cover: deezerTrack.album.cover_medium,
    audioUrl: deezerTrack.preview,
  };
}

export async function fetchTrendingTracks(limit: number = 50): Promise<Track[]> {
  try {
    const response = await fetch(`/api/tracks/trending?limit=${limit}`);
    const data = await response.json();
    
    if (data.data) {
      return data.data.map(convertDeezerTrack);
    }
    return [];
  } catch (error) {
    console.error('Error fetching trending tracks:', error);
    return [];
  }
}

export async function searchDeezerTracks(query: string): Promise<Track[]> {
  try {
    if (!query.trim()) return [];
    
    const response = await fetch(
      `/api/tracks/search?q=${encodeURIComponent(query)}&limit=20`
    );
    const data = await response.json();
    
    if (data.data) {
      return data.data.map(convertDeezerTrack);
    }
    return [];
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
}

export async function fetchArtistTopTracks(artistId: number): Promise<Track[]> {
  try {
    const response = await fetch(`${DEEZER_API}/artist/${artistId}/top?limit=10`);
    const data = await response.json();
    
    if (data.data) {
      return data.data.map(convertDeezerTrack);
    }
    return [];
  } catch (error) {
    console.error('Error fetching artist tracks:', error);
    return [];
  }
}