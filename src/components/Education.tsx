import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { education } from '../data/education'

function EducationEntry({ ed }: { ed: (typeof education)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.65, 1, 0.65])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.3, 1, 1, 1, 0.3])

  return (
    <div ref={ref} className="flex flex-col justify-center py-5 md:py-7">
      <motion.div style={{ scale, opacity }} className="origin-left">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
          <h3 className="font-heading text-2xl font-semibold leading-[1.1] text-ink md:text-4xl">
            {ed.degree}
          </h3>
          <p className="font-mono whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-body/70 md:text-xs">
            {ed.period}
          </p>
        </div>
        <p className="mt-2 text-sm text-body md:text-base">{ed.org}</p>
        {ed.note && (
          <p className="mt-2 line-clamp-2 max-w-xl text-xs leading-relaxed text-body/80 md:text-sm">
            {ed.note}
          </p>
        )}
      </motion.div>
    </div>
  )
}

export function Education() {
  return (
    <section id="education" className="scroll-mt-20 bg-paper">
      <div className="mx-auto w-full max-w-5xl px-6 pb-12 pt-12 md:pb-16 md:pt-16">
        <div className="text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-body">
            Education
          </p>
          <h2 className="font-heading mt-2 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Academic Background
          </h2>
        </div>

        <div className="mt-6 divide-y divide-black/10 border-t border-black/10">
          {education.map((ed) => (
            <EducationEntry key={ed.degree} ed={ed} />
          ))}
        </div>
      </div>
    </section>
  )
}
