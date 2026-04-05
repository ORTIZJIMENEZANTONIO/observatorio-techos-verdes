<template>
  <div>
    <!-- 1. Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary to-primary-light">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-eco" />
        <div class="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-secondary" />
      </div>
      <div class="container-wide relative py-20 md:py-26">
        <div class="max-w-3xl">
          <span class="mb-4 inline-flex items-center gap-2 rounded-badge bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-eco-light backdrop-blur-sm">
            <span class="h-1.5 w-1.5 rounded-full bg-eco animate-pulse-glow" style="animation: pulseGlow 2s ease-in-out infinite;" />
            Plataforma abierta
          </span>
          <h1 class="mt-4 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            Observatorio de<br>
            <span class="text-gradient-hero">Techos Verdes</span><br>
            CDMX
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
            Monitoreo, priorización y análisis de infraestructura verde en azoteas de la Ciudad de México. Datos abiertos, inteligencia artificial y análisis geoespacial.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink to="/mapa" class="btn-primary btn-lg !bg-eco hover:!bg-eco-light">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
              Explorar mapa
            </NuxtLink>
            <NuxtLink to="/metodologia" class="btn btn-lg border border-white/30 text-white hover:bg-white/10">
              Conocer metodología
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. KPI Grid -->
    <section ref="kpiSection" class="bg-white py-16">
      <div class="container-wide">
        <div class="stagger-children grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <div
            v-for="kpi in kpis"
            :key="kpi.label"
            class="kpi-card reveal"
          >
            <div class="flex items-center gap-2">
              <div
                :class="[
                  'flex h-8 w-8 items-center justify-center rounded-lg',
                  kpiIconBg(kpi.color),
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" :class="kpiIconColor(kpi.color)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z" />
                </svg>
              </div>
              <span v-if="kpi.cambio" class="text-[10px] font-medium text-eco">{{ kpi.cambio }}</span>
            </div>
            <p class="mt-2 text-2xl font-bold text-ink">{{ kpi.valor }}</p>
            <p class="text-xs text-slate-custom">{{ kpi.label }}</p>
            <p v-if="kpi.unidad" class="text-[10px] text-ink-muted">{{ kpi.unidad }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Qué es el observatorio -->
    <section ref="aboutSection" class="bg-surface py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="Qué es el Observatorio"
          subtitle="Una plataforma integral para el monitoreo, análisis y priorización de techos verdes en la Ciudad de México."
          :centered="true"
          tag="Acerca de"
        />
        <div class="stagger-children grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="card-interactive p-6 reveal"
          >
            <div :class="['mb-4 flex h-12 w-12 items-center justify-center rounded-xl', feature.bg]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="feature.iconColor" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path v-for="(d, i) in feature.paths" :key="i" :d="d" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-ink">{{ feature.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-custom">{{ feature.description }}</p>
            <NuxtLink :to="feature.to" class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-light">
              Explorar
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Cómo funciona -->
    <section ref="stepsSection" class="bg-white py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="Cómo funciona"
          subtitle="Un flujo de trabajo que integra datos geoespaciales, análisis multicriterio e inteligencia artificial."
          :centered="true"
          tag="Proceso"
        />
        <div class="relative">
          <!-- Connection line -->
          <div class="absolute left-1/2 top-12 hidden h-0.5 w-3/4 -translate-x-1/2 bg-gradient-to-r from-primary via-secondary to-eco lg:block" />
          <div class="stagger-children grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="(step, index) in steps"
              :key="step.title"
              class="relative text-center reveal"
            >
              <div class="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                <span class="text-xl font-bold">{{ index + 1 }}</span>
              </div>
              <h4 class="text-base font-semibold text-ink">{{ step.title }}</h4>
              <p class="mt-2 text-sm leading-relaxed text-slate-custom">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Map Teaser -->
    <section ref="mapSection" class="bg-surface py-16">
      <div class="container-wide">
        <div class="overflow-hidden rounded-card bg-white shadow-panel reveal-scale">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="flex flex-col justify-center p-8 lg:p-12">
              <span class="mb-3 inline-flex w-fit items-center rounded-badge bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
                Mapa interactivo
              </span>
              <h2 class="text-2xl font-bold text-ink md:text-3xl">Explora los techos verdes de la CDMX</h2>
              <p class="mt-4 text-base leading-relaxed text-slate-custom">
                Visualiza la distribución de techos verdes existentes, sitios candidatos priorizados y el índice de aptitud territorial en un mapa interactivo con múltiples capas de información.
              </p>
              <ul class="mt-6 space-y-3">
                <li v-for="item in mapFeatures" :key="item" class="flex items-center gap-3 text-sm text-ink">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {{ item }}
                </li>
              </ul>
              <NuxtLink to="/mapa" class="btn-primary mt-8 w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
                Abrir mapa interactivo
              </NuxtLink>
            </div>
            <div class="relative min-h-[300px] overflow-hidden lg:min-h-[400px]">
              <img
                src="/images/tesis/mapa-inventario-cdmx.png"
                alt="Mapa inventario de techos verdes en la Ciudad de México, elaborado a partir de investigación de campo y datos georreferenciados"
                class="absolute inset-0 h-full w-full object-cover"
              />
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p class="text-xs text-white/90">Inventario georreferenciado de techos verdes en la CDMX</p>
                <p class="text-[10px] text-white/60">Fuente: Cervantes Nájera (2025), CIIEMAD-IPN</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Qué es un techo verde -->
    <section ref="queEsSection" class="bg-white py-16">
      <div class="container-wide">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div class="reveal-left">
            <CommonSectionTitle
              title="Qué es un techo verde"
              subtitle="Un sistema de capas que incorpora vegetación en la parte superior de edificaciones, aportando múltiples beneficios ambientales."
              tag="Fundamento"
            />
            <p class="text-sm leading-relaxed text-slate-custom">
              Un techo verde es un sistema constructivo que integra vegetación viva sobre las cubiertas de los edificios. Se compone de múltiples capas: impermeabilizante, barrera anti-raíz, capa drenante, sustrato y la capa de vegetación. Los techos verdes extensivos, como el TVLE desarrollado en el CIIEMAD-IPN, utilizan materiales orgánicos residuales (paja y fibra de coco) en su capa drenante, reduciendo costos y huella de carbono.
            </p>
            <div class="mt-6 grid grid-cols-2 gap-3">
              <div class="rounded-lg bg-primary-50 p-3 text-center">
                <span class="text-2xl font-bold text-primary">94.8%</span>
                <p class="mt-1 text-[10px] font-medium uppercase tracking-wider text-primary/70">Menos huella de carbono vs convencional</p>
              </div>
              <div class="rounded-lg bg-eco/10 p-3 text-center">
                <span class="text-2xl font-bold text-eco-dark">25.9%</span>
                <p class="mt-1 text-[10px] font-medium uppercase tracking-wider text-eco-dark/70">Más económico que el convencional</p>
              </div>
            </div>
          </div>
          <div class="reveal-right">
            <div class="overflow-hidden rounded-card bg-surface shadow-card">
              <img
                src="/images/tesis/capas-techo-verde.png"
                alt="Diagrama de las capas de un techo verde: vegetación, sustrato, drenante, barrera anti-raíz, impermeabilizante y base del techo"
                class="mx-auto w-full max-w-sm p-6"
              />
              <div class="border-t border-gray-100 px-4 py-2.5">
                <p class="text-[10px] text-slate-custom">Imagen 2. Capas de un techo verde. Fuente: Cervantes Nájera (2021), CIIEMAD-IPN</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Featured Roofs -->
    <section ref="featuredSection" class="bg-surface py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="Techos verdes destacados"
          subtitle="Algunos de los proyectos más representativos de infraestructura verde en azoteas de la CDMX."
          :centered="true"
          tag="Destacados"
        />
        <div class="stagger-children grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(roof, index) in featuredRoofs"
            :key="roof.id"
            class="card-interactive overflow-hidden reveal"
          >
            <div class="relative h-40 overflow-hidden" :class="index === 0 ? '' : 'bg-gradient-to-br from-primary-50 to-eco/10'">
              <img
                v-if="featuredImages[index]"
                :src="featuredImages[index]"
                :alt="'Techo verde: ' + roof.nombre"
                class="h-full w-full object-cover"
              />
              <div v-else class="flex h-full items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z" />
                  <path d="M12.5 2C9.64 2 8 4.14 8 6.5c0 2.18 1.41 3.44 3.5 3.44.84 0 1.62-.25 2.28-.68" />
                </svg>
              </div>
            </div>
            <div class="p-5">
              <div class="mb-2 flex items-center gap-2">
                <span class="badge-primary">{{ roof.tipoTechoVerde }}</span>
                <span
                  :class="[
                    'badge',
                    roof.estado === 'activo' ? 'bg-eco/10 text-eco-dark' : 'bg-accent/10 text-accent-dark'
                  ]"
                >
                  {{ roof.estado }}
                </span>
              </div>
              <h4 class="text-base font-semibold text-ink">{{ roof.nombre }}</h4>
              <p class="mt-1 text-xs text-slate-custom">{{ roof.alcaldia }} &middot; {{ roof.superficie?.toLocaleString() }} m2</p>
              <p class="mt-2 text-sm leading-relaxed text-slate-custom line-clamp-2">{{ roof.notas || roof.direccion }}</p>
            </div>
          </div>
        </div>
        <div class="mt-8 text-center">
          <NuxtLink to="/inventario" class="btn-outline">
            Ver inventario completo
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 8. AI Block -->
    <section ref="aiSection" class="bg-white py-16">
      <div class="container-wide">
        <div class="overflow-hidden rounded-card bg-gradient-to-br from-primary-800 to-primary shadow-panel reveal-scale">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="p-8 lg:p-12">
              <span class="mb-3 inline-flex items-center gap-2 rounded-badge bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
                Inteligencia Artificial
              </span>
              <h2 class="mt-4 text-2xl font-bold text-white md:text-3xl">Validación asistida por IA</h2>
              <p class="mt-4 text-base leading-relaxed text-white/75">
                Utilizamos modelos de visión por computadora para detectar y clasificar techos verdes a partir de imágenes aéreas y satelitales. El sistema humano-en-el-bucle garantiza la calidad de las validaciones.
              </p>
              <ul class="mt-6 space-y-3">
                <li v-for="item in aiFeatures" :key="item" class="flex items-center gap-3 text-sm text-white/80">
                  <span class="flex h-5 w-5 items-center justify-center rounded-full bg-eco/20">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-eco" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {{ item }}
                </li>
              </ul>
              <NuxtLink to="/ia-validacion" class="btn mt-8 border border-white/20 bg-white/10 text-white hover:bg-white/20">
                Ver validaciones
              </NuxtLink>
            </div>
            <div class="flex items-center justify-center p-8 lg:p-12">
              <div class="w-full max-w-sm space-y-4">
                <div class="rounded-card bg-white/10 p-4 backdrop-blur-sm">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-white">Detección automática</span>
                    <span class="badge bg-eco/20 text-eco">94% confianza</span>
                  </div>
                  <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div class="h-full w-[94%] rounded-full bg-eco" />
                  </div>
                </div>
                <div class="rounded-card bg-white/10 p-4 backdrop-blur-sm">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-white">Validaciones completadas</span>
                    <span class="text-lg font-bold text-white">30</span>
                  </div>
                  <div class="mt-2 flex gap-1.5">
                    <span class="badge bg-eco/20 text-eco">10 confirmadas</span>
                    <span class="badge bg-alert/20 text-alert-light">5 rechazadas</span>
                  </div>
                </div>
                <div class="rounded-card bg-white/10 p-4 backdrop-blur-sm">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-white">Modelo multicriterio</p>
                      <p class="text-xs text-white/60">8 variables, pesos calibrados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. Respaldo Científico + Disclaimer -->
    <section ref="respaldoSection" class="bg-surface py-12">
      <div class="container-wide space-y-4">
        <div class="rounded-card border border-primary/10 bg-white p-6 shadow-card reveal">
          <div class="flex flex-col gap-6 md:flex-row md:items-center">
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-base font-semibold text-ink">Respaldo científico</h3>
              <p class="mt-1 text-sm leading-relaxed text-slate-custom">
                Este observatorio se fundamenta en la investigación doctoral y de maestría realizada en el CIIEMAD-IPN por Ana Laura Cervantes Nájera, bajo la dirección de la Dra. María Concepción Martínez Rodríguez. Las tasas de impacto, el inventario georreferenciado y el modelo de priorización utilizados en esta plataforma provienen de dichas investigaciones.
              </p>
              <div class="mt-3 space-y-1">
                <p class="text-xs text-slate-custom">
                  <span class="font-medium text-ink">Tesis doctoral (2025):</span> "Techos verdes una solución sustentable para la adaptación al cambio climático en la Ciudad de México"
                </p>
                <p class="text-xs text-slate-custom">
                  <span class="font-medium text-ink">Tesis de maestría (2021):</span> "Diseño, aplicación y evaluación de un techo verde ligero extensivo como estrategia para la adaptación al cambio climático en la alcaldía Gustavo A. Madero, Ciudad de México"
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-card border border-accent/30 bg-accent/5 p-5">
          <div class="flex gap-3">
            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-accent-dark">Aviso importante</h4>
              <p class="mt-1 text-sm leading-relaxed text-slate-custom">
                Este observatorio es una herramienta de análisis territorial y no sustituye dictámenes técnicos de factibilidad estructural. Los datos de aptitud reflejan condiciones ambientales y urbanas, no la viabilidad constructiva de cada inmueble. Consulte las fuentes originales y los profesionales certificados antes de tomar decisiones de implementación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { greenRoofs } from '~/data/mock-roofs'
import { kpiData } from '~/data/kpis'

// Scroll-reveal for each section
const { revealRef: kpiSection } = useScrollReveal({ stagger: true })
const { revealRef: aboutSection } = useScrollReveal({ stagger: true })
const { revealRef: stepsSection } = useScrollReveal({ stagger: true })
const { revealRef: mapSection } = useScrollReveal()
const { revealRef: queEsSection } = useScrollReveal()
const { revealRef: featuredSection } = useScrollReveal({ stagger: true })
const { revealRef: aiSection } = useScrollReveal()
const { revealRef: respaldoSection } = useScrollReveal()

useHead({
  title: 'Observatorio de Techos Verdes CDMX',
  meta: [
    {
      name: 'description',
      content: 'Plataforma de monitoreo y priorización de techos verdes en la Ciudad de México. Visualización geoespacial, análisis de aptitud y validación con inteligencia artificial.',
    },
  ],
})

const kpis = kpiData

const features = [
  {
    title: 'Inventario de techos verdes',
    description: 'Registro georreferenciado de los techos verdes existentes en la CDMX, con información detallada de cada instalación.',
    to: '/inventario',
    bg: 'bg-primary-50',
    iconColor: 'text-primary',
    paths: [
      'M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z',
      'M12.5 2C9.64 2 8 4.14 8 6.5c0 2.18 1.41 3.44 3.5 3.44.84 0 1.62-.25 2.28-.68',
    ],
  },
  {
    title: 'Aptitud territorial',
    description: 'Índice multicriterio que evalúa la aptitud de cada zona para la implementación de techos verdes con base en 8 variables.',
    to: '/metodologia',
    bg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    paths: [
      'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
      'M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0',
    ],
  },
  {
    title: 'Validación con IA',
    description: 'Sistema de detección y validación asistida por inteligencia artificial con revisión humana integrada.',
    to: '/ia-validacion',
    bg: 'bg-accent/10',
    iconColor: 'text-accent',
    paths: [
      'M12 2L2 7l10 5 10-5-10-5z',
      'M2 17l10 5 10-5',
      'M2 12l10 5 10-5',
    ],
  },
]

const steps = [
  {
    title: 'Recopilación de datos',
    description: 'Integración de datos geoespaciales, sensores remotos, calidad del aire y datos urbanos.',
  },
  {
    title: 'Índice de aptitud',
    description: 'Construcción del índice multicriterio con 8 variables ponderadas por expertos.',
  },
  {
    title: 'Detección con IA',
    description: 'Modelos de visión por computadora analizan imágenes aéreas para detectar techos verdes.',
  },
  {
    title: 'Priorización',
    description: 'Integración de resultados para identificar y priorizar sitios candidatos.',
  },
]

const mapFeatures = [
  '57 techos verdes existentes geolocalizados',
  '60 sitios candidatos priorizados',
  'Capa de aptitud territorial por zona',
  'Filtros por alcaldía, tipo y estado',
]

const featuredRoofs = greenRoofs.slice(0, 3)

const featuredImages: Record<number, string> = {
  5: '/images/tesis/terrazas-alcazar.png',
}

const aiFeatures = [
  'Detección automática de vegetación en azoteas',
  'Clasificación por tipo de techo verde',
  'Nivel de confianza por predicción',
  'Interfaz de validación humano-en-el-bucle',
]

function kpiIconBg(color: string) {
  const map: Record<string, string> = {
    primary: 'bg-primary-50',
    eco: 'bg-eco/10',
    secondary: 'bg-secondary/10',
    accent: 'bg-accent/10',
  }
  return map[color] || 'bg-gray-50'
}

function kpiIconColor(color: string) {
  const map: Record<string, string> = {
    primary: 'text-primary',
    eco: 'text-eco',
    secondary: 'text-secondary',
    accent: 'text-accent',
  }
  return map[color] || 'text-ink-muted'
}

</script>

<style scoped>
.text-gradient-hero {
  background: linear-gradient(135deg, #79C141, #18A5E3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
