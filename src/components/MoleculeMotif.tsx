export function MoleculeMotif({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.4" opacity="0.35">
        <line x1="60" y1="60" x2="150" y2="40" />
        <line x1="150" y1="40" x2="220" y2="90" />
        <line x1="220" y1="90" x2="320" y2="60" />
        <line x1="150" y1="40" x2="140" y2="130" />
        <line x1="140" y1="130" x2="60" y2="170" />
        <line x1="140" y1="130" x2="230" y2="170" />
        <line x1="230" y1="170" x2="320" y2="140" />
        <line x1="230" y1="170" x2="250" y2="250" />
      </g>
      <g fill="currentColor">
        <circle cx="60" cy="60" r="6" opacity="0.5" />
        <circle cx="150" cy="40" r="8" opacity="0.7" />
        <circle cx="220" cy="90" r="6" opacity="0.5" />
        <circle cx="320" cy="60" r="7" opacity="0.6" />
        <circle cx="140" cy="130" r="8" opacity="0.7" />
        <circle cx="60" cy="170" r="6" opacity="0.5" />
        <circle cx="230" cy="170" r="8" opacity="0.7" />
        <circle cx="320" cy="140" r="6" opacity="0.5" />
        <circle cx="250" cy="250" r="7" opacity="0.6" />
      </g>
    </svg>
  )
}
