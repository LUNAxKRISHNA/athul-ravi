import { Section } from './Section'
import { projects } from '../data/projects'

export function Projects() {
  return (
    <Section id="projects" eyebrow="Ongoing Work" title="Projects">
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p) => (
          <div key={p.title} className="glass rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-heading text-lg font-semibold text-ink">{p.title}</h3>
              <span className="font-mono text-xs font-medium uppercase tracking-wide text-body">{p.year}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-body">{p.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
