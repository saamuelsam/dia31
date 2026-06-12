import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import type { GalleryPhoto } from "../data/coupleData";

type PhotoModalProps = {
  photos: readonly GalleryPhoto[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function PhotoModal({ photos, index, onClose, onChange }: PhotoModalProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const photo = photos[index];

  function move(direction: number) {
    const next = (index + direction + photos.length) % photos.length;
    setZoomed(false);
    onChange(next);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#090305]/95 text-rose-50"
      role="dialog"
      aria-modal="true"
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const diff = event.changedTouches[0].clientX - touchStart;
        if (Math.abs(diff) > 50) move(diff > 0 ? -1 : 1);
        setTouchStart(null);
      }}
    >
      <div className="flex items-center justify-between p-4">
        <button className="icon-button" onClick={onClose} aria-label="Fechar foto">
          <X size={20} />
        </button>
        <span className="text-sm text-rose-100/70">
          {index + 1} / {photos.length}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center px-4">
        <button className="icon-button mr-2 shrink-0" onClick={() => move(-1)} aria-label="Foto anterior">
          <ChevronLeft size={20} />
        </button>
        <img
          src={photo.image}
          alt={photo.caption}
          className={`max-h-[72dvh] min-w-0 rounded-2xl object-contain transition-transform duration-300 ${
            zoomed ? "scale-125" : "scale-100"
          }`}
          onClick={() => setZoomed((current) => !current)}
        />
        <button className="icon-button ml-2 shrink-0" onClick={() => move(1)} aria-label="Próxima foto">
          <ChevronRight size={20} />
        </button>
      </div>
      <p className="px-6 pb-8 pt-4 text-center text-sm leading-relaxed text-rose-50/86">{photo.caption}</p>
    </div>
  );
}
