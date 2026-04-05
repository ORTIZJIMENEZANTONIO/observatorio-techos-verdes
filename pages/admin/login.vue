<script setup lang="ts">
definePageMeta({ layout: 'default' })

const auth = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    navigateTo('/admin')
  } catch (e: any) {
    error.value = e?.data?.error?.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  auth.loadFromStorage()
  if (auth.isAuthenticated) navigateTo('/admin')
})
</script>

<template>
  <div class="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-white" />
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%230E5E3A&quot; fill-opacity=&quot;1&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');" />

    <div class="relative z-10 w-full max-w-md px-4">
      <div class="card p-8 shadow-panel">
        <div class="mb-6 text-center">
          <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-md transition-transform duration-300 hover:scale-105">
            <svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="text-xl font-semibold text-ink">Panel de Administración</h1>
          <p class="mt-1 text-sm text-slate-custom">Observatorio de Techos Verdes CDMX</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="mb-1 block text-sm font-medium text-ink">Correo electrónico</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              autocomplete="email"
              class="input w-full transition-shadow duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="admin@observatorio.cdmx"
            />
          </div>

          <div>
            <label for="password" class="mb-1 block text-sm font-medium text-ink">Contraseña</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              autocomplete="current-password"
              class="input w-full transition-shadow duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="********"
            />
          </div>

          <Transition name="slide-up">
            <div v-if="error" class="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              <svg class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ error }}
            </div>
          </Transition>

          <button
            type="submit"
            :disabled="loading"
            class="btn-primary w-full"
          >
            <svg v-if="loading" class="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ loading ? 'Ingresando...' : 'Iniciar sesión' }}
          </button>
        </form>
      </div>

      <p class="mt-6 text-center text-xs text-slate-custom/60">Acceso restringido a administradores autorizados</p>
    </div>
  </div>
</template>
