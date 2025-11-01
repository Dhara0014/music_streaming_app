'use client';

import { Search, X, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchTracks } from '@/lib/api/queries';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setCurrentIndex, setCurrentTrack, setQueue } from '@/lib/redux/playerSlice';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { data: results, isLoading } = useSearchTracks(debouncedQuery);

  const handleSelectTrack = (track: any, index: number) => {
    if (results) {
      dispatch(setQueue(results));
      dispatch(setCurrentIndex(index));
      dispatch(setCurrentTrack(track));
    }
    setQuery('');
    setShowResults(false);
  };

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    setShowResults(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          placeholder="Search songs, artists, albums..."
          className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {showResults && query && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowResults(false)}
          />
          
          <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-20">
            {isLoading && (
              <div className="p-4 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Searching...</span>
              </div>
            )}

            {!isLoading && results && results.length > 0 && (
              <>
                {results.map((track:any, index:number) => (
                  <button
                    key={track.id}
                    onClick={() => handleSelectTrack(track, index)}
                    className="w-full p-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {track.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {track.artist} • {track.album}
                      </p>
                    </div>
                  </button>
                ))}
              </>
            )}

            {!isLoading && debouncedQuery && results && results.length === 0 && (
              <div className="p-4 text-center text-gray-600 dark:text-gray-400">
                No results found for "{debouncedQuery}"
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}