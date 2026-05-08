<script setup lang="ts">
// Manual del observatorio — embebido en /admin (dashboard).
// Pensado para personas sin formacion tecnica: lenguaje accesible que cualquier
// integrante del equipo entienda, pero tecnicamente honesto. Cada seccion abre/cierra
// para que el panel no abrume y el manual sea consultable como referencia.
const sections = [
  { key: 'que-es', label: '¿Qué es este observatorio?', icon: 'lucide:trees' },
  { key: 'flujo', label: 'Flujo de los datos', icon: 'lucide:git-branch' },
  { key: 'sat', label: 'Percepción remota e índices', icon: 'lucide:satellite' },
  { key: 'detector', label: 'Detector de candidatos OSM', icon: 'lucide:radar' },
  { key: 'ahp', label: 'AHP — Modelo multicriterio', icon: 'lucide:scale' },
  { key: 'ia', label: 'Validación visual con IA', icon: 'lucide:eye' },
  { key: 'tipos', label: 'Tipologías de techo verde', icon: 'lucide:layers' },
  { key: 'tracking', label: 'Tracking de uso', icon: 'lucide:activity' },
  { key: 'glosario', label: 'Glosario de siglas', icon: 'lucide:book-open' },
  { key: 'limites', label: 'Limitaciones honestas', icon: 'lucide:triangle-alert' },
] as const

type SectionKey = typeof sections[number]['key']
const open = ref<SectionKey | null>('que-es')
const toggle = (k: SectionKey) => { open.value = open.value === k ? null : k }
</script>

<template>
  <section class="card overflow-hidden">
    <header class="flex items-start gap-3 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-eco/5 p-5">
      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon name="lucide:book-open-check" size="20" />
      </div>
      <div class="flex-1">
        <h2 class="text-base font-semibold text-ink">Manual del observatorio</h2>
        <p class="mt-1 text-xs text-ink-muted">
          Cómo funciona la plataforma, de dónde vienen los datos, qué hace cada análisis y
          por qué lo decidimos así. Pensado para que cualquier persona del equipo entienda lo que
          ve en los paneles, sin necesidad de leer código.
        </p>
      </div>
    </header>

    <ul class="divide-y divide-gray-100">
      <li v-for="s in sections" :key="s.key">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-3 px-5 py-3 text-left transition-colors hover:bg-gray-50"
          :class="open === s.key ? 'bg-primary/5' : ''"
          @click="toggle(s.key)"
        >
          <span class="flex items-center gap-3">
            <Icon :name="s.icon" size="16" class="text-primary" />
            <span class="text-sm font-medium text-ink">{{ s.label }}</span>
          </span>
          <Icon
            name="lucide:chevron-down"
            size="16"
            class="text-ink-muted transition-transform"
            :class="open === s.key ? 'rotate-180' : ''"
          />
        </button>

        <div v-if="open === s.key" class="space-y-3 px-5 pb-5 text-sm leading-relaxed text-ink">

          <!-- ─────────────────────────── ¿QUÉ ES? ─────────────────────────── -->
          <template v-if="s.key === 'que-es'">
            <p>
              El <strong>Observatorio de Techos Verdes CDMX</strong> es una plataforma que
              integra cuatro frentes para analizar y priorizar techos verdes en la Ciudad de
              México:
            </p>
            <ul class="ml-5 list-disc space-y-1 text-ink-muted">
              <li>
                <strong class="text-ink">Inventario operativo</strong> — 57 techos verdes
                documentados (escuelas, hospitales, oficinas) con tipo, superficie y estado.
              </li>
              <li>
                <strong class="text-ink">Modelo de aptitud (AHP)</strong> — 8 variables
                ponderadas que dan un score 0–100 a cada azotea candidata: superficie,
                rectangularidad, niveles, material del techo, pendiente, obstrucciones,
                accesibilidad y carga estructural.
              </li>
              <li>
                <strong class="text-ink">Validación visual con IA</strong> — Google Gemini
                Vision analiza fotos cenitales de azoteas y entrega una predicción de
                idoneidad para Techo Verde Ligero Extensivo (TVLE).
              </li>
              <li>
                <strong class="text-ink">Reportes ciudadanos</strong> — el formulario público
                permite que cualquier persona reporte una azotea probable; cada reporte pasa
                por la cola en <code>/admin/prospectos</code> antes de publicarse.
              </li>
            </ul>
            <p>
              La meta no es competir con SEDEMA o CONABIO; es <em>integrar</em> sus datos
              abiertos con observación local y dejar todo en un lugar accesible para academia,
              gobierno y comunidad.
            </p>
          </template>

          <!-- ─────────────────────────── FLUJO ─────────────────────────── -->
          <template v-else-if="s.key === 'flujo'">
            <p>
              El recorrido típico de un dato — desde que entra al inventario hasta que aparece
              en el panel público:
            </p>
            <ol class="ml-5 list-decimal space-y-1.5 text-ink-muted">
              <li>
                <strong class="text-ink">Origen</strong>: una publicación SEDEMA, un PDF
                institucional, un detector OSM o un reporte ciudadano vía
                <code>/registra</code>.
              </li>
              <li>
                <strong class="text-ink">Captura</strong>: el equipo registra el techo verde
                en <code>/admin/techos-verdes</code> con sus campos técnicos. Cada registro
                lleva su <strong>fuente</strong> citada explícitamente.
              </li>
              <li>
                <strong class="text-ink">Almacenamiento</strong>: cercu-backend lo guarda en
                MySQL (<code>obs_green_roofs</code>) con marcas <code>visible</code> y
                <code>archivado</code> para curar qué se publica.
              </li>
              <li>
                <strong class="text-ink">Validación</strong>: si vino de la cola de
                prospectos, un revisor verifica datos, asigna atribución a un contribuyente
                y aprueba o rechaza con notas.
              </li>
              <li>
                <strong class="text-ink">Publicación</strong>: una vez <code>visible=true</code>,
                aparece en <code>/inventario</code>, <code>/mapa</code> y se cuenta en los
                KPIs de <code>/aptitud</code>.
              </li>
              <li>
                <strong class="text-ink">Visualización</strong>: tarjetas, mapas Leaflet,
                gráficas Chart.js. Quien decide qué hacer con la información sigue siendo
                humano.
              </li>
            </ol>
          </template>

          <!-- ─────────────────────────── PERCEPCIÓN REMOTA ─────────────────────────── -->
          <template v-else-if="s.key === 'sat'">
            <p>
              Para complementar el inventario en campo usamos imágenes satelitales que miden
              vegetación, área construida y temperatura superficial. Tres índices son clave:
            </p>

            <div class="rounded-xl border border-eco/15 bg-eco/5 p-4">
              <p class="font-semibold text-ink">🌱 NDVI — Vegetación</p>
              <p class="mt-1 text-xs">
                <code>NDVI = (NIR − Red) / (NIR + Red)</code>. Bandas
                <code>B08</code> (NIR) y <code>B04</code> (rojo) de Sentinel-2.
                <strong>Uso</strong>: detectar techos verdes existentes y monitorear su
                estado en el tiempo. Vegetación densa: NDVI &gt; 0.6.
              </p>
            </div>

            <div class="rounded-xl border border-secondary/15 bg-secondary/5 p-4">
              <p class="font-semibold text-ink">🏗️ NDBI — Construcción</p>
              <p class="mt-1 text-xs">
                <code>NDBI = (SWIR − NIR) / (SWIR + NIR)</code>. Bandas <code>B11</code>
                (SWIR) y <code>B08</code> (NIR). Concreto, asfalto y techos pétreos tienen
                NDBI &gt; 0. <strong>Uso</strong>: identificar azoteas planas susceptibles
                de naturación.
              </p>
            </div>

            <div class="rounded-xl border border-accent/15 bg-accent/5 p-4">
              <p class="font-semibold text-ink">🌡️ LST — Temperatura superficial</p>
              <p class="mt-1 text-xs">
                Land Surface Temperature de Landsat 8/9. <strong>Uso</strong>: comparar
                techos con vegetación vs. techos planos. Diferencias de 3–8 °C son evidencia
                del servicio de regulación térmica.
              </p>
            </div>
          </template>

          <!-- ─────────────────────────── DETECTOR OSM ─────────────────────────── -->
          <template v-else-if="s.key === 'detector'">
            <p>
              El módulo <code>/admin/detector</code> busca <strong>azoteas candidatas</strong>
              en OpenStreetMap. La lógica:
            </p>
            <ol class="ml-5 list-decimal space-y-1 text-ink-muted">
              <li>
                Usuario define un bbox (rectángulo geográfico) sobre la CDMX y parámetros.
              </li>
              <li>
                cercu-backend consulta <strong>Overpass API</strong> con tags
                <code>building=*</code>, filtrando por área mínima y altura cuando está
                disponible.
              </li>
              <li>
                <strong>Turf.js</strong> calcula área, rectangularidad y centroide de cada
                edificio.
              </li>
              <li>
                Cada candidato recibe un <strong>scoreAptitud</strong> preliminar (0–100)
                aplicando los 8 pesos AHP a las variables disponibles desde OSM
                (rectangularidad, niveles, área).
              </li>
              <li>
                Los candidatos más prometedores pueden enviarse a <strong>validación visual
                con IA</strong> para confirmar idoneidad.
              </li>
            </ol>
            <p class="text-xs text-ink-muted">
              <strong>Costo: $0.</strong> OSM y Overpass son dominio público; Turf.js corre
              en JS sin servicios pagados.
            </p>
          </template>

          <!-- ─────────────────────────── AHP ─────────────────────────── -->
          <template v-else-if="s.key === 'ahp'">
            <p>
              <strong>AHP (Analytic Hierarchy Process)</strong> es un método de toma de
              decisiones multicriterio creado por Thomas L. Saaty (1980). Permite combinar
              variables heterogéneas (área, pendiente, accesibilidad) en un único score
              comparable. Aquí lo usamos con 8 variables ponderadas:
            </p>
            <ul class="ml-5 list-disc space-y-1 text-xs text-ink-muted">
              <li><strong class="text-ink">Área</strong>: superficie útil de la azotea (mayor = mejor).</li>
              <li><strong class="text-ink">Rectangularidad</strong>: qué tan regular es la planta. Geometrías irregulares dificultan la instalación.</li>
              <li><strong class="text-ink">Niveles</strong>: número de pisos del edificio.</li>
              <li><strong class="text-ink">Material del techo</strong>: losa de concreto vs. lámina, asbesto, teja.</li>
              <li><strong class="text-ink">Pendiente</strong>: techos planos (≤5%) son ideales; pendientes pronunciadas requieren sistemas más caros.</li>
              <li><strong class="text-ink">Obstrucciones</strong>: tinacos, antenas, ductos. Más obstrucciones = menor área aprovechable.</li>
              <li><strong class="text-ink">Accesibilidad</strong>: ¿cómo se llega al techo? ¿hay escalera de servicio?</li>
              <li><strong class="text-ink">Carga estructural</strong>: ¿el edificio soporta el peso adicional? Estimación pre-factibilidad.</li>
            </ul>
            <p class="text-xs text-ink-muted">
              Los pesos están en <code>data/aptitud-pesos.ts</code>. Cualquier ajuste a los
              pesos <em>reordena</em> la lista de candidatos — es un parámetro político, no
              solo técnico. El admin puede editarlos cuando un proyecto piloto cambia las
              prioridades (por ejemplo, una alcaldía que quiere priorizar accesibilidad).
            </p>
          </template>

          <!-- ─────────────────────────── IA ─────────────────────────── -->
          <template v-else-if="s.key === 'ia'">
            <p>
              <strong>Validación visual con Google Gemini Vision</strong>: el módulo
              <code>/admin/validaciones</code> sube una foto cenital de la azotea (drone,
              Google Earth, satelital) a Gemini Vision con un prompt estructurado en
              español. El modelo regresa:
            </p>
            <ul class="ml-5 list-disc space-y-1 text-xs text-ink-muted">
              <li><strong class="text-ink">Predicción</strong>: descripción técnica del techo (ej. "Techo plano de concreto, pocas obstrucciones, apto para TVLE").</li>
              <li><strong class="text-ink">Confianza</strong>: alta / media / baja con porcentaje numérico.</li>
              <li><strong class="text-ink">Decisión humana</strong>: el revisor confirma, descarta o pide revisión adicional.</li>
            </ul>
            <p class="text-xs text-ink-muted">
              <strong>Importante:</strong> la IA <em>no</em> decide — solo orienta al
              revisor humano. Las predicciones quedan en <code>obs_validation_records</code>
              con su porcentaje de confianza para auditoría posterior.
            </p>
          </template>

          <!-- ─────────────────────────── TIPOS ─────────────────────────── -->
          <template v-else-if="s.key === 'tipos'">
            <p>
              Los techos verdes se clasifican por <strong>profundidad de sustrato y
              vegetación</strong>:
            </p>
            <div class="space-y-2">
              <div class="rounded-lg border border-eco/20 bg-eco/5 p-3 text-xs">
                <strong class="text-ink">Extensivo (TVLE)</strong> — Techo Verde Ligero
                Extensivo. Sustrato 5–15 cm, vegetación tipo sedum, mantenimiento bajo.
                Carga 60–150 kg/m². Es el más común y barato. ~70% del inventario.
              </div>
              <div class="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs">
                <strong class="text-ink">Semi-intensivo</strong>. Sustrato 15–30 cm,
                herbáceas y arbustos pequeños. Carga 150–300 kg/m². Mantenimiento medio,
                riego ocasional.
              </div>
              <div class="rounded-lg border border-accent/20 bg-accent/5 p-3 text-xs">
                <strong class="text-ink">Intensivo</strong>. Sustrato &gt;30 cm, jardín
                completo con arbustos y árboles pequeños. Carga 300–1000 kg/m². Es un
                jardín en altura — alto mantenimiento, alto costo, alto valor.
              </div>
            </div>
            <p class="text-xs text-ink-muted">
              En la base se guarda como <code>tipoTechoVerde</code> con valores
              <code>extensivo | semi-intensivo | intensivo</code>.
            </p>
          </template>

          <!-- ─────────────────────────── TRACKING ─────────────────────────── -->
          <template v-else-if="s.key === 'tracking'">
            <p>
              Para entender qué se usa de la plataforma, registramos eventos básicos
              (página, click en techo, descarga, búsqueda) en <code>useTracking()</code>.
              Lo guardamos en <code>obs_interaction_events</code> en cercu-backend — sin
              cookies de seguimiento, sin venta de datos, sin huellas de navegador.
            </p>
            <ul class="ml-5 list-disc space-y-1 text-xs text-ink-muted">
              <li>Identificamos sesiones por un id anónimo en localStorage.</li>
              <li>Si la persona está autenticada como admin, asociamos al <code>adminId</code> para auditoría interna.</li>
              <li>Los datos agregados se ven en <code>/admin/analytics</code>.</li>
            </ul>
          </template>

          <!-- ─────────────────────────── GLOSARIO ─────────────────────────── -->
          <template v-else-if="s.key === 'glosario'">
            <p>Acrónimos que aparecen en los paneles:</p>
            <dl class="grid gap-2 text-xs sm:grid-cols-2">
              <div class="rounded-lg border border-gray-100 bg-white p-3">
                <dt class="font-semibold text-ink">TVLE</dt>
                <dd class="text-ink-muted">Techo Verde Ligero Extensivo (sustrato 5–15 cm).</dd>
              </div>
              <div class="rounded-lg border border-gray-100 bg-white p-3">
                <dt class="font-semibold text-ink">AHP</dt>
                <dd class="text-ink-muted">Analytic Hierarchy Process. Saaty (1980). Método multicriterio.</dd>
              </div>
              <div class="rounded-lg border border-gray-100 bg-white p-3">
                <dt class="font-semibold text-ink">scoreAptitud</dt>
                <dd class="text-ink-muted">Puntaje 0–100 que combina las 8 variables AHP.</dd>
              </div>
              <div class="rounded-lg border border-gray-100 bg-white p-3">
                <dt class="font-semibold text-ink">NDVI / NDBI</dt>
                <dd class="text-ink-muted">Índices Sentinel-2 de vegetación / construcción.</dd>
              </div>
              <div class="rounded-lg border border-gray-100 bg-white p-3">
                <dt class="font-semibold text-ink">LST</dt>
                <dd class="text-ink-muted">Land Surface Temperature (Landsat 8/9).</dd>
              </div>
              <div class="rounded-lg border border-gray-100 bg-white p-3">
                <dt class="font-semibold text-ink">SEDEMA</dt>
                <dd class="text-ink-muted">Secretaría del Medio Ambiente, Gobierno de la CDMX.</dd>
              </div>
              <div class="rounded-lg border border-gray-100 bg-white p-3">
                <dt class="font-semibold text-ink">CIIEMAD</dt>
                <dd class="text-ink-muted">Centro Interdisciplinario IPN.</dd>
              </div>
              <div class="rounded-lg border border-gray-100 bg-white p-3">
                <dt class="font-semibold text-ink">ODS</dt>
                <dd class="text-ink-muted">Objetivos de Desarrollo Sostenible (ONU).</dd>
              </div>
              <div class="rounded-lg border border-gray-100 bg-white p-3">
                <dt class="font-semibold text-ink">OSM / Overpass</dt>
                <dd class="text-ink-muted">OpenStreetMap y su API de consultas.</dd>
              </div>
              <div class="rounded-lg border border-gray-100 bg-white p-3">
                <dt class="font-semibold text-ink">Turf.js</dt>
                <dd class="text-ink-muted">Librería JS de geometría espacial (área, intersección, buffer).</dd>
              </div>
            </dl>
          </template>

          <!-- ─────────────────────────── LIMITACIONES ─────────────────────────── -->
          <template v-else-if="s.key === 'limites'">
            <p>
              Lo que el observatorio <em>no</em> es y lo que <em>no</em> hace bien — para
              que nadie se confunda:
            </p>
            <ul class="space-y-2 text-xs">
              <li class="rounded-lg border border-alert/20 bg-alert/5 p-3">
                <strong class="text-ink">No reemplaza una memoria de cálculo estructural.</strong>
                El score de carga estructural es una estimación a partir de datos públicos
                (edad del edificio, materiales típicos por alcaldía). Para instalar un
                techo verde se necesita un dictamen de un ingeniero estructural.
              </li>
              <li class="rounded-lg border border-alert/20 bg-alert/5 p-3">
                <strong class="text-ink">La IA no decide, orienta.</strong> Gemini Vision
                tiene un porcentaje de error visible en cada predicción. Las decisiones
                finales requieren revisor humano y, idealmente, visita en sitio.
              </li>
              <li class="rounded-lg border border-alert/20 bg-alert/5 p-3">
                <strong class="text-ink">Cobertura sesgada.</strong> Lo que ves está
                limitado a lo que SEDEMA y otras dependencias han publicado. Probablemente
                hay techos privados de oficinas o casas particulares sin documentación
                pública.
              </li>
              <li class="rounded-lg border border-alert/20 bg-alert/5 p-3">
                <strong class="text-ink">Pesos AHP son una decisión política.</strong>
                Cambiar los pesos cambia el ranking. Cualquier ajuste debe estar
                documentado y discutido con el equipo, no aplicarse en silencio.
              </li>
              <li class="rounded-lg border border-alert/20 bg-alert/5 p-3">
                <strong class="text-ink">Datos satelitales con caché.</strong> Las series
                NDVI/NDBI/LST son mensuales. Eventos puntuales (una tormenta, un retiro de
                vegetación) pueden perderse entre observaciones.
              </li>
            </ul>
          </template>

        </div>
      </li>
    </ul>
  </section>
</template>
