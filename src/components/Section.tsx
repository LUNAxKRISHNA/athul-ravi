import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Section({
  id,
  title,
  eyebrow,
  children,
  alt,
  centerHeader,
  largeTitle,
}: {
  id: string
  title: string
  eyebrow?: string
  children: ReactNode
  alt?: boolean
  centerHeader?: boolean
  largeTitle?: boolean
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
          <div className={centerHeader ? 'text-center' : ''}>
            {eyebrow && (
              <p className="font-mono mb-2 text-sm font-semibold uppercase tracking-widest text-body">
                {eyebrow}
              </p>
            )}
            <h2
              className={`font-heading font-bold tracking-tight text-ink ${
                largeTitle ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
              }`}
            >
              {title}
            </h2>
          </div>
          <div className="mt-6 border-t border-black/10" />
          <div className="mt-10">{children}</div>
        </motion.div>
      </div>
    </section>
  )
}
