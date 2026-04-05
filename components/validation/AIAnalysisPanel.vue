<template>
  <div class="card overflow-hidden">
    <!-- Header -->
    <div class="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-secondary/5 to-eco/5 px-6 py-4">
      <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <div>
        <h3 class="text-base font-semibold text-ink">Analizar imagen con IA</h3>
        <p class="text-xs text-slate-custom">Gemini Vision evalua la aptitud del techo para TVLE</p>
      </div>
    </div>

    <div class="p-6">
      <!-- Upload area -->
      <div
        v-if="!previewUrl"
        class="relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 px-6 py-10 transition-colors hover:border-secondary/40 hover:bg-secondary/5"
        @click="triggerFileInput"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="handleDrop"
        :class="{ 'border-secondary bg-secondary/5': isDragging }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="mb-3 h-10 w-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p class="text-sm font-medium text-ink">Arrastra una imagen o haz clic para seleccionar</p>
        <p class="mt-1 text-xs text-slate-custom">JPG, PNG o WebP — imagen aerea, satelital o foto de azotea</p>
        <input
          ref="fileInput"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          class="hidden"
          @change="handleFileSelect"
        />
      </div>

      <!-- Preview + context form -->
      <div v-else class="space-y-4">
        <div class="relative overflow-hidden rounded-xl border border-gray-100">
          <img :src="previewUrl" alt="Imagen a analizar" class="h-48 w-full object-cover" />
          <button
            class="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors"
            title="Quitar imagen"
            @click="clearImage"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Optional context fields -->
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label class="mb-1 block text-xs font-medium text-slate-custom">Nombre del edificio</label>
            <input v-model="buildingName" type="text" class="input" placeholder="Ej. Hospital General de Mexico" />
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-slate-custom">Tipo de edificio</label>
            <select v-model="buildingType" class="select">
              <option value="">Seleccionar...</option>
              <option value="hospital">Hospital</option>
              <option value="mercado">Mercado</option>
              <option value="oficinas">Oficinas</option>
              <option value="educativo">Educativo</option>
              <option value="gobierno">Gobierno</option>
              <option value="residencial">Residencial</option>
              <option value="industrial">Industrial</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-slate-custom">Alcaldia</label>
            <select v-model="alcaldia" class="select">
              <option value="">Seleccionar...</option>
              <option v-for="a in alcaldias" :key="a" :value="a">{{ a }}</option>
            </select>
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-slate-custom">Superficie aprox. (m²)</label>
            <input v-model.number="superficie" type="number" class="input" placeholder="500" min="0" />
          </div>
        </div>

        <!-- Analyze button -->
        <button
          class="btn-primary w-full"
          :disabled="analyzing"
          @click="runAnalysis"
        >
          <span v-if="analyzing" class="flex items-center justify-center gap-2">
            <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
              <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" class="opacity-75" />
            </svg>
            Analizando con Gemini Vision...
          </span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
            Analizar con IA
          </span>
        </button>
      </div>

      <!-- Error -->
      <div v-if="error" class="mt-4 rounded-lg border border-alert/20 bg-alert/5 p-4">
        <p class="text-sm font-medium text-alert">Error en el analisis</p>
        <p class="mt-1 text-xs text-alert/80">{{ error }}</p>
      </div>

      <!-- Results -->
      <div v-if="lastResult" class="mt-6 space-y-4">
        <div class="flex items-center gap-2">
          <div class="h-1 w-1 rounded-full bg-eco" />
          <h4 class="text-sm font-semibold text-ink">Resultado del analisis</h4>
          <span :class="['badge ml-auto', confianzaBadge]">
            {{ lastResult.confianza.charAt(0).toUpperCase() + lastResult.confianza.slice(1) }} ({{ lastResult.porcentajeConfianza }}%)
          </span>
        </div>

        <!-- Aptitud score bar -->
        <div>
          <div class="flex items-end justify-between">
            <span class="text-xs font-medium text-slate-custom">Aptitud para techo verde</span>
            <span class="text-lg font-bold" :class="scoreColor">{{ lastResult.aptitudTechoVerde }}</span>
          </div>
          <div class="mt-1 h-2.5 overflow-hidden rounded-full bg-gray-100">
            <div
              class="h-full rounded-full transition-all duration-700"
              :class="scoreBarColor"
              :style="{ width: `${lastResult.aptitudTechoVerde}%` }"
            />
          </div>
        </div>

        <!-- Key findings grid -->
        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg bg-gray-50 p-3">
            <p class="text-xs text-slate-custom">Techo plano</p>
            <p class="mt-0.5 text-sm font-semibold" :class="lastResult.techoPlano ? 'text-eco' : 'text-alert'">
              {{ lastResult.techoPlano ? 'Si' : 'No' }}
            </p>
          </div>
          <div class="rounded-lg bg-gray-50 p-3">
            <p class="text-xs text-slate-custom">Material estimado</p>
            <p class="mt-0.5 text-sm font-semibold text-ink">{{ formatMaterial(lastResult.materialEstimado) }}</p>
          </div>
          <div class="rounded-lg bg-gray-50 p-3">
            <p class="text-xs text-slate-custom">Vegetacion existente</p>
            <p class="mt-0.5 text-sm font-semibold" :class="lastResult.vegetacionExistente ? 'text-eco' : 'text-slate-custom'">
              {{ lastResult.vegetacionExistente ? `Si (${lastResult.porcentajeVegetacion}%)` : 'No detectada' }}
            </p>
          </div>
          <div class="rounded-lg bg-gray-50 p-3">
            <p class="text-xs text-slate-custom">Area util estimada</p>
            <p class="mt-0.5 text-sm font-semibold text-ink">{{ lastResult.areaUtilEstimadaPct }}%</p>
          </div>
          <div class="rounded-lg bg-gray-50 p-3">
            <p class="text-xs text-slate-custom">Tipo recomendado</p>
            <p class="mt-0.5 text-sm font-semibold text-secondary">{{ formatTipo(lastResult.tipoRecomendado) }}</p>
          </div>
          <div v-if="lastResult.obstrucciones.length > 0" class="rounded-lg bg-gray-50 p-3">
            <p class="text-xs text-slate-custom">Obstrucciones</p>
            <p class="mt-0.5 text-sm font-medium text-accent">{{ lastResult.obstrucciones.join(', ') }}</p>
          </div>
        </div>

        <!-- Prediction text -->
        <div class="rounded-lg border border-eco/20 bg-eco/5 p-4">
          <p class="text-sm leading-relaxed text-ink">{{ lastResult.prediccion }}</p>
        </div>

        <!-- Observations -->
        <div v-if="lastResult.observaciones.length > 0">
          <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-custom">Observaciones</p>
          <ul class="space-y-1">
            <li v-for="(obs, i) in lastResult.observaciones" :key="i" class="flex items-start gap-2 text-sm text-slate-custom">
              <span class="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-secondary/40" />
              {{ obs }}
            </li>
          </ul>
        </div>

        <!-- Add to validation table -->
        <button
          class="btn-eco w-full"
          @click="addToValidation"
        >
          Agregar a tabla de validacion (pendiente de revision humana)
        </button>

        <p v-if="addedToTable" class="text-center text-xs text-eco">
          Registro #{{ addedRecordId }} agregado a la tabla de validacion.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RoofAnalysisResult } from '~/server/api/ai/analyze-roof.post'
import type { Alcaldia } from '~/types'

const { analyzing, lastResult, error, analyzeFromFile } = useVisionAI()
const validationStore = useValidationStore()

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const isDragging = ref(false)

const buildingName = ref('')
const buildingType = ref('')
const alcaldia = ref('')
const superficie = ref<number | undefined>(undefined)

const addedToTable = ref(false)
const addedRecordId = ref<number | null>(null)

const alcaldias: Alcaldia[] = [
  'Álvaro Obregón', 'Azcapotzalco', 'Benito Juárez', 'Coyoacán',
  'Cuajimalpa', 'Cuauhtémoc', 'Gustavo A. Madero', 'Iztacalco',
  'Iztapalapa', 'Magdalena Contreras', 'Miguel Hidalgo', 'Milpa Alta',
  'Tláhuac', 'Tlalpan', 'Venustiano Carranza', 'Xochimilco',
]

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files?.[0]) setFile(input.files[0])
}

function handleDrop(e: DragEvent) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) setFile(file)
}

function setFile(file: File) {
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
  // Reset results
  lastResult.value = null
  error.value = null
  addedToTable.value = false
}

function clearImage() {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  selectedFile.value = null
  previewUrl.value = null
  lastResult.value = null
  error.value = null
  addedToTable.value = false
}

async function runAnalysis() {
  if (!selectedFile.value) return
  addedToTable.value = false
  await analyzeFromFile(selectedFile.value, {
    buildingName: buildingName.value || undefined,
    buildingType: buildingType.value || undefined,
    alcaldia: alcaldia.value || undefined,
    superficie: superficie.value || undefined,
  })
}

function addToValidation() {
  if (!lastResult.value) return
  const record = validationStore.addAIRecord(lastResult.value, buildingName.value)
  addedToTable.value = true
  addedRecordId.value = record.id
}

// Badge / color helpers
const confianzaBadge = computed(() => {
  if (!lastResult.value) return ''
  const map: Record<string, string> = {
    alta: 'bg-eco/10 text-eco-dark',
    media: 'bg-accent/10 text-accent-dark',
    baja: 'bg-alert/10 text-alert',
  }
  return map[lastResult.value.confianza] || ''
})

const scoreColor = computed(() => {
  if (!lastResult.value) return 'text-ink'
  const s = lastResult.value.aptitudTechoVerde
  if (s >= 70) return 'text-eco'
  if (s >= 40) return 'text-accent'
  return 'text-alert'
})

const scoreBarColor = computed(() => {
  if (!lastResult.value) return 'bg-gray-300'
  const s = lastResult.value.aptitudTechoVerde
  if (s >= 70) return 'bg-eco'
  if (s >= 40) return 'bg-accent'
  return 'bg-alert'
})

function formatMaterial(m: string) {
  const map: Record<string, string> = {
    losa_concreto: 'Losa de concreto',
    losacero: 'Losacero',
    vigueta_bovedilla: 'Vigueta y bovedilla',
    lamina_metalica: 'Lamina metalica',
    lamina_asbesto: 'Lamina de asbesto',
    madera_teja: 'Madera/teja',
    desconocido: 'No determinado',
  }
  return map[m] || m
}

function formatTipo(t: string) {
  const map: Record<string, string> = {
    extensivo: 'Extensivo (TVLE)',
    'semi-intensivo': 'Semi-intensivo',
    intensivo: 'Intensivo',
    no_apto: 'No apto',
  }
  return map[t] || t
}
</script>
