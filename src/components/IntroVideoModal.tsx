import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useRef, useState } from "react";
import { coupleData } from "../data/coupleData";

type IntroVideoModalProps = {
  onClose: () => void;
};

export function IntroVideoModal({ onClose }: IntroVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  async function playVideo() {
    const video = videoRef.current;
    if (!video) return;
    setHasPlayed(true);
    await video.play();
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/72 px-4 py-6 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={coupleData.introVideo.title}
    >
      <motion.div
        className="relative w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-rose-100/20 bg-[#16050a] shadow-glow"
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <button
          className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-black/55 text-rose-50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-rose-200"
          onClick={onClose}
          aria-label={coupleData.introVideo.skip}
        >
          <X size={18} />
        </button>

        <div className="relative bg-black">
          <video
            ref={videoRef}
            className="max-h-[70dvh] w-full object-contain"
            src={coupleData.introVideo.video}
            preload="metadata"
            playsInline
            controls={hasPlayed}
            onEnded={onClose}
          />
          {!hasPlayed && (
            <button
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/34 px-6 text-center text-rose-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-200"
              onClick={playVideo}
              aria-label={coupleData.introVideo.play}
            >
              <span className="grid size-16 place-items-center rounded-full bg-rose-100 text-[#3a0814] shadow-glow">
                <Play fill="currentColor" size={28} />
              </span>
              <span className="font-display text-3xl leading-tight">{coupleData.introVideo.title}</span>
              <span className="text-sm text-rose-50/78">{coupleData.introVideo.subtitle}</span>
            </button>
          )}
        </div>

        <div className="grid gap-3 p-4">
          <button className="primary-button" onClick={hasPlayed ? onClose : playVideo}>
            {hasPlayed ? coupleData.introVideo.continue : coupleData.introVideo.play}
          </button>
          <button className="secondary-button" onClick={onClose}>
            {coupleData.introVideo.skip}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
