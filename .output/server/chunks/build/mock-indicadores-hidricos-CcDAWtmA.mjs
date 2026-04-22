const indicesBioticos = [
  {
    alcaldia: "\xC1lvaro Obreg\xF3n",
    indiceBiodiversidad: 68,
    coberturaVegetal: 72,
    riquezaEspecies: 22,
    abundanciaIndividuos: 1480,
    especiesDominantes: ["Sedum praealtum", "Agave americana", "Lavandula angustifolia"],
    indiceShannonWiener: 2.35,
    indiceSimpson: 0.78
  },
  {
    alcaldia: "Azcapotzalco",
    indiceBiodiversidad: 42,
    coberturaVegetal: 51,
    riquezaEspecies: 12,
    abundanciaIndividuos: 820,
    especiesDominantes: ["Sedum dendroideum", "Festuca arundinacea", "Tagetes erecta"],
    indiceShannonWiener: 1.62,
    indiceSimpson: 0.58
  },
  {
    alcaldia: "Benito Ju\xE1rez",
    indiceBiodiversidad: 61,
    coberturaVegetal: 67,
    riquezaEspecies: 19,
    abundanciaIndividuos: 1320,
    especiesDominantes: ["Sedum pachyphyllum", "Echeveria elegans", "Lavandula angustifolia"],
    indiceShannonWiener: 2.18,
    indiceSimpson: 0.74
  },
  {
    alcaldia: "Coyoac\xE1n",
    indiceBiodiversidad: 75,
    coberturaVegetal: 80,
    riquezaEspecies: 25,
    abundanciaIndividuos: 1750,
    especiesDominantes: ["Agave attenuata", "Sedum praealtum", "Salvia leucantha"],
    indiceShannonWiener: 2.58,
    indiceSimpson: 0.82
  },
  {
    alcaldia: "Cuajimalpa",
    indiceBiodiversidad: 78,
    coberturaVegetal: 85,
    riquezaEspecies: 26,
    abundanciaIndividuos: 1680,
    especiesDominantes: ["Muhlenbergia macroura", "Festuca tolucensis", "Sedum dendroideum"],
    indiceShannonWiener: 2.65,
    indiceSimpson: 0.83
  },
  {
    alcaldia: "Cuauht\xE9moc",
    indiceBiodiversidad: 52,
    coberturaVegetal: 55,
    riquezaEspecies: 15,
    abundanciaIndividuos: 980,
    especiesDominantes: ["Sedum pachyphyllum", "Echeveria elegans", "Crassula ovata"],
    indiceShannonWiener: 1.85,
    indiceSimpson: 0.65
  },
  {
    alcaldia: "Gustavo A. Madero",
    indiceBiodiversidad: 45,
    coberturaVegetal: 52,
    riquezaEspecies: 13,
    abundanciaIndividuos: 870,
    especiesDominantes: ["Sedum dendroideum", "Tagetes erecta", "Festuca arundinacea"],
    indiceShannonWiener: 1.72,
    indiceSimpson: 0.6
  },
  {
    alcaldia: "Iztacalco",
    indiceBiodiversidad: 40,
    coberturaVegetal: 48,
    riquezaEspecies: 10,
    abundanciaIndividuos: 720,
    especiesDominantes: ["Sedum praealtum", "Festuca arundinacea", "Echeveria elegans"],
    indiceShannonWiener: 1.45,
    indiceSimpson: 0.54
  },
  {
    alcaldia: "Iztapalapa",
    indiceBiodiversidad: 38,
    coberturaVegetal: 45,
    riquezaEspecies: 9,
    abundanciaIndividuos: 680,
    especiesDominantes: ["Sedum dendroideum", "Opuntia ficus-indica", "Tagetes erecta"],
    indiceShannonWiener: 1.32,
    indiceSimpson: 0.51
  },
  {
    alcaldia: "Magdalena Contreras",
    indiceBiodiversidad: 82,
    coberturaVegetal: 88,
    riquezaEspecies: 27,
    abundanciaIndividuos: 1820,
    especiesDominantes: ["Muhlenbergia macroura", "Agave salmiana", "Salvia leucantha"],
    indiceShannonWiener: 2.72,
    indiceSimpson: 0.84
  },
  {
    alcaldia: "Miguel Hidalgo",
    indiceBiodiversidad: 58,
    coberturaVegetal: 63,
    riquezaEspecies: 17,
    abundanciaIndividuos: 1150,
    especiesDominantes: ["Lavandula angustifolia", "Sedum pachyphyllum", "Echeveria elegans"],
    indiceShannonWiener: 2.05,
    indiceSimpson: 0.71
  },
  {
    alcaldia: "Milpa Alta",
    indiceBiodiversidad: 85,
    coberturaVegetal: 92,
    riquezaEspecies: 28,
    abundanciaIndividuos: 1950,
    especiesDominantes: ["Muhlenbergia macroura", "Agave salmiana", "Bouteloua gracilis"],
    indiceShannonWiener: 2.8,
    indiceSimpson: 0.85
  },
  {
    alcaldia: "Tl\xE1huac",
    indiceBiodiversidad: 55,
    coberturaVegetal: 60,
    riquezaEspecies: 16,
    abundanciaIndividuos: 1020,
    especiesDominantes: ["Opuntia ficus-indica", "Sedum praealtum", "Tagetes erecta"],
    indiceShannonWiener: 1.92,
    indiceSimpson: 0.67
  },
  {
    alcaldia: "Tlalpan",
    indiceBiodiversidad: 80,
    coberturaVegetal: 86,
    riquezaEspecies: 26,
    abundanciaIndividuos: 1780,
    especiesDominantes: ["Muhlenbergia macroura", "Agave attenuata", "Festuca tolucensis"],
    indiceShannonWiener: 2.68,
    indiceSimpson: 0.83
  },
  {
    alcaldia: "Venustiano Carranza",
    indiceBiodiversidad: 39,
    coberturaVegetal: 47,
    riquezaEspecies: 10,
    abundanciaIndividuos: 710,
    especiesDominantes: ["Sedum dendroideum", "Festuca arundinacea", "Crassula ovata"],
    indiceShannonWiener: 1.38,
    indiceSimpson: 0.52
  },
  {
    alcaldia: "Xochimilco",
    indiceBiodiversidad: 76,
    coberturaVegetal: 82,
    riquezaEspecies: 24,
    abundanciaIndividuos: 1650,
    especiesDominantes: ["Agave americana", "Salvia leucantha", "Opuntia ficus-indica"],
    indiceShannonWiener: 2.55,
    indiceSimpson: 0.81
  }
];
const indicadoresHidricos = [
  {
    alcaldia: "\xC1lvaro Obreg\xF3n",
    captacionPluvial: 20.5,
    precipitacionMediaAnual: 920,
    escorrentiaEvitada: 185e3,
    superficieVerdeCaptadora: 9025,
    eficienciaRetencion: 65
  },
  {
    alcaldia: "Azcapotzalco",
    captacionPluvial: 16.2,
    precipitacionMediaAnual: 720,
    escorrentiaEvitada: 98e3,
    superficieVerdeCaptadora: 6050,
    eficienciaRetencion: 55
  },
  {
    alcaldia: "Benito Ju\xE1rez",
    captacionPluvial: 17.8,
    precipitacionMediaAnual: 760,
    escorrentiaEvitada: 142e3,
    superficieVerdeCaptadora: 7980,
    eficienciaRetencion: 60
  },
  {
    alcaldia: "Coyoac\xE1n",
    captacionPluvial: 21.3,
    precipitacionMediaAnual: 950,
    escorrentiaEvitada: 198e3,
    superficieVerdeCaptadora: 9290,
    eficienciaRetencion: 68
  },
  {
    alcaldia: "Cuajimalpa",
    captacionPluvial: 24.1,
    precipitacionMediaAnual: 1100,
    escorrentiaEvitada: 168e3,
    superficieVerdeCaptadora: 6970,
    eficienciaRetencion: 72
  },
  {
    alcaldia: "Cuauht\xE9moc",
    captacionPluvial: 15.8,
    precipitacionMediaAnual: 710,
    escorrentiaEvitada: 125e3,
    superficieVerdeCaptadora: 7910,
    eficienciaRetencion: 54
  },
  {
    alcaldia: "Gustavo A. Madero",
    captacionPluvial: 16.5,
    precipitacionMediaAnual: 740,
    escorrentiaEvitada: 112e3,
    superficieVerdeCaptadora: 6790,
    eficienciaRetencion: 56
  },
  {
    alcaldia: "Iztacalco",
    captacionPluvial: 15.2,
    precipitacionMediaAnual: 700,
    escorrentiaEvitada: 78e3,
    superficieVerdeCaptadora: 5130,
    eficienciaRetencion: 52
  },
  {
    alcaldia: "Iztapalapa",
    captacionPluvial: 16.8,
    precipitacionMediaAnual: 780,
    escorrentiaEvitada: 145e3,
    superficieVerdeCaptadora: 8630,
    eficienciaRetencion: 55
  },
  {
    alcaldia: "Magdalena Contreras",
    captacionPluvial: 24.5,
    precipitacionMediaAnual: 1150,
    escorrentiaEvitada: 152e3,
    superficieVerdeCaptadora: 6200,
    eficienciaRetencion: 73
  },
  {
    alcaldia: "Miguel Hidalgo",
    captacionPluvial: 17.2,
    precipitacionMediaAnual: 750,
    escorrentiaEvitada: 132e3,
    superficieVerdeCaptadora: 7670,
    eficienciaRetencion: 58
  },
  {
    alcaldia: "Milpa Alta",
    captacionPluvial: 25,
    precipitacionMediaAnual: 1200,
    escorrentiaEvitada: 12e4,
    superficieVerdeCaptadora: 4800,
    eficienciaRetencion: 75
  },
  {
    alcaldia: "Tl\xE1huac",
    captacionPluvial: 19.5,
    precipitacionMediaAnual: 880,
    escorrentiaEvitada: 108e3,
    superficieVerdeCaptadora: 5540,
    eficienciaRetencion: 62
  },
  {
    alcaldia: "Tlalpan",
    captacionPluvial: 23.8,
    precipitacionMediaAnual: 1080,
    escorrentiaEvitada: 21e4,
    superficieVerdeCaptadora: 8820,
    eficienciaRetencion: 71
  },
  {
    alcaldia: "Venustiano Carranza",
    captacionPluvial: 15.5,
    precipitacionMediaAnual: 705,
    escorrentiaEvitada: 82e3,
    superficieVerdeCaptadora: 5290,
    eficienciaRetencion: 53
  },
  {
    alcaldia: "Xochimilco",
    captacionPluvial: 22.6,
    precipitacionMediaAnual: 1020,
    escorrentiaEvitada: 175e3,
    superficieVerdeCaptadora: 7740,
    eficienciaRetencion: 69
  }
];

export { indicadoresHidricos as a, indicesBioticos as i };
//# sourceMappingURL=mock-indicadores-hidricos-CcDAWtmA.mjs.map
