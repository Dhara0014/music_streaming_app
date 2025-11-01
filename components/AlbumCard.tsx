'use client';

import { Album } from '@/types';
import { Calendar } from 'lucide-react';

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
      {/* Album Cover */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={album.cover}
          alt={album.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Album Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate mb-1">
          {album.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate mb-2">
          {album.artist}
        </p>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(album.release_date)}</span>
        </div>
      </div>
    </div>
  );
}