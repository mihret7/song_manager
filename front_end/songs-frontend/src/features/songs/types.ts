// src/features/songs/types.ts

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

// Use interface instead of type for better runtime compatibility
export interface CreateSongDto {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface UpdateSongDto {
  id: string;
  changes: CreateSongDto;
}

export interface StatsSummary {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
}

export interface SongsState {
  items: Song[];
  loading: boolean;
  error?: string;
  stats?: StatsSummary;
}
