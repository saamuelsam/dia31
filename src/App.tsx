import { AnimatePresence } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { EmotionalTransition } from "./components/EmotionalTransition";
import { FinalSection } from "./components/FinalSection";
import { FunnyQuestion } from "./components/FunnyQuestion";
import { LoveLetter } from "./components/LoveLetter";
import { MemeSection } from "./components/MemeSection";
import { MusicPlayer } from "./components/MusicPlayer";
import { OpeningScreen } from "./components/OpeningScreen";
import { PhotoGallery } from "./components/PhotoGallery";
import { ReasonsSection } from "./components/ReasonsSection";
import { RelationshipCounter } from "./components/RelationshipCounter";
import { SecretMessage } from "./components/SecretMessage";
import { Timeline } from "./components/Timeline";
import { coupleData } from "./data/coupleData";
import { useAudioManager } from "./hooks/useAudioManager";

export default function App() {
  const [started, setStarted] = useState(false);
  const [secretMessage, setSecretMessage] = useState<string | null>(null);
  const [heartTaps, setHeartTaps] = useState(0);
  const [decorativePaused, setDecorativePaused] = useState(false);
  const audio = useAudioManager(coupleData.music);

  function showHeartSecret() {
    const next = heartTaps + 1;
    setHeartTaps(next);
    if (next >= 5) {
      setSecretMessage(coupleData.secrets.heart);
      setHeartTaps(0);
    }
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startExperience() {
    setStarted(true);
    window.setTimeout(() => scrollTo("surpresa"), 120);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#3a0814] pb-24 text-rose-50">
      <button
        className="fixed right-3 top-3 z-40 flex size-10 items-center justify-center rounded-full border border-white/10 bg-[#18060b]/75 text-rose-100 backdrop-blur focus:outline-none focus:ring-2 focus:ring-rose-200"
        onClick={() => setDecorativePaused((current) => !current)}
        aria-label={decorativePaused ? coupleData.motionLabels.play : coupleData.motionLabels.pause}
      >
        {decorativePaused ? <Play size={16} /> : <Pause size={16} />}
      </button>
      <OpeningScreen
        onStart={startExperience}
        decorativePaused={decorativePaused}
        onSecretHeart={showHeartSecret}
      />
      {started && (
        <>
          <FunnyQuestion onContinue={() => scrollTo("memes")} />
          <MemeSection
            registerVideo={audio.registerVideo}
            onVideoPlay={audio.handleVideoPlay}
            onVideoEnded={audio.handleVideoEnded}
          />
          <PhotoGallery onSecret={setSecretMessage} />
          <Timeline />
          <ReasonsSection />
          <RelationshipCounter />
          <EmotionalTransition />
          <LoveLetter />
          <FinalSection onBackToGallery={() => scrollTo("galeria")} onRestartMusic={audio.restartMusic} />
          <MusicPlayer
            isPlaying={audio.isMusicPlaying}
            audioError={audio.audioError}
            volume={audio.volume}
            onToggle={audio.toggleMusic}
            onRestart={audio.restartMusic}
            onVolume={audio.setVolume}
          />
        </>
      )}
      <AnimatePresence>
        <SecretMessage message={secretMessage} onClose={() => setSecretMessage(null)} />
      </AnimatePresence>
    </main>
  );
}
