// A linear alpha ramp reads as having a harsh edge at each end (the eye is very
// sensitive to a fade "starting" or "stopping" abruptly). These stops follow a
// smoothstep curve (3t^2 - 2t^3) instead of a straight line, so the fade eases
// in and out rather than cutting on/off — this is what makes a color blend
// read as soft instead of banded.
function hexToRgb(hex: string) {
  const clean = hex.replace('#', '')
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean
  const num = parseInt(full, 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

export function smoothGradientTo(to: string, steps = 10) {
  const { r, g, b } = hexToRgb(to)
  const stops = Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps
    const eased = 3 * t * t - 2 * t * t * t
    return `rgba(${r},${g},${b},${eased.toFixed(3)}) ${(t * 100).toFixed(1)}%`
  }).join(', ')
  return `linear-gradient(to bottom, ${stops})`
}
