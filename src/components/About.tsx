import { Section } from './Section'
import { profile } from '../data/profile'

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Professional Summary" centerHeader largeTitle>
      <div className="flex flex-col gap-8 md:flex-row md:items-stretch">
        <div className="md:flex-1">
          <p className="text-base leading-relaxed text-body md:text-lg">{profile.summary}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            {profile.profiles.map((p) => (
              <a
                key={p.label}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-4 py-2 text-sm text-body transition-colors hover:border-black hover:text-ink"
              >
                {p.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="shrink-0 md:w-80 lg:w-96">
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            className="h-64 w-full rounded-2xl object-cover shadow-sm md:h-full"
          />
        </div>
      </div>
    </Section>
  )
}
