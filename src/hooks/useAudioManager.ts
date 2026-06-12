import { useCallback, useRef, useState } from "react";

type VideoRef = HTMLVideoElement | null;

export function useAudioManager(musicSrc: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRefs = useRef(new Set<HTMLVideoElement>());
  const shouldResumeMusic = useRef(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [volume, setVolumeState] = useState(0.7);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(musicSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      audioRef.current.addEventListener("error", () => {
        setIsMusicPlaying(false);
        setAudioError(true);
      });
      audioRef.current.addEventListener("canplay", () => {
        setAudioError(false);
      });
    }
    return audioRef.current;
  }, [musicSrc, volume]);

  const playMusic = useCallback(async () => {
    const audio = ensureAudio();
    try {
      await audio.play();
      setAudioError(false);
      setIsMusicPlaying(true);
    } catch {
      setIsMusicPlaying(false);
      setAudioError(true);
    }
  }, [ensureAudio]);

  const pauseMusic = useCallback(() => {
    const audio = ensureAudio();
    audio.pause();
    setIsMusicPlaying(false);
  }, [ensureAudio]);

  const toggleMusic = useCallback(async () => {
    if (isMusicPlaying) {
      pauseMusic();
      return;
    }
    await playMusic();
  }, [isMusicPlaying, pauseMusic, playMusic]);

  const restartMusic = useCallback(async () => {
    const audio = ensureAudio();
    audio.currentTime = 0;
    try {
      await audio.play();
      setAudioError(false);
      setIsMusicPlaying(true);
    } catch {
      setIsMusicPlaying(false);
      setAudioError(true);
    }
  }, [ensureAudio]);

  const setVolume = useCallback(
    (nextVolume: number) => {
      setVolumeState(nextVolume);
      ensureAudio().volume = nextVolume;
    },
    [ensureAudio]
  );

  const registerVideo = useCallback((video: VideoRef) => {
    if (!video) return () => undefined;
    videoRefs.current.add(video);
    return () => {
      videoRefs.current.delete(video);
    };
  }, []);

  const handleVideoPlay = useCallback(
    (activeVideo: HTMLVideoElement) => {
      videoRefs.current.forEach((video) => {
        if (video !== activeVideo) video.pause();
      });

      const audio = ensureAudio();
      shouldResumeMusic.current = !audio.paused;
      if (!audio.paused) {
        audio.pause();
        setIsMusicPlaying(false);
      }
    },
    [ensureAudio]
  );

  const handleVideoEnded = useCallback(async () => {
    if (shouldResumeMusic.current) {
      shouldResumeMusic.current = false;
      await playMusic();
    }
  }, [playMusic]);

  return {
    isMusicPlaying,
    audioError,
    volume,
    toggleMusic,
    restartMusic,
    setVolume,
    registerVideo,
    handleVideoPlay,
    handleVideoEnded
  };
}
