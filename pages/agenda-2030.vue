<script setup lang="ts">
import { useHead } from 'nuxt/app'

const { funPaths, funStyle } = useFunPalette()

useHead({
  title: 'Techos verdes y la Agenda 2030 - Observatorio de Techos Verdes CDMX',
  meta: [
    {
      name: 'description',
      content:
        'Cómo los techos verdes, como soluciones basadas en la naturaleza (SbN), contribuyen a 7 Objetivos de Desarrollo Sostenible y 17 metas de la Agenda 2030. Capítulo CIIEMAD-IPN, Martínez Rodríguez & Cervantes-Nájera (2023).',
    },
  ],
})

const { revealRef } = useScrollReveal({ stagger: true })

// CMS: todo el contenido editorial de la página (ODS, stats académicos,
// servicios ecosistémicos) es editable desde /admin/contenido/agenda-2030.
// Los defaults siguen inline para fallback offline.
interface OdsItem {
  num: number
  color: string
  titulo: string
  metas: string[]
  via: string
  rol: string
  cita: string
}
interface DatoItem {
  target?: number
  display?: string
  suffix?: string
  unidad: string
  detalle: string
  fuente: string
  href: string
}

// 7 ODS con los que el techo verde se vincula directamente
// Fuente: Martínez Rodríguez & Cervantes-Nájera (2023), Tabla 1
const odsDefault: OdsItem[] = [
  {
    num: 2,
    color: '#DDA63A',
    titulo: 'Hambre cero',
    metas: ['2.1 Acceso a alimentación nutricional', '2.3 Producción agrícola a pequeña escala', '2.4 Prácticas agrícolas sostenibles'],
    via: 'Agricultura urbana',
    rol: 'SA · SC',
    cita: 'En 2050, 2,000 millones de personas estarán en estado de inseguridad alimentaria (Naciones Unidas, 2016c). Los techos verdes complementan necesidades nutricionales por autoproducción (Azunre et al., 2019).',
  },
  {
    num: 3,
    color: '#4C9F38',
    titulo: 'Salud y bienestar',
    metas: ['3.4 Disminuir enfermedades no transmisibles', '3.9 Reducir muertes por contaminación'],
    via: 'Espacios verdes y reducción de partículas',
    rol: 'SC · SR',
    cita: '7 millones de muertes anuales por contaminación atmosférica; 4.2 millones por exposición a partículas finas (UN, 2016f). La vegetación retiene partículas contaminantes (Baik et al., 2012).',
  },
  {
    num: 6,
    color: '#26BDE2',
    titulo: 'Agua limpia y saneamiento',
    metas: ['6.3 Aumentar reciclaje y reúso del agua', '6.4 Empleo eficaz de los recursos hídricos', '6.a Tecnologías de captación y desalinización'],
    via: 'Captación pluvial y mitigación de inundaciones',
    rol: 'SA · SR',
    cita: 'El 40 % de los habitantes del planeta enfrentan problemas de agua (UN, 2016d). Los techos verdes captan agua de lluvia para autorriego y evitan inundaciones (Contreras-Bejarano & Villegas-González, 2019).',
  },
  {
    num: 7,
    color: '#FCC30B',
    titulo: 'Energía asequible y no contaminante',
    metas: ['7.3 Mejorar la eficiencia energética', '7.a Investigación e inversión en energías limpias'],
    via: 'Aislamiento térmico de edificios',
    rol: 'SR · SS',
    cita: 'El consumo energético urbano es responsable del 60 % de las emisiones de GEI (UN, 2016e). Los techos verdes generan ahorros por aislamiento térmico (Jaffal, Ouldboukhitine & Belarbi, 2012).',
  },
  {
    num: 11,
    color: '#FD9D24',
    titulo: 'Ciudades y comunidades sostenibles',
    metas: ['11.3 Urbanización inclusiva y sostenible', '11.6 Reducir el impacto ambiental, mejorar calidad del aire', '11.7 Acceso a zonas verdes y espacios públicos seguros'],
    via: 'Infraestructura verde urbana',
    rol: 'SR',
    cita: 'En 2050 se estima un crecimiento de 5,000 millones de habitantes en ciudades; éstas generan 75 % de las emisiones de carbono (Naciones Unidas, 2018). Los techos verdes son herramienta de sostenibilidad urbana (Langemeyer et al., 2020).',
  },
  {
    num: 13,
    color: '#3F7E44',
    titulo: 'Acción por el clima',
    metas: ['13.2 Integrar normas, políticas y planes nacionales'],
    via: 'Adaptación al cambio climático y reducción de isla de calor',
    rol: 'SR · SA · SS',
    cita: 'Al colocar vegetación en techos urbanos se reduce el efecto del albedo y se mitigan los efectos de la isla de calor (Sturiale & Scuderi, 2019).',
  },
  {
    num: 15,
    color: '#56C02B',
    titulo: 'Vida de ecosistemas terrestres',
    metas: ['15.5 Reducir la degradación y pérdida de biodiversidad'],
    via: 'Hábitat urbano para flora y fauna',
    rol: 'SR',
    cita: 'En los últimos 25 años el riesgo de extinción de especies de mamíferos, aves, anfibios y corales aumentó 10 % (UN, 2019b). Los techos verdes son hábitat incorporados a la infraestructura urbana (Brachet, Schiopu & Clergeau, 2020).',
  },
]

// Servicios ecosistémicos (MEA 2003) — editables desde /admin/contenido/agenda-2030
type Servicio = { sigla: string; nombre: string; descripcion: string; icono?: string; color?: string }
const cmsAgenda = useCmsContent('agenda-2030')
const servicios = cmsAgenda.list<Servicio>('servicios')

// ODS + datos académicos — ahora también CMS-backed
const odsCms = cmsAgenda.list<OdsItem>('ods')
const datosCms = cmsAgenda.list<DatoItem>('datos')

// Hechos clave del capítulo con su fuente y URL referenciable
const datosDefault: DatoItem[] = [
  {
    target: 7,
    suffix: '',
    unidad: 'ODS',
    detalle: 'directamente vinculados al techo verde',
    fuente: 'Martínez Rodríguez & Cervantes-Nájera, 2023',
    href: 'https://doi.org/10.52501/cc.064.13',
  },
  {
    target: 17,
    suffix: '',
    unidad: 'metas',
    detalle: 'de la Agenda 2030 atendidas',
    fuente: 'Tabla 1, capítulo XIII',
    href: 'https://doi.org/10.52501/cc.064.13',
  },
  {
    target: 142,
    suffix: '',
    unidad: 'proyectos',
    detalle: 'de techos verdes registrados a nivel mundial',
    fuente: 'NATURVATION, 2018',
    href: 'https://naturvation.eu/atlas',
  },
  {
    display: '75 %',
    unidad: '',
    detalle: 'de las emisiones de carbono provienen de ciudades',
    fuente: 'Naciones Unidas, 2018',
    href: 'https://unstats.un.org/sdgs/report/2019/goal-11/',
  },
  {
    display: '7 M',
    unidad: 'muertes/año',
    detalle: 'por contaminación atmosférica',
    fuente: 'United Nations, 2016f',
    href: 'https://unstats.un.org/sdgs/report/2019/goal-03/',
  },
  {
    display: '60 %',
    unidad: '',
    detalle: 'del consumo energético urbano genera GEI',
    fuente: 'United Nations, 2016e',
    href: 'https://www.un.org/sustainabledevelopment/es/energy/',
  },
]

// Computed que prefieren CMS si trae datos completos, si no usan defaults.
const ods = computed<OdsItem[]>(() => (odsCms.value.length >= odsDefault.length ? odsCms.value : odsDefault))
const datos = computed<DatoItem[]>(() => (datosCms.value.length >= datosDefault.length ? datosCms.value : datosDefault))

// Navegación: al hacer click en un chip-mini del hero, hacemos scroll suave
// hasta la card del ODS correspondiente y la resaltamos brevemente.
const highlightedOds = ref<number | null>(null)
function scrollToOds(num: number) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(`ods-${num}`)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  highlightedOds.value = num
  // Quita el highlight a los 1.6s (después de la animación pulse)
  setTimeout(() => {
    if (highlightedOds.value === num) highlightedOds.value = null
  }, 1600)
}

</script>

<template>
  <div>
    <CommonHeroSection compact>
      <div class="max-w-3xl">
        <span
          class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur"
        >
          <span class="live-dot" />
          ODS 13 · Acción por el clima
        </span>
        <h1 class="mt-4 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
          Techos verdes en las áreas urbanas y su relación con la Agenda 2030
        </h1>
        <p class="mt-3 max-w-2xl text-base text-white/80 md:text-lg">
          Las soluciones basadas en la naturaleza (SbN) responden a 7 Objetivos de Desarrollo
          Sostenible. Este observatorio toma como base el capítulo de Martínez Rodríguez y
          Cervantes-Nájera (CIIEMAD-IPN, 2023) y lo aterriza al territorio de la Ciudad de México.
        </p>
      </div>
    </CommonHeroSection>

    <div ref="revealRef" class="stagger-children container-wide section-padding space-y-20">
      <!-- 1. Cita académica destacada -->
      <section class="reveal">
        <article class="card overflow-hidden">
          <div class="grid grid-cols-1 gap-0 lg:grid-cols-3">
            <div class="bg-primary-50/60 p-8 lg:p-10">
              <span class="badge-primary">Capítulo XIII</span>
              <p class="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                Producción CIIEMAD-IPN, 2023
              </p>
              <h2 class="mt-2 text-xl font-bold leading-tight text-ink">
                Techos verdes en las áreas urbanas y su relación con la Agenda 2030
              </h2>
              <p class="mt-4 text-sm font-semibold text-ink">
                Dra. María Concepción Martínez Rodríguez
              </p>
              <p class="text-sm font-semibold text-ink">
                M. en C. Ana Laura Cervantes-Nájera
              </p>
              <p class="mt-2 text-xs italic text-slate-custom">
                Centro Interdisciplinario de Investigaciones y Estudios sobre Medio Ambiente y
                Desarrollo, Instituto Politécnico Nacional
              </p>
              <div class="mt-6 space-y-2 text-xs text-slate-custom">
                <p>
                  <strong class="text-ink">En:</strong> Rivera Acosta, P. y Neri Guzmán, J. C.
                  (Coords.). <em>Repensar la Agenda 2030: Tendencias de sostenibilidad</em>
                  (pp. 301–321). Comunicación Científica.
                </p>
                <p><strong class="text-ink">ISBN:</strong> 978-607-99946-4-8</p>
                <p>
                  <strong class="text-ink">DOI:</strong>
                  <a
                    href="https://doi.org/10.52501/cc.064.13"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary hover:underline"
                  >
                    10.52501/cc.064.13
                  </a>
                </p>
              </div>
            </div>
            <div class="lg:col-span-2 p-8 lg:p-10">
              <h3 class="text-lg font-bold text-ink">Argumento del capítulo</h3>
              <p class="mt-3 text-sm leading-relaxed text-slate-custom">
                Las ciudades enfrentan la disminución de espacios abiertos y naturales, los
                cuales aportan servicios ecosistémicos esenciales para sus habitantes. Las
                <strong>soluciones basadas en la naturaleza (SbN)</strong> aprovechan los
                ecosistemas en beneficio de la sociedad; los techos verdes son una de estas
                soluciones aplicadas para recuperar áreas verdes urbanas (AVU).
              </p>
              <p class="mt-3 text-sm leading-relaxed text-slate-custom">
                La revisión bibliográfica del periodo 2016-2021 (Scopus, software VOSviewer)
                identificó <strong>4 servicios ecosistémicos</strong> aportados por los techos
                verdes y <strong>7 beneficios</strong> que se vinculan a
                <strong>7 ODS y 17 metas</strong> de la Agenda 2030. Se concluye que el techo
                verde puede dar respuesta a los ODS en las dimensiones social, ambiental y
                económica de la sustentabilidad.
              </p>
              <div
                class="mt-6 rounded-xl border-l-4 border-primary bg-primary-50/40 p-4"
              >
                <p class="text-sm italic leading-relaxed text-ink">
                  &laquo;Los hallazgos de este trabajo permiten relacionar los techos verdes
                  como una SbN al contribuir a 17 metas diferentes de siete ODS […] los
                  tomadores de decisiones deben considerar aumentar la implementación de esta
                  tecnología de naturación.&raquo;
                </p>
                <p class="mt-2 text-xs text-ink-muted">
                  — Martínez Rodríguez & Cervantes-Nájera, 2023, p. 314.
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <!-- 2. KPIs del capítulo (clickeables a la fuente) -->
      <section class="reveal">
        <h2 class="text-2xl font-bold text-ink">Datos clave del capítulo</h2>
        <p class="mt-2 max-w-3xl text-sm text-slate-custom">
          Cifras citadas en el capítulo XIII que justifican la urgencia de naturar las
          azoteas urbanas. Cada tarjeta enlaza a su fuente original.
        </p>
        <div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          <CommonCountUpKPI
            v-for="(d, i) in datos"
            :key="i"
            :target="d.target"
            :suffix="d.suffix"
            :display="d.display"
            :unidad="d.unidad"
            :detalle="d.detalle"
            :fuente="d.fuente"
            :href="d.href"
          />
        </div>
      </section>

      <!-- 3. Servicios ecosistémicos (marco MEA) -->
      <section class="reveal">
        <div class="mb-6 flex items-center gap-3">
          <span class="badge-secondary">Marco MEA 2003</span>
          <h2 class="text-2xl font-bold text-ink">Cuatro servicios ecosistémicos</h2>
        </div>
        <p class="mb-6 max-w-3xl text-sm text-slate-custom">
          El capítulo clasifica los beneficios del techo verde según el marco del
          <em>Millennium Ecosystem Assessment</em> (2003): cuatro categorías de servicios que
          en conjunto soportan los 7 beneficios documentados.
        </p>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="s in servicios"
            :key="s.sigla"
            class="fun-card"
            :style="funStyle(s.color)"
          >
            <span class="fun-card-hint">{{ s.sigla }}</span>
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
                <path v-for="(d, i) in funPaths(s.icono)" :key="i" :d="d" />
              </svg>
              <span class="fun-card-spark fun-card-spark--1" />
              <span class="fun-card-spark fun-card-spark--2" />
            </div>
            <h3 class="fun-card-label">{{ s.nombre }}</h3>
            <p class="fun-card-desc">{{ s.descripcion }}</p>
          </article>
        </div>
      </section>

      <!-- 4. ODS conectados (corazón de la página) -->
      <section class="reveal scroll-mt-24">
        <!-- Banner divertido de entrada -->
        <div class="ods-hero-banner">
          <div class="ods-hero-blob ods-hero-blob--a" aria-hidden="true" />
          <div class="ods-hero-blob ods-hero-blob--b" aria-hidden="true" />
          <div class="ods-hero-blob ods-hero-blob--c" aria-hidden="true" />
          <div class="relative">
            <span class="ods-hero-eyebrow">
              <span class="live-dot" />
              Convergencia · Agenda 2030
            </span>
            <h2 class="ods-hero-title">
              Un solo techo verde,
              <span class="ods-hero-title-accent">7 metas globales</span>
            </h2>
            <p class="ods-hero-lead">
              Cada azotea naturada empuja simultáneamente <strong class="text-white">7 Objetivos
              de Desarrollo Sostenible</strong> de la ONU. Te contamos cuáles y cómo lo hace.
            </p>
            <div class="ods-hero-counter">
              <a
                v-for="o in ods"
                :key="`mini-${o.num}`"
                :href="`#ods-${o.num}`"
                class="ods-hero-counter-chip"
                :style="{ backgroundColor: o.color }"
                :aria-label="`Ir al ODS ${o.num}: ${o.titulo}`"
                :title="`ODS ${o.num} · ${o.titulo}`"
                @click.prevent="scrollToOds(o.num)"
              >
                {{ o.num }}
              </a>
            </div>
          </div>
        </div>

        <!-- Cards de ODS -->
        <div class="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <article
            v-for="o in ods"
            :key="o.num"
            :id="`ods-${o.num}`"
            class="ods-card"
            :class="{ 'ods-card-pulse': highlightedOds === o.num }"
            :style="{
              '--ods-color': o.color,
              '--ods-light': o.color + '18',
            }"
          >
            <div class="flex items-center gap-4">
              <div class="ods-card-number">
                {{ o.num }}
                <span class="ods-card-number-burst" aria-hidden="true" />
              </div>
              <div class="flex-1">
                <p class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                  ODS {{ o.num }}
                </p>
                <h3 class="text-lg font-bold leading-snug text-ink">{{ o.titulo }}</h3>
              </div>
              <span class="ods-card-sparkle" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.3 7H21l-5.7 4.5L18 21l-6-4-6 4 1.7-7.5L2 9h6.7L12 2z" />
                </svg>
              </span>
            </div>
            <div class="mt-4 flex flex-wrap items-center gap-2">
              <span class="badge-primary">{{ o.via }}</span>
              <span class="badge-secondary">{{ o.rol }}</span>
            </div>
            <p class="mt-4 text-xs font-bold uppercase tracking-wider" :style="{ color: o.color }">
              Cómo el techo verde aporta a este ODS
            </p>
            <ul class="mt-2 space-y-1.5">
              <li
                v-for="(m, i) in o.metas"
                :key="i"
                class="flex items-start gap-2 text-sm text-slate-custom"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mt-0.5 h-4 w-4 shrink-0"
                  :style="{ color: o.color }"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{{ m }}</span>
              </li>
            </ul>
            <p class="mt-4 border-t border-gray-100 pt-4 text-xs italic leading-relaxed text-ink-muted">
              "{{ o.cita }}"
            </p>
          </article>
        </div>
      </section>

      <!-- 5. Evidencia empírica — link al caso CIIEMAD consolidado en /aprende -->
      <section class="reveal">
        <div class="rounded-card border border-eco/30 bg-eco/5 p-6 md:p-8">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div class="flex-1">
              <span class="badge-eco">Evidencia empírica</span>
              <h2 class="mt-3 text-xl font-bold text-ink md:text-2xl">
                Conoce el techo verde del CIIEMAD-IPN
              </h2>
              <p class="mt-2 max-w-2xl text-sm leading-relaxed text-slate-custom">
                La instalación experimental en Zacatenco (CDMX) es la base empírica
                de las publicaciones de Cervantes-Nájera (2021, 2023, 2025). Operada bajo la
                dirección de la Dra. Martínez Rodríguez, valida que la naturación de azoteas
                es viable en el clima del altiplano central mexicano.
              </p>
            </div>
            <NuxtLink to="/aprende#caso-ciiemad" class="btn-primary shrink-0">
              Ver el caso completo
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-1.5 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- 6. Cómo se traduce a este observatorio -->
      <section class="reveal">
        <div class="mb-6 flex items-center gap-3">
          <span class="badge-accent">Aplicación territorial</span>
          <h2 class="text-2xl font-bold text-ink">Del marco internacional al territorio CDMX</h2>
        </div>
        <p class="mb-6 max-w-3xl text-sm text-slate-custom">
          Este observatorio aterriza el marco analítico del capítulo a la Ciudad de México:
          opera con datos abiertos oficiales, identifica candidatos por aptitud
          territorial (AHP, 8 variables) y evalúa pre-factibilidad estructural antes de
          recomendar intervenciones.
        </p>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article class="card p-6">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 class="mt-3 text-base font-bold text-ink">ODS 11 → mapa interactivo</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-custom">
              Cada techo y cada candidato del observatorio se geolocaliza en las 16 alcaldías,
              alimentando la meta 11.7 de acceso a espacios públicos seguros.
            </p>
            <NuxtLink
              to="/mapa"
              class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              Ver el mapa <span aria-hidden="true">→</span>
            </NuxtLink>
          </article>
          <article class="card p-6">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-eco/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-eco-dark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 class="mt-3 text-base font-bold text-ink">ODS 13 → indicadores climáticos</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-custom">
              Los dashboards del observatorio cuantifican reducción de temperatura, captura de
              CO₂ y ahorro térmico — las métricas que respaldan la meta 13.2.
            </p>
            <NuxtLink
              to="/indicadores"
              class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              Ver indicadores <span aria-hidden="true">→</span>
            </NuxtLink>
          </article>
          <article class="card p-6">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-accent-dark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </div>
            <h3 class="mt-3 text-base font-bold text-ink">ODS 15 → priorización</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-custom">
              La priorización por aptitud incorpora cobertura vegetal e índice biótico,
              alineándose con la meta 15.5 de reducir la pérdida de biodiversidad.
            </p>
            <NuxtLink
              to="/candidatos"
              class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              Ver candidatos <span aria-hidden="true">→</span>
            </NuxtLink>
          </article>
        </div>
      </section>

      <!-- 7. Cita de cierre + CTA -->
      <section class="reveal">
        <div
          class="overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-8 text-white md:p-12"
        >
          <div class="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
            <div class="md:col-span-2">
              <p class="text-xs font-semibold uppercase tracking-wider text-eco">
                ODS 17 · Alianzas
              </p>
              <h2 class="mt-2 text-2xl font-bold md:text-3xl">
                Una agenda compartida entre academia, gobierno y ciudadanía
              </h2>
              <p class="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                El capítulo concluye que las metas de los ODS deben aterrizarse a nivel local
                con la participación de todos los niveles de la sociedad. Este observatorio
                opera como puente entre la producción académica del CIIEMAD-IPN, los datos
                abiertos del Gobierno de la CDMX y la sociedad civil que los consulta.
              </p>
            </div>
            <div class="flex flex-col gap-3 md:items-end">
              <NuxtLink to="/referencias" class="btn-eco">
                Ver bibliografía completa
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </NuxtLink>
              <a
                href="https://doi.org/10.52501/cc.064.13"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-outline btn-sm bg-white/10 text-white hover:bg-white/20"
              >
                Capítulo en acceso abierto
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ════════════════════════════════════════════════════════════════════
   ODS Hero Banner — entrada divertida a la sección de 7 ODS
   ════════════════════════════════════════════════════════════════════ */
.ods-hero-banner {
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
  padding: 2rem 1.5rem;
  background: linear-gradient(
    135deg,
    #0e5e3a 0%,
    #1a7a4e 40%,
    #18a5e3 100%
  );
  color: #ffffff;
}
@media (min-width: 768px) {
  .ods-hero-banner {
    padding: 3rem 2.5rem;
  }
}
.ods-hero-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.4;
  pointer-events: none;
}
.ods-hero-blob--a {
  top: -60px;
  right: -40px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
}
.ods-hero-blob--b {
  bottom: -80px;
  left: -40px;
  width: 240px;
  height: 240px;
  background: radial-gradient(circle, #ec4899 0%, transparent 70%);
}
.ods-hero-blob--c {
  top: 40%;
  right: 30%;
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, #79c141 0%, transparent 70%);
}
.ods-hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.85rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #c5e8d4;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 9999px;
  backdrop-filter: blur(8px);
}
.ods-hero-title {
  margin-top: 1.1rem;
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: white;
}
.ods-hero-title-accent {
  background: linear-gradient(135deg, #fde047 0%, #79c141 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ods-hero-lead {
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  max-width: 38rem;
}
.ods-hero-counter {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.ods-hero-counter-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1rem;
  font-weight: 800;
  color: #ffffff;
  border-radius: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.3s ease;
  cursor: pointer;
  text-decoration: none;
}
.ods-hero-counter-chip:hover,
.ods-hero-counter-chip:focus-visible {
  transform: translate3d(0, -4px, 0) rotate(-4deg) scale(1.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  outline: none;
}
.ods-hero-counter-chip:focus-visible {
  outline: 3px solid white;
  outline-offset: 2px;
}
.ods-hero-counter-chip:active {
  transform: translate3d(0, -1px, 0) scale(0.95);
}

/* Highlight pulse al hacer click en un chip: la card target hace un pulse
   con el color del ODS para que el usuario sepa adónde llegó tras el scroll. */
.ods-card {
  /* offset para que scrollIntoView { block: 'center' } no quede tapado por
     el header sticky (h-16). El offset compensa visualmente. */
  scroll-margin-top: 5rem;
}
.ods-card-pulse {
  animation: odsPulse 1.4s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes odsPulse {
  0%   { box-shadow: 0 0 0 0 var(--ods-color, #0e5e3a), 0 1px 3px rgba(0, 0, 0, 0.06); }
  30%  { box-shadow: 0 0 0 14px rgba(255, 255, 255, 0), 0 8px 24px var(--ods-color, #0e5e3a); transform: scale(1.02); }
  100% { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06); transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .ods-card-pulse { animation: none; }
}

/* ════════════════════════════════════════════════════════════════════
   ODS Card — extras divertidos (burst en el número + sparkle esquina)
   ════════════════════════════════════════════════════════════════════ */
.ods-card-number {
  position: relative;
}
.ods-card-number-burst {
  position: absolute;
  inset: -6px;
  border-radius: inherit;
  border: 2px dashed var(--ods-color, currentColor);
  opacity: 0;
  transform: scale(1);
  transition: opacity 0.4s ease;
  animation: odsBurst 8s linear infinite;
  pointer-events: none;
}
.ods-card:hover .ods-card-number-burst {
  opacity: 0.6;
}
@keyframes odsBurst {
  to {
    transform: rotate(360deg);
  }
}
.ods-card-sparkle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  color: var(--ods-color, #0e5e3a);
  opacity: 0;
  transform: scale(0.6) rotate(-20deg);
  transition: opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.ods-card:hover .ods-card-sparkle {
  opacity: 1;
  transform: scale(1) rotate(0);
}

@media (prefers-reduced-motion: reduce) {
  .ods-card-number-burst,
  .ods-card-sparkle,
  .ods-hero-counter-chip {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}
</style>
