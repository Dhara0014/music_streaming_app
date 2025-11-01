'use client';

import { Play, Pause } from 'lucide-react';
import { Track } from '@/types';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setCurrentTrack, togglePlay, setQueue, setCurrentIndex } from '@/lib/redux/playerSlice';

interface SongCardProps {
  track: Track;
  allTracks: Track[];
  index: number;
}

export default function SongCard({ track, allTracks, index }: SongCardProps) {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  const isCurrentTrack = currentTrack?.id === track.id;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => {
    if (isCurrentTrack) {
      dispatch(togglePlay());
    } else {
      dispatch(setQueue(allTracks));
      dispatch(setCurrentIndex(index));
      dispatch(setCurrentTrack(track));
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={track.cover}
          alt={track.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handlePlay}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300"
            aria-label={isCurrentTrack && isPlaying ? 'Pause' : 'Play'}
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-0.5" />
            )}
          </button>
        </div>

        {isCurrentTrack && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            {isPlaying ? 'Playing' : 'Paused'}
          </div>
        )}
      </div>
      

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate mb-1">
          {track.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate mb-2">
          {track.artist}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <span className="truncate mr-2">{track.album}</span>
          <span className="whitespace-nowrap">{formatDuration(track.duration)}</span>
        </div>
      </div>
    </div>
  );
}