<script setup lang="ts">
useHead({
  title: 'Aprende sobre techos verdes — Observatorio CDMX',
  meta: [
    {
      name: 'description',
      content:
        'Introducción a los techos verdes en la Ciudad de México: qué son, cómo se construyen, sus tipologías y el caso experimental TVLE del CIIEMAD-IPN.',
    },
  ],
})

const { funPaths, funStyle } = useFunPalette()
const cms = useCmsContent('aprende')

interface HeroShape {
  eyebrow?: string
  title?: string
  subtitle?: string
}
interface IntroShape {
  title?: string
  subtitle?: string
  tag?: string
  paragraph1?: string
  paragraph2?: string
}
interface CapaShape {
  num: number
  nombre: string
  funcion: string
  color: 'eco' | 'teal' | 'accent' | 'rose' | 'indigo' | 'primary'
}
interface TipologiaShape {
  slug: string
  nombre: string
  pesoSaturado: string
  sustrato: string
  vegetacion: string
  mantenimiento: string
  uso: string
  color: 'eco' | 'secondary' | 'primary'
  icono: string
}
interface BeneficioShape {
  area: string
  dato: string
  desc: string
  color: 'eco' | 'secondary' | 'accent' | 'teal'
  icono: string
}
interface CasoDataShape {
  label: string
  valor: string
}
interface CasoIntroShape {
  title?: string
  subtitle?: string
  tag?: string
  body?: string
}
interface CtaShape {
  title?: string
  body?: string
}
interface GaleriaItem {
  src: string
  alt: string
  caption: string
}

const hero = cms.one<HeroShape>('hero')
const intro = cms.one<IntroShape>('intro')
const capas = cms.list<CapaShape>('capas')
const tipologias = cms.list<TipologiaShape>('tipologias')
const beneficios = cms.list<BeneficioShape>('beneficios')
const casoIntro = cms.one<CasoIntroShape>('casoIntro')
const casoCiiemad = cms.list<CasoDataShape>('casoCiiemad')
const galeriaCms = cms.list<GaleriaItem>('galeria')
const ctaFinal = cms.one<CtaShape>('cta')

// Default de la galería del techo CIIEMAD — editable desde
// /admin/contenido/aprende → Galería del techo verde.
// Mezcla fotos del PPTX divulgativo (jul 2023) + INFORME PARCIAL CIIEMAD
// + foto aérea de la tesis doctoral.
const galeriaDefault: GaleriaItem[] = [
  {
    src: '/images/tesis/techo-verde-ciiemad-panoramica.jpg',
    alt: 'Panorámica del techo verde del CIIEMAD con contexto urbano de Zacatenco',
    caption: 'Panorámica del techo verde con contexto urbano de Zacatenco',
  },
  {
    src: '/images/tesis/techo-verde-ciiemad-suculentas.jpg',
    alt: 'Echeverias y crasuláceas en el techo verde del CIIEMAD',
    caption: 'Detalle de echeverias y crasuláceas adaptadas al altiplano mexicano',
  },
  {
    src: '/images/tesis/techo-verde-ciiemad-echeverias-gravilla.jpg',
    alt: 'Echeverias separadas en cuadrícula sobre gravilla blanca, vista cenital',
    caption: 'Vista cenital: trazado de Echeverias sobre la capa drenante',
  },
  {
    src: '/images/tesis/techo-verde-ciiemad-modulo.jpg',
    alt: 'Módulo experimental del TVLE con cubierta vegetal mixta',
    caption: 'Módulo experimental con cubierta vegetal mixta',
  },
  {
    src: '/images/tesis/techo-verde-ciiemad-vegetacion-soleada.jpg',
    alt: 'Vegetación crasulácea creciendo sobre el techo del CIIEMAD bajo el sol',
    caption: 'Plantas crasuláceas creciendo en condiciones reales del altiplano',
  },
  {
    src: '/images/tesis/techo-verde-ciiemad-sedum-floracion.jpg',
    alt: 'Sedum en floración con cambio cromático verde a rojizo en el techo verde',
    caption: 'Sedum en floración — cambio cromático estacional',
  },
  {
    src: '/images/tesis/techo-verde-ciiemad-floracion.jpg',
    alt: 'Floración estacional en suculentas del techo verde',
    caption: 'Floración estacional en suculentas del techo',
  },
  {
    src: '/images/tesis/techo-verde-ciiemad-mantenimiento.jpg',
    alt: 'Equipo CIIEMAD durante trabajos de mantenimiento del techo verde',
    caption: 'Equipo CIIEMAD durante trabajos de mantenimiento',
  },
  {
    src: '/images/tesis/techo-verde-ciiemad-edificio.jpg',
    alt: 'Vista del techo verde con el edificio académico del CIIEMAD al fondo',
    caption: 'Vista del techo desde lo alto con el edificio académico al fondo',
  },
  {
    src: '/images/tesis/ciiemad-vista-aerea.png',
    alt: 'Vista aérea del edificio CIIEMAD-IPN mostrando la azotea del TVLE',
    caption: 'Vista aérea del CIIEMAD-IPN — localización del techo verde experimental',
  },
]
const galeria = computed<GaleriaItem[]>(() => (galeriaCms.value.length ? galeriaCms.value : galeriaDefault))

// Lightbox state — abre la imagen seleccionada en pantalla completa.
const lightboxIndex = ref<number | null>(null)
const openLightbox = (i: number) => { lightboxIndex.value = i }
const closeLightbox = () => { lightboxIndex.value = null }
const nextImg = () => {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value + 1) % galeria.value.length
}
const prevImg = () => {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value - 1 + galeria.value.length) % galeria.value.length
}

onMounted(() => {
  if (typeof window === 'undefined') return
  const onKey = (e: KeyboardEvent) => {
    if (lightboxIndex.value === null) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') nextImg()
    if (e.key === 'ArrowLeft') prevImg()
  }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))
})
</script>

<template>
  <div>
    <CommonHeroSection compact>
      <div class="max-w-3xl">
        <span class="mb-4 inline-flex items-center gap-2 rounded-badge bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-eco-light backdrop-blur-sm">
          {{ hero?.eyebrow || 'Aprende' }}
        </span>
        <h1 class="text-3xl font-extrabold leading-tight text-white md:text-5xl">
          {{ hero?.title || 'Techos verdes para personas comunes' }}
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
          {{ hero?.subtitle || 'Una guía breve y sin tecnicismos para entender qué es un techo verde, cómo se construye, qué tipos existen y por qué importan en la Ciudad de México.' }}
        </p>
        <div class="mt-6 flex flex-wrap gap-3 text-xs">
          <a href="#capas" class="rounded-full bg-white/10 px-3 py-1.5 font-medium text-white backdrop-blur-sm hover:bg-white/20">Las 6 capas</a>
          <a href="#tipologias" class="rounded-full bg-white/10 px-3 py-1.5 font-medium text-white backdrop-blur-sm hover:bg-white/20">Tipologías</a>
          <a href="#beneficios" class="rounded-full bg-white/10 px-3 py-1.5 font-medium text-white backdrop-blur-sm hover:bg-white/20">Beneficios</a>
          <a href="#caso-ciiemad" class="rounded-full bg-white/10 px-3 py-1.5 font-medium text-white backdrop-blur-sm hover:bg-white/20">Caso CIIEMAD</a>
        </div>
      </div>
    </CommonHeroSection>

    <!-- 1. ¿Qué es? -->
    <section class="bg-white py-10 md:py-14">
      <div class="container-narrow">
        <CommonSectionTitle
          :title="intro?.title || '¿Qué es un techo verde?'"
          :subtitle="intro?.subtitle || 'Un sistema constructivo que sustituye la grava o la impermeabilización expuesta por una cubierta vegetal viva sobre las azoteas.'"
          :tag="intro?.tag || 'Fundamento'"
          :centered="false"
        />
        <p v-if="intro?.paragraph1" class="mt-4 text-base leading-relaxed text-slate-custom" v-html="intro.paragraph1" />
        <p v-if="intro?.paragraph2" class="mt-3 text-base leading-relaxed text-slate-custom" v-html="intro.paragraph2" />
      </div>
    </section>

    <!-- 2. Las 6 capas -->
    <section id="capas" class="bg-surface py-12 md:py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="Las 6 capas, de abajo hacia arriba"
          subtitle="Cada capa cumple una función específica y trabajan juntas para sostener la vegetación a salvo de la lluvia, las raíces y el sol."
          tag="Anatomía"
          :centered="true"
        />
        <div class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <div class="overflow-hidden rounded-card bg-white shadow-card">
              <NuxtImg
                src="/images/tesis/capas-techo-verde.png"
                alt="Diagrama de las 6 capas de un techo verde"
                class="mx-auto w-full max-w-sm p-6"
                width="384"
                height="312"
                sizes="xs:320px sm:384px md:384px lg:384px"
                format="webp"
                loading="lazy"
              />
              <div class="border-t border-gray-100 px-4 py-2.5">
                <p class="text-[11px] text-slate-custom">
                  Imagen 2. Capas de un techo verde. Fuente: Cervantes Nájera (2021), CIIEMAD-IPN.
                </p>
              </div>
            </div>
          </div>
          <ol class="lg:col-span-7 space-y-3">
            <li
              v-for="capa in capas"
              :key="capa.num"
              class="flex gap-4 rounded-card border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:border-primary/30"
              :style="funStyle(capa.color)"
            >
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold text-white"
                :style="{ backgroundColor: 'var(--fun-color)' }"
              >
                {{ capa.num }}
              </span>
              <div>
                <h3 class="text-sm font-bold text-ink">{{ capa.nombre }}</h3>
                <p class="mt-1 text-sm leading-relaxed text-slate-custom">{{ capa.funcion }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- 3. Tipologías -->
    <section id="tipologias" class="bg-white py-12 md:py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="Tres tipologías para distintas azoteas"
          subtitle="La elección depende de la capacidad estructural del edificio y de cómo te imaginas usar la azotea."
          tag="Tipologías"
          :centered="true"
        />
        <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <article
            v-for="t in tipologias"
            :key="t.slug"
            class="fun-card"
            :style="funStyle(t.color)"
          >
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
                <path v-for="(d, i) in funPaths(t.icono)" :key="i" :d="d" />
              </svg>
            </div>
            <h3 class="fun-card-label">{{ t.nombre }}</h3>
            <dl class="mt-3 space-y-1.5 text-left text-xs leading-relaxed text-slate-custom">
              <div class="flex justify-between gap-3 border-b border-gray-100 pb-1">
                <dt class="font-medium text-ink-muted">Peso saturado</dt>
                <dd class="text-right font-semibold text-ink tabular-nums">{{ t.pesoSaturado }}</dd>
              </div>
              <div class="flex justify-between gap-3 border-b border-gray-100 pb-1">
                <dt class="font-medium text-ink-muted">Sustrato</dt>
                <dd class="text-right font-semibold text-ink tabular-nums">{{ t.sustrato }}</dd>
              </div>
              <div class="flex justify-between gap-3 border-b border-gray-100 pb-1">
                <dt class="font-medium text-ink-muted">Vegetación</dt>
                <dd class="text-right text-ink">{{ t.vegetacion }}</dd>
              </div>
              <div class="flex justify-between gap-3 border-b border-gray-100 pb-1">
                <dt class="font-medium text-ink-muted">Mantenimiento</dt>
                <dd class="text-right text-ink">{{ t.mantenimiento }}</dd>
              </div>
            </dl>
            <p class="mt-3 text-left text-xs leading-relaxed text-slate-custom">{{ t.uso }}</p>
          </article>
        </div>
        <p class="mt-6 text-center text-xs text-ink-muted">
          Cargas mínimas referenciadas en Normas Técnicas Complementarias para Diseño y Construcción de Estructuras (NTC-CDMX 2017) y validadas en Cervantes Nájera (2025), Tabla 6.
        </p>
      </div>
    </section>

    <!-- 4. Beneficios -->
    <section id="beneficios" class="bg-surface py-12 md:py-16">
      <div class="container-wide">
        <CommonSectionTitle
          title="¿Por qué importan los techos verdes?"
          subtitle="Más que un detalle estético: hay servicios ambientales medibles. Estos son los valores documentados por la investigación del CIIEMAD-IPN."
          tag="Beneficios"
          :centered="true"
        />
        <div class="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="b in beneficios"
            :key="b.area"
            class="fun-card"
            :style="funStyle(b.color)"
          >
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
                <path v-for="(d, i) in funPaths(b.icono)" :key="i" :d="d" />
              </svg>
            </div>
            <span class="fun-card-value">{{ b.dato }}</span>
            <h3 class="fun-card-label">{{ b.area }}</h3>
            <p class="fun-card-desc">{{ b.desc }}</p>
          </article>
        </div>
        <div class="mt-8 flex justify-center">
          <NuxtLink to="/agenda-2030" class="btn-outline">
            Ver conexión con los 7 ODS
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-1.5 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 5. Caso CIIEMAD — sección única consolidada del experimento + showcase -->
    <section id="caso-ciiemad" class="bg-white py-12 md:py-16">
      <div class="container-wide">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <!-- Columna izquierda: collage de 3 imágenes con badge -->
          <div class="lg:col-span-6">
            <div class="caso-photo-grid">
              <div class="caso-photo caso-photo--main">
                <NuxtImg
                  src="/images/tesis/tvle-ciiemad-foto.png"
                  alt="Techo verde ligero extensivo (TVLE) instalado en el CIIEMAD-IPN"
                  loading="lazy"
                  sizes="xs:400px sm:480px md:480px lg:480px"
                  format="webp"
                />
                <div class="caso-photo-caption">
                  TVLE del CIIEMAD-IPN · Cervantes Nájera (2025)
                </div>
              </div>
              <div class="caso-photo caso-photo--top">
                <NuxtImg
                  src="/images/tesis/ciiemad-cuadrantes.png"
                  alt="Cuadrantes monitoreados del techo verde CIIEMAD"
                  loading="lazy"
                  sizes="xs:240px sm:240px md:240px lg:240px"
                  format="webp"
                />
              </div>
              <div class="caso-photo caso-photo--bottom">
                <NuxtImg
                  src="/images/tesis/mapa-inventario-cdmx.png"
                  alt="Mapa inventario techos verdes CDMX"
                  loading="lazy"
                  sizes="xs:240px sm:240px md:240px lg:240px"
                  format="webp"
                />
              </div>
              <!-- Badge "100% sobrevivencia vegetal" -->
              <div class="caso-photo-badge">
                <span class="text-xl font-extrabold leading-none">100%</span>
                <span class="text-[10px] font-semibold uppercase tracking-wider leading-tight">sobrevivencia vegetal</span>
              </div>
            </div>
          </div>

          <!-- Columna derecha: título + body + datos del experimento -->
          <div class="lg:col-span-6">
            <CommonSectionTitle
              :title="casoIntro?.title || 'El techo verde del CIIEMAD-IPN'"
              :subtitle="casoIntro?.subtitle || '6 m² instalados en la azotea del CIIEMAD-IPN en Gustavo A. Madero. Monitoreado durante dos años por la M. en C. Ana Laura Cervantes Nájera.'"
              :tag="casoIntro?.tag || 'Caso protagonista'"
              :centered="false"
            />
            <p class="mt-3 text-sm leading-relaxed text-slate-custom">
              {{ casoIntro?.body || 'Es la prueba de concepto que sostiene este observatorio: un techo verde ligero extensivo construido con capa drenante de paja y fibra de coco —en lugar de las membranas plásticas de los sistemas comerciales— y monitoreado científicamente. La conclusión: el TVLE genera 94.8 % menos huella de carbono que la solución convencional y se paga en 18 meses.' }}
            </p>
            <dl class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div
                v-for="d in casoCiiemad"
                :key="d.label"
                class="rounded-lg border border-gray-100 bg-surface p-3"
              >
                <dt class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">{{ d.label }}</dt>
                <dd class="mt-1 text-sm font-bold text-ink">{{ d.valor }}</dd>
              </div>
            </dl>
            <div class="mt-6 flex flex-wrap gap-3">
              <NuxtLink to="/investigacion" class="btn-primary">Ver línea de investigación</NuxtLink>
              <NuxtLink to="/investigacion/documentos" class="btn-outline">Documentos descargables</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Galería del techo verde CIIEMAD (PPTX 2023) -->
        <div class="mt-14">
          <div class="mb-6 flex flex-wrap items-center gap-3">
            <span class="rounded-full bg-eco/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">Galería</span>
            <h3 class="text-xl font-bold text-ink md:text-2xl">El techo en operación</h3>
          </div>
          <p class="mb-6 max-w-3xl text-sm leading-relaxed text-slate-custom">
            Imágenes tomadas en el CIIEMAD-IPN durante el periodo de monitoreo (jul 2023): vegetación adaptada al altiplano, módulos experimentales y mantenimiento en sitio.
          </p>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <figure
              v-for="(g, i) in galeria"
              :key="g.src"
              class="caso-gallery-card"
              tabindex="0"
              role="button"
              :aria-label="`Ampliar: ${g.caption}`"
              @click="openLightbox(i)"
              @keydown.enter.prevent="openLightbox(i)"
              @keydown.space.prevent="openLightbox(i)"
            >
              <div class="caso-gallery-image-wrap">
                <NuxtImg
                  :src="g.src"
                  :alt="g.alt"
                  loading="lazy"
                  class="caso-gallery-image"
                  sizes="xs:400px sm:380px md:380px lg:400px"
                  format="webp"
                />
                <div class="caso-gallery-gradient" aria-hidden="true" />
                <span class="caso-gallery-num">#{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="caso-gallery-zoom" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </span>
              </div>
              <figcaption class="caso-gallery-caption">{{ g.caption }}</figcaption>
            </figure>
          </div>
          <p class="mt-4 text-[11px] italic text-ink-muted">
            Archivo CIIEMAD-IPN, julio 2023. Reproducidas con fines académicos en el marco de este observatorio.
          </p>
        </div>
      </div>
    </section>

    <!-- Lightbox modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="lightboxIndex !== null"
          class="caso-lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="`Imagen ${lightboxIndex + 1} de ${galeria.length}`"
          @click.self="closeLightbox"
        >
          <button class="caso-lightbox-close" aria-label="Cerrar" @click="closeLightbox">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <button class="caso-lightbox-nav caso-lightbox-nav--prev" aria-label="Anterior" @click.stop="prevImg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <figure class="caso-lightbox-content" @click.stop>
            <NuxtImg
              :src="galeria[lightboxIndex].src"
              :alt="galeria[lightboxIndex].alt"
              class="caso-lightbox-image"
              sizes="sm:600px md:900px lg:1200px"
              format="webp"
              loading="eager"
            />
            <figcaption class="caso-lightbox-caption">
              {{ galeria[lightboxIndex].caption }}
              <span class="caso-lightbox-counter">{{ lightboxIndex + 1 }} / {{ galeria.length }}</span>
            </figcaption>
          </figure>
          <button class="caso-lightbox-nav caso-lightbox-nav--next" aria-label="Siguiente" @click.stop="nextImg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>

    <!-- 6. CTAs finales -->
    <section class="bg-primary py-10 md:py-14">
      <div class="container-narrow text-center text-white">
        <h2 class="text-2xl font-bold md:text-3xl">{{ ctaFinal?.title || '¿Listo para profundizar?' }}</h2>
        <p class="mt-3 text-base text-white/80">
          {{ ctaFinal?.body || 'Explora los techos que ya existen en la ciudad, identifica zonas prioritarias o suma información a la red.' }}
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <NuxtLink to="/mapa" class="btn bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary-50">
            Ver el mapa
          </NuxtLink>
          <NuxtLink to="/inventario" class="btn border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
            Inventario completo
          </NuxtLink>
          <NuxtLink to="/comunidad" class="btn border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
            Sumarse a la comunidad
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Collage 3 fotos + badge del caso CIIEMAD. Mobile-first: en pantallas
   pequeñas las 3 fotos quedan apiladas; en md+ formamos el grid asimétrico
   (foto principal grande a la izquierda + 2 chicas a la derecha). */
.caso-photo-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}
.caso-photo {
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(4, 43, 26, 0.08);
  background: var(--c-surface, #F7F8F4);
}
.caso-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.caso-photo--main {
  aspect-ratio: 4 / 3;
}
.caso-photo--top,
.caso-photo--bottom {
  aspect-ratio: 16 / 10;
}
.caso-photo-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.45rem 0.75rem;
  font-size: 0.65rem;
  color: white;
  background: linear-gradient(to top, rgba(4, 43, 26, 0.85), transparent);
}
.caso-photo-badge {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 5rem;
  height: 5rem;
  padding: 0.4rem;
  border-radius: 9999px;
  background: var(--c-eco-light, #c4e498);
  color: var(--c-primary, #0E5E3A);
  border: 3px solid white;
  box-shadow: 0 6px 16px rgba(4, 43, 26, 0.18);
  z-index: 3;
}

@media (min-width: 640px) {
  /* tablets+: grid asimétrico — main 2 cols ancho, las dos chicas en columna */
  .caso-photo-grid {
    grid-template-columns: 1.6fr 1fr;
    grid-template-rows: auto auto;
  }
  .caso-photo--main {
    grid-row: 1 / span 2;
    aspect-ratio: 3 / 4;
  }
  .caso-photo--top {
    grid-column: 2;
    grid-row: 1;
  }
  .caso-photo--bottom {
    grid-column: 2;
    grid-row: 2;
  }
  .caso-photo-badge {
    top: 0.5rem;
    right: 0.5rem;
    bottom: auto;
    width: 4.5rem;
    height: 4.5rem;
  }
}

/* ─── Galería del techo CIIEMAD (PPTX 2023) ───
   Card clickeable que abre lightbox modal con prev/next + ESC. */
.caso-gallery-card {
  display: flex;
  flex-direction: column;
  background: var(--c-surface);
  border: 1px solid var(--c-border-soft);
  border-radius: 0.875rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.caso-gallery-card:hover,
.caso-gallery-card:focus-visible {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px -8px rgba(14, 94, 58, 0.18);
  border-color: var(--c-primary, #0E5E3A);
  outline: none;
}
.caso-gallery-image-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--c-surface-2);
}
.caso-gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.caso-gallery-card:hover .caso-gallery-image {
  transform: scale(1.06);
}
.caso-gallery-gradient {
  position: absolute;
  inset: auto 0 0 0;
  height: 50%;
  background: linear-gradient(to top, rgba(4, 43, 26, 0.45), transparent);
  pointer-events: none;
}
.caso-gallery-num {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  padding: 0.15rem 0.5rem;
  border-radius: 0.375rem;
  background: rgba(4, 43, 26, 0.55);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  backdrop-filter: blur(4px);
}
.caso-gallery-zoom {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--c-primary, #0E5E3A);
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.caso-gallery-zoom svg {
  width: 1rem;
  height: 1rem;
}
.caso-gallery-card:hover .caso-gallery-zoom,
.caso-gallery-card:focus-visible .caso-gallery-zoom {
  opacity: 1;
  transform: scale(1);
}
.caso-gallery-caption {
  padding: 0.75rem 1rem 1rem;
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--c-ink);
}

/* ─── Lightbox modal ─── */
.caso-lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(4, 43, 26, 0.92);
  backdrop-filter: blur(6px);
}
.caso-lightbox-content {
  position: relative;
  max-width: min(1100px, 95vw);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}
.caso-lightbox-image {
  max-width: 100%;
  max-height: 75vh;
  width: auto;
  height: auto;
  border-radius: 0.75rem;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  object-fit: contain;
  background: var(--c-surface-2);
}
.caso-lightbox-caption {
  margin-top: 1rem;
  padding: 0 1rem;
  text-align: center;
  color: white;
  font-size: 0.875rem;
  line-height: 1.4;
}
.caso-lightbox-counter {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 0.08em;
  font-weight: 600;
}
.caso-lightbox-close,
.caso-lightbox-nav {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}
.caso-lightbox-close:hover,
.caso-lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.05);
}
.caso-lightbox-close {
  top: 1rem;
  right: 1rem;
}
.caso-lightbox-nav--prev { left: 1rem; }
.caso-lightbox-nav--next { right: 1rem; }
@media (max-width: 640px) {
  .caso-lightbox { padding: 0.75rem; }
  .caso-lightbox-image { max-height: 65vh; }
  .caso-lightbox-close,
  .caso-lightbox-nav {
    width: 2.25rem;
    height: 2.25rem;
  }
  .caso-lightbox-close { top: 0.5rem; right: 0.5rem; }
  .caso-lightbox-nav--prev { left: 0.5rem; }
  .caso-lightbox-nav--next { right: 0.5rem; }
}

/* Fade transition para el lightbox */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
