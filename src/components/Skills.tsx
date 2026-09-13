import { motion } from 'framer-motion'
import { Section } from './Section'
import { skillGroups, training } from '../data/skills'

export function Skills() {
  return (
    <Section id="skills" eyebrow="Capabilities" title="Skills & Training" centerHeader largeTitle>
      <div>
        <p className="font-heading text-center text-xl italic text-ink md:text-2xl">Research Capabilities</p>

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
        <p className="font-heading text-center text-xl italic text-ink md:text-2xl">
          Training &amp; Professional Development
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:mt-10 md:grid-cols-5">
          {training.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.08 }}
              className="flex min-h-[170px] flex-col items-center border border-black/10 px-5 pt-6 text-center"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-body/70">
                {t.institution}
              </p>
              <div className="flex flex-1 flex-col items-center justify-center py-4">
                <h4 className="font-heading text-base font-semibold leading-snug text-ink">{t.title}</h4>
              </div>
              <div className="-mx-5 flex w-[calc(100%+2.5rem)] items-center justify-center bg-black py-2">
                <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-white">
                  {t.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
