import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
      <Seo
        title="Page Not Found — Athul Ravi"
        description="The page you're looking for doesn't exist or may have moved."
        path="/404"
        noindex
      />
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-body">Error 404</p>
      <h1 className="font-heading mt-4 text-7xl font-bold leading-none text-ink md:text-9xl">404</h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-body md:text-lg">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
      >
        Back to Home
        <span aria-hidden="true" className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  )
}
