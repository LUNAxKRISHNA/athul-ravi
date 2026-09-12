import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { MoleculeMotif } from './MoleculeMotif'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <MoleculeMotif className="pointer-events-none absolute -right-20 -top-16 hidden h-[420px] w-[420px] text-accent sm:block md:-right-8" />
      <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-24 md:pb-28 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            {profile.subtitle}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-medium leading-tight text-ink md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-body md:text-xl">{profile.title}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-body md:text-lg">
            {profile.focusLine}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#research"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
            >
              View Research
            </a>
            <a
              href={profile.cvFile}
              download
              className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
