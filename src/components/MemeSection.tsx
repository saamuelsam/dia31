import { motion } from "framer-motion";
import { useState } from "react";
import { coupleData } from "../data/coupleData";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";
import { MemeVideoCard } from "./MemeVideoCard";

type MemeSectionProps = {
  registerVideo: (video: HTMLVideoElement | null) => () => void;
  onVideoPlay: (video: HTMLVideoElement) => void;
  onVideoEnded: () => void;
};

export function MemeSection({ registerVideo, onVideoPlay, onVideoEnded }: MemeSectionProps) {
  const animation = useIntersectionAnimation();
  const [showSurvived, setShowSurvived] = useState(false);

  return (
    <motion.section id="memes" className="section-pad" {...animation}>
      <div className="mx-auto max-w-md">
        <h2 className="section-title">{coupleData.memesIntro.title}</h2>
        <p className="section-subtitle">{coupleData.memesIntro.subtitle}</p>
        <div className="mt-7 flex snap-x gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]">
          {coupleData.memes.map((meme, index) => (
            <div className="w-[78vw] max-w-[320px] shrink-0" key={meme.video}>
              <MemeVideoCard
                meme={meme}
                index={index}
                registerVideo={registerVideo}
                onVideoPlay={onVideoPlay}
                onVideoEnded={() => {
                  onVideoEnded();
                  if (index === coupleData.memes.length - 1) {
                    setShowSurvived(true);
                    window.setTimeout(() => setShowSurvived(false), 3600);
                  }
                }}
              />
            </div>
          ))}
        </div>
        {showSurvived && (
          <motion.p
            className="mt-3 rounded-2xl bg-rose-100/12 px-4 py-3 text-center text-sm text-rose-50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {coupleData.memesIntro.survived}
          </motion.p>
        )}
        <p className="mt-8 text-center font-display text-2xl leading-tight text-rose-50">
          {coupleData.memesIntro.closing}
        </p>
      </div>
    </motion.section>
  );
}
