// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
  ],

  ssr: true,

  runtimeConfig: {
    geminiApiKey: '', // env: NUXT_GEMINI_API_KEY (server-only)
    public: {
      dataMode: 'mock', // 'mock' | 'official' — env: NUXT_PUBLIC_DATA_MODE
      sigcdmxBaseUrl: 'https://sig.cdmx.gob.mx/geoserver/ows',
      simatBaseUrl: 'http://datosabiertos.aire.cdmx.gob.mx:8080/opendata',
      sedemaBaseUrl: 'https://datos.cdmx.gob.mx',
      apiBaseUrl: 'http://localhost:3003/api/v1', // env: NUXT_PUBLIC_API_BASE_URL
      observatory: 'techos-verdes',
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Observatorio de Techos Verdes CDMX',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: 'description',
          content:
            'Plataforma de monitoreo y priorización de techos verdes en la Ciudad de México. Visualización geoespacial, análisis de aptitud y validación con inteligencia artificial.',
        },
        {
          name: 'keywords',
          content:
            'techos verdes, CDMX, Ciudad de México, infraestructura verde, sustentabilidad, isla de calor, medio ambiente, observatorio',
        },
        { name: 'author', content: 'Observatorio de Techos Verdes CDMX' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'Observatorio de Techos Verdes CDMX',
        },
        {
          property: 'og:description',
          content:
            'Plataforma de monitoreo y priorización de techos verdes en la Ciudad de México.',
        },
        { property: 'og:locale', content: 'es_MX' },
        { name: 'theme-color', content: '#0E5E3A' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },

  tailwindcss: {
    configPath: 'tailwind.config.ts',
    cssPath: '~/assets/css/main.css',
    exposeConfig: false,
    viewer: true,
  },

  routeRules: {
    '/admin/**': { ssr: false },
  },

  compatibilityDate: '2025-03-01',
})
