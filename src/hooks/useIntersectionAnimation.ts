import { type MotionProps, useReducedMotion } from "framer-motion";

export function useIntersectionAnimation(delay = 0): MotionProps {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return {
      initial: false,
      whileInView: undefined,
      viewport: undefined,
      transition: undefined
    };
  }

  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.65, ease: "easeOut", delay }
  };
}
