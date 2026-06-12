import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { coupleData } from "../data/coupleData";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";

type FinalSectionProps = {
  onBackToGallery: () => void;
  onRestartMusic: () => void;
};

export function FinalSection({ onBackToGallery, onRestartMusic }: FinalSectionProps) {
  const animation = useIntersectionAnimation();

  return (
    <motion.section className="relative flex min-h-[100dvh] items-end overflow-hidden px-5 py-10 pb-32" {...animation}>
      <img
        src={coupleData.finalSection.image}
        alt="Foto especial do casal"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090305] via-[#090305]/70 to-[#090305]/18" />
      <div className="relative mx-auto w-full max-w-md text-center">
        <p className="font-display text-3xl leading-tight text-rose-50">{coupleData.finalSection.first}</p>
        <motion.p
          className="mt-5 text-lg leading-relaxed text-rose-50/88"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        >
          {coupleData.finalSection.second}
        </motion.p>
        <motion.p
          className="mt-5 text-base leading-relaxed text-rose-50/80"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.16 }}
        >
          {coupleData.finalSection.thanks}
        </motion.p>
        <motion.h2
          className="mt-8 font-display text-4xl leading-tight text-white"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.22 }}
        >
          {coupleData.finalSection.title.replace("NOME DELA", coupleData.herName)}
        </motion.h2>
        <motion.p
          className="mt-5 whitespace-pre-line text-rose-50/86"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.28 }}
        >
          {coupleData.finalSection.signature
            .replace("NOME DELA", coupleData.herName)
            .replace("MEU NOME", coupleData.myName)}
        </motion.p>
        <div className="mt-8 grid gap-3">
          <button className="primary-button" onClick={onBackToGallery}>
            {coupleData.finalSection.backButton}
          </button>
          <button className="secondary-button flex items-center justify-center gap-2" onClick={onRestartMusic}>
            <RotateCcw size={17} />
            {coupleData.musicLabels.restart}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
