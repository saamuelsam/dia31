import { motion } from "framer-motion";
import { CalendarHeart } from "lucide-react";
import { coupleData } from "../data/coupleData";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";

export function Timeline() {
  const animation = useIntersectionAnimation();

  return (
    <motion.section className="section-pad" {...animation}>
      <div className="mx-auto max-w-md">
        <h2 className="section-title">{coupleData.timelineIntro.title}</h2>
        <div className="mt-8 space-y-5 border-l border-rose-100/18 pl-5">
          {coupleData.timeline.map((item, index) => (
            <motion.article
              key={item.title}
              className="relative rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.04 }}
            >
              <span className="absolute -left-[2.05rem] top-5 grid size-9 place-items-center rounded-full bg-rose-100 text-[#3a0814]">
                <CalendarHeart size={17} />
              </span>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="mb-4 aspect-[16/10] w-full rounded-2xl object-cover"
              />
              {item.date && <p className="text-xs uppercase tracking-[0.18em] text-rose-200/70">{item.date}</p>}
              <h3 className="mt-1 font-display text-2xl text-rose-50">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-rose-50/76">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
