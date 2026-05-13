<script setup lang="ts">
import { greenRoofs } from '~/data/mock-roofs'
import { candidateRoofs } from '~/data/mock-candidates'
import { indicesBioticos } from '~/data/mock-indices-bioticos'
import { indicadoresHidricos } from '~/data/mock-indicadores-hidricos'

useHead({
  title: 'Datos abiertos — Observatorio de Techos Verdes CDMX',
  meta: [
    {
      name: 'description',
      content:
        'Descarga los datos del Observatorio de Techos Verdes CDMX (inventario, candidatos priorizados, indicadores por alcaldía) en formato CSV y JSON bajo licencia CC BY 4.0.',
    },
  ],
})

const cms = useCmsContent('investigacion')
const { funPaths, funStyle } = useFunPalette()

interface DatoShape {
  nombre: string
  formato: string
  registros: string
  estado: string
  descripcion: string
  slug?: string
}
const datosCms = cms.list<DatoShape>('datos')

// ── CSV generator (client-side) ──────────────────────────────────────────
const escapeCsv = (v: unknown): string => {
  if (v === null || v === undefined) return ''
  const s = String(v)
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

const toCsv = <T extends Record<string, unknown>>(rows: T[], columns: (keyof T)[]): string => {
  const header = columns.map((c) => escapeCsv(c)).join(',')
  const body = rows
    .map((r) => columns.map((c) => escapeCsv(r[c])).join(','))
    .join('\n')
  return `${header}\n${body}`
}

const downloadBlob = (content: string, filename: string, mime: string) => {
  if (typeof window === 'undefined') return
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ── Datasets ─────────────────────────────────────────────────────────────
const totalInventario = greenRoofs.length
const totalCandidatos = candidateRoofs.length
const totalIndicadores = Math.max(indicesBioticos.length, indicadoresHidricos.length)

const descargarInventarioCsv = () => {
  const cols = [
    'id',
    'nombre',
    'tipoEdificio',
    'tipoTechoVerde',
    'superficie',
    'alcaldia',
    'direccion',
    'lat',
    'lng',
    'estado',
    'fechaRegistro',
    'descripcion',
  ]
  const csv = toCsv(greenRoofs as unknown as Record<string, unknown>[], cols)
  downloadBlob(csv, 'observatorio-techos-verdes_inventario.csv', 'text/csv;charset=utf-8')
}

const descargarInventarioJson = () => {
  downloadBlob(
    JSON.stringify({ source: 'Observatorio Techos Verdes CDMX', license: 'CC BY 4.0', exportedAt: new Date().toISOString(), records: greenRoofs }, null, 2),
    'observatorio-techos-verdes_inventario.json',
    'application/json'
  )
}

const descargarCandidatosCsv = () => {
  const cols = [
    'id',
    'nombre',
    'tipoEdificio',
    'superficie',
    'alcaldia',
    'direccion',
    'lat',
    'lng',
    'scoreAptitud',
    'estatus',
  ]
  const csv = toCsv(candidateRoofs as unknown as Record<string, unknown>[], cols)
  downloadBlob(csv, 'observatorio-techos-verdes_candidatos.csv', 'text/csv;charset=utf-8')
}

const descargarCandidatosJson = () => {
  downloadBlob(
    JSON.stringify({ source: 'Observatorio Techos Verdes CDMX', license: 'CC BY 4.0', exportedAt: new Date().toISOString(), records: candidateRoofs }, null, 2),
    'observatorio-techos-verdes_candidatos.json',
    'application/json'
  )
}

const descargarIndicadoresCsv = () => {
  // Merge biotic + hídrico por alcaldía (campos lo que existan en ambos)
  const filas = indicesBioticos.map((b) => {
    const h = indicadoresHidricos.find((x) => x.alcaldia === b.alcaldia)
    return { ...b, ...(h ?? {}) }
  })
  const cols = Object.keys(filas[0] || { alcaldia: '' })
  const csv = toCsv(filas as unknown as Record<string, unknown>[], cols)
  downloadBlob(csv, 'observatorio-techos-verdes_indicadores-alcaldia.csv', 'text/csv;charset=utf-8')
}

// ── Diccionario de datos ─────────────────────────────────────────────────
const diccionario = [
  { variable: 'id', tipo: 'string', desc: 'Identificador único del registro.' },
  { variable: 'nombre', tipo: 'string', desc: 'Nombre del edificio o sitio.' },
  { variable: 'tipoEdificio', tipo: 'enum', desc: 'gobierno, oficinas, educativo, hospital, comercial, industrial, residencial, mercado, cultural.' },
  { variable: 'tipoTechoVerde', tipo: 'enum', desc: 'extensivo, semi_intensivo, intensivo.' },
  { variable: 'superficie', tipo: 'number (m²)', desc: 'Superficie reportada o estimada del techo verde.' },
  { variable: 'alcaldia', tipo: 'string', desc: 'Alcaldía de la CDMX.' },
  { variable: 'lat / lng', tipo: 'number (WGS84)', desc: 'Coordenadas geográficas.' },
  { variable: 'scoreAptitud', tipo: 'number (0–100)', desc: 'Índice AHP del modelo Cervantes-Nájera (2025).' },
  { variable: 'estatus', tipo: 'enum', desc: 'En candidatos: pendiente_validacion | aprobado | rechazado. En inventario: activo | inactivo.' },
  { variable: 'shannon / simpson', tipo: 'number', desc: 'Índices de biodiversidad alfa por alcaldía.' },
]
</script>

<template>
  <div>
    <CommonHeroSection compact>
      <div class="max-w-3xl">
        <span class="mb-4 inline-flex items-center gap-2 rounded-badge bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-eco-light backdrop-blur-sm">
          Datos abiertos
        </span>
        <h1 class="text-3xl font-extrabold leading-tight text-white md:text-5xl">
          Descarga los datos del observatorio
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
          Inventario, candidatos priorizados e indicadores por alcaldía en formato CSV y JSON. Bajo licencia <strong class="text-white">Creative Commons BY 4.0</strong>: úsalos en investigación, prensa o políticas públicas con atribución.
        </p>
      </div>
    </CommonHeroSection>

    <section class="bg-white py-10 md:py-14">
      <div class="container-wide space-y-6">
        <!-- Dataset 1: inventario -->
        <article class="dataset-card" :style="funStyle('eco')">
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div class="lg:col-span-8 flex flex-col gap-4 sm:flex-row sm:items-start">
              <div class="dataset-icon-wrap" aria-hidden="true">
                <span class="dataset-icon-halo" />
                <span class="dataset-icon-bubble" />
                <svg class="dataset-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path v-for="(d, i) in funPaths('leaf')" :key="i" :d="d" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="rounded-full bg-eco/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">Disponible</span>
                  <span class="rounded-full bg-primary-50 px-3 py-1 text-[10px] font-bold tabular-nums text-primary">{{ totalInventario }} registros</span>
                </div>
                <h2 class="mt-3 text-xl font-bold text-ink">Inventario de techos verdes</h2>
                <p class="mt-2 text-sm leading-relaxed text-slate-custom">
                  Catálogo georreferenciado de techos verdes documentados en la CDMX. Incluye nombre, tipo de edificio, tipología de techo, superficie estimada, alcaldía, coordenadas y año de instalación cuando se conoce.
                </p>
              </div>
            </div>
            <div class="lg:col-span-4 flex flex-col gap-2">
              <button class="btn-primary" @click="descargarInventarioCsv">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Descargar CSV
              </button>
              <button class="btn-outline" @click="descargarInventarioJson">
                Descargar JSON
              </button>
            </div>
          </div>
        </article>

        <!-- Dataset 2: candidatos -->
        <article class="dataset-card" :style="funStyle('secondary')">
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div class="lg:col-span-8 flex flex-col gap-4 sm:flex-row sm:items-start">
              <div class="dataset-icon-wrap" aria-hidden="true">
                <span class="dataset-icon-halo" />
                <span class="dataset-icon-bubble" />
                <svg class="dataset-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path v-for="(d, i) in funPaths('target')" :key="i" :d="d" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="rounded-full bg-eco/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">Disponible</span>
                  <span class="rounded-full bg-primary-50 px-3 py-1 text-[10px] font-bold tabular-nums text-primary">{{ totalCandidatos }} sitios</span>
                </div>
                <h2 class="mt-3 text-xl font-bold text-ink">Candidatos priorizados</h2>
                <p class="mt-2 text-sm leading-relaxed text-slate-custom">
                  Sitios identificados por el detector OSM + scoring AHP. Cada registro incluye el score de aptitud, tipo de edificio, superficie y atributos catastrales cuando se cuenta con dictamen estructural.
                </p>
              </div>
            </div>
            <div class="lg:col-span-4 flex flex-col gap-2">
              <button class="btn-primary" @click="descargarCandidatosCsv">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Descargar CSV
              </button>
              <button class="btn-outline" @click="descargarCandidatosJson">Descargar JSON</button>
            </div>
          </div>
        </article>

        <!-- Dataset 3: indicadores por alcaldía -->
        <article class="dataset-card" :style="funStyle('violet')">
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div class="lg:col-span-8 flex flex-col gap-4 sm:flex-row sm:items-start">
              <div class="dataset-icon-wrap" aria-hidden="true">
                <span class="dataset-icon-halo" />
                <span class="dataset-icon-bubble" />
                <svg class="dataset-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path v-for="(d, i) in funPaths('chart')" :key="i" :d="d" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="rounded-full bg-eco/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">Disponible</span>
                  <span class="rounded-full bg-primary-50 px-3 py-1 text-[10px] font-bold tabular-nums text-primary">{{ totalIndicadores }} alcaldías</span>
                </div>
                <h2 class="mt-3 text-xl font-bold text-ink">Indicadores por alcaldía</h2>
                <p class="mt-2 text-sm leading-relaxed text-slate-custom">
                  Combinación de índices bióticos (Shannon, Simpson, riqueza de especies) e hídricos (precipitación anual, captación potencial, escurrimiento superficial) agregados por las 16 alcaldías de la CDMX.
                </p>
              </div>
            </div>
            <div class="lg:col-span-4 flex flex-col gap-2">
              <button class="btn-primary" @click="descargarIndicadoresCsv">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Descargar CSV
              </button>
            </div>
          </div>
        </article>

        <!-- Catálogo CMS extra: cualquier dataset adicional editado desde admin -->
        <article
          v-for="extra in datosCms.filter((d: DatoShape) => !['inventario','candidatos','indicadores'].includes(d.slug || ''))"
          :key="extra.nombre"
          class="rounded-card border border-gray-100 bg-white p-6 shadow-card"
        >
          <div class="flex items-start justify-between gap-3">
            <h2 class="text-xl font-bold text-ink">{{ extra.nombre }}</h2>
            <span class="whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
              :class="extra.estado === 'Disponible' ? 'bg-eco/15 text-primary' : 'bg-accent/15 text-accent-dark'">
              {{ extra.estado }}
            </span>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-slate-custom">{{ extra.descripcion }}</p>
          <div class="mt-3 flex flex-wrap gap-2 text-[10px]">
            <span class="rounded bg-primary-50 px-2 py-0.5 font-medium text-primary">{{ extra.formato }}</span>
            <span class="rounded bg-gray-100 px-2 py-0.5 font-medium text-ink-muted">{{ extra.registros }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- Diccionario -->
    <section class="bg-surface py-10 md:py-14">
      <div class="container-wide">
        <CommonSectionTitle
          title="Diccionario de variables"
          subtitle="Definiciones de las columnas que aparecen en cada dataset descargable."
          tag="Documentación"
          :centered="false"
        />
        <div class="mt-6 -mx-4 overflow-x-auto rounded-none border-y border-gray-100 bg-white shadow-card sm:mx-0 sm:rounded-card sm:border">
          <table class="min-w-[480px] w-full text-sm">
            <thead class="bg-primary-50 text-xs font-bold uppercase tracking-wider text-primary">
              <tr>
                <th class="px-4 py-3 text-left">Variable</th>
                <th class="px-4 py-3 text-left">Tipo</th>
                <th class="px-4 py-3 text-left">Descripción</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="d in diccionario" :key="d.variable">
                <td class="whitespace-nowrap px-4 py-2 font-mono text-xs font-semibold text-ink">{{ d.variable }}</td>
                <td class="whitespace-nowrap px-4 py-2 text-xs text-slate-custom">{{ d.tipo }}</td>
                <td class="px-4 py-2 text-sm text-slate-custom">{{ d.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Licencia -->
    <section class="bg-white py-10 md:py-14">
      <div class="container-narrow rounded-card border border-primary/15 bg-primary-50 p-6 md:p-8">
        <p class="text-[10px] font-semibold uppercase tracking-wider text-primary">Licencia</p>
        <h2 class="mt-2 text-2xl font-bold text-ink">CC BY 4.0 — reusa con atribución</h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-custom">
          Los datos del Observatorio de Techos Verdes CDMX se publican bajo licencia
          <a href="https://creativecommons.org/licenses/by/4.0/deed.es" target="_blank" rel="noopener noreferrer" class="font-semibold text-primary hover:underline">Creative Commons Atribución 4.0 Internacional</a>.
          Puedes copiarlos, redistribuirlos, adaptarlos y usarlos con fines comerciales siempre que cites la fuente.
        </p>
        <div class="mt-5 flex flex-wrap gap-3">
          <NuxtLink to="/investigacion/citar" class="btn-primary">Cómo citar el observatorio</NuxtLink>
          <NuxtLink to="/investigacion" class="btn-outline">Volver al marco académico</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Dataset card con icono protagonista + borde lateral coloreado */
.dataset-card {
  --ds-color: var(--fun-color, var(--c-primary, #0E5E3A));
  --ds-light: var(--fun-light, #ecfdf5);
  position: relative;
  background: var(--c-surface, white);
  border: 1px solid var(--c-border-soft, #EEF1EC);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.dataset-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--ds-color);
  opacity: 0.85;
}
@media (min-width: 640px) {
  .dataset-card::before {
    top: 0;
    bottom: 0;
    right: auto;
    width: 4px;
    height: auto;
  }
}
.dataset-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -8px rgba(14, 94, 58, 0.12);
}
.dataset-icon-wrap {
  position: relative;
  flex-shrink: 0;
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dataset-icon-halo {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--ds-light) 0%, transparent 70%);
  opacity: 0.7;
}
.dataset-icon-bubble {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--ds-light);
  border: 2px solid var(--ds-color);
}
.dataset-icon-svg {
  position: relative;
  width: 2.25rem;
  height: 2.25rem;
  color: var(--ds-color);
  z-index: 1;
}
</style>
