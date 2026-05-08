<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-surface via-surface to-primary-50/40">
    <!-- Decorative background pattern -->
    <div class="absolute inset-0 opacity-[0.03]">
      <svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="#0E5E3A" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
    </div>

    <!-- Decorative gradient blob -->
    <div class="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-eco/10 to-primary/5 blur-3xl" />
    <div class="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-secondary/8 to-eco/5 blur-3xl" />

    <div class="container-wide relative">
      <div class="flex min-h-[calc(100vh-4rem)] items-center py-16 md:py-18 lg:py-15">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <!-- Left content -->
          <div class="max-w-xl">
            <!-- Tag -->
            <span class="mb-4 inline-flex items-center gap-1.5 rounded-badge bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary animate-fade-in">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z" />
              </svg>
              Plataforma abierta
            </span>

            <!-- Title -->
            <h1 class="text-4xl font-extrabold tracking-tight text-ink md:text-5xl lg:text-6xl animate-slide-up delay-100">
              Observatorio de
              <br />
              <span class="text-gradient-primary">Techos Verdes</span>
            </h1>

            <!-- Subtitle -->
            <p class="mt-2 text-xl font-semibold text-eco md:text-2xl animate-slide-up delay-200">
              Ciudad de México
            </p>

            <!-- Description -->
            <p class="mt-5 text-base leading-relaxed text-slate-custom md:text-lg animate-slide-up delay-300">
              Plataforma integral de monitoreo, análisis geoespacial y validación de techos verdes para una ciudad más sustentable y resiliente.
            </p>

            <!-- CTA buttons -->
            <div class="mt-8 flex flex-wrap gap-3 animate-slide-up delay-400">
              <NuxtLink to="/mapa" class="btn-primary btn-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
                Explorar mapa
              </NuxtLink>
              <NuxtLink to="/metodologia" class="btn-outline btn-lg">
                Ver metodología
              </NuxtLink>
            </div>

            <!-- Quick stat chips -->
            <div class="mt-8 flex flex-wrap gap-2 animate-fade-in delay-500">
              <span
                v-for="stat in quickStats"
                :key="stat.label"
                class="inline-flex items-center gap-1.5 rounded-badge border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-sm"
              >
                <span class="h-1.5 w-1.5 rounded-full" :class="stat.dotColor" />
                {{ stat.label }}
              </span>
            </div>
          </div>

          <!-- Right decorative element -->
          <div class="hidden lg:flex lg:items-center lg:justify-center">
            <div class="relative">
              <!-- Abstract green gradient card -->
              <div class="h-96 w-96 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-light to-eco shadow-2xl animate-gradient-shift">
                <!-- Grid overlay -->
                <svg class="h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="hero-detail-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" stroke-width="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hero-detail-grid)" />
                </svg>

                <!-- Central icon -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z" />
                      <path d="M12.5 2C9.64 2 8 4.14 8 6.5c0 2.18 1.41 3.44 3.5 3.44.84 0 1.62-.25 2.28-.68" />
                      <path d="M17 8c-.74-1.83-2.53-3-4.5-3" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Floating stat cards -->
              <div class="absolute -left-8 top-8 rounded-xl bg-white p-3 shadow-card-hover animate-bounce-in delay-300 animate-float" style="animation: bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both, float 6s ease-in-out 1s infinite;">
                <div class="text-lg font-bold text-primary">57</div>
                <div class="text-[10px] font-medium text-slate-custom">Techos registrados</div>
              </div>
              <div class="absolute -right-6 bottom-12 rounded-xl bg-white p-3 shadow-card-hover" style="animation: bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both, float 7s ease-in-out 1.5s infinite;">
                <div class="text-lg font-bold text-eco-dark">81,075</div>
                <div class="text-[10px] font-medium text-slate-custom">m² identificados</div>
              </div>
              <div class="absolute -bottom-4 left-12 rounded-xl bg-white p-3 shadow-card-hover" style="animation: bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s both, float 5s ease-in-out 2s infinite;">
                <div class="text-lg font-bold text-secondary">60</div>
                <div class="text-[10px] font-medium text-slate-custom">Sitios priorizados</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const quickStats = [
  { label: '57 techos registrados', dotColor: 'bg-primary' },
  { label: '81,075 m² identificados', dotColor: 'bg-eco' },
  { label: '60 sitios priorizados', dotColor: 'bg-secondary' },
]
</script>
