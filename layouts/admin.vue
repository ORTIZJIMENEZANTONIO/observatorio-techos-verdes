<script setup lang="ts">
const route = useRoute()
const auth = useAuthStore()
auth.loadFromStorage()

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4', exact: true },
  { label: 'Prospectos', to: '/admin/prospectos', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Candidatos', to: '/admin/candidatos', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { label: 'Validaciones', to: '/admin/validaciones', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Inventario', to: '/admin/techos-verdes', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
]

function isActive(item: typeof navItems[number]) {
  if ((item as any).exact) return route.path === item.to
  return route.path.startsWith(item.to)
}

const sidebarOpen = ref(false)
const isLg = ref(false)

if (import.meta.client) {
  const mql = window.matchMedia('(min-width: 1024px)')
  isLg.value = mql.matches
  sidebarOpen.value = mql.matches
  mql.addEventListener('change', (e) => {
    isLg.value = e.matches
    sidebarOpen.value = e.matches
  })
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar: fixed on mobile, static on lg+ -->
    <aside
      class="fixed inset-y-0 left-0 z-40 flex w-64 flex-shrink-0 flex-col border-r border-gray-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex h-16 items-center gap-2 border-b border-gray-200 px-4">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <span class="text-sm font-semibold text-ink">Admin Panel</span>
      </div>

      <nav class="flex-1 space-y-1 px-3 py-4">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200"
          :class="isActive(item)
            ? 'bg-primary-50 text-primary shadow-sm'
            : 'text-gray-600 hover:bg-primary-50/50 hover:text-primary'"
          @click="!isLg && (sidebarOpen = false)"
        >
          <svg class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" :stroke-width="isActive(item) ? '2' : '1.5'">
            <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
          </svg>
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="border-t border-gray-200 p-4">
        <div class="mb-3 flex items-center gap-2">
          <div class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary">
            <ClientOnly>
              {{ auth.admin?.name?.charAt(0)?.toUpperCase() || auth.admin?.email?.charAt(0)?.toUpperCase() || 'A' }}
              <template #fallback>A</template>
            </ClientOnly>
          </div>
          <div class="min-w-0 flex-1">
            <ClientOnly>
              <p v-if="auth.admin?.name" class="truncate text-xs font-medium text-ink">{{ auth.admin?.name }}</p>
              <p class="truncate text-xs text-gray-500">{{ auth.admin?.email }}</p>
              <template #fallback><div class="h-4 w-24 rounded bg-gray-100" /></template>
            </ClientOnly>
          </div>
        </div>
        <NuxtLink
          to="/"
          class="mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Ver sitio público
        </NuxtLink>
        <button
          class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
          @click="auth.logout()"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar sesión
        </button>
      </div>
    </aside>

    <!-- Mobile overlay -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen && !isLg"
        class="fixed inset-0 z-30 bg-black/20"
        @click="sidebarOpen = false"
      />
    </Transition>

    <!-- Main content: min-w-0 prevents flexbox overflow from wide tables -->
    <div class="flex min-w-0 flex-1 flex-col">
      <header class="sticky top-0 z-20 flex h-16 flex-shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-4 lg:px-6">
        <button
          class="flex-shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          @click="sidebarOpen = !sidebarOpen"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 class="min-w-0 truncate text-sm font-semibold text-ink sm:text-lg">Observatorio de Techos Verdes — Admin</h1>
      </header>
      <main class="flex-1 overflow-x-hidden p-4 lg:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
