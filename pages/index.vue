<template>
  <div>
    <!-- 1. Hero Section — foto CIIEMAD + humedalito + flotantes -->
    <section class="hero-home relative overflow-hidden">
      <!-- Capa 0: foto del techo verde CIIEMAD -->
      <div class="hero-home-photo" aria-hidden="true" />
      <!-- Capa 1: tint verde sobre la foto -->
      <div class="hero-home-tint" aria-hidden="true" />
      <!-- Capa 2: anillos topográficos -->
      <div class="hero-home-topo" aria-hidden="true" />
      <!-- Capa 3: orbes lava lamp -->
      <div class="hero-home-orbs" aria-hidden="true">
        <span class="orb orb--g1" />
        <span class="orb orb--g2" />
        <span class="orb orb--a1" />
      </div>

      <div class="container-wide relative py-20 md:py-24 lg:py-10 z-10">
        <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <!-- Columna texto -->
          <div class="lg:col-span-7 xl:col-span-8">
            <span
              v-if="hero?.eyebrow"
              class="mb-5 inline-flex items-center gap-2 rounded-badge bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-eco-light backdrop-blur-sm"
            >
              <span class="live-dot" />
              {{ hero.eyebrow }}
            </span>
            <h1 class="mt-2 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              <template v-if="hero?.titleLine1">{{ hero.titleLine1 }}<br></template>
              <span v-if="hero?.titleLine2" class="text-gradient-hero">{{ hero.titleLine2 }}</span><br>
              CDMX
            </h1>
            <p
              v-if="hero?.subtitle"
              class="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl"
            >
              {{ hero.subtitle }}
            </p>

            <!-- 4 atajos visuales con iconos grandes -->
            <div class="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              <NuxtLink
                to="/inventario"
                class="hero-quick group"
                title="Inventario de techos verdes"
              >
                <svg
                  class="hero-quick-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 21V13h6v8" />
                </svg>
                <span class="hero-quick-label">Inventario</span>
              </NuxtLink>
              <NuxtLink to="/mapa" class="hero-quick group" title="Mapa interactivo">
                <svg
                  class="hero-quick-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
                <span class="hero-quick-label">Mapa</span>
              </NuxtLink>
              <NuxtLink
                to="/agenda-2030"
                class="hero-quick group"
                title="Techos verdes y Agenda 2030"
              >
                <svg
                  class="hero-quick-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span class="hero-quick-label">Agenda 2030</span>
              </NuxtLink>
              <NuxtLink
                to="/comunidad"
                class="hero-quick group"
                title="Sumarse a la comunidad"
              >
                <svg
                  class="hero-quick-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span class="hero-quick-label">Comunidad</span>
              </NuxtLink>
            </div>

            <div class="mt-8 flex flex-wrap gap-4">
              <NuxtLink
                v-if="hero?.primaryLabel && hero?.primaryTo"
                :to="hero.primaryTo"
                class="btn-primary btn-lg !bg-eco hover:!bg-eco-light"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
                {{ hero.primaryLabel }}
              </NuxtLink>
              <NuxtLink
                v-if="hero?.secondaryLabel && hero?.secondaryTo"
                :to="hero.secondaryTo"
                class="btn btn-lg border border-white/30 text-white hover:bg-white/10"
              >
                {{ hero.secondaryLabel }}
              </NuxtLink>
            </div>
          </div>

          <!-- Columna mascota Techito + chips flotantes -->
          <div class="hidden lg:flex lg:col-span-5 xl:col-span-4 items-center justify-center">
            <div
              class="hero-mascot-wrap"
              :class="{ 'mascot--petted': isPetted }"
              @mouseenter="showSpeech = true"
              @mouseleave="showSpeech = false"
              @touchstart="toggleSpeechMobile"
            >
              <!-- Chip flotante 1: NDVI -->
              <div class="hero-chip hero-chip--ndvi">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-eco"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
                  <path d="M12 7v10" />
                  <path d="M7 12h10" />
                </svg>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-wider text-white/70">NDVI Sentinel-2</p>
                  <p class="text-sm font-bold text-white">+0.62</p>
                </div>
              </div>
              <!-- Chip flotante 2: temperatura -->
              <div class="hero-chip hero-chip--temp">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                </svg>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-wider text-white/70">Reducción LST</p>
                  <p class="text-sm font-bold text-white">−3.5 °C</p>
                </div>
              </div>
              <!-- Chip flotante 3: CO2 -->
              <div class="hero-chip hero-chip--co2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-eco-light"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-wider text-white/70">Captura CO₂</p>
                  <p class="text-sm font-bold text-white">0.97 kg/m²·año</p>
                </div>
              </div>

              <!-- Speech bubble: "Hola, soy Techito" -->
              <div
                class="speech-bubble"
                :class="{ 'speech-visible': showSpeech }"
              >
                <span class="text-xs font-bold text-primary">Hola, soy Techito</span>
              </div>

              <!-- Hearts (pet easter egg) -->
              <div v-if="isPetted" class="mascot-hearts" aria-hidden="true">
                <span class="mascot-heart" style="left: 15%; animation-delay: 0s">💚</span>
                <span class="mascot-heart" style="left: 50%; animation-delay: 0.2s">🌿</span>
                <span class="mascot-heart" style="left: 80%; animation-delay: 0.4s">💛</span>
              </div>

              <!-- Mascota Techito con parpadeo (sin animación de saludo por ahora).
                   NOTA para iteración futura: el brazo de saludo en el SVG es un path
                   con fill #7E532F y transform="translate(250,669)". Bbox del path
                   localizado: x=238-290, y=669-766 (en % de 960×1088 = x:24.8%-30.2%,
                   y:61.5%-70.4%). Pivot del hombro: (264, 669) = (27.5%, 61.5%).
                   Para reanimarlo: clip-path basado en estos %, no en los del brazo derecho. -->
              <CommonTechitoBlink :blinking="isBlinking">
                <img
                  src="/images/mascots/techito.svg"
                  alt="Techito — mascota del Observatorio de Techos Verdes CDMX"
                  class="hero-mascot-img"
                  :class="{ 'mascot--speaking': showSpeech }"
                  loading="eager"
                  @pointerdown.prevent="petTechito"
                />
              </CommonTechitoBlink>

              <!-- Halo verde detrás de la mascota -->
              <div class="hero-mascot-halo" aria-hidden="true" />
            </div>
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
          title="Qué es el observatorio"
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

// CMS — hero editable en /admin/contenido/home → seccion "Hero principal"
type HeroShape = {
  eyebrow?: string
  titleLine1?: string
  titleLine2?: string
  subtitle?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}
const cms = useCmsContent('home')
const hero = cms.one<HeroShape>('hero')

// ── Techito mascot animation system (parpadeo + speech + pet easter egg) ──
// Adaptado del patrón de Humedalito en /observatorio-humedales
const isBlinking = ref(false)
const showSpeech = ref(false)
const isPetted = ref(false)
const petCount = ref(0)
let lastPetTime = 0

let blinkTimer: ReturnType<typeof setTimeout> | null = null
let petResetTimer: ReturnType<typeof setTimeout> | null = null
let petEndTimer: ReturnType<typeof setTimeout> | null = null
let speechHideTimer: ReturnType<typeof setTimeout> | null = null
let speechAutoTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  // Blink: cada ~2.6s, párpado cierra 150ms
  const scheduleBlink = () => {
    blinkTimer = setTimeout(() => {
      isBlinking.value = true
      setTimeout(() => {
        isBlinking.value = false
      }, 150)
      scheduleBlink()
    }, 2600)
  }
  scheduleBlink()

  // Saludo automático al cargar: muestra el bocadillo 3.5s y luego lo oculta
  speechAutoTimer = setTimeout(() => {
    showSpeech.value = true
    setTimeout(() => {
      showSpeech.value = false
    }, 3500)
  }, 800)
})

onUnmounted(() => {
  if (blinkTimer) clearTimeout(blinkTimer)
  if (petResetTimer) clearTimeout(petResetTimer)
  if (petEndTimer) clearTimeout(petEndTimer)
  if (speechHideTimer) clearTimeout(speechHideTimer)
  if (speechAutoTimer) clearTimeout(speechAutoTimer)
})

// Mobile: tap toggles speech, auto-hide después de 2.5s
function toggleSpeechMobile() {
  showSpeech.value = !showSpeech.value
  if (speechHideTimer) clearTimeout(speechHideTimer)
  if (showSpeech.value) {
    speechHideTimer = setTimeout(() => {
      showSpeech.value = false
    }, 2500)
  }
}

// Easter egg: 5 taps en 3s → corazones + wiggle
function petTechito() {
  if (isPetted.value) return
  const now = Date.now()
  if (now - lastPetTime < 100) return
  lastPetTime = now
  petCount.value++

  if (petResetTimer) clearTimeout(petResetTimer)
  petResetTimer = setTimeout(() => {
    petCount.value = 0
  }, 3000)

  if (petCount.value >= 5) {
    isPetted.value = true
    petCount.value = 0
    if (petEndTimer) clearTimeout(petEndTimer)
    petEndTimer = setTimeout(() => {
      isPetted.value = false
    }, 3000)
  }
}

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

/* ════════════════════════════════════════════════════════════════════
   Hero Home — capas de fondo
   ════════════════════════════════════════════════════════════════════ */
.hero-home {
  background:
    radial-gradient(ellipse 90% 60% at 50% 0%, rgba(26, 122, 78, 0.45) 0%, transparent 60%),
    linear-gradient(160deg, #042B1A 0%, #0A4A2D 25%, #0E5E3A 55%, #1A7A4E 85%, #0E5E3A 100%);
}

.hero-home-photo {
  position: absolute;
  inset: 0;
  background-image: url('/images/tesis/techo-verde-ciiemad-panoramica.jpg');
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  z-index: 0;
  filter: saturate(1.1) contrast(1.05) brightness(0.95);
  animation: heroPan 30s ease-in-out infinite alternate;
  will-change: transform;
}

.hero-home-tint {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(180deg, rgba(4, 43, 26, 0.55) 0%, rgba(14, 94, 58, 0.5) 50%, rgba(4, 43, 26, 0.85) 100%),
    linear-gradient(140deg, rgba(14, 94, 58, 0.45) 0%, rgba(26, 122, 78, 0.35) 100%);
  mix-blend-mode: multiply;
}

.hero-home-topo {
  position: absolute;
  inset: -10%;
  z-index: 2;
  background:
    repeating-radial-gradient(circle at 30% 40%, transparent 0, transparent 38px, rgba(121, 193, 65, 0.06) 38px, rgba(121, 193, 65, 0.06) 39px),
    repeating-radial-gradient(circle at 75% 70%, transparent 0, transparent 52px, rgba(197, 232, 212, 0.05) 52px, rgba(197, 232, 212, 0.05) 53px);
  mix-blend-mode: screen;
  opacity: 0.6;
  animation: heroDrift 60s linear infinite;
  will-change: transform;
  pointer-events: none;
}

.hero-home-orbs {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 3;
  pointer-events: none;
}

.hero-home-orbs .orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(36px);
  mix-blend-mode: screen;
  opacity: 0.5;
  will-change: transform;
}

.hero-home-orbs .orb--g1 {
  width: 600px; height: 600px;
  top: -180px; left: -120px;
  background: radial-gradient(circle, rgba(14, 94, 58, 0.85) 0%, rgba(14, 94, 58, 0) 70%);
  animation: heroLavaA 12s ease-in-out infinite;
}
.hero-home-orbs .orb--g2 {
  width: 500px; height: 500px;
  top: -60px; right: -100px;
  background: radial-gradient(circle, rgba(26, 122, 78, 0.75) 0%, rgba(26, 122, 78, 0) 70%);
  animation: heroLavaB 14s ease-in-out infinite;
}
.hero-home-orbs .orb--a1 {
  width: 380px; height: 380px;
  top: 30%; right: 25%;
  background: radial-gradient(circle, rgba(121, 193, 65, 0.5) 0%, rgba(121, 193, 65, 0) 70%);
  animation: heroLavaC 11s ease-in-out infinite;
  opacity: 0.45;
}

@keyframes heroPan {
  0%   { transform: scale(1.04) translate3d(0, 0, 0); }
  100% { transform: scale(1.08) translate3d(-12px, -8px, 0); }
}
@keyframes heroDrift {
  0%   { transform: translate3d(0, 0, 0) rotate(0deg); }
  100% { transform: translate3d(-2%, -1%, 0) rotate(2deg); }
}
@keyframes heroLavaA {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50%      { transform: translate3d(40px, 30px, 0) scale(1.05); }
}
@keyframes heroLavaB {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50%      { transform: translate3d(-50px, 20px, 0) scale(0.95); }
}
@keyframes heroLavaC {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50%      { transform: translate3d(20px, -15px, 0) scale(1.05); }
}

/* ════════════════════════════════════════════════════════════════════
   Quick action cards (icons grandes)
   ════════════════════════════════════════════════════════════════════ */
.hero-quick {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.75rem;
  border-radius: 0.875rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  text-decoration: none;
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.3s,
    border-color 0.3s,
    box-shadow 0.3s;
}
.hero-quick:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(121, 193, 65, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px -4px rgba(14, 94, 58, 0.4);
}
.hero-quick:active {
  transform: translateY(-1px);
}
.hero-quick-icon {
  width: 2.25rem;
  height: 2.25rem;
  color: #C5E8D4;
  transition: color 0.3s, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.hero-quick:hover .hero-quick-icon {
  color: #79C141;
  transform: scale(1.1) rotate(-3deg);
}
.hero-quick-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.85);
}

/* ════════════════════════════════════════════════════════════════════
   Mascot + chips flotantes
   ════════════════════════════════════════════════════════════════════ */
.hero-mascot-wrap {
  position: relative;
  width: 320px;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* El wrapper de TechitoBlink (interno al componente) flota como bloque */
.hero-mascot-wrap :deep(.techito-blink-wrap) {
  position: relative;
  z-index: 2;
  animation: mascotFloat 5s ease-in-out infinite;
  will-change: transform;
}

.hero-mascot-img {
  width: 240px;
  height: 240px;
  object-fit: contain;
  cursor: pointer;
  filter: drop-shadow(0 12px 24px rgba(4, 43, 26, 0.45));
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hero-mascot-img:hover {
  transform: scale(1.04);
}

.hero-mascot-halo {
  position: absolute;
  inset: 50% 50% auto auto;
  width: 320px;
  height: 320px;
  margin-top: -160px;
  margin-right: -160px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(121, 193, 65, 0.45) 0%, rgba(121, 193, 65, 0) 70%);
  filter: blur(20px);
  z-index: 1;
  animation: mascotHalo 4s ease-in-out infinite alternate;
}

.hero-chip {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.85rem;
  border-radius: 0.75rem;
  background: rgba(4, 43, 26, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(4, 43, 26, 0.4);
  animation: chipFloat 4s ease-in-out infinite;
  will-change: transform;
}

.hero-chip--ndvi { top: 6%;  right: -8%; animation-delay: 0s;   }
.hero-chip--temp { bottom: 22%; left: -16%; animation-delay: 1.3s; }
.hero-chip--co2  { bottom: 4%;  right: 4%;  animation-delay: 2.4s; }

@keyframes mascotFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%      { transform: translateY(-12px) rotate(-1deg); }
}
@keyframes mascotHalo {
  0%   { opacity: 0.7; transform: scale(1); }
  100% { opacity: 1;   transform: scale(1.1); }
}
@keyframes chipFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

/* ════════════════════════════════════════════════════════════════════
   Techito speech bubble + pet easter egg
   ════════════════════════════════════════════════════════════════════ */
.speech-bubble {
  position: absolute;
  top: -8px;
  right: -28px;
  z-index: 5;
  background: #ffffff;
  border-radius: 14px;
  padding: 0.5rem 0.85rem;
  box-shadow: 0 6px 20px rgba(4, 43, 26, 0.25);
  opacity: 0;
  transform: translateY(8px) scale(0.85);
  transition:
    opacity 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
  white-space: nowrap;
}
.speech-bubble::after {
  /* Cola del bocadillo apuntando a la mascota */
  content: '';
  position: absolute;
  bottom: -8px;
  left: 24px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid #ffffff;
  filter: drop-shadow(0 2px 1px rgba(4, 43, 26, 0.1));
}
.speech-bubble.speech-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Corazones flotantes del easter egg */
.mascot-hearts {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 4;
}
.mascot-heart {
  position: absolute;
  bottom: 30%;
  font-size: 1.5rem;
  opacity: 0;
  animation: heartFloat 2.4s ease-out forwards;
  filter: drop-shadow(0 2px 4px rgba(4, 43, 26, 0.3));
}
@keyframes heartFloat {
  0%   { opacity: 0; transform: translateY(0) scale(0.6); }
  20%  { opacity: 1; transform: translateY(-20px) scale(1.1); }
  100% { opacity: 0; transform: translateY(-120px) scale(0.8) rotate(15deg); }
}

/* Cuando está hablando, la mascota se inclina ligeramente */
.mascot--speaking {
  transform: scale(1.04) rotate(-2deg);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Cuando recibe muchos pets seguidos, hace wiggle */
.mascot--petted {
  animation: mascotWiggle 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) 3;
}
@keyframes mascotWiggle {
  0%, 100% { transform: rotate(0deg); }
  20%      { transform: rotate(-6deg) scale(1.04); }
  40%      { transform: rotate(5deg) scale(1.04); }
  60%      { transform: rotate(-4deg); }
  80%      { transform: rotate(3deg); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-home-photo,
  .hero-home-topo,
  .hero-home-orbs .orb,
  .hero-mascot-img,
  .hero-mascot-halo,
  .hero-chip,
  .mascot-heart,
  .mascot--petted,
  .mascot--speaking {
    animation: none;
    transform: none;
  }
}
</style>
