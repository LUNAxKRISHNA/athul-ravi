import { Section } from './Section'
import { researchInterests } from '../data/research'

export function Research() {
  return (
    <Section id="research" eyebrow="Research" title="Research Interests" alt>
      <div className="grid gap-5 sm:grid-cols-2">
        {researchInterests.map((r) => (
          <div
            key={r.title}
            className="rounded-2xl border border-line bg-paper p-6 transition-shadow hover:shadow-sm"
          >
            <h3 className="font-heading text-lg font-medium text-ink">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">{r.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
