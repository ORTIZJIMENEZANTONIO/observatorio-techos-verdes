import { defineStore, skipHydrate } from 'pinia'

type AdminRole = 'superadmin' | 'admin' | 'editor' | 'reviewer'

interface AdminInfo {
  id: string
  email: string
  name: string
  observatories: string[]
  role?: AdminRole
  permissions?: string[]
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const admin = ref<AdminInfo | null>(null)
  const isAuthenticated = computed(() => !!token.value)
  const isSuperadmin = computed(() => admin.value?.role === 'superadmin')

  function hasPermission(perm: string): boolean {
    if (!admin.value) return false
    if (admin.value.role === 'superadmin') return true
    return (admin.value.permissions || []).includes(perm)
  }

  function loadFromStorage() {
    if (import.meta.server) return
    const saved = localStorage.getItem('obs_token')
    const savedAdmin = localStorage.getItem('obs_admin')
    if (saved) token.value = saved
    if (savedAdmin) {
      try { admin.value = JSON.parse(savedAdmin) } catch { /* ignore */ }
    }
  }

  async function login(email: string, password: string) {
    const config = useRuntimeConfig()
    const res = await $fetch<{ success: boolean; data: { accessToken: string; refreshToken: string; admin: AdminInfo } }>(
      `${config.public.apiBaseUrl}/observatory/auth/login`,
      { method: 'POST', body: { email, password } }
    )
    // Superadmin tiene acceso transversal sin importar observatories[]
    if (
      res.data.admin.role !== 'superadmin' &&
      !res.data.admin.observatories.includes('techos-verdes')
    ) {
      throw new Error('Tu cuenta no tiene acceso al observatorio de techos verdes')
    }
    token.value = res.data.accessToken
    admin.value = res.data.admin
    if (!import.meta.server) {
      localStorage.setItem('obs_token', res.data.accessToken)
      localStorage.setItem('obs_admin', JSON.stringify(res.data.admin))
    }
  }

  function logout() {
    token.value = null
    admin.value = null
    if (!import.meta.server) {
      localStorage.removeItem('obs_token')
      localStorage.removeItem('obs_admin')
    }
    navigateTo('/admin/login')
  }

  return {
    token: skipHydrate(token),
    admin: skipHydrate(admin),
    isAuthenticated,
    isSuperadmin,
    hasPermission,
    login,
    logout,
    loadFromStorage,
  }
})
