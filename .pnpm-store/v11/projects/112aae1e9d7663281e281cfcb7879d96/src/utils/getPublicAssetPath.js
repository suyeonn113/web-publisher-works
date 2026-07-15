export function getPublicAssetPath(path) {
  if (!path || !path.startsWith('/')) return path

  const base = import.meta.env.BASE_URL

  if (path.startsWith(base)) return path

  return `${base}${path.replace(/^\/+/, '')}`
}