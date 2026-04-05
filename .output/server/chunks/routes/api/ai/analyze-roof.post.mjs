import { d as defineEventHandler, c as createError, r as readBody, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const SYSTEM_PROMPT = `Eres un sistema experto en evaluaci\xF3n de techos para instalaci\xF3n de techos verdes (TVLE \u2014 Techo Verde Ligero Extensivo) en la Ciudad de M\xE9xico. Analizas im\xE1genes a\xE9reas/satelitales o fotograf\xEDas de azoteas.

Contexto t\xE9cnico:
- Un TVLE pesa ~100 kg/m\xB2 (carga m\xEDnima seg\xFAn NTC-CDMX 2017)
- Requiere techo plano o pendiente <15\xB0
- Materiales \xF3ptimos: losa de concreto, losacero, vigueta y bovedilla
- Obstrucciones comunes: equipos HVAC, tinacos, antenas, ductos, paneles solares
- La vegetaci\xF3n existente en el techo es se\xF1al positiva

Tu an\xE1lisis debe ser t\xE9cnico pero accesible. Responde SIEMPRE en espa\xF1ol.`;
function buildUserPrompt(ctx) {
  const parts = [
    "Analiza esta imagen de un techo/azotea y eval\xFAa su aptitud para instalar un techo verde ligero extensivo (TVLE)."
  ];
  if (ctx.buildingName) parts.push(`Edificio: ${ctx.buildingName}`);
  if (ctx.buildingType) parts.push(`Tipo: ${ctx.buildingType}`);
  if (ctx.alcaldia) parts.push(`Alcald\xEDa: ${ctx.alcaldia}`);
  if (ctx.superficie) parts.push(`Superficie reportada: ${ctx.superficie} m\xB2`);
  parts.push(`
Responde EXCLUSIVAMENTE con un JSON v\xE1lido (sin markdown, sin backticks) con esta estructura exacta:
{
  "techoPlano": boolean,
  "materialEstimado": "losa_concreto | losacero | vigueta_bovedilla | lamina_metalica | lamina_asbesto | madera_teja | desconocido",
  "vegetacionExistente": boolean,
  "porcentajeVegetacion": number (0-100),
  "obstrucciones": ["lista de obstrucciones visibles"],
  "aptitudTechoVerde": number (0-100, donde 100 = perfecto para TVLE),
  "tipoRecomendado": "extensivo | semi-intensivo | intensivo | no_apto",
  "areaUtilEstimadaPct": number (0-100, porcentaje del \xE1rea libre de obstrucciones),
  "prediccion": "Resumen en espa\xF1ol de 1-2 oraciones sobre la aptitud del techo",
  "confianza": "alta | media | baja",
  "porcentajeConfianza": number (0-100),
  "observaciones": ["lista de observaciones t\xE9cnicas relevantes"]
}`);
  return parts.join("\n");
}
function parseAndValidate(raw) {
  const cleaned = raw.replace(/```(?:json)?\s*/g, "").replace(/```\s*/g, "").trim();
  const parsed = JSON.parse(cleaned);
  parsed.aptitudTechoVerde = Math.max(0, Math.min(100, Number(parsed.aptitudTechoVerde) || 0));
  parsed.porcentajeConfianza = Math.max(0, Math.min(100, Number(parsed.porcentajeConfianza) || 50));
  parsed.porcentajeVegetacion = Math.max(0, Math.min(100, Number(parsed.porcentajeVegetacion) || 0));
  parsed.areaUtilEstimadaPct = Math.max(0, Math.min(100, Number(parsed.areaUtilEstimadaPct) || 0));
  if (!Array.isArray(parsed.obstrucciones)) parsed.obstrucciones = [];
  if (!Array.isArray(parsed.observaciones)) parsed.observaciones = [];
  const validConfianza = ["alta", "media", "baja"];
  if (!validConfianza.includes(parsed.confianza)) {
    parsed.confianza = parsed.porcentajeConfianza >= 80 ? "alta" : parsed.porcentajeConfianza >= 50 ? "media" : "baja";
  }
  const validTipo = ["extensivo", "semi-intensivo", "intensivo", "no_apto"];
  if (!validTipo.includes(parsed.tipoRecomendado)) parsed.tipoRecomendado = "extensivo";
  return parsed;
}
const analyzeRoof_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.geminiApiKey;
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "NUXT_GEMINI_API_KEY no est\xE1 configurada. Obt\xE9n una gratis en https://aistudio.google.com/apikey"
    });
  }
  const body = await readBody(event);
  if (!body.imageBase64) {
    throw createError({
      statusCode: 400,
      statusMessage: "Se requiere imageBase64 con la imagen codificada en base64."
    });
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_PROMPT
  });
  const mimeType = body.mimeType || "image/jpeg";
  const result = await model.generateContent([
    {
      inlineData: {
        mimeType,
        data: body.imageBase64
      }
    },
    buildUserPrompt(body)
  ]);
  const text = result.response.text();
  try {
    const analysis = parseAndValidate(text);
    return { ok: true, analysis };
  } catch (parseError) {
    return {
      ok: false,
      rawResponse: text,
      error: "No se pudo parsear la respuesta de Gemini como JSON."
    };
  }
});

export { analyzeRoof_post as default };
//# sourceMappingURL=analyze-roof.post.mjs.map
