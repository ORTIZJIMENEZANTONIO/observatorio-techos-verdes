import { GoogleGenerativeAI } from '@google/generative-ai'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AnalyzeRequest {
  imageBase64: string       // base64-encoded image (no data URI prefix)
  mimeType?: string         // default: image/jpeg
  buildingName?: string
  buildingType?: string
  alcaldia?: string
  superficie?: number
}

export interface RoofAnalysisResult {
  techoPlano: boolean
  materialEstimado: string
  vegetacionExistente: boolean
  porcentajeVegetacion: number
  obstrucciones: string[]
  aptitudTechoVerde: number            // 0-100
  tipoRecomendado: 'extensivo' | 'semi-intensivo' | 'intensivo' | 'no_apto'
  areaUtilEstimadaPct: number          // % of total area usable
  prediccion: string                   // Natural language summary
  confianza: 'alta' | 'media' | 'baja'
  porcentajeConfianza: number          // 0-100
  observaciones: string[]
}

// ---------------------------------------------------------------------------
// Prompt
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `Eres un sistema experto en evaluación de techos para instalación de techos verdes (TVLE — Techo Verde Ligero Extensivo) en la Ciudad de México. Analizas imágenes aéreas/satelitales o fotografías de azoteas.

Contexto técnico:
- Un TVLE pesa ~100 kg/m² (carga mínima según NTC-CDMX 2017)
- Requiere techo plano o pendiente <15°
- Materiales óptimos: losa de concreto, losacero, vigueta y bovedilla
- Obstrucciones comunes: equipos HVAC, tinacos, antenas, ductos, paneles solares
- La vegetación existente en el techo es señal positiva

Tu análisis debe ser técnico pero accesible. Responde SIEMPRE en español.`

function buildUserPrompt(ctx: Partial<AnalyzeRequest>): string {
  const parts: string[] = [
    'Analiza esta imagen de un techo/azotea y evalúa su aptitud para instalar un techo verde ligero extensivo (TVLE).',
  ]

  if (ctx.buildingName) parts.push(`Edificio: ${ctx.buildingName}`)
  if (ctx.buildingType) parts.push(`Tipo: ${ctx.buildingType}`)
  if (ctx.alcaldia) parts.push(`Alcaldía: ${ctx.alcaldia}`)
  if (ctx.superficie) parts.push(`Superficie reportada: ${ctx.superficie} m²`)

  parts.push(`
Responde EXCLUSIVAMENTE con un JSON válido (sin markdown, sin backticks) con esta estructura exacta:
{
  "techoPlano": boolean,
  "materialEstimado": "losa_concreto | losacero | vigueta_bovedilla | lamina_metalica | lamina_asbesto | madera_teja | desconocido",
  "vegetacionExistente": boolean,
  "porcentajeVegetacion": number (0-100),
  "obstrucciones": ["lista de obstrucciones visibles"],
  "aptitudTechoVerde": number (0-100, donde 100 = perfecto para TVLE),
  "tipoRecomendado": "extensivo | semi-intensivo | intensivo | no_apto",
  "areaUtilEstimadaPct": number (0-100, porcentaje del área libre de obstrucciones),
  "prediccion": "Resumen en español de 1-2 oraciones sobre la aptitud del techo",
  "confianza": "alta | media | baja",
  "porcentajeConfianza": number (0-100),
  "observaciones": ["lista de observaciones técnicas relevantes"]
}`)

  return parts.join('\n')
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function parseAndValidate(raw: string): RoofAnalysisResult {
  // Strip markdown code fences if present
  const cleaned = raw.replace(/```(?:json)?\s*/g, '').replace(/```\s*/g, '').trim()
  const parsed = JSON.parse(cleaned)

  // Clamp numeric values
  parsed.aptitudTechoVerde = Math.max(0, Math.min(100, Number(parsed.aptitudTechoVerde) || 0))
  parsed.porcentajeConfianza = Math.max(0, Math.min(100, Number(parsed.porcentajeConfianza) || 50))
  parsed.porcentajeVegetacion = Math.max(0, Math.min(100, Number(parsed.porcentajeVegetacion) || 0))
  parsed.areaUtilEstimadaPct = Math.max(0, Math.min(100, Number(parsed.areaUtilEstimadaPct) || 0))

  // Ensure arrays
  if (!Array.isArray(parsed.obstrucciones)) parsed.obstrucciones = []
  if (!Array.isArray(parsed.observaciones)) parsed.observaciones = []

  // Validate enums
  const validConfianza = ['alta', 'media', 'baja']
  if (!validConfianza.includes(parsed.confianza)) {
    parsed.confianza = parsed.porcentajeConfianza >= 80 ? 'alta' : parsed.porcentajeConfianza >= 50 ? 'media' : 'baja'
  }

  const validTipo = ['extensivo', 'semi-intensivo', 'intensivo', 'no_apto']
  if (!validTipo.includes(parsed.tipoRecomendado)) parsed.tipoRecomendado = 'extensivo'

  return parsed as RoofAnalysisResult
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.geminiApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'NUXT_GEMINI_API_KEY no está configurada. Obtén una gratis en https://aistudio.google.com/apikey',
    })
  }

  const body = await readBody<AnalyzeRequest>(event)

  if (!body.imageBase64) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Se requiere imageBase64 con la imagen codificada en base64.',
    })
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: SYSTEM_PROMPT,
  })

  const mimeType = body.mimeType || 'image/jpeg'

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType,
        data: body.imageBase64,
      },
    },
    buildUserPrompt(body),
  ])

  const text = result.response.text()

  try {
    const analysis = parseAndValidate(text)
    return { ok: true, analysis }
  } catch (parseError) {
    // If JSON parse fails, return the raw text so the client can display it
    return {
      ok: false,
      rawResponse: text,
      error: 'No se pudo parsear la respuesta de Gemini como JSON.',
    }
  }
})
