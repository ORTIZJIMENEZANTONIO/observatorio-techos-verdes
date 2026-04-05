<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

const { apiFetch } = useApi()
const config = useRuntimeConfig()
const observatory = config.public.observatory as string
const auth = useAuthStore()

const summary = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await apiFetch(`/observatory/${observatory}/admin/summary`)
    summary.value = res.data
  } catch { /* fallback to empty */ }
  loading.value = false
})

const quickLinks = [
  { label: 'Prospectos', to: '/admin/prospectos', description: 'Detector + cola de aprobacion de prospectos detectados', color: 'bg-accent', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Candidatos', to: '/admin/candidatos', description: 'Sitios aprobados y priorizados por analisis multicriterio', color: 'bg-secondary', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { label: 'Validaciones', to: '/admin/validaciones', description: 'Validacion tecnica (IA + manual) sobre candidatos', color: 'bg-eco', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Inventario', to: '/admin/techos-verdes', description: 'Techos verdes implementados y existentes en la CDMX', color: 'bg-primary', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
]

const statCards = computed(() => [
  { label: 'Prospectos pendientes', value: summary.value?.prospectos?.pendientes ?? 0, color: 'text-accent', border: 'border-l-accent' },
  { label: 'Prospectos aprobados', value: summary.value?.prospectos?.aprobados ?? 0, color: 'text-eco', border: 'border-l-eco' },
  { label: 'Prospectos rechazados', value: summary.value?.prospectos?.rechazados ?? 0, color: 'text-alert', border: 'border-l-alert' },
  { label: 'Total prospectos', value: summary.value?.prospectos?.total ?? 0, color: 'text-ink', border: 'border-l-primary' },
])
</script>

<template>
  <div>
    <!-- Welcome header -->
    <div class="mb-6">
      <h2 class="text-2xl font-semibold text-ink">
        <ClientOnly>
          <template v-if="auth.admin?.name">Hola, {{ auth.admin.name }}</template>
          <template v-else>Dashboard</template>
          <template #fallback>Dashboard</template>
        </ClientOnly>
      </h2>
      <p class="mt-1 text-sm text-slate-custom">Resumen general del Observatorio de Techos Verdes</p>
    </div>

    <!-- Stats -->
    <div v-if="summary" class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(stat, i) in statCards"
        :key="stat.label"
        class="card border-l-4 p-4 transition-all duration-300"
        :class="stat.border"
        :style="{ animationDelay: `${i * 80}ms` }"
      >
        <p class="text-sm text-slate-custom">{{ stat.label }}</p>
        <p class="mt-1 text-2xl font-bold tabular-nums" :class="stat.color">{{ stat.value }}</p>
      </div>
    </div>

    <div v-else-if="loading" class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="i in 4" :key="i" class="card animate-pulse border-l-4 border-l-gray-200 p-4">
        <div class="h-4 w-24 rounded bg-gray-200" />
        <div class="mt-2 h-8 w-16 rounded bg-gray-200" />
      </div>
    </div>

    <!-- Pipeline overview -->
    <div class="mb-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h3 class="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-custom">Pipeline de gestion</h3>
      <div class="flex flex-wrap items-center gap-2 text-sm">
        <NuxtLink to="/admin/prospectos" class="group flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-2 font-medium text-accent transition-colors hover:bg-accent/20">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          Detector
        </NuxtLink>
        <svg class="h-4 w-4 flex-shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        <NuxtLink to="/admin/prospectos" class="group flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-2 font-medium text-accent transition-colors hover:bg-accent/20">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Prospectos
        </NuxtLink>
        <svg class="h-4 w-4 flex-shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        <NuxtLink to="/admin/candidatos" class="group flex items-center gap-1.5 rounded-lg bg-secondary/10 px-3 py-2 font-medium text-secondary transition-colors hover:bg-secondary/20">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          Candidatos
        </NuxtLink>
        <svg class="h-4 w-4 flex-shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        <NuxtLink to="/admin/validaciones" class="group flex items-center gap-1.5 rounded-lg bg-eco/10 px-3 py-2 font-medium text-eco transition-colors hover:bg-eco/20">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Validacion
        </NuxtLink>
        <svg class="h-4 w-4 flex-shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        <NuxtLink to="/admin/techos-verdes" class="group flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 font-medium text-primary transition-colors hover:bg-primary/20">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          Inventario
        </NuxtLink>
      </div>
      <p class="mt-3 text-xs text-slate-custom">Flujo completo: el detector identifica edificios, pasan a prospectos pendientes, se aprueban como candidatos, se validan tecnicamente, y los exitosos entran al inventario de techos verdes.</p>
    </div>

    <!-- Quick Links -->
    <h3 class="mb-4 text-lg font-semibold text-ink">Secciones</h3>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <NuxtLink
        v-for="link in quickLinks"
        :key="link.to"
        :to="link.to"
        class="card-interactive group flex items-start gap-4 p-5"
      >
        <div :class="[link.color, 'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-110']">
          <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" :d="link.icon" />
          </svg>
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-ink">{{ link.label }}</p>
            <svg class="h-4 w-4 text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p class="mt-1 text-sm text-slate-custom">{{ link.description }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
