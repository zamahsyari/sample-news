import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { GallerySlide } from '../types/news';

interface LightboxModalProps {
  slides: GallerySlide[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function LightboxModal({ slides, initialIndex, isOpen, onClose }: LightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoomed(false);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        setZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        setZoomed(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose, slides.length]);

  if (!isOpen || !slides.length) return null;

  const slide = slides[currentIndex] || slides[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox viewer: ${slide.title}`}
      className="fixed inset-0 z-50 flex flex-col bg-stone-950/95 text-stone-100 backdrop-blur-sm"
    >
      {/* Top Toolbar */}
      <div className="flex items-center justify-between border-b border-stone-800 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono font-semibold text-stone-300 tabular-nums">
            Plate {slide.plateNumber} of {String(slides.length).padStart(2, '0')}
          </span>
          <span aria-hidden="true" className="text-stone-600">
            ·
          </span>
          <span className="font-medium text-stone-200 truncate max-w-[200px] sm:max-w-none">
            {slide.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            aria-label={zoomed ? 'Reset zoom' : 'Zoom photograph'}
            className="inline-flex items-center gap-1.5 rounded border border-stone-700 px-3 py-1.5 text-xs font-medium text-stone-200 hover:bg-stone-800 min-h-[40px]"
          >
            {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
            <span className="hidden sm:inline">{zoomed ? 'Fit Frame' : 'Zoom 1.35×'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="inline-flex items-center justify-center rounded border border-stone-700 p-2 text-stone-200 hover:bg-stone-800 min-h-[40px] min-w-[40px]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden p-4 sm:p-8">
        {slides.length > 1 && (
          <button
            type="button"
            onClick={() => {
              setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
              setZoomed(false);
            }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-stone-900/80 border border-stone-700 text-stone-100 hover:bg-stone-800"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        <div className="max-h-full max-w-5xl overflow-hidden rounded">
          <img
            src={slide.src}
            alt={slide.alt}
            referrerPolicy="no-referrer"
            className={`max-h-[68vh] w-auto object-contain transition-transform duration-300 ease-out ${
              zoomed ? 'scale-[1.35] cursor-zoom-out' : 'scale-100 cursor-zoom-in'
            }`}
            onClick={() => setZoomed((z) => !z)}
          />
        </div>

        {slides.length > 1 && (
          <button
            type="button"
            onClick={() => {
              setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
              setZoomed(false);
            }}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-stone-900/80 border border-stone-700 text-stone-100 hover:bg-stone-800"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Bottom Caption Drawer */}
      <div className="border-t border-stone-800 bg-stone-950 px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-sm leading-relaxed text-stone-200 max-w-2xl">{slide.caption}</p>
          <p className="text-xs text-stone-400 shrink-0">
            {slide.location} · Photo: {slide.photographer}
          </p>
        </div>
      </div>
    </div>
  );
}
