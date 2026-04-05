<template>
  <footer class="bg-primary-800 text-white">
    <div class="container-wide section-padding">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        <!-- About column -->
        <div class="space-y-4">
          <div class="flex items-center gap-2.5">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-eco" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z" />
                <path d="M12.5 2C9.64 2 8 4.14 8 6.5c0 2.18 1.41 3.44 3.5 3.44.84 0 1.62-.25 2.28-.68" />
                <path d="M17 8c-.74-1.83-2.53-3-4.5-3" />
              </svg>
            </div>
            <div>
              <span class="text-sm font-bold leading-tight">Observatorio Techos Verdes</span>
              <span class="block text-[10px] font-medium uppercase tracking-wider text-eco">CDMX</span>
            </div>
          </div>
          <p class="text-sm leading-relaxed text-white/70">
            Plataforma de monitoreo y análisis de techos verdes en la Ciudad de México.
          </p>
          <div class="rounded-lg border border-white/10 bg-white/5 p-3">
            <p class="text-xs leading-relaxed text-white/60">
              <span class="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-accent">Aviso importante</span>
              Este observatorio muestra aptitud territorial y priorización espacial. La factibilidad estructural depende de dictámenes técnicos del inmueble.
            </p>
          </div>
        </div>

        <!-- Quick links -->
        <div>
          <h4 class="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
            Enlaces rápidos
          </h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-white/70 transition-colors duration-200 hover:text-eco"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact / Institutional -->
        <div>
          <h4 class="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
            Contacto e información
          </h4>
          <ul class="space-y-3 text-sm text-white/70">
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Ciudad de México, México</span>
            </li>
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>contacto@techosverdes.cdmx.gob.mx</span>
            </li>
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>Gobierno de la Ciudad de México</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Institutional logos -->
      <div class="mt-10 border-t border-white/10 pt-6">
        <div class="flex items-center justify-center gap-6 mb-4">
          <a href="https://www.ciiemad.ipn.mx/" target="_blank" rel="noopener noreferrer">
            <img src="/images/logo-ciiemad.png" alt="CIIEMAD - IPN" class="h-14 w-auto rounded-full bg-white p-1" />
          </a>
          <a href="https://www.ipn.mx/" target="_blank" rel="noopener noreferrer">
            <img src="/images/logo-ipn.svg" alt="Instituto Politécnico Nacional" class="h-12 w-auto brightness-0 invert" />
          </a>
        </div>
        <p class="text-center text-xs text-white/40">
          &copy; 2024 Observatorio de Techos Verdes CDMX. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const quickLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/mapa', label: 'Mapa interactivo' },
  { to: '/inventario', label: 'Inventario de techos' },
  { to: '/candidatos', label: 'Sitios candidatos' },
  { to: '/ia-validacion', label: 'Validación IA' },
  { to: '/indicadores', label: 'Indicadores' },
  { to: '/metodologia', label: 'Metodología y aptitud' },
  { to: '/sobre', label: 'Sobre el proyecto' },
]
</script>
