import { useState } from 'react';
import { Expand, Image as ImageIcon } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  aspectClass?: string;
  className?: string;
  onExpand?: () => void;
  expandLabel?: string;
  priority?: boolean;
}

export function EditorialImage({
  src,
  alt,
  aspectClass = 'aspect-video',
  className = '',
  onExpand,
  expandLabel = 'Expand photograph',
  priority = false,
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#EBE6DF] border border-stone-200 group ${aspectClass} ${className}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#EFECE6] to-[#E2DDD3] p-6 text-center text-stone-600"
        >
          <ImageIcon className="h-7 w-7 text-stone-500" aria-hidden="true" />
          <p className="max-w-sm text-xs font-medium leading-relaxed text-stone-600">{alt}</p>
        </div>
      )}

      {onExpand && !hasError && (
        <button
          type="button"
          onClick={onExpand}
          aria-label={expandLabel}
          className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md bg-stone-950/75 px-3 py-2 text-xs font-medium text-stone-50 backdrop-blur-sm transition-colors duration-150 hover:bg-stone-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-h-[40px]"
        >
          <Expand className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="whitespace-nowrap">Inspect Plate</span>
        </button>
      )}
    </div>
  );
}
