'use client';

import SongCard from '@/components/SongCard';
import ArtistCard from '@/components/ArtistCard';
import AlbumCard from '@/components/AlbumCard';
import { useTrendingTracks, usePopularArtists, useNewReleases } from '@/lib/api/queries';
import { Loader2, Music, Users, Disc } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { data: tracks, isLoading: tracksLoading, isError: tracksError } = useTrendingTracks();
  const { data: artists, isLoading: artistsLoading, isError: artistsError } = usePopularArtists();
  const { data: albums, isLoading: albumsLoading, isError: albumsError } = useNewReleases();

  const isLoading = tracksLoading || artistsLoading || albumsLoading;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Discover Your Favorite Music
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          Powered by music-stream
        </p>
      </section>

      {/* Global Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading music data with TanStack Query...
          </p>
        </div>
      )}

      {/* Trending Tracks Section */}
      {!tracksLoading && tracks && tracks.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Music className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Trending Now
              </h2>
            </div>
            <Link
                  href="/trending"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  Show all
                </Link>
          </div>

          {tracksError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <p className="text-red-600 dark:text-red-400 text-sm">
                Failed to load trending tracks
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tracks.slice(0, 5).map((track, index) => (
              <SongCard 
                key={track.id} 
                track={track} 
                allTracks={tracks}
                index={index}
              />
            ))}
          </div>
        </section>
      )}
      
      {/* Popular Artists Section */}
      {!artistsLoading && artists && artists.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Popular Artists
              </h2>
            </div>
            <Link href="/artists" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
              Show all
            </Link>
          </div>

          {artistsError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <p className="text-red-600 dark:text-red-400 text-sm">
                Failed to load popular artists
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {artists.slice(0,6).map((artist:any) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
      )}

      {/* New Releases Section */}
      {!albumsLoading && albums && albums.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Disc className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                New Releases
              </h2>
            </div>
             <Link href="/albums" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
              Show all
            </Link>
          </div>

          {albumsError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <p className="text-red-600 dark:text-red-400 text-sm">
                Failed to load new releases
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {albums.slice(0, 15).map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}

      {/* Stats Section */}
      {!isLoading && tracks && artists && albums && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
              <p className="text-4xl font-bold text-blue-600 mb-2">{tracks.length}</p>
              <p className="text-gray-600 dark:text-gray-400">Trending Tracks</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
              <p className="text-4xl font-bold text-blue-600 mb-2">
                {new Set(tracks.map(t => t.artist)).size}
              </p>
              <p className="text-gray-600 dark:text-gray-400">Unique Artists</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
              <p className="text-4xl font-bold text-blue-600 mb-2">{artists.length}</p>
              <p className="text-gray-600 dark:text-gray-400">Popular Artists</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
              <p className="text-4xl font-bold text-blue-600 mb-2">{albums.length}</p>
              <p className="text-gray-600 dark:text-gray-400">New Albums</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}