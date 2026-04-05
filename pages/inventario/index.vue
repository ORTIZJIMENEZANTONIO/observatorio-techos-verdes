<template>
  <div class="bg-surface">
    <section class="bg-white py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="Inventario de Techos Verdes"
          subtitle="57 techos verdes registrados en la Ciudad de México"
          tag="Inventario"
        />

        <!-- Search and filters -->
        <div class="mt-6 space-y-4">
          <!-- Search bar -->
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar por nombre, dirección o alcaldía..."
              class="input pl-10"
            >
          </div>

          <!-- Filter chips row -->
          <div class="flex flex-wrap gap-3">
            <select v-model="filterAlcaldia" class="select !w-auto min-w-[160px]">
              <option value="">Alcaldía: Todas</option>
              <option v-for="a in alcaldias" :key="a" :value="a">{{ a }}</option>
            </select>

            <select v-model="filterTipoEdificio" class="select !w-auto min-w-[160px]">
              <option value="">Tipo edificio: Todos</option>
              <option v-for="t in tiposEdificio" :key="t" :value="t">{{ formatTipoEdificio(t) }}</option>
            </select>

            <select v-model="filterTipoTecho" class="select !w-auto min-w-[160px]">
              <option value="">Techo: Todos</option>
              <option v-for="t in tiposTecho" :key="t" :value="t">{{ formatTipoTecho(t) }}</option>
            </select>

            <select v-model="filterEstado" class="select !w-auto min-w-[140px]">
              <option value="">Estado: Todos</option>
              <option v-for="e in estados" :key="e" :value="e">{{ formatEstado(e) }}</option>
            </select>

            <button
              v-if="hasActiveFilters"
              class="btn-ghost btn-sm"
              @click="clearFilters"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        <!-- Stats row -->
        <div ref="statsGrid" class="mt-8 stagger-children grid grid-cols-2 gap-4 md:grid-cols-4">
          <div class="kpi-card reveal">
            <p class="text-2xl font-bold text-primary">{{ filteredRoofs.length }}</p>
            <p class="text-xs text-slate-custom">Techos encontrados</p>
          </div>
          <div class="kpi-card reveal">
            <p class="text-2xl font-bold text-eco">{{ totalFilteredArea.toLocaleString() }}</p>
            <p class="text-xs text-slate-custom">Superficie total (m2)</p>
          </div>
          <div class="kpi-card reveal">
            <p class="text-2xl font-bold text-secondary">{{ activeCount }}</p>
            <p class="text-xs text-slate-custom">Techos activos</p>
          </div>
          <div class="kpi-card reveal">
            <p class="text-2xl font-bold text-accent">{{ alcaldiaCount }}</p>
            <p class="text-xs text-slate-custom">Alcaldías</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Roof grid -->
    <section class="py-12">
      <div class="container-wide">
        <template v-if="filteredRoofs.length > 0">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="roof in paginatedRoofs"
              :key="roof.id"
              class="card-interactive overflow-hidden animate-fade-in"
              :data-tipo="roof.tipoEdificio"
              @click="selectedRoof = roof"
            >
              <!-- Image -->
              <div class="relative h-36 overflow-hidden bg-gradient-to-br from-primary-50 to-eco/10">
                <img
                  :src="roofImageSrc(roof)"
                  :alt="roof.nombre"
                  class="h-full w-full object-cover"
                  loading="lazy"
                  @error="onImgError($event)"
                />
                <span
                  :class="[
                    'absolute right-3 top-3 badge',
                    estadoBadgeClass(roof.estado),
                  ]"
                >
                  {{ formatEstado(roof.estado) }}
                </span>
              </div>

              <div class="p-4">
                <div class="mb-2 flex flex-wrap items-center gap-1.5">
                  <span class="badge-primary">{{ formatTipoTecho(roof.tipoTechoVerde) }}</span>
                  <span class="badge-secondary">{{ formatTipoEdificio(roof.tipoEdificio) }}</span>
                </div>
                <h4 class="text-sm font-semibold text-ink leading-tight">{{ roof.nombre }}</h4>
                <p class="mt-1 text-xs text-slate-custom">{{ roof.alcaldia }}</p>
                <div class="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
                  <div class="flex items-center gap-1 text-xs text-ink-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                    {{ roof.superficie?.toLocaleString() }} m2
                  </div>
                  <div class="flex items-center gap-1 text-xs text-ink-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {{ roof.fechaRegistro }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <CommonPaginationControls
              v-model:current-page="currentPage"
              :total-pages="totalPages"
              :total-items="filteredRoofs.length"
              :per-page="perPage"
            />
          </div>
        </template>

        <!-- Empty state -->
        <div v-else class="flex flex-col items-center justify-center py-20 text-center">
          <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-ink">Sin resultados</h3>
          <p class="mt-2 max-w-sm text-sm text-slate-custom">
            No se encontraron techos verdes con los filtros seleccionados. Intenta ajustar los criterios de búsqueda.
          </p>
          <button class="btn-outline mt-4" @click="clearFilters">Limpiar filtros</button>
        </div>
      </div>
    </section>

    <!-- Image attribution -->
    <section class="border-t border-gray-100 bg-white py-6">
      <div class="container-wide">
        <p class="text-[10px] leading-relaxed text-slate-custom">
          Fotografías de edificios: Wikimedia Commons (CC BY-SA 2.0/3.0/4.0, CC BY 2.0/3.0/4.0, CC0).
          Autores: Gideonximi, Thelmadatter, Carlos Adampol, keizers, Pequeno mar, Ehecatl Cabrera, ProtoplasmaKid,
          Umarina, Isaacvp, AlejandroLinaresGarcia, Serge Saint, J.L.Escalante, Sebastianwsk, Tbhotch, Nacasma,
          CharlhyeMartinez, TonyTheTiger, Emmanuel Berrod/WIPO, Antony-22, Lamiot, SylvieShang, NNECAPA, Jamain.
          Imágenes genéricas de techos verdes: Wikimedia Commons (CC BY-SA 3.0/4.0, CC BY 2.0/4.0).
          Foto CIIEMAD: Cervantes Najera (2025), tesis doctoral CIIEMAD-IPN.
        </p>
      </div>
    </section>

    <!-- Detail Drawer -->
    <Teleport to="body">
      <Transition name="drawer-overlay">
        <div
          v-if="selectedRoof"
          class="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm"
          @click="selectedRoof = null"
        />
      </Transition>
      <Transition name="drawer-slide">
        <div
          v-if="selectedRoof"
          class="fixed right-0 top-0 z-[101] h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl"
        >
          <!-- Drawer header -->
          <div class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
            <h3 class="text-base font-semibold text-ink">Detalle del techo verde</h3>
            <button
              class="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-gray-100"
              @click="selectedRoof = null"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div class="p-6">
            <!-- Image -->
            <div class="h-48 overflow-hidden rounded-card bg-gradient-to-br from-primary-50 to-eco/10">
              <img
                :src="roofImageSrc(selectedRoof)"
                :alt="selectedRoof.nombre"
                class="h-full w-full object-cover"
                @error="onImgError($event)"
              />
            </div>

            <!-- Info -->
            <div class="mt-6">
              <div class="flex flex-wrap gap-2">
                <span class="badge-primary">{{ formatTipoTecho(selectedRoof.tipoTechoVerde) }}</span>
                <span class="badge-secondary">{{ formatTipoEdificio(selectedRoof.tipoEdificio) }}</span>
                <span :class="['badge', estadoBadgeClass(selectedRoof.estado)]">{{ formatEstado(selectedRoof.estado) }}</span>
              </div>
              <h2 class="mt-4 text-xl font-bold text-ink">{{ selectedRoof.nombre }}</h2>
              <p class="mt-1 text-sm text-slate-custom">{{ selectedRoof.direccion }}</p>
            </div>

            <!-- Stats grid -->
            <div class="mt-6 grid grid-cols-2 gap-4">
              <div class="rounded-card bg-surface p-3">
                <p class="text-xs text-slate-custom">Superficie</p>
                <p class="text-lg font-bold text-ink">{{ selectedRoof.superficie?.toLocaleString() }} m2</p>
              </div>
              <div class="rounded-card bg-surface p-3">
                <p class="text-xs text-slate-custom">Alcaldía</p>
                <p class="text-lg font-bold text-ink">{{ selectedRoof.alcaldia }}</p>
              </div>
              <div class="rounded-card bg-surface p-3">
                <p class="text-xs text-slate-custom">Retención de agua</p>
                <p class="text-lg font-bold text-secondary">{{ (selectedRoof.retencion_agua_litros || 0).toLocaleString() }} L</p>
              </div>
              <div class="rounded-card bg-surface p-3">
                <p class="text-xs text-slate-custom">CO2 capturado/año</p>
                <p class="text-lg font-bold text-eco">{{ (selectedRoof.co2_capturado_kg_anual || 0).toLocaleString() }} kg</p>
              </div>
              <div class="rounded-card bg-surface p-3">
                <p class="text-xs text-slate-custom">Reducción temp.</p>
                <p class="text-lg font-bold text-accent">{{ selectedRoof.reduccion_temperatura_c }}&deg;C</p>
              </div>
              <div class="rounded-card bg-surface p-3">
                <p class="text-xs text-slate-custom">Fecha instalación</p>
                <p class="text-lg font-bold text-ink">{{ selectedRoof.fechaRegistro }}</p>
              </div>
            </div>

            <!-- Species -->
            <div v-if="selectedRoof.especies_vegetales?.length" class="mt-6">
              <h4 class="text-sm font-semibold text-ink">Especies vegetales</h4>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <span
                  v-for="sp in selectedRoof.especies_vegetales"
                  :key="sp"
                  class="badge bg-eco/10 text-eco-dark italic"
                >
                  {{ sp }}
                </span>
              </div>
            </div>

            <!-- Responsible -->
            <div v-if="selectedRoof.responsable" class="mt-6">
              <h4 class="text-sm font-semibold text-ink">Responsable</h4>
              <p class="mt-1 text-sm text-slate-custom">{{ selectedRoof.responsable }}</p>
            </div>

            <!-- Notes -->
            <div v-if="selectedRoof.notas" class="mt-6">
              <h4 class="text-sm font-semibold text-ink">Notas</h4>
              <p class="mt-1 text-sm leading-relaxed text-slate-custom">{{ selectedRoof.notas }}</p>
            </div>

            <!-- Coordinates -->
            <div class="mt-6 rounded-card bg-surface p-3">
              <p class="text-xs text-slate-custom">Coordenadas</p>
              <p class="text-sm font-mono text-ink">{{ selectedRoof.lat }}, {{ selectedRoof.lng }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { greenRoofs } from '~/data/mock-roofs'

const { formatTipoEdificio, formatTipoTecho, formatEstadoTecho: formatEstado, estadoTechoBadgeClass: estadoBadgeClass } = useFormatters()
const { revealRef: statsGrid } = useScrollReveal({ stagger: true })

useHead({
  title: 'Inventario | Observatorio Techos Verdes CDMX',
  meta: [
    { name: 'description', content: 'Inventario de 57 techos verdes registrados en la Ciudad de México. Consulta información detallada de cada instalación.' },
  ],
})

const searchQuery = ref('')
const filterAlcaldia = ref('')
const filterTipoEdificio = ref('')
const filterTipoTecho = ref('')
const filterEstado = ref('')
const selectedRoof = ref<(typeof greenRoofs)[number] | null>(null)
const currentPage = ref(1)
const perPage = 15

const alcaldias = computed(() => {
  const set = new Set(greenRoofs.map(r => r.alcaldia))
  return Array.from(set).sort()
})

const tiposEdificio = computed(() => {
  const set = new Set(greenRoofs.map(r => r.tipoEdificio))
  return Array.from(set).sort()
})

const tiposTecho = computed(() => {
  const set = new Set(greenRoofs.map(r => r.tipoTechoVerde))
  return Array.from(set).sort()
})

const estados = computed(() => {
  const set = new Set(greenRoofs.map(r => r.estado))
  return Array.from(set).sort()
})

const hasActiveFilters = computed(() => {
  return searchQuery.value || filterAlcaldia.value || filterTipoEdificio.value || filterTipoTecho.value || filterEstado.value
})

const filteredRoofs = computed(() => {
  return greenRoofs.filter(r => {
    if (filterAlcaldia.value && r.alcaldia !== filterAlcaldia.value) return false
    if (filterTipoEdificio.value && r.tipoEdificio !== filterTipoEdificio.value) return false
    if (filterTipoTecho.value && r.tipoTechoVerde !== filterTipoTecho.value) return false
    if (filterEstado.value && r.estado !== filterEstado.value) return false
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      const match = (
        r.nombre.toLowerCase().includes(q) ||
        r.direccion.toLowerCase().includes(q) ||
        r.alcaldia.toLowerCase().includes(q)
      )
      if (!match) return false
    }
    return true
  })
})

const totalPages = computed(() => Math.ceil(filteredRoofs.value.length / perPage) || 1)
const paginatedRoofs = computed(() => filteredRoofs.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage))

watch([searchQuery, filterAlcaldia, filterTipoEdificio, filterTipoTecho, filterEstado], () => { currentPage.value = 1 })

const totalFilteredArea = computed(() => {
  return filteredRoofs.value.reduce((sum, r) => sum + (r.superficie || 0), 0)
})

const activeCount = computed(() => {
  return filteredRoofs.value.filter(r => r.estado === 'activo').length
})

const alcaldiaCount = computed(() => {
  return new Set(filteredRoofs.value.map(r => r.alcaldia)).size
})

function clearFilters() {
  searchQuery.value = ''
  filterAlcaldia.value = ''
  filterTipoEdificio.value = ''
  filterTipoTecho.value = ''
  filterEstado.value = ''
}

// Image helpers: roof-specific → category fallback → gradient placeholder
const CATEGORY_FALLBACKS: Record<string, string> = {
  hospital: '/img/roofs/_fallback-hospital.jpg',
  gobierno: '/img/roofs/_fallback-gobierno.jpg',
  oficinas: '/img/roofs/_fallback-oficinas.jpg',
  educativo: '/img/roofs/_fallback-educativo.jpg',
  residencial: '/img/roofs/_fallback-residencial.jpg',
  industrial: '/img/roofs/_fallback-industrial.jpg',
  centro_comercial: '/img/roofs/_fallback-comercial.jpg',
  supermercado: '/img/roofs/_fallback-comercial.jpg',
  mercado: '/img/roofs/_fallback-comercial.jpg',
  cultural: '/img/roofs/_fallback-gobierno.jpg',
}

function roofImageSrc(roof: (typeof greenRoofs)[number]): string {
  if (roof.imagen) return roof.imagen
  return CATEGORY_FALLBACKS[roof.tipoEdificio] || '/img/roofs/_fallback-comercial.jpg'
}

function onImgError(event: Event) {
  const img = event.target as HTMLImageElement
  const src = img.getAttribute('src') || ''
  // If already on a fallback, hide the image and let the gradient bg show
  if (src.includes('_fallback')) {
    img.style.display = 'none'
    return
  }
  // Try category fallback using data-tipo on nearest card, or from drawer's selectedRoof
  const tipo = img.closest('[data-tipo]')?.getAttribute('data-tipo')
    || selectedRoof.value?.tipoEdificio
    || ''
  img.src = CATEGORY_FALLBACKS[tipo] || '/img/roofs/_fallback-comercial.jpg'
}

</script>

<style scoped>
.drawer-overlay-enter-active,
.drawer-overlay-leave-active {
  transition: opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.drawer-overlay-enter-from,
.drawer-overlay-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.drawer-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}
</style>
