import { useState } from 'react';
import { ChevronLeft, ChevronRight, Grid2X2, Images, Expand } from 'lucide-react';
import { GallerySlide } from '../types/news';
import { EditorialImage } from './EditorialImage';

interface PhotoGalleryProps {
  slides: GallerySlide[];
  onOpenLightbox: (index: number) => void;
}

export function PhotoGallery({ slides, onOpenLightbox }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  if (!slides.length) return null;

  const safeIndex = activeIndex >= slides.length ? 0 : activeIndex;
  const activeSlide = slides[safeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="photo-essay"
      aria-label="Field photography gallery"
      className="my-10 border-y border-stone-200 bg-[#F3EFE6]/65 px-4 py-6 sm:px-6 sm:py-8 rounded-lg"
    >
      {/* Gallery Header & View Mode Segmented Switch */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wider text-[#9A3412]">
            Photo Essay · {slides.length} Documentary Plates
          </p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-stone-900">
            Four Cities Redesigning the Waterline
          </h3>
        </div>

        <div
          role="group"
          aria-label="Gallery view mode"
          className="inline-flex items-center gap-1 rounded-md border border-stone-200 bg-[#FBF9F5] p-1"
        >
          <button
            type="button"
            onClick={() => setViewMode('carousel')}
            aria-pressed={viewMode === 'carousel'}
            className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors min-h-[36px] ${
              viewMode === 'carousel'
                ? 'bg-[#1E3A8A] text-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Images className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Carousel</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
            className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors min-h-[36px] ${
              viewMode === 'grid'
                ? 'bg-[#1E3A8A] text-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Grid2X2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Contact Sheet</span>
          </button>
        </div>
      </div>

      {viewMode === 'carousel' ? (
        <div>
          {/* Primary Stage */}
          <div className="relative">
            <EditorialImage
              src={activeSlide.src}
              alt={activeSlide.alt}
              aspectClass="aspect-video"
              className="rounded-md"
              onExpand={() => onOpenLightbox(safeIndex)}
              expandLabel={`Inspect plate ${activeSlide.plateNumber} in full screen`}
            />

            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous plate"
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-950/75 text-white backdrop-blur-sm transition-colors hover:bg-stone-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next plate"
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-950/75 text-white backdrop-blur-sm transition-colors hover:bg-stone-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Caption & Telemetry Row */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span className="font-mono font-semibold text-stone-900 tabular-nums">
                  Plate {activeSlide.plateNumber}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-stone-800">{activeSlide.title}</span>
                <span aria-hidden="true">·</span>
                <span>{activeSlide.location}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-700">
                {activeSlide.caption}
              </p>
              <p className="mt-1 text-xs text-stone-500">
                Photograph by {activeSlide.photographer}
              </p>
            </div>

            <div className="font-mono text-xs font-medium text-stone-600 tabular-nums shrink-0 pt-0.5">
              {String(safeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {slides.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-2.5">
              {slides.map((slide, idx) => {
                const isSelected = idx === safeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Select plate ${slide.plateNumber}: ${slide.title}`}
                    aria-current={isSelected ? 'true' : 'false'}
                    className={`group relative overflow-hidden rounded border text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                      isSelected
                        ? 'border-[#1E3A8A] ring-1 ring-[#1E3A8A]'
                        : 'border-stone-300 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-video w-full bg-stone-200 overflow-hidden">
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="bg-[#FBF9F5] px-2 py-1.5">
                      <span className="block font-mono text-[11px] font-medium text-stone-600 tabular-nums truncate">
                        {slide.plateNumber} · {slide.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Contact Sheet Grid View */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="group flex flex-col justify-between rounded-md border border-stone-200 bg-[#FBF9F5] p-3"
            >
              <div>
                <div className="relative overflow-hidden rounded aspect-video bg-stone-200">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(idx)}
                    aria-label={`Open ${slide.title} in lightbox`}
                    className="absolute right-2 bottom-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-stone-950/75 text-white hover:bg-stone-950 focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <Expand className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2.5 flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-mono font-semibold text-stone-900 tabular-nums">
                    Plate {slide.plateNumber}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate">{slide.location}</span>
                </div>
                <h4 className="mt-1 font-serif text-base font-semibold text-stone-900">
                  {slide.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">
                  {slide.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  setViewMode('carousel');
                }}
                className="mt-3 self-start text-xs font-semibold text-[#1E3A8A] hover:underline focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
              >
                Focus in Carousel →
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
