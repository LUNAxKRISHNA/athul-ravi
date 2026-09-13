import { motion } from 'framer-motion'
import { Section } from './Section'
import { skillGroups, training } from '../data/skills'

export function Skills() {
  return (
    <Section id="skills" eyebrow="Capabilities" title="Skills & Training" centerHeader largeTitle>
      <div>
        <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-body">
          Research Capabilities
        </p>

        <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-3 md:gap-8">
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.12 }}
              className="border-t border-black/10 pt-5"
            >
              <span className="font-heading block text-3xl font-semibold text-ink/20 md:text-4xl">
                {g.number}
              </span>
              <h3 className="font-heading mt-2 text-lg font-semibold leading-snug text-ink">
                {g.heading}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line px-3 py-1 text-xs leading-relaxed text-body"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-body">
          Training &amp; Professional Development
        </p>

        <div className="mt-8 grid gap-x-8 gap-y-6 md:mt-10 md:grid-cols-2">
          {training.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: (i % 2) * 0.1 }}
              className="border-t border-black/10 pt-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-body/70">
                {t.duration}
              </p>
              <h4 className="font-heading mt-1.5 text-base font-semibold text-ink">{t.title}</h4>
              <p className="mt-0.5 text-sm text-body">{t.institution}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
