import { Section } from './Section'
import { skillGroups, training } from '../data/skills'

export function Skills() {
  return (
    <Section id="skills" eyebrow="Capabilities" title="Skills & Training" alt>
      <div className="grid gap-8 md:grid-cols-3">
        {skillGroups.map((g) => (
          <div key={g.heading}>
            <h3 className="mb-3 font-heading text-base font-medium text-ink">{g.heading}</h3>
            <ul className="space-y-2 text-sm leading-relaxed text-body">
              {g.items.map((item) => (
                <li key={item} className="pl-4 -indent-4">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="mb-3 mt-12 text-sm font-medium uppercase tracking-widest text-body">
        Training & Professional Development
      </h3>
      <ul className="space-y-2 text-sm leading-relaxed text-body">
        {training.map((t) => (
          <li key={t} className="pl-4 -indent-4">
            • {t}
          </li>
        ))}
      </ul>
    </Section>
  )
}
