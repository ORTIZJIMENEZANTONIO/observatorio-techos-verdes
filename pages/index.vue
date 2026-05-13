<template>
  <div>
    <!-- 1. Hero Section — foto CIIEMAD + humedalito + flotantes -->
    <section class="hero-home relative overflow-hidden">
      <!-- Capa 0: foto del techo verde CIIEMAD -->
      <NuxtImg
        src="/images/tesis/techo-verde-ciiemad-panoramica.jpg"
        alt=""
        aria-hidden="true"
        class="hero-home-photo"
        sizes="xs:800px sm:1024px md:1280px lg:1600px xl:1600px"
        format="webp"
        loading="eager"
        preload
        densities="x1 x2"
      />
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

      <div class="container-wide relative py-12 md:py-24 lg:py-10 z-10">
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
            <h1
              class="mt-2 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl"
            >
              <template v-if="hero?.titleLine1"
                >{{ hero.titleLine1 }}<br
              /></template>
              <span v-if="hero?.titleLine2" class="text-gradient-hero">{{
                hero.titleLine2
              }}</span
              ><br />
              CDMX
            </h1>
            <p
              v-if="hero?.subtitle"
              class="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl"
            >
              {{ hero.subtitle }}
            </p>

            <!-- 4 atajos visuales: las mismas 4 puertas del nav -->
            <div class="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              <NuxtLink
                to="/aprende"
                class="hero-quick group"
                title="Aprende sobre techos verdes"
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
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span class="hero-quick-label">Aprende</span>
              </NuxtLink>
              <NuxtLink
                to="/investigacion"
                class="hero-quick group"
                title="Marco académico y publicaciones"
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
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <span class="hero-quick-label">Investigación</span>
              </NuxtLink>
              <NuxtLink
                to="/mapa"
                class="hero-quick group"
                title="Explora los datos en el mapa"
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
                  <polygon
                    points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"
                  />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
                <span class="hero-quick-label">Explora</span>
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
                class="btn-primary btn-lg !bg-primary-light hover:!bg-primary"
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
                  <polygon
                    points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"
                  />
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
          <!-- mobile: centrado horizontalmente; lg+: pegado a la izquierda
               de su columna con un offset negativo para acercarlo al texto. -->
          <div
            class="flex lg:col-span-5 xl:col-span-4 items-center justify-center lg:justify-start lg:-ml-6"
          >
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
                  <p
                    class="text-[10px] font-bold uppercase tracking-wider text-white/70"
                  >
                    NDVI Sentinel-2
                  </p>
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
                  <path
                    d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"
                  />
                </svg>
                <div>
                  <p
                    class="text-[10px] font-bold uppercase tracking-wider text-white/70"
                  >
                    Reducción LST
                  </p>
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
                  <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                  />
                </svg>
                <div>
                  <p
                    class="text-[10px] font-bold uppercase tracking-wider text-white/70"
                  >
                    Captura CO₂
                  </p>
                  <p class="text-sm font-bold text-white">0.97 kg/m²·año</p>
                </div>
              </div>

              <!-- Speech bubble: eslogan de Techito (auto-hide 5s + hover/touch) -->
              <div
                class="speech-bubble speech-bubble--mensaje"
                :class="{ 'speech-visible': showSpeech }"
              >
                <p class="speech-bubble-title">¡Hola, soy Techito!</p>
                <p class="speech-bubble-body">
                  Enfrío edificios, limpio el aire y traigo biodiversidad.
                </p>
              </div>

              <!-- Hearts (pet easter egg) -->
              <div v-if="isPetted" class="mascot-hearts" aria-hidden="true">
                <span
                  class="mascot-heart"
                  style="left: 15%; animation-delay: 0s"
                  >💚</span
                >
                <span
                  class="mascot-heart"
                  style="left: 50%; animation-delay: 0.2s"
                  >🌿</span
                >
                <span
                  class="mascot-heart"
                  style="left: 80%; animation-delay: 0.4s"
                  >💛</span
                >
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

    <!-- 1.5. Audience Gate — 4 puertas por audiencia -->
    <HomeAudienceGate v-if="audienceGates.length > 0" :gates="audienceGates" />

    <!-- 1.6. Academic highlight — Cervantes-Nájera 2025 Q1 SCS -->
    <HomeAcademicHighlight :highlight="academicHighlight" />

    <!-- 2. KPI Grid — Datos que cuentan una historia -->
    <section
      ref="kpiSection"
      class="kpi-section relative overflow-hidden bg-white py-12"
    >
      <!-- Decorativos suaves -->
      <div class="kpi-bg-blob kpi-bg-blob--a" aria-hidden="true" />
      <div class="kpi-bg-blob kpi-bg-blob--b" aria-hidden="true" />

      <div class="container-wide relative">
        <CommonSectionTitle
          :title="sectionTitles?.kpisTitle || 'Los números del observatorio'"
          :subtitle="
            sectionTitles?.kpisSubtitle ||
            'Una mirada rápida a lo que hemos contado, medido y validado en la Ciudad de México.'
          "
          :centered="true"
          :tag="sectionTitles?.kpisTag || 'En cifras'"
        />

        <div
          class="stagger-children mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <NuxtLink
            v-for="kpi in kpis"
            :key="kpi.label"
            :to="kpiHrefFor(kpi.icono)"
            class="kpi-fun reveal"
            :style="{
              '--kpi-color': kpiHex(kpiColorKey(kpi.icono)),
              '--kpi-light': kpiLight(kpiColorKey(kpi.icono)),
            }"
            :aria-label="`Ver detalles de ${kpi.label}`"
          >
            <!-- Hint -->
            <span class="kpi-fun-hint">
              {{ kpiHintFor(kpi.icono) }}
            </span>

            <!-- Icono protagonista -->
            <div class="kpi-fun-icon-wrap" aria-hidden="true">
              <span class="kpi-fun-icon-halo" />
              <span class="kpi-fun-icon-bubble" />
              <svg
                class="kpi-fun-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path v-for="(d, i) in kpiPaths(kpi.icono)" :key="i" :d="d" />
              </svg>
              <!-- Chispitas decorativas -->
              <span class="kpi-fun-spark kpi-fun-spark--1" />
              <span class="kpi-fun-spark kpi-fun-spark--2" />
              <span class="kpi-fun-spark kpi-fun-spark--3" />
            </div>

            <!-- Valor + unidad -->
            <p class="kpi-fun-value tabular-nums">
              {{ kpi.valor
              }}<span v-if="kpi.unidad" class="kpi-fun-unit">{{
                kpi.unidad
              }}</span>
            </p>
            <p class="kpi-fun-label">{{ kpi.label }}</p>

            <!-- CTA mini que aparece en hover -->
            <span class="kpi-fun-cta">
              Ver más
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 6. Qué es un techo verde -->
    <section ref="queEsSection" class="bg-white py-12">
      <div class="container-wide">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div class="reveal-left">
            <CommonSectionTitle
              :title="techoVerdeIntro?.title || '¿Qué es un techo verde?'"
              :subtitle="
                techoVerdeIntro?.subtitle ||
                'Un sistema de capas que incorpora vegetación en la parte superior de edificaciones, aportando múltiples beneficios ambientales.'
              "
              :tag="techoVerdeIntro?.tag || 'Fundamento'"
            />
            <p class="text-sm leading-relaxed text-slate-custom">
              {{
                techoVerdeIntro?.body ||
                "Un techo verde es un sistema constructivo que integra vegetación viva sobre las cubiertas de los edificios."
              }}
            </p>
            <div class="mt-6 grid grid-cols-2 gap-3">
              <div class="rounded-lg bg-primary-50 p-3 text-center">
                <span class="text-2xl font-bold text-primary">{{
                  techoVerdeIntro?.stat1Value || "94.8%"
                }}</span>
                <p
                  class="mt-1 text-[11px] font-semibold uppercase tracking-wider text-primary"
                >
                  {{
                    techoVerdeIntro?.stat1Label ||
                    "Menos huella de carbono vs convencional"
                  }}
                </p>
              </div>
              <div class="rounded-lg bg-eco/10 p-3 text-center">
                <span class="text-2xl font-bold text-primary">{{
                  techoVerdeIntro?.stat2Value || "25.9%"
                }}</span>
                <p
                  class="mt-1 text-[11px] font-semibold uppercase tracking-wider text-primary"
                >
                  {{
                    techoVerdeIntro?.stat2Label ||
                    "Más económico que el convencional"
                  }}
                </p>
              </div>
            </div>
          </div>
          <div class="reveal-right">
            <div class="overflow-hidden rounded-card bg-surface shadow-card">
              <NuxtImg
                src="/images/tesis/capas-techo-verde.png"
                alt="Diagrama de las capas de un techo verde: vegetación, sustrato, drenante, barrera anti-raíz, impermeabilizante y base del techo"
                class="mx-auto w-full max-w-sm p-6"
                width="384"
                height="312"
                sizes="xs:320px sm:384px md:384px lg:384px"
                format="webp"
                loading="lazy"
              />
              <div class="border-t border-gray-100 px-4 py-2.5">
                <p class="text-[10px] text-slate-custom">
                  Imagen 2. Capas de un techo verde. Fuente: Cervantes Nájera
                  (2021), CIIEMAD-IPN
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2.5 ¿Sabías que…? — datos curiosos divulgativos -->
    <section class="bg-surface py-14">
      <div class="container-wide">
        <div class="mb-8 flex items-center justify-center gap-3">
          <h2
            class="inline-flex items-center gap-2 rounded-full bg-eco/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 2v4" />
              <path d="M12 18v4" />
              <path d="M4.93 4.93l2.83 2.83" />
              <path d="M16.24 16.24l2.83 2.83" />
              <path d="M2 12h4" />
              <path d="M18 12h4" />
              <path d="M4.93 19.07l2.83-2.83" />
              <path d="M16.24 7.76l2.83-2.83" />
            </svg>
            ¿Sabías que…?
          </h2>
        </div>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
          <article
            v-for="(d, i) in datosCuriosos"
            :key="i"
            class="datos-curiosos-card"
            :style="{
              '--kpi-color': kpiHex(d.color),
              '--kpi-light': kpiLight(d.color),
            }"
          >
            <div class="datos-curiosos-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path v-for="(p, j) in kpiPaths(d.icon)" :key="j" :d="p" />
              </svg>
            </div>
            <h3 class="datos-curiosos-title">{{ d.titulo }}</h3>
            <p class="datos-curiosos-text">{{ d.texto }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- 3. Qué es el observatorio -->
    <section ref="aboutSection" class="bg-surface py-16">
      <div class="container-wide">
        <CommonSectionTitle
          :title="sectionTitles?.featuresTitle || '¿Qué es el observatorio?'"
          :subtitle="
            sectionTitles?.featuresSubtitle ||
            'Una plataforma integral para el monitoreo, análisis y priorización de techos verdes en la Ciudad de México.'
          "
          :centered="true"
          :tag="sectionTitles?.featuresTag || 'Acerca de'"
        />
        <div class="stagger-children grid grid-cols-1 gap-6 md:grid-cols-3">
          <NuxtLink
            v-for="feature in features"
            :key="feature.title"
            :to="feature.to"
            class="fun-card fun-card-link reveal"
            :style="funStyle(feature.color)"
            :aria-label="`Ir a ${feature.title}`"
          >
            <span class="fun-card-hint">{{ feature.hint }}</span>
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
                <path
                  v-for="(d, i) in funPaths(feature.icono)"
                  :key="i"
                  :d="d"
                />
              </svg>
              <span class="fun-card-spark fun-card-spark--1" />
              <span class="fun-card-spark fun-card-spark--2" />
              <span class="fun-card-spark fun-card-spark--3" />
            </div>
            <h3 class="fun-card-label">{{ feature.title }}</h3>
            <p class="fun-card-desc">{{ feature.description }}</p>
            <span class="fun-card-cta">
              Explorar
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 4. Cómo funciona -->
    <section ref="stepsSection" class="bg-white py-16">
      <div class="container-wide">
        <CommonSectionTitle
          :title="sectionTitles?.stepsTitle || 'Cómo funciona'"
          :subtitle="
            sectionTitles?.stepsSubtitle ||
            'Un flujo de trabajo que integra datos geoespaciales, análisis multicriterio AHP y validación de campo con expertos del CIIEMAD-IPN.'
          "
          :centered="true"
          :tag="sectionTitles?.stepsTag || 'Proceso'"
        />
        <div class="relative">
          <!-- Connection line -->
          <div
            class="absolute left-1/2 top-12 hidden h-0.5 w-3/4 -translate-x-1/2 bg-gradient-to-r from-primary via-secondary to-eco lg:block"
          />
          <div
            class="stagger-children grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            <div
              v-for="(step, index) in steps"
              :key="step.title"
              class="step-fun relative text-center reveal"
            >
              <!-- Icono protagonista -->
              <div class="step-fun-icon-wrap">
                <span class="step-fun-icon-bubble" aria-hidden="true" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="step-fun-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    v-for="(d, i) in funPaths(step.icono)"
                    :key="i"
                    :d="d"
                  />
                </svg>
                <!-- Badge numerada -->
                <span class="step-fun-badge">{{ index + 1 }}</span>
              </div>
              <h3 class="mt-5 text-base font-bold text-ink">
                {{ step.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-custom">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Map Teaser -->
    <section ref="mapSection" class="bg-surface py-16">
      <div class="container-wide">
        <div
          class="overflow-hidden rounded-card bg-white shadow-panel reveal-scale"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="flex flex-col justify-center p-8 lg:p-12">
              <span
                class="mb-3 inline-flex w-fit items-center rounded-badge bg-secondary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink"
              >
                {{ mapTeaser?.eyebrow || "Mapa interactivo" }}
              </span>
              <h2 class="text-2xl font-bold text-ink md:text-3xl">
                {{ mapTeaser?.title || "Explora los techos verdes de la CDMX" }}
              </h2>
              <p class="mt-4 text-base leading-relaxed text-slate-custom">
                {{
                  mapTeaser?.description ||
                  "Visualiza la distribución de techos verdes existentes, sitios candidatos priorizados y el índice de aptitud territorial en un mapa interactivo con múltiples capas de información."
                }}
              </p>
              <ul class="mt-6 space-y-3">
                <li
                  v-for="item in mapFeatures"
                  :key="item"
                  class="flex items-center gap-3 text-sm text-ink"
                >
                  <span
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-primary-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {{ item }}
                </li>
              </ul>
              <NuxtLink
                :to="mapTeaser?.ctaTo || '/mapa'"
                class="btn-primary mt-8 w-fit"
              >
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
                  <polygon
                    points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"
                  />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
                {{ mapTeaser?.ctaLabel || "Abrir mapa interactivo" }}
              </NuxtLink>
            </div>
            <div
              class="relative min-h-[300px] overflow-hidden lg:min-h-[400px]"
            >
              <NuxtImg
                src="/images/tesis/mapa-inventario-cdmx.png"
                alt="Mapa inventario de techos verdes en la Ciudad de México, elaborado a partir de investigación de campo y datos georreferenciados"
                class="absolute inset-0 h-full w-full object-cover"
                width="1178"
                height="956"
                sizes="sm:100vw md:100vw lg:50vw xl:600px"
                format="webp"
                loading="lazy"
              />
              <div
                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4"
              >
                <p class="text-xs text-white/90">
                  Inventario georreferenciado de techos verdes en la CDMX
                </p>
                <p class="text-[10px] text-white/60">
                  Fuente: Cervantes Nájera (2025), CIIEMAD-IPN
                </p>
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
          :title="sectionTitles?.featuredTitle || 'Techos verdes destacados'"
          :subtitle="
            sectionTitles?.featuredSubtitle ||
            'Algunos de los proyectos más representativos de infraestructura verde en azoteas de la CDMX.'
          "
          :centered="true"
          :tag="sectionTitles?.featuredTag || 'Destacados'"
        />
        <div
          class="stagger-children grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <NuxtLink
            v-for="(roof, index) in featuredRoofs"
            :key="roof.id"
            to="/inventario"
            class="roof-card reveal"
            :style="funStyle(roofColors[index] || 'primary')"
            :aria-label="`Ver inventario · ${roof.nombre}`"
          >
            <div class="roof-card-image-wrap">
              <NuxtImg
                v-if="roof.imagen"
                :src="roof.imagen"
                :alt="'Techo verde: ' + roof.nombre"
                class="roof-card-image"
                loading="lazy"
                sizes="xs:400px sm:380px md:380px lg:400px"
                format="webp"
              />
              <div v-else class="roof-card-image-fallback" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.4"
                >
                  <path
                    d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z"
                  />
                  <path
                    d="M12.5 2C9.64 2 8 4.14 8 6.5c0 2.18 1.41 3.44 3.5 3.44.84 0 1.62-.25 2.28-.68"
                  />
                </svg>
              </div>
              <!-- Gradient overlay -->
              <div class="roof-card-image-gradient" aria-hidden="true" />
              <!-- Badge tipo -->
              <span class="roof-card-tipo">{{ roof.tipoTechoVerde }}</span>
              <!-- Badge estado -->
              <span class="roof-card-estado">
                <span class="roof-card-estado-dot" />
                {{ roof.estado }}
              </span>
            </div>
            <div class="roof-card-body">
              <h3 class="roof-card-title">{{ roof.nombre }}</h3>
              <p class="roof-card-meta">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
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
                {{ roof.alcaldia }} · {{ roof.superficie?.toLocaleString() }} m²
              </p>
              <p class="roof-card-desc">{{ roof.notas || roof.direccion }}</p>
              <span class="roof-card-cta">
                Ver detalles
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </NuxtLink>
        </div>
        <div class="mt-8 text-center">
          <NuxtLink to="/inventario" class="btn-outline">
            Ver inventario completo
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
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 8. (eliminado) — el caso CIIEMAD se consolidó en /aprende#caso-ciiemad
         para no repetir contenido con la home. El AcademicHighlight de arriba
         ya cubre la publicación Q1. -->

    <!-- 9. Aviso técnico (el respaldo completo se movió al bloque CIIEMAD/Cervantes Showcase
         y al hub /investigacion para no repetir el contenido). -->
    <section ref="respaldoSection" class="bg-surface py-12">
      <div class="container-wide space-y-4">
        <div class="rounded-card border border-accent/30 bg-accent/5 p-5">
          <div class="flex gap-3">
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-accent"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-ink">
                {{ respaldo?.avisoTitle || "Aviso importante" }}
              </h3>
              <p class="mt-1 text-sm leading-relaxed text-slate-custom">
                {{
                  respaldo?.avisoBody ||
                  "Este observatorio es una herramienta de análisis territorial y no sustituye dictámenes técnicos de factibilidad estructural."
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { greenRoofs } from "~/data/mock-roofs";
import { kpiData } from "~/data/kpis";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useHead } from "nuxt/app";

const { funPaths, funStyle } = useFunPalette();

// CMS — todas las secciones editables en /admin/contenido/home
type HeroShape = {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
};
// FeatureItem usa el shape de fun-card (icono/color/to) — NO el legacy icon/accent/linkTo.
// Los defaults en data/cms-defaults.ts deben respetar este shape o el template
// pierde colores e iconos diferenciados y los NuxtLink quedan sin destino.
type FeatureItem = {
  title: string;
  description: string;
  hint?: string;
  icono: string;
  color: string;
  to: string;
};
type StepItem = { title: string; description: string; icono?: string };
type DatoCurioso = {
  titulo: string;
  texto: string;
  icon?: string;
  color?: string;
};
type SectionTitles = {
  kpisTag?: string;
  kpisTitle?: string;
  kpisSubtitle?: string;
  featuresTag?: string;
  featuresTitle?: string;
  featuresSubtitle?: string;
  stepsTag?: string;
  stepsTitle?: string;
  stepsSubtitle?: string;
  featuredTag?: string;
  featuredTitle?: string;
  featuredSubtitle?: string;
};
type MapTeaser = {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaTo?: string;
  bullet1?: string;
  bullet2?: string;
  bullet3?: string;
  bullet4?: string;
};
type TechoVerdeIntro = {
  tag?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
};
type CiiemadShowcase = {
  eyebrow?: string;
  titlePre?: string;
  titleAccent?: string;
  lead?: string;
  badgeValue?: string;
  badgeLabel?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryTo?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryTo?: string;
};
type CiiemadPub = {
  year: string;
  type: string;
  title: string;
  to?: string;
  color?: string;
};
type CiiemadKpi = { val: string; label: string };
type Respaldo = {
  title?: string;
  body?: string;
  tesisDoc?: string;
  tesisMa?: string;
  avisoTitle?: string;
  avisoBody?: string;
};

const cms = useCmsContent("home");
const hero = cms.one<HeroShape>("hero");
const features = cms.list<FeatureItem>("features");
const steps = cms.list<StepItem>("steps");
const datosCuriosos = cms.list<DatoCurioso>("datosCuriosos");
const sectionTitles = cms.one<SectionTitles>("sectionTitles");
const mapTeaser = cms.one<MapTeaser>("mapTeaser");
const techoVerdeIntro = cms.one<TechoVerdeIntro>("techoVerdeIntro");
const ciiemadShowcase = cms.one<CiiemadShowcase>("ciiemadShowcase");
const ciiemadPubs = cms.list<CiiemadPub>("ciiemadPubs");
const ciiemadKpis = cms.list<CiiemadKpi>("ciiemadKpis");
const respaldo = cms.one<Respaldo>("respaldo");

// Fase 2 — Audience Gate + Academic Highlight
interface GateItem {
  tag: string;
  title: string;
  description: string;
  to: string;
  ctaLabel: string;
  icono: string;
  color: string;
}
interface AcademicHighlightShape {
  tag?: string;
  venue?: string;
  anio?: string;
  autores?: string;
  titulo?: string;
  descripcion?: string;
  doi?: string;
  kpi1Value?: string;
  kpi1Label?: string;
  kpi2Value?: string;
  kpi2Label?: string;
  kpi3Value?: string;
  kpi3Label?: string;
  ctaLabel?: string;
  ctaTo?: string;
}
const audienceGatesRef = cms.list<GateItem>("audienceGate");
const academicHighlightRef =
  cms.one<AcademicHighlightShape>("academicHighlight");
const audienceGates = computed(() => audienceGatesRef.value);
const academicHighlight = computed(() => academicHighlightRef.value);

const mapFeatures = computed(() => {
  const t = mapTeaser.value;
  if (!t) return [] as string[];
  return [t.bullet1, t.bullet2, t.bullet3, t.bullet4].filter(
    Boolean
  ) as string[];
});

// ── Scroll-reveal observers para cada sección ─────────────────────────────
// Las clases `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`
// arrancan con opacity:0. `useScrollReveal()` engancha un IntersectionObserver
// al ref de la sección y añade `.is-visible` cuando aparece en viewport.
// Sin estos hooks, los elementos se quedan invisibles para siempre.
const { revealRef: kpiSection } = useScrollReveal({ stagger: true });
const { revealRef: queEsSection } = useScrollReveal();
const { revealRef: aboutSection } = useScrollReveal({ stagger: true });
const { revealRef: stepsSection } = useScrollReveal({ stagger: true });
const { revealRef: mapSection } = useScrollReveal();
const { revealRef: featuredSection } = useScrollReveal({ stagger: true });
const { revealRef: respaldoSection } = useScrollReveal();

// ── Techito mascot animation system (parpadeo + speech + pet easter egg) ──
// Adaptado del patrón de Humedalito en /observatorio-humedales
const isBlinking = ref(false);
const showSpeech = ref(false);
const isPetted = ref(false);
const petCount = ref(0);
let lastPetTime = 0;

let blinkTimer: ReturnType<typeof setTimeout> | null = null;
let petResetTimer: ReturnType<typeof setTimeout> | null = null;
let petEndTimer: ReturnType<typeof setTimeout> | null = null;
let speechHideTimer: ReturnType<typeof setTimeout> | null = null;
let speechAutoTimer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  // Blink: cada ~2.6s, párpado cierra 150ms
  const scheduleBlink = () => {
    blinkTimer = setTimeout(() => {
      isBlinking.value = true;
      setTimeout(() => {
        isBlinking.value = false;
      }, 150);
      scheduleBlink();
    }, 2600);
  };
  scheduleBlink();

  // Saludo automático al cargar: el bocadillo aparece de inmediato y se oculta
  // a los 5 s. Después solo reaparece con hover (desktop) o touch (mobile).
  showSpeech.value = true;
  speechAutoTimer = setTimeout(() => {
    showSpeech.value = false;
  }, 5000);
});

onUnmounted(() => {
  if (blinkTimer) clearTimeout(blinkTimer);
  if (petResetTimer) clearTimeout(petResetTimer);
  if (petEndTimer) clearTimeout(petEndTimer);
  if (speechHideTimer) clearTimeout(speechHideTimer);
  if (speechAutoTimer) clearTimeout(speechAutoTimer);
});

// Mobile: tap toggles speech, auto-hide después de 2.5s
function toggleSpeechMobile() {
  showSpeech.value = !showSpeech.value;
  if (speechHideTimer) clearTimeout(speechHideTimer);
  if (showSpeech.value) {
    speechHideTimer = setTimeout(() => {
      showSpeech.value = false;
    }, 2500);
  }
}

// Easter egg: 5 taps en 3s → corazones + wiggle
function petTechito() {
  if (isPetted.value) return;
  const now = Date.now();
  if (now - lastPetTime < 100) return;
  lastPetTime = now;
  petCount.value++;

  if (petResetTimer) clearTimeout(petResetTimer);
  petResetTimer = setTimeout(() => {
    petCount.value = 0;
  }, 3000);

  if (petCount.value >= 5) {
    isPetted.value = true;
    petCount.value = 0;
    if (petEndTimer) clearTimeout(petEndTimer);
    petEndTimer = setTimeout(() => {
      isPetted.value = false;
    }, 3000);
  }
}


useHead({
  title: "Observatorio de Techos Verdes CDMX",
  meta: [
    {
      name: "description",
      content:
        "Plataforma de monitoreo y priorización de techos verdes en la Ciudad de México. Fundamentado en la investigación CIIEMAD-IPN de la M. en C. Ana Laura Cervantes Nájera.",
    },
  ],
});

const kpis = kpiData;

const featuredRoofs = greenRoofs.slice(0, 3);

// Color único por card de techo destacado para evitar repetición visual
const roofColors = ["primary", "rose", "secondary"];

// ── Iconografía semántica por tipo de KPI ──
// Cada entrada devuelve los <path> que componen el icono dentro de un viewBox 24x24.
const kpiIconPaths: Record<string, string[]> = {
  leaf: [
    "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z",
    "M12 18c2-3 3-6 3-10",
  ],
  area: [
    "M4 4h16v16H4z",
    "M4 4l16 16",
    "M9 4v2",
    "M15 4v2",
    "M4 9h2",
    "M4 15h2",
    "M18 20v-2",
    "M20 15h-2",
  ],
  target: [
    "M12 2v3",
    "M12 19v3",
    "M2 12h3",
    "M19 12h3",
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
  ],
  map: [
    "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z",
    "M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  ],
  chart: ["M3 3v18h18", "M7 16V11", "M11 16V7", "M15 16v-3", "M19 16V9"],
  score: [
    "M6 9V5h12v4a6 6 0 0 1-12 0z",
    "M6 5H4a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4",
    "M18 5h2a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4",
    "M10 15h4v3h-4z",
    "M9 21h6",
  ],
  pilot: [
    "M4.5 16.5L9 12l3 3-4.5 4.5L4.5 16.5z",
    "M14 7c0-5 5-6 5-6s-1 5-6 6",
    "M9 12c-5 0-6 5-6 5s5-1 6-6",
    "M14 7l3 3",
    "M12 15l-1.5 1.5",
    "M14.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z",
  ],
  thermometer: ["M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"],
  water: ["M12 2.5s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"],
  co2: [
    "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    "M3.27 6.96 12 12.01l8.73-5.05",
    "M12 22.08V12",
  ],
  people: [
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
    "M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    "M23 21v-2a4 4 0 0 0-3-3.87",
    "M16 3.13a4 4 0 0 1 0 7.75",
  ],
};

// Hint visual breve (1-2 palabras) que acompaña al número — busca tono divulgativo
const kpiHint: Record<string, string> = {
  leaf: "Inventario",
  area: "Cobertura",
  target: "Prioridad",
  co2: "CO₂",
  map: "Territorio",
  chart: "Modelo",
  score: "Calidad",
  pilot: "Pilotos",
};

// Paletas por color — el set base del design system + 4 colores únicos
// para que cada KPI tenga su propio tono y no se sienta repetitivo.
const kpiPalette: Record<
  string,
  { hex: string; light: string; iconBg: string; iconText: string; ring: string }
> = {
  primary: {
    hex: "#0E5E3A",
    light: "#ECFDF5",
    iconBg: "bg-primary-50",
    iconText: "text-primary",
    ring: "ring-primary/20",
  },
  eco: {
    hex: "#5BAA2E",
    light: "#F0FAE5",
    iconBg: "bg-eco/10",
    iconText: "text-eco-dark",
    ring: "ring-eco/20",
  },
  secondary: {
    hex: "#18A5E3",
    light: "#E6F6FD",
    iconBg: "bg-secondary/10",
    iconText: "text-secondary",
    ring: "ring-secondary/20",
  },
  accent: {
    hex: "#D78A0F",
    light: "#FEF5E2",
    iconBg: "bg-accent/10",
    iconText: "text-accent-dark",
    ring: "ring-accent/20",
  },
  alert: {
    hex: "#D9363E",
    light: "#FDECEE",
    iconBg: "bg-alert/10",
    iconText: "text-alert",
    ring: "ring-alert/20",
  },
  // Colores únicos para los KPIs secundarios — evitan repetir el set base
  violet: {
    hex: "#7C3AED",
    light: "#F2EBFC",
    iconBg: "",
    iconText: "",
    ring: "",
  },
  teal: {
    hex: "#0EA5A9",
    light: "#E0F5F5",
    iconBg: "",
    iconText: "",
    ring: "",
  },
  rose: {
    hex: "#E11D6F",
    light: "#FDE8F2",
    iconBg: "",
    iconText: "",
    ring: "",
  },
  indigo: {
    hex: "#4F46E5",
    light: "#EAEAFB",
    iconBg: "",
    iconText: "",
    ring: "",
  },
};

// Color único por tipo de icono — 8 KPIs = 8 colores distintos
const kpiIconToColor: Record<string, string> = {
  leaf: "primary",
  area: "eco",
  target: "secondary",
  co2: "accent",
  map: "violet",
  chart: "teal",
  score: "rose",
  pilot: "indigo",
};

// Destino de cada KPI — cada número apunta a la sección que lo respalda
const kpiIconToHref: Record<string, string> = {
  leaf: "/inventario",
  area: "/mapa",
  target: "/candidatos",
  co2: "/referencias#articulo-destacado",
  map: "/mapa",
  chart: "/metodologia",
  score: "/candidatos",
  pilot: "/inventario",
};

function kpiColorKey(icono: string | undefined) {
  if (!icono) return "primary";
  return kpiIconToColor[icono] || "primary";
}

function kpiHrefFor(icono: string | undefined) {
  if (!icono) return "/";
  return kpiIconToHref[icono] || "/";
}

function kpiHex(color: string) {
  return kpiPalette[color]?.hex || "#64748B";
}
function kpiLight(color: string) {
  return kpiPalette[color]?.light || "#F1F5F9";
}
function kpiPaths(icono: string | undefined) {
  if (!icono) return kpiIconPaths.leaf;
  return kpiIconPaths[icono] || kpiIconPaths.leaf;
}
function kpiHintFor(icono: string | undefined) {
  if (!icono) return "";
  return kpiHint[icono] || "";
}
</script>

<style scoped>
.text-gradient-hero {
  background: linear-gradient(135deg, #79c141, #18a5e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ════════════════════════════════════════════════════════════════════
   KPI Grid — cards centradas con icono protagonista
   ════════════════════════════════════════════════════════════════════ */
.kpi-section {
  background: linear-gradient(180deg, var(--c-surface) 0%, var(--c-bg) 100%);
}
.kpi-bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  pointer-events: none;
}
.kpi-bg-blob--a {
  width: 360px;
  height: 360px;
  top: -120px;
  left: -120px;
  background: radial-gradient(
    circle,
    rgba(121, 193, 65, 0.45),
    transparent 70%
  );
}
.kpi-bg-blob--b {
  width: 420px;
  height: 420px;
  bottom: -160px;
  right: -160px;
  background: radial-gradient(
    circle,
    rgba(24, 165, 227, 0.35),
    transparent 70%
  );
}

.kpi-fun {
  --kpi-color: #0e5e3a;
  --kpi-light: #ecfdf5;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.25rem 1.75rem;
  background: var(--c-surface);
  border: 1px solid var(--c-border-soft);
  border-radius: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}
.kpi-fun::before {
  /* Banda superior con el color del KPI */
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--kpi-color);
  opacity: 0.85;
  transform: scaleX(0.4);
  transform-origin: left center;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.kpi-fun::after {
  /* Resplandor inferior que aparece en hover */
  content: "";
  position: absolute;
  inset: auto 0 -40% 0;
  height: 80%;
  background: radial-gradient(
    ellipse at center top,
    var(--kpi-light) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  z-index: 0;
}
.kpi-fun:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px -10px rgba(14, 94, 58, 0.18),
    0 4px 12px rgba(0, 0, 0, 0.04);
  border-color: var(--kpi-color);
}
.kpi-fun:hover::before {
  transform: scaleX(1);
}
.kpi-fun:hover::after {
  opacity: 0.5;
}

.kpi-fun-hint {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem 0.7rem;
  margin-bottom: 1rem;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--kpi-color);
  background: var(--kpi-light);
  border-radius: 9999px;
}

.kpi-fun-icon-wrap {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.5rem;
  height: 6.5rem;
  margin-bottom: 1.1rem;
}
.kpi-fun-icon-halo {
  position: absolute;
  inset: -10%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--kpi-color) 30%, transparent) 0%,
    transparent 70%
  );
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.4s ease;
  animation: kpiHaloPulse 4s ease-in-out infinite;
}
.kpi-fun:hover .kpi-fun-icon-halo {
  opacity: 1;
}
.kpi-fun-icon-bubble {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--kpi-light);
  border: 2px solid color-mix(in srgb, var(--kpi-color) 18%, transparent);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.4s ease;
}
.kpi-fun:hover .kpi-fun-icon-bubble {
  transform: scale(1.08);
  box-shadow: 0 8px 20px -6px color-mix(in srgb, var(--kpi-color) 40%, transparent);
}
.kpi-fun-icon-svg {
  position: relative;
  z-index: 2;
  width: 3.25rem;
  height: 3.25rem;
  color: var(--kpi-color);
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.kpi-fun:hover .kpi-fun-icon-svg {
  transform: scale(1.08) rotate(-4deg);
}

/* Chispitas decorativas alrededor del icono */
.kpi-fun-spark {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--kpi-color);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.kpi-fun-spark--1 {
  top: 4%;
  right: 6%;
  animation: kpiSpark 2.2s ease-in-out infinite;
}
.kpi-fun-spark--2 {
  bottom: 12%;
  left: 0;
  width: 4px;
  height: 4px;
  animation: kpiSpark 2.6s 0.4s ease-in-out infinite;
}
.kpi-fun-spark--3 {
  top: 30%;
  right: -4%;
  width: 5px;
  height: 5px;
  animation: kpiSpark 3s 0.8s ease-in-out infinite;
}
.kpi-fun:hover .kpi-fun-spark {
  opacity: 0.9;
}

.kpi-fun-value {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: baseline;
  gap: 0.2rem;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.1;
  color: var(--kpi-color);
  letter-spacing: -0.01em;
}
.kpi-fun-unit {
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(31, 41, 55, 0.55);
  letter-spacing: 0;
}
.kpi-fun-label {
  position: relative;
  z-index: 1;
  margin-top: 0.45rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--c-ink);
  max-width: 90%;
  line-height: 1.3;
}
.kpi-fun-delta {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.7rem;
  padding: 0.2rem 0.6rem;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--kpi-color);
  background: var(--kpi-light);
  border-radius: 9999px;
}
.kpi-fun-delta svg {
  width: 0.8rem;
  height: 0.8rem;
}

/* CTA "Ver más" — aparece en hover, refuerza que la card es clickeable */
.kpi-fun-cta {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.85rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--kpi-color);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.kpi-fun-cta svg {
  width: 0.85rem;
  height: 0.85rem;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.kpi-fun:hover .kpi-fun-cta {
  opacity: 1;
  transform: translateY(0);
}
.kpi-fun:hover .kpi-fun-cta svg {
  transform: translateX(3px);
}
.kpi-fun:focus-visible {
  outline: 2px solid var(--kpi-color);
  outline-offset: 4px;
}

@keyframes kpiHaloPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
@keyframes kpiSpark {
  0%,
  100% {
    transform: translate(0, 0) scale(0.8);
  }
  50% {
    transform: translate(2px, -3px) scale(1.2);
  }
}

/* ════════════════════════════════════════════════════════════════════
   ¿Sabías que…? — cards divulgativas
   ════════════════════════════════════════════════════════════════════ */
.datos-curiosos-card {
  --kpi-color: #0e5e3a;
  --kpi-light: #ecfdf5;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
  background: var(--c-surface);
  border: 1px solid var(--c-border-soft);
  border-radius: 1.25rem;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.datos-curiosos-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 28px -10px color-mix(in srgb, var(--kpi-color) 25%, transparent);
}
.datos-curiosos-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  background: var(--kpi-light);
  color: var(--kpi-color);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.datos-curiosos-icon svg {
  width: 2rem;
  height: 2rem;
}
.datos-curiosos-card:hover .datos-curiosos-icon {
  transform: scale(1.08) rotate(-5deg);
}
.datos-curiosos-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--c-ink);
  line-height: 1.3;
}
.datos-curiosos-text {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--c-ink-muted);
}

@media (prefers-reduced-motion: reduce) {
  .kpi-fun,
  .kpi-fun-icon-bubble,
  .kpi-fun-icon-halo,
  .kpi-fun-spark,
  .kpi-fun-icon-svg,
  .datos-curiosos-card,
  .datos-curiosos-icon {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

/* ════════════════════════════════════════════════════════════════════
   Feature cards — Qué es el observatorio (centradas)
   ════════════════════════════════════════════════════════════════════ */
.feature-fun {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.25rem 1.5rem 2rem;
  border-radius: 1.5rem;
  text-decoration: none;
  color: inherit;
}
.feature-fun-icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  margin-bottom: 1.25rem;
  border-radius: 1.25rem;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.feature-fun:hover .feature-fun-icon-wrap {
  transform: scale(1.08) rotate(-3deg);
}
.feature-fun-icon {
  position: relative;
  z-index: 2;
  width: 2.5rem;
  height: 2.5rem;
}
.feature-fun-ring {
  position: absolute;
  inset: -10%;
  border-radius: 50%;
  border: 2px dashed currentColor;
  opacity: 0;
  animation: featureRing 12s linear infinite;
  color: rgba(14, 94, 58, 0.3);
}
.feature-fun:hover .feature-fun-ring {
  opacity: 0.45;
}
@keyframes featureRing {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .feature-fun-icon-wrap,
  .feature-fun-ring {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

/* ════════════════════════════════════════════════════════════════════
   Pasos "Cómo funciona" — icono + badge numerada
   ════════════════════════════════════════════════════════════════════ */
.step-fun-icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.5rem;
  height: 5.5rem;
  margin: 0 auto;
}
.step-fun-icon-bubble {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #0e5e3a 0%, #1a7a4e 100%);
  box-shadow: 0 8px 20px -6px rgba(14, 94, 58, 0.45);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.step-fun:hover .step-fun-icon-bubble {
  transform: scale(1.07) rotate(-3deg);
}
.step-fun-icon {
  position: relative;
  z-index: 2;
  width: 2.25rem;
  height: 2.25rem;
  color: #ffffff;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.step-fun:hover .step-fun-icon {
  transform: scale(1.1);
}
.step-fun-badge {
  position: absolute;
  bottom: -4px;
  right: -4px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--c-ink);
  background: var(--c-surface);
  border: 2px solid var(--c-border-soft);
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(14, 94, 58, 0.18);
}

@media (prefers-reduced-motion: reduce) {
  .step-fun-icon-bubble,
  .step-fun-icon {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

/* ════════════════════════════════════════════════════════════════════
   CIIEMAD / Cervantes Nájera — bloque protagonista
   ════════════════════════════════════════════════════════════════════ */
.ciiemad-section {
  background: linear-gradient(
    135deg,
    #042b1a 0%,
    #0a4a2d 35%,
    #0e5e3a 75%,
    #1a7a4e 100%
  );
  color: #ffffff;
}
.ciiemad-bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  opacity: 0.35;
}
.ciiemad-bg-blob--a {
  width: 480px;
  height: 480px;
  top: -160px;
  left: -160px;
  background: radial-gradient(
    circle,
    rgba(121, 193, 65, 0.85),
    transparent 70%
  );
}
.ciiemad-bg-blob--b {
  width: 520px;
  height: 520px;
  bottom: -200px;
  right: -200px;
  background: radial-gradient(
    circle,
    rgba(225, 29, 111, 0.55),
    transparent 70%
  );
}

.ciiemad-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #79c141;
  background: rgba(121, 193, 65, 0.15);
  border: 1px solid rgba(121, 193, 65, 0.25);
  border-radius: 9999px;
  backdrop-filter: blur(8px);
  width: fit-content;
}
.ciiemad-title {
  margin-top: 1.1rem;
  font-size: clamp(1.6rem, 2.6vw, 2.4rem);
  font-weight: 800;
  line-height: 1.18;
  color: #ffffff;
  letter-spacing: -0.02em;
}
.ciiemad-title-accent {
  background: linear-gradient(135deg, #c5e8d4 0%, #79c141 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ciiemad-lead {
  margin-top: 1rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.78);
  max-width: 38rem;
}

/* Collage de fotos del CIIEMAD */
.ciiemad-photo-grid {
  position: relative;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.75rem;
  aspect-ratio: 4 / 3;
  max-width: 100%;
}
.ciiemad-photo {
  position: relative;
  overflow: hidden;
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.4);
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.ciiemad-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.ciiemad-photo:hover img {
  transform: scale(1.06);
}
.ciiemad-photo--main {
  grid-row: 1 / span 2;
}
.ciiemad-photo-caption {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  right: 0.5rem;
  padding: 0.4rem 0.6rem;
  background: rgba(4, 43, 26, 0.85);
  color: #ffffff;
  font-size: 0.65rem;
  font-weight: 600;
  border-radius: 0.5rem;
  backdrop-filter: blur(6px);
}
.ciiemad-photo-badge {
  position: absolute;
  top: -1rem;
  right: -0.5rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  padding: 0.5rem;
  text-align: center;
  color: #042b1a;
  background: linear-gradient(135deg, #79c141 0%, #c5e8d4 100%);
  border: 3px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 8px 20px rgba(4, 43, 26, 0.45);
  animation: ciiemadBadgeFloat 5s ease-in-out infinite;
  will-change: transform;
}
@keyframes ciiemadBadgeFloat {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(-3deg);
  }
  50% {
    transform: translate3d(0, -8px, 0) rotate(3deg);
  }
}

/* Publicaciones grid */
.ciiemad-pub {
  --fun-color: #79c141;
  --fun-light: rgba(121, 193, 65, 0.15);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.85rem 0.95rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.9rem;
  text-decoration: none;
  color: #ffffff;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.3s ease, border-color 0.3s ease;
  backdrop-filter: blur(8px);
}
.ciiemad-pub:hover {
  transform: translate3d(0, -3px, 0);
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--fun-color);
}
.ciiemad-pub-year {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--fun-color);
}
.ciiemad-pub-type {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
}
.ciiemad-pub-title {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
}

/* KPIs académicos */
.ciiemad-kpi {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.85rem 0.5rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.85rem;
}
.ciiemad-kpi-val {
  font-size: 1.5rem;
  font-weight: 800;
  color: #79c141;
  letter-spacing: -0.02em;
  line-height: 1;
}
.ciiemad-kpi-lbl {
  margin-top: 0.35rem;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 768px) {
  .ciiemad-photo-grid {
    aspect-ratio: 16 / 11;
  }
  .ciiemad-photo-badge {
    width: 4rem;
    height: 4rem;
    top: -0.5rem;
    right: -0.25rem;
  }
  .ciiemad-photo-badge .text-xl {
    font-size: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ciiemad-photo,
  .ciiemad-photo img,
  .ciiemad-photo-badge,
  .ciiemad-pub {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

/* ════════════════════════════════════════════════════════════════════
   Roof cards — sección "Techos verdes destacados"
   ════════════════════════════════════════════════════════════════════ */
.roof-card {
  --fun-color: #0e5e3a;
  --fun-light: #ecfdf5;
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--c-surface);
  border: 1px solid var(--c-border-soft);
  border-radius: 1.25rem;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease;
}
.roof-card:hover {
  transform: translate3d(0, -6px, 0);
  border-color: var(--fun-color);
  box-shadow: 0 16px 32px -10px color-mix(in srgb, var(--fun-color) 30%, transparent),
    0 4px 12px rgba(0, 0, 0, 0.04);
}
.roof-card:focus-visible {
  outline: 2px solid var(--fun-color);
  outline-offset: 3px;
}

.roof-card-image-wrap {
  position: relative;
  height: 11rem;
  overflow: hidden;
  background: linear-gradient(135deg, var(--fun-light), var(--c-surface));
}
.roof-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.roof-card:hover .roof-card-image {
  transform: scale(1.08);
}
.roof-card-image-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--fun-color);
  opacity: 0.4;
}
.roof-card-image-fallback svg {
  width: 4rem;
  height: 4rem;
}
.roof-card-image-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.5) 100%);
  pointer-events: none;
}
.roof-card-tipo {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 2;
  display: inline-flex;
  padding: 0.25rem 0.7rem;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 0.02em;
  color: var(--fun-color);
  background: color-mix(in srgb, var(--c-surface) 92%, transparent);
  border-radius: 9999px;
  backdrop-filter: blur(8px);
}
.roof-card-estado {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.7rem;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: capitalize;
  color: #ffffff;
  background: rgba(4, 43, 26, 0.7);
  border-radius: 9999px;
  backdrop-filter: blur(8px);
}
.roof-card-estado-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: #79c141;
  box-shadow: 0 0 6px rgba(121, 193, 65, 0.8);
}

.roof-card-body {
  padding: 1.1rem 1.15rem 1.25rem;
}
.roof-card-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--c-ink);
  line-height: 1.3;
}
.roof-card-meta {
  margin-top: 0.45rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  font-weight: 600;
  /* Oscurecemos --fun-color para que cualquier tono cumpla WCAG AA sobre blanco. */
  color: color-mix(in srgb, var(--fun-color) 45%, #000 55%);
}
.roof-card-desc {
  margin-top: 0.5rem;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--c-ink-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.roof-card-cta {
  margin-top: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--fun-color);
  opacity: 0;
  transform: translate3d(0, 4px, 0);
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.roof-card-cta svg {
  width: 0.85rem;
  height: 0.85rem;
}
.roof-card:hover .roof-card-cta {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

@media (prefers-reduced-motion: reduce) {
  .roof-card,
  .roof-card-image,
  .roof-card-cta {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

/* ════════════════════════════════════════════════════════════════════
   Hero Home — capas de fondo
   ════════════════════════════════════════════════════════════════════ */
.hero-home {
  background: radial-gradient(
      ellipse 90% 60% at 50% 0%,
      rgba(26, 122, 78, 0.45) 0%,
      transparent 60%
    ),
    linear-gradient(
      160deg,
      #042b1a 0%,
      #0a4a2d 25%,
      #0e5e3a 55%,
      #1a7a4e 85%,
      #0e5e3a 100%
    );
}

.hero-home-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 50%;
  z-index: 0;
  filter: saturate(1.1) contrast(1.05) brightness(0.95);
  animation: heroPan 30s ease-in-out infinite alternate;
  will-change: transform;
}

.hero-home-tint {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
      180deg,
      rgba(4, 43, 26, 0.55) 0%,
      rgba(14, 94, 58, 0.5) 50%,
      rgba(4, 43, 26, 0.85) 100%
    ),
    linear-gradient(
      140deg,
      rgba(14, 94, 58, 0.45) 0%,
      rgba(26, 122, 78, 0.35) 100%
    );
  mix-blend-mode: multiply;
}

.hero-home-topo {
  position: absolute;
  inset: -10%;
  z-index: 2;
  background: repeating-radial-gradient(
      circle at 30% 40%,
      transparent 0,
      transparent 38px,
      rgba(121, 193, 65, 0.06) 38px,
      rgba(121, 193, 65, 0.06) 39px
    ),
    repeating-radial-gradient(
      circle at 75% 70%,
      transparent 0,
      transparent 52px,
      rgba(197, 232, 212, 0.05) 52px,
      rgba(197, 232, 212, 0.05) 53px
    );
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
  width: 600px;
  height: 600px;
  top: -180px;
  left: -120px;
  background: radial-gradient(
    circle,
    rgba(14, 94, 58, 0.85) 0%,
    rgba(14, 94, 58, 0) 70%
  );
  animation: heroLavaA 12s ease-in-out infinite;
}
.hero-home-orbs .orb--g2 {
  width: 500px;
  height: 500px;
  top: -60px;
  right: -100px;
  background: radial-gradient(
    circle,
    rgba(26, 122, 78, 0.75) 0%,
    rgba(26, 122, 78, 0) 70%
  );
  animation: heroLavaB 14s ease-in-out infinite;
}
.hero-home-orbs .orb--a1 {
  width: 380px;
  height: 380px;
  top: 30%;
  right: 25%;
  background: radial-gradient(
    circle,
    rgba(121, 193, 65, 0.5) 0%,
    rgba(121, 193, 65, 0) 70%
  );
  animation: heroLavaC 11s ease-in-out infinite;
  opacity: 0.45;
}

@keyframes heroPan {
  0% {
    transform: scale(1.04) translate3d(0, 0, 0);
  }
  100% {
    transform: scale(1.08) translate3d(-12px, -8px, 0);
  }
}
@keyframes heroDrift {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(-2%, -1%, 0) rotate(2deg);
  }
}
@keyframes heroLavaA {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(40px, 30px, 0) scale(1.05);
  }
}
@keyframes heroLavaB {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(-50px, 20px, 0) scale(0.95);
  }
}
@keyframes heroLavaC {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(20px, -15px, 0) scale(1.05);
  }
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
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s,
    border-color 0.3s, box-shadow 0.3s;
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
  color: #c5e8d4;
  transition: color 0.3s, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.hero-quick:hover .hero-quick-icon {
  color: #79c141;
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
  /* Mobile: más compacto para no desplazar el texto del hero */
  width: 220px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Por encima de photo(0), tint(1), topo(2) y orbs(3) del hero */
  z-index: 10;
}
@media (min-width: 1024px) {
  .hero-mascot-wrap {
    width: 320px;
    height: 360px;
  }
}

/* El wrapper de TechitoBlink (interno al componente) flota como bloque.
   z-index: 5 lo coloca POR ENCIMA de los hero-chip (z:3) — en mobile los
   chips quedan en los bordes del wrap y antes tapaban la cara. */
.hero-mascot-wrap :deep(.techito-blink-wrap) {
  position: relative;
  z-index: 5;
  animation: mascotFloat 5s ease-in-out infinite;
  will-change: transform;
}

.hero-mascot-img {
  /* Mobile: imagen más chica para que quepa en el wrap */
  width: 170px;
  height: 170px;
  object-fit: contain;
  cursor: pointer;
  filter: drop-shadow(0 12px 24px rgba(4, 43, 26, 0.45));
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@media (min-width: 1024px) {
  .hero-mascot-img {
    width: 240px;
    height: 240px;
  }
}
.hero-mascot-img:hover {
  transform: scale(1.04);
}

.hero-mascot-halo {
  position: absolute;
  inset: 50% 50% auto auto;
  width: 220px;
  height: 220px;
  margin-top: -110px;
  margin-right: -110px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(121, 193, 65, 0.45) 0%,
    rgba(121, 193, 65, 0) 70%
  );
  filter: blur(20px);
  z-index: 1;
  animation: mascotHalo 4s ease-in-out infinite alternate;
}
@media (min-width: 1024px) {
  .hero-mascot-halo {
    width: 320px;
    height: 320px;
    margin-top: -160px;
    margin-right: -160px;
  }
}

.hero-chip {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  /* Mobile: chip más compacto */
  padding: 0.35rem 0.6rem;
  border-radius: 0.65rem;
  background: rgba(4, 43, 26, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(4, 43, 26, 0.4);
  animation: chipFloat 4s ease-in-out infinite;
  will-change: transform;
  /* Compactar el contenido en mobile */
  font-size: 0.7em;
}
@media (min-width: 1024px) {
  .hero-chip {
    gap: 0.5rem;
    padding: 0.5rem 0.85rem;
    border-radius: 0.75rem;
    font-size: 1em;
  }
}

/* Posiciones de los chips — en mobile pegados al wrap para no salirse */
.hero-chip--ndvi {
  top: 0;
  right: 0;
  animation-delay: 0s;
}
.hero-chip--temp {
  bottom: 30%;
  left: 0;
  animation-delay: 1.3s;
}
.hero-chip--co2 {
  bottom: 0;
  right: 6%;
  animation-delay: 2.4s;
}
@media (min-width: 1024px) {
  .hero-chip--ndvi {
    top: 6%;
    right: -8%;
  }
  .hero-chip--temp {
    bottom: 22%;
    left: 80%;
  }
  .hero-chip--co2 {
    bottom: 4%;
    right: 4%;
  }
}

@keyframes mascotFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-12px) rotate(-1deg);
  }
}
@keyframes mascotHalo {
  0% {
    opacity: 0.7;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1.1);
  }
}
@keyframes chipFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* ════════════════════════════════════════════════════════════════════
   Techito speech bubble + pet easter egg
   ════════════════════════════════════════════════════════════════════ */
.speech-bubble {
  position: absolute;
  top: -8px;
  right: -28px;
  z-index: 5;
  background: var(--c-surface);
  border-radius: 14px;
  padding: 0.5rem 0.85rem;
  box-shadow: 0 6px 20px rgba(4, 43, 26, 0.25);
  opacity: 0;
  transform: translateY(8px) scale(0.85);
  transition: opacity 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
  white-space: nowrap;
}
.speech-bubble::after {
  /* Cola del bocadillo apuntando a la mascota */
  content: "";
  position: absolute;
  bottom: -8px;
  left: 24px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid var(--c-surface);
  filter: drop-shadow(0 2px 1px rgba(4, 43, 26, 0.1));
}
.speech-bubble.speech-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Variante ampliada con título + cuerpo (eslogan de Techito).
   Centrada arriba de la mascota con cola apuntando hacia abajo al centro. */
.speech-bubble--mensaje {
  /* Centrado horizontal vía left:50% + translate, posicionado arriba */
  top: -84px;
  left: 50%;
  right: auto;
  transform: translateX(-50%) translateY(8px) scale(0.85);
  max-width: 20rem;
  padding: 0.75rem 1rem;
  white-space: normal;
  text-align: center;
  border: 2px solid rgba(14, 94, 58, 0.18);
}
.speech-bubble--mensaje::after {
  /* Cola al centro del borde inferior */
  left: 50%;
  right: auto;
  bottom: -10px;
  transform: translateX(-50%);
  border-top-color: var(--c-surface);
}
.speech-bubble--mensaje.speech-visible {
  /* Importante: mantener el translateX cuando se vuelve visible */
  transform: translateX(-50%) translateY(0) scale(1);
}
.speech-bubble-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--c-primary, #0e5e3a);
  margin-bottom: 0.35rem;
  line-height: 1.2;
}
.speech-bubble-body {
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--c-ink, #1f2937);
  margin: 0;
}
@media (max-width: 768px) {
  /* Tablets: bocadillo más cerca y más estrecho */
  .speech-bubble--mensaje {
    top: -72px;
    max-width: 16rem;
  }
}
@media (max-width: 480px) {
  /* Mobile small: bocadillo todavía más compacto + tipografía reducida */
  .speech-bubble--mensaje {
    top: -64px;
    max-width: 14rem;
    padding: 0.55rem 0.75rem;
  }
  .speech-bubble--mensaje .speech-bubble-title {
    font-size: 0.78rem;
    margin-bottom: 0.25rem;
  }
  .speech-bubble--mensaje .speech-bubble-body {
    font-size: 0.72rem;
    line-height: 1.4;
  }
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
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.6);
  }
  20% {
    opacity: 1;
    transform: translateY(-20px) scale(1.1);
  }
  100% {
    opacity: 0;
    transform: translateY(-120px) scale(0.8) rotate(15deg);
  }
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
  0%,
  100% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-6deg) scale(1.04);
  }
  40% {
    transform: rotate(5deg) scale(1.04);
  }
  60% {
    transform: rotate(-4deg);
  }
  80% {
    transform: rotate(3deg);
  }
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
