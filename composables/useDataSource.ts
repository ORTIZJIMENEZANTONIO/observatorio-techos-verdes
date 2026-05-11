import { useRuntimeConfig } from "nuxt/app";
import { computed } from "vue";
import type { DataSourceName } from "~/types/sources";

export function useDataSource() {
  const config = useRuntimeConfig();
  const dataMode = computed(() => config.public.dataMode as string);
  const isOfficial = computed(() => dataMode.value === "official");
  const isMock = computed(() => dataMode.value !== "official");

  const disclaimerText = computed(() => {
    if (isOfficial.value) {
      return "Los datos mostrados provienen de fuentes oficiales del Gobierno de la Ciudad de México. La información se actualiza periódicamente.";
    }
    return "Los datos mostrados son de demostración y no representan información oficial. La plataforma está diseñada para integrarse con fuentes oficiales de la CDMX.";
  });

  function getSourceLabel(sourceName: DataSourceName): string {
    const labels: Record<DataSourceName, string> = {
      SIGCDMX: "Sistema de Información Geográfica CDMX",
      SEDEMA: "Secretaría del Medio Ambiente CDMX",
      SIMAT: "Sistema de Monitoreo Atmosférico",
      INEGI: "Instituto Nacional de Estadística y Geografía",
      DatosAbiertos: "Portal de Datos Abiertos CDMX",
      CONABIO:
        "Comisión Nacional para el Conocimiento y Uso de la Biodiversidad",
      CONAGUA: "Comisión Nacional del Agua",
      SEMARNAT: "Secretaría de Medio Ambiente y Recursos Naturales",
      Mock: "Datos de demostración",
      Calculado: "Dato derivado/calculado",
    };
    return labels[sourceName] || sourceName;
  }

  function getSourceColor(sourceName: DataSourceName): string {
    const colors: Record<DataSourceName, string> = {
      SIGCDMX: "#0E5E3A",
      SEDEMA: "#79C141",
      SIMAT: "#18A5E3",
      INEGI: "#6366F1",
      DatosAbiertos: "#F2A81D",
      CONABIO: "#059669",
      CONAGUA: "#0284C7",
      SEMARNAT: "#7C3AED",
      Mock: "#64748B",
      Calculado: "#8B5CF6",
    };
    return colors[sourceName] || "#64748B";
  }

  return {
    dataMode,
    isOfficial,
    isMock,
    disclaimerText,
    getSourceLabel,
    getSourceColor,
  };
}
