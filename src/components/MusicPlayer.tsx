import { Music, Pause, Play, RotateCcw } from "lucide-react";
import { coupleData } from "../data/coupleData";

type MusicPlayerProps = {
  isPlaying: boolean;
  audioError: boolean;
  volume: number;
  onToggle: () => void;
  onRestart: () => void;
  onVolume: (volume: number) => void;
};

export function MusicPlayer({ isPlaying, audioError, volume, onToggle, onRestart, onVolume }: MusicPlayerProps) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-md rounded-2xl border border-white/10 bg-[#18060b]/88 p-3 text-rose-50 shadow-glow backdrop-blur">
      <div className="flex items-center gap-2">
        <Music size={18} className="shrink-0 text-rose-200" />
        <button className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 px-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-200" onClick={onToggle}>
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          {audioError ? "Música não encontrada" : isPlaying ? coupleData.musicLabels.pause : coupleData.musicLabels.play}
        </button>
        <button className="icon-button" onClick={onRestart} aria-label={coupleData.musicLabels.restart}>
          <RotateCcw size={17} />
        </button>
      </div>
      <label className="mt-2 flex items-center gap-3 text-xs text-rose-100/70">
        {coupleData.musicLabels.volume}
        <input
          className="accent-rose-200"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(event) => onVolume(Number(event.target.value))}
          aria-label={coupleData.musicLabels.volume}
        />
      </label>
    </div>
  );
}
