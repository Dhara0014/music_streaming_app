export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  audioUrl: string;
}

export interface Artist {
  id: number;
  name: string;
  picture: string;
  nb_fan: number;
}

export interface Album {
  id: number;
  title: string;
  cover: string;
  artist: string;
  release_date: string;
}

export interface DeezerTrack {
  id: number;
  title: string;
  duration: number;
  preview: string;
  artist: {
    id: number;
    name: string;
    picture_medium: string;
  };
  album: {
    id: number;
    title: string;
    cover_medium: string;
  };
}

export interface DeezerArtist {
  id: number;
  name: string;
  picture_medium: string;
  nb_fan: number;
}

export interface DeezerAlbum {
  id: number;
  title: string;
  cover_medium: string;
  release_date: string;
  artist: {
    name: string;
  };
}