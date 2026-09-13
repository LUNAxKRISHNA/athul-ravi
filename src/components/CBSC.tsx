import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Section } from './Section'
import { CountUpNumber } from './CountUpNumber'
import {
  cbscFacts,
  cbscOutputMetrics,
  cbscVision,
  cbscResearchFocus,
  cbscViews,
  cbscEquipment,
} from '../data/cbsc'

// Typewriter-style reveal: each word starts grey and inks black in reading
// order, one after another from the first word, rather than a single sweep
// across the whole block (which reveals every line at once instead of
// progressing word by word).
function TypewriterReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <p className={`text-base leading-relaxed md:text-lg ${className ?? ''}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ color: '#6e6e73' }}
          animate={{ color: '#0a0a0a' }}
          transition={{ duration: 0.15, delay: 0.4 + i * 0.09, ease: 'easeOut' }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </p>
  )
}

function FactColumn({
  label,
  facts,
}: {
  label?: string
  facts: { number: string; label: string; note?: string }[]
}) {
  return (
    <div className="flex h-full flex-col">
      {label && (
        <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-body">{label}</p>
      )}
      <div className={`flex flex-1 flex-col justify-between gap-6 ${label ? 'mt-6' : ''}`}>
        {facts.map((f) => (
          <div key={f.label} className="text-center">
            <span className="mx-auto block h-0.5 w-8 bg-black/25" />
            <span className="font-heading mt-4 block text-3xl font-bold leading-none text-ink md:text-4xl">
              <CountUpNumber value={f.number} />
            </span>
            <p className="mt-3 font-mono text-[10px] uppercase leading-snug tracking-widest text-body md:text-xs">
              {f.label}
            </p>
            {f.note && <p className="mt-1.5 text-xs text-body/70">{f.note}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

function LabViewsCrossfade({ photos }: { photos: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), 3500)
    return () => clearInterval(id)
  }, [photos.length])

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)',
      }}
    >
      <AnimatePresence>
        <motion.img
          key={photos[index]}
          src={photos[index]}
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  )
}

function FocusCard({ item, index }: { item: (typeof cbscResearchFocus)[number]; index: number }) {
  return (
    <div className="group relative isolate overflow-hidden border-t border-black/10 bg-paper first:border-t-0">
      <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-black transition-transform duration-500 ease-out group-hover:scale-x-100" />
      <div className="relative flex items-start gap-8 py-7 pl-4 md:gap-12 md:pl-6">
        <span className="font-heading shrink-0 text-5xl font-bold leading-none text-black/10 transition-colors duration-300 group-hover:text-white/15 md:text-6xl">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h4
            className="font-heading text-lg font-semibold leading-snug text-white"
            style={{ mixBlendMode: 'difference' }}
          >
            {item.term}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-body transition-colors duration-300 group-hover:text-white/60">
            {item.detail}
          </p>
        </div>
      </div>
    </div>
  )
}

function PhotoMarquee({ photos, cardClassName, duration }: { photos: string[]; cardClassName: string; duration: number }) {
  return (
    <div
      className="marquee-row relative overflow-hidden py-20"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0, black 64px, black calc(100% - 64px), transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0, black 64px, black calc(100% - 64px), transparent 100%)',
      }}
    >
      <div className="marquee-track flex w-max gap-4" style={{ animationDuration: `${duration}s` }}>
        {[...photos, ...photos].map((src, i) => (
          <div
            key={i}
            className={`relative shrink-0 overflow-hidden border border-black/10 bg-paper transition-transform duration-300 ease-out hover:z-10 hover:scale-150 hover:shadow-xl ${cardClassName}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CBSC() {
  return (
    <Section
      id="cbsc"
      eyebrow="The Centre"
      title="Centre for Biomaterials and Sustainable Chemistry"
      centerHeader
      largeTitle
      wide
      tightTop
      tightBottom
    >
      <div className="grid gap-8 md:grid-cols-[1fr_1.8fr_1fr] md:items-stretch md:gap-6">
        <FactColumn label="At a Glance" facts={cbscFacts} />
        <div className="min-h-[260px]">
          <LabViewsCrossfade photos={cbscViews} />
        </div>
        <FactColumn label="Research Output" facts={cbscOutputMetrics} />
      </div>

      <TypewriterReveal
        text={cbscVision}
        className="mx-auto mt-6 max-w-4xl text-center"
      />

      <div className="mt-16 md:mt-20">
        <p className="font-heading text-center text-xl italic text-ink md:text-2xl">Equipment &amp; Instrumentation</p>
        <div className="mt-8 md:mt-10">
          <PhotoMarquee photos={cbscEquipment} cardClassName="h-72 w-40 md:h-80 md:w-44" duration={40} />
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <p className="font-heading text-center text-xl italic text-ink md:text-2xl">Research Focus</p>
        <div className="mt-8 grid grid-cols-1 md:mt-10 md:grid-cols-2 md:divide-x md:divide-black/10">
          <div className="md:pr-4">
            {cbscResearchFocus.slice(0, 3).map((f, i) => (
              <FocusCard key={f.term} item={f} index={i} />
            ))}
          </div>
          <div className="md:pl-4">
            {cbscResearchFocus.slice(3, 6).map((f, i) => (
              <FocusCard key={f.term} item={f} index={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
