import { createStorefront } from '@moonbase.sh/vue'

export default defineNuxtPlugin(async (nuxtApp) => {
  const storefront = createStorefront(
    'https://demo.moonbase.sh',
    (key, state) => useState(key, () => state),
  )

  // Necessary to load the relevant context server-side
  // eslint-disable-next-line node/prefer-global/process
  if (process.server)
    await storefront.updateStorefront()

  nuxtApp.vueApp.use(storefront)
})
