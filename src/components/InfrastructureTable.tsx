import { useMemo, useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { ComparisonProject } from '../types/news';

interface InfrastructureTableProps {
  projects: ComparisonProject[];
}

type SortKey = 'project' | 'retentionM3' | 'civicDaysPerYear' | 'costMillionsUsd' | 'yearCompleted';

export function InfrastructureTable({ projects }: InfrastructureTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('retentionM3');
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = useMemo(() => {
    const copy = [...projects];
    copy.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
    });
    return copy;
  }, [projects, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const renderHeaderBtn = (key: SortKey, label: string, alignRight = true) => (
    <button
      type="button"
      onClick={() => handleSort(key)}
      className={`inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-stone-700 hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-[#1E3A8A] ${
        alignRight ? 'justify-end' : 'justify-start'
      }`}
    >
      <span className="whitespace-nowrap">{label}</span>
      <ArrowUpDown
        className={`h-3 w-3 shrink-0 ${
          sortKey === key ? 'text-[#1E3A8A]' : 'text-stone-400'
        }`}
        aria-hidden="true"
      />
    </button>
  );

  return (
    <section
      id="infrastructure-ledger"
      aria-label="Comparative flood infrastructure ledger"
      className="my-10 border-y border-stone-200 py-6"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs font-medium tracking-wider text-[#9A3412]">
            Comparative Ledger · Municipal Flood Assets
          </p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-stone-900">
            Retention Capacity vs. Civic Availability
          </h3>
        </div>
        <span className="text-xs text-stone-500">Click column headers to sort</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px] border-collapse text-left">
          <thead>
            <tr className="border-b border-stone-300 text-xs text-stone-600">
              <th className="py-2.5 pr-4 font-semibold">
                {renderHeaderBtn('project', 'Project & City', false)}
              </th>
              <th className="py-2.5 px-3 text-right">
                {renderHeaderBtn('retentionM3', 'Retention (m³)')}
              </th>
              <th className="py-2.5 px-3 text-right">
                {renderHeaderBtn('civicDaysPerYear', 'Civic Days / Yr')}
              </th>
              <th className="py-2.5 px-3 text-right">
                {renderHeaderBtn('costMillionsUsd', 'Capex ($M)')}
              </th>
              <th className="py-2.5 pl-3 text-right">
                {renderHeaderBtn('yearCompleted', 'Completed')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 text-sm">
            {sorted.map((item) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-[#F3EFE6]/60"
              >
                <td className="py-3 pr-4">
                  <div className="font-medium text-stone-900">{item.project}</div>
                  <div className="text-xs text-stone-500">{item.city}</div>
                </td>
                <td className="py-3 px-3 text-right font-mono text-xs sm:text-sm text-stone-800 tabular-nums">
                  {item.retentionM3.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-right font-mono text-xs sm:text-sm text-stone-800 tabular-nums">
                  {item.civicDaysPerYear}
                </td>
                <td className="py-3 px-3 text-right font-mono text-xs sm:text-sm text-stone-800 tabular-nums">
                  ${item.costMillionsUsd.toLocaleString()}M
                </td>
                <td className="py-3 pl-3 text-right font-mono text-xs sm:text-sm text-stone-600 tabular-nums">
                  {item.yearCompleted}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-stone-500">
        Figures compiled from municipal water authority post-occupancy filings. Civic days measure average annual days open for non-emergency public recreation or tours.
      </p>
    </section>
  );
}
