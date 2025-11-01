'use client';

import { Artist } from '@/types';
import { Users } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const formatFans = (fans: number) => {
    if (fans >= 1000000) {
      return `${(fans / 1000000).toFixed(1)}M`;
    } else if (fans >= 1000) {
      return `${(fans / 1000).toFixed(1)}K`;
    }
    return fans.toString();
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
      {/* Artist Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={artist.picture}
          alt={artist.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Artist Info */}
      <div className="p-4 text-center">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate mb-2">
          {artist.name}
        </h3>
        <div className="flex items-center justify-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span>{formatFans(artist.nb_fan)} fans</span>
        </div>
      </div>
    </div>
  );
}