'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  setCurrentTime,
  setDuration,
  setIsPlaying,
  playNext,
} from '@/lib/redux/playerSlice';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying, volume } = useAppSelector((state) => state.player);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (audioRef.current) return;

    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      dispatch(setCurrentTime(audio.currentTime));
    };
    const handleLoadedMetadata = () => {
      dispatch(setDuration(audio.duration));
    };
    const handleEnded = () => {
      dispatch(setIsPlaying(false));
      dispatch(playNext());
    };
    const handleError = () => {
      console.error('Audio playback error');
      dispatch(setIsPlaying(false));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentTrack) {
      audio.pause();
      return;
    }

    audio.src = currentTrack.audioUrl;
    audio.load();

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name === 'AbortError') {
            console.warn('Playback aborted (race condition):', error);
          } else {
            console.error('Playback failed:', error);
            dispatch(setIsPlaying(false));
          }
        });
      }
    }
  }, [currentTrack, isPlaying, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name === 'AbortError') {
            console.warn('Playback aborted (race condition):', error);
          } else {
            console.error('Playback failed:', error);
            dispatch(setIsPlaying(false));
          }
        });
      }
    } else {
        audio.pause();
    }
  }, [isPlaying, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    dispatch(setCurrentTime(time));
  };

  return { seek };
}
