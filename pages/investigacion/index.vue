<script setup lang="ts">
useHead({
  title: 'Investigación — Observatorio de Techos Verdes CDMX',
  meta: [
    {
      name: 'description',
      content:
        'Marco académico CIIEMAD-IPN, publicaciones, tesis y bibliografía sobre techos verdes ligeros extensivos para la Ciudad de México.',
    },
  ],
})

const cms = useCmsContent('investigacion')

interface HeroShape {
  eyebrow?: string
  title?: string
  subtitle?: string
}
interface MarcoShape {
  title?: string
  subtitle?: string
  tag?: string
  paragraph1?: string
  paragraph2?: string
  sede?: string
  sedeDesc?: string
  sedeDir?: string
}
interface EquipoShape {
  rol: string
  nombre: string
  afiliacion: string
}
interface PubShape {
  tipo: string
  titulo: string
  autores: string
  anio: string
  venue: string
  doi?: string
  resumen: string
  destacada?: boolean
}
interface MetoShape {
  title?: string
  subtitle?: string
  tag?: string
  paragraph1?: string
  paragraph2?: string
}
interface PesoShape {
  variable: string
  peso: string
}
interface DatoShape {
  nombre: string
  formato: string
  registros: string
  estado: string
  descripcion: string
  slug?: string
}

const hero = cms.one<HeroShape>('hero')
const marco = cms.one<MarcoShape>('marco')
const equipo = cms.list<EquipoShape>('equipo')
const publicaciones = cms.list<PubShape>('publicaciones')
const metodologia = cms.one<MetoShape>('metodologia')
const pesosAhp = cms.list<PesoShape>('pesosAhp')
const datos = cms.list<DatoShape>('datos')
</script>

<template>
  <div>
    <CommonHeroSection compact>
      <div class="max-w-3xl">
        <span class="mb-4 inline-flex items-center gap-2 rounded-badge bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-eco-light backdrop-blur-sm">
          {{ hero?.eyebrow || 'Investigación' }}
        </span>
        <h1 class="text-3xl font-extrabold leading-tight text-white md:text-5xl">
          {{ hero?.title || 'Marco académico del observatorio' }}
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
          {{ hero?.subtitle || 'Este observatorio se sostiene en la línea de investigación de techos verdes del CIIEMAD-IPN. Aquí están las publicaciones, la metodología y los datos de origen abierto.' }}
        </p>
        <div class="mt-6 flex flex-wrap gap-3 text-xs">
          <a href="#marco" class="rounded-full bg-white/10 px-3 py-1.5 font-medium text-white backdrop-blur-sm hover:bg-white/20">Marco CIIEMAD</a>
          <a href="#linea" class="rounded-full bg-white/10 px-3 py-1.5 font-medium text-white backdrop-blur-sm hover:bg-white/20">Línea de investigación</a>
          <a href="#publicaciones" class="rounded-full bg-white/10 px-3 py-1.5 font-medium text-white backdrop-blur-sm hover:bg-white/20">Publicaciones</a>
          <a href="#metodologia" class="rounded-full bg-white/10 px-3 py-1.5 font-medium text-white backdrop-blur-sm hover:bg-white/20">Metodología</a>
          <NuxtLink to="/investigacion/datos" class="rounded-full bg-white/10 px-3 py-1.5 font-medium text-white backdrop-blur-sm hover:bg-white/20">Datos abiertos</NuxtLink>
          <NuxtLink to="/investigacion/documentos" class="rounded-full bg-white/10 px-3 py-1.5 font-medium text-white backdrop-blur-sm hover:bg-white/20">Documentos</NuxtLink>
          <NuxtLink to="/investigacion/citar" class="rounded-full bg-white/10 px-3 py-1.5 font-medium text-white backdrop-blur-sm hover:bg-white/20">Citar</NuxtLink>
        </div>
      </div>
    </CommonHeroSection>

    <!-- 1. Marco institucional -->
    <section id="marco" class="bg-white py-12 md:py-16">
      <div class="container-wide">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <div class="overflow-hidden rounded-card bg-primary-50 p-6 md:p-8 shadow-card">
              <div class="flex flex-col items-center gap-6">
                <a href="https://www.ipn.mx/" target="_blank" rel="noopener noreferrer" class="block transition-transform hover:scale-105">
                  <NuxtImg
                    src="/images/logo-ipn.svg"
                    alt="Instituto Politécnico Nacional"
                    class="h-20 w-auto"
                    width="120"
                    height="80"
                    loading="lazy"
                  />
                </a>
                <a href="https://www.ciiemad.ipn.mx/" target="_blank" rel="noopener noreferrer" class="block transition-transform hover:scale-105">
                  <NuxtImg
                    src="/images/logo-ciiemad.png"
                    alt="CIIEMAD - IPN"
                    class="h-16 w-auto rounded-full bg-white p-2 shadow-card"
                    width="80"
                    height="80"
                    format="webp"
                    loading="lazy"
                  />
                </a>
              </div>
              <div class="mt-6 border-t border-primary/10 pt-6 text-center">
                <p class="text-sm font-bold text-primary">{{ marco?.sede || 'CIIEMAD-IPN' }}</p>
                <p class="mt-1 text-xs leading-relaxed text-slate-custom">
                  {{ marco?.sedeDesc || 'Centro Interdisciplinario de Investigaciones y Estudios sobre Medio Ambiente y Desarrollo' }}
                </p>
                <p class="mt-1 text-xs text-ink-muted">
                  {{ marco?.sedeDir || 'Unidad Profesional Adolfo López Mateos, Zacatenco, GAM, CDMX' }}
                </p>
              </div>
            </div>
          </div>
          <div class="lg:col-span-7">
            <CommonSectionTitle
              :title="marco?.title || 'Línea de investigación en techos verdes'"
              :subtitle="marco?.subtitle || 'Desde 2019, el CIIEMAD-IPN sostiene un programa continuo sobre techos verdes ligeros extensivos como estrategia de adaptación al cambio climático.'"
              :tag="marco?.tag || 'Sede académica'"
              :centered="false"
            />
            <p v-if="marco?.paragraph1" class="mt-3 text-base leading-relaxed text-slate-custom" v-html="marco.paragraph1" />
            <p v-if="marco?.paragraph2" class="mt-3 text-base leading-relaxed text-slate-custom" v-html="marco.paragraph2" />
            <div class="mt-6 space-y-3">
              <div
                v-for="(p, i) in equipo"
                :key="i"
                class="flex gap-4 rounded-lg border border-gray-100 bg-surface p-4"
              >
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {{ i + 1 }}
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">{{ p.rol }}</p>
                  <p class="mt-0.5 text-sm font-bold text-ink">{{ p.nombre }}</p>
                  <p class="mt-0.5 text-xs leading-relaxed text-slate-custom">{{ p.afiliacion }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 1.5. Diagrama: Línea de investigación (basado en boceto Cervantes 2026) -->
    <section id="linea" class="bg-white py-12">
      <div class="container-wide">
        <CommonSectionTitle
          title="Por qué existe esta línea de investigación"
          subtitle="El programa parte de una comparación concreta: el techo verde convencional importado de Europa genera más impacto ambiental que la realidad de la Ciudad de México permite. Por eso nace el TVLE, y desde ahí escalamos a inventario y modelo AHP."
          tag="Línea de investigación"
          :centered="false"
        />

        <!-- Comparación: convencional vs TVLE -->
        <div class="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <article class="rounded-card border border-alert/25 bg-alert/5 p-6">
            <p class="text-[10px] font-bold uppercase tracking-wider text-alert">Punto de partida</p>
            <h3 class="mt-2 text-lg font-bold text-ink">Techo verde convencional</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-custom">
              Sistemas importados con sustratos pesados, membranas plásticas y especies no adaptadas. Mayor huella de carbono, costos altos y dependencia de riego intensivo.
            </p>
            <ul class="mt-3 space-y-1 text-xs text-slate-custom">
              <li>· Sustrato pesado (250–750 kg/m²)</li>
              <li>· Membranas plásticas no biodegradables</li>
              <li>· Especies europeas con alto consumo de agua</li>
            </ul>
          </article>
          <article class="rounded-card border border-primary/30 bg-primary-50 p-6 shadow-glow-primary">
            <p class="text-[10px] font-bold uppercase tracking-wider text-primary">Propuesta CIIEMAD-IPN</p>
            <h3 class="mt-2 text-lg font-bold text-ink">Techo verde ligero extensivo (TVLE)</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-custom">
              Diseño adaptado a la realidad estructural, climática y económica de la CDMX. <strong class="text-ink">94.8 % menos huella de carbono</strong> y se paga en <strong class="text-ink">18 meses</strong>.
            </p>
            <ul class="mt-3 space-y-1 text-xs text-slate-custom">
              <li>· Sustrato ligero (60–150 kg/m²)</li>
              <li>· Drenante de paja + fibra de coco (biodegradable)</li>
              <li>· Especies tolerantes al altiplano mexicano</li>
            </ul>
          </article>
        </div>

        <!-- Timeline de la línea de investigación -->
        <div class="mt-12">
          <p class="text-[10px] font-bold uppercase tracking-wider text-primary">Trayectoria del programa</p>
          <ol class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <li class="rounded-card border border-gray-100 bg-white p-5 shadow-card relative">
              <span class="absolute -top-3 left-5 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-white tabular-nums">2019</span>
              <p class="mt-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted">¿Por qué?</p>
              <h4 class="mt-1 text-sm font-bold text-ink">Diagnóstico</h4>
              <p class="mt-2 text-xs leading-relaxed text-slate-custom">
                Pregunta inicial: ¿podemos adaptar el techo verde europeo a CDMX? Identificación del déficit de áreas verdes (75 % del territorio urbano sin acceso a 400 m).
              </p>
            </li>
            <li class="rounded-card border border-gray-100 bg-white p-5 shadow-card relative">
              <span class="absolute -top-3 left-5 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-white tabular-nums">2021</span>
              <p class="mt-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted">TVLE</p>
              <h4 class="mt-1 text-sm font-bold text-ink">Construcción experimental</h4>
              <p class="mt-2 text-xs leading-relaxed text-slate-custom">
                Tesis de maestría: diseño, instalación y monitoreo del TVLE de 6 m² en la azotea del CIIEMAD. 100 % de sobrevivencia vegetal, −3.5 °C.
              </p>
            </li>
            <li class="rounded-card border border-gray-100 bg-white p-5 shadow-card relative">
              <span class="absolute -top-3 left-5 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-white tabular-nums">2025</span>
              <p class="mt-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted">Inventario</p>
              <h4 class="mt-1 text-sm font-bold text-ink">Mapeo territorial</h4>
              <p class="mt-2 text-xs leading-relaxed text-slate-custom">
                57 techos verdes existentes georreferenciados en CDMX. Caracterización por tipo, superficie y alcaldía. Base del observatorio público.
              </p>
            </li>
            <li class="rounded-card border border-primary/40 bg-primary p-5 shadow-card text-white relative">
              <span class="absolute -top-3 left-5 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-primary tabular-nums">2025</span>
              <p class="mt-1 text-[10px] font-bold uppercase tracking-wider text-eco-light">Artículo Q1</p>
              <h4 class="mt-1 text-sm font-bold">Modelo AHP escalado</h4>
              <p class="mt-2 text-xs leading-relaxed text-white/85">
                Sustainable Cities and Society (Elsevier Q1). Identifica 428 km² prioritarios y 514,000 m² de potencial para techos verdes en toda la ciudad.
              </p>
            </li>
          </ol>
          <p class="mt-4 text-[11px] italic text-ink-muted">
            Tesis doctoral (2025) y publicación Q1 cierran el ciclo: del experimento a la escala metropolitana.
          </p>
        </div>
      </div>
    </section>

    <!-- 2. Publicaciones -->
    <section id="publicaciones" class="bg-surface py-12 md:py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="Publicaciones del programa"
          subtitle="Piezas académicas que sostienen la metodología, los datos y las conclusiones del observatorio."
          tag="Publicaciones"
          :centered="true"
        />
        <div class="mt-10 space-y-4">
          <article
            v-for="p in publicaciones"
            :key="p.titulo"
            class="rounded-card border bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
            :class="p.destacada ? 'border-primary/40 shadow-glow-primary' : 'border-gray-100'"
          >
            <div class="flex flex-wrap items-start justify-between gap-3">
              <span
                class="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                :class="p.destacada ? 'bg-primary text-white' : 'bg-primary-50 text-primary'"
              >
                {{ p.tipo }}{{ p.destacada ? ' · destacada' : '' }}
              </span>
              <span class="text-sm font-bold text-ink tabular-nums">{{ p.anio }}</span>
            </div>
            <h3 class="mt-3 text-base font-bold leading-snug text-ink md:text-lg">
              {{ p.titulo }}
            </h3>
            <p class="mt-2 text-sm text-ink-muted">{{ p.autores }}</p>
            <p class="mt-1 text-xs italic text-slate-custom">{{ p.venue }}</p>
            <p class="mt-3 text-sm leading-relaxed text-slate-custom">{{ p.resumen }}</p>
            <div v-if="p.doi" class="mt-3 flex flex-wrap gap-2">
              <a
                :href="`https://doi.org/${p.doi}`"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                DOI: {{ p.doi }}
              </a>
            </div>
          </article>
        </div>
        <p class="mt-8 text-center text-xs text-ink-muted">
          ¿Buscas todas las referencias? Revisa la
          <NuxtLink to="/referencias" class="font-semibold text-primary hover:underline">bibliografía completa (41 entradas)</NuxtLink>
          organizada por bloque temático.
        </p>
      </div>
    </section>

    <!-- 3. Metodología -->
    <section id="metodologia" class="bg-white py-12 md:py-16">
      <div class="container-wide">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-7">
            <CommonSectionTitle
              :title="metodologia?.title || 'Modelo AHP de 8 variables'"
              :subtitle="metodologia?.subtitle || 'El observatorio aplica un proceso analítico jerárquico para priorizar territorialmente las azoteas con mayor aptitud para recibir un techo verde.'"
              :tag="metodologia?.tag || 'Metodología'"
              :centered="false"
            />
            <p v-if="metodologia?.paragraph1" class="mt-3 text-base leading-relaxed text-slate-custom" v-html="metodologia.paragraph1" />
            <p v-if="metodologia?.paragraph2" class="mt-3 text-base leading-relaxed text-slate-custom" v-html="metodologia.paragraph2" />
            <div class="mt-6 flex flex-wrap gap-3">
              <NuxtLink to="/metodologia" class="btn-primary">Ver metodología completa</NuxtLink>
              <NuxtLink to="/aptitud" class="btn-outline">Aptitud por alcaldía</NuxtLink>
            </div>
          </div>
          <div class="lg:col-span-5">
            <div class="rounded-card border border-primary/10 bg-primary-50 p-6 shadow-card">
              <p class="text-[10px] font-semibold uppercase tracking-wider text-primary">Pesos AHP</p>
              <dl class="mt-3 space-y-2 text-sm">
                <div v-for="peso in pesosAhp" :key="peso.variable" class="flex justify-between">
                  <dt class="text-slate-custom">{{ peso.variable }}</dt>
                  <dd class="font-semibold text-ink tabular-nums">{{ peso.peso }}</dd>
                </div>
              </dl>
              <p class="mt-4 border-t border-primary/10 pt-3 text-[10px] text-ink-muted">
                Fuente: Cervantes-Nájera et al. (2025), Sustainable Cities and Society.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Datos abiertos (resumen + link a página dedicada) -->
    <section id="datos" class="bg-surface py-12 md:py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="Datos abiertos"
          subtitle="El observatorio publica sus datos para reuso académico bajo licencia CC BY 4.0."
          tag="Datos"
          :centered="true"
        />
        <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <article
            v-for="f in datos"
            :key="f.nombre"
            class="rounded-card border border-gray-100 bg-white p-5 shadow-card"
          >
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-sm font-bold text-ink">{{ f.nombre }}</h3>
              <span class="whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                :class="f.estado === 'Disponible' ? 'bg-eco/15 text-primary' : 'bg-accent/15 text-accent-dark'">
                {{ f.estado }}
              </span>
            </div>
            <p class="mt-2 text-xs leading-relaxed text-slate-custom">{{ f.descripcion }}</p>
            <div class="mt-3 flex flex-wrap gap-2 text-[10px]">
              <span class="rounded bg-primary-50 px-2 py-0.5 font-medium text-primary">{{ f.formato }}</span>
              <span class="rounded bg-gray-100 px-2 py-0.5 font-medium text-ink-muted">{{ f.registros }}</span>
            </div>
          </article>
        </div>
        <div class="mt-8 flex justify-center">
          <NuxtLink to="/investigacion/datos" class="btn-primary">
            Ir a descargas
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-1.5 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 5. Cómo citar (resumen + link a página dedicada) -->
    <section id="citar" class="bg-white py-12">
      <div class="container-narrow rounded-card border border-primary/10 bg-primary-50 p-6 md:p-8 text-center">
        <p class="text-[10px] font-semibold uppercase tracking-wider text-primary">Atribución</p>
        <h2 class="mt-2 text-2xl font-bold text-ink">¿Vas a citar este observatorio?</h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-custom">
          Tenemos formatos APA 7 y BibTeX listos para copiar, además de las referencias del paper Q1 y las tesis.
        </p>
        <NuxtLink to="/investigacion/citar" class="btn-primary mt-5">Cómo citar →</NuxtLink>
      </div>
    </section>
  </div>
</template>
