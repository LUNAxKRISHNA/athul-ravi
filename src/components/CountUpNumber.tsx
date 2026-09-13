import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Splits off a single leading/trailing non-digit run so values like "1st",
// "₹81L" or "02" can have just their numeric core counted up, while padding
// back to the original digit width (so "02" animates 00 -> 02, not 0 -> 2).
const NUMERIC = /^(\D*)(\d+)(\D*)$/

export function CountUpNumber({ value, duration = 1200 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const match = value.match(NUMERIC)
  const [display, setDisplay] = useState(match ? `${match[1]}${'0'.repeat(match[2].length)}${match[3]}` : value)

  useEffect(() => {
    if (!inView || !match) return
    const [, prefix, digits, suffix] = match
    const target = parseInt(digits, 10)
    const start = performance.now()

    let raf = 0
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.round(eased * target)
      setDisplay(`${prefix}${String(current).padStart(digits.length, '0')}${suffix}`)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return <span ref={ref}>{display}</span>
}
