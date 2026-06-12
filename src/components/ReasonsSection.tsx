import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { coupleData } from "../data/coupleData";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";

export function ReasonsSection() {
  const [openCards, setOpenCards] = useState<Set<number>>(new Set());
  const animation = useIntersectionAnimation();

  function toggle(index: number) {
    setOpenCards((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <motion.section className="section-pad" {...animation}>
      <div className="mx-auto max-w-md">
        <h2 className="section-title">{coupleData.reasonsIntro.title}</h2>
        <div className="mt-7 grid gap-3">
          {coupleData.reasons.map((reason, index) => {
            const isOpen = openCards.has(index);
            const isLast = index === coupleData.reasons.length - 1;
            return (
              <button
                key={reason}
                className={`rounded-[1.25rem] border p-4 text-left transition ${
                  isLast
                    ? "border-rose-200/40 bg-rose-100/15"
                    : "border-white/10 bg-white/[0.055]"
                } focus:outline-none focus:ring-2 focus:ring-rose-200`}
                onClick={() => toggle(index)}
              >
                <span className="flex items-center gap-3 text-rose-50">
                  {isLast ? <Sparkles size={18} /> : <Heart size={18} />}
                  <span className="text-sm text-rose-100/70">{coupleData.reasonsIntro.revealLabel}</span>
                </span>
                <motion.p
                  className="overflow-hidden font-display text-2xl leading-tight text-rose-50"
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0, marginTop: isOpen ? 12 : 0 }}
                >
                  {reason}
                </motion.p>
              </button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
