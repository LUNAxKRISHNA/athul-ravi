import { smoothGradientTo } from '../lib/smoothGradient'

export function SectionSeam({ to }: { to: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative z-[1] -mt-12 h-12 w-full md:-mt-20 md:h-20"
      style={{ background: smoothGradientTo(to) }}
    />
  )
}
