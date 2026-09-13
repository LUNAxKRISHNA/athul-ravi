import { Section } from './Section'
import { projects } from '../data/projects'

export function Projects() {
  return (
    <Section id="projects" eyebrow="Ongoing Work" title="Projects" centerHeader>
      {projects.map((p, i) => (
        <div key={p.title} className="border-t border-black/10 py-12 first:border-t-0 first:pt-0">
          <div className="flex flex-row items-start gap-6 md:gap-10">
            <span className="shrink-0 font-heading text-6xl font-bold leading-none text-black/10 md:text-7xl">
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="flex flex-1 flex-col gap-3">
              <h3 className="font-heading text-2xl font-bold leading-snug text-ink md:text-3xl">{p.title}</h3>

              <ul className="max-w-xl space-y-1.5 text-sm leading-relaxed text-body">
                {p.points.map((pt, j) => (
                  <li key={j} className="pl-4 -indent-4">
                    • {pt}
                  </li>
                ))}
              </ul>

              <div className="mt-1 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-black/15 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-body"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-black/15 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full border border-ink/40" />
              <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-body">
                {p.year}
              </span>
            </span>
          </div>
        </div>
      ))}
    </Section>
  )
}
