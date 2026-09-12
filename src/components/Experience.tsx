import { Section } from './Section'
import { experience } from '../data/experience'
import { education } from '../data/education'

export function Experience() {
  return (
    <Section id="experience" eyebrow="Career" title="Experience & Education">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="mb-6 text-sm font-medium uppercase tracking-widest text-body">
            Professional Experience
          </h3>
          <ol className="space-y-8 border-l border-line pl-6">
            {experience.map((e) => (
              <li key={`${e.role}-${e.period}`} className="relative">
                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                <p className="text-xs font-medium uppercase tracking-wide text-accent">{e.period}</p>
                <h4 className="mt-1 font-heading text-lg font-medium text-ink">{e.role}</h4>
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
        </div>

        <div>
          <h3 className="mb-6 text-sm font-medium uppercase tracking-widest text-body">Education</h3>
          <ol className="space-y-8 border-l border-line pl-6">
            {education.map((ed) => (
              <li key={ed.degree} className="relative">
                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-amber" />
                <p className="text-xs font-medium uppercase tracking-wide text-amber">{ed.period}</p>
                <h4 className="mt-1 font-heading text-base font-medium text-ink">{ed.degree}</h4>
                <p className="text-sm text-body">{ed.org}</p>
                {ed.note && <p className="mt-1.5 text-sm leading-relaxed text-body">{ed.note}</p>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
