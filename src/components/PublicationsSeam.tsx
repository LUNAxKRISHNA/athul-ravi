import { smoothGradientTo } from '../lib/smoothGradient'

// Dedicated transition layer between the warm-white Research section and the
// pure-black Publications section. No overlap/negative-margin trick is needed
// here (unlike the Home page seams) because the section above is flat
// warm-white already, so a plain in-flow gradient block reads seamlessly
// against it.
export function PublicationsSeam() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none h-[160px] w-full md:h-[180px]"
      style={{ background: smoothGradientTo('#000000') }}
    />
  )
}
