// Glosario centralizado del admin de techos-verdes. Cada entrada es una
// definición corta (≤180 chars) en lenguaje accesible para editores sin
// background técnico.
//
// Uso:
//   <AdminInfoTooltip :text="GLOSSARY.ahp">AHP</AdminInfoTooltip>

export const GLOSSARY = {
  // ── Tipologías de techo verde ──
  techoVerde:
    'Techo Verde: cubierta vegetal sobre la azotea de un edificio, con sustrato + drenaje + impermeabilización. Aporta sombra, captura CO2, filtra agua de lluvia.',
  extensivo:
    'Techo verde extensivo: capa fina (5-15 cm de sustrato), vegetación tipo sedum/musgos, bajo mantenimiento. Adecuado para mayoría de azoteas existentes.',
  intensivo:
    'Techo verde intensivo: capa gruesa (>20 cm), permite arbustos y árboles pequeños. Requiere mantenimiento frecuente y estructura reforzada.',
  semiIntensivo:
    'Techo verde semi-intensivo: combina ambos sistemas. 15-20 cm de sustrato, vegetación variada (gramíneas, suculentas, algunos arbustos pequeños).',

  // ── Sistema AHP de priorización ──
  ahp:
    'Analytic Hierarchy Process: método de Saaty para priorizar alternativas usando criterios ponderados. Aquí evalúa qué azotea es mejor candidata a techo verde.',
  scoreAptitud:
    'Puntaje 0-100 que combina 8 criterios AHP (área, rectangularidad, niveles, material del techo, pendiente, obstrucciones, accesibilidad, carga estructural).',
  rectangularidad:
    'Qué tan rectangular es la planta del edificio (ratio área/área del bbox). Ayuda a decidir si la instalación será compleja o sencilla.',
  cargaEstructural:
    'Capacidad estimada de la losa para soportar el peso adicional del sustrato + vegetación + agua. Subestimar este criterio es peligroso estructuralmente.',
  pendiente:
    'Inclinación del techo. Pendientes < 5% son ideales para extensivos; > 30% requieren sistemas anclados especiales.',
  confianzaIA:
    'Nivel de certeza del modelo Gemini al analizar la imagen del techo (alta / media / baja). Determina si requiere validación manual.',
  porcentajeConfianza:
    'Score numérico 0-100% que el modelo Gemini asigna a su clasificación. < 70% típicamente requiere visita en sitio.',

  // ── Estados del workflow ──
  prospecto:
    'Azotea candidata detectada por el detector OSM (queries por edificios planos en CDMX). Pendiente de aprobación humana antes de pasar a candidatos.',
  candidato:
    'Azotea aprobada como apta para techo verde, con score AHP calculado. Listo para validación en campo o por IA Gemini.',
  validacion:
    'Registro de validación humana o IA sobre un candidato. Confirma o rechaza la aptitud y deja notas para futuras instalaciones.',
  estatus:
    'candidato (recién priorizado), factibilidad_pendiente (requiere visita), confirmado (validado), descartado (no apto), instalado (techo verde construido).',

  // ── Detector OSM ──
  detectorOsm:
    'Pipeline que consulta OpenStreetMap (way[building] en bbox CDMX) y filtra por área y rectangularidad para identificar azoteas planas grandes.',
  overpass:
    'API pública de OSM que ejecuta queries geoespaciales sin auth (https://overpass-api.de). El detector la usa con timeout 30s y throttle 1.5s entre alcaldías.',

  // ── IA + remote sensing ──
  gemini:
    'Google Gemini 2.0 Flash: modelo multimodal que analiza la imagen del techo y devuelve aptitud, materiales, obstrucciones y tipo de techo verde recomendado.',
  visionAI:
    'Sistema de análisis visual que combina Gemini para clasificación + OpenCV para mediciones geométricas. Devuelve score 0-100 y notas técnicas.',
  ndvi:
    'Normalized Difference Vegetation Index. Mide vegetación viva con bandas rojo + NIR. Útil para detectar techos verdes ya instalados (NDVI > 0.3).',
  ndwi:
    'Normalized Difference Water Index. Detecta cuerpos de agua o vegetación estresada. NDWI alto puede indicar acumulación de agua sobre el techo.',
  evi:
    'Enhanced Vegetation Index. Variante mejorada del NDVI que reduce ruido atmosférico — más confiable en zonas urbanas con polvo y aerosoles.',
  savi:
    'Soil-Adjusted Vegetation Index. Compensa el ruido del suelo desnudo. Útil cuando la vegetación del techo es escasa y se ve mucho sustrato.',
  lst:
    'Land Surface Temperature: temperatura de la superficie medida desde satélite. Comparar techos con/sin verde mide el efecto isla de calor mitigado.',
  gee:
    'Google Earth Engine: plataforma de Google para computar índices satelitales sobre cualquier polígono. Requiere service-account key.',
  sentinelHub:
    'Servicio EO Browser de Sinergise que entrega imágenes Sentinel-2/Landsat. Alternativa/fallback cuando GEE no está configurado.',

  // ── CMS / contenido editorial ──
  cms:
    'Sistema para editar copy del sitio público (home, sobre, indicadores, etc.) sin tocar código. Cada cambio se publica al guardar.',
  pageSlug:
    'Identificador estable de una página en el CMS (home, sobre, metodologia, indicadores). Se usa en la URL del editor.',
  sectionKey:
    'Identificador estable de una sección dentro de una página (hero, features, criterios…). Junto con el pageSlug determina qué bloque editas.',
  cmsItem:
    'Cada bloque editable de una sección. Algunas secciones tienen un solo bloque (hero), otras una lista (features tiene 3, etc.).',

  // ── Geometría / mapa ──
  alcaldia:
    'Demarcación territorial de la CDMX (16 alcaldías). El inventario y los candidatos se clasifican por la alcaldía donde se ubican.',
  bbox:
    'Bounding Box: rectángulo geográfico (lat/lng min y max) que delimita el área de búsqueda del detector OSM. Reduce la consulta a la zona de interés.',

  // ── Identidad de datos ──
  slug:
    'Identificador URL-friendly único (sólo a-z, 0-9, guiones). Inmutable tras crear — referenciado por otros registros y por las rutas públicas.',
  visible:
    'Si está apagado, el registro NO aparece en el sitio público pero sigue editable desde admin (útil para borradores).',
  archived:
    'Soft-delete: el registro queda invisible y no se cuenta en KPIs públicos, pero sigue en BD para auditoría. Preferir archivar antes que borrar.',
  trackingEvent:
    'Visita o click registrado de forma anónima (sesión local, sin PII). Alimenta la pestaña Interacciones de /admin/analytics.',
} as const

export type GlossaryKey = keyof typeof GLOSSARY
