import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Section } from './Section'
import { researchInterests } from '../data/research'

function ResearchCard({
  item,
  index,
}: {
  item: (typeof researchInterests)[number]
  index: number
}) {
  const direction: 'down' | 'up' = index % 2 === 0 ? 'down' : 'up'
  const origin = direction === 'down' ? 'top' : 'bottom'

  const [introPlaying, setIntroPlaying] = useState(false)

  useEffect(() => {
    // Cards sit above the fold on entry, so trigger on mount directly rather
    // than via useInView/IntersectionObserver — a plain timer is immediate
    // and deterministic instead of depending on the observer firing promptly.
    // Wait out the Section's own fade-in (500ms) first, so the fill sweep is
    // clearly visible rather than half-hidden behind the parent's opacity.
    const id = setTimeout(() => setIntroPlaying(true), 550 + index * 150)
    return () => clearTimeout(id)
  }, [index])

  const filled = introPlaying

  return (
    <div className="group relative isolate min-h-[320px] overflow-hidden bg-paper sm:min-h-[380px] lg:min-h-[460px]">
      {introPlaying ? (
        <motion.div
          className={`absolute inset-x-0 bg-black ${direction === 'down' ? 'top-0' : 'bottom-0'}`}
          style={{ transformOrigin: origin }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1, ease: 'easeInOut', times: [0, 0.55, 1] }}
          onAnimationComplete={() => setIntroPlaying(false)}
        />
      ) : (
        <span
          className={`absolute inset-x-0 h-full scale-y-0 bg-black transition-transform duration-500 ease-out group-hover:scale-y-100 ${
            direction === 'down' ? 'top-0 origin-top' : 'bottom-0 origin-bottom'
          }`}
        />
      )}

      <span
        aria-hidden="true"
        className={`font-heading pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 text-7xl font-bold leading-none transition-colors duration-300 sm:text-8xl ${
          filled ? 'text-white/15' : 'text-black/[0.07] group-hover:text-white/15'
        }`}
      >
        {index + 1}
      </span>

      <h3
        className="font-heading absolute inset-x-0 px-5 text-center text-lg font-semibold leading-snug text-white"
        style={{ top: '50%', mixBlendMode: 'difference' }}
      >
        {item.title}
      </h3>
      <p
        className="absolute inset-x-0 px-5 text-center text-xs leading-relaxed text-white"
        style={{ top: '70%', mixBlendMode: 'difference' }}
      >
        {item.description}
      </p>
    </div>
  )
}

export function Research() {
  return (
    <Section id="research" eyebrow="Research" title="Research Interests" centerHeader wide>
      <div className="grid grid-cols-2 divide-x divide-y divide-black/10 border border-black/10 sm:grid-cols-3 lg:grid-cols-6">
        {researchInterests.map((r, i) => (
          <ResearchCard key={r.id} item={r} index={i} />
        ))}
      </div>
    </Section>
  )
}
