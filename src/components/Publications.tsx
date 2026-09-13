import { Section } from './Section'
import { journalPublications, conferencePapers } from '../data/publications'

const publications = [
  ...journalPublications.map((p) => ({ ...p, type: 'Journal' as const })),
  ...conferencePapers.map((p) => ({ ...p, type: 'Conference' as const })),
].sort((a, b) => Number(b.year) - Number(a.year))

export function Publications() {
  return (
    <Section id="publications" eyebrow="Output" title="Publications" invert centerHeader>
      <ul>
        {publications.map((p, i) => (
          <li
            key={p.title}
            className="grid grid-cols-1 gap-4 border-t border-white/10 py-10 first:border-t-0 first:pt-0 md:grid-cols-[3rem_1fr_auto] md:items-center md:gap-10"
          >
            <span className="font-heading text-2xl text-white/20">{String(i + 1).padStart(2, '0')}</span>

            <div>
              <h4 className="font-heading text-lg font-bold leading-snug text-white md:text-xl">{p.title}</h4>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
                {p.authors} &middot; <span className="font-medium text-white/80">{p.venue}</span>
                {p.detail && `, ${p.detail}`}
              </p>
            </div>

            <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-2">
              <span className="border border-white/20 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white/60">
                {p.type}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-white/50">{p.year}</span>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
