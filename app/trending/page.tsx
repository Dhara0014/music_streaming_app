"use client";

import SongCard from "@/components/SongCard";
import { Loader2, Music } from "lucide-react";
import Link from "next/link";
import { Track } from "@/types";
import { useTrendingTracks } from "@/lib/api/queries";

export default function TrendingPage() {
const { data: tracks, isLoading, isError } = useTrendingTracks();


  if (isLoading) return <div className="flex flex-col items-center justify-center py-50">
  <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
</div>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load tracks.</p>;

  return (
    <section className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Music className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            All Trending Tracks
          </h2>
        </div>

        <Link href="/" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {tracks?.map((track: Track, index: number) => (
          <SongCard key={track.id} track={track} allTracks={tracks} index={index} />
        ))}
      </div>
    </section>
  );
}
