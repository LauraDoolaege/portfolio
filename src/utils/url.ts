// Joins an app-root-relative path onto import.meta.env.BASE_URL, whose
// trailing slash isn't guaranteed across Astro config combinations.
// Use this for every internal href/src instead of a bare "/path".
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
