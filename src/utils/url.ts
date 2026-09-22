// Joins an app-root-relative path onto import.meta.env.BASE_URL, whose
// trailing slash isn't guaranteed across Astro config combinations.
// Use this for every internal href/src instead of a bare "/path".
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  // trailingSlash: 'never' (astro.config.mjs) means every emitted route is
  // canonically slash-free, including the homepage itself — but joining
  // base + "/" for the root path produced "<base>/" (an extra trailing
  // slash beyond the base), which doesn't match that emitted route and
  // broke every link to the homepage (Header's logo, About's back-link).
  // "/about" and friends were never affected since they don't end in "/"
  // to begin with; root is the one path where normalizedPath is just "/".
  if (normalizedPath === '/') return base || '/';
  return `${base}${normalizedPath}`;
}
