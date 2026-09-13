import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Section } from './Section'
import { activities } from '../data/activities'

export function Activities() {
  return (
    <Section id="activities" eyebrow="Engagement" title="Activities & Events" centerHeader>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="scrollbar-hide -mx-6 overflow-x-auto px-6 pb-2"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)',
        }}
      >
        <div
          className="grid snap-x snap-mandatory gap-x-10"
          style={{
            gridTemplateColumns: `repeat(${activities.length}, 14rem)`,
            gridTemplateRows: 'auto auto auto',
          }}
        >
          <span
            className="pointer-events-none z-0 h-px self-center bg-line"
            style={{ gridRow: 2, gridColumn: `1 / span ${activities.length}` }}
          />
          {activities.map((a, i) => (
            <Fragment key={`${a.event}-${a.year}`}>
              <div
                className="flex snap-start flex-col items-center justify-end pb-6 text-center"
                style={{ gridRow: 1, gridColumn: i + 1 }}
              >
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-body/70">
                  {a.role}
                </p>
                <h4 className="font-heading mt-1.5 text-base font-semibold leading-snug text-ink">{a.event}</h4>
              </div>

              <span
                className="z-10 h-3 w-3 justify-self-center self-center rounded-full border-2 border-ink bg-paper"
                style={{ gridRow: 2, gridColumn: i + 1 }}
              />

              <div className="pt-6 text-center" style={{ gridRow: 3, gridColumn: i + 1 }}>
                <p className="font-mono text-sm font-bold tracking-widest text-ink">{a.year}</p>
                <p className="mt-1 text-xs text-body">{a.org}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}
