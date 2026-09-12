import { Section } from './Section'
import { profile } from '../data/profile'

export function Contact() {
  return (
    <Section id="contact" eyebrow="Get in Touch" title="Contact">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3 text-sm text-body">
          <p>
            <span className="font-medium text-ink">Email:</span>{' '}
            <a href={`mailto:${profile.email}`} className="text-ink underline underline-offset-2">
              {profile.email}
            </a>
          </p>
          <p>
            <span className="font-medium text-ink">Institution:</span> {profile.institution}
          </p>
          <p className="leading-relaxed">{profile.affiliationNote}</p>
        </div>

        <div>
          <a
            href={profile.cvFile}
            download
            className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
          >
            Download Full CV (PDF)
          </a>
          <div className="mt-5 flex flex-wrap gap-3">
            {profile.profiles.map((p) => (
              <a
                key={p.label}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-4 py-2 text-xs text-body transition-colors hover:border-black hover:text-ink"
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
