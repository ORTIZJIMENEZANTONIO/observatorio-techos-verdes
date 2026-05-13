<script setup lang="ts">
useHead({
  title: 'Documentos de investigación — Observatorio de Techos Verdes CDMX',
  meta: [
    {
      name: 'description',
      content:
        'Tesis, capítulos, informes y normativa que sustentan al Observatorio de Techos Verdes CDMX. Documentos descargables del programa CIIEMAD-IPN bajo licencia académica.',
    },
  ],
})

const cms = useCmsContent('investigacion')
const { funPaths, funStyle } = useFunPalette()

interface DocItem {
  tipo: string
  titulo: string
  autores?: string
  anio?: string
  venue?: string
  descripcion?: string
  href: string
  tamano?: string
  extension: 'pdf' | 'docx' | 'external'
  destacada?: boolean
}

// Mapeo tipo → icono fun-palette + color único.
// Da identidad visual a cada documento sin saturar (icono protagonista
// + color de borde y banda).
const docVisual: Record<string, { icono: string; color: string }> = {
  'Artículo Q1 · destacada': { icono: 'book', color: 'primary' },
  'Artículo internacional':  { icono: 'satellite', color: 'teal' },
  'Tesis doctoral':          { icono: 'shield', color: 'eco' },
  'Tesis de maestría':       { icono: 'shield', color: 'secondary' },
  'Capítulo de libro':       { icono: 'book', color: 'violet' },
  'Capítulo académico':      { icono: 'book', color: 'indigo' },
  'Informe parcial':         { icono: 'flag', color: 'accent' },
  'Reporte final':           { icono: 'flag', color: 'rose' },
  'Normativa':               { icono: 'scale', color: 'alert' },
}
const visualFor = (tipo: string) => docVisual[tipo] || { icono: 'book', color: 'primary' }

// Default: arranca con los 8 documentos físicos en /public/docs + el Drive link
// (que el equipo CIIEMAD comparte). Editable desde /admin/contenido/investigacion → documentos.
const defaultDocs: DocItem[] = [
  {
    tipo: 'Artículo Q1 · destacada',
    titulo: 'Spatial suitability analysis for the implementation of green rooftops in highly urbanized Mexico City',
    autores: 'Cervantes-Nájera, A. L., Martínez Rodríguez, M. C., et al.',
    anio: '2025',
    venue: 'Sustainable Cities and Society — Elsevier (Q1)',
    descripcion: 'Análisis multicriterio espacial (AHP, 8 variables). Identifica 428 km² prioritarios y 514,000 m² de potencial real. Sustento metodológico del observatorio.',
    href: 'https://drive.google.com/file/d/1bBhh7Kz7eVNZ61sval7C2Zdwym5pO6PX/view',
    extension: 'external',
    destacada: true,
  },
  {
    tipo: 'Tesis doctoral',
    titulo: 'Techos verdes una solución sustentable para la adaptación al cambio climático en la Ciudad de México',
    autores: 'Cervantes Nájera, A. L. — Directora: Dra. María Concepción Martínez Rodríguez',
    anio: '2025',
    venue: 'CIIEMAD-IPN',
    descripcion: 'Marco de economía circular + soluciones basadas en la naturaleza. Defensa doctoral noviembre 2025.',
    href: '/docs/tesis-doctoral-cervantes-najera-2025.pdf',
    tamano: '5.4 MB',
    extension: 'pdf',
  },
  {
    tipo: 'Tesis de maestría',
    titulo: 'Diseño, aplicación y evaluación de un techo verde ligero extensivo como estrategia para la adaptación al cambio climático en la alcaldía Gustavo A. Madero',
    autores: 'Cervantes Nájera, A. L.',
    anio: '2021',
    venue: 'CIIEMAD-IPN',
    descripcion: 'Diseño, construcción y monitoreo del TVLE experimental de 6 m². −3.5 °C, 19.5 L/m²·año, 100 % de sobrevivencia vegetal.',
    href: '/docs/tesis-maestria-cervantes-najera-2021.pdf',
    tamano: '6.6 MB',
    extension: 'pdf',
  },
  {
    tipo: 'Capítulo de libro',
    titulo: 'Techos verdes en las áreas urbanas y su relación con la Agenda 2030',
    autores: 'Martínez Rodríguez, M. C. & Cervantes-Nájera, A. L.',
    anio: '2023',
    venue: 'Repensar la Agenda 2030: Tendencias de sostenibilidad, cap. XIII',
    descripcion: 'Mapeo de servicios ecosistémicos vs los 17 ODS. DOI 10.52501/cc.064.13.',
    href: '/docs/capitulo-2023-agenda-2030-cervantes-najera.pdf',
    tamano: '2.1 MB',
    extension: 'pdf',
  },
  {
    tipo: 'Capítulo académico',
    titulo: 'Capítulo CIIEMAD 2021',
    autores: 'Cervantes-Nájera, A. L.',
    anio: '2021',
    venue: 'CIIEMAD-IPN',
    descripcion: 'Antecedente teórico de la línea de investigación en techos verdes ligeros extensivos.',
    href: '/docs/capitulo-2021-cervantes-najera.pdf',
    tamano: '741 KB',
    extension: 'pdf',
  },
  {
    tipo: 'Informe parcial',
    titulo: 'Informe parcial CIIEMAD — Observatorio',
    autores: 'Cervantes Nájera, A. L.',
    anio: '2024',
    venue: 'CIIEMAD-IPN',
    descripcion: 'Reporte intermedio del proyecto de observatorio: avance metodológico, datos preliminares y siguiente fase.',
    href: '/docs/informe-parcial-ciiemad-cervantes-najera-2024.docx',
    tamano: '6.8 MB',
    extension: 'docx',
  },
  {
    tipo: 'Reporte final',
    titulo: 'Reporte final del observatorio (ALCN · LECV)',
    autores: 'Cervantes Nájera, A. L. & equipo LECV',
    anio: '2024',
    venue: 'CIIEMAD-IPN',
    descripcion: 'Entrega final del proyecto: arquitectura del observatorio, modelo AHP calibrado, inventario sembrado y métricas de impacto documentadas.',
    href: '/docs/reporte-final-observatorio-2024.docx',
    tamano: '11 MB',
    extension: 'docx',
  },
  {
    tipo: 'Artículo internacional',
    titulo: 'Roofpedia — Automatic mapping of green and solar roofs',
    autores: 'Wu, A. N. & Biljecki, F.',
    anio: '2021',
    venue: 'Landscape and Urban Planning, Elsevier (Q1) · DOI 10.1016/j.landurbplan.2021.104167',
    descripcion: 'State of the art en mapeo de techos verdes con redes convolucionales sobre OSM. Cubre 17 ciudades y >1M edificios.',
    href: '/docs/roofpedia-wu-biljecki-2021.pdf',
    tamano: '20 MB',
    extension: 'pdf',
  },
  {
    tipo: 'Normativa',
    titulo: 'NADF-013-RNAT-2017 — Norma Ambiental para azoteas naturadas',
    autores: 'Secretaría del Medio Ambiente (SEDEMA), CDMX',
    anio: '2017',
    venue: 'Gaceta Oficial CDMX',
    descripcion: 'Especificaciones técnicas para el diseño, construcción y mantenimiento de azoteas naturadas en la Ciudad de México.',
    href: 'https://data.sedema.cdmx.gob.mx/sitios/conadf/documentos/NADF_013_RNAT_2017.pdf',
    extension: 'external',
  },
]

const docsCms = cms.list<DocItem>('documentos')
// El backend de cercu-backend puede tener un seed parcial (1-2 entries) que
// reemplazaría la lista completa curada en `defaultDocs`. Para evitar mostrar
// una lista incompleta al usuario, solo aceptamos el contenido del CMS si
// trae al menos la misma cantidad de entries que el inline. Si trae menos,
// caemos al inline. El editor que quiera curar la lista debe cargar al menos
// `defaultDocs.length` items para sobrescribir.
const docs = computed<DocItem[]>(() => {
  const fromCms = docsCms.value
  return fromCms.length >= defaultDocs.length ? fromCms : defaultDocs
})

const isExternal = (href: string) => /^https?:\/\//.test(href)

const totalLocal = computed(() => docs.value.filter(d => !isExternal(d.href)).length)
const totalExternal = computed(() => docs.value.filter(d => isExternal(d.href)).length)
</script>

<template>
  <div>
    <CommonHeroSection compact>
      <div class="max-w-3xl">
        <span class="mb-4 inline-flex items-center gap-2 rounded-badge bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-eco-light backdrop-blur-sm">
          Documentos
        </span>
        <h1 class="text-3xl font-extrabold leading-tight text-white md:text-5xl">
          Biblioteca de la línea de investigación
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
          Tesis, capítulos, informes y normativa que sustentan al observatorio. Todos los documentos del programa CIIEMAD-IPN están disponibles para consulta académica.
        </p>
        <p class="mt-3 text-xs text-white/65">
          {{ totalLocal }} archivos descargables · {{ totalExternal }} enlaces externos
        </p>
      </div>
    </CommonHeroSection>

    <section class="bg-white py-10 md:py-14">
      <div class="container-wide space-y-4">
        <article
          v-for="doc in docs"
          :key="doc.titulo"
          class="doc-card rounded-card border bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover md:p-6"
          :class="doc.destacada ? 'border-primary/40 shadow-glow-primary' : 'border-gray-100'"
          :style="funStyle(visualFor(doc.tipo).color)"
        >
          <div class="flex flex-col gap-4 sm:flex-row sm:items-start">
            <!-- Icono protagonista (fun-card style mini) a la izquierda -->
            <div class="doc-card-icon-wrap" aria-hidden="true">
              <span class="doc-card-icon-halo" />
              <span class="doc-card-icon-bubble" />
              <svg
                class="doc-card-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path v-for="(d, i) in funPaths(visualFor(doc.tipo).icono)" :key="i" :d="d" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <span
                  class="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  :class="doc.destacada ? 'bg-primary text-white' : 'bg-primary-50 text-primary'"
                >
                  {{ doc.tipo }}
                </span>
                <span v-if="doc.anio" class="text-sm font-bold text-ink tabular-nums">{{ doc.anio }}</span>
              </div>
              <h2 class="mt-3 text-base font-bold leading-snug text-ink md:text-lg">
                {{ doc.titulo }}
              </h2>
              <p v-if="doc.autores" class="mt-1 text-sm text-ink-muted">{{ doc.autores }}</p>
              <p v-if="doc.venue" class="mt-0.5 text-xs italic text-slate-custom">{{ doc.venue }}</p>
              <p v-if="doc.descripcion" class="mt-3 text-sm leading-relaxed text-slate-custom">
                {{ doc.descripcion }}
              </p>
              <div class="mt-4 flex flex-wrap items-center gap-2">
            <!-- Descarga local -->
            <a
              v-if="!isExternal(doc.href)"
              :href="doc.href"
              :download="doc.href.split('/').pop()"
              class="btn-primary inline-flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Descargar {{ doc.extension.toUpperCase() }}
              <span v-if="doc.tamano" class="text-xs opacity-80">· {{ doc.tamano }}</span>
            </a>
            <!-- Link externo -->
            <a
              v-else
              :href="doc.href"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-outline inline-flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Abrir enlace
            </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="bg-surface py-10 md:py-14">
      <div class="container-narrow rounded-card border border-primary/10 bg-primary-50 p-6 md:p-8">
        <p class="text-[10px] font-semibold uppercase tracking-wider text-primary">Uso académico</p>
        <h2 class="mt-2 text-2xl font-bold text-ink">Cómo citar estos materiales</h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-custom">
          Todos los documentos son propiedad intelectual del CIIEMAD-IPN y sus respectivos autores. Si los usas en investigación, prensa o políticas públicas, te pedimos referenciarlos con los formatos disponibles en la página de citación.
        </p>
        <div class="mt-5 flex flex-wrap gap-3">
          <NuxtLink to="/investigacion/citar" class="btn-primary">Formatos APA y BibTeX</NuxtLink>
          <NuxtLink to="/investigacion" class="btn-outline">Volver al marco académico</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Icono protagonista para cada documento — sigue el patrón fun-card pero
   en versión "side icon" (a la izquierda en sm+, arriba en mobile). */
.doc-card {
  --doc-color: var(--fun-color, var(--c-primary, #0E5E3A));
  --doc-light: var(--fun-light, #ecfdf5);
  position: relative;
  overflow: hidden;
}
.doc-card::before {
  /* Banda lateral con color del documento (en sm+) o superior (mobile) */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--doc-color);
  opacity: 0.85;
}
@media (min-width: 640px) {
  .doc-card::before {
    top: 0;
    bottom: 0;
    right: auto;
    width: 3px;
    height: auto;
  }
}
.doc-card-icon-wrap {
  position: relative;
  flex-shrink: 0;
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.doc-card-icon-halo {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--doc-light) 0%, transparent 70%);
  opacity: 0.7;
  transition: opacity 0.4s ease;
}
.doc-card-icon-bubble {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--doc-light);
  border: 2px solid var(--doc-color);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.doc-card-icon-svg {
  position: relative;
  width: 2.25rem;
  height: 2.25rem;
  color: var(--doc-color);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 1;
}
.doc-card:hover .doc-card-icon-halo {
  opacity: 1;
}
.doc-card:hover .doc-card-icon-bubble {
  transform: scale(1.05);
}
.doc-card:hover .doc-card-icon-svg {
  transform: rotate(-4deg) scale(1.08);
}
@media (prefers-reduced-motion: reduce) {
  .doc-card-icon-halo,
  .doc-card-icon-bubble,
  .doc-card-icon-svg {
    transition: none;
  }
}
</style>
