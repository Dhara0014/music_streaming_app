import { useQuery } from '@tanstack/react-query';
import { fetchNewReleases, fetchPopularArtists, fetchTrendingTracks, searchTracks } from './deezer';

export function useTrendingTracks() {
  return useQuery({
    queryKey: ['trending-tracks'],
    queryFn: () => fetchTrendingTracks(50),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
  });
}

export function usePopularArtists() {
  return useQuery({
    queryKey: ['popular-artists'],
    queryFn: () => fetchPopularArtists(50),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
  });
}

export function useNewReleases() {
  return useQuery({
    queryKey: ['new-releases'],
    queryFn: () => fetchNewReleases(50),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
  });
}

export function useSearchTracks(query: string) {
  return useQuery({ 
    queryKey: ['search-tracks', query],
    queryFn: () => searchTracks(query),
    enabled: query.length > 0,
    staleTime: 1 * 60 * 1000, 
    retry: 1,
  });
}