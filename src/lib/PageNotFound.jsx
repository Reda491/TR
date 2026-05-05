import { Link, useLocation } from 'react-router-dom'

export default function PageNotFound() {
  const location = useLocation()

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-7xl font-light text-slate-300">404</h1>
        <h2 className="text-2xl font-medium text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground leading-relaxed">
          The page <span className="font-medium text-foreground">"{location.pathname}"</span> could not be found.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-secondary transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}