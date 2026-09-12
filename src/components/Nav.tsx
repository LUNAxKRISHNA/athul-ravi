import { useEffect, useState } from 'react'

const links = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'experience', label: 'Experience' },
  { id: 'publications', label: 'Publications' },
  { id: 'grants', label: 'Grants' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export function Nav() {
  const [active, setActive] = useState('about')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-heading text-lg font-medium text-ink">
          Athul Ravi
        </a>

        <ul className="hidden gap-7 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`text-sm transition-colors ${
                  active === l.id ? 'text-accent font-medium' : 'text-body hover:text-ink'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle menu"
          className="text-ink md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-line/70 px-6 py-4 md:hidden">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={`block py-2 text-sm ${
                  active === l.id ? 'text-accent font-medium' : 'text-body'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
