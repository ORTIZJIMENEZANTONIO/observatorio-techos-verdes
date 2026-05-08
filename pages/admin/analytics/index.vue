<script setup lang="ts">
import type { GreenRoof, CandidateRoof } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

const { apiFetch } = useApi()
const config = useRuntimeConfig()
const observatory = (config.public.observatory as string) || 'techos-verdes'
const store = useRoofsStore()
const math = useAnalyticsMath()

interface AnalyticsSummary {
  observatory: string
  from: string
  to: string
  days: number
  totals: {
    events: number
    sessions: number
    pageviews: number
    clicks: number
    submits: number
    downloads: number
  }
  byType: Record<string, number>
  series: { date: string; events: number; sessions: number }[]
  topPaths: { key: string; count: number }[]
  topTargets: { key: string; count: number }[]
}

const summary = ref<AnalyticsSummary | null>(null)
const loading = ref(true)
const error = ref('')
const days = ref(30)
const activeTab = ref<'interacciones' | 'descriptivo' | 'inferencial' | 'modelado'>('interacciones')
const k = ref(3)

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    const sum = await apiFetch<{ success: boolean; data: AnalyticsSummary }>(
      `/observatory/${observatory}/admin/analytics/summary?days=${days.value}`,
    )
    summary.value = sum.data
  } catch (e: any) {
    error.value = e?.data?.error?.message || 'No se pudieron cargar los datos analíticos'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (!store.greenRoofs.length) {
    try { await store.loadRoofs?.() } catch { /* ignore */ }
  }
  await load()
})

watch(days, load)

const greenRoofs = computed<GreenRoof[]>(() => store.greenRoofs as GreenRoof[])
const candidates = computed<CandidateRoof[]>(() => store.candidateRoofs as CandidateRoof[])

// ────────── INTERACCIONES ──────────
const seriesChart = computed(() => {
  if (!summary.value) return null
  return {
    labels: summary.value.series.map((s) => s.date.slice(5)),
    datasets: [
      { label: 'Eventos', data: summary.value.series.map((s) => s.events), borderColor: '#10B981', backgroundColor: 'rgba(16,185,129,0.15)', fill: true, tension: 0.3 },
      { label: 'Sesiones únicas', data: summary.value.series.map((s) => s.sessions), borderColor: '#0EA5E9', backgroundColor: 'rgba(14,165,233,0.15)', fill: true, tension: 0.3 },
    ],
  }
})

const eventTypeChart = computed(() => {
  if (!summary.value) return null
  const entries = Object.entries(summary.value.byType)
  return {
    labels: entries.map(([k]) => k),
    datasets: [{ data: entries.map(([, v]) => v), backgroundColor: ['#10B981', '#0EA5E9', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#FF7A66', '#94A3B8'] }],
  }
})

const topPathsChart = computed(() => {
  if (!summary.value) return null
  return {
    labels: summary.value.topPaths.map((p) => p.key.length > 30 ? p.key.slice(0, 30) + '…' : p.key),
    datasets: [{ label: 'Pageviews', data: summary.value.topPaths.map((p) => p.count), backgroundColor: '#10B981' }],
  }
})

const topTargetsChart = computed(() => {
  if (!summary.value) return null
  return {
    labels: summary.value.topTargets.map((p) => p.key),
    datasets: [{ label: 'Clicks', data: summary.value.topTargets.map((p) => p.count), backgroundColor: '#0EA5E9' }],
  }
})

// ────────── DESCRIPTIVO ──────────
const alcaldiaDist = computed(() => math.frequency(greenRoofs.value.map((r) => r.alcaldia)))
const tipoEdificioDist = computed(() => math.frequency(greenRoofs.value.map((r) => r.tipoEdificio)))
const tipoTechoDist = computed(() => math.frequency(greenRoofs.value.map((r) => r.tipoTechoVerde)))
const estadoDist = computed(() => math.frequency(greenRoofs.value.map((r) => r.estado)))
const candidatosByEstatus = computed(() => math.frequency(candidates.value.map((c) => c.estatus)))
const candidatosByConfianza = computed(() => math.frequency(candidates.value.map((c) => c.confianzaIA)))

const superficieValues = computed(() =>
  greenRoofs.value.map((r) => Number(r.superficie)).filter((v) => Number.isFinite(v) && v > 0),
)
const superficieStats = computed(() => math.describe(superficieValues.value))
const superficieHist = computed(() => math.histogram(superficieValues.value, 8))

const scoreValues = computed(() =>
  candidates.value.map((c) => Number(c.scoreAptitud)).filter((v) => Number.isFinite(v)),
)
const scoreStats = computed(() => math.describe(scoreValues.value))
const scoreHist = computed(() => math.histogram(scoreValues.value, 10))

const alcaldiaChart = computed(() => ({
  labels: alcaldiaDist.value.map((d) => d.key),
  datasets: [{ label: 'Techos', data: alcaldiaDist.value.map((d) => d.count), backgroundColor: '#10B981' }],
}))

const tipoEdificioChart = computed(() => ({
  labels: tipoEdificioDist.value.map((d) => d.key),
  datasets: [{ data: tipoEdificioDist.value.map((d) => d.count), backgroundColor: ['#10B981', '#0EA5E9', '#F59E0B', '#8B5CF6', '#06B6D4', '#FF7A66'] }],
}))

const tipoTechoChart = computed(() => ({
  labels: tipoTechoDist.value.map((d) => d.key),
  datasets: [{ data: tipoTechoDist.value.map((d) => d.count), backgroundColor: ['#10B981', '#84CC16', '#22C55E'] }],
}))

const estadoChart = computed(() => ({
  labels: estadoDist.value.map((d) => d.key),
  datasets: [{ data: estadoDist.value.map((d) => d.count), backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#0EA5E9'] }],
}))

const candidatosEstatusChart = computed(() => ({
  labels: candidatosByEstatus.value.map((d) => d.key),
  datasets: [{ data: candidatosByEstatus.value.map((d) => d.count), backgroundColor: ['#0EA5E9', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'] }],
}))

const superficieHistChart = computed(() => ({
  labels: superficieHist.value.map((b) => b.bin + ' m²'),
  datasets: [{ label: 'Techos', data: superficieHist.value.map((b) => b.count), backgroundColor: '#10B981' }],
}))

const scoreHistChart = computed(() => ({
  labels: scoreHist.value.map((b) => b.bin),
  datasets: [{ label: 'Candidatos', data: scoreHist.value.map((b) => b.count), backgroundColor: '#0EA5E9' }],
}))

// ────────── INFERENCIAL ──────────
// Correlaciones entre cada variable AHP y el score final
const ahpVariables = ['lst', 'areaUrbanizada', 'poblacion', 'ndvi', 'densidadVial', 'o3', 'co', 'no2'] as const

const ahpCorrelations = computed(() => {
  const candidatesWithVars = candidates.value.filter((c) => c.variables)
  return ahpVariables.map((v) => {
    const xs = candidatesWithVars.map((c) => Number((c.variables as any)[v])).filter(Number.isFinite)
    const ys = candidatesWithVars.map((c) => Number(c.scoreAptitud)).filter(Number.isFinite)
    return {
      variable: v,
      r: math.correlation(xs, ys),
      n: Math.min(xs.length, ys.length),
    }
  }).sort((a, b) => Math.abs(b.r) - Math.abs(a.r))
})

const ahpCorrChart = computed(() => ({
  labels: ahpCorrelations.value.map((d) => d.variable),
  datasets: [{
    label: 'Correlación con score',
    data: ahpCorrelations.value.map((d) => d.r),
    backgroundColor: ahpCorrelations.value.map((d) => d.r > 0 ? '#10B981' : '#EF4444'),
  }],
}))

// Anomalías en el score
const scoreAnomalies = computed(() => {
  const xs = scoreValues.value
  const flags = math.flagAnomalies(xs, 1.5)
  const z = math.zScores(xs)
  const list = candidates.value.filter((c) => Number.isFinite(Number(c.scoreAptitud)))
  return list
    .map((c, i) => ({ candidate: c, z: z[i], isAnomaly: flags[i] }))
    .filter((x) => x.isAnomaly)
    .sort((a, b) => Math.abs(b.z) - Math.abs(a.z))
})

// Comparación entre alcaldías por score promedio
const scoreByAlcaldia = computed(() => {
  const groups: Record<string, number[]> = {}
  for (const c of candidates.value) {
    if (!Number.isFinite(Number(c.scoreAptitud))) continue
    if (!groups[c.alcaldia]) groups[c.alcaldia] = []
    groups[c.alcaldia].push(Number(c.scoreAptitud))
  }
  return Object.entries(groups)
    .map(([alcaldia, values]) => ({ alcaldia, ...math.describe(values) }))
    .filter((row) => row.count > 0)
    .sort((a, b) => b.mean - a.mean)
})

// ────────── MODELADO ──────────
// K-means de candidatos en las 8 dimensiones AHP normalizadas
const clusterPoints = computed(() => {
  const data = candidates.value
    .filter((c) => c.variables)
    .map((c) => ({
      candidate: c,
      raw: ahpVariables.map((v) => Number((c.variables as any)[v]) || 0),
    }))
  if (data.length === 0) return { candidates: [], points: [] }
  const dim = ahpVariables.length
  const mins = new Array(dim).fill(Infinity)
  const maxs = new Array(dim).fill(-Infinity)
  for (const d of data) {
    for (let i = 0; i < dim; i++) {
      if (d.raw[i] < mins[i]) mins[i] = d.raw[i]
      if (d.raw[i] > maxs[i]) maxs[i] = d.raw[i]
    }
  }
  const points = data.map((d) =>
    d.raw.map((v, i) => (maxs[i] === mins[i] ? 0 : (v - mins[i]) / (maxs[i] - mins[i]))),
  )
  return { candidates: data.map((d) => d.candidate), points }
})

const clusters = computed(() => {
  const { candidates: cs, points } = clusterPoints.value
  if (points.length === 0) return null
  const result = math.kmeans(points, Math.min(k.value, points.length))
  const groups: { candidates: CandidateRoof[]; centroid: number[]; meanScore: number }[] = []
  for (let c = 0; c < result.centroids.length; c++) {
    groups.push({ candidates: [], centroid: result.centroids[c], meanScore: 0 })
  }
  for (let i = 0; i < cs.length; i++) {
    groups[result.assignments[i]].candidates.push(cs[i])
  }
  for (const g of groups) {
    g.meanScore = math.mean(g.candidates.map((c) => Number(c.scoreAptitud) || 0))
  }
  return groups.filter((g) => g.candidates.length > 0).sort((a, b) => b.meanScore - a.meanScore)
})

// Regresión multivariable simplificada: combine top 3 variables más correlacionadas
// con score y muestra la regresión sobre la suma estandarizada
const regressionTop = computed(() => {
  const top3 = ahpCorrelations.value.slice(0, 3)
  if (top3.length < 1 || candidates.value.length < 5) return null
  const points = candidates.value
    .filter((c) => c.variables && Number.isFinite(Number(c.scoreAptitud)))
    .map((c) => {
      const composite = top3.reduce(
        (acc, t) => acc + Number((c.variables as any)[t.variable]) * Math.sign(t.r),
        0,
      )
      return { x: composite, y: Number(c.scoreAptitud) }
    })
  if (points.length < 3) return null
  const reg = math.linearRegression(points.map((p) => p.x), points.map((p) => p.y))
  return { points, reg, vars: top3 }
})

const regressionScatterChart = computed(() => {
  const r = regressionTop.value
  if (!r) return null
  const xs = r.points.map((p) => p.x)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  return {
    datasets: [
      { label: 'Candidato', data: r.points, backgroundColor: '#10B981', pointRadius: 5 },
      {
        label: `Regresión (R²=${r.reg.r2.toFixed(2)})`,
        data: [{ x: minX, y: r.reg.predict(minX) }, { x: maxX, y: r.reg.predict(maxX) }],
        type: 'line', borderColor: '#0EA5E9', backgroundColor: 'transparent', pointRadius: 0, showLine: true,
      },
    ],
  }
})

const baseLineOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' as const } } }
const baseBarOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, indexAxis: 'y' as const }
const baseDoughnutOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' as const } } }
const corrBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { x: { min: -1, max: 1, title: { display: true, text: 'Coeficiente de correlación r' } } },
  indexAxis: 'y' as const,
}
const scatterOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' as const } },
}

const formatNumber = (v: number) => v.toLocaleString('es-MX', { maximumFractionDigits: 2 })
</script>

<template>
  <div class="space-y-6">
    <header class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 class="text-2xl font-semibold text-ink">Monitoreo y análisis</h2>
        <p class="mt-1 text-sm text-gray-500">
          Estadística descriptiva, inferencial y modelado de los techos verdes y candidatos AHP,
          junto con métricas de uso de la plataforma.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <select v-model.number="days" class="rounded-md border border-gray-200 px-3 py-1.5 text-xs">
          <option :value="7">Últimos 7 días</option>
          <option :value="30">Últimos 30 días</option>
          <option :value="90">Últimos 90 días</option>
          <option :value="180">Últimos 180 días</option>
        </select>
        <button class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50" @click="load" :disabled="loading">
          Actualizar
        </button>
      </div>
    </header>

    <div v-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{{ error }}</div>

    <div class="flex flex-wrap gap-2 border-b border-gray-200">
      <button
        v-for="tab in [
          { key: 'interacciones', label: 'Interacciones' },
          { key: 'descriptivo', label: 'Descriptivo' },
          { key: 'inferencial', label: 'Inferencial' },
          { key: 'modelado', label: 'Modelado' },
        ]"
        :key="tab.key"
        class="px-3 py-2 text-sm font-medium border-b-2 transition-colors"
        :class="activeTab === tab.key ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-ink'"
        @click="activeTab = tab.key as any"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- INTERACCIONES -->
    <section v-if="activeTab === 'interacciones'" class="space-y-5">
      <div class="grid gap-4 md:grid-cols-4">
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <p class="text-xs uppercase tracking-wide text-gray-500">Pageviews</p>
          <p class="mt-1 text-3xl font-bold text-eco">{{ summary?.totals.pageviews ?? 0 }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <p class="text-xs uppercase tracking-wide text-gray-500">Sesiones únicas</p>
          <p class="mt-1 text-3xl font-bold text-secondary">{{ summary?.totals.sessions ?? 0 }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <p class="text-xs uppercase tracking-wide text-gray-500">Clicks</p>
          <p class="mt-1 text-3xl font-bold text-primary">{{ summary?.totals.clicks ?? 0 }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <p class="text-xs uppercase tracking-wide text-gray-500">Envíos / aportes</p>
          <p class="mt-1 text-3xl font-bold text-accent">{{ summary?.totals.submits ?? 0 }}</p>
        </div>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 class="mb-3 text-sm font-semibold text-ink">Evolución diaria</h3>
        <div class="h-72">
          <ChartsLineChart v-if="seriesChart" :data="seriesChart" :options="baseLineOptions" />
          <p v-else class="text-sm text-gray-500">Sin datos</p>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 class="mb-3 text-sm font-semibold text-ink">Tipo de evento</h3>
          <div class="h-64">
            <ChartsDoughnutChart v-if="eventTypeChart" :data="eventTypeChart" :options="baseDoughnutOptions" />
            <p v-else class="text-sm text-gray-500">Sin datos</p>
          </div>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 class="mb-3 text-sm font-semibold text-ink">Top rutas (pageviews)</h3>
          <div class="h-64">
            <ChartsBarChart v-if="topPathsChart && summary?.topPaths.length" :data="topPathsChart" :options="baseBarOptions" />
            <p v-else class="text-sm text-gray-500">Sin tráfico todavía</p>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 class="mb-3 text-sm font-semibold text-ink">Top elementos clickeados (data-track)</h3>
        <div class="h-64">
          <ChartsBarChart v-if="topTargetsChart && summary?.topTargets.length" :data="topTargetsChart" :options="baseBarOptions" />
          <p v-else class="text-sm text-gray-500">Sin clicks instrumentados todavía. Marca elementos con <code>data-track="..."</code>.</p>
        </div>
      </div>
    </section>

    <!-- DESCRIPTIVO -->
    <section v-if="activeTab === 'descriptivo'" class="space-y-5">
      <div class="grid gap-4 md:grid-cols-4">
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <p class="text-xs uppercase tracking-wide text-gray-500">Techos verdes</p>
          <p class="mt-1 text-3xl font-bold text-eco">{{ greenRoofs.length }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <p class="text-xs uppercase tracking-wide text-gray-500">Candidatos AHP</p>
          <p class="mt-1 text-3xl font-bold text-secondary">{{ candidates.length }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <p class="text-xs uppercase tracking-wide text-gray-500">Superficie media (m²)</p>
          <p class="mt-1 text-3xl font-bold text-primary">{{ formatNumber(superficieStats.mean) }}</p>
          <p class="mt-1 text-xs text-gray-500">σ = {{ formatNumber(superficieStats.std) }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <p class="text-xs uppercase tracking-wide text-gray-500">Score AHP medio</p>
          <p class="mt-1 text-3xl font-bold text-accent">{{ formatNumber(scoreStats.mean) }}</p>
          <p class="mt-1 text-xs text-gray-500">σ = {{ formatNumber(scoreStats.std) }}</p>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 class="mb-3 text-sm font-semibold text-ink">Techos por alcaldía</h3>
          <div class="h-64">
            <ChartsBarChart :data="alcaldiaChart" :options="baseBarOptions" />
          </div>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 class="mb-3 text-sm font-semibold text-ink">Tipo de edificio</h3>
          <div class="h-64">
            <ChartsDoughnutChart :data="tipoEdificioChart" :options="baseDoughnutOptions" />
          </div>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 class="mb-3 text-sm font-semibold text-ink">Tipo de techo verde</h3>
          <div class="h-64">
            <ChartsDoughnutChart :data="tipoTechoChart" :options="baseDoughnutOptions" />
          </div>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 class="mb-3 text-sm font-semibold text-ink">Estado de techos</h3>
          <div class="h-64">
            <ChartsDoughnutChart :data="estadoChart" :options="baseDoughnutOptions" />
          </div>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 class="mb-3 text-sm font-semibold text-ink">Distribución de superficie (m²)</h3>
          <div class="h-64">
            <ChartsBarChart :data="superficieHistChart" :options="{ ...baseBarOptions, indexAxis: 'x' }" />
          </div>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 class="mb-3 text-sm font-semibold text-ink">Distribución de score AHP</h3>
          <div class="h-64">
            <ChartsBarChart :data="scoreHistChart" :options="{ ...baseBarOptions, indexAxis: 'x' }" />
          </div>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 class="mb-3 text-sm font-semibold text-ink">Candidatos por estatus</h3>
          <div class="h-64">
            <ChartsDoughnutChart :data="candidatosEstatusChart" :options="baseDoughnutOptions" />
          </div>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 class="mb-3 text-sm font-semibold text-ink">Confianza IA por candidato</h3>
          <ul class="space-y-2 text-sm">
            <li v-for="d in candidatosByConfianza" :key="d.key" class="flex items-center justify-between border-b border-gray-100 py-2">
              <span class="text-gray-600">{{ d.key }}</span>
              <span class="font-semibold text-ink">{{ d.count }}</span>
            </li>
            <li v-if="candidatosByConfianza.length === 0" class="text-sm text-gray-500">Sin datos</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- INFERENCIAL -->
    <section v-if="activeTab === 'inferencial'" class="space-y-5">
      <div class="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 class="mb-3 text-sm font-semibold text-ink">Correlación de variables AHP con score</h3>
        <p class="mb-3 text-xs text-gray-500">
          Coeficiente de Pearson entre cada variable de aptitud (LST, NDVI, contaminación, etc.)
          y el score final. Los valores positivos sugieren que mayor variable → mayor aptitud;
          los negativos sugieren lo opuesto.
        </p>
        <div class="h-72">
          <ChartsBarChart :data="ahpCorrChart" :options="corrBarOptions" />
        </div>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 class="mb-3 text-sm font-semibold text-ink">Detalle de correlaciones</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 text-xs">
              <tr>
                <th class="px-3 py-2 text-left">Variable</th>
                <th class="px-3 py-2 text-right">r</th>
                <th class="px-3 py-2 text-right">N</th>
                <th class="px-3 py-2 text-left">Interpretación</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="d in ahpCorrelations" :key="d.variable">
                <td class="px-3 py-2 font-medium uppercase">{{ d.variable }}</td>
                <td class="px-3 py-2 text-right font-mono" :class="d.r > 0.3 ? 'text-eco' : d.r < -0.3 ? 'text-red-600' : 'text-gray-600'">
                  {{ formatNumber(d.r) }}
                </td>
                <td class="px-3 py-2 text-right text-gray-500">{{ d.n }}</td>
                <td class="px-3 py-2 text-xs text-gray-600">
                  {{ Math.abs(d.r) > 0.7 ? 'Muy fuerte' : Math.abs(d.r) > 0.4 ? 'Moderada' : Math.abs(d.r) > 0.2 ? 'Débil' : 'Sin tendencia' }}
                  · {{ d.r > 0 ? 'positiva' : 'negativa' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 class="mb-3 text-sm font-semibold text-ink">Score por alcaldía</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-xs">
                <tr>
                  <th class="px-2 py-2 text-left">Alcaldía</th>
                  <th class="px-2 py-2 text-right">N</th>
                  <th class="px-2 py-2 text-right">Media</th>
                  <th class="px-2 py-2 text-right">Mediana</th>
                  <th class="px-2 py-2 text-right">σ</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="row in scoreByAlcaldia" :key="row.alcaldia">
                  <td class="px-2 py-2 font-medium">{{ row.alcaldia }}</td>
                  <td class="px-2 py-2 text-right">{{ row.count }}</td>
                  <td class="px-2 py-2 text-right">{{ formatNumber(row.mean) }}</td>
                  <td class="px-2 py-2 text-right">{{ formatNumber(row.median) }}</td>
                  <td class="px-2 py-2 text-right">{{ formatNumber(row.std) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 class="mb-3 text-sm font-semibold text-ink">Anomalías de score (|z|&gt;1.5)</h3>
          <div v-if="scoreAnomalies.length > 0" class="space-y-2 max-h-64 overflow-y-auto">
            <div v-for="row in scoreAnomalies" :key="row.candidate.id" class="flex items-center justify-between border-b border-gray-100 py-2">
              <div>
                <p class="text-sm font-medium text-ink">{{ row.candidate.nombre }}</p>
                <p class="text-xs text-gray-500">{{ row.candidate.alcaldia }} · score {{ formatNumber(Number(row.candidate.scoreAptitud)) }}</p>
              </div>
              <span class="rounded-full px-2 py-0.5 text-xs" :class="row.z < 0 ? 'bg-red-100 text-red-700' : 'bg-eco/15 text-eco'">
                z = {{ formatNumber(row.z) }}
              </span>
            </div>
          </div>
          <p v-else class="text-sm text-gray-500">Sin anomalías significativas.</p>
        </div>
      </div>
    </section>

    <!-- MODELADO -->
    <section v-if="activeTab === 'modelado'" class="space-y-5">
      <div class="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 class="mb-3 text-sm font-semibold text-ink">Regresión: variables top vs score AHP</h3>
        <p v-if="!regressionTop" class="text-sm text-gray-500">Datos insuficientes para regresión.</p>
        <div v-else>
          <p class="mb-3 text-xs text-gray-500">
            Combina las 3 variables más correlacionadas con el score
            ({{ regressionTop.vars.map(v => v.variable).join(', ') }})
            en una variable compuesta y ajusta una regresión lineal.
            R² = {{ formatNumber(regressionTop.reg.r2) }}.
          </p>
          <div class="h-72">
            <ChartsScatterChart :data="regressionScatterChart!" :options="scatterOptions" />
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-5">
        <div class="mb-3 flex items-center justify-between gap-3">
          <h3 class="text-sm font-semibold text-ink">K-means de candidatos por similitud AHP</h3>
          <div class="flex items-center gap-2 text-xs">
            <label class="text-gray-500">k =</label>
            <input v-model.number="k" type="number" min="2" max="6" class="w-16 rounded-md border border-gray-200 px-2 py-1 text-xs" />
          </div>
        </div>
        <p class="mb-3 text-xs text-gray-500">
          Agrupa candidatos por similitud combinando las 8 variables AHP normalizadas.
          Los clusters se ordenan por score promedio descendente.
        </p>
        <div v-if="clusters && clusters.length > 0" class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="(group, idx) in clusters" :key="idx" class="rounded-xl border border-gray-200 bg-white p-4">
            <p class="mb-1 text-xs font-semibold text-eco">Cluster {{ idx + 1 }} · {{ group.candidates.length }} candidatos</p>
            <p class="mb-3 text-xs text-gray-500">Score promedio: <span class="font-bold text-ink">{{ formatNumber(group.meanScore) }}</span></p>
            <ul class="space-y-1 text-xs max-h-48 overflow-y-auto">
              <li v-for="c in group.candidates.slice(0, 8)" :key="c.id" class="flex items-center justify-between border-b border-gray-100 py-1">
                <span class="font-medium text-ink truncate pr-2">{{ c.nombre }}</span>
                <span class="text-gray-500">{{ formatNumber(Number(c.scoreAptitud) || 0) }}</span>
              </li>
              <li v-if="group.candidates.length > 8" class="text-gray-400 text-center pt-1">
                +{{ group.candidates.length - 8 }} más
              </li>
            </ul>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500">Sin candidatos con variables AHP completas.</p>
      </div>
    </section>
  </div>
</template>
