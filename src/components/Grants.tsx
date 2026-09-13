import { Section } from './Section'
import { grants, proposalsUnderReview } from '../data/grants'

export function Grants() {
  return (
    <Section id="grants" eyebrow="Funding" title="Grants & Funded Research" centerHeader>
      {/* Mobile: each grant stacked as its own block */}
      <div className="md:hidden">
        {grants.map((g) => (
          <div key={g.title} className="border-t-4 border-black/20 pt-10 text-center first:border-t-0 first:pt-0">
            {g.amount && (
              <span className="font-heading text-4xl font-bold leading-none text-ink">{g.amount}</span>
            )}
            <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-widest text-body">{g.role}</p>
            <h4 className="font-heading mt-1 text-xl font-semibold leading-snug text-ink">{g.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-body">{g.detail}</p>
            <div className="-mx-6 mt-10 flex w-[calc(100%+3rem)] items-center justify-center bg-black py-3">
              <span className="font-mono text-sm font-medium uppercase tracking-widest text-white">{g.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: fields laid out as aligned rows across columns, so every title starts on the same line */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-x-10">
        {grants.map((g) => (
          <div key={`${g.title}-amount`} className="border-t-4 border-black/20 pt-10 text-center">
            {g.amount && (
              <span className="font-heading text-4xl font-bold leading-none text-ink md:text-5xl">{g.amount}</span>
            )}
          </div>
        ))}
        {grants.map((g) => (
          <p
            key={`${g.title}-role`}
            className="mt-4 text-center font-mono text-xs font-semibold uppercase tracking-widest text-body"
          >
            {g.role}
          </p>
        ))}
        {grants.map((g) => (
          <h4
            key={`${g.title}-title`}
            className="font-heading mt-1 text-center text-xl font-semibold leading-snug text-ink md:text-2xl"
          >
            {g.title}
          </h4>
        ))}
        {grants.map((g) => (
          <p key={`${g.title}-detail`} className="mt-2 text-center text-sm leading-relaxed text-body">
            {g.detail}
          </p>
        ))}
        {grants.map((g) => (
          <div key={`${g.title}-bar`} className="mt-10 flex items-center justify-center bg-black py-3">
            <span className="font-mono text-sm font-medium uppercase tracking-widest text-white">{g.year}</span>
          </div>
        ))}
      </div>

      {proposalsUnderReview.length > 0 && (
        <div className="mt-12 border-l-2 border-black/10 pl-6">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-body/70">
            Proposals Under Review
          </p>
          {proposalsUnderReview.map((p, i) => (
            <p key={i} className="mt-2 max-w-2xl text-sm leading-relaxed text-body/80">
              {p}
            </p>
          ))}
        </div>
      )}
    </Section>
  )
}
