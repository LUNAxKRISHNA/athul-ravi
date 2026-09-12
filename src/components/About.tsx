import { Section } from './Section'
import { profile } from '../data/profile'

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Professional Summary">
      <p className="max-w-3xl text-base leading-relaxed text-body md:text-lg">{profile.summary}</p>

      <div className="mt-8 flex flex-wrap gap-4">
        {profile.profiles.map((p) => (
          <a
            key={p.label}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-4 py-2 text-sm text-body transition-colors hover:border-accent hover:text-accent"
          >
            {p.label} ↗
          </a>
        ))}
      </div>
    </Section>
  )
}
