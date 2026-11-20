import { useState } from 'react';
import { Check, Mail } from 'lucide-react';
import { ArticleSection, MarginNote } from '../types/news';

interface MarginRailProps {
  sections: ArticleSection[];
  activeChapterId: string;
  hasGallery: boolean;
  hasTable: boolean;
  marginNotes: MarginNote[];
  keyMetrics: { label: string; value: string; unit: string }[];
}

export function MarginRail({
  sections,
  activeChapterId,
  hasGallery,
  hasTable,
  marginNotes,
  keyMetrics,
}: MarginRailProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleDispatchSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <aside
      aria-label="Article index and field notes"
      className="space-y-8 lg:sticky lg:top-20 lg:self-start"
    >
      {/* 1. Chapter Navigation Index */}
      <nav aria-label="In this report" className="border-t border-stone-300 pt-4">
        <h2 className="text-xs font-semibold tracking-wider text-stone-500">
          In This Report
        </h2>
        <ol className="mt-3 space-y-2 text-sm">
          {sections.map((sec) => {
            const isActive = activeChapterId === sec.id;
            return (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className={`group flex items-baseline gap-2.5 py-0.5 transition-colors ${
                    isActive
                      ? 'font-semibold text-[#1E3A8A]'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span className="font-mono text-xs text-stone-400 tabular-nums">
                    {sec.numeral}
                  </span>
                  <span className="leading-snug">{sec.heading}</span>
                </a>
              </li>
            );
          })}
          {hasGallery && (
            <li>
              <a
                href="#photo-essay"
                className="flex items-baseline gap-2.5 py-0.5 text-stone-600 hover:text-stone-900"
              >
                <span className="font-mono text-xs text-stone-400 tabular-nums">
                  {String(sections.length + 1).padStart(2, '0')}
                </span>
                <span>Documentary Photo Essay</span>
              </a>
            </li>
          )}
          {hasTable && (
            <li>
              <a
                href="#infrastructure-ledger"
                className="flex items-baseline gap-2.5 py-0.5 text-stone-600 hover:text-stone-900"
              >
                <span className="font-mono text-xs text-stone-400 tabular-nums">
                  {String(sections.length + (hasGallery ? 2 : 1)).padStart(2, '0')}
                </span>
                <span>Infrastructure Ledger</span>
              </a>
            </li>
          )}
          <li>
            <a
              href="#reader-discussion"
              className="flex items-baseline gap-2.5 py-0.5 text-stone-600 hover:text-stone-900"
            >
              <span className="font-mono text-xs text-stone-400 tabular-nums">
                {String(
                  sections.length + (hasGallery ? 1 : 0) + (hasTable ? 1 : 0) + 1
                ).padStart(2, '0')}
              </span>
              <span>Reader Discussion</span>
            </a>
          </li>
        </ol>
      </nav>

      {/* 2. Key Figures Summary */}
      <div className="border-t border-stone-300 pt-4">
        <h2 className="text-xs font-semibold tracking-wider text-stone-500">
          Reported Benchmarks
        </h2>
        <dl className="mt-3 divide-y divide-stone-200 border-b border-stone-200">
          {keyMetrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-baseline justify-between gap-3 py-2.5"
            >
              <dt className="text-xs text-stone-600">{metric.label}</dt>
              <dd className="text-right shrink-0">
                <span className="font-mono text-sm font-semibold text-stone-900 tabular-nums">
                  {metric.value}
                </span>{' '}
                <span className="text-[11px] text-stone-500">{metric.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* 3. Curatorial Margin Notes */}
      <div className="border-t border-stone-300 pt-4">
        <h2 className="text-xs font-semibold tracking-wider text-stone-500">
          Field Glossary
        </h2>
        <div className="mt-3 space-y-4">
          {marginNotes.map((note) => (
            <div
              key={note.id}
              className="rounded-md border border-stone-200 bg-[#F3EFE6]/70 p-3.5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[11px] font-medium text-[#9A3412] tabular-nums">
                  {note.index}
                </span>
              </div>
              <h3 className="mt-1 text-sm font-semibold text-stone-900">
                {note.term}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-stone-700">
                {note.definition}
              </p>
              <p className="mt-2 text-[11px] text-stone-500">{note.sourceRef}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Cities Dispatch Newsletter Card */}
      <div className="rounded-lg border border-stone-200 bg-[#F3EFE6] p-4">
        <div className="flex items-center gap-2 text-stone-900">
          <Mail className="h-4 w-4 text-[#1E3A8A]" aria-hidden="true" />
          <h2 className="font-serif text-base font-semibold">The Cities Dispatch</h2>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
          Weekly reporting on civic engineering, housing architecture, and climate adaptation.
        </p>

        {!subscribed ? (
          <form onSubmit={handleDispatchSignup} className="mt-3 space-y-2">
            <label htmlFor="rail-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="rail-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="reader@domain.com"
              className="w-full rounded-md border border-stone-300 bg-[#FBF9F5] px-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#1E3A8A] focus:outline-none min-h-[40px]"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-stone-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-stone-800 min-h-[40px]"
            >
              Sign Up Free
            </button>
          </form>
        ) : (
          <div
            role="status"
            className="mt-3 flex items-center gap-2 rounded-md border border-stone-300 bg-[#FBF9F5] p-2.5 text-xs font-medium text-stone-800"
          >
            <Check className="h-4 w-4 shrink-0 text-[#1E3A8A]" aria-hidden="true" />
            <span>Subscribed to Tuesday’s edition.</span>
          </div>
        )}
      </div>
    </aside>
  );
}
