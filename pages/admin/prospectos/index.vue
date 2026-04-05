<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

const { apiFetch } = useApi()
const config = useRuntimeConfig()
const observatory = config.public.observatory as string

// ── Tab state ──
const activeTab = ref<'cola' | 'detector'>('cola')

// ═══════════════════════════════════════════════════════════
//  COLA DE APROBACION state
// ═══════════════════════════════════════════════════════════
const prospects = ref<any[]>([])
const loadingProspects = ref(true)
const filter = ref('pendiente')

async function loadProspects() {
  loadingProspects.value = true
  try {
    const res = await apiFetch(
      `/observatory/${observatory}/admin/prospectos?status=${filter.value}`
    )
    prospects.value = res.items || []
  } catch {
    prospects.value = []
  }
  loadingProspects.value = false
}

onMounted(loadProspects)
watch(filter, loadProspects)

async function approve(id: number) {
  try {
    await apiFetch(`/observatory/${observatory}/admin/prospectos/${id}/aprobar`, { method: 'POST' })
    await loadProspects()
  } catch (e: any) {
    alert(e?.data?.error?.message || 'Error al aprobar')
  }
}

const rejectNotes = ref('')
const rejectingId = ref<number | null>(null)

function startReject(id: number) {
  rejectingId.value = id
  rejectNotes.value = ''
}

async function confirmReject() {
  if (!rejectingId.value || !rejectNotes.value) return
  try {
    await apiFetch(`/observatory/${observatory}/admin/prospectos/${rejectingId.value}/rechazar`, {
      method: 'POST',
      body: { notas: rejectNotes.value },
    })
    rejectingId.value = null
    await loadProspects()
  } catch (e: any) {
    alert(e?.data?.error?.message || 'Error al rechazar')
  }
}

// ═══════════════════════════════════════════════════════════
//  DETECTOR state
// ═══════════════════════════════════════════════════════════
const allResults = ref<any[]>([])
const selected = ref<Set<number>>(new Set())
const loadingDetector = ref(false)
const submitting = ref(false)
const detectorPhase = ref<'config' | 'results'>('config')
const showFilters = ref(true)
const expandedRow = ref<number | null>(null)
const showMethodology = ref(false)
const showConfigMethodology = ref(false)

// ── Detection params ──
const minArea = ref(200)
const maxArea = ref(50000)
const minScore = ref(30)
const bbox = reactive({ south: 19.42, west: -99.15, north: 19.44, east: -99.12 })

// ── Pagination ──
const detectorPage = ref(1)
const perPage = ref(25)

// ── Advanced filters ──
const detectorFilters = reactive({
  search: '', tipoEdificio: '', scoreMin: 0, scoreMax: 100,
  areaMin: 0, areaMax: 999999, ndviMin: 0, carga: '', zonaSismica: '',
  sortBy: 'score' as string, sortDir: 'desc' as 'asc' | 'desc',
})

// ── Column definitions with tooltips ──
const columns = [
  { key: 'indices.refId', label: 'Ref', align: 'left', tip: 'Identificador único del edificio en OpenStreetMap (Way ID). Permite rastrear y verificar el edificio en osm.org.' },
  { key: 'nombre', label: 'Nombre', align: 'left', tip: 'Nombre del edificio según OSM, o identificador genérico con tipo + OSM ID si no tiene nombre.' },
  { key: 'tipo', label: 'Tipo', align: 'left', tip: 'Clasificación del edificio en OSM (commercial, hospital, school, etc.). Los tipos institucional/comercial reciben mayor puntaje por mayor probabilidad de techo plano y capacidad estructural.' },
  { key: 'score', label: 'Score', align: 'right', tip: 'Puntaje compuesto (0-100) de 6 criterios: superficie (máx 25), rectangularidad (máx 20), tipo edificio (máx 15), material techo (máx 15), niveles (máx 10), identificación (máx 5). Click en ▶ para ver desglose.' },
  { key: 'areaM2', label: 'm²', align: 'right', tip: 'Superficie de la huella del edificio en metros cuadrados. Calculada geométricamente con Turf.js sobre el polígono OSM. Edificios más grandes tienen mayor potencial de impacto ambiental.' },
  { key: 'indices.ndviPotencial', label: 'NDVI pot.', align: 'right', tip: 'Índice de Vegetación Normalizado potencial (0-1). NO es NDVI satelital. Es un proxy que estima viabilidad de vegetación en azotea: base 0.3 + techo concreto/plano (+0.3) + carga apta (+0.2) + área >=500m² (+0.1). Para NDVI real se requiere Sentinel-2 vía GEE.' },
  { key: 'indices.rectangularidad', label: 'Rect.', align: 'right', tip: 'Rectangularidad: area_poligono / area_bounding_box (0-100%). Techos planos son típicamente rectangulares. >=85% indica geometría ideal para instalación modular de TVLE. Calculado con turf.area() y turf.bbox().' },
  { key: 'indices.compacidad', label: 'Comp.', align: 'right', tip: 'Índice Polsby-Popper: 4*PI*area/perímetro² (0-100%). Mide regularidad geométrica. 100%=círculo perfecto. Valores altos = forma regular = menor costo de instalación perimetral. Ref: Polsby & Popper (1991).' },
  { key: 'indices.cargaEstimada', label: 'Carga', align: 'left', tip: 'Viabilidad estructural estimada. "apta": tipo comercial/industrial <=8 niv. "requiere_evaluacion": residencial 4-6 niv. "no_recomendado": >6 niv residencial. Ref: NTC-CDMX 2017, carga mín TVLE: 100 kg/m². Requiere dictamen real.' },
  { key: 'indices.zonaSismica', label: 'Zona', align: 'left', tip: 'Zona sísmica CDMX estimada por latitud. I (>=19.45°, firme), IIa (19.40-19.45°), IIIa (19.35-19.40°, transición), IIIb (19.28-19.35°, lacustre), IIIc (<19.28°). Ref: Atlas de Riesgos CDMX, SGIRPC.' },
  { key: 'indices.reduccionCO2', label: 'CO₂ t/a', align: 'right', tip: 'Captura estimada de CO₂ (toneladas/año). Fórmula: superficie_m² × 0.968 kg/m²/año / 1000. Ref: Cervantes Nájera (2021), CIIEMAD-IPN, mediciones en TVLE experimental.' },
  { key: 'indices.captacionPluvial', label: 'Capt. L/a', align: 'right', tip: 'Captación pluvial estimada (litros/año). Fórmula: superficie_m² × 800mm (precipitación media anual CDMX). Coef. escurrimiento simplificado a 1.0; real depende de sustrato (0.3-0.7).' },
  { key: 'indices.niveles', label: 'Niv.', align: 'right', tip: 'Pisos del edificio (tag building:levels en OSM). 0 = no disponible. Menos niveles = menor riesgo sísmico y mayor facilidad de refuerzo estructural para soportar TVLE.' },
]

// ── Score composition ──
const scoreComponents = [
  { key: 'superficie', label: 'Superficie', max: 25, desc: '>=1,000 m² = 25 pts | >=500 m² = 20 pts | >=200 m² = 10 pts', why: 'Azoteas más grandes permiten mayor impacto ambiental (CO₂, isla de calor, captación pluvial) y mejor retorno de inversión por economía de escala en instalación.' },
  { key: 'rectangularidad', label: 'Rectangularidad', max: 20, desc: '>=85% = 20 pts | >=70% = 12 pts | <70% = 5 pts', why: 'Los techos rectangulares facilitan la instalación modular de charolas TVLE, reducen desperdicio de material y simplifican el diseño de drenaje.' },
  { key: 'tipo', label: 'Tipo de edificio', max: 15, desc: 'commercial/industrial/public/hospital/school = 15 pts | apartments = 8 pts', why: 'Edificios institucionales y comerciales tienen mayor probabilidad de techo plano de concreto, mejor mantenimiento y mayor visibilidad como caso demostrativo.' },
  { key: 'techo', label: 'Material de techo', max: 15, desc: 'concrete o flat (tag roof:material/roof:shape en OSM) = 15 pts', why: 'Losa de concreto armado es el sustrato ideal para TVLE: soporta >=100 kg/m² (NTC-CDMX 2017), es impermeable y no requiere refuerzo adicional en la mayoría de casos.' },
  { key: 'niveles', label: 'Niveles', max: 10, desc: '1-5 niveles = 10 pts | 6-10 = 5 pts | >10 = 0 pts', why: 'Edificios de baja y mediana altura tienen mejor ratio de área de azotea vs huella, menor riesgo sísmico, y acceso más fácil para instalación y mantenimiento.' },
  { key: 'nombre', label: 'Identificación', max: 5, desc: 'Edificio con nombre en OSM = 5 pts', why: 'Edificios nombrados son generalmente edificaciones significativas (gobierno, comercio, educación) con mayor probabilidad de ser candidatos viables y replicables.' },
]

function estimateComponentScore(r: any, key: string): number {
  const idx = r.indices
  if (!idx) return 0
  switch (key) {
    case 'superficie': return r.areaM2 >= 1000 ? 25 : r.areaM2 >= 500 ? 20 : 10
    case 'rectangularidad': return idx.rectangularidad >= 0.85 ? 20 : idx.rectangularidad >= 0.7 ? 12 : 5
    case 'tipo': {
      const good = ['commercial', 'industrial', 'warehouse', 'office', 'retail', 'public', 'civic', 'government', 'hospital', 'school', 'university']
      return good.includes(r.tipo) ? 15 : (r.tipo === 'apartments' || r.tipo === 'yes') ? 8 : 0
    }
    case 'techo': return (idx.materialTecho === 'concrete' || idx.materialTecho === 'flat') ? 15 : 0
    case 'niveles': return idx.niveles > 0 && idx.niveles <= 5 ? 10 : idx.niveles > 5 && idx.niveles <= 10 ? 5 : 0
    case 'nombre': return r.nombre && !r.nombre.startsWith('Edificio ') ? 5 : 0
    default: return 0
  }
}

// ── Computed ──
const filtered = computed(() => {
  let rows = allResults.value
  const q = detectorFilters.search.toLowerCase()
  if (q) rows = rows.filter(r => r.nombre.toLowerCase().includes(q) || r.indices?.refId?.toLowerCase().includes(q))
  if (detectorFilters.tipoEdificio) rows = rows.filter(r => r.tipo === detectorFilters.tipoEdificio)
  if (detectorFilters.scoreMin > 0) rows = rows.filter(r => r.score >= detectorFilters.scoreMin)
  if (detectorFilters.scoreMax < 100) rows = rows.filter(r => r.score <= detectorFilters.scoreMax)
  if (detectorFilters.areaMin > 0) rows = rows.filter(r => r.areaM2 >= detectorFilters.areaMin)
  if (detectorFilters.areaMax < 999999) rows = rows.filter(r => r.areaM2 <= detectorFilters.areaMax)
  if (detectorFilters.ndviMin > 0) rows = rows.filter(r => (r.indices?.ndviPotencial ?? 0) >= detectorFilters.ndviMin)
  if (detectorFilters.carga) rows = rows.filter(r => r.indices?.cargaEstimada === detectorFilters.carga)
  if (detectorFilters.zonaSismica) rows = rows.filter(r => r.indices?.zonaSismica === detectorFilters.zonaSismica)
  const dir = detectorFilters.sortDir === 'asc' ? 1 : -1
  rows = [...rows].sort((a, b) => {
    const k = detectorFilters.sortBy
    const va = k.includes('.') ? a.indices?.[k.split('.')[1]] : a[k]
    const vb = k.includes('.') ? b.indices?.[k.split('.')[1]] : b[k]
    if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir
    return String(va || '').localeCompare(String(vb || '')) * dir
  })
  return rows
})

const totalPages = computed(() => Math.ceil(filtered.value.length / perPage.value) || 1)
const paginated = computed(() => filtered.value.slice((detectorPage.value - 1) * perPage.value, detectorPage.value * perPage.value))
const uniqueTipos = computed(() => [...new Set(allResults.value.map(r => r.tipo))].filter(Boolean).sort())
const uniqueZonas = computed(() => [...new Set(allResults.value.map(r => r.indices?.zonaSismica))].filter(Boolean).sort())

watch([detectorFilters], () => { detectorPage.value = 1 }, { deep: true })

// ── Actions ──
async function runDetection() {
  loadingDetector.value = true; allResults.value = []; selected.value = new Set(); detectorPage.value = 1
  try {
    const res = await apiFetch(`/observatory/${observatory}/detector/run`, {
      method: 'POST', body: { bbox: { ...bbox }, minAreaM2: minArea.value, maxAreaM2: maxArea.value, minScore: minScore.value },
    })
    allResults.value = res.data || []; detectorPhase.value = 'results'
  } catch (e: any) { alert(e?.data?.error?.message || 'Error al ejecutar detección') }
  loadingDetector.value = false
}

function toggleSelect(gIdx: number) { const s = new Set(selected.value); s.has(gIdx) ? s.delete(gIdx) : s.add(gIdx); selected.value = s }
function selectAllPage() { const s = new Set(selected.value); const ids = paginated.value.map(r => allResults.value.indexOf(r)); const all = ids.every(i => s.has(i)); ids.forEach(i => all ? s.delete(i) : s.add(i)); selected.value = s }

async function submitSelected() {
  const cands = [...selected.value].map(i => allResults.value[i]); if (!cands.length) return
  submitting.value = true
  try {
    const res = await apiFetch(`/observatory/${observatory}/detector/submit`, { method: 'POST', body: { candidates: cands } })
    alert(`${res.data.submitted} prospectos enviados`)
    const idxs = new Set(selected.value)
    allResults.value = allResults.value.filter((_, i) => !idxs.has(i))
    selected.value = new Set()
    // Auto-switch to cola tab and reload prospects
    activeTab.value = 'cola'
    filter.value = 'pendiente'
    await loadProspects()
  } catch (e: any) { alert(e?.data?.error?.message || 'Error') }
  submitting.value = false
}

function toggleSort(col: string) { if (detectorFilters.sortBy === col) detectorFilters.sortDir = detectorFilters.sortDir === 'asc' ? 'desc' : 'asc'; else { detectorFilters.sortBy = col; detectorFilters.sortDir = 'desc' } }
function sortIcon(col: string) { return detectorFilters.sortBy !== col ? '↕' : detectorFilters.sortDir === 'asc' ? '↑' : '↓' }
function scoreClass(s: number) { return s >= 70 ? 'bg-green-100 text-green-800' : s >= 40 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800' }
function cargaClass(c: string) { return c === 'apta' ? 'bg-green-100 text-green-800' : c === 'requiere_evaluacion' ? 'bg-yellow-100 text-yellow-800' : c === 'no_recomendado' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-500' }
function barWidth(val: number, max: number) { return `${Math.round((val / max) * 100)}%` }
</script>

<template>
  <div>
    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  PAGE HEADER                                               -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <div class="mb-4">
      <h2 class="text-2xl font-semibold text-ink">Prospectos</h2>
      <p class="mt-1 text-sm text-slate-custom">Deteccion geoespacial y cola de aprobacion de candidatos a techo verde</p>
    </div>

    <!-- Pipeline context banner -->
    <AdminPipelineBanner
      current-step="prospectos"
      description="El detector identifica edificios candidatos via OpenStreetMap. Los prospectos pendientes esperan tu revision para pasar a candidatos."
    />

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  TAB BAR (sticky, indicadores-style pills)                 -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <div class="sticky top-0 z-30 -mx-4 border-b border-gray-200 bg-white/95 px-4 backdrop-blur-sm lg:-mx-6 lg:px-6">
      <nav class="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
        <button
          class="whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200"
          :class="activeTab === 'cola'
            ? 'bg-primary text-white shadow-sm scale-[1.02]'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95'"
          @click="activeTab = 'cola'"
        >
          <svg class="mr-1.5 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Cola de aprobación
        </button>
        <button
          class="whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200"
          :class="activeTab === 'detector'
            ? 'bg-primary text-white shadow-sm scale-[1.02]'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95'"
          @click="activeTab = 'detector'"
        >
          <svg class="mr-1.5 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
          Detector
        </button>
      </nav>
    </div>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  TAB 1: COLA DE APROBACION                                 -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <div v-show="activeTab === 'cola'" class="pt-4">
      <!-- Filter chips -->
      <div class="mb-4 flex flex-wrap gap-2">
        <button
          v-for="f in ['pendiente', 'aprobado', 'rechazado']"
          :key="f"
          class="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200"
          :class="filter === f
            ? 'bg-primary text-white shadow-sm scale-[1.02]'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95'"
          @click="filter = f"
        >
          {{ f.charAt(0).toUpperCase() + f.slice(1) }}s
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loadingProspects" class="space-y-3">
        <div v-for="i in 3" :key="i" class="card animate-pulse p-4">
          <div class="h-4 w-48 rounded bg-gray-200" />
          <div class="mt-2 h-3 w-full rounded bg-gray-100" />
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="prospects.length === 0" class="card p-12 text-center">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <svg v-if="filter === 'pendiente'" class="h-8 w-8 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else-if="filter === 'aprobado'" class="h-8 w-8 text-eco/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else class="h-8 w-8 text-alert/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="mt-4 text-lg font-medium text-gray-500">No hay prospectos {{ filter }}s</p>
        <p class="mt-1 text-sm text-gray-400">
          <template v-if="filter === 'pendiente'">Ejecuta el detector para encontrar nuevos candidatos</template>
          <template v-else-if="filter === 'aprobado'">Los prospectos aprobados aparecerán aquí</template>
          <template v-else>Los prospectos rechazados aparecerán aquí</template>
        </p>
        <button v-if="filter === 'pendiente'" class="btn-primary mt-4 inline-flex items-center gap-2" @click="activeTab = 'detector'">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
          Ir al detector
        </button>
      </div>

      <!-- Prospect cards -->
      <TransitionGroup name="slide-up" tag="div" v-else class="space-y-3">
        <div v-for="p in prospects" :key="p.id" class="card p-4 transition-shadow duration-200 hover:shadow-card-hover">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-semibold text-ink">#{{ p.id }}</span>
                <span
                  class="badge-primary text-xs"
                  :class="{
                    '!bg-yellow-100 !text-yellow-800': p.status === 'pendiente',
                    '!bg-green-100 !text-green-800': p.status === 'aprobado',
                    '!bg-red-100 !text-red-800': p.status === 'rechazado',
                  }"
                >
                  {{ p.status }}
                </span>
                <span v-if="p.source" class="text-xs text-slate-custom">
                  via {{ p.source }}
                </span>
                <span v-if="p.confianzaDetector" class="text-xs text-slate-custom">
                  (confianza: {{ p.confianzaDetector }})
                </span>
              </div>
              <pre class="mt-2 max-h-40 overflow-auto rounded bg-gray-50 p-2 text-xs text-gray-700">{{ JSON.stringify(p.data, null, 2) }}</pre>
              <p v-if="p.notasAdmin" class="mt-2 text-sm text-slate-custom">
                <strong>Notas:</strong> {{ p.notasAdmin }}
              </p>
              <p class="mt-1 text-xs text-gray-400">
                {{ new Date(p.createdAt).toLocaleDateString('es-MX', { dateStyle: 'medium' }) }}
              </p>
            </div>

            <div v-if="p.status === 'pendiente'" class="flex flex-shrink-0 gap-2">
              <button class="btn-eco text-sm" @click="approve(p.id)">Aprobar</button>
              <button class="btn-outline text-sm !border-red-300 !text-red-600 hover:!bg-red-50" @click="startReject(p.id)">
                Rechazar
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  TAB 2: DETECTOR                                           -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <div v-show="activeTab === 'detector'" class="pt-4">
      <div class="mb-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 class="text-lg font-semibold text-ink">Detector de Techos Verdes</h3>
            <p class="mt-0.5 text-sm text-slate-custom">Análisis geoespacial multicriterio — OpenStreetMap (Overpass API) + Turf.js</p>
          </div>
          <button v-if="detectorPhase === 'results'" class="btn-ghost text-sm" @click="detectorPhase = 'config'; allResults = []; selected = new Set()">&larr; Nueva búsqueda</button>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!--  DETECTOR PHASE 1: Configuración + Documentación           -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <div v-if="detectorPhase === 'config'" class="space-y-5">

        <!-- Info banner -->
        <div class="rounded-lg border border-primary/20 bg-primary-50 p-4">
          <h3 class="flex items-center gap-2 font-semibold text-primary-dark">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Cómo funciona el detector
          </h3>
          <p class="mt-1 text-sm text-primary-dark/80">
            El detector consulta edificios de <strong>OpenStreetMap</strong> en el área seleccionada, calcula índices geométricos con <strong>Turf.js</strong>
            y asigna un score multicriterio (0-100) basado en 6 factores. Los candidatos con mayor score tienen mayor potencial para techo verde.
            Los resultados se pueden enviar a la <strong>cola de prospectos</strong> para revisión y aprobación.
          </p>
        </div>

        <!-- Bbox + params -->
        <div class="card p-5">
          <h3 class="mb-3 font-semibold text-ink">Área de búsqueda</h3>
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div><label class="mb-1 block text-xs text-slate-custom">Sur (lat)</label><input v-model.number="bbox.south" class="input w-full" type="number" step="0.001" /></div>
            <div><label class="mb-1 block text-xs text-slate-custom">Oeste (lng)</label><input v-model.number="bbox.west" class="input w-full" type="number" step="0.001" /></div>
            <div><label class="mb-1 block text-xs text-slate-custom">Norte (lat)</label><input v-model.number="bbox.north" class="input w-full" type="number" step="0.001" /></div>
            <div><label class="mb-1 block text-xs text-slate-custom">Este (lng)</label><input v-model.number="bbox.east" class="input w-full" type="number" step="0.001" /></div>
          </div>
          <p class="mt-2 text-xs text-slate-custom">~{{ ((bbox.north - bbox.south) * 111).toFixed(1) }} x {{ ((bbox.east - bbox.west) * 85).toFixed(1) }} km (auto-limitado a máx 5x5 km por Overpass API)</p>
          <div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div><label class="mb-1 block text-xs text-slate-custom">Mín m²</label><input v-model.number="minArea" class="input w-full" type="number" /></div>
            <div><label class="mb-1 block text-xs text-slate-custom">Máx m²</label><input v-model.number="maxArea" class="input w-full" type="number" /></div>
            <div><label class="mb-1 block text-xs text-slate-custom">Score mín (0-100)</label><input v-model.number="minScore" class="input w-full" type="number" min="0" max="100" /></div>
          </div>
        </div>

        <!-- Run button -->
        <button class="btn-primary w-full py-3 text-lg" :disabled="loadingDetector" @click="runDetection">
          <svg v-if="loadingDetector" class="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {{ loadingDetector ? 'Consultando Overpass API (puede tardar 15-60s)...' : 'Ejecutar detección' }}
        </button>

        <!-- Collapsible methodology accordion (default CLOSED) -->
        <div>
          <button
            class="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-3.5 text-left transition-colors hover:bg-gray-50"
            @click="showConfigMethodology = !showConfigMethodology"
          >
            <span class="flex items-center gap-2">
              <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span class="text-sm font-semibold text-ink">Metodología, índices y referencias</span>
            </span>
            <svg
              class="h-5 w-5 text-gray-400 transition-transform duration-200"
              :class="showConfigMethodology ? 'rotate-180' : ''"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <Transition name="slide-up">
            <div v-if="showConfigMethodology" class="mt-2 space-y-5">
              <!-- Score Composition -->
              <div class="card p-5">
                <h3 class="mb-3 font-semibold text-ink">Composición del score (0-100 puntos)</h3>
                <p class="mb-3 text-sm text-slate-custom">Suma ponderada de 6 factores derivados de geometría (Turf.js) y metadatos (OpenStreetMap). Total máximo teórico: 90 pts (no todos los factores se cumplen simultáneamente).</p>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead><tr class="border-b text-left text-xs uppercase text-gray-500"><th class="py-2 pr-3">Factor</th><th class="py-2 pr-3 text-center">Máx</th><th class="py-2 pr-3">Criterio</th><th class="py-2">Justificación</th></tr></thead>
                    <tbody>
                      <tr v-for="c in scoreComponents" :key="c.key" class="border-b border-gray-100">
                        <td class="py-2 pr-3 font-medium whitespace-nowrap">{{ c.label }}</td>
                        <td class="py-2 pr-3 text-center font-bold tabular-nums text-primary">{{ c.max }}</td>
                        <td class="py-2 pr-3 text-xs text-slate-custom">{{ c.desc }}</td>
                        <td class="py-2 text-xs text-slate-custom/80">{{ c.why }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Column / Index Glossary -->
              <div class="card p-5">
                <h3 class="mb-3 font-semibold text-ink">Glosario de índices técnicos</h3>
                <p class="mb-3 text-sm text-slate-custom">Cada columna de la tabla de resultados corresponde a un índice calculado. Hover sobre el encabezado de columna para ver descripción rápida.</p>
                <dl class="divide-y divide-gray-100">
                  <div v-for="col in columns" :key="col.key" class="py-2.5 sm:grid sm:grid-cols-[140px_1fr] sm:gap-3">
                    <dt class="text-sm font-semibold text-ink">{{ col.label }}</dt>
                    <dd class="mt-0.5 text-sm text-slate-custom sm:mt-0">{{ col.tip }}</dd>
                  </div>
                </dl>
              </div>

              <!-- Pipeline -->
              <div class="card p-5">
                <h3 class="mb-3 font-semibold text-ink">Pipeline de detección</h3>
                <ol class="space-y-2">
                  <li class="flex gap-3 text-sm"><span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">1</span><span class="text-slate-custom"><strong class="text-ink">Overpass API</strong> — Consulta edificios significativos (nombrados, comerciales, públicos, con niveles) en el bounding box. Solo polígonos (ways) con tag <code>building=*</code>.</span></li>
                  <li class="flex gap-3 text-sm"><span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">2</span><span class="text-slate-custom"><strong class="text-ink">Turf.js</strong> — Calcula área (m²), perímetro, centroide, bounding box, rectangularidad y compacidad Polsby-Popper por edificio.</span></li>
                  <li class="flex gap-3 text-sm"><span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">3</span><span class="text-slate-custom"><strong class="text-ink">Scoring</strong> — Aplica 6 criterios ponderados. Estima NDVI potencial, carga estructural, zona sísmica, reducción CO₂ y captación pluvial.</span></li>
                  <li class="flex gap-3 text-sm"><span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">4</span><span class="text-slate-custom"><strong class="text-ink">Ranking</strong> — Ordena por score, retorna max 200 candidatos. Admin filtra, selecciona y envia a cola de prospectos.</span></li>
                </ol>
              </div>

              <!-- Sources + Limitations -->
              <div class="card p-5">
                <div class="grid gap-5 md:grid-cols-2">
                  <div>
                    <h3 class="mb-2 font-semibold text-ink">Fuentes de datos</h3>
                    <ul class="space-y-1 text-sm text-slate-custom">
                      <li><strong>OpenStreetMap</strong> — Huellas de edificios, tipo, niveles, material techo. Licencia ODbL. Datos colaborativos, cobertura variable.</li>
                      <li><strong>Turf.js v7</strong> — Librería JS de análisis geoespacial. MIT License.</li>
                      <li><strong>NTC-CDMX 2017</strong> — Normas Técnicas Complementarias, Cap. 6. Carga mín TVLE: 100 kg/m².</li>
                      <li><strong>Cervantes Nájera (2021)</strong> — Tesis maestría CIIEMAD-IPN. CO₂: 0.968 kg/m²/año.</li>
                      <li><strong>Cervantes Nájera (2025)</strong> — Tesis doctoral CIIEMAD-IPN. Captación: 19.5 L/m²/año.</li>
                      <li><strong>Atlas de Riesgos CDMX</strong> — SGIRPC. Zonificación sísmica simplificada.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 class="mb-2 font-semibold text-ink">Limitaciones</h3>
                    <ul class="space-y-1 text-sm text-slate-custom">
                      <li>No utiliza imágenes satelitales. NDVI potencial es un <strong>proxy morfológico</strong>, no índice espectral real.</li>
                      <li>Datos OSM pueden ser incompletos (edificios sin nombre, sin niveles, sin material de techo).</li>
                      <li>Zona sísmica es aproximación por latitud, no consulta al mapa de microzonificación real.</li>
                      <li>Carga estructural requiere <strong>dictamen de ingeniero estructurista</strong> para validación.</li>
                      <li>Bbox limitado a ~5×5 km por restricciones de Overpass API pública.</li>
                      <li>Costo: <strong>$0</strong> — OSM y Overpass son gratuitos. Para NDVI real se requiere Google Earth Engine (también gratuito con cuenta).</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!--  DETECTOR PHASE 2: Resultados                              -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <div v-if="detectorPhase === 'results'">
        <!-- Toolbar -->
        <div class="mb-3 flex flex-wrap items-center gap-2">
          <span class="text-sm text-slate-custom">{{ filtered.length }} de {{ allResults.length }} resultados</span>
          <span v-if="selected.size" class="text-sm font-medium text-primary">| {{ selected.size }} seleccionados</span>
          <div class="w-full sm:ml-auto sm:w-auto flex flex-wrap gap-2">
            <button class="btn-outline text-xs" @click="showFilters = !showFilters">{{ showFilters ? 'Ocultar' : 'Mostrar' }} filtros</button>
            <button class="btn-outline text-xs" @click="selectAllPage">Sel. página</button>
            <button class="btn-eco text-xs" :disabled="!selected.size || submitting" @click="submitSelected">{{ submitting ? '...' : `Enviar ${selected.size} a prospectos` }}</button>
          </div>
        </div>

        <!-- Filters -->
        <Transition name="slide-up">
          <div v-if="showFilters" class="card mb-4 p-4">
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <div><label class="mb-1 block text-xs text-slate-custom">Buscar</label><input v-model="detectorFilters.search" class="input w-full text-sm" placeholder="Nombre o ref..." /></div>
              <div><label class="mb-1 block text-xs text-slate-custom">Tipo edificio</label>
                <select v-model="detectorFilters.tipoEdificio" class="select w-full text-sm"><option value="">Todos</option><option v-for="t in uniqueTipos" :key="t" :value="t">{{ t }}</option></select></div>
              <div><label class="mb-1 block text-xs text-slate-custom">Score mín</label><input v-model.number="detectorFilters.scoreMin" class="input w-full text-sm" type="number" min="0" max="100" /></div>
              <div><label class="mb-1 block text-xs text-slate-custom">NDVI pot. mín</label><input v-model.number="detectorFilters.ndviMin" class="input w-full text-sm" type="number" min="0" max="1" step="0.1" /></div>
              <div><label class="mb-1 block text-xs text-slate-custom">Carga estruct.</label>
                <select v-model="detectorFilters.carga" class="select w-full text-sm"><option value="">Todas</option><option value="apta">Apta</option><option value="requiere_evaluacion">Req. eval.</option><option value="no_recomendado">No recom.</option><option value="sin_datos">Sin datos</option></select></div>
              <div><label class="mb-1 block text-xs text-slate-custom">Zona sísmica</label>
                <select v-model="detectorFilters.zonaSismica" class="select w-full text-sm"><option value="">Todas</option><option v-for="z in uniqueZonas" :key="z" :value="z">{{ z }}</option></select></div>
            </div>
          </div>
        </Transition>

        <!-- Table -->
        <div class="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 rounded-lg border border-gray-200">
          <table class="w-full min-w-[1200px] text-sm">
            <thead class="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th class="w-10 px-3 py-2"><input type="checkbox" @change="selectAllPage" /></th>
                <th class="w-8 px-1 py-2" />
                <th
                  v-for="col in columns"
                  :key="col.key"
                  class="cursor-pointer select-none px-3 py-2"
                  :class="col.align === 'right' ? 'text-right' : 'text-left'"
                  :title="col.tip"
                  @click="toggleSort(col.key)"
                >
                  <span class="border-b border-dashed border-gray-400">{{ col.label }}</span>
                  <span class="ml-0.5 text-gray-400">{{ sortIcon(col.key) }}</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="paginated.length === 0"><td :colspan="columns.length + 2" class="px-4 py-8 text-center text-gray-400">Sin resultados</td></tr>
              <template v-for="r in paginated" :key="r.indices?.refId">
                <tr
                  class="cursor-pointer transition-colors hover:bg-gray-50"
                  :class="selected.has(allResults.indexOf(r)) ? 'bg-primary-50/40' : ''"
                  @click="toggleSelect(allResults.indexOf(r))"
                >
                  <td class="px-3 py-2"><input type="checkbox" :checked="selected.has(allResults.indexOf(r))" @click.stop="toggleSelect(allResults.indexOf(r))" /></td>
                  <td class="px-1 py-2">
                    <button class="rounded p-0.5 text-gray-400 hover:bg-gray-200 hover:text-ink" title="Ver desglose del score y datos técnicos" @click.stop="expandedRow = expandedRow === allResults.indexOf(r) ? null : allResults.indexOf(r)">
                      <svg class="h-4 w-4 transition-transform" :class="expandedRow === allResults.indexOf(r) ? 'rotate-90' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </td>
                  <td class="whitespace-nowrap px-3 py-2 font-mono text-xs text-slate-custom">{{ r.indices?.refId }}</td>
                  <td class="max-w-[180px] truncate px-3 py-2 font-medium text-ink" :title="r.nombre">{{ r.nombre }}</td>
                  <td class="whitespace-nowrap px-3 py-2 text-xs">{{ r.tipo }}</td>
                  <td class="px-3 py-2 text-right"><span :class="['rounded-full px-2 py-0.5 text-xs font-bold', scoreClass(r.score)]">{{ r.score }}</span></td>
                  <td class="whitespace-nowrap px-3 py-2 text-right tabular-nums">{{ r.areaM2?.toLocaleString('es-MX') }}</td>
                  <td class="px-3 py-2 text-right tabular-nums">{{ r.indices?.ndviPotencial?.toFixed(2) }}</td>
                  <td class="px-3 py-2 text-right tabular-nums">{{ (r.indices?.rectangularidad * 100)?.toFixed(0) }}%</td>
                  <td class="px-3 py-2 text-right tabular-nums">{{ (r.indices?.compacidad * 100)?.toFixed(0) }}%</td>
                  <td class="px-3 py-2"><span :class="['whitespace-nowrap rounded px-1.5 py-0.5 text-xs', cargaClass(r.indices?.cargaEstimada)]">{{ r.indices?.cargaEstimada?.replace(/_/g, ' ') }}</span></td>
                  <td class="px-3 py-2 text-xs">{{ r.indices?.zonaSismica }}</td>
                  <td class="px-3 py-2 text-right tabular-nums">{{ r.indices?.reduccionCO2 }}</td>
                  <td class="whitespace-nowrap px-3 py-2 text-right tabular-nums">{{ r.indices?.captacionPluvial?.toLocaleString('es-MX') }}</td>
                  <td class="px-3 py-2 text-right tabular-nums">{{ r.indices?.niveles || '—' }}</td>
                </tr>
                <!-- Expanded row: score breakdown + details -->
                <tr v-if="expandedRow === allResults.indexOf(r)">
                  <td :colspan="columns.length + 2" class="border-l-4 border-l-primary bg-gray-50 px-5 py-4">
                    <div class="grid gap-5 lg:grid-cols-2">
                      <!-- Score breakdown -->
                      <div>
                        <h4 class="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Desglose del Score: {{ r.score }}/100</h4>
                        <div class="space-y-2">
                          <div v-for="comp in scoreComponents" :key="comp.key">
                            <div class="flex items-center gap-2">
                              <span class="w-20 flex-shrink-0 text-xs font-medium text-ink sm:w-28">{{ comp.label }}</span>
                              <div class="h-4 flex-1 overflow-hidden rounded-full bg-gray-200">
                                <div
                                  class="flex h-full items-center rounded-full pl-1 text-[10px] font-bold text-white transition-all"
                                  :class="estimateComponentScore(r, comp.key) >= comp.max * 0.7 ? 'bg-green-500' : estimateComponentScore(r, comp.key) > 0 ? 'bg-yellow-500' : 'bg-gray-300'"
                                  :style="{ width: barWidth(Math.max(estimateComponentScore(r, comp.key), 1), comp.max) }"
                                >
                                  {{ estimateComponentScore(r, comp.key) > 0 ? estimateComponentScore(r, comp.key) : '' }}
                                </div>
                              </div>
                              <span class="w-10 flex-shrink-0 text-right text-xs tabular-nums text-slate-custom">/{{ comp.max }}</span>
                            </div>
                            <p class="ml-0 text-[11px] text-gray-400 sm:ml-[7.5rem]">{{ comp.desc }}</p>
                          </div>
                        </div>
                      </div>
                      <!-- Technical details -->
                      <div>
                        <h4 class="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Datos técnicos completos</h4>
                        <dl class="grid grid-cols-1 gap-x-4 gap-y-1.5 text-xs sm:grid-cols-2">
                          <dt class="text-slate-custom">Ref OSM</dt><dd class="font-mono font-medium">{{ r.indices?.refId }}</dd>
                          <dt class="text-slate-custom">Perímetro</dt><dd class="font-medium tabular-nums">{{ r.indices?.perimetroM?.toLocaleString('es-MX') }} m</dd>
                          <dt class="text-slate-custom">Orientación</dt><dd class="font-medium tabular-nums">{{ r.indices?.orientacion?.toFixed(0) }}°</dd>
                          <dt class="text-slate-custom">Isla de calor</dt><dd class="font-medium tabular-nums">{{ (r.indices?.islaTerApprox * 100)?.toFixed(2) }}% del ref. 79,584 m²</dd>
                          <dt class="text-slate-custom">Material techo</dt><dd class="font-medium">{{ r.indices?.materialTecho }}</dd>
                          <dt class="text-slate-custom">Coordenadas</dt><dd class="font-medium tabular-nums">{{ r.lat?.toFixed(6) }}, {{ r.lng?.toFixed(6) }}</dd>
                        </dl>
                        <div v-if="r.reasons?.length" class="mt-3">
                          <h4 class="mb-1 text-xs font-bold uppercase tracking-wider text-gray-500">Razones del puntaje</h4>
                          <ul class="list-inside list-disc space-y-0.5 text-xs text-slate-custom">
                            <li v-for="(reason, ri) in r.reasons" :key="ri">{{ reason }}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-custom">
          <div class="flex items-center gap-2">
            <span>Filas:</span>
            <select v-model.number="perPage" class="select text-sm" @change="detectorPage = 1"><option :value="10">10</option><option :value="25">25</option><option :value="50">50</option><option :value="100">100</option></select>
          </div>
          <div class="flex items-center gap-1">
            <button class="rounded px-2 py-1 hover:bg-gray-100 disabled:opacity-30" :disabled="detectorPage <= 1" @click="detectorPage--">&laquo;</button>
            <span class="tabular-nums">{{ detectorPage }} / {{ totalPages }}</span>
            <button class="rounded px-2 py-1 hover:bg-gray-100 disabled:opacity-30" :disabled="detectorPage >= totalPages" @click="detectorPage++">&raquo;</button>
          </div>
        </div>

        <!-- Methodology reference (collapsible in results view) -->
        <div class="mt-6">
          <button class="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-3 text-left text-sm font-semibold text-ink hover:bg-gray-50" @click="showMethodology = !showMethodology">
            Justificación y metodología
            <svg class="h-5 w-5 text-gray-400 transition-transform" :class="showMethodology ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div v-if="showMethodology" class="card mt-2 space-y-4 p-5 text-sm">
            <!-- Score table -->
            <div>
              <h4 class="mb-2 font-semibold text-ink">Composición del score</h4>
              <table class="w-full text-xs">
                <thead><tr class="border-b text-left text-gray-500"><th class="py-1.5 pr-3">Factor</th><th class="py-1.5 pr-3 text-center">Máx</th><th class="py-1.5 pr-3">Criterio</th><th class="py-1.5">Justificación</th></tr></thead>
                <tbody><tr v-for="c in scoreComponents" :key="c.key" class="border-b border-gray-100"><td class="py-1.5 pr-3 font-medium whitespace-nowrap">{{ c.label }}</td><td class="py-1.5 pr-3 text-center font-bold tabular-nums">{{ c.max }}</td><td class="py-1.5 pr-3 text-slate-custom">{{ c.desc }}</td><td class="py-1.5 text-slate-custom/80">{{ c.why }}</td></tr></tbody>
              </table>
            </div>
            <!-- Index glossary -->
            <div>
              <h4 class="mb-2 font-semibold text-ink">Glosario de columnas</h4>
              <dl class="divide-y divide-gray-100 text-xs">
                <div v-for="col in columns" :key="col.key" class="py-2 sm:grid sm:grid-cols-[120px_1fr] sm:gap-3">
                  <dt class="font-semibold text-ink">{{ col.label }}</dt>
                  <dd class="mt-0.5 text-slate-custom sm:mt-0">{{ col.tip }}</dd>
                </div>
              </dl>
            </div>
            <!-- Sources -->
            <div>
              <h4 class="mb-1 font-semibold text-ink">Fuentes</h4>
              <ul class="list-inside list-disc text-xs text-slate-custom">
                <li>OpenStreetMap (Overpass API) — ODbL</li>
                <li>Turf.js v7 — MIT</li>
                <li>NTC-CDMX 2017 — carga mín TVLE: 100 kg/m²</li>
                <li>Cervantes Nájera (2021, 2025) — CIIEMAD-IPN</li>
                <li>Atlas de Riesgos CDMX — SGIRPC</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  REJECT MODAL (shared, from cola tab)                      -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="fade">
      <div v-if="rejectingId" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" @click.self="rejectingId = null">
        <div class="card w-full max-w-md p-6 shadow-panel animate-scale-in">
          <h3 class="mb-3 text-lg font-semibold text-ink">Rechazar prospecto #{{ rejectingId }}</h3>
          <label class="mb-1 block text-sm font-medium text-ink">Motivo del rechazo</label>
          <textarea
            v-model="rejectNotes"
            class="input w-full"
            rows="3"
            placeholder="Describe el motivo..."
          />
          <div class="mt-4 flex justify-end gap-3">
            <button class="btn-ghost" @click="rejectingId = null">Cancelar</button>
            <button class="btn-primary !bg-red-600 hover:!bg-red-700" :disabled="!rejectNotes" @click="confirmReject">
              Confirmar rechazo
            </button>
          </div>
        </div>
      </div>
      </Transition>
    </Teleport>
  </div>
</template>
