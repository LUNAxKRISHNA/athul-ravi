import { Section } from './Section'
import { researchInterests } from '../data/research'

function ResearchCard({
  item,
  index,
}: {
  item: (typeof researchInterests)[number]
  index: number
}) {
  const direction: 'down' | 'up' = index % 2 === 0 ? 'down' : 'up'

  return (
    <div className="group relative isolate min-h-[320px] overflow-hidden bg-paper sm:min-h-[380px] lg:min-h-[460px]">
      <span
        className={`absolute inset-x-0 h-full scale-y-0 bg-black transition-transform duration-500 ease-out group-hover:scale-y-100 ${direction === 'down' ? 'top-0 origin-top' : 'bottom-0 origin-bottom'
          }`}
      />

      <span
        aria-hidden="true"
        className="font-heading pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 text-7xl font-bold leading-none text-black/[0.07] transition-colors duration-300 group-hover:text-white/15 sm:text-8xl"
      >
        {index + 1}
      </span>

      <h3
        className="font-heading absolute inset-x-0 px-5 text-center text-lg font-semibold leading-snug text-white"
        style={{ top: '50%', mixBlendMode: 'difference' }}
      >
        {item.title}
      </h3>
      <p className="absolute inset-x-0 px-5 text-center text-xs font-normal leading-relaxed text-body transition-colors duration-300 group-hover:text-white/60" style={{ top: '70%' }}>
        {item.description}
      </p>
    </div>
  )
}

export function Research() {
  return (
    <Section id="research" eyebrow="Personal" title="Research Interests" centerHeader wide tightTop>
      <div className="grid grid-cols-2 divide-x divide-y divide-black/10 border border-black/10 sm:grid-cols-3 lg:grid-cols-6">
        {researchInterests.map((r, i) => (
          <ResearchCard key={r.id} item={r} index={i} />
        ))}
      </div>
    </Section>
  )
}
