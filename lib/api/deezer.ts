
import { DeezerTrack, Track, DeezerArtist, Artist, DeezerAlbum, Album } from '@/types';

const API_BASE = '/api/tracks';

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

function convertDeezerArtist(deezerArtist: DeezerArtist): Artist {
  return {
    id: deezerArtist.id,
    name: deezerArtist.name,
    picture: deezerArtist.picture_medium,
    nb_fan: deezerArtist.nb_fan,
  };
}

function convertDeezerAlbum(deezerAlbum: DeezerAlbum): Album {
  return {
    id: deezerAlbum.id,
    title: deezerAlbum.title,
    cover: deezerAlbum.cover_medium,
    artist: deezerAlbum.artist.name,
    release_date: deezerAlbum.release_date,
  };
}

export async function fetchTrendingTracks(limit: number = 50): Promise<Track[]> {
  try {
    const response = await fetch(`${API_BASE}/trending?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending tracks');
    }
    
    const data = await response.json();
    
    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error('Unexpected API response:', data);
      return [];
    }
    
    return data.data.map(convertDeezerTrack);
  } catch (error) {
    console.error('Error fetching trending tracks:', error);
    return [];
  }
}

export async function fetchPopularArtists(limit: number = 50): Promise<Artist[]> {
  try {
    const response = await fetch(`${API_BASE}/artists?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular artists');
    }
    
    const data = await response.json();
    
    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error('Unexpected API response:', data);
      return [];
    }
    
    return data.data.map(convertDeezerArtist);
  } catch (error) {
    console.error('Error fetching popular artists:', error);
    return [];
  }
}

export async function fetchNewReleases(limit: number = 20): Promise<Album[]> {
  try {
    const response = await fetch(`${API_BASE}/albums?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch new releases');
    }
    
    const data = await response.json();
    
    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error('Unexpected API response:', data);
      return [];
    }
    
    return data.data.map(convertDeezerAlbum);
  } catch (error) {
    console.error('Error fetching new releases:', error);
    return [];
  }
}

export async function searchTracks(query: string): Promise<Track[]> {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&limit=20`);
    
    if (!response.ok) {
      throw new Error('Search failed');
    }
    
    const data = await response.json();
    
    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error('Unexpected API response:', data);
      return [];
    }
    
    return data.data.map(convertDeezerTrack);
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
}