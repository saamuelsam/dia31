import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { coupleData } from "../data/coupleData";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";

export function LoveLetter() {
  const animation = useIntersectionAnimation();
  const paragraphs = coupleData.letter.split("\n\n");

  return (
    <motion.section className="section-pad bg-[#120407]" {...animation}>
      <div className="mx-auto max-w-md">
        <div className="relative pt-12">
          <motion.div
            className="absolute inset-x-5 top-0 h-28 rounded-t-[1.5rem] bg-rose-200/16"
            initial={{ rotateX: 0 }}
            whileInView={{ rotateX: -24 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "bottom" }}
          />
          <motion.article
            className="relative rounded-[1.6rem] border border-rose-200/30 bg-[#fff7f1] p-6 text-[#42101a] shadow-glow"
            initial={{ opacity: 0, y: 46, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <div className="mb-5 flex items-center gap-3 text-[#8f2138]">
              <Mail size={24} />
              <h2 className="font-display text-3xl">{coupleData.letterTitle}</h2>
            </div>
            <div className="space-y-4 text-[0.98rem] leading-relaxed">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </motion.section>
  );
}
