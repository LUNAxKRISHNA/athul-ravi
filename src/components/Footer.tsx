import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-8 text-center text-xs text-body">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </div>
    </footer>
  )
}
