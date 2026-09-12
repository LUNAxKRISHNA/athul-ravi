import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { profile } from '../data/profile'
import { ChemistryParticles } from './ChemistryParticles'

function splitFirst(str: string) {
  const idx = str.indexOf(',')
  if (idx === -1) return [str.trim(), '']
  return [str.slice(0, idx).trim(), str.slice(idx + 1).trim()]
}

function useTypewriter(text: string, start: boolean, speed = 45) {
  const [output, setOutput] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!start) return
    let i = 0
    const id = setInterval(() => {
      i++
      setOutput(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(id)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(id)
  }, [start, text, speed])

  return { output, done }
}

function FillLink({
  href,
  label,
  autoPlay,
  autoPlayDelay = 0,
  variant = 'row',
}: {
  href: string
  label: string
  autoPlay: boolean
  autoPlayDelay?: number
  variant?: 'row' | 'inline'
}) {
  const [introPlaying, setIntroPlaying] = useState(false)
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    if (!autoPlay || introDone) return
    const id = setTimeout(() => setIntroPlaying(true), autoPlayDelay * 1000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay])

  const isRow = variant === 'row'
  const filled = introPlaying

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex items-center gap-2 transition-colors ${
        isRow ? 'w-full px-4 py-3.5 text-lg' : 'inline-flex w-fit px-3 py-1.5 text-sm'
      }`}
    >
      {introPlaying ? (
        <motion.span
          className="absolute inset-0 origin-left bg-black"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 0.8, ease: 'easeInOut', times: [0, 0.55, 1] }}
          onAnimationComplete={() => {
            setIntroPlaying(false)
            setIntroDone(true)
          }}
        />
      ) : (
        <span className="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
      )}
      <span
        className={`font-heading relative transition-colors duration-300 ${
          filled ? 'text-white' : 'text-ink group-hover:text-white'
        }`}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className={`relative transition-colors duration-300 ${
          filled ? 'text-white' : 'text-body group-hover:text-white'
        }`}
      >
        ↗
      </span>
    </a>
  )
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { output: emailText, done: emailDone } = useTypewriter(profile.email, inView, 40)

  const [institutionName, institutionLocation] = splitFirst(profile.institution)
  const [doctoralName, doctoralLocation] = splitFirst(
    profile.affiliationNote.replace(/^Doctoral Research Scholar,\s*/, ''),
  )

  return (
    <section id="contact" ref={sectionRef} className="relative scroll-mt-20 overflow-hidden">
      <ChemistryParticles color="10,10,10" dotOpacity={0.16} lineOpacity={0.07} />
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-body">
                Get in Touch
              </p>
              <h2 className="font-heading mt-2 text-5xl font-bold tracking-tight text-ink md:text-6xl">
                Contact
              </h2>
            </div>
            <p className="font-mono whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-body/70">
              Ideas for a brighter tomorrow <span className="ml-2">——</span>
            </p>
          </div>

          <div className="mt-6 border-t border-black/10" />

          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-0">
            <div className="md:pr-24">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-body">
                Contact
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="font-heading mt-2 inline-flex items-baseline text-2xl font-semibold text-ink transition-opacity hover:opacity-70 md:text-3xl"
              >
                {emailText}
                <span
                  className={`ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[0.1em] bg-ink ${
                    inView ? 'animate-[blink-caret_1s_step-end_infinite]' : 'opacity-0'
                  }`}
                />
              </a>

              <div className="-ml-3 mt-3">
                <FillLink
                  href={profile.linkedin}
                  label="Connect on LinkedIn"
                  variant="inline"
                  autoPlay={emailDone}
                  autoPlayDelay={0.3}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={emailDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
              >
                <p className="mt-6 text-body/50">—</p>
                <div className="mt-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-body/70">
                    Academic Affiliation
                  </p>
                  <a
                    href="https://www.cvv.ac.in/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-heading mt-1.5 inline-block text-lg font-semibold text-ink underline decoration-transparent underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    {institutionName}
                  </a>
                  <p className="text-sm text-body">{institutionLocation}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={emailDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.7 }}
              >
                <p className="mt-6 text-body/50">—</p>
                <div className="mt-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-body/70">
                    Doctoral Research
                  </p>
                  <a
                    href="https://www.amrita.edu/campus/coimbatore/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-heading mt-1.5 inline-block text-lg font-semibold text-ink underline decoration-transparent underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    {doctoralName}
                  </a>
                  <p className="text-sm text-body">{doctoralLocation}</p>
                </div>
              </motion.div>
            </div>

            <div className="md:border-l md:border-black/10 md:pl-24">
              <a
                href={profile.cvFile}
                download
                className="font-heading inline-flex w-full items-center gap-3 bg-black px-6 py-4 text-lg text-white transition-opacity hover:opacity-85"
              >
                Download Full CV <span aria-hidden="true">↗</span>
              </a>

              <p className="mt-10 font-mono text-xs font-medium uppercase tracking-[0.2em] text-body">
                Academic Profiles
              </p>
              <div className="mt-4 -mx-4 divide-y divide-black/10 border-t border-black/10">
                {profile.profiles.map((p, i) => (
                  <FillLink
                    key={p.label}
                    href={p.url}
                    label={p.label}
                    variant="row"
                    autoPlay={emailDone}
                    autoPlayDelay={1 + i * 0.18}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
