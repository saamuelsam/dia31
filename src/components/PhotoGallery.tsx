import { motion } from "framer-motion";
import { useState } from "react";
import { coupleData } from "../data/coupleData";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";
import { PhotoModal } from "./PhotoModal";

type PhotoGalleryProps = {
  onSecret: (message: string) => void;
};

export function PhotoGallery({ onSecret }: PhotoGalleryProps) {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const animation = useIntersectionAnimation();

  return (
    <motion.section id="galeria" className="section-pad" {...animation}>
      <div className="mx-auto max-w-md">
        <h2 className="section-title">{coupleData.galleryIntro.title}</h2>
        <p className="section-subtitle">{coupleData.galleryIntro.subtitle}</p>
        <div className="mt-7 grid grid-cols-2 gap-3">
          {coupleData.gallery.map((photo, index) => (
            <button
              key={photo.image}
              className={`group relative overflow-hidden rounded-[1.35rem] bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-rose-200 ${
                index === 0 || index === 3 ? "col-span-2 aspect-[16/11]" : "aspect-[4/5]"
              }`}
              onClick={() => setActivePhoto(index)}
            >
              <img
                src={photo.image}
                alt={photo.caption}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-12 text-left text-xs leading-snug text-white">
                {photo.caption}
              </span>
              {index === 2 && (
                <span
                  className="absolute right-2 top-2 size-6 rounded-full bg-rose-100/80"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSecret(coupleData.galleryIntro.secret);
                  }}
                  aria-label="Segredo da foto"
                />
              )}
            </button>
          ))}
        </div>
      </div>
      {activePhoto !== null && (
        <PhotoModal
          photos={coupleData.gallery}
          index={activePhoto}
          onChange={setActivePhoto}
          onClose={() => setActivePhoto(null)}
        />
      )}
    </motion.section>
  );
}
