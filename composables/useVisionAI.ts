import type { RoofAnalysisResult } from '~/server/api/ai/analyze-roof.post'

interface AnalyzeOptions {
  imageBase64: string
  mimeType?: string
  buildingName?: string
  buildingType?: string
  alcaldia?: string
  superficie?: number
}

interface AnalyzeResponse {
  ok: boolean
  analysis?: RoofAnalysisResult
  rawResponse?: string
  error?: string
}

export function useVisionAI() {
  const analyzing = ref(false)
  const lastResult = ref<RoofAnalysisResult | null>(null)
  const error = ref<string | null>(null)

  /**
   * Convert a File object to base64 string (without the data URI prefix).
   */
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        // Remove "data:image/jpeg;base64," prefix
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  /**
   * Analyze a roof image using Gemini Vision via the server endpoint.
   */
  async function analyzeRoof(options: AnalyzeOptions): Promise<RoofAnalysisResult | null> {
    analyzing.value = true
    error.value = null
    lastResult.value = null

    try {
      const response = await $fetch<AnalyzeResponse>('/api/ai/analyze-roof', {
        method: 'POST',
        body: {
          imageBase64: options.imageBase64,
          mimeType: options.mimeType || 'image/jpeg',
          buildingName: options.buildingName,
          buildingType: options.buildingType,
          alcaldia: options.alcaldia,
          superficie: options.superficie,
        },
      })

      if (response.ok && response.analysis) {
        lastResult.value = response.analysis
        return response.analysis
      } else {
        error.value = response.error || 'Error desconocido en el análisis.'
        return null
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error de conexión con el servidor.'
      // Surface Nitro error messages
      if (typeof e === 'object' && e !== null && 'data' in e) {
        const nitroErr = e as { data?: { statusMessage?: string } }
        error.value = nitroErr.data?.statusMessage || msg
      } else {
        error.value = msg
      }
      return null
    } finally {
      analyzing.value = false
    }
  }

  /**
   * Convenience: analyze from a File input.
   */
  async function analyzeFromFile(
    file: File,
    context?: Omit<AnalyzeOptions, 'imageBase64' | 'mimeType'>,
  ): Promise<RoofAnalysisResult | null> {
    const base64 = await fileToBase64(file)
    return analyzeRoof({
      imageBase64: base64,
      mimeType: file.type || 'image/jpeg',
      ...context,
    })
  }

  return {
    analyzing,
    lastResult,
    error,
    analyzeRoof,
    analyzeFromFile,
    fileToBase64,
  }
}
