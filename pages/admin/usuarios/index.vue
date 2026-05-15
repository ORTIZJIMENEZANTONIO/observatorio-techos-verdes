<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

interface AdminUser {
  id: string
  email: string
  name: string
  role: 'superadmin' | 'admin' | 'editor' | 'reviewer'
  permissions: string[]
  observatories?: string[]
  isActive?: boolean
  createdAt?: string
  lastLogin?: string | null
}

const { apiFetch } = useApi()
const config = useRuntimeConfig()
const toast = useToast()
const observatory = config.public.observatory as string
const auth = useAuthStore()

const items = ref<AdminUser[]>([])
const loading = ref(true)
const error = ref('')
const saving = ref(false)
const showForm = ref(false)
const editingId = ref<string | null>(null)

const allObservatories = [
  { slug: 'arrecifes', label: 'Arrecifes' },
  { slug: 'humedales', label: 'Humedales' },
  { slug: 'techos-verdes', label: 'Techos verdes' },
]

const allPermissions = [
  { key: 'manage_techos', label: 'Inventario de techos' },
  { key: 'manage_candidatos', label: 'Candidatos AHP' },
  { key: 'manage_validaciones', label: 'Validaciones' },
  { key: 'manage_prospectos', label: 'Prospectos' },
  { key: 'manage_cms', label: 'Contenido (blog/artículos)' },
  { key: 'manage_users', label: 'Gestión de usuarios' },
]

const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'editor' as AdminUser['role'],
  permissions: [] as string[],
  observatories: ['techos-verdes'] as string[],
  isActive: true,
})

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.password = ''
  form.role = 'editor'
  form.permissions = []
  form.observatories = ['techos-verdes']
  form.isActive = true
  editingId.value = null
}

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await apiFetch<{ success: boolean; items: AdminUser[] }>(`/observatory/${observatory}/admin/usuarios`)
    items.value = res.items || []
  } catch (e: any) {
    error.value = e?.data?.error?.message || 'No se pudieron cargar los usuarios'
  } finally {
    loading.value = false
  }
}

const startCreate = () => {
  resetForm()
  showForm.value = true
}

const startEdit = (u: AdminUser) => {
  editingId.value = u.id
  form.name = u.name
  form.email = u.email
  form.password = ''
  form.role = u.role
  form.permissions = [...(u.permissions || [])]
  form.observatories = [...(u.observatories || ['techos-verdes'])]
  form.isActive = u.isActive ?? true
  showForm.value = true
}

const cancel = () => {
  showForm.value = false
  resetForm()
}

const save = async () => {
  if (!form.name.trim() || !form.email.trim()) {
    error.value = 'Nombre y correo son obligatorios'
    return
  }
  if (!editingId.value && !form.password) {
    error.value = 'La contraseña es obligatoria al crear un usuario'
    return
  }
  saving.value = true
  error.value = ''
  const body: Record<string, unknown> = {
    name: form.name,
    email: form.email,
    role: form.role,
    permissions: form.role === 'superadmin'
      ? allPermissions.map((p) => p.key)
      : form.permissions,
    observatories: form.observatories,
    isActive: form.isActive,
  }
  if (form.password) body.password = form.password
  const isEdit = !!editingId.value
  try {
    if (editingId.value) {
      await apiFetch(`/observatory/${observatory}/admin/usuarios/${editingId.value}`, { method: 'PATCH', body })
    } else {
      await apiFetch(`/observatory/${observatory}/admin/usuarios`, { method: 'POST', body })
    }
    showForm.value = false
    resetForm()
    await load()
    toast.success(
      isEdit ? 'Usuario actualizado' : 'Usuario creado',
      `${body.name} · ${body.email}`,
    )
  } catch (e: any) {
    const msg = e?.data?.error?.message || 'No se pudo guardar el usuario'
    error.value = msg
    toast.errorFrom(e, msg, isEdit ? 'Error al actualizar' : 'Error al crear usuario')
  } finally {
    saving.value = false
  }
}

const remove = async (u: AdminUser) => {
  if (u.id === auth.admin?.id) {
    error.value = 'No puedes eliminar tu propia cuenta'
    toast.warning('Acción no permitida', 'No puedes eliminar tu propia cuenta')
    return
  }
  if (!confirm(`¿Eliminar al usuario "${u.name || u.email}"? Esta acción es permanente.`)) return
  try {
    await apiFetch(`/observatory/${observatory}/admin/usuarios/${u.id}`, { method: 'DELETE' })
    await load()
    toast.success('Usuario eliminado', `${u.name || u.email}`)
  } catch (e: any) {
    const msg = e?.data?.error?.message || 'No se pudo eliminar'
    error.value = msg
    toast.errorFrom(e, msg, 'Error al eliminar')
  }
}

const search = ref('')
const filterRole = ref<'all' | AdminUser['role']>('all')
const filterObservatory = ref<'all' | string>('all')
const filterStatus = ref<'all' | 'active' | 'inactive'>('all')

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return items.value.filter((u) => {
    if (q && !`${u.name} ${u.email}`.toLowerCase().includes(q)) return false
    if (filterRole.value !== 'all' && u.role !== filterRole.value) return false
    if (filterObservatory.value !== 'all' && !(u.observatories || []).includes(filterObservatory.value)) return false
    if (filterStatus.value === 'active' && u.isActive === false) return false
    if (filterStatus.value === 'inactive' && u.isActive !== false) return false
    return true
  })
})

const roleBadge = (role: string) => {
  if (role === 'superadmin') return 'bg-primary text-white'
  if (role === 'admin') return 'bg-eco/15 text-eco'
  if (role === 'reviewer') return 'bg-secondary/15 text-secondary-dark'
  return 'bg-gray-100 text-gray-700'
}

const roleLabel = (role: string) => {
  const labels: Record<string, string> = {
    superadmin: 'Superadmin',
    admin: 'Administrador',
    reviewer: 'Revisor',
    editor: 'Editor',
  }
  return labels[role] || role
}

const formatDate = (iso?: string | null) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: '2-digit' })
}

onMounted(load)
</script>

<template>
  <div class="space-y-5">
    <header class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 class="text-2xl font-semibold text-ink">Gestión de usuarios</h2>
        <p class="mt-1 text-sm text-gray-500">
          {{ auth.isSuperadmin
            ? 'Como superadmin ves a todos los usuarios de los tres observatorios.'
            : 'Cuentas con acceso al observatorio de techos verdes.' }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          @click="load"
          :disabled="loading"
        >
          Refrescar
        </button>
        <button
          v-if="auth.isSuperadmin"
          class="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-dark"
          @click="startCreate"
        >
          + Nuevo usuario
        </button>
      </div>
    </header>

    <div v-if="!auth.isSuperadmin" class="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      Sólo los superadministradores pueden crear o editar cuentas. Esta vista es de consulta para tu rol actual.
    </div>

    <div v-if="error" class="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{{ error }}</div>

    <div class="rounded-lg border border-gray-200 bg-white p-4">
      <div class="grid gap-3 md:grid-cols-4">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Buscar</label>
          <input v-model="search" class="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm" placeholder="Nombre o correo…" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Rol</label>
          <select v-model="filterRole" class="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm">
            <option value="all">Todos</option>
            <option value="superadmin">Superadmin</option>
            <option value="admin">Administrador</option>
            <option value="reviewer">Revisor</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Observatorio</label>
          <select v-model="filterObservatory" class="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm">
            <option value="all">Todos</option>
            <option v-for="o in allObservatories" :key="o.slug" :value="o.slug">{{ o.label }}</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Estatus</label>
          <select v-model="filterStatus" class="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm">
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>
      </div>
      <p class="mt-3 text-xs text-gray-500">{{ filtered.length }} de {{ items.length }} usuarios</p>
    </div>

    <div v-if="loading" class="text-sm text-gray-500">Cargando…</div>
    <div v-else-if="filtered.length === 0" class="rounded-lg border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
      No hay usuarios que coincidan con los filtros.
    </div>
    <div v-else class="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-xs font-semibold text-gray-600">
          <tr>
            <th class="px-4 py-3 text-left">Nombre</th>
            <th class="px-4 py-3 text-left">Correo</th>
            <th class="px-4 py-3 text-left">Rol</th>
            <th class="px-4 py-3 text-left">Observatorios</th>
            <th class="px-4 py-3 text-left">Permisos</th>
            <th class="px-4 py-3 text-left">Estatus</th>
            <th class="px-4 py-3 text-left">Último acceso</th>
            <th v-if="auth.isSuperadmin" class="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="u in filtered" :key="u.id">
            <td class="px-4 py-3 font-medium text-ink">{{ u.name }}</td>
            <td class="px-4 py-3 text-gray-600">{{ u.email }}</td>
            <td class="px-4 py-3">
              <span class="inline-block rounded-full px-2 py-0.5 text-xs font-medium" :class="roleBadge(u.role)">
                {{ roleLabel(u.role) }}
              </span>
            </td>
            <td class="px-4 py-3">
              <div class="flex flex-wrap gap-1">
                <span v-for="o in (u.observatories || [])" :key="o" class="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-700">{{ o }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-xs text-gray-500">{{ (u.permissions || []).length }} permisos</td>
            <td class="px-4 py-3">
              <span v-if="u.isActive === false" class="rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-700">Inactivo</span>
              <span v-else class="rounded-full bg-eco/15 px-2 py-0.5 text-xs text-eco">Activo</span>
            </td>
            <td class="px-4 py-3 text-xs text-gray-500">{{ formatDate(u.lastLogin) }}</td>
            <td v-if="auth.isSuperadmin" class="px-4 py-3 text-right">
              <button class="text-xs font-medium text-primary hover:underline" @click="startEdit(u)">Editar</button>
              <button class="ml-3 text-xs font-medium text-red-600 hover:underline" @click="remove(u)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Teleport to="body">
      <div
        v-if="showForm"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        @click.self="cancel"
      >
        <div class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-2xl">
          <header class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-ink">
              {{ editingId ? 'Editar usuario' : 'Nuevo usuario' }}
            </h3>
            <button class="text-gray-400 hover:text-ink" @click="cancel">✕</button>
          </header>

          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Nombre *</label>
              <input v-model="form.name" class="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="Nombre completo" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Correo *</label>
              <input v-model="form.email" type="email" class="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="usuario@ejemplo.com" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">
                {{ editingId ? 'Nueva contraseña (vacío = mantener)' : 'Contraseña *' }}
              </label>
              <input v-model="form.password" type="password" class="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="********" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Rol *</label>
              <select v-model="form.role" class="w-full rounded-md border border-gray-200 px-3 py-2 text-sm">
                <option value="editor">Editor</option>
                <option value="reviewer">Revisor</option>
                <option value="admin">Administrador</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>
          </div>

          <div class="mt-4">
            <label class="block text-xs font-medium text-gray-600 mb-2">Observatorios asignados</label>
            <div class="flex flex-wrap gap-3">
              <label v-for="o in allObservatories" :key="o.slug" class="flex items-center gap-2 text-sm">
                <input type="checkbox" :value="o.slug" v-model="form.observatories" class="rounded" />
                <span>{{ o.label }}</span>
              </label>
            </div>
          </div>

          <div v-if="form.role !== 'superadmin'" class="mt-4">
            <label class="block text-xs font-medium text-gray-600 mb-2">Permisos</label>
            <div class="grid gap-2 sm:grid-cols-2">
              <label v-for="p in allPermissions" :key="p.key" class="flex items-center gap-2 text-sm">
                <input type="checkbox" :value="p.key" v-model="form.permissions" class="rounded" />
                <span>{{ p.label }}</span>
              </label>
            </div>
          </div>

          <div class="mt-4">
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" v-model="form.isActive" class="rounded" />
              <span>Cuenta activa</span>
            </label>
          </div>

          <footer class="mt-6 flex items-center justify-end gap-2">
            <button class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 hover:bg-gray-50" @click="cancel">Cancelar</button>
            <button
              class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
              :disabled="saving"
              @click="save"
            >
              {{ saving ? 'Guardando…' : editingId ? 'Guardar cambios' : 'Crear usuario' }}
            </button>
          </footer>
        </div>
      </div>
    </Teleport>
  </div>
</template>
