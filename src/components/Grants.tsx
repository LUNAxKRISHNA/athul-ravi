import { Section } from './Section'
import { grants, proposalsUnderReview } from '../data/grants'

export function Grants() {
  return (
    <Section id="grants" eyebrow="Funding" title="Grants & Funded Research">
      <ul className="space-y-4">
        {grants.map((g) => (
          <li key={g.title} className="glass flex flex-col gap-1 rounded-xl p-5 shadow-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-heading text-base font-semibold text-ink">{g.title}</h4>
              <span className="font-mono text-xs font-medium uppercase tracking-wide text-body">{g.year}</span>
            </div>
            <p className="text-sm leading-relaxed text-body">{g.detail}</p>
          </li>
        ))}
      </ul>

      {proposalsUnderReview.length > 0 && (
        <div className="mt-8 rounded-xl border border-dashed border-line bg-paper-alt p-5">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-body">
            Proposals Under Review
          </p>
          {proposalsUnderReview.map((p, i) => (
            <p key={i} className="mt-2 text-sm leading-relaxed text-body">
              {p}
            </p>
          ))}
        </div>
      )}
    </Section>
  )
}
