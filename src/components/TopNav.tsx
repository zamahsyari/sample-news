import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SectionSlug } from '../types/news';

interface TopNavProps {
  activeSection: SectionSlug;
  scrollProgress: number;
  onSelectSection: (section: SectionSlug) => void;
  onResetToLead: () => void;
  onOpenSubscribe: () => void;
}

const SECTIONS: SectionSlug[] = ['World', 'Cities', 'Climate', 'Science', 'Culture'];

export function TopNav({
  activeSection,
  scrollProgress,
  onSelectSection,
  onResetToLead,
  onOpenSubscribe,
}: TopNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-stone-200">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-element Brand wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onResetToLead();
          }}
          className="font-serif text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
        >
          The Meridian
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary sections"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
        >
          {SECTIONS.map((section) => {
            const isActive = activeSection === section;
            return (
              <button
                key={section}
                type="button"
                onClick={() => onSelectSection(section)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A] ${
                  isActive
                    ? 'text-stone-900 font-semibold underline decoration-[#1E3A8A] decoration-2 underline-offset-8'
                    : 'hover:underline hover:decoration-stone-400 hover:underline-offset-8'
                }`}
              >
                {section}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenSubscribe}
            className="rounded-md bg-[#1E3A8A] px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#172554] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] whitespace-nowrap shrink-0 min-h-[40px]"
          >
            Subscribe
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close section menu' : 'Open section menu'}
            className="inline-flex md:hidden items-center justify-center rounded-md border border-stone-300 bg-[#FBF9F5] p-2 text-stone-700 hover:bg-stone-100 min-h-[40px] min-w-[40px]"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile sections"
          className="md:hidden border-t border-stone-200 bg-[#FBF9F5] px-4 py-3"
        >
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section;
              return (
                <button
                  key={section}
                  type="button"
                  onClick={() => {
                    onSelectSection(section);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-md px-3 py-2 text-xs font-medium min-h-[40px] whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#1E3A8A] text-white'
                      : 'bg-[#F3EFE6] text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {section}
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Reading progress hairline */}
      <div
        aria-hidden="true"
        className="h-[2px] w-full bg-stone-200/70 overflow-hidden"
      >
        <div
          className="h-full w-full origin-left bg-[#1E3A8A] transition-transform duration-100 ease-out"
          style={{ transform: `scaleX(${Math.min(1, Math.max(0, scrollProgress / 100))})` }}
        />
      </div>
    </header>
  );
}
