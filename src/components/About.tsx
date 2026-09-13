import { Link } from 'react-router-dom'
import { Section } from './Section'
import { profile } from '../data/profile'

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Professional Summary" centerHeader largeTitle>
      <div className="flex flex-col gap-8 md:flex-row md:items-stretch">
        <div className="md:flex-1">
          <p className="text-base leading-relaxed text-body md:text-lg">{profile.summary}</p>

          <div className="mt-8">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
            >
              Contact
              <span aria-hidden="true" className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="shrink-0 md:w-80 lg:w-96">
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            className="h-64 w-full rounded-2xl object-cover shadow-sm md:h-full"
          />
        </div>
      </div>
    </Section>
  )
}
