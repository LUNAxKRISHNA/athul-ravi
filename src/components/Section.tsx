import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Section({
  id,
  title,
  eyebrow,
  children,
  alt,
}: {
  id: string
  title: string
  eyebrow?: string
  children: ReactNode
  alt?: boolean
}) {
  return (
    <section id={id} className={`scroll-mt-20 ${alt ? 'bg-paper-alt' : ''}`}>
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {eyebrow && (
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
              {eyebrow}
            </p>
          )}
          <h2 className="font-heading text-3xl font-medium text-ink md:text-4xl">{title}</h2>
          <div className="mt-10">{children}</div>
        </motion.div>
      </div>
    </section>
  )
}
