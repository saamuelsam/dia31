import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Meme } from "../data/coupleData";

type MemeVideoCardProps = {
  meme: Meme;
  index: number;
  registerVideo: (video: HTMLVideoElement | null) => () => void;
  onVideoPlay: (video: HTMLVideoElement) => void;
  onVideoEnded: () => void;
};

export function MemeVideoCard({
  meme,
  index,
  registerVideo,
  onVideoPlay,
  onVideoEnded
}: MemeVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return registerVideo(videoRef.current);
  }, [registerVideo]);

  async function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      await video.play();
    } else {
      video.pause();
    }
  }

  return (
    <article className="snap-center overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.06] shadow-glow">
      <div className="relative aspect-[9/16] bg-[#17050a]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          preload="metadata"
          poster={meme.poster}
          playsInline
          muted={muted}
          onPlay={(event) => {
            setPlaying(true);
            onVideoPlay(event.currentTarget);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            onVideoEnded();
          }}
          onTimeUpdate={(event) => {
            const video = event.currentTarget;
            setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
          }}
        >
          <source src={meme.video} />
        </video>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/82 to-transparent p-4">
          <div className="h-1 overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-rose-200" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              className="icon-button"
              onClick={togglePlay}
              aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
            >
              {playing ? <Pause size={19} /> : <Play size={19} />}
            </button>
            <button
              className="icon-button"
              onClick={() => setMuted((current) => !current)}
              aria-label={muted ? "Ativar som do vídeo" : "Silenciar vídeo"}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>
      </div>
      <p className="p-4 text-sm leading-relaxed text-rose-50/88">
        <span className="mr-2 text-rose-200">#{index + 1}</span>
        {meme.caption}
      </p>
    </article>
  );
}
