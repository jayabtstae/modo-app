import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="px-4 py-6">
      <h1 className="font-display text-3xl font-semibold text-primary">Page not found</h1>
      <p className="mt-3 text-sm text-muted">The page you are looking for doesn't exist.</p>
      <Link to="/" className="mt-5 inline-block rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-accent/90">
        Back to home
      </Link>
    </div>
  );
}
