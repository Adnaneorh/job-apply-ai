import type { StatCard } from '../../types';

export function Stats({ cards }: { cards: StatCard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <article key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
          <p className="text-2xl font-bold">{card.value}</p>
          {card.trend && <p className="text-sm text-emerald-500">{card.trend}</p>}
        </article>
      ))}
    </div>
  );
}
