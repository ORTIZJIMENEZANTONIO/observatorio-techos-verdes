const aptitudPesos = [
  {
    variable: "Temperatura Superficial (LST)",
    codigo: "lst",
    peso: 30.19,
    descripcion: "Temperatura de la superficie terrestre medida por sensores remotos Landsat/MODIS. Las zonas con mayor temperatura se priorizan para mitigaci\xF3n de islas de calor urbano. Es el factor con mayor peso en el modelo de aptitud.",
    color: "#D9363E"
  },
  {
    variable: "\xC1rea Urbanizada",
    codigo: "areaUrbanizada",
    peso: 17.34,
    descripcion: "Porcentaje de superficie urbanizada (construida, pavimentada) en el entorno inmediato del sitio candidato. Un mayor porcentaje de urbanizaci\xF3n indica mayor necesidad de intervenci\xF3n con infraestructura verde.",
    color: "#5E6B78"
  },
  {
    variable: "Densidad de Poblaci\xF3n",
    codigo: "poblacion",
    peso: 13.31,
    descripcion: "N\xFAmero de habitantes por hect\xE1rea en la zona de influencia. Las \xE1reas densamente pobladas se benefician proporcionalmente m\xE1s de los servicios ecosist\xE9micos que proveen los techos verdes.",
    color: "#18A5E3"
  },
  {
    variable: "\xCDndice de Vegetaci\xF3n (NDVI)",
    codigo: "ndvi",
    peso: 9.56,
    descripcion: "\xCDndice de Diferencia Normalizada de Vegetaci\xF3n derivado de im\xE1genes satelitales. Valores bajos de NDVI indican d\xE9ficit de cobertura vegetal y, por lo tanto, mayor necesidad de intervenci\xF3n verde.",
    color: "#79C141"
  },
  {
    variable: "Concentraci\xF3n de Ozono (O\u2083)",
    codigo: "o3",
    peso: 6.19,
    descripcion: "Concentraci\xF3n promedio de ozono troposf\xE9rico en partes por bill\xF3n. Indicador clave de calidad del aire y estr\xE9s ambiental que puede ser mitigado parcialmente mediante vegetaci\xF3n urbana.",
    color: "#A855F7"
  },
  {
    variable: "Densidad Vial",
    codigo: "densidadVial",
    peso: 4.64,
    descripcion: "Kil\xF3metros de vialidades por kil\xF3metro cuadrado en la zona de influencia. Una alta densidad vial se asocia con mayores emisiones contaminantes y un pronunciado efecto de isla de calor.",
    color: "#F2A81D"
  },
  {
    variable: "\xCDndice de Biodiversidad",
    codigo: "indiceBiodiversidad",
    peso: 4.48,
    descripcion: "\xCDndice compuesto de biodiversidad vegetal urbana por alcald\xEDa (0-100), derivado de inventarios de especies en azoteas verdes. Zonas con menor biodiversidad se priorizan para enriquecer el mosaico ecol\xF3gico.",
    color: "#10B981"
  },
  {
    variable: "Mon\xF3xido de Carbono (CO)",
    codigo: "co",
    peso: 3.83,
    descripcion: "Concentraci\xF3n de mon\xF3xido de carbono en partes por mill\xF3n, derivada de estaciones de monitoreo de la Red Autom\xE1tica de Monitoreo Atmosf\xE9rico (RAMA). Refleja contaminaci\xF3n por fuentes m\xF3viles.",
    color: "#EF4444"
  },
  {
    variable: "Cobertura Vegetal",
    codigo: "coberturaVegetal",
    peso: 4,
    descripcion: "Porcentaje de cobertura vegetal en techos verdes existentes por alcald\xEDa. Zonas con menor cobertura indican oportunidad de expansi\xF3n y mayor impacto potencial de nuevas instalaciones.",
    color: "#34D399"
  },
  {
    variable: "Captaci\xF3n Pluvial",
    codigo: "captacionPluvial",
    peso: 3.5,
    descripcion: "Volumen de captaci\xF3n pluvial por metro cuadrado al a\xF1o (L/m\xB2/a\xF1o) en techos verdes por alcald\xEDa. Zonas con menor captaci\xF3n se priorizan para mejorar la gesti\xF3n h\xEDdrica urbana.",
    color: "#3B82F6"
  },
  {
    variable: "Di\xF3xido de Nitr\xF3geno (NO\u2082)",
    codigo: "no2",
    peso: 2.96,
    descripcion: "Concentraci\xF3n de di\xF3xido de nitr\xF3geno en partes por bill\xF3n. Contaminante asociado al tr\xE1fico vehicular y actividad industrial, indicador secundario de estr\xE9s ambiental urbano.",
    color: "#F97316"
  }
];
const aptitudPesosOriginal = [
  {
    variable: "Temperatura Superficial (LST)",
    codigo: "lst",
    peso: 34.31,
    descripcion: "Temperatura de la superficie terrestre medida por sensores remotos Landsat/MODIS. Las zonas con mayor temperatura se priorizan para mitigaci\xF3n de islas de calor urbano. Es el factor con mayor peso en el modelo de aptitud.",
    color: "#D9363E"
  },
  {
    variable: "\xC1rea Urbanizada",
    codigo: "areaUrbanizada",
    peso: 19.7,
    descripcion: "Porcentaje de superficie urbanizada (construida, pavimentada) en el entorno inmediato del sitio candidato. Un mayor porcentaje de urbanizaci\xF3n indica mayor necesidad de intervenci\xF3n con infraestructura verde.",
    color: "#5E6B78"
  },
  {
    variable: "Densidad de Poblaci\xF3n",
    codigo: "poblacion",
    peso: 15.12,
    descripcion: "N\xFAmero de habitantes por hect\xE1rea en la zona de influencia. Las \xE1reas densamente pobladas se benefician proporcionalmente m\xE1s de los servicios ecosist\xE9micos que proveen los techos verdes.",
    color: "#18A5E3"
  },
  {
    variable: "\xCDndice de Vegetaci\xF3n (NDVI)",
    codigo: "ndvi",
    peso: 10.86,
    descripcion: "\xCDndice de Diferencia Normalizada de Vegetaci\xF3n derivado de im\xE1genes satelitales. Valores bajos de NDVI indican d\xE9ficit de cobertura vegetal y, por lo tanto, mayor necesidad de intervenci\xF3n verde.",
    color: "#79C141"
  },
  {
    variable: "Concentraci\xF3n de Ozono (O\u2083)",
    codigo: "o3",
    peso: 7.03,
    descripcion: "Concentraci\xF3n promedio de ozono troposf\xE9rico en partes por bill\xF3n. Indicador clave de calidad del aire y estr\xE9s ambiental que puede ser mitigado parcialmente mediante vegetaci\xF3n urbana.",
    color: "#A855F7"
  },
  {
    variable: "Densidad Vial",
    codigo: "densidadVial",
    peso: 5.27,
    descripcion: "Kil\xF3metros de vialidades por kil\xF3metro cuadrado en la zona de influencia. Una alta densidad vial se asocia con mayores emisiones contaminantes y un pronunciado efecto de isla de calor.",
    color: "#F2A81D"
  },
  {
    variable: "Mon\xF3xido de Carbono (CO)",
    codigo: "co",
    peso: 4.35,
    descripcion: "Concentraci\xF3n de mon\xF3xido de carbono en partes por mill\xF3n, derivada de estaciones de monitoreo de la Red Autom\xE1tica de Monitoreo Atmosf\xE9rico (RAMA). Refleja contaminaci\xF3n por fuentes m\xF3viles.",
    color: "#EF4444"
  },
  {
    variable: "Di\xF3xido de Nitr\xF3geno (NO\u2082)",
    codigo: "no2",
    peso: 3.36,
    descripcion: "Concentraci\xF3n de di\xF3xido de nitr\xF3geno en partes por bill\xF3n. Contaminante asociado al tr\xE1fico vehicular y actividad industrial, indicador secundario de estr\xE9s ambiental urbano.",
    color: "#F97316"
  }
];

export { aptitudPesos as a, aptitudPesosOriginal as b };
//# sourceMappingURL=aptitud-pesos-B4e-CPf1.mjs.map
