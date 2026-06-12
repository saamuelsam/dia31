import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { coupleData } from "../data/coupleData";

type OpeningScreenProps = {
  onStart: () => void;
  decorativePaused: boolean;
  onSecretHeart: () => void;
};

export function OpeningScreen({ onStart, decorativePaused, onSecretHeart }: OpeningScreenProps) {
  return (
    <section className="relative grid min-h-[100dvh] place-items-center overflow-hidden px-5 py-12 text-center">
      {!decorativePaused && (
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <motion.div
            className="absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-rose-500/20 blur-3xl"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-16 right-8 h-32 w-32 rounded-full bg-pink-200/10 blur-2xl"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5.5, repeat: Infinity }}
          />
        </div>
      )}

      <div className="relative z-10 max-w-sm">
        <button
          onClick={onSecretHeart}
          className="mx-auto mb-8 flex size-12 items-center justify-center rounded-full border border-rose-200/25 bg-white/[0.08] text-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-200"
          aria-label="Coração secreto"
        >
          <Heart fill="currentColor" size={22} />
        </button>
        <motion.h1
          className="font-display text-4xl leading-tight text-rose-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {coupleData.opening.title}
        </motion.h1>
        <motion.p
          className="mt-5 text-lg leading-relaxed text-rose-100/[0.84]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {coupleData.opening.subtitle}
        </motion.p>
        <motion.button
          className="mt-10 w-full rounded-2xl bg-rose-100 px-6 py-4 text-base font-bold text-[#3a0814] shadow-glow focus:outline-none focus:ring-4 focus:ring-rose-200/60"
          onClick={onStart}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
        >
          {coupleData.opening.button}
        </motion.button>
      </div>
    </section>
  );
}
