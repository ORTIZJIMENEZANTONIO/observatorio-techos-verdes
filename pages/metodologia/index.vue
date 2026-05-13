<template>
  <div class="bg-surface">
    <CommonHeroSection compact>
      <h1 class="text-3xl font-extrabold text-white md:text-4xl">Metodología y aptitud territorial</h1>
      <p class="mt-2 text-base text-white/80">Documentación técnica del modelo multicriterio, variables, fuentes de datos y el índice de aptitud territorial</p>
    </CommonHeroSection>

    <section class="bg-white py-12 md:py-16">
      <div class="container-wide">
        <!-- Introduction -->
        <div class="mt-8 max-w-3xl">
          <p class="text-base leading-relaxed text-slate-custom">
            El Observatorio de Techos Verdes CDMX utiliza un modelo de análisis multicriterio para evaluar la aptitud territorial de las distintas zonas de la Ciudad de México. Este modelo integra variables ambientales, urbanas y de calidad del aire, ponderadas según su relevancia para la implementación de infraestructura verde en azoteas.
          </p>
          <p class="mt-4 text-base leading-relaxed text-slate-custom">
            El enfoque combina sistemas de información geográfica (SIG), datos de sensores remotos (Sentinel-2, Landsat 8/9), estadísticas de calidad del aire y validación de campo con expertos del CIIEMAD-IPN para detectar, clasificar y priorizar sitios candidatos.
          </p>
        </div>

        <!-- Aptitud disclaimer banner -->
        <div class="mt-6 rounded-card border border-accent/30 bg-accent/5 p-4">
          <div class="flex gap-3">
            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-accent-dark">Aviso sobre aptitud territorial</h4>
              <p class="mt-1 text-sm leading-relaxed text-slate-custom">
                Este índice muestra aptitud territorial, no factibilidad estructural del inmueble. Los resultados reflejan condiciones ambientales y urbanas. Consulte dictámenes técnicos para implementación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Flujo del modelo -->
    <section class="py-12 md:py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="Flujo del modelo"
          subtitle="Cuatro etapas principales que componen el proceso analítico del observatorio."
          :centered="true"
        />

        <div class="relative">
          <!-- Connection line -->
          <div class="absolute left-1/2 top-14 hidden h-0.5 w-3/4 -translate-x-1/2 bg-gradient-to-r from-primary via-secondary to-eco lg:block" />
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <article
              v-for="step in methodologySteps"
              :key="step.number"
              class="fun-card"
              :style="funStyle(step.color)"
            >
              <div class="fun-card-icon-wrap" aria-hidden="true">
                <span class="fun-card-icon-halo" />
                <span class="fun-card-icon-bubble" />
                <svg
                  class="fun-card-icon-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path v-for="(d, i) in funPaths(step.icono)" :key="i" :d="d" />
                </svg>
                <span class="fun-card-badge">{{ step.number }}</span>
                <span class="fun-card-spark fun-card-spark--1" />
                <span class="fun-card-spark fun-card-spark--2" />
              </div>
              <h4 class="fun-card-label">{{ step.title }}</h4>
              <p class="fun-card-desc">{{ step.description }}</p>
              <ul v-if="step.details" class="mt-4 w-full space-y-1 text-left">
                <li v-for="detail in step.details" :key="detail" class="flex items-start gap-2 text-xs text-slate-custom">
                  <span
                    class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                    :style="{ backgroundColor: funHex(step.color) }"
                  />
                  {{ detail }}
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Model toggle + Variable cards -->
    <section class="bg-white py-12 md:py-16">
      <div class="container-wide">
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <CommonSectionTitle
            :title="`Variables del modelo (${numVariables})`"
            subtitle="Cada variable se normaliza y pondera según su relevancia para la implementación de techos verdes."
          />
          <div class="flex items-center gap-2">
            <button
              :class="[
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                !useEnhanced ? 'bg-primary text-white' : 'bg-gray-100 text-ink-muted hover:bg-gray-200',
              ]"
              @click="useEnhanced = false"
            >
              Original (8 var)
            </button>
            <button
              :class="[
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                useEnhanced ? 'bg-primary text-white' : 'bg-gray-100 text-ink-muted hover:bg-gray-200',
              ]"
              @click="useEnhanced = true"
            >
              Ambiental (11 var)
            </button>
          </div>
        </div>
        <p class="mt-2 text-xs text-slate-custom">
          {{ useEnhanced
            ? 'Modelo ampliado con indicadores bióticos e hídricos por alcaldía.'
            : 'Modelo original con 8 variables de temperatura, urbanización y calidad del aire.'
          }}
        </p>

        <!-- Variable cards -->
        <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="peso in pesos"
            :key="peso.codigo"
            class="fun-card"
            :style="{
              '--fun-color': peso.color,
              '--fun-light': peso.color + '1F',
            }"
          >
            <span class="fun-card-hint">{{ peso.codigo }}</span>
            <div class="fun-card-icon-wrap" aria-hidden="true">
              <span class="fun-card-icon-halo" />
              <span class="fun-card-icon-bubble" />
              <svg
                class="fun-card-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path v-for="(d, i) in funPaths(pesoIcono(peso.codigo))" :key="i" :d="d" />
              </svg>
              <span class="fun-card-spark fun-card-spark--1" />
              <span class="fun-card-spark fun-card-spark--2" />
            </div>
            <p class="fun-card-value tabular-nums">
              {{ peso.peso.toFixed(1) }}<span class="fun-card-unit">%</span>
            </p>
            <h4 class="fun-card-label">{{ peso.variable }}</h4>

            <!-- Barra de peso -->
            <div class="mt-3 w-full">
              <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  class="h-full rounded-full transition-all"
                  :style="{
                    width: `${(peso.peso / maxWeight) * 100}%`,
                    backgroundColor: peso.color,
                  }"
                />
              </div>
            </div>

            <p class="fun-card-desc">{{ peso.descripcion }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Charts -->
    <section class="py-12 md:py-16">
      <div class="container-wide">
        <h3 class="text-xl font-semibold text-ink">Pesos del modelo</h3>
        <p class="mt-1 text-sm text-slate-custom">Visualización de la distribución de pesos entre las {{ numVariables }} variables (suman 100%)</p>
        <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Radar chart -->
          <div class="panel p-6">
            <ClientOnly>
              <template #fallback>
                <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
              </template>
              <ChartsRadarChart
                :labels="radarLabels"
                :data="radarData"
                :max-value="Math.ceil(maxWeight + 5)"
                title="Perfil de pesos del modelo"
                color="#0E5E3A"
              />
            </ClientOnly>
          </div>
          <!-- Horizontal bar chart -->
          <div class="panel p-6">
            <ClientOnly>
              <template #fallback>
                <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
              </template>
              <ChartsBarChart
                :labels="barLabels"
                :datasets="barDatasets"
                :horizontal="true"
                title="Peso relativo por variable"
              />
            </ClientOnly>
          </div>
          <!-- PolarArea chart -->
          <div class="panel p-6">
            <ClientOnly>
              <template #fallback>
                <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
              </template>
              <ChartsPolarAreaChart
                :labels="polarLabels"
                :data="polarData"
                :colors="polarColors"
                title="Distribución polar de pesos"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>

    <!-- Aptitud levels legend -->
    <section class="bg-white py-12">
      <div class="container-wide">
        <h3 class="text-xl font-semibold text-ink">Leyenda del mapa de aptitud</h3>
        <p class="mt-1 text-sm text-slate-custom">Clasificación de las zonas según su índice de aptitud territorial</p>
        <div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
          <div
            v-for="level in APTITUD_LEVELS"
            :key="level.label"
            class="flex items-center gap-3 rounded-card border p-4"
            :style="{ borderColor: level.color + '40' }"
          >
            <span class="h-6 w-10 rounded" :style="{ backgroundColor: level.color }" />
            <div>
              <p class="text-sm font-semibold text-ink">{{ level.label }}</p>
              <p class="text-xs text-slate-custom">{{ level.range }} pts</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What it means / What it does NOT mean -->
    <section class="py-12 md:py-16">
      <div class="container-wide">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <!-- What it means -->
          <div class="rounded-card bg-primary-50 p-6 lg:p-8">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-primary">Qué significa aptitud territorial</h3>
            </div>
            <p class="mt-4 text-sm leading-relaxed text-primary-dark/80">
              La aptitud territorial indica qué tan favorable es una zona para la implementación de techos verdes, con base en variables ambientales, urbanas y de calidad del aire. Un índice alto no significa que un inmueble específico sea apto, sino que la zona en la que se encuentra presenta condiciones que hacen prioritaria la intervención con infraestructura verde.
            </p>
          </div>

          <!-- What it does NOT mean -->
          <div class="rounded-card border border-accent/20 bg-accent/5 p-6 lg:p-8">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-accent-dark">Qué NO significa</h3>
            </div>
            <ul class="mt-4 space-y-3">
              <li class="flex items-start gap-2 text-sm text-slate-custom">
                <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                No indica factibilidad estructural del inmueble.
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-custom">
                <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                No sustituye dictámenes técnicos profesionales.
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-custom">
                <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                No garantiza viabilidad económica ni normativa.
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-custom">
                <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                No evalúa la condición actual del techo ni la capacidad de carga del edificio.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Fuentes oficiales de datos -->
    <section class="py-12 md:py-16">
      <div class="container-wide">
        <CommonOfficialSourcesSection />
        <div class="mt-8 rounded-card border border-primary/20 bg-primary-50 p-5">
          <h4 class="text-sm font-semibold text-primary">Jerarquía de datos</h4>
          <p class="mt-2 text-sm leading-relaxed text-slate-custom">
            El observatorio prioriza datos de fuentes oficiales verificadas. Cuando los datos oficiales no están disponibles, se utilizan datos derivados (calculados a partir de fuentes primarias) o datos de demostración (mock). Cada registro muestra su origen mediante una etiqueta de procedencia.
          </p>
          <div class="mt-4 flex flex-wrap gap-3">
            <div class="flex items-center gap-2 text-xs">
              <span class="h-2.5 w-2.5 rounded-full bg-eco" />
              <span class="text-slate-custom"><strong class="text-ink">Oficial:</strong> Datos verificados de fuentes gubernamentales</span>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="h-2.5 w-2.5 rounded-full bg-secondary" />
              <span class="text-slate-custom"><strong class="text-ink">Derivado:</strong> Datos calculados a partir de fuentes primarias</span>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="h-2.5 w-2.5 rounded-full bg-slate-custom" />
              <span class="text-slate-custom"><strong class="text-ink">Demostración:</strong> Datos simulados para el MVP</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Limitaciones del estudio -->
    <section class="bg-white py-12 md:py-16">
      <div class="container-wide">
        <h3 class="text-xl font-semibold text-ink">Limitaciones del estudio</h3>
        <p class="mt-2 text-sm text-slate-custom max-w-3xl">
          Como todo modelo analítico, este estudio tiene limitaciones que deben considerarse al interpretar los resultados.
        </p>
        <div class="mt-6 max-w-3xl">
          <ul class="space-y-3">
            <li v-for="limit in limitations" :key="limit" class="flex items-start gap-3 text-sm text-slate-custom">
              <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent/50" />
              {{ limit }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Download methodology document -->
    <section class="py-12">
      <div class="container-wide">
        <div class="card p-6">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <polyline points="9 15 12 18 15 15" />
                </svg>
              </div>
              <div>
                <p class="text-base font-semibold text-ink">Documento de metodología</p>
                <p class="text-sm text-slate-custom">Descripción técnica completa del modelo, variables y fuentes de datos.</p>
                <p class="mt-1 text-xs text-ink-muted">PDF, ~2.5 MB, Actualizado dic. 2024</p>
              </div>
            </div>
            <button class="btn-primary shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Descargar PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { aptitudPesos, aptitudPesosOriginal } from '~/data/aptitud-pesos'
import { APTITUD_LEVELS } from '~/utils/constants'

const { funPaths, funStyle, funHex } = useFunPalette()

// Mapeo de código AHP → icono semántico
const pesoIconMap: Record<string, string> = {
  T_LST: 'thermometer',
  DEN_POB: 'people',
  USO_SUELO: 'map',
  COB_VEG: 'leaf',
  PRECIP: 'water',
  PENDIENTE: 'layers',
  ACC_VIAL: 'flag',
  CALIDAD_AIRE: 'cloud',
  BIO_SHANNON: 'leaf',
  BIO_RIQUEZA: 'community',
  HIDRO_DEFICIT: 'water',
}
function pesoIcono(codigo: string) {
  return pesoIconMap[codigo] || 'chart'
}

useHead({
  title: 'Metodología | Observatorio Techos Verdes CDMX',
  meta: [
    { name: 'description', content: 'Metodología del Observatorio de Techos Verdes CDMX. Modelo multicriterio, variables, pesos, aptitud territorial y fuentes de datos.' },
  ],
})

const useEnhanced = ref(true)

const pesos = computed(() => useEnhanced.value ? aptitudPesos : aptitudPesosOriginal)
const numVariables = computed(() => pesos.value.length)
const maxWeight = computed(() => Math.max(...pesos.value.map(p => p.peso)))

// Radar chart
const radarLabels = computed(() => pesos.value.map(p => p.variable.replace(/\s*\(.*\)/, '')))
const radarData = computed(() => pesos.value.map(p => p.peso))

// Bar chart
const barLabels = computed(() => pesos.value.map(p => p.variable.replace(/\s*\(.*\)/, '')))
const barDatasets = computed(() => [
  {
    label: 'Peso (%)',
    data: pesos.value.map(p => p.peso),
    backgroundColor: pesos.value.map(p => p.color),
    borderRadius: 4,
  },
])

// PolarArea chart
const polarLabels = computed(() => pesos.value.map(p => p.variable.replace(/\s*\(.*\)/, '')))
const polarData = computed(() => pesos.value.map(p => p.peso))
const polarColors = computed(() => pesos.value.map(p => p.color))

const methodologySteps = [
  {
    number: 1,
    title: 'Recopilación de datos geoespaciales',
    description: 'Integración de múltiples fuentes de datos espaciales, incluyendo imágenes satelitales, datos censales y estaciones de monitoreo.',
    icono: 'satellite',
    color: 'secondary',
    details: [
      'Imágenes Landsat y MODIS para temperatura superficial',
      'Datos del INEGI para población y área urbanizada',
      'Estaciones RAMA para calidad del aire',
      'Coberturas de uso de suelo de SEDEMA',
    ],
  },
  {
    number: 2,
    title: 'Construcción del índice de aptitud',
    description: 'Normalización y ponderación de variables en un índice multicriterio de aptitud territorial.',
    icono: 'scale',
    color: 'violet',
    details: [
      'Normalización 0-100 por variable',
      'Ponderación por Proceso Analítico Jerárquico (AHP)',
      'Validación cruzada con expertos',
      'Clasificación en 5 niveles de aptitud',
    ],
  },
  {
    number: 3,
    title: 'Validación de campo',
    description: 'Verificación manual con expertos del CIIEMAD-IPN siguiendo la metodología de Cervantes-Nájera. Fotografía aérea, observaciones de campo y revisión de catastro.',
    icono: 'shield',
    color: 'accent',
    details: [
      'Revisión de imagen aérea de alta resolución',
      'Validación territorial con expertos',
      'Cruce con catastro y dictámenes oficiales',
      'Nivel de confianza por sitio',
    ],
  },
  {
    number: 4,
    title: 'Priorización territorial',
    description: 'Integración de los resultados del modelo de aptitud con las validaciones de campo para identificar y priorizar sitios candidatos.',
    icono: 'flag',
    color: 'rose',
    details: [
      'Cruce de aptitud con inventario existente',
      'Identificación de zonas de alta prioridad',
      'Generación de fichas por candidato',
      'Datos abiertos para consulta pública',
    ],
  },
]

// Limitaciones — editables desde /admin/contenido/metodologia
type Limitation = { text: string }
const cmsMetodologia = useCmsContent('metodologia')
const limitationsList = cmsMetodologia.list<Limitation>('limitations')
const limitations = computed(() => limitationsList.value.map((l) => l.text))
</script>
