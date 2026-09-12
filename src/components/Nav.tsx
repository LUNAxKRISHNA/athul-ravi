import { useState } from 'react'
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

export function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-3xl flex-col items-center">
        <nav className="nav-glass flex items-center justify-center rounded-full p-2">
          <ul className="hidden gap-1.5 md:flex">
            {links.map((l) => {
              const active = isLinkActive(pathname, l.to)
              return (
                <li key={l.to} className="relative">
                  {active && (
                    <motion.div
                      layoutId="nav-active-pill"
                      transition={pillTransition}
                      className="absolute inset-0 rounded-full bg-black"
                    />
                  )}
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
          <ul className="nav-glass mt-2 flex min-w-[180px] flex-col gap-1 rounded-3xl p-2 md:hidden">
            {links.map((l) => {
              const active = isLinkActive(pathname, l.to)
              return (
                <li key={l.to} className="relative">
                  {active && (
                    <motion.div
                      layoutId="nav-active-pill-mobile"
                      transition={pillTransition}
                      className="absolute inset-0 rounded-2xl bg-black"
                    />
                  )}
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
