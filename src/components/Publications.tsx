import { Section } from './Section'
import { journalPublications, conferencePapers } from '../data/publications'

function PubList({ items }: { items: typeof journalPublications }) {
  return (
    <ul className="space-y-6">
      {items.map((p, i) => (
        <li key={i} className="rounded-xl border border-line bg-paper p-5">
          <p className="text-sm leading-relaxed text-body">
            {p.authors} <span className="text-ink">“{p.title}”</span>{' '}
            <em className="not-italic text-accent">{p.venue}</em>
            {p.detail && `, ${p.detail}`}, {p.year}.
          </p>
        </li>
      ))}
    </ul>
  )
}

export function Publications() {
  return (
    <Section id="publications" eyebrow="Output" title="Publications" alt>
      <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-body">
        Journal Articles
      </h3>
      <PubList items={journalPublications} />

      <h3 className="mb-4 mt-10 text-sm font-medium uppercase tracking-widest text-body">
        Conference Papers & Presentations
      </h3>
      <PubList items={conferencePapers} />
    </Section>
  )
}
