// Inyecta Cache-Control en respuestas de archivos estáticos sin tener que
// declarar `nitro.publicAssets` (cuya configuración con baseURL específicos
// rompe el serving de /public en dev).
//
// Patrón: hookeamos `beforeResponse` y, si la ruta cae en alguno de los
// prefijos cacheables, sobrescribimos el header.
//
// Lo aplicamos sólo cuando la respuesta es 200 OK y NO tenemos ya un
// Cache-Control distinto (respetamos cualquier override deliberado).

const RULES: Array<{ prefix: string; value: string }> = [
  { prefix: '/_ipx/',    value: 'public, max-age=31536000, immutable' },
  { prefix: '/images/',  value: 'public, max-age=31536000, immutable' },
  { prefix: '/img/',     value: 'public, max-age=31536000, immutable' },
  { prefix: '/docs/',    value: 'public, max-age=31536000, immutable' },
  { prefix: '/geojson/', value: 'public, max-age=604800' },
]

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('beforeResponse', (event) => {
    if (event.node.res.statusCode !== 200) return
    const url = event.path || event.node.req.url || ''
    const rule = RULES.find((r) => url.startsWith(r.prefix))
    if (!rule) return
    // En dev el header puede venir como `no-cache`; lo sobrescribimos.
    setResponseHeader(event, 'Cache-Control', rule.value)
  })
})
