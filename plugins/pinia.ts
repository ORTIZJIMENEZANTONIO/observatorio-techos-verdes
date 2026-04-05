/**
 * Pinia plugin registration for Nuxt 3.
 *
 * The @pinia/nuxt module (configured in nuxt.config.ts) auto-registers Pinia
 * with the Nuxt app, so manual plugin setup is NOT required.
 *
 * This file is kept as a lightweight extension point: any custom Pinia plugins
 * (e.g. persistence, logging, devtools enhancements) can be added here and
 * they will be picked up automatically by Nuxt's plugin auto-import.
 */
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(({ $pinia }) => {
  // Example: add a custom plugin that logs every action in development
  // Action logging disabled to reduce console noise.
  // Uncomment to re-enable:
  // if (import.meta.dev) { ... }
})
