<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

import { ROOFPEDIA_ALCALDIAS } from '~/composables/useRoofpedia'

useHead({ title: 'Roofpedia · Admin Observatorio' })

const analizadas = computed(() => ROOFPEDIA_ALCALDIAS.filter((a) => a.analizada))
const pendientes = computed(() => ROOFPEDIA_ALCALDIAS.filter((a) => !a.analizada))
</script>

<template>
  <div class="space-y-6">
    <header>
      <h2 class="text-2xl font-semibold text-ink">Roofpedia — Detección CNN de techos verdes</h2>
      <p class="mt-1 max-w-3xl text-sm text-ink-muted">
        Validación visual de las detecciones del modelo Roofpedia (U-Net ResNet34) sobre imágenes
        satelitales Mapbox z19. Para cada alcaldía analizada, revisa el side-by-side de
        cada detección y marca como válida, falso positivo o desconocida.
      </p>
    </header>

    <!-- Banner aviso -->
    <div class="rounded-card border border-accent/30 bg-accent/5 p-4">
      <div class="flex gap-3">
        <Icon name="lucide:alert-triangle" size="20" class="shrink-0 text-accent" />
        <div class="space-y-1 text-sm">
          <p class="font-semibold text-ink">Procesar una alcaldía nueva tiene costo</p>
          <p class="text-ink-muted">
            La descarga de tiles satelitales Mapbox a zoom 19 cobra <strong>$0.30 USD por cada 1,000 tiles</strong>
            post free-tier de 50,000/mes. Una alcaldía pequeña puede consumir el free-tier; una grande
            (Iztapalapa, GAM) puede costar $30–$80 USD. Antes de ejecutar, usa el estimador en la página de
            cada alcaldía para ver el costo previsto. La ejecución del modelo CNN se hace localmente —
            este admin solo orquesta la estimación y muestra resultados.
          </p>
        </div>
      </div>
    </div>

    <!-- Analizadas -->
    <section v-if="analizadas.length > 0">
      <div class="mb-3 flex items-baseline justify-between">
        <h3 class="text-base font-semibold text-ink">Alcaldías analizadas</h3>
        <span class="text-xs text-ink-muted">{{ analizadas.length }} de {{ ROOFPEDIA_ALCALDIAS.length }}</span>
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="a in analizadas"
          :key="a.slug"
          :to="`/admin/roofpedia/${a.slug}`"
          class="rounded-card border border-eco/30 bg-white p-4 shadow-card transition-all hover:border-eco hover:shadow-card-hover"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <h4 class="text-sm font-bold text-ink">{{ a.nombre }}</h4>
              <p class="mt-0.5 text-xs text-ink-muted">slug: {{ a.slug }}</p>
            </div>
            <span class="shrink-0 rounded-full bg-eco/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              Analizada
            </span>
          </div>
          <dl class="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div>
              <dt class="text-ink-muted">Detecciones</dt>
              <dd class="font-bold text-ink tabular-nums">{{ a.deteccionesCnn ?? '—' }}</dd>
            </div>
            <div>
              <dt class="text-ink-muted">Fecha</dt>
              <dd class="font-medium text-ink tabular-nums">{{ a.fechaAnalisis ?? '—' }}</dd>
            </div>
          </dl>
          <p class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
            Revisar detecciones
            <Icon name="lucide:arrow-right" size="12" />
          </p>
        </NuxtLink>
      </div>
    </section>

    <!-- Pendientes -->
    <section>
      <div class="mb-3 flex items-baseline justify-between">
        <h3 class="text-base font-semibold text-ink">Alcaldías pendientes</h3>
        <span class="text-xs text-ink-muted">{{ pendientes.length }} restantes</span>
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="a in pendientes"
          :key="a.slug"
          :to="`/admin/roofpedia/${a.slug}`"
          class="rounded-card border border-gray-200 bg-white p-4 transition-colors hover:border-primary/40"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <h4 class="text-sm font-bold text-ink">{{ a.nombre }}</h4>
              <p class="mt-0.5 text-xs text-ink-muted">slug: {{ a.slug }}</p>
            </div>
            <span class="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-muted">
              Pendiente
            </span>
          </div>
          <p class="mt-3 inline-flex items-center gap-1 text-xs text-ink-muted">
            Ver estimación de costo y comando
            <Icon name="lucide:arrow-right" size="12" />
          </p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
