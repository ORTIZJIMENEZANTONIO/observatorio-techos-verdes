<script setup lang="ts">
interface Highlight {
  tag?: string
  venue?: string
  anio?: string
  autores?: string
  titulo?: string
  descripcion?: string
  doi?: string
  kpi1Value?: string
  kpi1Label?: string
  kpi2Value?: string
  kpi2Label?: string
  kpi3Value?: string
  kpi3Label?: string
  ctaLabel?: string
  ctaTo?: string
}

defineProps<{
  highlight: Highlight | null
}>()
</script>

<template>
  <section v-if="highlight" class="bg-surface py-12 md:py-16">
    <div class="container-wide">
      <div class="overflow-hidden rounded-card border border-primary/15 bg-white shadow-card">
        <div class="grid grid-cols-1 lg:grid-cols-5">
          <div class="lg:col-span-3 p-6 md:p-10">
            <div class="flex flex-wrap items-center gap-2">
              <span class="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                {{ highlight.tag || 'Publicación destacada' }}
              </span>
              <span v-if="highlight.anio" class="rounded-full bg-primary-50 px-3 py-1 text-[10px] font-bold tabular-nums text-primary">
                {{ highlight.anio }}
              </span>
              <span v-if="highlight.venue" class="text-[11px] italic text-ink-muted">{{ highlight.venue }}</span>
            </div>
            <h2 class="mt-4 text-xl font-bold leading-snug text-ink md:text-2xl">
              {{ highlight.titulo }}
            </h2>
            <p v-if="highlight.autores" class="mt-2 text-sm text-ink-muted">{{ highlight.autores }}</p>
            <p v-if="highlight.descripcion" class="mt-4 text-sm leading-relaxed text-slate-custom md:text-base">
              {{ highlight.descripcion }}
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <a
                v-if="highlight.doi"
                :href="`https://doi.org/${highlight.doi}`"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary-100"
              >
                DOI: {{ highlight.doi }}
              </a>
              <NuxtLink
                v-if="highlight.ctaTo"
                :to="highlight.ctaTo"
                class="btn-primary"
              >
                {{ highlight.ctaLabel || 'Ver más' }}
                <svg xmlns="http://www.w3.org/2000/svg" class="ml-1.5 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </NuxtLink>
            </div>
          </div>
          <aside class="lg:col-span-2 bg-primary p-6 text-white md:p-10">
            <p class="text-[10px] font-semibold uppercase tracking-wider text-eco-light">
              Datos del estudio
            </p>
            <dl class="mt-6 space-y-5">
              <div v-if="highlight.kpi1Value">
                <dt class="text-xs uppercase tracking-wider text-white/70">{{ highlight.kpi1Label }}</dt>
                <dd class="mt-1 text-3xl font-extrabold tabular-nums text-white md:text-4xl">{{ highlight.kpi1Value }}</dd>
              </div>
              <div v-if="highlight.kpi2Value">
                <dt class="text-xs uppercase tracking-wider text-white/70">{{ highlight.kpi2Label }}</dt>
                <dd class="mt-1 text-3xl font-extrabold tabular-nums text-white md:text-4xl">{{ highlight.kpi2Value }}</dd>
              </div>
              <div v-if="highlight.kpi3Value">
                <dt class="text-xs uppercase tracking-wider text-white/70">{{ highlight.kpi3Label }}</dt>
                <dd class="mt-1 text-3xl font-extrabold tabular-nums text-white md:text-4xl">{{ highlight.kpi3Value }}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  </section>
</template>
