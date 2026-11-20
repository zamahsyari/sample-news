import { useMemo, useState } from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import { ArticleData } from '../types/news';
import { EditorialImage } from './EditorialImage';

interface RelatedArticlesProps {
  currentArticleId: string;
  allArticles: Record<string, ArticleData>;
  relatedIds: string[];
  savedIds: string[];
  onSelectArticle: (id: string) => void;
  onToggleSave: (id: string) => void;
}

export function RelatedArticles({
  currentArticleId,
  allArticles,
  relatedIds,
  savedIds,
  onSelectArticle,
  onToggleSave,
}: RelatedArticlesProps) {
  const [deskFilter, setDeskFilter] = useState<string>('All');

  const candidateArticles = useMemo(() => {
    const orderedIds = [
      ...relatedIds,
      ...Object.keys(allArticles).filter(
        (id) => id !== currentArticleId && !relatedIds.includes(id)
      ),
    ];
    return orderedIds
      .filter((id) => id !== currentArticleId && allArticles[id])
      .map((id) => allArticles[id]);
  }, [allArticles, currentArticleId, relatedIds]);

  const desks = useMemo(() => {
    const unique = Array.from(new Set(candidateArticles.map((a) => a.section)));
    return ['All', ...unique];
  }, [candidateArticles]);

  const filteredArticles = useMemo(() => {
    if (deskFilter === 'All') return candidateArticles;
    return candidateArticles.filter((a) => a.section === deskFilter);
  }, [candidateArticles, deskFilter]);

  const featuredTwo = filteredArticles.slice(0, 2);
  const compactRest = filteredArticles.slice(2);

  return (
    <section
      id="related-articles"
      aria-label="Related article recommendations"
      className="mt-16 border-t border-stone-300 bg-[#F3EFE6]/55 py-12"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header + Desk Filter Tabs */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-300 pb-5">
          <div>
            <p className="text-xs font-medium tracking-wider text-[#9A3412]">
              Further Reading · Curated by the Desk
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
              Related Dispatches &amp; Reports
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter related articles by section"
            className="flex flex-wrap items-center gap-1 rounded-md border border-stone-300 bg-[#FBF9F5] p-1"
          >
            {desks.map((desk) => (
              <button
                key={desk}
                type="button"
                onClick={() => setDeskFilter(desk)}
                className={`rounded px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors min-h-[34px] ${
                  deskFilter === desk
                    ? 'bg-[#1E3A8A] text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {desk}
              </button>
            ))}
          </div>
        </div>

        {/* Tier 1: Featured 2-Column Photo-Led Cards */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {featuredTwo.map((article) => {
            const isSaved = savedIds.includes(article.id);
            return (
              <article
                key={article.id}
                className="group flex flex-col justify-between border-b border-stone-200 pb-6 md:border-b-0 md:pb-0"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onSelectArticle(article.id)}
                    className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
                  >
                    <EditorialImage
                      src={article.hero.src}
                      alt={article.hero.alt}
                      aspectClass="aspect-[4/3]"
                      className="rounded-md"
                    />
                  </button>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-[#9A3412]">{article.section}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publishedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      {article.readTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="mt-2 font-serif text-xl sm:text-2xl font-semibold leading-snug text-stone-900">
                    <button
                      type="button"
                      onClick={() => onSelectArticle(article.id)}
                      className="text-left transition-colors group-hover:text-[#1E3A8A] focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
                    >
                      {article.title}
                    </button>
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-stone-600 line-clamp-3">
                    {article.deck}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectArticle(article.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:underline min-h-[36px]"
                  >
                    <span>Read Full Report</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleSave(article.id)}
                    aria-label={isSaved ? `Remove ${article.title} from saved` : `Save ${article.title}`}
                    aria-pressed={isSaved}
                    className={`inline-flex items-center gap-1 rounded px-2.5 py-1.5 text-xs font-medium transition-colors min-h-[36px] ${
                      isSaved
                        ? 'text-[#1E3A8A] bg-[#1E3A8A]/10'
                        : 'text-stone-600 hover:bg-stone-200/70'
                    }`}
                  >
                    <Bookmark
                      className={`h-3.5 w-3.5 ${isSaved ? 'fill-current' : ''}`}
                      aria-hidden="true"
                    />
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Tier 2: Compact Editorial Index List */}
        {compactRest.length > 0 && (
          <div className="mt-10 border-t border-stone-300 pt-7">
            <h3 className="text-xs font-semibold tracking-wider text-stone-500">
              More From This Edition
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {compactRest.map((article, idx) => {
                const isSaved = savedIds.includes(article.id);
                return (
                  <article
                    key={article.id}
                    className="flex flex-col justify-between rounded-md border border-stone-200 bg-[#FBF9F5] p-5 transition-colors hover:border-stone-300"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-stone-500">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-stone-400 tabular-nums">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-[#9A3412]">{article.section}</span>
                        </div>
                        <span className="font-mono tabular-nums">
                          {article.readTimeMinutes} min
                        </span>
                      </div>

                      <h4 className="mt-2.5 font-serif text-lg font-semibold leading-snug text-stone-900">
                        <button
                          type="button"
                          onClick={() => onSelectArticle(article.id)}
                          className="text-left hover:text-[#1E3A8A] focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
                        >
                          {article.title}
                        </button>
                      </h4>

                      <p className="mt-2 text-xs leading-relaxed text-stone-600 line-clamp-2">
                        {article.deck}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-3 text-xs">
                      <span className="text-stone-500">By {article.author.name}</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => onToggleSave(article.id)}
                          aria-label={isSaved ? 'Unsave article' : 'Save article'}
                          className={`text-xs font-medium ${
                            isSaved ? 'text-[#1E3A8A]' : 'text-stone-500 hover:text-stone-900'
                          }`}
                        >
                          {isSaved ? 'Saved' : 'Save'}
                        </button>
                        <button
                          type="button"
                          onClick={() => onSelectArticle(article.id)}
                          className="font-semibold text-[#1E3A8A] hover:underline"
                        >
                          Read →
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
