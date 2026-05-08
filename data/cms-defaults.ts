// CMS defaults — copy editable de las páginas públicas de techos-verdes,
// expuesto como fuente de verdad para `/admin/contenido` y como fallback en
// caso de que el backend no haya sembrado las secciones.
//
// Estructura: cmsDefaults[pageSlug][sectionKey] = items[]
// Ver `composables/useCmsContent.ts` y `stores/cms.ts`.

export type CmsItem = Record<string, unknown>

export const cmsDefaults: Record<string, Record<string, CmsItem[]>> = {
  // ─────────────── HOME ───────────────
  home: {
    hero: [
      {
        eyebrow: 'CDMX · Infraestructura verde urbana',
        titleLine1: 'Observatorio de',
        titleLine2: 'Techos Verdes',
        subtitle:
          'Inventario, priorización y validación de techos verdes en la Ciudad de México. Combina detección satelital, análisis multicriterio (AHP) e inteligencia artificial para identificar las mejores azoteas candidatas.',
        primaryLabel: 'Explorar el inventario',
        primaryTo: '/inventario',
        secondaryLabel: 'Ver metodología',
        secondaryTo: '/metodologia',
      },
    ],
    features: [
      {
        icon: 'lucide:map',
        title: 'Mapa interactivo',
        description: 'Visualiza techos verdes existentes y candidatos priorizados sobre la cartografía CDMX. Filtra por alcaldía, tipo y nivel de aptitud.',
        linkLabel: 'Abrir mapa',
        linkTo: '/mapa',
        accent: 'primary',
      },
      {
        icon: 'lucide:building-2',
        title: 'Catálogo de inventario',
        description: 'Más de 50 techos verdes documentados con superficie, tipo, vegetación, nivel de uso y servicios ecosistémicos provistos.',
        linkLabel: 'Ver inventario',
        linkTo: '/inventario',
        accent: 'eco',
      },
      {
        icon: 'lucide:sparkles',
        title: 'Validación con IA',
        description: 'Cada candidato se analiza con Google Gemini Vision para confirmar aptitud, materiales y obstrucciones desde imagen aérea.',
        linkLabel: 'Ver validaciones',
        linkTo: '/ia-validacion',
        accent: 'secondary',
      },
    ],
    cta: [
      {
        title: '¿Tu edificio podría tener un techo verde?',
        description:
          'Consulta el catálogo de candidatos priorizados o revisa la metodología AHP para entender cómo evaluamos cada azotea.',
        primaryLabel: 'Ver candidatos',
        primaryTo: '/candidatos',
        secondaryLabel: 'Sobre el observatorio',
        secondaryTo: '/sobre',
      },
    ],
  },

  // ─────────────── SOBRE ───────────────
  sobre: {
    hero: [
      {
        eyebrow: 'Sobre el observatorio',
        title: 'Observatorio de Techos Verdes CDMX',
        subtitle:
          'Iniciativa académica del CIIEMAD-IPN que sistematiza el potencial de techos verdes en la Ciudad de México como infraestructura verde urbana.',
      },
    ],
    mission: [
      {
        heading: '¿Por qué un observatorio?',
        body:
          'La CDMX enfrenta isla de calor urbano, inundaciones por escurrimiento, mala calidad del aire y déficit de áreas verdes. Los techos verdes mitigan los cuatro — pero requieren priorizar dónde son técnicamente viables. Este observatorio combina datos OpenStreetMap, análisis multicriterio AHP e IA visual para mapear sistemáticamente el potencial.',
      },
    ],
    objetivos: [
      { title: 'Detectar', description: 'Identificar azoteas planas con potencial técnico vía OSM (área, rectangularidad, número de niveles).' },
      { title: 'Priorizar', description: 'Calcular score AHP sobre 8 criterios para identificar los candidatos óptimos.' },
      { title: 'Validar', description: 'Confirmar aptitud con análisis IA (Gemini Vision) sobre la imagen aérea de cada candidato.' },
      { title: 'Documentar', description: 'Mantener inventario público de techos verdes existentes con su tipología y servicios ecosistémicos.' },
    ],
  },

  // ─────────────── METODOLOGÍA ───────────────
  metodologia: {
    hero: [
      {
        eyebrow: 'Metodología AHP',
        title: 'Cómo priorizamos los candidatos',
        subtitle:
          'Analytic Hierarchy Process (Saaty) sobre 8 criterios técnicos: área, rectangularidad, niveles, material, pendiente, obstrucciones, accesibilidad y carga estructural.',
      },
    ],
    pasos: [
      { title: 'Detección OSM', description: 'Query Overpass por edificios planos en cada alcaldía CDMX (filtros: building, area > 200m², geom rectangular).' },
      { title: 'Cálculo AHP', description: 'Normalización 0-1 de los 8 criterios → ponderación por matriz de pesos → score 0-100.' },
      { title: 'Validación IA', description: 'Imagen aérea del candidato → Gemini 2.0 Flash → clasificación (techo plano sí/no, materiales, obstrucciones).' },
      { title: 'Revisión humana', description: 'Casos de baja confianza IA pasan a revisión manual por el equipo.' },
    ],
  },

  // ─────────────── INDICADORES ───────────────
  indicadores: {
    hero: [
      {
        eyebrow: 'Indicadores',
        title: 'Estado actual del observatorio',
        subtitle:
          'Métricas territoriales, distribución AHP, servicios ecosistémicos cuantificados y dinámicas temporales del inventario CDMX.',
      },
    ],
  },

  // ─────────────── PÁGINAS HERO-ONLY ───────────────
  inventario: {
    hero: [
      {
        eyebrow: 'Inventario',
        title: 'Techos verdes documentados',
        subtitle: '{count} techos verdes registrados en la Ciudad de México con su tipología, vegetación y servicios ecosistémicos.',
      },
    ],
  },
  candidatos: {
    hero: [
      {
        eyebrow: 'Candidatos',
        title: 'Azoteas priorizadas para techo verde',
        subtitle:
          'Sitios detectados via OpenStreetMap y aprobados como aptos. Ordenados por score AHP — los de mayor puntaje son los mejores candidatos para visita técnica.',
      },
    ],
  },
  mapa: {
    hero: [
      {
        eyebrow: 'Mapa interactivo',
        title: 'Cartografía de techos verdes',
        subtitle:
          'Capas de techos existentes, candidatos priorizados y aptitud por alcaldía sobre OpenStreetMap. Filtros por tipo, score AHP y estado.',
      },
    ],
  },
  aptitud: {
    hero: [
      {
        eyebrow: 'Aptitud territorial',
        title: 'Mapa de aptitud para techos verdes',
        subtitle:
          'Capa raster generada con AHP sobre toda la CDMX: zonas verdes son alta aptitud (≥80), amarillo media (60-79), naranja baja (<60).',
      },
    ],
  },
  'ia-validacion': {
    hero: [
      {
        eyebrow: 'IA · Validación visual',
        title: 'Análisis automatizado con Gemini',
        subtitle:
          'Cada candidato pasa por Gemini 2.0 Flash que evalúa la imagen aérea y devuelve aptitud, materiales, obstrucciones y tipo recomendado.',
      },
    ],
  },

  // ─────────────── CONTRIBUTORS ───────────────
  contributors: {
    hero: [
      {
        eyebrow: 'Red de la comunidad',
        title: 'Contribuyentes',
        subtitle:
          'Personas, instituciones y empresas que aportan al observatorio. Cinco modos de participación distintos — no niveles a alcanzar.',
      },
    ],
    intro: [
      {
        title: 'Cinco modos de participación',
        description:
          'Aprendiz reporta, Reportador da seguimiento, Caracterizador mide, Especialista diseña, Operador opera. Cada uno aporta de forma distinta y complementaria.',
      },
    ],
  },

  // ─────────────── FOOTER ───────────────
  footer: {
    brand: [
      {
        title: 'Observatorio de Techos Verdes',
        subtitle: 'CDMX',
        description:
          'Inventario, priorización y validación de techos verdes en la Ciudad de México. Iniciativa CIIEMAD — Instituto Politécnico Nacional.',
      },
    ],
    sources: [
      { label: 'OpenStreetMap (Overpass API)', href: 'https://overpass-api.de' },
      { label: 'Google Earth Engine', href: 'https://earthengine.google.com' },
      { label: 'CONABIO', href: 'http://geoportal.conabio.gob.mx' },
      { label: 'Sentinel Hub EO Browser', href: 'https://www.sentinel-hub.com/explore/eobrowser/' },
    ],
    quickLinks: [
      { label: 'Mapa', to: '/mapa' },
      { label: 'Inventario', to: '/inventario' },
      { label: 'Candidatos', to: '/candidatos' },
      { label: 'Aptitud territorial', to: '/aptitud' },
      { label: 'Validación IA', to: '/ia-validacion' },
      { label: 'Indicadores', to: '/indicadores' },
      { label: 'Metodología', to: '/metodologia' },
      { label: 'Sobre', to: '/sobre' },
    ],
    institutional: [
      {
        body: 'Iniciativa del CIIEMAD — Centro Interdisciplinario de Investigaciones y Estudios sobre Medio Ambiente y Desarrollo, Instituto Politécnico Nacional.',
        copyright: '© 2026 Observatorio de Techos Verdes CDMX. Plataforma de datos abiertos. Licencia de software Apache 2.0.',
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Catálogo de páginas/secciones para el admin (/admin/contenido)

export interface CmsPageMeta {
  slug: string
  title: string
  description: string
  preview: string
  icon: string
  sections: { key: string; label: string; help?: string }[]
}

export const cmsPageCatalog: CmsPageMeta[] = [
  {
    slug: 'home',
    title: 'Inicio',
    description: 'Hero, features y CTA del home.',
    preview: '/',
    icon: 'lucide:home',
    sections: [
      { key: 'hero', label: 'Hero principal', help: 'Encabezado del observatorio (título, subtítulo, botones).' },
      { key: 'features', label: 'Features (3 tarjetas)', help: 'Cards principales del home. Una por bloque.' },
      { key: 'cta', label: 'CTA final', help: 'Última llamada a la acción.' },
    ],
  },
  {
    slug: 'sobre',
    title: 'Sobre el observatorio',
    description: 'Misión, objetivos y descripción de la iniciativa.',
    preview: '/sobre',
    icon: 'lucide:info',
    sections: [
      { key: 'hero', label: 'Hero' },
      { key: 'mission', label: 'Misión (¿Por qué un observatorio?)' },
      { key: 'objetivos', label: 'Objetivos (4 bloques)' },
    ],
  },
  {
    slug: 'metodologia',
    title: 'Metodología AHP',
    description: 'Pasos del pipeline de detección + priorización + validación.',
    preview: '/metodologia',
    icon: 'lucide:graduation-cap',
    sections: [
      { key: 'hero', label: 'Hero' },
      { key: 'pasos', label: 'Pasos del proceso' },
    ],
  },
  {
    slug: 'indicadores',
    title: 'Indicadores',
    description: 'Encabezado de la sección de indicadores y dashboards.',
    preview: '/indicadores',
    icon: 'lucide:bar-chart-3',
    sections: [{ key: 'hero', label: 'Hero' }],
  },
  {
    slug: 'inventario',
    title: 'Inventario',
    description: 'Encabezado del catálogo de techos verdes.',
    preview: '/inventario',
    icon: 'lucide:home',
    sections: [{ key: 'hero', label: 'Hero' }],
  },
  {
    slug: 'candidatos',
    title: 'Candidatos',
    description: 'Encabezado del listado de candidatos priorizados.',
    preview: '/candidatos',
    icon: 'lucide:building-2',
    sections: [{ key: 'hero', label: 'Hero' }],
  },
  {
    slug: 'mapa',
    title: 'Mapa interactivo',
    description: 'Encabezado del mapa.',
    preview: '/mapa',
    icon: 'lucide:map',
    sections: [{ key: 'hero', label: 'Hero' }],
  },
  {
    slug: 'aptitud',
    title: 'Aptitud territorial',
    description: 'Encabezado del mapa de aptitud AHP.',
    preview: '/aptitud',
    icon: 'lucide:target',
    sections: [{ key: 'hero', label: 'Hero' }],
  },
  {
    slug: 'ia-validacion',
    title: 'IA Validación',
    description: 'Encabezado de la página de validación con Gemini.',
    preview: '/ia-validacion',
    icon: 'lucide:sparkles',
    sections: [{ key: 'hero', label: 'Hero' }],
  },
  {
    slug: 'contributors',
    title: 'Contribuyentes',
    description: 'Encabezado e introducción de la red de colaboradores.',
    preview: '/contributors',
    icon: 'lucide:users',
    sections: [
      { key: 'hero', label: 'Hero' },
      { key: 'intro', label: 'Introducción a los modos' },
    ],
  },
  {
    slug: 'footer',
    title: 'Pie de página',
    description: 'Marca, fuentes externas, accesos rápidos y créditos institucionales.',
    preview: '/',
    icon: 'lucide:panel-bottom',
    sections: [
      { key: 'brand', label: 'Marca' },
      { key: 'sources', label: 'Fuentes externas' },
      { key: 'quickLinks', label: 'Accesos rápidos' },
      { key: 'institutional', label: 'Créditos institucionales' },
    ],
  },
]

// Etiquetas amigables para campos del editor (en español).
export const cmsFieldLabels: Record<string, string> = {
  eyebrow: 'Etiqueta superior',
  title: 'Título',
  titleLine1: 'Título — línea 1',
  titleLine2: 'Título — línea 2',
  subtitle: 'Subtítulo',
  description: 'Descripción',
  body: 'Cuerpo',
  heading: 'Encabezado',
  primaryLabel: 'Botón primario — texto',
  primaryTo: 'Botón primario — destino',
  secondaryLabel: 'Botón secundario — texto',
  secondaryTo: 'Botón secundario — destino',
  linkLabel: 'Enlace — texto',
  linkTo: 'Enlace — destino',
  icon: 'Icono (lucide:*)',
  accent: 'Color de acento',
  label: 'Etiqueta',
  href: 'URL externa',
  to: 'Ruta interna',
  copyright: 'Texto de copyright',
}

export const cmsLongTextFields = new Set<string>(['subtitle', 'description', 'body'])

export const cmsAccentOptions: { value: string; label: string }[] = [
  { value: 'primary', label: 'Verde principal' },
  { value: 'eco', label: 'Verde ecológico' },
  { value: 'secondary', label: 'Cyan' },
  { value: 'accent', label: 'Ámbar' },
  { value: 'coral', label: 'Coral' },
  { value: 'alert', label: 'Rojo' },
]
