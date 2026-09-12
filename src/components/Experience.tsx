import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Section } from './Section'
import { ChemistryParticles } from './ChemistryParticles'
import { experience } from '../data/experience'

// Distance from the bottom of the viewport used as the scroll "reveal" line —
// small enough that the line/dots can always reach 100% even on a short page.
const REVEAL_MARGIN = 140

function TimelineItem({
  item,
  index,
  dotRef,
}: {
  item: (typeof experience)[number]
  index: number
  dotRef: (el: HTMLSpanElement | null) => void
}) {
  const dateOnRight = index % 2 === 0

  const date = (
    <p
      className={`font-mono hidden text-base font-bold uppercase tracking-widest text-ink md:block md:pt-1 ${
        dateOnRight ? 'md:text-left' : 'md:text-right'
      }`}
    >
      {item.period}
    </p>
  )

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <p className="font-mono text-base font-bold uppercase tracking-widest text-ink md:hidden">
        {item.period}
      </p>
      <h4 className="font-heading mt-1 text-lg font-semibold text-ink md:mt-0">{item.role}</h4>
      <p className="text-sm text-body">{item.org}</p>
      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-body">
        {item.bullets.map((b, i) => (
          <li key={i} className="pl-4 -indent-4">
            • {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )

  return (
    <li className="relative pb-10 pl-10 last:pb-0 md:grid md:grid-cols-[1fr_40px_1fr] md:items-start md:gap-x-8 md:pb-16 md:pl-0">
      {dateOnRight ? content : date}

      <span className="absolute left-0 top-1.5 md:static md:mt-1.5 md:justify-self-center">
        <span ref={dotRef} className="block h-2.5 w-2.5 rounded-full bg-line transition-colors duration-500" />
      </span>

      {dateOnRight ? date : content}
    </li>
  )
}

export function Experience() {
  const containerRef = useRef<HTMLOListElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    let raf = 0

    function measure() {
      const ol = containerRef.current
      const line = lineRef.current
      if (!ol || !line) return

      const olRect = ol.getBoundingClientRect()
      const revealLine = window.innerHeight - REVEAL_MARGIN
      const filled = Math.min(olRect.height, Math.max(0, revealLine - olRect.top))
      const fraction = olRect.height > 0 ? filled / olRect.height : 0

      line.style.transform = `scaleY(${fraction})`

      for (const dot of dotRefs.current) {
        if (!dot) continue
        const dotRect = dot.getBoundingClientRect()
        const isActive = dotRect.top - olRect.top <= filled
        dot.classList.toggle('bg-ink', isActive)
        dot.classList.toggle('bg-line', !isActive)
      }
    }

    function onScroll() {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        measure()
      })
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <Section
      id="experience"
      eyebrow="Career"
      title="Professional Experience"
      largeTitle
      centerHeader
      decorate={<ChemistryParticles color="10,10,10" dotOpacity={0.16} lineOpacity={0.07} />}
    >
      <ol ref={containerRef} className="relative">
        <span className="absolute left-[4px] top-0 h-full w-px bg-line md:left-1/2 md:-translate-x-1/2" />
        <span
          ref={lineRef}
          className="absolute left-[4px] top-0 h-full w-px origin-top bg-ink will-change-transform md:left-1/2 md:-translate-x-1/2"
          style={{ transform: 'scaleY(0)' }}
        />
        {experience.map((e, i) => (
          <TimelineItem
            key={`${e.role}-${e.period}`}
            item={e}
            index={i}
            dotRef={(el) => {
              dotRefs.current[i] = el
            }}
          />
        ))}
      </ol>
    </Section>
  )
}
