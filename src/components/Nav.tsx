import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/research', label: 'Research' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
]

function isLinkActive(pathname: string, to: string) {
  return to === '/' ? pathname === '/' : pathname.startsWith(to)
}

const pillTransition = { type: 'spring' as const, stiffness: 380, damping: 32, mass: 0.9 }

type PillRect = { offset: number; size: number }

// A manually-measured sliding pill instead of framer-motion's `layoutId` projection.
// `layoutId` measures position via getBoundingClientRect and — since this nav is
// `position: fixed` — framer incorrectly compensates for the page's scroll offset,
// making the pill appear to fly in from wherever the page happened to be scrolled to.
// Measuring offsets ourselves relative to the pill's own (non-scrolling) container
// sidesteps that entirely.
function useActivePillRect(
  itemRefs: React.RefObject<Record<string, HTMLElement | null>>,
  activeTo: string | undefined,
  axis: 'x' | 'y',
) {
  const [rect, setRect] = useState<PillRect | null>(null)

  useEffect(() => {
    function measure() {
      const el = activeTo ? itemRefs.current[activeTo] : null
      if (!el) {
        setRect(null)
        return
      }
      setRect(
        axis === 'x'
          ? { offset: el.offsetLeft, size: el.offsetWidth }
          : { offset: el.offsetTop, size: el.offsetHeight },
      )
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeTo, axis, itemRefs])

  return rect
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const desktopItemRefs = useRef<Record<string, HTMLLIElement | null>>({})
  const activeDesktop = links.find((l) => isLinkActive(pathname, l.to))?.to
  const desktopPill = useActivePillRect(desktopItemRefs, activeDesktop, 'x')

  const mobileItemRefs = useRef<Record<string, HTMLLIElement | null>>({})
  const activeMobile = open ? links.find((l) => isLinkActive(pathname, l.to))?.to : undefined
  const mobilePill = useActivePillRect(mobileItemRefs, activeMobile, 'y')

  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-3xl flex-col items-center">
        <nav className="nav-glass flex items-center justify-center rounded-full p-2">
          <ul className="relative hidden gap-1.5 md:flex">
            {desktopPill && (
              <motion.div
                animate={{ x: desktopPill.offset }}
                transition={pillTransition}
                style={{ width: desktopPill.size, willChange: 'transform' }}
                className="absolute inset-y-0 left-0 top-0 rounded-full bg-black"
              />
            )}
            {links.map((l) => {
              const active = isLinkActive(pathname, l.to)
              return (
                <li
                  key={l.to}
                  ref={(el) => {
                    desktopItemRefs.current[l.to] = el
                  }}
                  className="relative"
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={`relative z-10 block rounded-full px-4 py-2 text-sm transition-colors ${
                      active ? 'font-medium text-white' : 'text-black hover:bg-black/5'
                    }`}
                  >
                    {l.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>

          <button
            aria-label="Toggle menu"
            className="rounded-full p-2 text-black md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </nav>

        {open && (
          <ul className="nav-glass relative mt-2 flex min-w-[180px] flex-col gap-1 rounded-3xl p-2 md:hidden">
            {mobilePill && (
              <motion.div
                animate={{ y: mobilePill.offset }}
                transition={pillTransition}
                style={{ height: mobilePill.size, willChange: 'transform' }}
                className="absolute inset-x-0 top-0 left-0 rounded-2xl bg-black"
              />
            )}
            {links.map((l) => {
              const active = isLinkActive(pathname, l.to)
              return (
                <li
                  key={l.to}
                  ref={(el) => {
                    mobileItemRefs.current[l.to] = el
                  }}
                  className="relative"
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    onClick={() => setOpen(false)}
                    className={`relative z-10 block rounded-2xl px-4 py-2.5 text-sm transition-colors ${
                      active ? 'font-medium text-white' : 'text-black'
                    }`}
                  >
                    {l.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </header>
  )
}
