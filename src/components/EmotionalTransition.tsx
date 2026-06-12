import { motion } from "framer-motion";
import { coupleData } from "../data/coupleData";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";

export function EmotionalTransition() {
  const animation = useIntersectionAnimation();

  return (
    <section className="relative overflow-hidden bg-[#120407] px-5 py-24">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#3a0814] to-transparent" />
      <motion.div className="relative mx-auto max-w-md text-center" {...animation}>
        <h2 className="font-display text-4xl leading-tight text-rose-50">{coupleData.emotional.title}</h2>
        <div className="mt-8 space-y-6">
          {coupleData.emotional.paragraphs.map((paragraph, index) => (
            <motion.p
              key={paragraph}
              className="text-base leading-relaxed text-rose-50/78"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.08 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
