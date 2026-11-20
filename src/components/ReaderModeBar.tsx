import { ArrowLeft, Headphones, Image as ImageIcon, Minus, Pause, Plus } from 'lucide-react';

export type ReaderTheme = 'paper' | 'sepia' | 'night';
export type ReaderMeasure = 'narrow' | 'standard';

interface ReaderModeBarProps {
  theme: ReaderTheme;
  fontSizePx: number;
  measure: ReaderMeasure;
  showPlates: boolean;
  scrollProgress: number;
  isPlayingAudio: boolean;
  onChangeTheme: (theme: ReaderTheme) => void;
  onDecreaseFont: () => void;
  onIncreaseFont: () => void;
  onToggleMeasure: () => void;
  onTogglePlates: () => void;
  onToggleAudio: () => void;
  onExit: () => void;
}

export function ReaderModeBar({
  theme,
  fontSizePx,
  measure,
  showPlates,
  scrollProgress,
  isPlayingAudio,
  onChangeTheme,
  onDecreaseFont,
  onIncreaseFont,
  onToggleMeasure,
  onTogglePlates,
  onToggleAudio,
  onExit,
}: ReaderModeBarProps) {
  const isNight = theme === 'night';

  const barBg =
    theme === 'night'
      ? 'bg-[#161514]/95 border-stone-800 text-stone-200'
      : theme === 'sepia'
      ? 'bg-[#F3EAD8]/95 border-[#DDD0B8] text-[#292018]'
      : 'bg-[#FBF9F5]/95 border-stone-200 text-stone-900';

  const subtleBtn = isNight
    ? 'border-stone-700 bg-stone-900 text-stone-200 hover:bg-stone-800'
    : theme === 'sepia'
    ? 'border-[#D5C6AB] bg-[#FAF4E8] text-[#292018] hover:bg-[#EAE0CB]'
    : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100';

  const activeSegment = isNight
    ? 'bg-stone-100 text-stone-950'
    : 'bg-[#1E3A8A] text-white';

  return (
    <header
      aria-label="Reader mode controls"
      className={`sticky top-0 z-40 border-b backdrop-blur-sm transition-colors duration-200 ${barBg}`}
    >
      <div className="mx-auto flex h-12 max-w-[1000px] items-center justify-between gap-3 px-4 sm:px-6">
        {/* Exit + Progress */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onExit}
            className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors min-h-[36px] ${subtleBtn}`}
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Exit Reader</span>
          </button>

          <span className="hidden sm:inline font-mono text-xs opacity-70 tabular-nums whitespace-nowrap">
            {scrollProgress}% read
          </span>
        </div>

        {/* Typography & Paper Controls */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {/* Paper Surface Theme */}
          <div
            role="group"
            aria-label="Reader paper tone"
            className={`inline-flex items-center gap-0.5 rounded border p-0.5 shrink-0 ${
              isNight
                ? 'border-stone-700 bg-stone-900'
                : theme === 'sepia'
                ? 'border-[#D5C6AB] bg-[#FAF4E8]'
                : 'border-stone-300 bg-[#F3EFE6]'
            }`}
          >
            {(
              [
                { id: 'paper', label: 'Paper' },
                { id: 'sepia', label: 'Sepia' },
                { id: 'night', label: 'Night' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChangeTheme(opt.id)}
                aria-pressed={theme === opt.id}
                className={`rounded px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors min-h-[28px] ${
                  theme === opt.id
                    ? activeSegment
                    : isNight
                    ? 'text-stone-300 hover:text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Font Size Stepper */}
          <div
            role="group"
            aria-label="Reader font size"
            className={`inline-flex items-center rounded border shrink-0 ${
              isNight
                ? 'border-stone-700 bg-stone-900'
                : theme === 'sepia'
                ? 'border-[#D5C6AB] bg-[#FAF4E8]'
                : 'border-stone-300 bg-white'
            }`}
          >
            <button
              type="button"
              onClick={onDecreaseFont}
              disabled={fontSizePx <= 15}
              aria-label="Decrease text size"
              className="px-2 py-1.5 disabled:opacity-35 min-h-[34px]"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="px-1.5 font-mono text-[11px] font-medium tabular-nums select-none">
              {fontSizePx}px
            </span>
            <button
              type="button"
              onClick={onIncreaseFont}
              disabled={fontSizePx >= 21}
              aria-label="Increase text size"
              className="px-2 py-1.5 disabled:opacity-35 min-h-[34px]"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Measure Width Toggle */}
          <button
            type="button"
            onClick={onToggleMeasure}
            aria-pressed={measure === 'narrow'}
            className={`hidden md:inline-flex items-center rounded border px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 min-h-[36px] ${subtleBtn}`}
          >
            {measure === 'narrow' ? 'Width: Focused' : 'Width: Standard'}
          </button>

          {/* Show / Hide Plates */}
          <button
            type="button"
            onClick={onTogglePlates}
            aria-pressed={showPlates}
            aria-label={showPlates ? 'Hide photographs in reader mode' : 'Show photographs in reader mode'}
            className={`hidden sm:inline-flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 min-h-[36px] ${
              showPlates ? subtleBtn : activeSegment
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{showPlates ? 'Plates: On' : 'Text Only'}</span>
          </button>

          {/* Audio Listen */}
          <button
            type="button"
            onClick={onToggleAudio}
            aria-pressed={isPlayingAudio}
            aria-label={isPlayingAudio ? 'Pause narration' : 'Listen to article'}
            className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 min-h-[36px] ${
              isPlayingAudio ? activeSegment : subtleBtn
            }`}
          >
            {isPlayingAudio ? (
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Headphones className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{isPlayingAudio ? 'Pause' : 'Listen'}</span>
          </button>
        </div>
      </div>

      {/* Reading progress hairline */}
      <div
        aria-hidden="true"
        className={`h-[2px] w-full overflow-hidden ${
          isNight ? 'bg-stone-800' : 'bg-stone-300/60'
        }`}
      >
        <div
          className={`h-full w-full origin-left transition-transform duration-100 ease-out ${
            isNight ? 'bg-sky-300' : 'bg-[#1E3A8A]'
          }`}
          style={{ transform: `scaleX(${Math.min(1, Math.max(0, scrollProgress / 100))})` }}
        />
      </div>
    </header>
  );
}
