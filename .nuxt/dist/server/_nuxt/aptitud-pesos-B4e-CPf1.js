const aptitudPesos = [
  {
    variable: "Temperatura Superficial (LST)",
    codigo: "lst",
    peso: 30.19,
    descripcion: "Temperatura de la superficie terrestre medida por sensores remotos Landsat/MODIS. Las zonas con mayor temperatura se priorizan para mitigación de islas de calor urbano. Es el factor con mayor peso en el modelo de aptitud.",
    color: "#D9363E"
  },
  {
    variable: "Área Urbanizada",
    codigo: "areaUrbanizada",
    peso: 17.34,
    descripcion: "Porcentaje de superficie urbanizada (construida, pavimentada) en el entorno inmediato del sitio candidato. Un mayor porcentaje de urbanización indica mayor necesidad de intervención con infraestructura verde.",
    color: "#5E6B78"
  },
  {
    variable: "Densidad de Población",
    codigo: "poblacion",
    peso: 13.31,
    descripcion: "Número de habitantes por hectárea en la zona de influencia. Las áreas densamente pobladas se benefician proporcionalmente más de los servicios ecosistémicos que proveen los techos verdes.",
    color: "#18A5E3"
  },
  {
    variable: "Índice de Vegetación (NDVI)",
    codigo: "ndvi",
    peso: 9.56,
    descripcion: "Índice de Diferencia Normalizada de Vegetación derivado de imágenes satelitales. Valores bajos de NDVI indican déficit de cobertura vegetal y, por lo tanto, mayor necesidad de intervención verde.",
    color: "#79C141"
  },
  {
    variable: "Concentración de Ozono (O₃)",
    codigo: "o3",
    peso: 6.19,
    descripcion: "Concentración promedio de ozono troposférico en partes por billón. Indicador clave de calidad del aire y estrés ambiental que puede ser mitigado parcialmente mediante vegetación urbana.",
    color: "#A855F7"
  },
  {
    variable: "Densidad Vial",
    codigo: "densidadVial",
    peso: 4.64,
    descripcion: "Kilómetros de vialidades por kilómetro cuadrado en la zona de influencia. Una alta densidad vial se asocia con mayores emisiones contaminantes y un pronunciado efecto de isla de calor.",
    color: "#F2A81D"
  },
  {
    variable: "Índice de Biodiversidad",
    codigo: "indiceBiodiversidad",
    peso: 4.48,
    descripcion: "Índice compuesto de biodiversidad vegetal urbana por alcaldía (0-100), derivado de inventarios de especies en azoteas verdes. Zonas con menor biodiversidad se priorizan para enriquecer el mosaico ecológico.",
    color: "#10B981"
  },
  {
    variable: "Monóxido de Carbono (CO)",
    codigo: "co",
    peso: 3.83,
    descripcion: "Concentración de monóxido de carbono en partes por millón, derivada de estaciones de monitoreo de la Red Automática de Monitoreo Atmosférico (RAMA). Refleja contaminación por fuentes móviles.",
    color: "#EF4444"
  },
  {
    variable: "Cobertura Vegetal",
    codigo: "coberturaVegetal",
    peso: 4,
    descripcion: "Porcentaje de cobertura vegetal en techos verdes existentes por alcaldía. Zonas con menor cobertura indican oportunidad de expansión y mayor impacto potencial de nuevas instalaciones.",
    color: "#34D399"
  },
  {
    variable: "Captación Pluvial",
    codigo: "captacionPluvial",
    peso: 3.5,
    descripcion: "Volumen de captación pluvial por metro cuadrado al año (L/m²/año) en techos verdes por alcaldía. Zonas con menor captación se priorizan para mejorar la gestión hídrica urbana.",
    color: "#3B82F6"
  },
  {
    variable: "Dióxido de Nitrógeno (NO₂)",
    codigo: "no2",
    peso: 2.96,
    descripcion: "Concentración de dióxido de nitrógeno en partes por billón. Contaminante asociado al tráfico vehicular y actividad industrial, indicador secundario de estrés ambiental urbano.",
    color: "#F97316"
  }
];
const aptitudPesosOriginal = [
  {
    variable: "Temperatura Superficial (LST)",
    codigo: "lst",
    peso: 34.31,
    descripcion: "Temperatura de la superficie terrestre medida por sensores remotos Landsat/MODIS. Las zonas con mayor temperatura se priorizan para mitigación de islas de calor urbano. Es el factor con mayor peso en el modelo de aptitud.",
    color: "#D9363E"
  },
  {
    variable: "Área Urbanizada",
    codigo: "areaUrbanizada",
    peso: 19.7,
    descripcion: "Porcentaje de superficie urbanizada (construida, pavimentada) en el entorno inmediato del sitio candidato. Un mayor porcentaje de urbanización indica mayor necesidad de intervención con infraestructura verde.",
    color: "#5E6B78"
  },
  {
    variable: "Densidad de Población",
    codigo: "poblacion",
    peso: 15.12,
    descripcion: "Número de habitantes por hectárea en la zona de influencia. Las áreas densamente pobladas se benefician proporcionalmente más de los servicios ecosistémicos que proveen los techos verdes.",
    color: "#18A5E3"
  },
  {
    variable: "Índice de Vegetación (NDVI)",
    codigo: "ndvi",
    peso: 10.86,
    descripcion: "Índice de Diferencia Normalizada de Vegetación derivado de imágenes satelitales. Valores bajos de NDVI indican déficit de cobertura vegetal y, por lo tanto, mayor necesidad de intervención verde.",
    color: "#79C141"
  },
  {
    variable: "Concentración de Ozono (O₃)",
    codigo: "o3",
    peso: 7.03,
    descripcion: "Concentración promedio de ozono troposférico en partes por billón. Indicador clave de calidad del aire y estrés ambiental que puede ser mitigado parcialmente mediante vegetación urbana.",
    color: "#A855F7"
  },
  {
    variable: "Densidad Vial",
    codigo: "densidadVial",
    peso: 5.27,
    descripcion: "Kilómetros de vialidades por kilómetro cuadrado en la zona de influencia. Una alta densidad vial se asocia con mayores emisiones contaminantes y un pronunciado efecto de isla de calor.",
    color: "#F2A81D"
  },
  {
    variable: "Monóxido de Carbono (CO)",
    codigo: "co",
    peso: 4.35,
    descripcion: "Concentración de monóxido de carbono en partes por millón, derivada de estaciones de monitoreo de la Red Automática de Monitoreo Atmosférico (RAMA). Refleja contaminación por fuentes móviles.",
    color: "#EF4444"
  },
  {
    variable: "Dióxido de Nitrógeno (NO₂)",
    codigo: "no2",
    peso: 3.36,
    descripcion: "Concentración de dióxido de nitrógeno en partes por billón. Contaminante asociado al tráfico vehicular y actividad industrial, indicador secundario de estrés ambiental urbano.",
    color: "#F97316"
  }
];
export {
  aptitudPesos as a,
  aptitudPesosOriginal as b
};
//# sourceMappingURL=aptitud-pesos-B4e-CPf1.js.map
