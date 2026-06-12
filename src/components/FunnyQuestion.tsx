import { motion } from "framer-motion";
import { Smile } from "lucide-react";
import { useState } from "react";
import { coupleData } from "../data/coupleData";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";

type FunnyQuestionProps = {
  onContinue: () => void;
};

const positions = [
  "translate-x-0",
  "-translate-x-8 translate-y-4",
  "translate-x-7 -translate-y-3",
  "translate-x-1 translate-y-0"
];

export function FunnyQuestion({ onContinue }: FunnyQuestionProps) {
  const [attempts, setAttempts] = useState(0);
  const animation = useIntersectionAnimation();
  const canContinue = attempts >= 3;

  function handleNoClick() {
    if (canContinue) {
      onContinue();
      return;
    }
    setAttempts((current) => current + 1);
  }

  return (
    <motion.section id="surpresa" className="section-pad" {...animation}>
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-rose-100/12 text-rose-100">
          <Smile size={24} />
        </div>
        <p className="text-sm uppercase tracking-[0.22em] text-rose-200/70">
          {coupleData.funnyQuestion.intro}
        </p>
        <h2 className="mt-4 font-display text-3xl leading-tight text-rose-50">
          {coupleData.funnyQuestion.question}
        </h2>
        <div className="mt-8 grid gap-3">
          <button className="primary-button" onClick={onContinue}>
            {coupleData.funnyQuestion.yes}
          </button>
          <button
            className={`secondary-button transition-transform duration-300 ${positions[Math.min(attempts, 3)]}`}
            onClick={handleNoClick}
          >
            {canContinue ? coupleData.funnyQuestion.finalNo : coupleData.funnyQuestion.no}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
