import { motion } from "framer-motion";
import { X } from "lucide-react";
import { coupleData } from "../data/coupleData";

type SecretMessageProps = {
  message: string | null;
  onClose: () => void;
};

export function SecretMessage({ message, onClose }: SecretMessageProps) {
  if (!message) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-5 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="w-full max-w-sm rounded-[1.6rem] border border-rose-200/20 bg-[#2a0710] p-6 text-center shadow-glow"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <button
          className="ml-auto flex size-10 items-center justify-center rounded-full bg-white/10 text-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-200"
          onClick={onClose}
          aria-label={coupleData.secrets.close}
        >
          <X size={18} />
        </button>
        <p className="mt-3 text-lg leading-relaxed text-rose-50">{message}</p>
      </motion.div>
    </motion.div>
  );
}
