<script setup lang="ts">
import { GLOSSARY } from '~/data/admin-glossary'
import AdminManual from '~/components/admin/Manual.vue'

definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

interface Summary {
  observatory?: string
  contenido?: Partial<Record<string, number>>
  prospectos?: { total: number; pendientes: number; aprobados: number; rechazados: number }
  cmsSections?: number
  candidatesByEstatus?: Record<string, number>
  validationsByEstado?: Record<string, number>
  greenRoofsByTipo?: Record<string, number>
  ahpBuckets?: { alto: number; medio: number; bajo: number }
}

const { apiFetch } = useApi()
const config = useRuntimeConfig()
const observatory = config.public.observatory as string
const auth = useAuthStore()

const summary = ref<Summary | null>(null)
const loading = ref(true)
const error = ref('')

const num = (v: unknown): number => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await apiFetch<{ success: boolean; data: Summary }>(
      `/observatory/${observatory}/admin/summary`,
    )
    summary.value = res.data ?? null
  } catch (e: any) {
    error.value = e?.data?.error?.message || 'No se pudo cargar el resumen'
  } finally {
    loading.value = false
  }
}

onMounted(load)

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Buenos días'
  if (hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
})

const contenido = computed(() => summary.value?.contenido ?? {})
const prospectos = computed(() => summary.value?.prospectos ?? { total: 0, pendientes: 0, aprobados: 0, rechazados: 0 })
const candidatesByEstatus = computed(() => summary.value?.candidatesByEstatus ?? {})
const validationsByEstado = computed(() => summary.value?.validationsByEstado ?? {})
const greenRoofsByTipo = computed(() => summary.value?.greenRoofsByTipo ?? {})
const ahp = computed(() => summary.value?.ahpBuckets ?? { alto: 0, medio: 0, bajo: 0 })

const kpis = computed(() => {
  if (!summary.value) return []
  const c = contenido.value
  return [
    {
      label: 'Techos verdes instalados',
      tip: 'Inventario público de azoteas con techo verde existente. Visibles + ocultos.',
      value: num(c.greenRoofs),
      icon: 'lucide:home',
      tone: 'primary',
      to: '/admin/techos-verdes',
    },
    {
      label: 'Candidatos priorizados',
      tip: 'Azoteas detectadas y aprobadas como aptas para techo verde, con score AHP calculado.',
      value: num(c.candidates),
      icon: 'lucide:building-2',
      tone: 'secondary',
      to: '/admin/candidatos',
    },
    {
      label: 'Validaciones IA',
      tip: 'Análisis técnicos sobre candidatos con Gemini Vision (alta/media/baja confianza) + revisión humana.',
      value: num(c.validations),
      icon: 'lucide:check-circle-2',
      tone: 'eco',
      to: '/admin/validaciones',
    },
    {
      label: 'Prospectos pendientes',
      tip: 'Azoteas detectadas por OSM que aún no han sido revisadas por un humano.',
      value: num(prospectos.value.pendientes),
      icon: 'lucide:inbox',
      tone: 'accent',
      to: '/admin/prospectos',
    },
    {
      label: 'Score AHP alto (≥80)',
      tip: 'Candidatos con puntaje AHP alto — recomendados para visita en sitio prioritaria.',
      value: num(ahp.value.alto),
      icon: 'lucide:flame',
      tone: 'coral',
      to: '/admin/candidatos',
    },
    {
      label: 'Total prospectos',
      tip: 'Histórico completo del detector OSM: pendientes + aprobados + rechazados.',
      value: num(prospectos.value.total),
      icon: 'lucide:database',
      tone: 'eco',
      to: '/admin/prospectos',
    },
    {
      label: 'Aprobados',
      tip: 'Prospectos validados que pasaron a la pestaña de candidatos.',
      value: num(prospectos.value.aprobados),
      icon: 'lucide:thumbs-up',
      tone: 'eco',
      to: '/admin/candidatos',
    },
    {
      label: 'Secciones CMS',
      tip: 'Bloques editables del sitio público registrados en obs_cms_sections. Edita el copy desde /admin/contenido.',
      value: num(summary.value.cmsSections),
      icon: 'lucide:file-text',
      tone: 'primary',
      to: '/admin/contenido',
    },
  ]
})

const toneClass = (tone: string) => ({
  primary: 'bg-primary/10 text-primary',
  coral: 'bg-coral/10 text-coral-dark',
  eco: 'bg-eco/10 text-eco-dark',
  secondary: 'bg-secondary/10 text-secondary',
  accent: 'bg-accent/10 text-accent',
}[tone] || 'bg-gray-100 text-gray-700')

const estatusLabel: Record<string, string> = {
  candidato: 'Candidato',
  factibilidad_pendiente: 'Factibilidad pendiente',
  confirmado: 'Confirmado',
  descartado: 'Descartado',
  instalado: 'Instalado',
}

const validationEstadoLabel: Record<string, string> = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  rechazado: 'Rechazado',
  en_revision: 'En revisión',
}

const tipoLabel: Record<string, string> = {
  extensivo: 'Extensivo',
  'semi-intensivo': 'Semi-intensivo',
  intensivo: 'Intensivo',
}
</script>

<template>
  <div class="space-y-6">
    <header class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 class="text-2xl font-semibold text-ink">
          {{ greeting }}<ClientOnly><span v-if="auth.admin?.name">, {{ auth.admin.name }}</span></ClientOnly>
        </h2>
        <p class="mt-1 text-sm text-slate-custom">
          Panel de administración — Observatorio de Techos Verdes CDMX.
        </p>
      </div>
      <button class="btn-outline btn-sm" :disabled="loading" @click="load">
        <svg class="h-4 w-4" :class="loading ? 'animate-spin' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refrescar
      </button>
    </header>

    <div v-if="error" class="rounded-lg bg-red-50 p-3 text-xs text-red-700">{{ error }}</div>

    <!-- KPI cards -->
    <div v-if="loading && !summary" class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      <div v-for="i in 8" :key="i" class="card animate-pulse p-4">
        <div class="flex items-center gap-2">
          <div class="h-9 w-9 rounded-xl bg-gray-200" />
          <div class="h-3 w-20 rounded bg-gray-200" />
        </div>
        <div class="mt-3 h-7 w-12 rounded bg-gray-200" />
      </div>
    </div>

    <div v-else-if="summary" class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      <NuxtLink
        v-for="c in kpis"
        :key="c.label"
        :to="c.to"
        class="card-interactive flex flex-col gap-2 p-4"
      >
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-center gap-2">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" :class="toneClass(c.tone)">
              <Icon :name="c.icon" size="18" />
            </div>
            <span class="text-[10px] font-medium uppercase tracking-wider text-slate-custom leading-tight">
              {{ c.label }}
            </span>
          </div>
          <AdminInfoTooltip :text="c.tip" variant="icon" placement="bottom" :size="14" />
        </div>
        <span class="text-3xl font-bold text-ink tabular-nums">{{ Number(c.value).toLocaleString('es-MX') }}</span>
      </NuxtLink>
    </div>

    <!-- Acciones rápidas -->
    <div v-if="summary" class="card p-5">
      <h3 class="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-custom">
        Acciones rápidas
        <AdminInfoTooltip text="Operaciones del día a día sin tener que navegar por el sidebar." variant="icon" />
      </h3>
      <div class="flex flex-wrap gap-2">
        <NuxtLink to="/admin/prospectos" class="btn-primary btn-sm">
          <Icon name="lucide:radar" size="14" />
          <AdminInfoTooltip :text="GLOSSARY.detectorOsm" variant="inline">Detector OSM</AdminInfoTooltip>
        </NuxtLink>
        <NuxtLink to="/admin/candidatos" class="btn-outline btn-sm">
          <Icon name="lucide:building-2" size="14" />
          <AdminInfoTooltip :text="GLOSSARY.scoreAptitud" variant="inline">Score AHP</AdminInfoTooltip>
        </NuxtLink>
        <NuxtLink to="/admin/validaciones" class="btn-outline btn-sm">
          <Icon name="lucide:sparkles" size="14" />
          <AdminInfoTooltip :text="GLOSSARY.gemini" variant="inline">Validación IA</AdminInfoTooltip>
        </NuxtLink>
        <NuxtLink to="/admin/contenido" class="btn-outline btn-sm">
          <Icon name="lucide:file-text" size="14" />
          Editar contenido
        </NuxtLink>
        <NuxtLink to="/admin/analytics" class="btn-outline btn-sm">
          <Icon name="lucide:line-chart" size="14" />
          Analytics
        </NuxtLink>
      </div>
    </div>

    <!-- Bloques de monitoreo -->
    <div v-if="summary" class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <!-- Pipeline de prospectos -->
      <NuxtLink to="/admin/prospectos" class="card-interactive p-5">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="flex items-center gap-2 text-sm font-semibold text-ink">
            <Icon name="lucide:inbox" size="16" class="text-accent" />
            <AdminInfoTooltip :text="GLOSSARY.prospecto" variant="inline">
              Cola de prospectos
            </AdminInfoTooltip>
          </h3>
          <span class="text-xs text-slate-custom">Detector OSM</span>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div class="rounded-lg border border-gray-100 p-2.5">
            <p class="text-[10px] font-semibold uppercase tracking-wider text-slate-custom">Pendientes</p>
            <p class="mt-1 text-xl font-bold text-accent tabular-nums">{{ prospectos.pendientes }}</p>
          </div>
          <div class="rounded-lg border border-gray-100 p-2.5">
            <p class="text-[10px] font-semibold uppercase tracking-wider text-slate-custom">Aprobados</p>
            <p class="mt-1 text-xl font-bold text-eco tabular-nums">{{ prospectos.aprobados }}</p>
          </div>
          <div class="rounded-lg border border-gray-100 p-2.5">
            <p class="text-[10px] font-semibold uppercase tracking-wider text-slate-custom">Rechazados</p>
            <p class="mt-1 text-xl font-bold text-ink-muted tabular-nums">{{ prospectos.rechazados }}</p>
          </div>
        </div>
      </NuxtLink>

      <!-- Distribución AHP -->
      <NuxtLink to="/admin/candidatos" class="card-interactive p-5">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="flex items-center gap-2 text-sm font-semibold text-ink">
            <Icon name="lucide:target" size="16" class="text-coral" />
            <AdminInfoTooltip :text="GLOSSARY.ahp" variant="inline">
              Distribución AHP
            </AdminInfoTooltip>
          </h3>
          <span class="text-xs text-slate-custom">Score 0–100</span>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div class="rounded-lg border border-coral/30 bg-coral/5 p-2 text-center">
            <p class="text-[9px] font-semibold uppercase tracking-wider text-slate-custom">Alto (≥80)</p>
            <p class="mt-1 text-lg font-bold text-coral-dark tabular-nums">{{ ahp.alto }}</p>
          </div>
          <div class="rounded-lg border border-accent/30 bg-accent/5 p-2 text-center">
            <p class="text-[9px] font-semibold uppercase tracking-wider text-slate-custom">Medio (60–79)</p>
            <p class="mt-1 text-lg font-bold text-accent tabular-nums">{{ ahp.medio }}</p>
          </div>
          <div class="rounded-lg border border-eco/30 bg-eco/5 p-2 text-center">
            <p class="text-[9px] font-semibold uppercase tracking-wider text-slate-custom">Bajo (&lt;60)</p>
            <p class="mt-1 text-lg font-bold text-eco-dark tabular-nums">{{ ahp.bajo }}</p>
          </div>
        </div>
      </NuxtLink>

      <!-- Candidatos por estatus -->
      <NuxtLink to="/admin/candidatos" class="card-interactive p-5">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="flex items-center gap-2 text-sm font-semibold text-ink">
            <Icon name="lucide:building-2" size="16" class="text-secondary" />
            Candidatos por estatus
          </h3>
          <span class="text-xs text-slate-custom">Pipeline</span>
        </div>
        <div v-if="Object.keys(candidatesByEstatus).length" class="space-y-1.5">
          <div v-for="(count, estatus) in candidatesByEstatus" :key="estatus" class="flex items-center justify-between text-xs">
            <span class="text-ink">{{ estatusLabel[estatus] || estatus }}</span>
            <span class="font-mono font-semibold text-ink tabular-nums">{{ count }}</span>
          </div>
        </div>
        <p v-else class="text-xs text-slate-custom">Sin candidatos.</p>
      </NuxtLink>

      <!-- Validaciones por estado -->
      <NuxtLink to="/admin/validaciones" class="card-interactive p-5">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="flex items-center gap-2 text-sm font-semibold text-ink">
            <Icon name="lucide:check-circle-2" size="16" class="text-eco" />
            <AdminInfoTooltip :text="GLOSSARY.validacion" variant="inline">
              Validaciones por estado
            </AdminInfoTooltip>
          </h3>
          <span class="text-xs text-slate-custom">IA + manual</span>
        </div>
        <div v-if="Object.keys(validationsByEstado).length" class="grid grid-cols-2 gap-2 text-xs">
          <div
            v-for="(count, estado) in validationsByEstado"
            :key="estado"
            class="rounded-lg border border-gray-100 p-2"
          >
            <p class="text-[10px] uppercase tracking-wider text-slate-custom">{{ validationEstadoLabel[estado] || estado }}</p>
            <p class="mt-1 text-lg font-bold text-ink tabular-nums">{{ count }}</p>
          </div>
        </div>
        <p v-else class="text-xs text-slate-custom">Sin validaciones.</p>
      </NuxtLink>

      <!-- Inventario por tipo -->
      <NuxtLink to="/admin/techos-verdes" class="card-interactive p-5">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="flex items-center gap-2 text-sm font-semibold text-ink">
            <Icon name="lucide:home" size="16" class="text-primary" />
            <AdminInfoTooltip :text="GLOSSARY.techoVerde" variant="inline">
              Inventario por tipo
            </AdminInfoTooltip>
          </h3>
          <span class="text-xs text-slate-custom">Sistema</span>
        </div>
        <div v-if="Object.keys(greenRoofsByTipo).length" class="flex flex-wrap gap-1.5">
          <span
            v-for="(count, tipo) in greenRoofsByTipo"
            :key="tipo"
            class="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
          >
            {{ tipoLabel[tipo] || tipo }}: <strong class="ml-1 tabular-nums">{{ count }}</strong>
          </span>
        </div>
        <p v-else class="text-xs text-slate-custom">Sin techos verdes registrados.</p>
      </NuxtLink>

      <!-- CMS -->
      <NuxtLink to="/admin/contenido" class="card-interactive p-5">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="flex items-center gap-2 text-sm font-semibold text-ink">
            <Icon name="lucide:file-text" size="16" class="text-primary" />
            <AdminInfoTooltip :text="GLOSSARY.cms" variant="inline">
              Contenido editorial (CMS)
            </AdminInfoTooltip>
          </h3>
          <span class="text-xs text-slate-custom">{{ summary.cmsSections ?? 0 }} secciones</span>
        </div>
        <p class="text-xs text-slate-custom">
          Bloques editables del sitio público (home, sobre, metodología, indicadores). Edita el copy
          sin tocar código.
        </p>
      </NuxtLink>
    </div>

    <!-- Manual del observatorio -->
    <div class="mt-8">
      <AdminManual />
    </div>
  </div>
</template>
