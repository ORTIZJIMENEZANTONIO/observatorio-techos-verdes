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
    // Audience Gate — 3 puertas justo después del hero
    audienceGate: [
      {
        tag: "Aprender",
        title: "Aprende",
        description:
          "Empieza por lo esencial: qué es un techo verde, cómo se construye y por qué cambia el lugar donde vives.",
        to: "/aprende",
        ctaLabel: "Comenzar",
        icono: "book",
        color: "eco",
      },
      {
        tag: "Investigar",
        title: "Investigación",
        description:
          "Marco CIIEMAD-IPN, publicaciones Q1, metodología AHP y descarga de datos.",
        to: "/investigacion",
        ctaLabel: "Ver publicaciones",
        icono: "ai",
        color: "primary",
      },
      {
        tag: "Explorar",
        title: "Explora los datos",
        description:
          "Mapa, inventario de 57 techos, candidatos priorizados e indicadores ambientales.",
        to: "/mapa",
        ctaLabel: "Abrir mapa",
        icono: "map",
        color: "secondary",
      },
      {
        tag: "Participar",
        title: "Comunidad",
        description:
          "Suma un techo, contribuye con caracterización técnica o únete como especialista.",
        to: "/comunidad",
        ctaLabel: "Aportar",
        icono: "community",
        color: "accent",
      },
    ],
    // Academic Highlight — banner Q1 Cervantes-Nájera
    academicHighlight: [
      {
        tag: "Publicación destacada",
        venue: "Sustainable Cities and Society — Elsevier (Q1)",
        anio: "2025",
        autores: "Cervantes-Nájera, A. L., Martínez Rodríguez, M. C., et al.",
        titulo:
          "Spatial suitability analysis for the implementation of green rooftops in highly urbanized Mexico City",
        descripcion:
          "Análisis multicriterio AHP de 8 variables sobre toda la CDMX. Identifica 428 km² prioritarios y 514,000 m² de potencial real. Es el sustento metodológico de este observatorio.",
        doi: "10.1016/j.scs.2025.S2210670725006547",
        kpi1Value: "428",
        kpi1Label: "km² zonas prioritarias",
        kpi2Value: "514,000",
        kpi2Label: "m² potencial CDMX",
        kpi3Value: "Q1",
        kpi3Label: "Elsevier · SCS 2025",
        ctaLabel: "Ver marco académico",
        ctaTo: "/investigacion#publicaciones",
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
        ctaPrimaryLabel: "Ver línea de investigación",
        ctaPrimaryTo: "/investigacion",
        ctaSecondaryLabel: "Documentos descargables",
        ctaSecondaryTo: "/investigacion/documentos",
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
      { number: 1, title: "Recopilación de datos geoespaciales", description: "Integración de múltiples fuentes de datos espaciales, incluyendo imágenes satelitales, datos censales y estaciones de monitoreo.", icono: "satellite", color: "secondary", details: ["Imágenes Landsat y MODIS para temperatura superficial", "Datos del INEGI para población y área urbanizada", "Estaciones RAMA para calidad del aire", "Coberturas de uso de suelo de SEDEMA"] },
      { number: 2, title: "Construcción del índice de aptitud", description: "Normalización y ponderación de variables en un índice multicriterio de aptitud territorial.", icono: "scale", color: "violet", details: ["Normalización 0-100 por variable", "Ponderación por Proceso Analítico Jerárquico (AHP)", "Validación cruzada con expertos", "Clasificación en 5 niveles de aptitud"] },
      { number: 3, title: "Validación de campo", description: "Verificación manual con expertos del CIIEMAD-IPN siguiendo la metodología de Cervantes-Nájera. Fotografía aérea, observaciones de campo y revisión de catastro.", icono: "shield", color: "accent", details: ["Revisión de imagen aérea de alta resolución", "Validación territorial con expertos", "Cruce con catastro y dictámenes oficiales", "Nivel de confianza por sitio"] },
      { number: 4, title: "Priorización territorial", description: "Integración de los resultados del modelo de aptitud con las validaciones de campo para identificar y priorizar sitios candidatos.", icono: "flag", color: "rose", details: ["Cruce de aptitud con inventario existente", "Identificación de zonas de alta prioridad", "Generación de fichas por candidato", "Datos abiertos para consulta pública"] },
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
    kpis: [
      { label: "Techos verdes registrados", valor: 57, unidad: "techos", icono: "leaf", color: "primary", cambio: "+8 en 2024" },
      { label: "Superficie total cubierta", valor: "98,430", unidad: "m²", icono: "area", color: "eco", cambio: "+12,600 m²" },
      { label: "Candidatos priorizados", valor: 60, unidad: "sitios", icono: "target", color: "secondary", cambio: "+15 nuevos" },
      { label: "Captura de CO₂ del inventario", valor: "60.81", unidad: "tCO₂/año", icono: "co2", color: "accent", cambio: "Cervantes-Nájera 2025" },
      { label: "Alcaldías con techos verdes", valor: 14, unidad: "de 16", icono: "map", color: "primary" },
      { label: "Variables del modelo", valor: 8, unidad: "variables", icono: "chart", color: "secondary" },
      { label: "Score promedio candidatos", valor: 81.5, unidad: "pts", icono: "score", color: "eco", cambio: "+3.2 vs anterior" },
      { label: "Pilotos activos", valor: 4, unidad: "proyectos", icono: "pilot", color: "accent", cambio: "+2 en Q1" },
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
    ods: [
      {
        num: 2, color: "#DDA63A", titulo: "Hambre cero",
        metas: ["2.1 Acceso a alimentación nutricional", "2.3 Producción agrícola a pequeña escala", "2.4 Prácticas agrícolas sostenibles"],
        via: "Agricultura urbana", rol: "SA · SC",
        cita: "En 2050, 2,000 millones de personas estarán en estado de inseguridad alimentaria (Naciones Unidas, 2016c). Los techos verdes complementan necesidades nutricionales por autoproducción (Azunre et al., 2019).",
      },
      {
        num: 3, color: "#4C9F38", titulo: "Salud y bienestar",
        metas: ["3.4 Disminuir enfermedades no transmisibles", "3.9 Reducir muertes por contaminación"],
        via: "Espacios verdes y reducción de partículas", rol: "SC · SR",
        cita: "7 millones de muertes anuales por contaminación atmosférica; 4.2 millones por exposición a partículas finas (UN, 2016f). La vegetación retiene partículas contaminantes (Baik et al., 2012).",
      },
      {
        num: 6, color: "#26BDE2", titulo: "Agua limpia y saneamiento",
        metas: ["6.3 Aumentar reciclaje y reúso del agua", "6.4 Empleo eficaz de los recursos hídricos", "6.a Tecnologías de captación y desalinización"],
        via: "Captación pluvial y mitigación de inundaciones", rol: "SA · SR",
        cita: "El 40 % de los habitantes del planeta enfrentan problemas de agua (UN, 2016d). Los techos verdes captan agua de lluvia para autorriego y evitan inundaciones (Contreras-Bejarano & Villegas-González, 2019).",
      },
      {
        num: 7, color: "#FCC30B", titulo: "Energía asequible y no contaminante",
        metas: ["7.3 Mejorar la eficiencia energética", "7.a Investigación e inversión en energías limpias"],
        via: "Aislamiento térmico de edificios", rol: "SR · SS",
        cita: "El consumo energético urbano es responsable del 60 % de las emisiones de GEI (UN, 2016e). Los techos verdes generan ahorros por aislamiento térmico (Jaffal, Ouldboukhitine & Belarbi, 2012).",
      },
      {
        num: 11, color: "#FD9D24", titulo: "Ciudades y comunidades sostenibles",
        metas: ["11.3 Urbanización inclusiva y sostenible", "11.6 Reducir el impacto ambiental, mejorar calidad del aire", "11.7 Acceso a zonas verdes y espacios públicos seguros"],
        via: "Infraestructura verde urbana", rol: "SR",
        cita: "En 2050 se estima un crecimiento de 5,000 millones de habitantes en ciudades; éstas generan 75 % de las emisiones de carbono (Naciones Unidas, 2018). Los techos verdes son herramienta de sostenibilidad urbana (Langemeyer et al., 2020).",
      },
      {
        num: 13, color: "#3F7E44", titulo: "Acción por el clima",
        metas: ["13.2 Integrar normas, políticas y planes nacionales"],
        via: "Adaptación al cambio climático y reducción de isla de calor", rol: "SR · SA · SS",
        cita: "Al colocar vegetación en techos urbanos se reduce el efecto del albedo y se mitigan los efectos de la isla de calor (Sturiale & Scuderi, 2019).",
      },
      {
        num: 15, color: "#56C02B", titulo: "Vida de ecosistemas terrestres",
        metas: ["15.5 Reducir la degradación y pérdida de biodiversidad"],
        via: "Hábitat urbano para flora y fauna", rol: "SR",
        cita: "En los últimos 25 años el riesgo de extinción de especies de mamíferos, aves, anfibios y corales aumentó 10 % (UN, 2019b). Los techos verdes son hábitat incorporados a la infraestructura urbana (Brachet, Schiopu & Clergeau, 2020).",
      },
    ],
    datos: [
      { target: 7, suffix: "", unidad: "ODS", detalle: "directamente vinculados al techo verde", fuente: "Martínez Rodríguez & Cervantes-Nájera, 2023", href: "https://doi.org/10.52501/cc.064.13" },
      { target: 17, suffix: "", unidad: "metas", detalle: "de la Agenda 2030 atendidas", fuente: "Tabla 1, capítulo XIII", href: "https://doi.org/10.52501/cc.064.13" },
      { target: 142, suffix: "", unidad: "proyectos", detalle: "de techos verdes registrados a nivel mundial", fuente: "NATURVATION, 2018", href: "https://naturvation.eu/atlas" },
      { display: "75 %", unidad: "", detalle: "de las emisiones de carbono provienen de ciudades", fuente: "Naciones Unidas, 2018", href: "https://unstats.un.org/sdgs/report/2019/goal-11/" },
      { display: "7 M", unidad: "muertes/año", detalle: "por contaminación atmosférica", fuente: "United Nations, 2016f", href: "https://unstats.un.org/sdgs/report/2019/goal-03/" },
      { display: "60 %", unidad: "", detalle: "del consumo energético urbano genera GEI", fuente: "United Nations, 2016e", href: "https://www.un.org/sustainabledevelopment/es/energy/" },
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
  // ─────────────── APRENDE ───────────────
  aprende: {
    hero: [
      {
        eyebrow: "Aprende",
        title: "Conoce los techos verdes",
        subtitle:
          "Te invitamos a un recorrido breve por una de las soluciones más bonitas para nuestra ciudad: qué son, cómo se construyen, qué tipos existen y por qué cambian la vida de quienes los habitan.",
      },
    ],
    intro: [
      {
        title: "¿Qué es un techo verde?",
        subtitle:
          "Un sistema constructivo que sustituye la grava o la impermeabilización expuesta por una cubierta vegetal viva sobre las azoteas.",
        tag: "Fundamento",
        paragraph1:
          "No es jardinería en macetas: es una capa funcional integrada al edificio que aporta servicios ambientales medibles —regulación térmica, captación pluvial, captura de CO₂ y hábitat para polinizadores— sin demandar más suelo en una ciudad ya saturada de cemento.",
        paragraph2:
          "En la CDMX, donde el 75 % del territorio urbano carece de áreas verdes accesibles a 400 m caminando, las azoteas representan la reserva de suelo vegetal más subutilizada: 514,000 m² potenciales según el análisis territorial del CIIEMAD-IPN.",
      },
    ],
    capas: [
      {
        num: 1,
        nombre: "Vegetación",
        funcion:
          "Capa viva. Suculentas, gramíneas o cubresuelos según la tipología.",
        color: "eco",
      },
      {
        num: 2,
        nombre: "Sustrato de crecimiento",
        funcion:
          "Mezcla ligera de origen mineral con materia orgánica. Define el peso.",
        color: "accent",
      },
      {
        num: 3,
        nombre: "Filtro / geotextil",
        funcion: "Evita que partículas finas obstruyan el drenaje.",
        color: "teal",
      },
      {
        num: 4,
        nombre: "Capa drenante",
        funcion:
          "Conduce el exceso de agua y reserva humedad. En TVLE: paja + fibra de coco.",
        color: "indigo",
      },
      {
        num: 5,
        nombre: "Barrera antirraíces",
        funcion:
          "Protege la membrana de la penetración mecánica de las raíces.",
        color: "rose",
      },
      {
        num: 6,
        nombre: "Impermeabilizante y losa",
        funcion:
          "Estructura existente. Debe soportar carga mínima de 100 kg/m² (NTC-CDMX 2017).",
        color: "primary",
      },
    ],
    tipologias: [
      {
        slug: "extensivo",
        nombre: "Extensivo (TVLE)",
        pesoSaturado: "60 – 150 kg/m²",
        sustrato: "5 – 15 cm",
        vegetacion: "Suculentas, sedum, gramíneas resistentes",
        mantenimiento: "Bajo: 1 – 2 visitas/año",
        uso: "Mayoría de azoteas existentes en CDMX. Es la tipología que la investigación CIIEMAD recomienda para retrofit masivo.",
        color: "eco",
        icono: "leaf",
      },
      {
        slug: "semi-intensivo",
        nombre: "Semi-intensivo",
        pesoSaturado: "150 – 250 kg/m²",
        sustrato: "15 – 25 cm",
        vegetacion: "Cubresuelos, herbáceas, arbustos pequeños",
        mantenimiento: "Medio: 4 – 6 visitas/año, riego ocasional",
        uso: "Edificaciones con capacidad estructural confirmada por dictamen.",
        color: "secondary",
        icono: "water",
      },
      {
        slug: "intensivo",
        nombre: "Intensivo",
        pesoSaturado: "250 – 750 kg/m²",
        sustrato: "> 25 cm",
        vegetacion: "Arbustos, árboles pequeños, huertos urbanos",
        mantenimiento: "Alto: riego, poda, fertilización, drenaje activo",
        uso: "Obra nueva o edificios con refuerzo estructural. Función de plaza ajardinada.",
        color: "primary",
        icono: "building",
      },
    ],
    beneficios: [
      {
        area: "Térmico",
        dato: "−3.5 °C",
        desc: "Reducción de temperatura superficial documentada en el TVLE del CIIEMAD.",
        color: "accent",
        icono: "thermometer",
      },
      {
        area: "Hídrico",
        dato: "19.5 L/m²·año",
        desc: "Captación pluvial promedio que se retiene en sustrato antes de ir al drenaje.",
        color: "secondary",
        icono: "water",
      },
      {
        area: "Atmosférico",
        dato: "0.97 kg CO₂/m²·año",
        desc: "Captura promedio anual. Equivale a 60.81 tCO₂/año en el inventario actual.",
        color: "eco",
        icono: "co2",
      },
      {
        area: "Social y salud",
        dato: "ODS 3 · 11 · 13",
        desc: "Mejora calidad del aire, reduce isla de calor y aumenta bienestar psicológico.",
        color: "teal",
        icono: "heart",
      },
    ],
    casoCiiemad: [
      { label: "Superficie experimental", valor: "6 m²" },
      { label: "Tipología", valor: "TVLE — Extensivo ligero" },
      { label: "Periodo monitoreado", valor: "2019 – 2021" },
      { label: "Recuperación de inversión", valor: "18 meses" },
      { label: "Sobrevivencia vegetal", valor: "100 % todas las especies" },
      { label: "Menor huella vs convencional", valor: "94.8 %" },
    ],
    casoIntro: [
      {
        title: "El techo verde del CIIEMAD-IPN",
        subtitle:
          "6 m² instalados en la azotea del CIIEMAD-IPN en Gustavo A. Madero. Monitoreado durante dos años por la M. en C. Ana Laura Cervantes Nájera.",
        tag: "Caso protagonista",
        body: "Es la prueba de concepto que sostiene este observatorio: un techo verde ligero extensivo construido con capa drenante de paja y fibra de coco —en lugar de las membranas plásticas de los sistemas comerciales— y monitoreado científicamente. La conclusión: el TVLE genera 94.8 % menos huella de carbono que la solución convencional y se paga en 18 meses.",
      },
    ],
    galeria: [
      {
        src: "/images/tesis/techo-verde-ciiemad-panoramica.jpg",
        alt: "Panorámica del techo verde del CIIEMAD con contexto urbano de Zacatenco",
        caption: "Panorámica del techo verde con contexto urbano de Zacatenco",
      },
      {
        src: "/images/tesis/techo-verde-ciiemad-suculentas.jpg",
        alt: "Echeverias y crasuláceas en el techo verde del CIIEMAD",
        caption: "Detalle de echeverias y crasuláceas adaptadas al altiplano mexicano",
      },
      {
        src: "/images/tesis/techo-verde-ciiemad-echeverias-gravilla.jpg",
        alt: "Echeverias separadas en cuadrícula sobre gravilla blanca, vista cenital",
        caption: "Vista cenital: trazado de Echeverias sobre la capa drenante",
      },
      {
        src: "/images/tesis/techo-verde-ciiemad-modulo.jpg",
        alt: "Módulo experimental del TVLE con cubierta vegetal mixta",
        caption: "Módulo experimental con cubierta vegetal mixta",
      },
      {
        src: "/images/tesis/techo-verde-ciiemad-vegetacion-soleada.jpg",
        alt: "Vegetación crasulácea creciendo sobre el techo del CIIEMAD bajo el sol",
        caption: "Plantas crasuláceas creciendo en condiciones reales del altiplano",
      },
      {
        src: "/images/tesis/techo-verde-ciiemad-sedum-floracion.jpg",
        alt: "Sedum en floración con cambio cromático verde a rojizo en el techo verde",
        caption: "Sedum en floración — cambio cromático estacional",
      },
      {
        src: "/images/tesis/techo-verde-ciiemad-floracion.jpg",
        alt: "Floración estacional en suculentas del techo verde",
        caption: "Floración estacional en suculentas del techo",
      },
      {
        src: "/images/tesis/techo-verde-ciiemad-mantenimiento.jpg",
        alt: "Equipo CIIEMAD durante trabajos de mantenimiento del techo verde",
        caption: "Equipo CIIEMAD durante trabajos de mantenimiento",
      },
      {
        src: "/images/tesis/techo-verde-ciiemad-edificio.jpg",
        alt: "Vista del techo verde con el edificio académico del CIIEMAD al fondo",
        caption: "Vista del techo desde lo alto con el edificio académico al fondo",
      },
      {
        src: "/images/tesis/ciiemad-vista-aerea.png",
        alt: "Vista aérea del edificio CIIEMAD-IPN mostrando la azotea del TVLE",
        caption: "Vista aérea del CIIEMAD-IPN — localización del techo verde experimental",
      },
    ],
    cta: [
      {
        title: "¿Listo para profundizar?",
        body: "Explora los techos que ya existen en la ciudad, identifica zonas prioritarias o suma información a la red.",
      },
    ],
  },

  // ─────────────── INVESTIGACION ───────────────
  investigacion: {
    hero: [
      {
        eyebrow: "Investigación",
        title: "Marco académico del observatorio",
        subtitle:
          "Este observatorio se sostiene en la línea de investigación de techos verdes del CIIEMAD-IPN. Aquí están las publicaciones, la metodología y los datos de origen abierto.",
      },
    ],
    marco: [
      {
        title: "Línea de investigación en techos verdes",
        subtitle:
          "Desde 2019, el CIIEMAD-IPN sostiene un programa continuo sobre techos verdes ligeros extensivos como estrategia de adaptación al cambio climático.",
        tag: "Sede académica",
        paragraph1:
          "La investigación parte de una pregunta concreta: ¿es posible adaptar el techo verde europeo a la realidad climática, estructural y económica de la Ciudad de México? La respuesta —el TVLE— se diseñó, construyó y monitoreó en el propio campus del CIIEMAD.",
        paragraph2:
          "Este observatorio es la extensión territorial de esa investigación: aplica el modelo AHP de 8 variables a toda la CDMX y abre los datos al público y a la academia.",
        sede: "CIIEMAD-IPN",
        sedeDesc:
          "Centro Interdisciplinario de Investigaciones y Estudios sobre Medio Ambiente y Desarrollo",
        sedeDir: "Unidad Profesional Adolfo López Mateos, Zacatenco, GAM, CDMX",
      },
    ],
    equipo: [
      {
        rol: "Directora de tesis",
        nombre: "Dra. María Concepción Martínez Rodríguez",
        afiliacion:
          "Investigadora CIIEMAD-IPN. Coautora del capítulo Agenda 2030 (2023).",
      },
      {
        rol: "Autora del marco metodológico",
        nombre: "M. en C. Ana Laura Cervantes Nájera",
        afiliacion: "Doctorante CIIEMAD-IPN. Defensa doctoral 28 nov 2025.",
      },
      {
        rol: "Comité tutorial",
        nombre: "Ochman Ikanowicz · Mendoza · Terán Cuevas · Abeldaño Zuñiga",
        afiliacion: "Doctores integrantes del comité de seguimiento académico.",
      },
    ],
    publicaciones: [
      {
        tipo: "Artículo Q1",
        titulo:
          "Spatial suitability analysis for the implementation of green rooftops in highly urbanized Mexico City: A GIS-based multicriteria decision analysis to alleviate urban heat island (UHI)",
        autores: "Cervantes-Nájera, A. L., Martínez Rodríguez, M. C., et al.",
        anio: "2025",
        venue: "Sustainable Cities and Society — Elsevier (Q1)",
        doi: "10.1016/j.scs.2025.S2210670725006547",
        resumen:
          "Análisis multicriterio espacial (AHP, 8 variables) sobre toda la CDMX. Identifica 428 km² prioritarios y 514,000 m² de potencial real para techos verdes. Es el sustento metodológico de este observatorio.",
        destacada: true,
      },
      {
        tipo: "Tesis doctoral",
        titulo:
          "Techos verdes una solución sustentable para la adaptación al cambio climático en la Ciudad de México",
        autores:
          "Cervantes Nájera, A. L. — Directora: Dra. María Concepción Martínez Rodríguez",
        anio: "2025",
        venue: "CIIEMAD-IPN. Defensa: 28 noviembre 2025.",
        resumen:
          "Marco de economía circular + soluciones basadas en la naturaleza. Comité tutorial: Ochman Ikanowicz, Mendoza, Terán Cuevas, Abeldaño Zuñiga.",
      },
      {
        tipo: "Capítulo de libro",
        titulo:
          "Techos verdes en las áreas urbanas y su relación con la Agenda 2030",
        autores: "Martínez Rodríguez, M. C. & Cervantes-Nájera, A. L.",
        anio: "2023",
        venue:
          "Repensar la Agenda 2030: Tendencias de sostenibilidad, cap. XIII",
        doi: "10.52501/cc.064.13",
        resumen:
          "Mapea los servicios ecosistémicos de los techos verdes contra los 17 ODS y discute políticas urbanas para América Latina.",
      },
      {
        tipo: "Tesis de maestría",
        titulo:
          "Diseño, aplicación y evaluación de un techo verde ligero extensivo como estrategia para la adaptación al cambio climático en la alcaldía Gustavo A. Madero",
        autores: "Cervantes Nájera, A. L.",
        anio: "2021",
        venue: "CIIEMAD-IPN",
        resumen:
          "Diseño, construcción y monitoreo experimental del TVLE de 6 m² en azotea del CIIEMAD. Reducción de 3.5 °C en temperatura superficial, captación de 19.5 L/m²·año y 100 % de sobrevivencia vegetal.",
      },
      {
        tipo: "Artículo internacional",
        titulo:
          "Roofpedia: Automatic mapping of green and solar roofs for an open roofscape registry and evaluation of urban sustainability",
        autores: "Wu, A. N. & Biljecki, F.",
        anio: "2021",
        venue: "Landscape and Urban Planning, 214, 104167 — Elsevier (Q1)",
        doi: "10.1016/j.landurbplan.2021.104167",
        resumen:
          "State of the art en mapeo automatizado de techos verdes vía redes convolucionales sobre OpenStreetMap. Cubre 17 ciudades y >1M edificios. Justifica nuestra elección de validación de campo + AHP en lugar de detección puramente automática.",
      },
    ],
    metodologia: [
      {
        title: "Modelo AHP de 8 variables",
        subtitle:
          "El observatorio aplica un proceso analítico jerárquico para priorizar territorialmente las azoteas con mayor aptitud para recibir un techo verde.",
        tag: "Metodología",
        paragraph1:
          "Las 8 variables —temperatura superficial, cobertura vegetal, densidad poblacional, calidad del aire, contexto urbano, biodiversidad, hidrología y viabilidad constructiva— se pesan mediante AHP (Saaty) y se combinan en un único índice de aptitud por sitio.",
        paragraph2:
          "La pre-factibilidad estructural actúa como una restricción ortogonal: reduce los m² efectivos disponibles según la edificación, pero no contamina el ranking AHP. Esta separación es deliberada porque mezclar criterios técnicos con criterios político-territoriales sería metodológicamente incorrecto.",
      },
    ],
    pesosAhp: [
      { variable: "Isla de calor (LST)", peso: "30.19 %" },
      { variable: "Cobertura vegetal (NDVI)", peso: "9.56 %" },
      { variable: "Densidad poblacional", peso: "17.10 %" },
      { variable: "Calidad del aire (O₃, NO₂)", peso: "12.85 %" },
      { variable: "Riesgo hídrico", peso: "9.40 %" },
      { variable: "Biodiversidad (Shannon)", peso: "8.75 %" },
      { variable: "Contexto urbano", peso: "7.65 %" },
      { variable: "Otros factores", peso: "4.50 %" },
    ],
    documentos: [
      {
        tipo: "Artículo Q1 · destacada",
        titulo: "Spatial suitability analysis for the implementation of green rooftops in highly urbanized Mexico City",
        autores: "Cervantes-Nájera, A. L., Martínez Rodríguez, M. C., et al.",
        anio: "2025",
        venue: "Sustainable Cities and Society — Elsevier (Q1)",
        descripcion: "Análisis multicriterio espacial (AHP, 8 variables). Identifica 428 km² prioritarios y 514,000 m² de potencial real. Sustento metodológico del observatorio.",
        href: "https://drive.google.com/file/d/1bBhh7Kz7eVNZ61sval7C2Zdwym5pO6PX/view",
        extension: "external",
        destacada: true,
      },
      {
        tipo: "Tesis doctoral",
        titulo: "Techos verdes una solución sustentable para la adaptación al cambio climático en la Ciudad de México",
        autores: "Cervantes Nájera, A. L. — Directora: Dra. María Concepción Martínez Rodríguez",
        anio: "2025",
        venue: "CIIEMAD-IPN",
        descripcion: "Marco de economía circular + soluciones basadas en la naturaleza. Defensa doctoral noviembre 2025.",
        href: "/docs/tesis-doctoral-cervantes-najera-2025.pdf",
        tamano: "5.4 MB",
        extension: "pdf",
      },
      {
        tipo: "Tesis de maestría",
        titulo: "Diseño, aplicación y evaluación de un techo verde ligero extensivo como estrategia para la adaptación al cambio climático en la alcaldía Gustavo A. Madero",
        autores: "Cervantes Nájera, A. L.",
        anio: "2021",
        venue: "CIIEMAD-IPN",
        descripcion: "Diseño, construcción y monitoreo del TVLE experimental de 6 m². −3.5 °C, 19.5 L/m²·año, 100 % de sobrevivencia vegetal.",
        href: "/docs/tesis-maestria-cervantes-najera-2021.pdf",
        tamano: "6.6 MB",
        extension: "pdf",
      },
      {
        tipo: "Capítulo de libro",
        titulo: "Techos verdes en las áreas urbanas y su relación con la Agenda 2030",
        autores: "Martínez Rodríguez, M. C. & Cervantes-Nájera, A. L.",
        anio: "2023",
        venue: "Repensar la Agenda 2030: Tendencias de sostenibilidad, cap. XIII",
        descripcion: "Mapeo de servicios ecosistémicos vs los 17 ODS. DOI 10.52501/cc.064.13.",
        href: "/docs/capitulo-2023-agenda-2030-cervantes-najera.pdf",
        tamano: "2.1 MB",
        extension: "pdf",
      },
      {
        tipo: "Capítulo académico",
        titulo: "Capítulo CIIEMAD 2021",
        autores: "Cervantes-Nájera, A. L.",
        anio: "2021",
        venue: "CIIEMAD-IPN",
        descripcion: "Antecedente teórico de la línea de investigación en techos verdes ligeros extensivos.",
        href: "/docs/capitulo-2021-cervantes-najera.pdf",
        tamano: "741 KB",
        extension: "pdf",
      },
      {
        tipo: "Informe parcial",
        titulo: "Informe parcial CIIEMAD — Observatorio",
        autores: "Cervantes Nájera, A. L.",
        anio: "2024",
        venue: "CIIEMAD-IPN",
        descripcion: "Reporte intermedio del proyecto de observatorio: avance metodológico, datos preliminares y siguiente fase.",
        href: "/docs/informe-parcial-ciiemad-cervantes-najera-2024.docx",
        tamano: "6.8 MB",
        extension: "docx",
      },
      {
        tipo: "Reporte final",
        titulo: "Reporte final del observatorio (ALCN · LECV)",
        autores: "Cervantes Nájera, A. L. & equipo LECV",
        anio: "2024",
        venue: "CIIEMAD-IPN",
        descripcion: "Entrega final del proyecto: arquitectura del observatorio, modelo AHP calibrado, inventario sembrado y métricas de impacto documentadas.",
        href: "/docs/reporte-final-observatorio-2024.docx",
        tamano: "11 MB",
        extension: "docx",
      },
      {
        tipo: "Artículo internacional",
        titulo: "Roofpedia — Automatic mapping of green and solar roofs",
        autores: "Wu, A. N. & Biljecki, F.",
        anio: "2021",
        venue: "Landscape and Urban Planning, Elsevier (Q1) · DOI 10.1016/j.landurbplan.2021.104167",
        descripcion: "State of the art en mapeo de techos verdes con redes convolucionales sobre OSM. Cubre 17 ciudades y >1M edificios.",
        href: "/docs/roofpedia-wu-biljecki-2021.pdf",
        tamano: "20 MB",
        extension: "pdf",
      },
      {
        tipo: "Normativa",
        titulo: "NADF-013-RNAT-2017 — Norma Ambiental para azoteas naturadas",
        autores: "Secretaría del Medio Ambiente (SEDEMA), CDMX",
        anio: "2017",
        venue: "Gaceta Oficial CDMX",
        descripcion: "Especificaciones técnicas para el diseño, construcción y mantenimiento de azoteas naturadas en la Ciudad de México.",
        href: "https://data.sedema.cdmx.gob.mx/sitios/conadf/documentos/NADF_013_RNAT_2017.pdf",
        extension: "external",
      },
    ],
    datos: [
      {
        nombre: "Inventario de techos verdes",
        formato: "CSV / JSON",
        registros: "57 registros",
        estado: "Disponible",
        descripcion:
          "Coordenadas, tipología, superficie, alcaldía, fecha de instalación.",
        slug: "inventario",
      },
      {
        nombre: "Candidatos priorizados",
        formato: "CSV / JSON",
        registros: "60 sitios",
        estado: "Disponible",
        descripcion:
          "Score AHP, viabilidad estructural y atributos catastrales.",
        slug: "candidatos",
      },
      {
        nombre: "Indicadores por alcaldía",
        formato: "CSV",
        registros: "16 alcaldías × 4 dominios",
        estado: "En preparación",
        descripcion:
          "Biodiversidad (Shannon, Simpson), hídricos, estructurales, espectrales.",
        slug: "indicadores",
      },
    ],
    citar: [
      {
        titleApa: "Formato APA 7",
        titleBibtex: "BibTeX",
        nota: "Si tu trabajo cita el modelo AHP o los datos del TVLE, te pedimos también referenciar el artículo Q1: Cervantes-Nájera et al. (2025), Sustainable Cities and Society.",
        apa: "Cervantes-Nájera, A. L., & Martínez Rodríguez, M. C. (2025). Observatorio de Techos Verdes CDMX. CIIEMAD-IPN. https://observatorio.cercu.com.mx",
        bibtex: `@misc{observatorio_techos_verdes_2025,\n  author       = {Cervantes-N\\\\'ajera, Ana Laura and Mart\\\\'inez Rodr\\\\'iguez, Mar\\\\'ia Concepci\\\\'on},\n  title        = {Observatorio de Techos Verdes CDMX},\n  year         = {2025},\n  institution  = {CIIEMAD, Instituto Polit\\\\'ecnico Nacional},\n  url          = {https://observatorio.cercu.com.mx},\n  note         = {Plataforma digital de monitoreo y an\\\\'alisis geoespacial}\n}`,
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
      // ciiemadShowcase, ciiemadPubs, ciiemadKpis fueron retirados del catálogo:
      // el bloque CIIEMAD se consolidó en /aprende#caso-ciiemad. Los defaults
      // se conservan en cmsDefaults.home para compatibilidad con backend ya
      // sembrado pero el admin ya no los expone.
      {
        key: "respaldo",
        label: "Aviso técnico",
        help: "Disclaimer al final del home.",
      },
      {
        key: "audienceGate",
        label: "Puertas por audiencia (4 cards)",
        help: "Cards de entrada después del hero: Aprende, Explora, Investigación, Comunidad.",
      },
      {
        key: "academicHighlight",
        label: "Banner académico destacado",
        help: "Banner con la publicación Q1 de Cervantes-Nájera 2025 (SCS Elsevier).",
      },
      { key: "cta", label: "CTA final", help: "Última llamada a la acción." },
    ],
  },
  {
    slug: "aprende",
    title: "Aprende",
    description:
      "Hub educativo para público general: qué es un techo verde, capas, tipologías, beneficios y caso CIIEMAD.",
    preview: "/aprende",
    icon: "lucide:book-open",
    sections: [
      { key: "hero", label: "Hero" },
      { key: "intro", label: "¿Qué es un techo verde?" },
      {
        key: "capas",
        label: "Las 6 capas",
        help: "Anatomía de un techo verde, de abajo hacia arriba.",
      },
      {
        key: "tipologias",
        label: "Tipologías (3 cards)",
        help: "Extensivo (TVLE), semi-intensivo, intensivo. Datos técnicos clave.",
      },
      {
        key: "beneficios",
        label: "Beneficios (4 cards)",
        help: "Térmico, hídrico, atmosférico, social.",
      },
      {
        key: "casoIntro",
        label: "Intro del caso CIIEMAD",
      },
      {
        key: "casoCiiemad",
        label: "Caso CIIEMAD — datos (6 stats)",
        help: "Datos del TVLE experimental.",
      },
      {
        key: "galeria",
        label: "Galería del techo verde (10 fotos)",
        help: "Imágenes del techo verde CIIEMAD en operación: PPTX divulgativo 2023, INFORME PARCIAL y vista aérea de la tesis doctoral. Cada item: src, alt, caption.",
      },
      { key: "cta", label: "CTA final" },
    ],
  },
  {
    slug: "investigacion",
    title: "Investigación",
    description:
      "Hub académico: marco CIIEMAD-IPN, publicaciones, metodología, datos abiertos y citación.",
    preview: "/investigacion",
    icon: "lucide:graduation-cap",
    sections: [
      { key: "hero", label: "Hero" },
      {
        key: "marco",
        label: "Marco institucional CIIEMAD",
      },
      {
        key: "equipo",
        label: "Equipo (3 cards)",
        help: "Directora, autora, comité tutorial.",
      },
      {
        key: "publicaciones",
        label: "Publicaciones (5+ cards)",
        help: "Artículo Q1, tesis 2025/2021, capítulo 2023, Roofpedia.",
      },
      {
        key: "metodologia",
        label: "Resumen metodología AHP",
      },
      {
        key: "pesosAhp",
        label: "Pesos AHP (tabla)",
        help: "8 variables con sus porcentajes.",
      },
      {
        key: "datos",
        label: "Datos abiertos (3 datasets)",
      },
      {
        key: "documentos",
        label: "Documentos descargables",
        help: "Tesis, capítulos, informes y normativa. Editable para añadir nuevos PDFs en /public/docs.",
      },
      {
        key: "citar",
        label: "Citación (APA + BibTeX)",
      },
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
    description: "Encabezado y 8 KPIs del header de la sección de indicadores.",
    preview: "/indicadores",
    icon: "lucide:bar-chart-3",
    sections: [
      { key: "hero", label: "Hero" },
      {
        key: "kpis",
        label: "KPIs del header (8 cards)",
        help: "Cada item: label, valor, unidad, icono (leaf/area/target/co2/map/chart/score/pilot…), color (primary/eco/secondary/accent/alert/violet/teal/rose/indigo), cambio (opcional).",
      },
    ],
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
      {
        key: "ods",
        label: "ODS conectados (7 cards)",
        help: "Cada ODS: num, color, titulo, via, rol, cita + array de metas.",
      },
      {
        key: "datos",
        label: "Stats académicos del capítulo (6)",
        help: "Cifras destacadas: target/display, unidad, detalle, fuente, href.",
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
