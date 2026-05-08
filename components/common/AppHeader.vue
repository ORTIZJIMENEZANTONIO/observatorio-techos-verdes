<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const route = useRoute()

const mobileOpen = ref(false)
const openDropdown = ref<string | null>(null)

interface NavLink {
  to: string
  label: string
  description?: string
}
interface NavGroup {
  key: string
  label: string
  links: NavLink[]
}

const navGroups: NavGroup[] = [
  {
    key: 'datos',
    label: 'Datos',
    links: [
      { to: '/inventario', label: 'Inventario', description: '57 techos verdes registrados en CDMX' },
      { to: '/candidatos', label: 'Candidatos', description: 'Sitios priorizados por aptitud territorial' },
      { to: '/mapa', label: 'Mapa interactivo', description: 'Visualización geoespacial con filtros' },
      { to: '/indicadores', label: 'Indicadores', description: 'Dashboards ambientales y territoriales' },
    ],
  },
  {
    key: 'conocimiento',
    label: 'Conocimiento',
    links: [
      { to: '/sobre', label: 'Sobre el observatorio', description: 'Propósito y alcance' },
      { to: '/metodologia', label: 'Metodología', description: 'Modelo AHP y pre-factibilidad' },
      { to: '/agenda-2030', label: 'Agenda 2030', description: 'Conexión con 7 ODS' },
      { to: '/referencias', label: 'Referencias', description: 'Marco académico, fuentes, bibliografía' },
    ],
  },
]

const isGroupActive = (g: NavGroup) => g.links.some((l) => route.path.startsWith(l.to))

const closeAll = () => {
  openDropdown.value = null
  mobileOpen.value = false
}

const toggleDropdown = (key: string) => {
  openDropdown.value = openDropdown.value === key ? null : key
}

watch(
  () => route.path,
  () => closeAll(),
)
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm"
  >
    <div class="container-wide">
      <div class="flex h-16 items-center gap-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 group shrink-0">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-active:scale-95"
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
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z" />
              <path d="M12.5 2C9.64 2 8 4.14 8 6.5c0 2.18 1.41 3.44 3.5 3.44.84 0 1.62-.25 2.28-.68" />
              <path d="M17 8c-.74-1.83-2.53-3-4.5-3" />
            </svg>
          </div>
          <div class="hidden sm:block">
            <span class="text-sm font-bold text-ink leading-tight"
              >Observatorio Techos Verdes</span
            >
            <span
              class="block text-[10px] font-medium uppercase tracking-wider text-primary"
              >CDMX</span
            >
          </div>
        </NuxtLink>

        <!-- Desktop Navigation (4 primary slots) -->
        <nav class="hidden lg:flex items-center gap-1 ml-2">
          <NuxtLink
            to="/"
            class="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors duration-200 hover:bg-primary-50 hover:text-primary"
            active-class="!bg-primary-50 !text-primary !font-semibold"
            exact-active-class="!bg-primary-50 !text-primary !font-semibold"
          >
            Inicio
          </NuxtLink>

          <!-- Dropdown groups -->
          <div
            v-for="group in navGroups"
            :key="group.key"
            class="relative"
            @mouseenter="openDropdown = group.key"
            @mouseleave="openDropdown = null"
          >
            <button
              type="button"
              class="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-primary-50 hover:text-primary"
              :class="
                isGroupActive(group) || openDropdown === group.key
                  ? 'bg-primary-50 text-primary font-semibold'
                  : 'text-ink-muted'
              "
              :aria-expanded="openDropdown === group.key"
              @click="toggleDropdown(group.key)"
            >
              {{ group.label }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 transition-transform"
                :class="openDropdown === group.key ? 'rotate-180' : ''"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <Transition name="dropdown">
              <div
                v-if="openDropdown === group.key"
                class="absolute left-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-card-hover"
              >
                <NuxtLink
                  v-for="link in group.links"
                  :key="link.to"
                  :to="link.to"
                  class="block border-b border-gray-50 px-4 py-3 transition-colors last:border-0 hover:bg-primary-50"
                  active-class="!bg-primary-50"
                >
                  <span class="block text-sm font-semibold text-ink">{{ link.label }}</span>
                  <span v-if="link.description" class="mt-0.5 block text-xs text-ink-muted">
                    {{ link.description }}
                  </span>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <NuxtLink
            to="/comunidad"
            class="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors duration-200 hover:bg-eco/10 hover:text-eco-dark"
            active-class="!bg-eco/10 !text-eco-dark !font-semibold"
          >
            Comunidad
          </NuxtLink>
        </nav>

        <!-- Spacer to push right group to the end -->
        <div class="flex-1" />

        <!-- Institutional logos (compact on mobile) -->
        <div class="hidden md:flex items-center gap-3">
          <a href="https://www.ciiemad.ipn.mx/" target="_blank" rel="noopener noreferrer" class="shrink-0">
            <img src="/images/logo-ciiemad.png" alt="CIIEMAD - IPN" class="h-9 w-auto" />
          </a>
          <a href="https://www.ipn.mx/" target="_blank" rel="noopener noreferrer" class="shrink-0">
            <img src="/images/logo-ipn.svg" alt="Instituto Politécnico Nacional" class="h-9 w-auto" />
          </a>
        </div>

        <!-- Right cluster: theme toggle + Comunidad CTA + mobile hamburger -->
        <div class="flex items-center gap-2">
          <CommonColorModeToggle />

          <NuxtLink
            to="/comunidad"
            class="hidden lg:inline-flex items-center gap-1.5 rounded-xl bg-eco px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-eco-light hover:shadow-md hover:shadow-eco/20"
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
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Aportar
          </NuxtLink>

          <!-- Mobile hamburger -->
          <button
            class="flex h-10 w-10 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-gray-100 lg:hidden"
            @click="mobileOpen = true"
            aria-label="Abrir menú"
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
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile slide-out menu -->
    <Teleport to="body">
      <Transition name="mobile-overlay">
        <div
          v-if="mobileOpen"
          class="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm lg:hidden"
          @click="mobileOpen = false"
        />
      </Transition>

      <Transition name="mobile-drawer">
        <div
          v-if="mobileOpen"
          class="fixed right-0 top-0 z-[101] flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl lg:hidden"
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-gray-100 px-4 py-4">
            <span class="text-sm font-bold text-ink">Menú</span>
            <button
              class="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-gray-100"
              @click="mobileOpen = false"
              aria-label="Cerrar menú"
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <!-- Mobile nav: Inicio + groups + Comunidad -->
          <nav class="flex-1 overflow-y-auto p-3">
            <NuxtLink
              to="/"
              class="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-primary-50 hover:text-primary"
              active-class="!bg-primary-50 !text-primary !font-semibold"
              exact-active-class="!bg-primary-50 !text-primary !font-semibold"
            >
              Inicio
            </NuxtLink>

            <div v-for="group in navGroups" :key="group.key" class="mt-3">
              <p class="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                {{ group.label }}
              </p>
              <NuxtLink
                v-for="link in group.links"
                :key="link.to"
                :to="link.to"
                class="block rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-primary-50 hover:text-primary"
                active-class="!bg-primary-50 !text-primary !font-semibold"
              >
                {{ link.label }}
              </NuxtLink>
            </div>

            <div class="mt-3 border-t border-gray-100 pt-3">
              <NuxtLink
                to="/comunidad"
                class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:bg-eco/10 hover:text-eco-dark"
                active-class="!bg-eco/10 !text-eco-dark"
              >
                Comunidad
              </NuxtLink>
            </div>
          </nav>

          <!-- Mobile CTA -->
          <div class="border-t border-gray-100 p-4 space-y-2">
            <NuxtLink
              to="/comunidad"
              class="btn-eco w-full justify-center"
              @click="mobileOpen = false"
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
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              Aportar al observatorio
            </NuxtLink>
            <NuxtLink
              to="/mapa"
              class="btn-outline w-full justify-center"
              @click="mobileOpen = false"
            >
              Explorar mapa
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.mobile-overlay-enter-active,
.mobile-overlay-leave-active {
  transition: opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.mobile-overlay-enter-from,
.mobile-overlay-leave-to {
  opacity: 0;
}

.mobile-drawer-enter-active {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.mobile-drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1);
}
.mobile-drawer-enter-from,
.mobile-drawer-leave-to {
  transform: translateX(100%);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.18s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
  transform-origin: top;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.95) translateY(-4px);
}
</style>
