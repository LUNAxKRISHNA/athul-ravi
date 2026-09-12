import { Section } from './Section'
import { experience } from '../data/experience'

export function Experience() {
  return (
    <Section id="experience" eyebrow="Career" title="Professional Experience" largeTitle>
      <ol className="space-y-8 border-l border-line pl-6">
        {experience.map((e) => (
          <li key={`${e.role}-${e.period}`} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-black" />
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-body">{e.period}</p>
            <h4 className="font-heading mt-1 text-lg font-semibold text-ink">{e.role}</h4>
            <p className="text-sm text-body">{e.org}</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-body">
              {e.bullets.map((b, i) => (
                <li key={i} className="pl-4 -indent-4">
                  • {b}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
