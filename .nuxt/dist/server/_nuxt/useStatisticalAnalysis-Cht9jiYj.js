function linearRegression(xs, ys) {
  const n = xs.length;
  if (n < 2) return { slope: 0, intercept: 0, r2: 0, predict: () => 0 };
  const sumX = xs.reduce((a, b) => a + b, 0);
  const sumY = ys.reduce((a, b) => a + b, 0);
  const sumXY = xs.reduce((a, x, i) => a + x * ys[i], 0);
  const sumX2 = xs.reduce((a, x) => a + x * x, 0);
  const meanY = sumY / n;
  const denom = n * sumX2 - sumX * sumX;
  if (denom === 0) return { slope: 0, intercept: meanY, r2: 0, predict: () => meanY };
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  const ssTot = ys.reduce((a, y) => a + (y - meanY) ** 2, 0);
  const ssRes = ys.reduce((a, y, i) => a + (y - (slope * xs[i] + intercept)) ** 2, 0);
  const r2 = ssTot === 0 ? 0 : 1 - ssRes / ssTot;
  return { slope, intercept, r2, predict: (x) => slope * x + intercept };
}
function pearsonCorrelation(xs, ys) {
  const n = xs.length;
  if (n < 2) return 0;
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let denX = 0;
  let denY = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - meanX;
    const dy = ys[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }
  const den = Math.sqrt(denX * denY);
  return den === 0 ? 0 : num / den;
}
function correlationMatrix(variables) {
  const labels = Object.keys(variables);
  const arrays = labels.map((l) => variables[l]);
  const matrix = labels.map(
    (_, i) => labels.map((_2, j) => pearsonCorrelation(arrays[i], arrays[j]))
  );
  return { labels, matrix };
}
const TASAS = {
  co2KgPorM2Anio: 0.968,
  // °C — Cervantes Nájera (2021), Cap. 5
  tempM2Ref: 79584,
  // m² referencia inventario CDMX — Cervantes Nájera (2025), Figura 13
  aguaLPorM2Anio: 19.5,
  // L/m²/año — Cervantes Nájera (2021), Cap. 5
  energiaKwhPorM2Anio: 432.95
};
function computeIndiceNecesidad(input) {
  const lstNorm = Math.min(100, Math.max(0, (input.lstPromedio - 30) / 12 * 100));
  const deficitVegetal = 100 - input.coberturaVegetal;
  const pobNorm = Math.min(100, Math.max(0, (input.poblacion - 6e3) / 12e3 * 100));
  const captNorm = Math.min(100, Math.max(0, (25 - input.captacionPluvial) / 10 * 100));
  const bioNorm = 100 - input.indiceBiodiversidad;
  return lstNorm * 0.3 + deficitVegetal * 0.25 + pobNorm * 0.2 + captNorm * 0.15 + bioNorm * 0.1;
}
const UMBRALES_RIESGO = {
  lst: { critico: 38, alto: 35, moderado: 32 },
  // °C — Cervantes Nájera (2025)
  o3: { limite: 95, atencion: 70 },
  // ppb — NOM-023-SSA1-1993
  coberturaVegetalIdeal: 15,
  // m²/hab — OMS (2012)
  shannonSaludable: 2
  // H' — Magurran (2004)
};
const COSTOS_REFERENCIA = {
  costoInstalacionTVLE: 1200,
  // MXN/m² — Cervantes Nájera (2025), Tabla 18
  costoMantenimientoAnual: 80,
  // MXN/m²/año — Cervantes Nájera (2025), Tabla 19
  costoElectricidadKwh: 2.5,
  // MXN/kWh — CFE tarifa DAC (2024)
  costoConsultaCalor: 3500,
  // MXN/consulta — Secretaría de Salud CDMX (2023)
  consultasPor100kHab: 12,
  // consultas/año/100k hab — SINAVE (2023)
  costoM3AguaNoGestionada: 45,
  // MXN/m³ — SACMEX/CONAGUA (2022)
  valorTonCO2: 500,
  // MXN/tonCO₂ — México2 mercado voluntario (2024)
  tasaDescuento: 0.08
  // — Banxico tasa referencia real (2024)
};
function computeRiskProfile(input) {
  const indicadores = [];
  const lstNivel = input.lstPromedio >= UMBRALES_RIESGO.lst.critico ? "critico" : input.lstPromedio >= UMBRALES_RIESGO.lst.alto ? "alto" : input.lstPromedio >= UMBRALES_RIESGO.lst.moderado ? "moderado" : "bajo";
  indicadores.push({
    nombre: "Isla de calor",
    valor: input.lstPromedio,
    unidad: "°C",
    nivel: lstNivel,
    umbralRef: `Crítico ≥${UMBRALES_RIESGO.lst.critico}°C`
  });
  const o3Nivel = input.o3Promedio >= UMBRALES_RIESGO.o3.limite ? "critico" : input.o3Promedio >= UMBRALES_RIESGO.o3.atencion ? "alto" : input.o3Promedio >= 50 ? "moderado" : "bajo";
  indicadores.push({
    nombre: "Calidad del aire (O₃)",
    valor: input.o3Promedio,
    unidad: "ppb",
    nivel: o3Nivel,
    umbralRef: `NOM-020: ${UMBRALES_RIESGO.o3.limite} ppb`
  });
  const defVegNivel = input.coberturaVegetal < 45 ? "critico" : input.coberturaVegetal < 55 ? "alto" : input.coberturaVegetal < 65 ? "moderado" : "bajo";
  indicadores.push({
    nombre: "Déficit vegetal",
    valor: input.coberturaVegetal,
    unidad: "%",
    nivel: defVegNivel,
    umbralRef: `OMS: ${UMBRALES_RIESGO.coberturaVegetalIdeal}% min`
  });
  const hidNivel = input.captacionPluvial < 16 ? "critico" : input.captacionPluvial < 18 ? "alto" : input.captacionPluvial < 20 ? "moderado" : "bajo";
  indicadores.push({
    nombre: "Vulnerabilidad hídrica",
    valor: input.captacionPluvial,
    unidad: "L/m²/año",
    nivel: hidNivel,
    umbralRef: "Ref: 20 L/m²/año"
  });
  const bioNivel = input.shannon < 1.5 ? "critico" : input.shannon < UMBRALES_RIESGO.shannonSaludable ? "alto" : input.shannon < 2.5 ? "moderado" : "bajo";
  indicadores.push({
    nombre: "Biodiversidad",
    valor: input.shannon,
    unidad: "H'",
    nivel: bioNivel,
    umbralRef: `Saludable ≥${UMBRALES_RIESGO.shannonSaludable}`
  });
  const nivelToScore = (n) => n === "critico" ? 100 : n === "alto" ? 75 : n === "moderado" ? 45 : 15;
  const pesos = [0.3, 0.2, 0.2, 0.15, 0.15];
  const scoreRiesgo = indicadores.reduce((sum, ind, i) => sum + nivelToScore(ind.nivel) * pesos[i], 0);
  const nivelGeneral = scoreRiesgo >= 75 ? "critico" : scoreRiesgo >= 55 ? "alto" : scoreRiesgo >= 35 ? "moderado" : "bajo";
  return { indicadores, scoreRiesgo, nivelGeneral };
}
function computeCostOfInaction(m2, years, poblacion) {
  const C = COSTOS_REFERENCIA;
  const serie = [];
  let acumulado = 0;
  for (let y = 1; y <= years; y++) {
    const energia = m2 * TASAS.energiaKwhPorM2Anio * C.costoElectricidadKwh;
    const salud = poblacion / 1e5 * C.consultasPor100kHab * C.costoConsultaCalor;
    const inundaciones = m2 * TASAS.aguaLPorM2Anio / 1e3 * C.costoM3AguaNoGestionada;
    const ambiental = m2 * TASAS.co2KgPorM2Anio / 1e3 * C.valorTonCO2;
    const total = energia + salud + inundaciones + ambiental;
    acumulado += total;
    serie.push({ year: y, energia, salud, inundaciones, ambiental, total, acumulado });
  }
  return { serie, totalAcumulado: acumulado };
}
function computeROI(m2, years, poblacion = 5e5) {
  const C = COSTOS_REFERENCIA;
  const instalacion = m2 * C.costoInstalacionTVLE;
  const mantenimientoAnual = m2 * C.costoMantenimientoAnual;
  const benefEnergiaAnual = m2 * TASAS.energiaKwhPorM2Anio * C.costoElectricidadKwh;
  const benefAguaAnual = m2 * TASAS.aguaLPorM2Anio / 1e3 * C.costoM3AguaNoGestionada;
  const benefCo2Anual = m2 * TASAS.co2KgPorM2Anio / 1e3 * C.valorTonCO2;
  const benefSaludAnual = poblacion / 1e5 * C.consultasPor100kHab * C.costoConsultaCalor;
  const benefTotalAnual = benefEnergiaAnual + benefAguaAnual + benefCo2Anual + benefSaludAnual;
  const serieAnual = [];
  let costoAcum = instalacion;
  let benefAcum = 0;
  let periodoRecuperacion = years;
  let vpn = -instalacion;
  for (let y = 1; y <= years; y++) {
    costoAcum += mantenimientoAnual;
    benefAcum += benefTotalAnual;
    const flujoNeto = benefAcum - costoAcum;
    vpn += (benefTotalAnual - mantenimientoAnual) / Math.pow(1 + C.tasaDescuento, y);
    if (flujoNeto >= 0 && periodoRecuperacion === years) {
      const prevNeto = benefAcum - benefTotalAnual - (costoAcum - mantenimientoAnual);
      const frac = prevNeto < 0 ? Math.abs(prevNeto) / (Math.abs(prevNeto) + flujoNeto) : 0;
      periodoRecuperacion = Math.round((y - 1 + frac) * 10) / 10;
    }
    serieAnual.push({ year: y, costoAcumulado: costoAcum, beneficioAcumulado: benefAcum, flujoNeto });
  }
  const inversionTotal = instalacion + mantenimientoAnual * years;
  const beneficioTotal = benefTotalAnual * years;
  const beneficioNeto = beneficioTotal - inversionTotal;
  const roiPct = inversionTotal > 0 ? beneficioNeto / inversionTotal * 100 : 0;
  return { inversionTotal, beneficioTotal, beneficioNeto, roiPct, vpn, periodoRecuperacion, serieAnual };
}
const UMBRALES_ESTRUCTURALES = {
  // kg/m² — techo verde intensivo con sustrato >20cm
  edadMaxSinRefuerzo: 50,
  // años — después requiere evaluación estructural obligatoria
  nivelesMaxSinAnalisis: 3
  // pisos — edificios >3 niveles requieren análisis de carga
};
const PESOS_PREFACTIBILIDAD = {
  tipoEstructura: 0.25,
  zonaSismica: 0.2,
  edadConstruccion: 0.15,
  niveles: 0.1,
  estadoEstructural: 0.15,
  materialTechumbre: 0.15
};
function computeScorePrefactibilidad(input) {
  const factoresRiesgo = [];
  const estructuraScores = {
    concreto_armado: 95,
    acero: 95,
    mixta: 80,
    mamposteria_confinada: 60,
    mamposteria_simple: 30,
    madera: 20,
    lamina: 10,
    desconocido: 25
  };
  const estructura = estructuraScores[input.tipoEstructura];
  if (estructura < 50) factoresRiesgo.push("Estructura no apta para carga adicional");
  const zonaScores = {
    I: 100,
    IIa: 85,
    IIb: 75,
    IIIa: 55,
    IIIb: 40,
    IIIc: 25,
    IIId: 10
  };
  const zonaSismica = zonaScores[input.zonaSismica];
  if (zonaSismica < 50) factoresRiesgo.push("Zona sísmica de alto riesgo");
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const edad = currentYear - input.anioConstruccion;
  const edadScore = edad <= 10 ? 100 : edad <= 25 ? 85 : edad <= 40 ? 65 : edad <= 50 ? 45 : 20;
  if (edad > UMBRALES_ESTRUCTURALES.edadMaxSinRefuerzo)
    factoresRiesgo.push(`Construcción de ${edad} años (>50 requiere evaluación)`);
  const nivelesScore = input.niveles <= 2 ? 100 : input.niveles <= 4 ? 80 : input.niveles <= 8 ? 60 : 40;
  if (input.niveles > UMBRALES_ESTRUCTURALES.nivelesMaxSinAnalisis)
    factoresRiesgo.push(`${input.niveles} niveles — requiere análisis de carga`);
  const dictamenScores = {
    seguro: 100,
    dano_menor: 55,
    dano_mayor: 10,
    sin_dictamen: 35
  };
  const dictamen = dictamenScores[input.estadoEstructural];
  if (input.estadoEstructural === "dano_mayor")
    factoresRiesgo.push("Dictamen post-sismo: daño mayor");
  if (input.estadoEstructural === "sin_dictamen")
    factoresRiesgo.push("Sin dictamen estructural post-sismo 2017");
  const techumbreScores = {
    losa_concreto: 100,
    losacero: 90,
    vigueta_bovedilla: 70,
    lamina_metalica: 30,
    lamina_asbesto: 15,
    madera_teja: 20,
    desconocido: 25
  };
  const techumbre = techumbreScores[input.materialTechumbre];
  if (techumbre < 50) factoresRiesgo.push("Techumbre no soporta carga de sustrato");
  const P = PESOS_PREFACTIBILIDAD;
  const score = estructura * P.tipoEstructura + zonaSismica * P.zonaSismica + edadScore * P.edadConstruccion + nivelesScore * P.niveles + dictamen * P.estadoEstructural + techumbre * P.materialTechumbre;
  const nivel = score >= 65 ? "prefactible" : score >= 40 ? "requiere_evaluacion" : "no_recomendado";
  if (factoresRiesgo.length === 0) factoresRiesgo.push("Sin factores de riesgo identificados");
  return {
    score: Math.round(score * 10) / 10,
    nivel,
    factoresRiesgo,
    detalleComponentes: { estructura, zonaSismica, edad: edadScore, niveles: nivelesScore, dictamen, techumbre }
  };
}
function computeRiskProfileWithStructural(input) {
  const base = computeRiskProfile(input);
  if (input.scorePrefactibilidadPromedio !== void 0) {
    const structScore = input.scorePrefactibilidadPromedio;
    const structNivel = structScore < 35 ? "critico" : structScore < 50 ? "alto" : structScore < 65 ? "moderado" : "bajo";
    base.indicadores.push({
      nombre: "Viabilidad constructiva",
      valor: structScore,
      unidad: "pts",
      nivel: structNivel,
      umbralRef: "Pre-factible ≥65 pts"
    });
    const nivelToScore = (n) => n === "critico" ? 100 : n === "alto" ? 75 : n === "moderado" ? 45 : 15;
    const pesos6 = [0.27, 0.18, 0.18, 0.135, 0.135, 0.1];
    base.scoreRiesgo = Math.round(
      base.indicadores.reduce((sum, ind, i) => sum + nivelToScore(ind.nivel) * pesos6[i], 0) * 10
    ) / 10;
    base.nivelGeneral = base.scoreRiesgo >= 75 ? "critico" : base.scoreRiesgo >= 55 ? "alto" : base.scoreRiesgo >= 35 ? "moderado" : "bajo";
  }
  return base;
}
function computeEffectiveM2(input) {
  const factor = (input.porcentajePrefactible + input.porcentajeRequiereEval * 0.5) / 100;
  const m2Efectivos = Math.round(input.m2Total * factor);
  return {
    m2Efectivos,
    m2Descartados: input.m2Total - m2Efectivos,
    factorReduccion: Math.round(factor * 1e3) / 1e3
  };
}
export {
  COSTOS_REFERENCIA as C,
  TASAS as T,
  computeRiskProfileWithStructural as a,
  computeCostOfInaction as b,
  computeScorePrefactibilidad as c,
  computeEffectiveM2 as d,
  computeROI as e,
  correlationMatrix as f,
  computeIndiceNecesidad as g,
  linearRegression as l
};
//# sourceMappingURL=useStatisticalAnalysis-Cht9jiYj.js.map
