<template>
  <div class="bg-surface">
    <CommonHeroSection compact>
      <h1 class="text-3xl font-extrabold text-white md:text-4xl">Inventario de techos verdes</h1>
      <p class="mt-2 text-base text-white/80">57 techos verdes registrados en la Ciudad de México</p>
    </CommonHeroSection>

    <section class="bg-white py-12 md:py-16">
      <div class="container-wide">
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

            <select v-model="sortBy" class="select !w-auto min-w-[180px]">
              <option value="nombre_asc">Nombre (A-Z)</option>
              <option value="nombre_desc">Nombre (Z-A)</option>
              <option value="superficie_desc">Superficie (mayor)</option>
              <option value="superficie_asc">Superficie (menor)</option>
              <option value="alcaldia_asc">Alcaldía (A-Z)</option>
              <option value="fecha_desc">Fecha (reciente)</option>
              <option value="fecha_asc">Fecha (antiguo)</option>
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
              <!-- Image / Gallery -->
              <div class="relative h-36 overflow-hidden bg-gradient-to-br from-primary-50 to-eco/10">
                <!-- Si tiene galería, muestra el carrusel; si no, una imagen única -->
                <template v-if="roof.imagenes && roof.imagenes.length > 0">
                  <NuxtImg
                    v-for="(img, i) in roof.imagenes"
                    :key="img.src"
                    :src="img.src"
                    :alt="img.caption || roof.nombre"
                    class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                    :class="(galleryIndex[roof.id] || 0) === i ? 'opacity-100' : 'opacity-0'"
                    loading="lazy"
                    sizes="xs:380px sm:400px md:380px lg:380px"
                    format="webp"
                    @error="onImgError($event)"
                  />
                  <!-- Counter top-left -->
                  <span
                    class="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-5-5L5 21" />
                    </svg>
                    {{ (galleryIndex[roof.id] || 0) + 1 }} / {{ roof.imagenes.length }}
                  </span>
                  <!-- Prev / next (solo si hay más de 1) -->
                  <template v-if="roof.imagenes.length > 1">
                    <button
                      class="gallery-nav gallery-nav--prev"
                      :aria-label="`Foto anterior de ${roof.nombre}`"
                      @click.stop="prevImage(roof.id, roof.imagenes!.length)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      class="gallery-nav gallery-nav--next"
                      :aria-label="`Siguiente foto de ${roof.nombre}`"
                      @click.stop="nextImage(roof.id, roof.imagenes!.length)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                    <!-- Dots -->
                    <div class="absolute bottom-2 left-1/2 z-[2] flex -translate-x-1/2 gap-1">
                      <button
                        v-for="(_, i) in roof.imagenes"
                        :key="i"
                        :aria-label="`Foto ${i + 1}`"
                        :class="['h-1.5 w-1.5 rounded-full transition-colors', (galleryIndex[roof.id] || 0) === i ? 'bg-white' : 'bg-white/40']"
                        @click.stop="galleryIndex[roof.id] = i"
                      />
                    </div>
                  </template>
                  <!-- Credit (foto actual) -->
                  <div
                    class="absolute bottom-0 left-0 right-0 z-[1] bg-gradient-to-t from-black/70 to-transparent px-3 pb-1.5 pt-6 text-[9px] text-white/90"
                  >
                    <a
                      :href="roof.imagenes[galleryIndex[roof.id] || 0].sourceUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="hover:underline"
                      @click.stop
                    >
                      © {{ roof.imagenes[galleryIndex[roof.id] || 0].credit }} ·
                      {{ roof.imagenes[galleryIndex[roof.id] || 0].license }}
                    </a>
                  </div>
                </template>
                <NuxtImg
                  v-else
                  :src="roofImageSrc(roof)"
                  :alt="roof.nombre"
                  class="h-full w-full object-cover"
                  loading="lazy"
                  sizes="xs:380px sm:400px md:380px lg:380px"
                  format="webp"
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

                <!-- Verificación visual: Street View + Earth + Maps (sin pesar el servidor) -->
                <div
                  v-if="roof.lat && roof.lng"
                  class="mt-3 flex flex-wrap items-center gap-1.5 border-t border-gray-50 pt-3"
                  @click.stop
                >
                  <span class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                    Ver:
                  </span>
                  <a
                    :href="`https://www.google.com/maps?q=&layer=c&cbll=${roof.lat},${roof.lng}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 rounded-md bg-secondary/10 px-2 py-0.5 text-[10px] font-semibold text-secondary-dark transition-colors hover:bg-secondary hover:text-white"
                    @click.stop
                  >
                    Street View
                  </a>
                  <a
                    :href="`https://earth.google.com/web/@${roof.lat},${roof.lng},150a,500d,30y,0h,60t,0r`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 rounded-md bg-eco/10 px-2 py-0.5 text-[10px] font-semibold text-eco-dark transition-colors hover:bg-eco hover:text-white"
                    @click.stop
                  >
                    Earth
                  </a>
                  <a
                    :href="`https://www.google.com/maps/place/${roof.lat},${roof.lng}/@${roof.lat},${roof.lng},19z`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                    @click.stop
                  >
                    Maps
                  </a>
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
              <NuxtImg
                :src="roofImageSrc(selectedRoof)"
                :alt="selectedRoof.nombre"
                class="h-full w-full object-cover"
                sizes="xs:400px sm:600px md:600px lg:600px"
                format="webp"
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
const sortBy = ref('nombre_asc')
const currentPage = ref(1)
const perPage = 15

// Estado del carrusel: índice activo por roof.id (no reactivo profundo —
// usamos un reactive shallow record para mutación sin clonar todo el objeto)
const galleryIndex = reactive<Record<number, number>>({})
function nextImage(id: number, total: number) {
  galleryIndex[id] = ((galleryIndex[id] || 0) + 1) % total
}
function prevImage(id: number, total: number) {
  galleryIndex[id] = ((galleryIndex[id] || 0) - 1 + total) % total
}

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

const sortedRoofs = computed(() => {
  const arr = [...filteredRoofs.value]
  switch (sortBy.value) {
    case 'nombre_asc': return arr.sort((a, b) => a.nombre.localeCompare(b.nombre))
    case 'nombre_desc': return arr.sort((a, b) => b.nombre.localeCompare(a.nombre))
    case 'superficie_desc': return arr.sort((a, b) => (b.superficie || 0) - (a.superficie || 0))
    case 'superficie_asc': return arr.sort((a, b) => (a.superficie || 0) - (b.superficie || 0))
    case 'alcaldia_asc': return arr.sort((a, b) => a.alcaldia.localeCompare(b.alcaldia))
    case 'fecha_desc': return arr.sort((a, b) => (b.fechaRegistro || '').localeCompare(a.fechaRegistro || ''))
    case 'fecha_asc': return arr.sort((a, b) => (a.fechaRegistro || '').localeCompare(b.fechaRegistro || ''))
    default: return arr
  }
})

const totalPages = computed(() => Math.ceil(sortedRoofs.value.length / perPage) || 1)
const paginatedRoofs = computed(() => sortedRoofs.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage))

watch([searchQuery, filterAlcaldia, filterTipoEdificio, filterTipoTecho, filterEstado, sortBy], () => { currentPage.value = 1 })

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

/* ════════════════════════════════════════════════════════════════════
   Gallery carrusel — botones prev/next visibles sólo en hover
   ════════════════════════════════════════════════════════════════════ */
.gallery-nav {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.55);
  color: #ffffff;
  transform: translateY(-50%);
  opacity: 0;
  backdrop-filter: blur(4px);
  transition: opacity 0.25s ease, background-color 0.2s ease;
  cursor: pointer;
}
.gallery-nav--prev {
  left: 0.4rem;
}
.gallery-nav--next {
  right: 0.4rem;
}
.gallery-nav:hover {
  background: rgba(0, 0, 0, 0.8);
}
/* Mostrar al pasar el cursor sobre la card padre */
.card-interactive:hover .gallery-nav {
  opacity: 1;
}
/* En mobile (touch) siempre visibles */
@media (max-width: 768px) {
  .gallery-nav {
    opacity: 0.9;
  }
}
</style>
