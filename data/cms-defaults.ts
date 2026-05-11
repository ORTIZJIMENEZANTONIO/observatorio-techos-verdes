// CMS defaults — copy editable de las páginas públicas de techos-verdes,
// expuesto como fuente de verdad para `/admin/contenido` y como fallback en
// caso de que el backend no haya sembrado las secciones.
//
// Estructura: cmsDefaults[pageSlug][sectionKey] = items[]
// Ver `composables/useCmsContent.ts` y `stores/cms.ts`.

export type CmsItem = Record<string, unknown>;

export const cmsDefaults: Record<string, Record<string, CmsItem[]>> = {
  // ─────────────── HOME ───────────────
  home: {
    hero: [
      {
        eyebrow: "CDMX · Infraestructura verde urbana",
        titleLine1: "Observatorio de",
        titleLine2: "Techos Verdes",
        subtitle:
          "Inventario, priorización y validación de techos verdes en la Ciudad de México. Sustentado en la investigación CIIEMAD-IPN de la M. en C. Ana Laura Cervantes Nájera: análisis multicriterio AHP con 8 variables, percepción remota y validación de campo.",
        primaryLabel: "Explorar el inventario",
        primaryTo: "/inventario",
        secondaryLabel: "Ver metodología",
        secondaryTo: "/metodologia",
      },
    ],
    features: [
      // Shape de fun-card (useFunPalette): icono = clave semántica, color = paleta,
      // to = destino NuxtLink. El campo `hint` es la pill superior.
      {
        title: "Inventario de techos verdes",
        description:
          "Registro georreferenciado de 57 techos verdes existentes en la CDMX, con información detallada de cada instalación.",
        hint: "Inventario",
        icono: "leaf",
        color: "primary",
        to: "/inventario",
      },
      {
        title: "Aptitud territorial",
        description:
          "Índice multicriterio AHP con 8 variables ponderadas por la metodología de Cervantes-Nájera (2025).",
        hint: "Modelo AHP",
        icono: "target",
        color: "secondary",
        to: "/metodologia",
      },
      {
        title: "Investigación CIIEMAD",
        description:
          "Sustentado en tesis doctoral, maestría y artículo Q1 en Sustainable Cities and Society del CIIEMAD-IPN.",
        hint: "Marco académico",
        icono: "book",
        color: "rose",
        to: "/referencias",
      },
    ],
    cta: [
      {
        title: "¿Tu edificio podría tener un techo verde?",
        description:
          "Consulta el catálogo de candidatos priorizados o revisa la metodología AHP para entender cómo evaluamos cada azotea.",
        primaryLabel: "Ver candidatos",
        primaryTo: "/candidatos",
        secondaryLabel: "Sobre el observatorio",
        secondaryTo: "/sobre",
      },
    ],
    sectionTitles: [
      {
        kpisTag: "En cifras",
        kpisTitle: "Los números del observatorio",
        kpisSubtitle:
          "Una mirada rápida a lo que hemos contado, medido y validado en la Ciudad de México.",
        featuresTag: "Acerca de",
        featuresTitle: "¿Qué es el observatorio?",
        featuresSubtitle:
          "Una plataforma integral para el monitoreo, análisis y priorización de techos verdes en la Ciudad de México.",
        stepsTag: "Proceso",
        stepsTitle: "Cómo funciona",
        stepsSubtitle:
          "Un flujo de trabajo que integra datos geoespaciales, análisis multicriterio AHP y validación de campo con expertos del CIIEMAD-IPN.",
        featuredTag: "Destacados",
        featuredTitle: "Techos verdes destacados",
        featuredSubtitle:
          "Algunos de los proyectos más representativos de infraestructura verde en azoteas de la CDMX.",
      },
    ],
    steps: [
      {
        title: "Recopilación de datos",
        description:
          "Integración de datos geoespaciales, sensores remotos, calidad del aire y datos urbanos.",
        icono: "satellite",
      },
      {
        title: "Índice de aptitud",
        description:
          "Construcción del índice multicriterio con 8 variables ponderadas por expertos.",
        icono: "scale",
      },
      {
        title: "Validación de campo",
        description:
          "Verificación manual con expertos del CIIEMAD-IPN siguiendo la metodología de Cervantes-Nájera. Fotografía aérea, observaciones de campo y revisión de catastro.",
        icono: "shield",
      },
      {
        title: "Priorización",
        description:
          "Integración de resultados para identificar y priorizar sitios candidatos.",
        icono: "flag",
      },
    ],
    datosCuriosos: [
      {
        titulo: "Una azotea verde es como un aire acondicionado natural",
        texto:
          "Puede bajar hasta 3.5 °C la temperatura del edificio que la sostiene — eso es como pasar de un día caluroso a uno templado.",
        icon: "thermometer",
        color: "alert",
      },
      {
        titulo: "Un metro cuadrado captura como un árbol pequeño",
        texto:
          "Cada m² de techo verde atrapa cerca de 0.97 kg de CO₂ al año, lo que un árbol joven hace en su primera temporada.",
        icon: "co2",
        color: "eco",
      },
      {
        titulo: "Atrapa lluvia para que no inunde la calle",
        texto:
          "Un techo verde retiene 19.5 L de agua de lluvia por m² al año, aliviando el drenaje urbano de la ciudad.",
        icon: "water",
        color: "secondary",
      },
    ],
    mapTeaser: [
      {
        eyebrow: "Mapa interactivo",
        title: "Explora los techos verdes de la CDMX",
        description:
          "Visualiza la distribución de techos verdes existentes, sitios candidatos priorizados y el índice de aptitud territorial en un mapa interactivo con múltiples capas de información.",
        ctaLabel: "Abrir mapa interactivo",
        ctaTo: "/mapa",
        bullet1: "57 techos verdes existentes geolocalizados",
        bullet2: "60 sitios candidatos priorizados",
        bullet3: "Capa de aptitud territorial por zona",
        bullet4: "Filtros por alcaldía, tipo y estado",
      },
    ],
    techoVerdeIntro: [
      {
        tag: "Fundamento",
        title: "¿Qué es un techo verde?",
        subtitle:
          "Un sistema de capas que incorpora vegetación en la parte superior de edificaciones, aportando múltiples beneficios ambientales.",
        body: "Un techo verde es un sistema constructivo que integra vegetación viva sobre las cubiertas de los edificios. Se compone de múltiples capas: impermeabilizante, barrera anti-raíz, capa drenante, sustrato y la capa de vegetación. Los techos verdes extensivos, como el TVLE desarrollado en el CIIEMAD-IPN, utilizan materiales orgánicos residuales (paja y fibra de coco) en su capa drenante, reduciendo costos y huella de carbono.",
        stat1Value: "94.8%",
        stat1Label: "Menos huella de carbono vs convencional",
        stat2Value: "25.9%",
        stat2Label: "Más económico que el convencional",
      },
    ],
    ciiemadShowcase: [
      {
        eyebrow: "Investigación CIIEMAD-IPN",
        titlePre: "El observatorio se construye sobre la",
        titleAccent: "investigación de la M. en C. Ana Laura Cervantes Nájera",
        lead: "Tres trabajos académicos del Centro Interdisciplinario de Investigaciones y Estudios sobre Medio Ambiente y Desarrollo del IPN sustentan los modelos, datos e impactos que aquí se presentan.",
        badgeValue: "100%",
        badgeLabel: "sobrevivencia vegetal",
        ctaPrimaryLabel: "Ver marco académico",
        ctaPrimaryTo: "/referencias",
        ctaSecondaryLabel: "Sobre el equipo",
        ctaSecondaryTo: "/sobre",
      },
    ],
    ciiemadPubs: [
      {
        year: "2025",
        type: "Artículo Q1",
        title: "Sustainable Cities and Society · Elsevier",
        to: "/referencias#articulo-destacado",
        color: "rose",
      },
      {
        year: "2025",
        type: "Tesis doctoral",
        title: "CIIEMAD-IPN · Adaptación climática",
        to: "/referencias#tesis",
        color: "primary",
      },
      {
        year: "2023",
        type: "Capítulo",
        title: "Repensar la Agenda 2030 · DOI 10.52501",
        to: "/agenda-2030",
        color: "violet",
      },
    ],
    ciiemadKpis: [
      { val: "8", label: "variables AHP" },
      { val: "423K", label: "m² potencial" },
      { val: "7", label: "ODS conectados" },
    ],
    respaldo: [
      {
        title: "Respaldo científico",
        body: "Este observatorio se fundamenta en la investigación doctoral y de maestría realizada en el CIIEMAD-IPN por Ana Laura Cervantes Nájera, bajo la dirección de la Dra. María Concepción Martínez Rodríguez. Las tasas de impacto, el inventario georreferenciado y el modelo de priorización utilizados en esta plataforma provienen de dichas investigaciones.",
        tesisDoc:
          'Tesis doctoral (2025): "Techos verdes una solución sustentable para la adaptación al cambio climático en la Ciudad de México"',
        tesisMa:
          'Tesis de maestría (2021): "Diseño, aplicación y evaluación de un techo verde ligero extensivo como estrategia para la adaptación al cambio climático en la alcaldía Gustavo A. Madero, Ciudad de México"',
        avisoTitle: "Aviso importante",
        avisoBody:
          "Este observatorio es una herramienta de análisis territorial y no sustituye dictámenes técnicos de factibilidad estructural. Los datos de aptitud reflejan condiciones ambientales y urbanas, no la viabilidad constructiva de cada inmueble. Consulte las fuentes originales y los profesionales certificados antes de tomar decisiones de implementación.",
      },
    ],
  },

  // ─────────────── SOBRE ───────────────
  sobre: {
    hero: [
      {
        eyebrow: "Sobre el observatorio",
        title: "Observatorio de Techos Verdes CDMX",
        subtitle:
          "Iniciativa académica del CIIEMAD-IPN que sistematiza el potencial de techos verdes en la Ciudad de México como infraestructura verde urbana.",
      },
    ],
    mission: [
      {
        heading: "¿Por qué un observatorio?",
        body: "La CDMX enfrenta isla de calor urbano, inundaciones por escurrimiento, mala calidad del aire y déficit de áreas verdes. Los techos verdes mitigan los cuatro — pero requieren priorizar dónde son técnicamente viables. Este observatorio combina datos OpenStreetMap, análisis multicriterio AHP e IA visual para mapear sistemáticamente el potencial.",
      },
    ],
    objetivos: [
      {
        title: "Detectar",
        description:
          "Identificar azoteas planas con potencial técnico vía OSM (área, rectangularidad, número de niveles).",
      },
      {
        title: "Priorizar",
        description:
          "Calcular score AHP sobre 8 criterios para identificar los candidatos óptimos.",
      },
      {
        title: "Validar",
        description:
          "Confirmar aptitud mediante validación de campo con expertos del CIIEMAD-IPN siguiendo la metodología de Cervantes-Nájera.",
      },
      {
        title: "Documentar",
        description:
          "Mantener inventario público de techos verdes existentes con su tipología y servicios ecosistémicos.",
      },
    ],
    principles: [
      {
        title: "Transparencia",
        description:
          "Datos abiertos, metodología documentada y código fuente público. Toda la información es verificable.",
        hint: "Datos abiertos",
        icono: "map",
        color: "violet",
        to: "/metodologia",
      },
      {
        title: "Rigor científico",
        description:
          "Modelo basado en literatura académica, datos oficiales y validación por expertos en el tema.",
        hint: "Investigación",
        icono: "book",
        color: "secondary",
        to: "/referencias",
      },
      {
        title: "Accesibilidad",
        description:
          "Información presentada de forma clara y comprensible para diferentes audiencias. Interfaz intuitiva.",
        hint: "Para todas",
        icono: "people",
        color: "eco",
        to: "/comunidad",
      },
      {
        title: "Colaboración",
        description:
          "Plataforma diseñada para facilitar la colaboración entre gobierno, academia, sector privado y sociedad civil.",
        hint: "Comunidad",
        icono: "community",
        color: "rose",
        to: "/comunidad",
      },
    ],
    dimensiones: [
      {
        titulo: "Territorial",
        descripcion:
          "Análisis espacial de la CDMX para identificar zonas de alta prioridad ambiental. Considera islas de calor (LST), déficit de vegetación (NDVI) y densidad urbana.",
        icono: "map",
        color: "primary",
      },
      {
        titulo: "Climático",
        descripcion:
          "Evaluación del impacto de los techos verdes en la mitigación de islas de calor urbano, captura de CO₂ y retención de agua pluvial.",
        icono: "thermometer",
        color: "alert",
      },
      {
        titulo: "Tecnológico",
        descripcion:
          "SIG + percepción remota satelital (Sentinel-2, Landsat 8/9) + validación de campo con expertos del CIIEMAD-IPN para detectar, clasificar y monitorear infraestructura verde urbana.",
        icono: "satellite",
        color: "secondary",
      },
    ],
    findings: [
      {
        value: "94.8%",
        label: "menos huella de carbono",
        color: "text-primary",
      },
      {
        value: "25.9%",
        label: "más económico vs. convencional",
        color: "text-eco-dark",
      },
      {
        value: "18",
        label: "meses de recuperación de inversión",
        color: "text-secondary-dark",
      },
      {
        value: "3.5°C",
        label: "reducción de temperatura superficial",
        color: "text-accent-dark",
      },
    ],
  },

  // ─────────────── METODOLOGÍA ───────────────
  metodologia: {
    hero: [
      {
        eyebrow: "Metodología AHP",
        title: "Cómo priorizamos los candidatos",
        subtitle:
          "Analytic Hierarchy Process (Saaty) sobre 8 criterios técnicos: área, rectangularidad, niveles, material, pendiente, obstrucciones, accesibilidad y carga estructural.",
      },
    ],
    pasos: [
      {
        title: "Detección OSM",
        description:
          "Query Overpass por edificios planos en cada alcaldía CDMX (filtros: building, area > 200m², geom rectangular).",
      },
      {
        title: "Cálculo AHP",
        description:
          "Normalización 0-1 de los 8 criterios → ponderación por matriz de pesos → score 0-100.",
      },
      {
        title: "Validación de campo",
        description:
          "Verificación manual con expertos del CIIEMAD-IPN siguiendo la metodología de Cervantes-Nájera. Fotografía aérea + observaciones territoriales.",
      },
      {
        title: "Priorización territorial",
        description:
          "Integración de aptitud y validaciones para identificar y priorizar sitios candidatos.",
      },
    ],
    limitations: [
      {
        text: "Los datos de calidad del aire corresponden a promedios anuales y no reflejan variaciones estacionales ni episodios de contingencia.",
      },
      {
        text: "La resolución espacial de las imágenes satelitales (30m Landsat) limita la precisión del análisis a nivel de predio individual.",
      },
      {
        text: "El modelo no incorpora variables estructurales de los edificios (carga, estado de impermeabilización, accesos).",
      },
      {
        text: "La ponderación de variables se basó en consulta a expertos y puede ser sensible a la composición del panel.",
      },
      {
        text: "Los datos poblacionales se derivan del Censo 2020 y pueden no reflejar cambios recientes en la distribución de población.",
      },
      {
        text: "Los datos de densidad vial no distinguen entre vialidades primarias y secundarias.",
      },
    ],
  },

  // ─────────────── INDICADORES ───────────────
  indicadores: {
    hero: [
      {
        eyebrow: "Indicadores",
        title: "Estado actual del observatorio",
        subtitle:
          "Métricas territoriales, distribución AHP, servicios ecosistémicos cuantificados y dinámicas temporales del inventario CDMX.",
      },
    ],
  },

  // ─────────────── PÁGINAS HERO-ONLY ───────────────
  inventario: {
    hero: [
      {
        eyebrow: "Inventario",
        title: "Techos verdes documentados",
        subtitle:
          "{count} techos verdes registrados en la Ciudad de México con su tipología, vegetación y servicios ecosistémicos.",
      },
    ],
  },
  candidatos: {
    hero: [
      {
        eyebrow: "Candidatos",
        title: "Azoteas priorizadas para techo verde",
        subtitle:
          "Sitios detectados via OpenStreetMap y aprobados como aptos. Ordenados por score AHP — los de mayor puntaje son los mejores candidatos para visita técnica.",
      },
    ],
  },
  mapa: {
    hero: [
      {
        eyebrow: "Mapa interactivo",
        title: "Cartografía de techos verdes",
        subtitle:
          "Capas de techos existentes, candidatos priorizados y aptitud por alcaldía sobre OpenStreetMap. Filtros por tipo, score AHP y estado.",
      },
    ],
  },
  aptitud: {
    hero: [
      {
        eyebrow: "Aptitud territorial",
        title: "Mapa de aptitud para techos verdes",
        subtitle:
          "Capa raster generada con AHP sobre toda la CDMX: zonas verdes son alta aptitud (≥80), amarillo media (60-79), naranja baja (<60).",
      },
    ],
  },
  "ia-validacion": {
    hero: [
      {
        eyebrow: "IA · Validación visual",
        title: "Análisis automatizado con Gemini",
        subtitle:
          "Cada candidato pasa por Gemini 2.0 Flash que evalúa la imagen aérea y devuelve aptitud, materiales, obstrucciones y tipo recomendado.",
      },
    ],
  },

  // ─────────────── CONTRIBUTORS ───────────────
  contributors: {
    hero: [
      {
        eyebrow: "Red de la comunidad",
        title: "Contribuyentes",
        subtitle:
          "Personas, instituciones y empresas que aportan al observatorio. Cinco modos de participación distintos — no niveles a alcanzar.",
      },
    ],
    intro: [
      {
        title: "Cinco modos de participación",
        description:
          "Aprendiz reporta, Reportador da seguimiento, Caracterizador mide, Especialista diseña, Operador opera. Cada uno aporta de forma distinta y complementaria.",
      },
    ],
  },

  // ─────────────── FOOTER ───────────────
  "agenda-2030": {
    hero: [
      {
        eyebrow: "ODS 13 · Acción por el clima",
        titleLine1: "Techos verdes en las áreas urbanas",
        titleLine2: "y su relación con la Agenda 2030",
        subtitle:
          "Las soluciones basadas en la naturaleza (SbN) responden a 7 Objetivos de Desarrollo Sostenible. Este observatorio toma como base el capítulo de Martínez Rodríguez y Cervantes-Nájera (CIIEMAD-IPN, 2023) y lo aterriza al territorio de la Ciudad de México.",
      },
    ],
    intro: [
      {
        title: "Argumento del capítulo",
        body: "Las ciudades enfrentan la disminución de espacios abiertos y naturales, los cuales aportan servicios ecosistémicos esenciales. Las SbN aprovechan los ecosistemas en beneficio de la sociedad; los techos verdes son una de estas soluciones para recuperar áreas verdes urbanas (AVU).",
      },
    ],
    servicios: [
      {
        sigla: "SC",
        nombre: "Servicios culturales",
        descripcion:
          "Valores estéticos, relaciones sociales, sentido de pertenencia, recreación y bienestar psicológico.",
        icono: "heart",
        color: "rose",
      },
      {
        sigla: "SR",
        nombre: "Servicios regulatorios",
        descripcion:
          "Regulación y purificación del agua, mejora de la calidad del aire, polinización, regulación térmica.",
        icono: "water",
        color: "secondary",
      },
      {
        sigla: "SA",
        nombre: "Servicios de aprovisionamiento",
        descripcion:
          "Alimentos, recursos ornamentales y materias primas obtenidas directamente del ecosistema.",
        icono: "leaf",
        color: "eco",
      },
      {
        sigla: "SS",
        nombre: "Servicios de soporte",
        descripcion:
          "Ciclos de nutrientes, oxígeno y carbono indispensables para la sobrevivencia de los seres vivos.",
        icono: "recycle",
        color: "teal",
      },
    ],
  },
  referencias: {
    hero: [
      {
        eyebrow: "Marco académico e institucional",
        titleLine1: "Referencias del observatorio",
        subtitle:
          "Las fuentes académicas, técnicas y normativas que respaldan los datos, modelos y decisiones presentadas en esta plataforma.",
      },
    ],
  },
  comunidad: {
    hero: [
      {
        eyebrow: "Comunidad abierta",
        titleLine1: "Sé parte del observatorio",
        subtitle:
          "Este observatorio se construye en colectivo. Cinco modos de participar — desde el reporte ciudadano hasta la operación institucional — abiertos a quien quiera sumar.",
        primaryLabel: "Quiero aportar",
        primaryTo: "#aportar",
        secondaryLabel: "Ver modos de participación",
        secondaryTo: "#tiers",
      },
    ],
    intro: [
      {
        title: "El observatorio se construye en colectivo",
        body: "Mapear los techos verdes de la Ciudad de México requiere muchos ojos. Algunas azoteas son visibles desde la calle, otras solo desde edificios vecinos, otras están documentadas en tesis y reportes técnicos que no han sido digitalizados.",
      },
    ],
    pasos: [
      {
        n: 1,
        titulo: "Identifica una azotea",
        detalle:
          "Cualquier persona puede reportar un techo verde existente o un sitio candidato observado en la calle, en su edificio o en su trabajo.",
        icono: "target",
        color: "secondary",
      },
      {
        n: 2,
        titulo: "Documenta y envía",
        detalle:
          "Foto, dirección aproximada, nombre del inmueble si lo conoces, y cualquier nota que sea relevante. Cuanto más detalle, mejor.",
        icono: "hand",
        color: "accent",
      },
      {
        n: 3,
        titulo: "El equipo valida",
        detalle:
          "CIIEMAD-IPN y SEDEMA revisan el aporte. Si pasa la validación se incorpora al inventario público y tu aporte queda asociado a tu perfil.",
        icono: "shield",
        color: "primary",
      },
    ],
  },
  footer: {
    brand: [
      {
        title: "Observatorio de Techos Verdes",
        subtitle: "CDMX",
        description:
          "Inventario, priorización y validación de techos verdes en la Ciudad de México. Iniciativa CIIEMAD — Instituto Politécnico Nacional.",
      },
    ],
    sources: [
      {
        label: "OpenStreetMap (Overpass API)",
        href: "https://overpass-api.de",
      },
      { label: "Google Earth Engine", href: "https://earthengine.google.com" },
      { label: "CONABIO", href: "http://geoportal.conabio.gob.mx" },
      {
        label: "Sentinel Hub EO Browser",
        href: "https://www.sentinel-hub.com/explore/eobrowser/",
      },
    ],
    quickLinks: [
      { label: "Mapa", to: "/mapa" },
      { label: "Inventario", to: "/inventario" },
      { label: "Candidatos", to: "/candidatos" },
      { label: "Aptitud territorial", to: "/aptitud" },
      { label: "Indicadores", to: "/indicadores" },
      { label: "Metodología", to: "/metodologia" },
      { label: "Referencias", to: "/referencias" },
      { label: "Sobre", to: "/sobre" },
    ],
    institutional: [
      {
        body: "Iniciativa del CIIEMAD — Centro Interdisciplinario de Investigaciones y Estudios sobre Medio Ambiente y Desarrollo, Instituto Politécnico Nacional.",
        copyright:
          "© 2026 Observatorio de Techos Verdes CDMX. Plataforma de datos abiertos. Licencia de software Apache 2.0.",
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Catálogo de páginas/secciones para el admin (/admin/contenido)

export interface CmsPageMeta {
  slug: string;
  title: string;
  description: string;
  preview: string;
  icon: string;
  sections: { key: string; label: string; help?: string }[];
}

export const cmsPageCatalog: CmsPageMeta[] = [
  {
    slug: "home",
    title: "Inicio",
    description:
      "Todo el contenido editorial del home — hero, KPIs, pasos, datos curiosos, CIIEMAD, respaldo.",
    preview: "/",
    icon: "lucide:home",
    sections: [
      {
        key: "hero",
        label: "Hero principal",
        help: "Encabezado del observatorio (título, subtítulo, botones).",
      },
      {
        key: "sectionTitles",
        label: "Títulos y subtítulos de secciones",
        help: "Tags, títulos y subtítulos editoriales que separan cada bloque del home.",
      },
      {
        key: "features",
        label: "Features (3 tarjetas)",
        help: "Cards principales del home — una por bloque.",
      },
      {
        key: "steps",
        label: "Pasos del proceso (4 tarjetas)",
        help: 'Bloque "Cómo funciona" con 4 pasos.',
      },
      {
        key: "datosCuriosos",
        label: "¿Sabías que…? (3 cards)",
        help: "Datos curiosos divulgativos al estilo edutainment.",
      },
      {
        key: "mapTeaser",
        label: "Teaser del mapa",
        help: "Banner con la imagen del inventario y CTA al mapa.",
      },
      {
        key: "techoVerdeIntro",
        label: "¿Qué es un techo verde?",
        help: "Bloque introductorio con stats y diagrama de capas.",
      },
      {
        key: "ciiemadShowcase",
        label: "Showcase CIIEMAD",
        help: "Bloque protagonista de la investigación de Cervantes Nájera.",
      },
      {
        key: "ciiemadPubs",
        label: "Publicaciones (3 tarjetas)",
        help: "Artículo Q1, tesis doctoral, capítulo de libro.",
      },
      {
        key: "ciiemadKpis",
        label: "KPIs académicos (3)",
        help: "Números: 8 variables AHP, 423K m² potencial, 7 ODS.",
      },
      {
        key: "respaldo",
        label: "Respaldo científico + aviso",
        help: "Sección final con disclaimer y citas de tesis.",
      },
      { key: "cta", label: "CTA final", help: "Última llamada a la acción." },
    ],
  },
  {
    slug: "sobre",
    title: "Sobre el observatorio",
    description:
      "Misión, objetivos, principios, dimensiones y hallazgos clave.",
    preview: "/sobre",
    icon: "lucide:info",
    sections: [
      { key: "hero", label: "Hero" },
      { key: "mission", label: "Misión (¿Por qué un observatorio?)" },
      { key: "objetivos", label: "Objetivos (4 bloques)" },
      {
        key: "principles",
        label: "Principios (4 cards)",
        help: "Transparencia, rigor, accesibilidad, colaboración.",
      },
      {
        key: "dimensiones",
        label: "Enfoque — dimensiones (3 cards)",
        help: "Territorial, Climático, Tecnológico.",
      },
      {
        key: "findings",
        label: "Hallazgos CIIEMAD (4 stats)",
        help: "Resultados de las tesis: 94.8%, 25.9%, 18 meses, 3.5°C.",
      },
    ],
  },
  {
    slug: "metodologia",
    title: "Metodología AHP",
    description: "Pasos del pipeline + limitaciones documentadas.",
    preview: "/metodologia",
    icon: "lucide:graduation-cap",
    sections: [
      { key: "hero", label: "Hero" },
      { key: "pasos", label: "Pasos del proceso" },
      {
        key: "limitations",
        label: "Limitaciones del modelo (6)",
        help: "Honestidad sobre los alcances y supuestos del modelo.",
      },
    ],
  },
  {
    slug: "indicadores",
    title: "Indicadores",
    description: "Encabezado de la sección de indicadores y dashboards.",
    preview: "/indicadores",
    icon: "lucide:bar-chart-3",
    sections: [{ key: "hero", label: "Hero" }],
  },
  {
    slug: "inventario",
    title: "Inventario",
    description: "Encabezado del catálogo de techos verdes.",
    preview: "/inventario",
    icon: "lucide:home",
    sections: [{ key: "hero", label: "Hero" }],
  },
  {
    slug: "candidatos",
    title: "Candidatos",
    description: "Encabezado del listado de candidatos priorizados.",
    preview: "/candidatos",
    icon: "lucide:building-2",
    sections: [{ key: "hero", label: "Hero" }],
  },
  {
    slug: "mapa",
    title: "Mapa interactivo",
    description: "Encabezado del mapa.",
    preview: "/mapa",
    icon: "lucide:map",
    sections: [{ key: "hero", label: "Hero" }],
  },
  {
    slug: "aptitud",
    title: "Aptitud territorial",
    description: "Encabezado del mapa de aptitud AHP.",
    preview: "/aptitud",
    icon: "lucide:target",
    sections: [{ key: "hero", label: "Hero" }],
  },
  {
    slug: "ia-validacion",
    title: "IA Validación",
    description: "Encabezado de la página de validación con Gemini.",
    preview: "/ia-validacion",
    icon: "lucide:sparkles",
    sections: [{ key: "hero", label: "Hero" }],
  },
  {
    slug: "contributors",
    title: "Contribuyentes",
    description: "Encabezado e introducción de la red de colaboradores.",
    preview: "/contributors",
    icon: "lucide:users",
    sections: [
      { key: "hero", label: "Hero" },
      { key: "intro", label: "Introducción a los modos" },
    ],
  },
  {
    slug: "agenda-2030",
    title: "Agenda 2030",
    description:
      "Conexión del techo verde con los 7 ODS y los 4 servicios ecosistémicos (MEA 2003).",
    preview: "/agenda-2030",
    icon: "lucide:globe",
    sections: [
      { key: "hero", label: "Hero" },
      { key: "intro", label: "Argumento del capítulo" },
      {
        key: "servicios",
        label: "Servicios ecosistémicos (4 cards)",
        help: "SC, SR, SA, SS — marco MEA 2003.",
      },
    ],
  },
  {
    slug: "referencias",
    title: "Referencias",
    description:
      "Marco académico (CIIEMAD-IPN), tesis, fuentes oficiales y bibliografía.",
    preview: "/referencias",
    icon: "lucide:book",
    sections: [{ key: "hero", label: "Hero" }],
  },
  {
    slug: "comunidad",
    title: "Comunidad",
    description:
      "Hero, introducción y los 3 pasos para sumar un aporte ciudadano.",
    preview: "/comunidad",
    icon: "lucide:users-2",
    sections: [
      { key: "hero", label: "Hero" },
      { key: "intro", label: "Introducción" },
      {
        key: "pasos",
        label: "Pasos para participar (3)",
        help: "Identifica → Documenta → El equipo valida.",
      },
    ],
  },
  {
    slug: "footer",
    title: "Pie de página",
    description:
      "Marca, fuentes externas, accesos rápidos y créditos institucionales.",
    preview: "/",
    icon: "lucide:panel-bottom",
    sections: [
      { key: "brand", label: "Marca" },
      { key: "sources", label: "Fuentes externas" },
      { key: "quickLinks", label: "Accesos rápidos" },
      { key: "institutional", label: "Créditos institucionales" },
    ],
  },
];

// Etiquetas amigables para campos del editor (en español).
export const cmsFieldLabels: Record<string, string> = {
  eyebrow: "Etiqueta superior",
  title: "Título",
  titleLine1: "Título — línea 1",
  titleLine2: "Título — línea 2",
  subtitle: "Subtítulo",
  description: "Descripción",
  body: "Cuerpo",
  heading: "Encabezado",
  primaryLabel: "Botón primario — texto",
  primaryTo: "Botón primario — destino",
  secondaryLabel: "Botón secundario — texto",
  secondaryTo: "Botón secundario — destino",
  linkLabel: "Enlace — texto",
  linkTo: "Enlace — destino",
  icon: "Icono (lucide:*)",
  accent: "Color de acento",
  label: "Etiqueta",
  href: "URL externa",
  to: "Ruta interna",
  copyright: "Texto de copyright",
};

export const cmsLongTextFields = new Set<string>([
  "subtitle",
  "description",
  "body",
]);

export const cmsAccentOptions: { value: string; label: string }[] = [
  { value: "primary", label: "Verde principal" },
  { value: "eco", label: "Verde ecológico" },
  { value: "secondary", label: "Cyan" },
  { value: "accent", label: "Ámbar" },
  { value: "coral", label: "Coral" },
  { value: "alert", label: "Rojo" },
];
