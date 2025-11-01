'use client';

import ArtistCard from '@/components/ArtistCard';
import { usePopularArtists } from '@/lib/api/queries';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ArtistsPage() {
  const { data: artists = [], isLoading, isError } = usePopularArtists();

  if (isLoading) return <div className="flex flex-col items-center justify-center py-50">
  <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
</div>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load artists.</p>;

  return (
    <section className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Popular Artists</h2>
        <Link href="/" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </section>
  );
}
