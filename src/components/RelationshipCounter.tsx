import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { coupleData } from "../data/coupleData";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";
import { getTimeSince } from "../utils/dateUtils";

export function RelationshipCounter() {
  const [time, setTime] = useState(() => getTimeSince(coupleData.storyStartDate));
  const animation = useIntersectionAnimation();

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getTimeSince(coupleData.storyStartDate)), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const values = [
    [coupleData.counter.years, time.years],
    [coupleData.counter.months, time.months],
    [coupleData.counter.days, time.days],
    [coupleData.counter.hours, time.hours]
  ] as const;

  return (
    <motion.section className="section-pad" {...animation}>
      <div className="mx-auto max-w-md rounded-[1.5rem] border border-rose-100/15 bg-[#20070d]/70 p-5 text-center shadow-glow">
        <h2 className="font-display text-3xl leading-tight text-rose-50">{coupleData.counter.title}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {values.map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white/[0.065] p-4">
              <strong className="block text-3xl text-rose-100">{value}</strong>
              <span className="text-xs uppercase tracking-[0.16em] text-rose-100/60">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
