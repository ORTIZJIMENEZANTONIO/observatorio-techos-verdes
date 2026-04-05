import { b as useRuntimeConfig } from './server.mjs';
import { computed } from 'vue';

function useDataSource() {
  const config = useRuntimeConfig();
  const dataMode = computed(() => config.public.dataMode);
  const isOfficial = computed(() => dataMode.value === "official");
  const isMock = computed(() => dataMode.value !== "official");
  const disclaimerText = computed(() => {
    if (isOfficial.value) {
      return "Los datos mostrados provienen de fuentes oficiales del Gobierno de la Ciudad de M\xE9xico. La informaci\xF3n se actualiza peri\xF3dicamente.";
    }
    return "Los datos mostrados son de demostraci\xF3n y no representan informaci\xF3n oficial. La plataforma est\xE1 dise\xF1ada para integrarse con fuentes oficiales de la CDMX.";
  });
  function getSourceLabel(sourceName) {
    const labels = {
      SIGCDMX: "Sistema de Informaci\xF3n Geogr\xE1fica CDMX",
      SEDEMA: "Secretar\xEDa del Medio Ambiente CDMX",
      SIMAT: "Sistema de Monitoreo Atmosf\xE9rico",
      INEGI: "Instituto Nacional de Estad\xEDstica y Geograf\xEDa",
      DatosAbiertos: "Portal de Datos Abiertos CDMX",
      CONABIO: "Comisi\xF3n Nacional para el Conocimiento y Uso de la Biodiversidad",
      CONAGUA: "Comisi\xF3n Nacional del Agua",
      SEMARNAT: "Secretar\xEDa de Medio Ambiente y Recursos Naturales",
      Mock: "Datos de demostraci\xF3n",
      Calculado: "Dato derivado/calculado"
    };
    return labels[sourceName] || sourceName;
  }
  function getSourceColor(sourceName) {
    const colors = {
      SIGCDMX: "#0E5E3A",
      SEDEMA: "#79C141",
      SIMAT: "#18A5E3",
      INEGI: "#6366F1",
      DatosAbiertos: "#F2A81D",
      CONABIO: "#059669",
      CONAGUA: "#0284C7",
      SEMARNAT: "#7C3AED",
      Mock: "#64748B",
      Calculado: "#8B5CF6"
    };
    return colors[sourceName] || "#64748B";
  }
  return {
    dataMode,
    isOfficial,
    isMock,
    disclaimerText,
    getSourceLabel,
    getSourceColor
  };
}

export { useDataSource as u };
//# sourceMappingURL=useDataSource-CcCLLLin.mjs.map
