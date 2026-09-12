import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Section } from './Section'
import { experience } from '../data/experience'

// Distance from the bottom of the viewport used as the scroll "reveal" line —
// small enough that the line/dots can always reach 100% even on a short page.
const REVEAL_MARGIN = 140

function TimelineItem({
  item,
  index,
  active,
  dotRef,
}: {
  item: (typeof experience)[number]
  index: number
  active: boolean
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

      <span ref={dotRef} className="absolute left-0 top-1.5 md:static md:mt-1.5 md:justify-self-center">
        <span
          className={`block h-2.5 w-2.5 rounded-full transition-colors duration-500 ${
            active ? 'bg-ink' : 'bg-line'
          }`}
        />
      </span>

      {dateOnRight ? date : content}
    </li>
  )
}

export function Experience() {
  const containerRef = useRef<HTMLOListElement>(null)
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [lineHeight, setLineHeight] = useState(0)
  const [activeSet, setActiveSet] = useState<boolean[]>(() => experience.map(() => false))

  useEffect(() => {
    let raf = 0

    function measure() {
      const ol = containerRef.current
      if (!ol) return
      const olRect = ol.getBoundingClientRect()
      const revealLine = window.innerHeight - REVEAL_MARGIN
      const filled = Math.min(olRect.height, Math.max(0, revealLine - olRect.top))
      setLineHeight(filled)
      setActiveSet(
        dotRefs.current.map((dot) => {
          if (!dot) return false
          const dotRect = dot.getBoundingClientRect()
          return dotRect.top - olRect.top <= filled
        }),
      )
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
    <Section id="experience" eyebrow="Career" title="Professional Experience" largeTitle centerHeader>
      <ol ref={containerRef} className="relative">
        <span className="absolute left-[4px] top-0 h-full w-px bg-line md:left-1/2 md:-translate-x-1/2" />
        <span
          className="absolute left-[4px] top-0 w-px origin-top bg-ink transition-[height] duration-150 ease-out md:left-1/2 md:-translate-x-1/2"
          style={{ height: lineHeight }}
        />
        {experience.map((e, i) => (
          <TimelineItem
            key={`${e.role}-${e.period}`}
            item={e}
            index={i}
            active={activeSet[i]}
            dotRef={(el) => {
              dotRefs.current[i] = el
            }}
          />
        ))}
      </ol>
    </Section>
  )
}
