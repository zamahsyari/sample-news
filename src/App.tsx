import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  Check,
  Headphones,
  Pause,
  Play,
  Share2,
  Type,
} from 'lucide-react';
import { ARTICLES, LEAD_ARTICLE_ID, SECTION_FEATURE_MAP } from './data/articles';
import { GallerySlide, SectionSlug } from './types/news';
import { TopNav } from './components/TopNav';
import { EditorialImage } from './components/EditorialImage';
import { PhotoGallery } from './components/PhotoGallery';
import { LightboxModal } from './components/LightboxModal';
import { InteractivePoll } from './components/InteractivePoll';
import { InfrastructureTable } from './components/InfrastructureTable';
import { MarginRail } from './components/MarginRail';
import { CommentsSection } from './components/CommentsSection';
import { RelatedArticles } from './components/RelatedArticles';
import { SubscribeModal } from './components/SubscribeModal';
import { ReaderMeasure, ReaderModeBar, ReaderTheme } from './components/ReaderModeBar';

interface ReaderPrefs {
  theme: ReaderTheme;
  fontSizePx: number;
  measure: ReaderMeasure;
  showPlates: boolean;
}

const DEFAULT_READER_PREFS: ReaderPrefs = {
  theme: 'paper',
  fontSizePx: 18,
  measure: 'standard',
  showPlates: true,
};

function toIsoDate(humanDate: string): string {
  const parsed = Date.parse(humanDate);
  if (Number.isNaN(parsed)) return '2026-11-20';
  return new Date(parsed).toISOString().split('T')[0];
}

export default function App() {
  const [activeArticleId, setActiveArticleId] = useState<string>(LEAD_ARTICLE_ID);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState<string>('');
  const [fontSize, setFontSize] = useState<'standard' | 'large'>('standard');
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('meridian_saved_articles');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [pollVotes, setPollVotes] = useState<Record<string, string>>({});
  const [shareCopied, setShareCopied] = useState(false);
  const [showAuthorBio, setShowAuthorBio] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  // Built-in Reader Mode state + persisted preferences
  const [readerMode, setReaderMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('reader') === '1';
  });
  const [readerPrefs, setReaderPrefs] = useState<ReaderPrefs>(() => {
    try {
      const raw = localStorage.getItem('meridian_reader_prefs');
      if (raw) return { ...DEFAULT_READER_PREFS, ...JSON.parse(raw) };
    } catch {
      // Ignore storage errors
    }
    return DEFAULT_READER_PREFS;
  });

  // Lightbox state (supports both hero and photo essay slides)
  const [lightboxSlides, setLightboxSlides] = useState<GallerySlide[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Audio narration state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(0);
  const audioTimerRef = useRef<number | null>(null);

  const article = ARTICLES[activeArticleId] || ARTICLES[LEAD_ARTICLE_ID];
  const isSaved = savedIds.includes(article.id);
  const totalAudioDurationSec = article.readTimeMinutes * 60;
  const isoPublishedDate = toIsoDate(article.publishedAt);

  // Persist saved bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('meridian_saved_articles', JSON.stringify(savedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedIds]);

  // Persist reader preferences
  useEffect(() => {
    try {
      localStorage.setItem('meridian_reader_prefs', JSON.stringify(readerPrefs));
    } catch {
      // Ignore storage quota errors
    }
  }, [readerPrefs]);

  // Sync document metadata & JSON-LD NewsArticle schema for browser-native Reader Modes (Safari, Firefox, Chrome)
  useEffect(() => {
    document.title = `${article.title} — The Meridian`;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', article.deck);
    setMeta('meta[name="author"]', article.author.name);
    setMeta('meta[property="og:title"]', `${article.title} — The Meridian`);
    setMeta('meta[property="og:description"]', article.deck);
    setMeta('meta[property="article:published_time"]', `${isoPublishedDate}T08:00:00Z`);
    setMeta('meta[property="article:section"]', article.section);

    let ldScript = document.getElementById('news-article-jsonld') as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.id = 'news-article-jsonld';
      ldScript.type = 'application/ld+json';
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      description: article.deck,
      datePublished: `${isoPublishedDate}T08:00:00Z`,
      articleSection: article.section,
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Meridian',
      },
      image: [article.hero.src],
    });
  }, [article, isoPublishedDate]);

  // Keyboard shortcuts: 'r' toggles Reader Mode (outside text inputs), 'Escape' exits Reader Mode when no modal is open
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditable =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (isEditable) return;

      if (e.key === 'Escape' && readerMode && !lightboxOpen && !subscribeOpen) {
        setReaderMode(false);
      } else if (
        (e.key === 'r' || e.key === 'R') &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !lightboxOpen &&
        !subscribeOpen
      ) {
        e.preventDefault();
        setReaderMode((prev) => !prev);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [readerMode, lightboxOpen, subscribeOpen]);

  // Track reading progress & active chapter
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.round((scrollTop / maxScroll) * 100));
      } else {
        setScrollProgress(0);
      }

      let current = article.sections[0]?.id ?? '';
      for (const sec of article.sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            current = sec.id;
          }
        }
      }
      setActiveChapterId(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [article, readerMode]);

  // Stop audio narration when switching articles or unmounting
  useEffect(() => {
    return () => {
      if (audioTimerRef.current) window.clearInterval(audioTimerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeArticleId]);

  const stopAudio = () => {
    setIsPlayingAudio(false);
    if (audioTimerRef.current) {
      window.clearInterval(audioTimerRef.current);
      audioTimerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopAudio();
      return;
    }

    setIsPlayingAudio(true);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. ${article.deck}. ${article.leadParagraph}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.98;
      utterance.onend = () => stopAudio();
      window.speechSynthesis.speak(utterance);
    }

    audioTimerRef.current = window.setInterval(() => {
      setAudioSeconds((prev) => {
        if (prev + 1 >= totalAudioDurationSec) {
          stopAudio();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const formatAudioTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSelectArticle = (id: string) => {
    stopAudio();
    setAudioSeconds(0);
    setShowAuthorBio(false);
    setActiveArticleId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSection = (section: SectionSlug) => {
    const targetId = SECTION_FEATURE_MAP[section] || LEAD_ARTICLE_ID;
    handleSelectArticle(targetId);
  };

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch {
      // Fallback handled gracefully
    }
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 2200);
  };

  const handleOpenHeroLightbox = () => {
    const heroAsSlide: GallerySlide = {
      id: 'hero-plate',
      plateNumber: '01',
      src: article.hero.src,
      alt: article.hero.alt,
      title: article.title,
      caption: article.hero.caption,
      location: article.author.desk,
      photographer: article.hero.credit,
    };
    setLightboxSlides([heroAsSlide, ...article.gallery]);
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  const handleOpenGalleryLightbox = (index: number) => {
    setLightboxSlides(article.gallery);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const proseSizeClass = useMemo(
    () =>
      fontSize === 'large'
        ? 'text-[17px] sm:text-[18px] leading-[1.82]'
        : 'text-[15.5px] sm:text-[16.5px] leading-[1.76]',
    [fontSize]
  );

  // Reader Mode color & surface tokens (cleanly paired, zero CSS overrides)
  const isNightReader = readerMode && readerPrefs.theme === 'night';
  const isSepiaReader = readerMode && readerPrefs.theme === 'sepia';

  const pageSurfaceClass = readerMode
    ? isNightReader
      ? 'bg-[#161514] text-[#EAE6DF]'
      : isSepiaReader
      ? 'bg-[#F3EAD8] text-[#292018]'
      : 'bg-[#FBF9F5] text-[#1C1917]'
    : 'bg-[#FBF9F5] text-[#1C1917]';

  const kickerColorClass = isNightReader ? 'text-amber-300' : 'text-[#9A3412]';
  const deckColorClass = isNightReader
    ? 'text-stone-300'
    : isSepiaReader
    ? 'text-[#5C4D3C]'
    : 'text-[#57534E]';
  const mutedColorClass = isNightReader
    ? 'text-stone-400'
    : isSepiaReader
    ? 'text-[#736350]'
    : 'text-stone-500';
  const bodyColorClass = isNightReader
    ? 'text-[#E5E0D8]'
    : isSepiaReader
    ? 'text-[#2E241A]'
    : 'text-stone-800';
  const dividerBorderClass = isNightReader
    ? 'border-stone-800'
    : isSepiaReader
    ? 'border-[#DDD0B8]'
    : 'border-stone-200';
  const accentLinkClass = isNightReader ? 'text-sky-300' : 'text-[#1E3A8A]';

  return (
    <div id="top" className={`min-h-screen transition-colors duration-200 ${pageSurfaceClass}`}>
      {!readerMode ? (
        <TopNav
          activeSection={article.section}
          scrollProgress={scrollProgress}
          onSelectSection={handleSelectSection}
          onResetToLead={() => handleSelectArticle(LEAD_ARTICLE_ID)}
          onOpenSubscribe={() => setSubscribeOpen(true)}
        />
      ) : (
        <ReaderModeBar
          theme={readerPrefs.theme}
          fontSizePx={readerPrefs.fontSizePx}
          measure={readerPrefs.measure}
          showPlates={readerPrefs.showPlates}
          scrollProgress={scrollProgress}
          isPlayingAudio={isPlayingAudio}
          onChangeTheme={(theme) => setReaderPrefs((p) => ({ ...p, theme }))}
          onDecreaseFont={() =>
            setReaderPrefs((p) => ({
              ...p,
              fontSizePx: Math.max(15, p.fontSizePx - 1),
            }))
          }
          onIncreaseFont={() =>
            setReaderPrefs((p) => ({
              ...p,
              fontSizePx: Math.min(21, p.fontSizePx + 1),
            }))
          }
          onToggleMeasure={() =>
            setReaderPrefs((p) => ({
              ...p,
              measure: p.measure === 'narrow' ? 'standard' : 'narrow',
            }))
          }
          onTogglePlates={() =>
            setReaderPrefs((p) => ({ ...p, showPlates: !p.showPlates }))
          }
          onToggleAudio={toggleAudio}
          onExit={() => setReaderMode(false)}
        />
      )}

      <main
        className={
          readerMode
            ? `mx-auto px-4 pt-8 pb-20 sm:px-6 sm:pt-12 ${
                readerPrefs.measure === 'narrow' ? 'max-w-[62ch]' : 'max-w-[74ch]'
              }`
            : 'mx-auto max-w-[1200px] px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8'
        }
      >
        {/* Return Breadcrumb when viewing a secondary dispatch (Standard Edition view) */}
        {!readerMode && article.id !== LEAD_ARTICLE_ID && (
          <div className="mb-5">
            <button
              type="button"
              onClick={() => handleSelectArticle(LEAD_ARTICLE_ID)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:underline min-h-[36px]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Back to Lead Special Report</span>
            </button>
          </div>
        )}

        {/* Asymmetric Grid in Standard Mode; Single Centered Column in Reader Mode */}
        <div
          className={
            readerMode
              ? 'block'
              : 'grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_320px]'
          }
        >
          {/* Core Semantic <article> for Browser-Native Reader Mode (Safari / Firefox / Chrome) & In-Page Reader Mode */}
          <article
            itemScope
            itemType="https://schema.org/NewsArticle"
            className="min-w-0 lg:col-span-2"
          >
            {/* Article Masthead Header inside <article> so Readability extracts Headline + Byline + Date */}
            <header className={readerMode ? 'w-full' : 'max-w-4xl'}>
              <div className={`flex flex-wrap items-center gap-2 text-xs ${mutedColorClass}`}>
                <span itemProp="articleSection" className={`font-semibold tracking-wide ${kickerColorClass}`}>
                  {article.kicker}
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={isoPublishedDate} itemProp="datePublished">
                  {article.publishedAt}
                </time>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{article.readTimeMinutes} min read</span>
              </div>

              <h1
                itemProp="headline"
                className="mt-3 font-serif font-semibold tracking-tight leading-[1.1] text-balance"
                style={{ fontSize: 'clamp(2.1rem, 4.1vw, 3.45rem)' }}
              >
                {article.title}
              </h1>

              <p
                itemProp="description"
                className={`mt-4 max-w-3xl text-base sm:text-lg leading-relaxed ${deckColorClass}`}
              >
                {article.deck}
              </p>

              {/* Byline & Functional Reader Utility Strip */}
              <div
                className={`mt-6 flex flex-wrap items-center justify-between gap-4 border-y py-3.5 ${dividerBorderClass}`}
              >
                <div className="relative flex items-center gap-3">
                  {!readerMode && (
                    <div
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-[#F3EFE6] font-serif text-sm font-semibold text-stone-800"
                    >
                      {article.author.initials}
                    </div>
                  )}
                  <address className="not-italic" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <button
                      type="button"
                      onClick={() => setShowAuthorBio((prev) => !prev)}
                      aria-expanded={showAuthorBio}
                      itemProp="name"
                      className={`text-left text-sm font-semibold focus-visible:outline-2 focus-visible:outline-[#1E3A8A] ${
                        isNightReader ? 'text-stone-100 hover:text-sky-300' : 'text-stone-900 hover:text-[#1E3A8A]'
                      }`}
                    >
                      {article.author.name}
                    </button>
                    <div className={`text-xs ${mutedColorClass}`}>
                      <span itemProp="jobTitle">{article.author.role}</span> · {article.author.desk}
                    </div>
                  </address>

                  {showAuthorBio && (
                    <div
                      role="region"
                      aria-label="Author biography"
                      className={`absolute left-0 top-12 z-20 w-72 sm:w-80 rounded-md border p-3.5 shadow-lg ${
                        isNightReader
                          ? 'border-stone-700 bg-stone-900 text-stone-200'
                          : 'border-stone-300 bg-[#FBF9F5] text-stone-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">About the Correspondent</span>
                        <button
                          type="button"
                          onClick={() => setShowAuthorBio(false)}
                          className={`text-xs font-medium ${mutedColorClass}`}
                        >
                          Close
                        </button>
                      </div>
                      <p className={`mt-1.5 text-xs leading-relaxed ${deckColorClass}`}>
                        {article.author.bio}
                      </p>
                    </div>
                  )}
                </div>

                {/* Reader Utility Controls (hidden in Reader Mode since ReaderModeBar owns them) */}
                {!readerMode && (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setReaderMode(true)}
                      aria-pressed={readerMode}
                      title="Switch to distraction-free Reader Mode (Shortcut: R)"
                      className="inline-flex items-center gap-1.5 rounded-md border border-[#1E3A8A]/35 bg-[#1E3A8A]/8 px-3 py-1.5 text-xs font-semibold text-[#1E3A8A] hover:bg-[#1E3A8A]/15 whitespace-nowrap shrink-0 transition-colors min-h-[40px]"
                    >
                      <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Reader Mode</span>
                    </button>

                    <button
                      type="button"
                      onClick={toggleAudio}
                      aria-pressed={isPlayingAudio}
                      className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors min-h-[40px] ${
                        isPlayingAudio
                          ? 'border-[#1E3A8A] bg-[#1E3A8A] text-white'
                          : 'border-stone-300 bg-[#FBF9F5] text-stone-700 hover:bg-[#F3EFE6]'
                      }`}
                    >
                      {isPlayingAudio ? (
                        <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <Headphones className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      <span>{isPlayingAudio ? 'Pause Audio' : 'Listen'}</span>
                      <span className="font-mono text-[11px] opacity-80 tabular-nums">
                        {isPlayingAudio
                          ? formatAudioTime(audioSeconds)
                          : `${article.readTimeMinutes}:00`}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFontSize((prev) => (prev === 'standard' ? 'large' : 'standard'))
                      }
                      aria-pressed={fontSize === 'large'}
                      aria-label="Toggle reading text size"
                      className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-[#FBF9F5] px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-[#F3EFE6] whitespace-nowrap shrink-0 min-h-[40px]"
                    >
                      <Type className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{fontSize === 'large' ? 'Text: Large' : 'Text: Standard'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleSave(article.id)}
                      aria-pressed={isSaved}
                      className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors min-h-[40px] ${
                        isSaved
                          ? 'border-[#1E3A8A] bg-[#1E3A8A]/10 text-[#1E3A8A]'
                          : 'border-stone-300 bg-[#FBF9F5] text-stone-700 hover:bg-[#F3EFE6]'
                      }`}
                    >
                      <Bookmark
                        className={`h-3.5 w-3.5 ${isSaved ? 'fill-current' : ''}`}
                        aria-hidden="true"
                      />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-[#FBF9F5] px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-[#F3EFE6] whitespace-nowrap shrink-0 min-h-[40px]"
                    >
                      {shareCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#1E3A8A]" aria-hidden="true" />
                          <span className="text-[#1E3A8A]">Copied Link</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Share</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Inline Audio Narration Status Bar when active */}
              {isPlayingAudio && (
                <div
                  role="region"
                  aria-label="Audio narration controls"
                  className={`mt-3 flex items-center justify-between gap-4 rounded-md border px-4 py-2.5 text-xs ${
                    isNightReader
                      ? 'border-stone-700 bg-stone-900 text-stone-200'
                      : 'border-stone-200 bg-[#F3EFE6] text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={toggleAudio}
                      aria-label="Pause audio"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1E3A8A] text-white"
                    >
                      {isPlayingAudio ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    </button>
                    <span className="font-medium">Audio Edition · Read by Studio Voice</span>
                  </div>
                  <div className="font-mono opacity-80 tabular-nums">
                    {formatAudioTime(audioSeconds)} / {formatAudioTime(totalAudioDurationSec)}
                  </div>
                </div>
              )}
            </header>

            {/* Hero Lead Photograph (Hidden in Reader Mode when Text Only is selected) */}
            {(!readerMode || readerPrefs.showPlates) && (
              <figure className="mt-8">
                <EditorialImage
                  src={article.hero.src}
                  alt={article.hero.alt}
                  aspectClass="aspect-video"
                  className="rounded-lg"
                  onExpand={handleOpenHeroLightbox}
                  expandLabel="Inspect lead photograph in full screen"
                  priority
                />
                <figcaption
                  className={`mt-2.5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between border-b pb-4 text-xs ${dividerBorderClass} ${mutedColorClass}`}
                >
                  <span className={`font-serif italic max-w-3xl ${deckColorClass}`}>
                    {article.hero.caption}
                  </span>
                  <span className="shrink-0">Photo: {article.hero.credit}</span>
                </figcaption>
              </figure>
            )}

            {/* Main Narrative Body + Margin Rail Container */}
            <div
              className={
                readerMode
                  ? 'mt-10'
                  : 'mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px]'
              }
            >
              <div
                itemProp="articleBody"
                className={readerMode ? 'w-full' : 'min-w-0 max-w-[70ch]'}
                style={
                  readerMode
                    ? {
                        fontSize: `${readerPrefs.fontSizePx}px`,
                        lineHeight: 1.8,
                      }
                    : undefined
                }
              >
                {/* Lead Paragraph with Editorial Drop Cap */}
                <p
                  className={`${bodyColorClass} ${
                    readerMode ? '' : proseSizeClass
                  } first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.82]`}
                >
                  {article.leadParagraph}
                </p>

                {/* Article Body Sections */}
                {article.sections.map((section, sIdx) => (
                  <div key={section.id} id={section.id} className="mt-10 scroll-mt-20">
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`font-mono text-xs font-medium tabular-nums ${kickerColorClass}`}
                      >
                        {section.numeral}.
                      </span>
                      <h2 className="font-serif text-2xl sm:text-[1.75rem] font-semibold leading-snug">
                        {section.heading}
                      </h2>
                    </div>

                    <div className="mt-4 space-y-5">
                      {section.paragraphs.map((para, pIdx) => (
                        <p
                          key={pIdx}
                          className={`${bodyColorClass} ${readerMode ? '' : proseSizeClass}`}
                        >
                          {para}
                          {pIdx === section.paragraphs.length - 1 &&
                            article.footnotes[sIdx] && (
                              <sup
                                className={`ml-0.5 font-mono text-[11px] font-semibold ${accentLinkClass}`}
                              >
                                <a
                                  href={`#footnote-${article.footnotes[sIdx].id}`}
                                  aria-label={`Jump to footnote ${article.footnotes[sIdx].id}`}
                                  className="hover:underline"
                                >
                                  [{article.footnotes[sIdx].id}]
                                </a>
                              </sup>
                            )}
                        </p>
                      ))}
                    </div>

                    {/* Pull Quote — Top/Bottom hairline rules */}
                    {section.pullQuote && (
                      <blockquote
                        className={`my-9 border-y py-6 text-center sm:px-6 ${
                          isNightReader ? 'border-stone-700' : 'border-stone-300'
                        }`}
                      >
                        <p className="font-serif text-xl sm:text-2xl italic leading-relaxed text-balance">
                          “{section.pullQuote.quote}”
                        </p>
                        <footer
                          className={`mt-3 text-xs font-medium tracking-wide ${mutedColorClass}`}
                        >
                          — {section.pullQuote.attribution}
                        </footer>
                      </blockquote>
                    )}

                    {/* Photo Gallery: Full interactive module in standard view, clean inline figures in Reader Mode */}
                    {section.embedGalleryAfter &&
                      article.gallery.length > 0 &&
                      (!readerMode ? (
                        <PhotoGallery
                          key={article.id}
                          slides={article.gallery}
                          onOpenLightbox={handleOpenGalleryLightbox}
                        />
                      ) : (
                        readerPrefs.showPlates && (
                          <div className="my-8 space-y-6">
                            {article.gallery.map((plate, pIdx) => (
                              <figure key={plate.id} className="my-6">
                                <EditorialImage
                                  src={plate.src}
                                  alt={plate.alt}
                                  aspectClass="aspect-video"
                                  className="rounded-md"
                                  onExpand={() => handleOpenGalleryLightbox(pIdx)}
                                />
                                <figcaption
                                  className={`mt-2 text-xs leading-relaxed ${mutedColorClass}`}
                                >
                                  <span className="font-mono font-semibold">
                                    Plate {plate.plateNumber}
                                  </span>{' '}
                                  — {plate.caption} ({plate.location})
                                </figcaption>
                              </figure>
                            ))}
                          </div>
                        )
                      ))}

                    {/* Interactive Polls & Infrastructure Ledger — hidden in Reader Mode for distraction-free reading */}
                    {!readerMode && section.embedPrimaryPollAfter && (
                      <aside aria-label="Reader policy poll" className="poll-widget">
                        <InteractivePoll
                          poll={article.primaryPoll}
                          selectedOptionId={pollVotes[article.primaryPoll.id] ?? null}
                          onVote={(pollId, optId) =>
                            setPollVotes((prev) => ({ ...prev, [pollId]: optId }))
                          }
                          onResetVote={(pollId) =>
                            setPollVotes((prev) => {
                              const next = { ...prev };
                              delete next[pollId];
                              return next;
                            })
                          }
                        />
                      </aside>
                    )}

                    {!readerMode &&
                      section.embedTableAfter &&
                      article.comparisonProjects &&
                      article.comparisonProjects.length > 0 && (
                        <aside aria-label="Infrastructure comparison table">
                          <InfrastructureTable projects={article.comparisonProjects} />
                        </aside>
                      )}

                    {!readerMode && section.embedSecondaryPollAfter && (
                      <aside aria-label="Reader verdict poll" className="poll-widget">
                        <InteractivePoll
                          poll={article.secondaryPoll}
                          selectedOptionId={pollVotes[article.secondaryPoll.id] ?? null}
                          onVote={(pollId, optId) =>
                            setPollVotes((prev) => ({ ...prev, [pollId]: optId }))
                          }
                          onResetVote={(pollId) =>
                            setPollVotes((prev) => {
                              const next = { ...prev };
                              delete next[pollId];
                              return next;
                            })
                          }
                        />
                      </aside>
                    )}
                  </div>
                ))}

                {/* Institutional Footnotes & Sources */}
                {article.footnotes.length > 0 && (
                  <section
                    aria-label="Sources and citations"
                    className={`mt-12 border-t pt-6 ${dividerBorderClass}`}
                  >
                    <h3 className={`text-xs font-semibold tracking-wider ${mutedColorClass}`}>
                      Sources &amp; Archival Notes
                    </h3>
                    <ol className={`mt-3 space-y-2 text-xs leading-relaxed ${deckColorClass}`}>
                      {article.footnotes.map((fn) => (
                        <li
                          key={fn.id}
                          id={`footnote-${fn.id}`}
                          className="flex items-baseline gap-2.5 scroll-mt-24"
                        >
                          <span
                            className={`font-mono font-semibold tabular-nums ${accentLinkClass}`}
                          >
                            [{fn.id}]
                          </span>
                          <span>
                            {fn.citation}{' '}
                            <span className={`italic ${mutedColorClass}`}>
                              — {fn.source}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                {readerMode && (
                  <div className={`mt-12 border-t pt-6 flex items-center justify-between text-xs ${dividerBorderClass} ${mutedColorClass}`}>
                    <span>End of dispatch · The Meridian</span>
                    <button
                      type="button"
                      onClick={() => setReaderMode(false)}
                      className={`font-semibold hover:underline ${accentLinkClass}`}
                    >
                      Return to Full Edition (Polls &amp; Discussion) →
                    </button>
                  </div>
                )}
              </div>

              {/* Right Curatorial Margin Rail (Standard Edition only) */}
              {!readerMode && (
                <MarginRail
                  sections={article.sections}
                  activeChapterId={activeChapterId}
                  hasGallery={article.gallery.length > 0}
                  hasTable={Boolean(article.comparisonProjects?.length)}
                  marginNotes={article.marginNotes}
                  keyMetrics={article.keyMetrics}
                />
              )}
            </div>
          </article>

          {/* Reader Discussion & Comments — kept cleanly OUTSIDE <article> for browser-native Reader Mode extraction */}
          {!readerMode && (
            <div className="max-w-[70ch]">
              <CommentsSection
                articleId={article.id}
                initialComments={article.initialComments}
              />
            </div>
          )}
        </div>
      </main>

      {/* Related Article Recommendations & Quiet Footer (Standard Edition only) */}
      {!readerMode && (
        <>
          <RelatedArticles
            currentArticleId={article.id}
            allArticles={ARTICLES}
            relatedIds={article.relatedIds}
            savedIds={savedIds}
            onSelectArticle={handleSelectArticle}
            onToggleSave={handleToggleSave}
          />

          <footer className="border-t border-stone-200 bg-[#FBF9F5] py-8">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-lg font-bold text-stone-900">
                  The Meridian
                </span>
                <span className="text-xs text-stone-500">
                  Independent Infrastructure &amp; Civic Journalism
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-5 text-xs text-stone-600">
                {(['World', 'Cities', 'Climate', 'Science', 'Culture'] as SectionSlug[]).map(
                  (sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => handleSelectSection(sec)}
                      className="hover:text-stone-900 hover:underline"
                    >
                      {sec}
                    </button>
                  )
                )}
                <span className="text-stone-400">© 2026 The Meridian</span>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Lightbox & Subscription Modals */}
      <LightboxModal
        slides={lightboxSlides}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
      <SubscribeModal
        isOpen={subscribeOpen}
        onClose={() => setSubscribeOpen(false)}
      />
    </div>
  );
}
