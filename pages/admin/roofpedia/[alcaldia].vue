<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

import {
  ROOFPEDIA_ALCALDIAS,
  estimarCostoAlcaldia,
  formatBytes,
  MAPBOX_FREE_TIER_TILES,
  MAPBOX_PRICING_USD_PER_1K,
  type CostEstimate,
} from '~/composables/useRoofpedia'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const slug = String(route.params.alcaldia)
const alcaldia = computed(() => ROOFPEDIA_ALCALDIAS.find((a) => a.slug === slug))

if (!alcaldia.value) {
  throw createError({ statusCode: 404, statusMessage: 'Alcaldía no encontrada' })
}

useHead({ title: () => `Roofpedia · ${alcaldia.value?.nombre} · Admin` })

// ─── Estimador de costo (para pendientes) ───
const estimate = ref<CostEstimate | null>(null)
const loadingEstimate = ref(false)
const estimateError = ref('')

async function runEstimate() {
  loadingEstimate.value = true
  estimateError.value = ''
  try {
    const r = await estimarCostoAlcaldia(alcaldia.value!.nombre)
    estimate.value = r
    toast.success(
      'Estimación lista',
      `${r.buildings.toLocaleString()} edificios · ~${r.tiles.toLocaleString()} tiles`,
    )
  } catch (e: any) {
    estimateError.value = e?.message || 'Error al consultar Overpass'
    toast.errorFrom(e, 'Error en estimación')
  } finally {
    loadingEstimate.value = false
  }
}

// Comando CLI generado dinámicamente
const cliCommand = computed(
  () =>
    `cd ../Roofpedia && python tools/scan_alcaldia.py ${alcaldia.value!.nombre.toLowerCase().replace(/[áéíóú]/g, (c) => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[c] || c)).replace(/\s+/g, '-')}`,
)

const copied = ref(false)
function copyCli() {
  if (typeof navigator === 'undefined' || !navigator.clipboard) return
  navigator.clipboard.writeText(cliCommand.value).then(() => {
    copied.value = true
    toast.success('Comando copiado', 'Pégalo en la terminal del repo Roofpedia')
    setTimeout(() => (copied.value = false), 2000)
  })
}
</script>

<template>
  <div v-if="alcaldia" class="space-y-5">
    <!-- Header -->
    <div>
      <button
        class="mb-2 inline-flex items-center gap-1 text-sm text-ink-muted hover:text-primary"
        @click="router.push('/admin/roofpedia')"
      >
        <Icon name="lucide:chevron-left" size="14" />
        Roofpedia
      </button>
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 class="text-2xl font-semibold text-ink">{{ alcaldia.nombre }}</h2>
          <p class="mt-1 text-sm text-ink-muted">
            Estado:
            <span v-if="alcaldia.analizada" class="font-semibold text-eco-dark">Analizada</span>
            <span v-else class="font-semibold text-ink-muted">Pendiente</span>
            <span v-if="alcaldia.fechaAnalisis" class="ml-2">· {{ alcaldia.fechaAnalisis }}</span>
            <span v-if="alcaldia.deteccionesCnn !== undefined" class="ml-2">
              · {{ alcaldia.deteccionesCnn }} detecciones CNN
            </span>
          </p>
        </div>
        <div class="flex gap-2">
          <a
            v-if="alcaldia.analizada"
            :href="`/roofpedia/${alcaldia.slug}/${alcaldia.nombre}_Green.geojson`"
            :download="`${alcaldia.nombre}_Green.geojson`"
            class="btn-outline btn-sm"
          >
            <Icon name="lucide:download" size="14" />
            Descargar GeoJSON
          </a>
          <a
            v-if="alcaldia.analizada"
            :href="`/roofpedia/${alcaldia.slug}/`"
            target="_blank"
            class="btn-outline btn-sm"
          >
            <Icon name="lucide:external-link" size="14" />
            Abrir en pestaña nueva
          </a>
        </div>
      </div>
    </div>

    <!-- VISOR EMBED para analizadas -->
    <section v-if="alcaldia.analizada" class="rounded-card border border-gray-200 bg-white overflow-hidden">
      <div class="border-b border-gray-100 px-4 py-2.5 text-xs text-ink-muted">
        Visor de inspección (iframe self-contained · estado de validación se guarda en localStorage del iframe)
      </div>
      <iframe
        :src="`/roofpedia/${alcaldia.slug}/`"
        class="block h-[80vh] w-full"
        :title="`Visor Roofpedia ${alcaldia.nombre}`"
        loading="lazy"
      />
    </section>

    <!-- ESTIMADOR para pendientes -->
    <section v-else class="space-y-4">
      <div class="rounded-card border border-accent/30 bg-accent/5 p-4">
        <div class="flex gap-3">
          <Icon name="lucide:alert-triangle" size="20" class="shrink-0 text-accent" />
          <div class="space-y-1 text-sm">
            <p class="font-semibold text-ink">Procesar esta alcaldía descarga tiles satelitales de pago</p>
            <p class="text-ink-muted">
              Antes de ejecutar el modelo, estima el costo. Mapbox cobra
              <strong>${{ MAPBOX_PRICING_USD_PER_1K }} USD / 1,000 tiles</strong>
              después del free-tier de {{ MAPBOX_FREE_TIER_TILES.toLocaleString() }} requests/mes. La ejecución
              local del modelo CNN no tiene costo monetario adicional, solo tiempo de cómputo.
            </p>
          </div>
        </div>
      </div>

      <div class="rounded-card border border-gray-200 bg-white p-5 space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 class="text-sm font-bold text-ink">Estimación de costo</h3>
            <p class="text-xs text-ink-muted">
              Consulta Overpass por edificios dentro del polígono de la alcaldía (no descarga tiles).
            </p>
          </div>
          <button
            class="btn-primary btn-sm"
            :disabled="loadingEstimate"
            @click="runEstimate"
          >
            <Icon :name="loadingEstimate ? 'lucide:loader-2' : 'lucide:calculator'" size="14" :class="loadingEstimate ? 'animate-spin-smooth' : ''" />
            {{ loadingEstimate ? 'Consultando Overpass…' : (estimate ? 'Volver a estimar' : 'Estimar costo') }}
          </button>
        </div>

        <p v-if="estimateError" class="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900">
          {{ estimateError }}
        </p>

        <div v-if="estimate" class="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div class="rounded-lg border border-gray-100 bg-surface p-3">
            <p class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Edificios</p>
            <p class="mt-1 text-xl font-bold text-ink tabular-nums">{{ estimate.buildings.toLocaleString() }}</p>
            <p class="text-[10px] text-ink-muted">vía Overpass OSM</p>
          </div>
          <div class="rounded-lg border border-gray-100 bg-surface p-3">
            <p class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Tiles z19</p>
            <p class="mt-1 text-xl font-bold text-ink tabular-nums">{{ estimate.tiles.toLocaleString() }}</p>
            <p class="text-[10px] text-ink-muted">{{ formatBytes(estimate.bytesAprox) }} aprox</p>
          </div>
          <div class="rounded-lg border p-3" :class="estimate.costoUsd > 0 ? 'border-accent/40 bg-accent/5' : 'border-eco/40 bg-eco/5'">
            <p class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Costo Mapbox</p>
            <p
              class="mt-1 text-xl font-bold tabular-nums"
              :class="estimate.costoUsd > 0 ? 'text-accent-dark' : 'text-eco-dark'"
            >
              ${{ estimate.costoUsd.toFixed(2) }} USD
            </p>
            <p class="text-[10px] text-ink-muted">post free-tier de 50k/mes</p>
          </div>
          <div class="rounded-lg border border-gray-100 bg-surface p-3">
            <p class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Tiempo CNN</p>
            <p class="mt-1 text-xl font-bold text-ink tabular-nums">~{{ estimate.tiempoMinutos.gpu }} min</p>
            <p class="text-[10px] text-ink-muted">GPU · ~{{ estimate.tiempoMinutos.cpu }} min en CPU</p>
          </div>
        </div>
      </div>

      <!-- Comando CLI -->
      <div class="rounded-card border border-gray-200 bg-white p-5 space-y-3">
        <div>
          <h3 class="text-sm font-bold text-ink">Ejecutar análisis (modo local)</h3>
          <p class="mt-1 text-xs text-ink-muted">
            La ejecución del modelo CNN requiere Python + PyTorch + el repo Roofpedia (ya clonado en
            <code class="rounded bg-gray-100 px-1 py-0.5">../Roofpedia</code>). Corre este comando en tu
            terminal local:
          </p>
        </div>
        <div class="flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 font-mono text-xs text-gray-100">
          <span class="text-eco">$</span>
          <span class="flex-1 overflow-x-auto whitespace-nowrap">{{ cliCommand }}</span>
          <button
            class="rounded bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider hover:bg-white/20"
            @click="copyCli"
          >
            {{ copied ? 'Copiado ✓' : 'Copiar' }}
          </button>
        </div>
        <details class="text-xs text-ink-muted">
          <summary class="cursor-pointer font-semibold text-ink hover:text-primary">¿Qué hace ese script?</summary>
          <ol class="ml-5 mt-2 list-decimal space-y-1">
            <li>Lee el polígono de la alcaldía desde <code>public/geojson/cdmx-alcaldias.geojson</code>.</li>
            <li>Query Overpass por edificios (lightweight, ~50 B/building).</li>
            <li>Calcula tiles z19 únicos que contienen al menos un edificio.</li>
            <li>Descarga los tiles Mapbox (resume-safe, cached en <code>tools/cache/</code>).</li>
            <li>Sintetiza footprints como cuadrados 30 m centrados en cada OSM center.</li>
            <li>Corre <code>predict()</code> con el checkpoint <code>green_demo.pth</code>.</li>
            <li>Intersecta máscaras con footprints → <code>results/04Results/{Alcaldia}_Green.geojson</code>.</li>
            <li>Genera la galería de inspección en <code>results/inspection/{Alcaldia}/</code>.</li>
          </ol>
        </details>
        <p class="text-xs text-ink-muted">
          Cuando termine, copia <code>results/inspection/{Alcaldia}/</code> a
          <code>public/roofpedia/{slug}/</code> de este repo y marca <code>analizada: true</code> en
          <code>composables/useRoofpedia.ts</code>.
        </p>
      </div>
    </section>
  </div>
</template>
