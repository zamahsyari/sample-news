import { useState } from 'react';
import { Check, BarChart2, RotateCcw } from 'lucide-react';
import { PollData } from '../types/news';

interface InteractivePollProps {
  poll: PollData;
  selectedOptionId: string | null;
  onVote: (pollId: string, optionId: string) => void;
  onResetVote: (pollId: string) => void;
}

type CohortFilter = 'all' | 'planners' | 'residents';

export function InteractivePoll({
  poll,
  selectedOptionId,
  onVote,
  onResetVote,
}: InteractivePollProps) {
  const [draftChoice, setDraftChoice] = useState<string | null>(selectedOptionId);
  const [peekResults, setPeekResults] = useState(false);
  const [cohort, setCohort] = useState<CohortFilter>('all');

  const hasVoted = selectedOptionId !== null;
  const showResults = hasVoted || peekResults;

  const getVotesForOption = (opt: PollData['options'][number]) => {
    const bonus = selectedOptionId === opt.id ? 1 : 0;
    if (cohort === 'planners') return opt.plannerVotes + bonus;
    if (cohort === 'residents') return opt.residentVotes + bonus;
    return opt.votes + bonus;
  };

  const totalVotes = poll.options.reduce((sum, opt) => sum + getVotesForOption(opt), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftChoice) return;
    onVote(poll.id, draftChoice);
    setPeekResults(false);
  };

  return (
    <section
      id={poll.id}
      aria-label={poll.question}
      className="my-10 rounded-lg border border-stone-200 bg-[#F3EFE6] p-5 sm:p-7"
    >
      {/* Header Row */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-300/80 pb-3.5">
        <span className="text-xs font-medium tracking-wider text-[#9A3412]">
          {poll.kicker}
        </span>
        <span className="font-mono text-xs text-stone-500 tabular-nums">
          {poll.closesLabel}
        </span>
      </div>

      <h3 className="mt-4 font-serif text-xl sm:text-2xl font-semibold leading-snug text-stone-900">
        {poll.question}
      </h3>
      <p className="mt-1.5 text-sm text-stone-600">{poll.contextNote}</p>

      {/* Optional Cohort Segment Tabs when results are visible */}
      {showResults && poll.hasSegmentFilter && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-stone-300/70 pb-3">
          <span className="text-xs font-medium text-stone-600">Cohort breakdown</span>
          <div
            role="group"
            aria-label="Filter poll results by reader cohort"
            className="inline-flex items-center gap-1 rounded-md border border-stone-300 bg-[#FBF9F5] p-0.5"
          >
            {(
              [
                { id: 'all', label: 'All Readers' },
                { id: 'planners', label: 'Urban Planners' },
                { id: 'residents', label: 'Coastal Residents' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCohort(tab.id)}
                className={`rounded px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors min-h-[32px] ${
                  cohort === tab.id
                    ? 'bg-[#1E3A8A] text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Voting Form or Results View */}
      {!showResults ? (
        <form onSubmit={handleSubmit} className="mt-5 space-y-2.5">
          <fieldset className="space-y-2.5">
            <legend className="sr-only">{poll.question}</legend>
            {poll.options.map((opt) => {
              const isChecked = draftChoice === opt.id;
              return (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3 text-sm transition-colors duration-150 ${
                    isChecked
                      ? 'border-[#1E3A8A] bg-[#FBF9F5] text-stone-900'
                      : 'border-stone-300/90 bg-[#FBF9F5]/80 text-stone-800 hover:border-stone-400 hover:bg-[#FBF9F5]'
                  }`}
                >
                  <input
                    type="radio"
                    name={poll.id}
                    value={opt.id}
                    checked={isChecked}
                    onChange={() => setDraftChoice(opt.id)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#1E3A8A]"
                  />
                  <span className="leading-snug font-medium">{opt.label}</span>
                </label>
              );
            })}
          </fieldset>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={!draftChoice}
                className="rounded-md bg-[#1E3A8A] px-5 py-2.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#172554] disabled:cursor-not-allowed disabled:opacity-45 min-h-[40px] whitespace-nowrap shrink-0"
              >
                Submit Vote
              </button>
              <button
                type="button"
                onClick={() => setPeekResults(true)}
                className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-[#FBF9F5] px-3.5 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 min-h-[40px] whitespace-nowrap shrink-0"
              >
                <BarChart2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>View Results</span>
              </button>
            </div>
            <span className="font-mono text-xs text-stone-500 tabular-nums">
              {totalVotes.toLocaleString()} votes cast
            </span>
          </div>
        </form>
      ) : (
        <div className="mt-5 space-y-3" aria-live="polite">
          {poll.options.map((opt) => {
            const count = getVotesForOption(opt);
            const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
            const isSelected = selectedOptionId === opt.id;
            const isLeading =
              count === Math.max(...poll.options.map((o) => getVotesForOption(o)));

            return (
              <div
                key={opt.id}
                className={`relative overflow-hidden rounded-md border bg-[#FBF9F5] px-4 py-3 ${
                  isSelected ? 'border-[#1E3A8A]' : 'border-stone-300/80'
                }`}
              >
                {/* Compositor-only scaleX result bar */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-full origin-left transition-transform duration-500 ease-out ${
                    isSelected ? 'bg-[#1E3A8A]/12' : 'bg-stone-200/65'
                  }`}
                  style={{ transform: `scaleX(${pct / 100})` }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2">
                    {isSelected && (
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#1E3A8A]"
                        aria-label="Your selection"
                      />
                    )}
                    <span
                      className={`text-sm leading-snug ${
                        isSelected || isLeading
                          ? 'font-semibold text-stone-900'
                          : 'font-medium text-stone-700'
                      }`}
                    >
                      {opt.label}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 shrink-0 text-right">
                    <span className="font-mono text-sm font-semibold text-stone-900 tabular-nums">
                      {pct}%
                    </span>
                    <span className="hidden sm:inline font-mono text-xs text-stone-500 tabular-nums">
                      ({count.toLocaleString()})
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-stone-600">
            <span className="font-mono tabular-nums">
              Total: {totalVotes.toLocaleString()} responses
              {hasVoted ? ' · Vote recorded' : ''}
            </span>

            {hasVoted ? (
              <button
                type="button"
                onClick={() => {
                  onResetVote(poll.id);
                  setDraftChoice(null);
                  setPeekResults(false);
                }}
                className="inline-flex items-center gap-1 font-medium text-[#1E3A8A] hover:underline min-h-[36px]"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Change my vote</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setPeekResults(false)}
                className="font-medium text-[#1E3A8A] hover:underline min-h-[36px]"
              >
                ← Return to vote
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
