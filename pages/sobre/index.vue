<template>
  <div class="bg-surface">
    <CommonHeroSection compact>
      <h1 class="text-3xl font-extrabold text-white md:text-4xl">Sobre el observatorio</h1>
      <p class="mt-2 text-base text-white/80">Un espacio abierto de datos, análisis y visualización de infraestructura verde en azoteas de la Ciudad de México</p>
    </CommonHeroSection>

    <!-- Propósito -->
    <section class="py-12 md:py-16">
      <div class="container-wide">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 class="text-2xl font-bold text-ink">Propósito</h3>
            <p class="mt-4 text-base leading-relaxed text-slate-custom">
              El Observatorio de Techos Verdes CDMX nace con el propósito de generar una plataforma integral para el monitoreo, análisis y priorización de techos verdes en la Ciudad de México. Ante los crecientes desafíos climáticos, la isla de calor urbano y la degradación de la calidad del aire, los techos verdes representan una solución de infraestructura basada en la naturaleza con múltiples beneficios ambientales.
            </p>
            <p class="mt-4 text-base leading-relaxed text-slate-custom">
              Esta plataforma busca consolidar información dispersa, hacerla accesible y comprensible para tomadores de decisiones, profesionales del sector y ciudadanía interesada en la sustentabilidad urbana.
            </p>
          </div>
          <div class="flex items-center justify-center">
            <div class="grid grid-cols-2 gap-4">
              <div class="kpi-card text-center">
                <p class="text-3xl font-bold text-primary">{{ greenRoofsCount }}</p>
                <p class="text-xs text-slate-custom">Techos registrados</p>
              </div>
              <div class="kpi-card text-center">
                <p class="text-3xl font-bold text-secondary">{{ candidatesCount }}</p>
                <p class="text-xs text-slate-custom">Candidatos</p>
              </div>
              <div class="kpi-card text-center">
                <p class="text-3xl font-bold text-eco">{{ variablesCount }}</p>
                <p class="text-xs text-slate-custom">Variables del modelo</p>
              </div>
              <div class="kpi-card text-center">
                <p class="text-3xl font-bold text-accent">{{ alcaldiasCount }}</p>
                <p class="text-xs text-slate-custom">Alcaldías</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Alcance -->
    <section class="bg-white py-12 md:py-16">
      <div class="container-wide">
        <h3 class="text-2xl font-bold text-ink">Alcance</h3>
        <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div class="panel">
            <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
            </div>
            <h4 class="text-base font-semibold text-ink">Territorial</h4>
            <p class="mt-2 text-sm leading-relaxed text-slate-custom">
              Cobertura de las 16 alcaldías de la Ciudad de México, con análisis a escala de manzana urbana y sitio candidato.
            </p>
          </div>
          <div class="panel">
            <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h4 class="text-base font-semibold text-ink">Basado en datos</h4>
            <p class="mt-2 text-sm leading-relaxed text-slate-custom">
              Análisis fundamentado en datos geoespaciales, sensores remotos y estadísticas oficiales. Modelo multicriterio con 8 variables ponderadas.
            </p>
          </div>
          <div class="panel">
            <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-eco/10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-eco" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </div>
            <h4 class="text-base font-semibold text-ink">Plataforma abierta</h4>
            <p class="mt-2 text-sm leading-relaxed text-slate-custom">
              Datos abiertos, código abierto y documentación pública. Diseñado para la consulta ciudadana, la investigación y la toma de decisiones.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Principios -->
    <section class="py-12 md:py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="Principios"
          subtitle="Los valores que guían el desarrollo y operación del observatorio."
          :centered="true"
        />
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="principle in principles"
            :key="principle.title"
            :to="principle.to"
            class="fun-card fun-card-link"
            :style="funStyle(principle.color)"
            :aria-label="`Más sobre ${principle.title}`"
          >
            <span class="fun-card-hint">{{ principle.hint }}</span>
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
                <path v-for="(d, i) in funPaths(principle.icono)" :key="i" :d="d" />
              </svg>
              <span class="fun-card-spark fun-card-spark--1" />
              <span class="fun-card-spark fun-card-spark--2" />
              <span class="fun-card-spark fun-card-spark--3" />
            </div>
            <h4 class="fun-card-label">{{ principle.title }}</h4>
            <p class="fun-card-desc">{{ principle.description }}</p>
            <span class="fun-card-cta">
              Ver más
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Investigación de respaldo: Caso CIIEMAD -->
    <section class="py-12 md:py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="Investigación de respaldo: CIIEMAD-IPN"
          subtitle="El Centro Interdisciplinario de Investigaciones y Estudios sobre Medio Ambiente y Desarrollo del IPN alberga el techo verde ligero extensivo de referencia."
          :centered="true"
          tag="Investigación"
        />
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div class="card overflow-hidden">
            <div class="relative h-52 overflow-hidden">
              <NuxtImg
                src="/images/tesis/tvle-ciiemad-foto.png"
                alt="Techo verde ligero extensivo instalado en el CIIEMAD-IPN con vegetación Sedum"
                class="h-full w-full object-cover"
                loading="lazy"
                sizes="xs:400px sm:380px md:380px lg:400px"
                format="webp"
              />
            </div>
            <div class="p-4">
              <h4 class="text-sm font-semibold text-ink">TVLE del CIIEMAD</h4>
              <p class="mt-1 text-xs leading-relaxed text-slate-custom">Techo verde ligero extensivo de 6 m² con capa drenante de paja y fibra de coco. Periodo de recuperación de inversión: 18 meses.</p>
            </div>
          </div>
          <div class="card overflow-hidden">
            <div class="relative h-52 overflow-hidden">
              <NuxtImg
                src="/images/tesis/ciiemad-cuadrantes.png"
                alt="Cuadrantes del techo verde del CIIEMAD con vegetación crecida después de un año de instalación"
                class="h-full w-full object-cover"
                loading="lazy"
                sizes="xs:400px sm:380px md:380px lg:400px"
                format="webp"
              />
            </div>
            <div class="p-4">
              <h4 class="text-sm font-semibold text-ink">Monitoreo de vegetación</h4>
              <p class="mt-1 text-xs leading-relaxed text-slate-custom">División en cuadrantes para el seguimiento científico de la tasa de sobrevivencia vegetal, que supera el 100% en todas las especies.</p>
            </div>
          </div>
          <div class="card overflow-hidden">
            <div class="relative h-52 overflow-hidden">
              <NuxtImg
                src="/images/tesis/ciiemad-vista-aerea.png"
                alt="Vista aérea del edificio del CIIEMAD-IPN mostrando la ubicación del techo verde"
                class="h-full w-full object-cover"
                loading="lazy"
                sizes="xs:400px sm:380px md:380px lg:400px"
                format="webp"
              />
            </div>
            <div class="p-4">
              <h4 class="text-sm font-semibold text-ink">Ubicación en GAM</h4>
              <p class="mt-1 text-xs leading-relaxed text-slate-custom">Alcaldía Gustavo A. Madero, zona con déficit de áreas verdes urbanas y alta densidad poblacional.</p>
            </div>
          </div>
        </div>
        <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div v-for="finding in ciiemadFindings" :key="finding.label" class="rounded-card bg-white p-4 shadow-card text-center">
            <span class="text-xl font-bold" :class="finding.color">{{ finding.value }}</span>
            <p class="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-custom">{{ finding.label }}</p>
          </div>
        </div>
        <p class="mt-4 text-center text-[10px] text-slate-custom">
          Datos de: Cervantes Nájera, A.L. (2021, 2025). Tesis de maestría y doctorado, CIIEMAD-IPN.
        </p>
      </div>
    </section>

    <!-- Enfoque -->
    <section class="bg-white py-12 md:py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="Enfoque"
          subtitle="Tres dimensiones complementarias orientan el análisis y las acciones del observatorio."
          :centered="true"
        />
        <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <article
            v-for="d in dimensiones"
            :key="d.titulo"
            class="fun-card"
            :style="funStyle(d.color)"
          >
            <span class="fun-card-hint">{{ d.titulo }}</span>
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
                <path v-for="(p, i) in funPaths(d.icono)" :key="i" :d="p" />
              </svg>
              <span class="fun-card-spark fun-card-spark--1" />
              <span class="fun-card-spark fun-card-spark--2" />
            </div>
            <p class="fun-card-desc">{{ d.descripcion }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Datos, SIG y percepción remota -->
    <section class="py-12 md:py-16">
      <div class="container-wide">
        <div class="overflow-hidden rounded-card bg-gradient-to-br from-primary-800 to-primary shadow-panel">
          <div class="p-8 lg:p-12">
            <span class="mb-3 inline-flex items-center gap-2 rounded-badge bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-eco-light backdrop-blur-sm">
              Tecnología
            </span>
            <h3 class="mt-4 text-2xl font-bold text-white">Datos, SIG y percepción remota</h3>
            <p class="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              El observatorio integra múltiples capas de tecnología — datos abiertos, sensores satelitales (Sentinel-2, Landsat 8/9) y análisis multicriterio AHP — para generar conocimiento accionable sobre la infraestructura verde de la CDMX.
            </p>
            <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div class="rounded-card bg-white/10 p-5 backdrop-blur-sm">
                <h4 class="text-sm font-semibold text-white">Datos abiertos</h4>
                <p class="mt-2 text-xs leading-relaxed text-white/60">
                  Toda la información del observatorio está disponible en formatos abiertos (CSV, GeoJSON) para consulta, descarga y reutilización. Compromiso con la transparencia y la rendición de cuentas.
                </p>
              </div>
              <div class="rounded-card bg-white/10 p-5 backdrop-blur-sm">
                <h4 class="text-sm font-semibold text-white">Sistemas de información geográfica</h4>
                <p class="mt-2 text-xs leading-relaxed text-white/60">
                  Análisis espacial con capas de temperatura superficial, NDVI, densidad poblacional, red vial y calidad del aire. Visualización interactiva para exploración de datos.
                </p>
              </div>
              <div class="rounded-card bg-white/10 p-5 backdrop-blur-sm">
                <h4 class="text-sm font-semibold text-white">Validación con expertos</h4>
                <p class="mt-2 text-xs leading-relaxed text-white/60">
                  Revisión manual con expertos del CIIEMAD-IPN siguiendo la metodología de Cervantes-Nájera. Validación de campo, fotografía aérea y observación territorial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sustento institucional y normativo -->
    <section class="bg-white py-12 md:py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="Sustento institucional y normativo"
          subtitle="Marco legal y programático que respalda la implementación de techos verdes en la Ciudad de México."
          :centered="true"
        />
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="norma in normativas"
            :key="norma.titulo"
            class="card p-5"
          >
            <div class="flex items-start gap-3">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                :style="{ backgroundColor: norma.color + '15' }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :style="{ color: norma.color }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-semibold text-ink leading-tight">{{ norma.titulo }}</p>
                <span class="mt-1 inline-block rounded-badge bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-ink-muted">{{ norma.tipo }}</span>
              </div>
            </div>
            <p class="mt-3 text-xs leading-relaxed text-slate-custom">{{ norma.descripcion }}</p>
          </div>
        </div>

        <div class="mt-8 rounded-card border border-eco/20 bg-eco/5 p-5">
          <div class="flex gap-3">
            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-eco/10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-eco" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-eco-dark">Incentivo fiscal vigente</h4>
              <p class="mt-1 text-sm leading-relaxed text-slate-custom">
                Los inmuebles que instalen azoteas verdes conforme a la NADF-013 pueden obtener un <strong class="text-ink">descuento del 10% en el impuesto predial</strong>, según lo establecido en el Código Fiscal de la Ciudad de México.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="bg-white py-12 md:py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="Línea del tiempo"
          subtitle="Hitos clave en el desarrollo del Observatorio de Techos Verdes CDMX."
          :centered="true"
        />
        <div class="relative mx-auto max-w-3xl">
          <!-- Vertical line -->
          <div class="absolute left-6 top-0 h-full w-0.5 bg-primary-100 md:left-1/2 md:-translate-x-1/2" />

          <div class="space-y-8">
            <div
              v-for="(event, index) in timeline"
              :key="event.date"
              :class="[
                'relative flex gap-6',
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
              ]"
            >
              <!-- Dot -->
              <div class="absolute left-6 top-2 z-10 -translate-x-1/2 md:left-1/2">
                <div class="flex h-4 w-4 items-center justify-center rounded-full bg-primary shadow-sm">
                  <div class="h-2 w-2 rounded-full bg-white" />
                </div>
              </div>

              <!-- Content -->
              <div :class="['ml-12 md:ml-0 md:w-1/2', index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12']">
                <div class="card p-4">
                  <span class="text-xs font-semibold text-primary">{{ event.date }}</span>
                  <h4 class="mt-1 text-sm font-semibold text-ink">{{ event.title }}</h4>
                  <p class="mt-1 text-xs leading-relaxed text-slate-custom">{{ event.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact / Institutional -->
    <section class="py-12 md:py-16">
      <div class="container-wide">
        <div class="overflow-hidden rounded-card bg-white shadow-panel">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="p-8 lg:p-12">
              <h3 class="text-2xl font-bold text-ink">Contacto e información institucional</h3>
              <p class="mt-4 text-base leading-relaxed text-slate-custom">
                El Observatorio de Techos Verdes CDMX es una iniciativa que busca contribuir al desarrollo de políticas públicas basadas en evidencia para la sustentabilidad urbana de la Ciudad de México.
              </p>
              <div class="mt-6 space-y-4">
                <div class="flex items-start gap-3">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-ink">Correo electrónico</p>
                    <p class="text-sm text-slate-custom">contacto@techosverdes.cdmx.gob.mx</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-ink">Ubicación</p>
                    <p class="text-sm text-slate-custom">Ciudad de México, México</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-ink">Institución</p>
                    <p class="text-sm text-slate-custom">Gobierno de la Ciudad de México</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center bg-gradient-to-br from-primary-50 to-eco/10 p-8 lg:p-12">
              <div class="text-center">
                <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-card">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z" />
                    <path d="M12.5 2C9.64 2 8 4.14 8 6.5c0 2.18 1.41 3.44 3.5 3.44.84 0 1.62-.25 2.28-.68" />
                    <path d="M17 8c-.74-1.83-2.53-3-4.5-3" />
                  </svg>
                </div>
                <h4 class="text-lg font-bold text-primary">Observatorio de Techos Verdes</h4>
                <p class="text-sm text-primary-light">Ciudad de México</p>
                <p class="mt-4 max-w-xs text-xs leading-relaxed text-slate-custom">
                  Plataforma abierta para la sustentabilidad urbana. Datos, análisis y visualización de infraestructura verde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { greenRoofs } from '~/data/mock-roofs'
import { candidateRoofs } from '~/data/mock-candidates'
import { aptitudPesos } from '~/data/aptitud-pesos'
import { ALCALDIAS } from '~/utils/constants'

const { funPaths, funStyle } = useFunPalette()

// CMS — secciones editables en /admin/contenido/sobre
type Dimension = { titulo: string; descripcion: string; icono?: string; color?: string }
type Finding = { value: string; label: string; color?: string }
type Principle = { title: string; description: string; hint?: string; icono?: string; color?: string; to?: string }
const cmsSobre = useCmsContent('sobre')
const dimensiones = cmsSobre.list<Dimension>('dimensiones')
const ciiemadFindings = cmsSobre.list<Finding>('findings')
const principles = cmsSobre.list<Principle>('principles')

useHead({
  title: 'Sobre el observatorio | Observatorio Techos Verdes CDMX',
  meta: [
    { name: 'description', content: 'Conoce el propósito, alcance y principios del Observatorio de Techos Verdes de la Ciudad de México.' },
  ],
})

const greenRoofsCount = greenRoofs.length
const candidatesCount = candidateRoofs.length
const variablesCount = aptitudPesos.length
const alcaldiasCount = ALCALDIAS.length

const normativas = [
  {
    titulo: 'Art. 88 BIS 5, Ley Ambiental de Protección a la Tierra CDMX',
    tipo: 'Ley local',
    descripcion: 'Establece la obligación de instalar azoteas verdes en edificaciones nuevas mayores a 2,500 m2 de construcción en la Ciudad de México.',
    color: '#0E5E3A',
  },
  {
    titulo: 'NADF-013-RNAT-2017',
    tipo: 'Norma ambiental',
    descripcion: 'Norma técnica que establece las especificaciones para la instalación de azoteas verdes. Requiere mínimo 70% de cobertura vegetal y define criterios de sustrato, impermeabilización y mantenimiento.',
    color: '#79C141',
  },
  {
    titulo: 'ELAC 2021-2050 (Eje 5: Revegetación)',
    tipo: 'Estrategia',
    descripcion: 'Estrategia Local de Acción Climática. El eje 5 prioriza la revegetación urbana incluyendo azoteas y muros verdes como infraestructura de adaptación climática.',
    color: '#18A5E3',
  },
  {
    titulo: 'PACCM 2021-2030',
    tipo: 'Programa',
    descripcion: 'Programa de Acción Climática de la Ciudad de México. Incluye metas específicas de incremento de superficie verde en azoteas como medida de mitigación de isla de calor urbano.',
    color: '#F2A81D',
  },
  {
    titulo: 'PERIVE',
    tipo: 'Programa',
    descripcion: 'Programa Estratégico de la Red de Infraestructura Verde. Establece lineamientos para la integración de azoteas, muros verdes y corredores ecológicos en la trama urbana.',
    color: '#6366F1',
  },
  {
    titulo: 'Código Fiscal CDMX - Descuento predial',
    tipo: 'Incentivo fiscal',
    descripcion: 'Reducción del 10% en el impuesto predial para inmuebles que instalen y mantengan azoteas naturadas conforme a la NADF-013-RNAT-2017.',
    color: '#0E5E3A',
  },
]

const timeline = [
  {
    date: 'Enero 2024',
    title: 'Inicio del proyecto',
    description: 'Definición del alcance, objetivos y metodología del observatorio. Revisión de literatura y selección de variables.',
  },
  {
    date: 'Marzo 2024',
    title: 'Recopilación de datos',
    description: 'Obtención de datos geoespaciales, imágenes satelitales y estadísticas de calidad del aire de fuentes oficiales.',
  },
  {
    date: 'Mayo 2024',
    title: 'Construcción del modelo',
    description: 'Desarrollo del índice de aptitud territorial con 8 variables ponderadas. Consulta con panel de expertos.',
  },
  {
    date: 'Julio 2024',
    title: 'Desarrollo de IA',
    description: 'Entrenamiento del modelo de visión por computadora para detección de techos verdes en imágenes aéreas.',
  },
  {
    date: 'Septiembre 2024',
    title: 'Levantamiento de inventario',
    description: 'Registro de 57 techos verdes existentes en la CDMX. Verificación de campo y digitalización de datos.',
  },
  {
    date: 'Noviembre 2024',
    title: 'Priorización de candidatos',
    description: 'Identificación y priorización de 60 sitios candidatos para intervención con techos verdes.',
  },
  {
    date: 'Enero 2025',
    title: 'Lanzamiento de la plataforma',
    description: 'Publicación del observatorio con mapa interactivo, inventario, candidatos priorizados y sistema de validación.',
  },
  {
    date: 'Marzo 2025',
    title: 'Datos abiertos',
    description: 'Publicación de todos los conjuntos de datos del observatorio en formatos abiertos (CSV, GeoJSON).',
  },
]
</script>
