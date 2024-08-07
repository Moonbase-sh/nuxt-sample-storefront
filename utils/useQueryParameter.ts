// This is a very simple composable to get a query parameter,
// in your Nuxt projects, you probably have a router installed
// which can do the same out of the box.
export function useQueryParameter(parameter: string) {
  const query = new URLSearchParams(window.location.search)
  const value = query.get(parameter)
  if (!value)
    throw new Error(`Missing query parameter '${parameter}'`)
  return value
}
