import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { FluidBackground } from './FluidBackground'
import { ChemistryParticles } from './ChemistryParticles'

export function Hero() {
  const scrollToNext = () => {
    const next = document.getElementById('about')
    next?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="top"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
      style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.05), rgba(0,0,0,1) 70%)',
      }}
    >
      <FluidBackground />
      <ChemistryParticles />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-8xl"
          style={{ fontFamily: "'Fahkwang', ui-sans-serif, sans-serif" }}
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.35 }}
          className="mt-5 text-lg font-light tracking-wide text-white/70 md:text-xl"
        >
          {profile.title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.5 }}
          className="mt-2 max-w-xl text-sm font-light tracking-wide text-white/50 md:text-base"
        >
          {profile.subtitle}
        </motion.p>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50 transition-colors hover:text-white/80"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 4v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </section>
  )
}
