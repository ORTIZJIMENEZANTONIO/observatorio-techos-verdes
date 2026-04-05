// ============================================================================
// Mock: Datos Estructurales por Edificio
// Fuentes simuladas: Catastro CDMX (SIGCDMX), Atlas de Riesgos CDMX,
// Dictámenes post-sismo 19S (2017), INEGI Censo 2020, NTC-CDMX
// ============================================================================

import type { DatosEstructurales } from '~/types/sources'

/**
 * Datos estructurales keyed por building ID (green roofs 1-57, candidates 1001-4015).
 * Zonificación sísmica basada en Atlas de Riesgos CDMX (2019):
 *   - Zona I (firme/volcánico): Milpa Alta, Xochimilco, Cuajimalpa, Magdalena Contreras, Tlalpan sur
 *   - Zona II (transición): Álvaro Obregón, Coyoacán, Miguel Hidalgo, Tlalpan norte, Benito Juárez
 *   - Zona IIIa: Cuauhtémoc, Azcapotzalco, GAM
 *   - Zona IIIb: Venustiano Carranza, Iztapalapa parcial
 *   - Zona IIIc: Iztacalco, Iztapalapa oriente
 *   - Zona IIId: Tláhuac
 */
export const mockDatosEstructurales: Record<number, DatosEstructurales> = {
  // ==========================================================================
  // GREEN ROOFS (IDs 1-57)
  // ==========================================================================

  // 1: Hospital General de México - Cuauhtémoc (1943, concreto)
  1: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 8,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 2: Mercado de Jamaica - Venustiano Carranza (1957)
  2: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIb',
    niveles: 1,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 280,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 3: Centro Comercial Perisur - Coyoacán (1980)
  3: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIa',
    niveles: 4,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 400,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 4: Edificio Sede SEMARNAT - Tlalpan (2003)
  4: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIa',
    niveles: 5,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 320,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 5: Supermercado Chedraui Iztapalapa (1998)
  5: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIc',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 6: Palacio de Bellas Artes - Cuauhtémoc (1934)
  6: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIa',
    niveles: 4,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 500,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 7: Hospital Infantil Federico Gómez - Cuauhtémoc (1943)
  7: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 6,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 320,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 8: Mercado de Sonora - Venustiano Carranza (1957)
  8: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIb',
    niveles: 1,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 250,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 9: Torre BBVA Bancomer - Miguel Hidalgo (2016)
  9: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIb',
    niveles: 50,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 450,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 10: UNAM Fac. Arquitectura - Coyoacán (1954)
  10: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'I',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 11: Centro Comercial Santa Fe - Álvaro Obregón (1993)
  11: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIa',
    niveles: 4,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 380,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 12: Mercado de la Merced - Venustiano Carranza (1957)
  12: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIb',
    niveles: 1,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 260,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 13: Hospital Especialidades CMN Siglo XXI - Cuauhtémoc (1963)
  13: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 10,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 380,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 14: Gobierno CDMX Antiguo Ayuntamiento - Cuauhtémoc (1724/1940s renovation)
  14: {
    tipoEstructura: 'mamposteria_confinada',
    zonaSismica: 'IIIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 15: Walmart Supercenter Coapa - Tlalpan (2001)
  15: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIa',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 220,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 16: Museo Nacional Antropología - Miguel Hidalgo (1964)
  16: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIb',
    niveles: 2,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 400,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 17: IPN CIIEMAD Zacatenco - GAM (1960s)
  17: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 300,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 18: Corporativo TELMEX - Cuauhtémoc (1990s)
  18: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 12,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 19: Hospital General Iztapalapa (1990)
  19: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIc',
    niveles: 5,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 280,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 20: Mercado de Coyoacán (1956)
  20: {
    tipoEstructura: 'mamposteria_confinada',
    zonaSismica: 'IIa',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 220,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 21: CC Parque Delta - Benito Juárez (2005)
  21: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIb',
    niveles: 4,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 380,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 22: Residencial Bosques de las Lomas - Miguel Hidalgo (2012)
  22: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIa',
    niveles: 15,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 23: Planta Bimbo Azcapotzalco (1970s)
  23: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIa',
    niveles: 2,
    estadoEstructural: 'seguro',
    materialTechumbre: 'lamina_metalica',
    capacidadCargaTecho: 120,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 24: Soriana Iztacalco (2000)
  24: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIc',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 25: CONAGUA Sede - Coyoacán (1994)
  25: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIa',
    niveles: 6,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 320,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 26: Hospital Ángeles del Pedregal - Tlalpan (1988)
  26: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'I',
    niveles: 8,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 27: UAM Azcapotzalco - Azcapotzalco (1974)
  27: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 4,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 300,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 28: Mercado de Medellín - Cuauhtémoc (1958)
  28: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 1,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 240,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 29: CC Parque Lindavista - GAM (2006)
  29: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 30: Departamentos Condesa Verde - Cuauhtémoc (2018)
  30: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 6,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 320,
    dictamenPostSismo2017: false,
    riesgoInundacion: 'medio',
  },
  // 31: Oficinas Reforma 222 - Miguel Hidalgo (2008)
  31: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIb',
    niveles: 30,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 400,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 32: Hospital General Xoco - Benito Juárez (1963)
  32: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIb',
    niveles: 5,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 300,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 33: Mercado San Juan - Cuauhtémoc (1955)
  33: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 1,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 230,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 34: Liverpool Insurgentes - Benito Juárez (2000)
  34: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIb',
    niveles: 5,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 35: Secretaría de Salud - Cuauhtémoc (1929)
  35: {
    tipoEstructura: 'mamposteria_confinada',
    zonaSismica: 'IIIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 36: Colegio de México - Tlalpan (1976)
  36: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIa',
    niveles: 4,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 320,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 37: La Comer Polanco - Miguel Hidalgo (2005)
  37: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIb',
    niveles: 2,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 220,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 38: CETRAM Chapultepec - Miguel Hidalgo (2012)
  38: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIb',
    niveles: 2,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 280,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 39: Fábrica Tres Estrellas - Azcapotzalco (1950s)
  39: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIa',
    niveles: 2,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'lamina_metalica',
    capacidadCargaTecho: 150,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 40: Centro Cultural Tlatelolco - Cuauhtémoc (1966)
  40: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 300,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 41: Hospital General Tláhuac (2008)
  41: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIId',
    niveles: 4,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 300,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 42: Mercado de Xochimilco (1960)
  42: {
    tipoEstructura: 'mamposteria_confinada',
    zonaSismica: 'I',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 43: Residencial Polanco Park - Miguel Hidalgo (2015)
  43: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIb',
    niveles: 20,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 380,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 44: Bodega Aurrera Milpa Alta (2010)
  44: {
    tipoEstructura: 'acero',
    zonaSismica: 'I',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'lamina_metalica',
    capacidadCargaTecho: 150,
    dictamenPostSismo2017: false,
    riesgoInundacion: 'bajo',
  },
  // 45: Centro Convenciones Tlatelolco - Cuauhtémoc (1966)
  45: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 2,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 46: WeWork Insurgentes - Benito Juárez (2017)
  46: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIb',
    niveles: 8,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 47: Forum Buenavista - Cuauhtémoc (2008)
  47: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIa',
    niveles: 4,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 48: Hospital General Cuajimalpa (2012)
  48: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'I',
    niveles: 4,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 320,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 49: Chedraui Lindavista - GAM (2003)
  49: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIa',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 50: Senado de la República - Cuauhtémoc (1930s/2011 renovation)
  50: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 4,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 320,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 51: Tec de Monterrey Campus CDMX - Tlalpan (1973)
  51: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIa',
    niveles: 4,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 300,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 52: Mercado de Tacubaya - Miguel Hidalgo (1960)
  52: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIb',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 250,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 53: Planta Cervecería Modelo - GAM (1960s)
  53: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'lamina_metalica',
    capacidadCargaTecho: 180,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 54: Residencial Torres de Mixcoac - Álvaro Obregón (2010)
  54: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIa',
    niveles: 12,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 55: SEP - Cuauhtémoc (1922)
  55: {
    tipoEstructura: 'mamposteria_confinada',
    zonaSismica: 'IIIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 56: Hospital Juárez - GAM (1847/1970 rebuild)
  56: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 7,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 320,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 57: CC Mundo E - Tlalpan (2008)
  57: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 320,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },

  // ==========================================================================
  // CANDIDATE ROOFS — Hospitals (IDs 1001-1015)
  // ==========================================================================

  // 1001: Hospital Regional López Mateos - Álvaro Obregón (1985)
  1001: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIa',
    niveles: 6,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 320,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 1002: Hospital Gea González - Tlalpan (1978)
  1002: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIa',
    niveles: 5,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 300,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 1003: Hospital Zona 32 Villa Coapa - Tlalpan (1990)
  1003: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIa',
    niveles: 4,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 300,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 1004: Hospital Psiquiátrico Fray Bernardino - Tlalpan (1967)
  1004: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 280,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 1005: Instituto Cardiología - Tlalpan (1976)
  1005: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'I',
    niveles: 7,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 1006: Hospital Zona 47 - Iztapalapa (1982)
  1006: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIc',
    niveles: 4,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 280,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 1007: Hospital Materno Infantil Inguarán - Cuauhtémoc (1975)
  1007: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 4,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 280,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 1008: Hospital General Balbuena - V. Carranza (1958)
  1008: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIb',
    niveles: 5,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 280,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 1009: Instituto Rehabilitación - Tlalpan (2000)
  1009: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'I',
    niveles: 5,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 320,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 1010: Hospital Pediátrico Coyoacán (1986)
  1010: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 280,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 1011: Hospital Zona 30 Iztacalco (1978)
  1011: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIc',
    niveles: 4,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 270,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 1012: Clínica Especialidades Azcapotzalco (1995)
  1012: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 300,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 1013: Hospital Magdalena de las Salinas - GAM (1968)
  1013: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 5,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 300,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 1014: Hospital Ángeles Acoxpa - Tlalpan (2002)
  1014: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIa',
    niveles: 6,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 1015: Centro Médico Dalinde - Cuauhtémoc (1970)
  1015: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 8,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 320,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },

  // ==========================================================================
  // CANDIDATE ROOFS — Mercados (IDs 2001-2015)
  // ==========================================================================

  // 2001: Mercado Hidalgo (La Lagunilla) - Cuauhtémoc (1957)
  2001: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 1,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 240,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 2002: Mercado de Abastos Iztapalapa (1972)
  2002: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIc',
    niveles: 1,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 250,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 2003: Mercado de Mixcoac - Benito Juárez (1965)
  2003: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIb',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 260,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 2004: Mercado San Cosme - Cuauhtémoc (1952)
  2004: {
    tipoEstructura: 'mamposteria_confinada',
    zonaSismica: 'IIIa',
    niveles: 1,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 180,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 2005: Mercado Abelardo L. Rodríguez - Cuauhtémoc (1934)
  2005: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 2,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 250,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 2006: Mercado Juárez - Cuauhtémoc (1960)
  2006: {
    tipoEstructura: 'mamposteria_confinada',
    zonaSismica: 'IIIa',
    niveles: 1,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'vigueta_bovedilla',
    capacidadCargaTecho: 180,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 2007: Mercado Santa Cruz Meyehualco - Iztapalapa (1975)
  2007: {
    tipoEstructura: 'mamposteria_confinada',
    zonaSismica: 'IIIc',
    niveles: 1,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'vigueta_bovedilla',
    capacidadCargaTecho: 160,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 2008: Mercado Pensil - Miguel Hidalgo (1963)
  2008: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIb',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 250,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 2009: Mercado San Ángel - Álvaro Obregón (1958)
  2009: {
    tipoEstructura: 'mamposteria_confinada',
    zonaSismica: 'IIa',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 220,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 2010: Mercado San Pedro de los Pinos - Benito Juárez (1962)
  2010: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIb',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 250,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 2011: Mercado Portales - Benito Juárez (1959)
  2011: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIb',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 240,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 2012: Mercado de Tláhuac (1970)
  2012: {
    tipoEstructura: 'mamposteria_confinada',
    zonaSismica: 'IIId',
    niveles: 1,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'vigueta_bovedilla',
    capacidadCargaTecho: 160,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 2013: Mercado Bola Iztapalapa (1978)
  2013: {
    tipoEstructura: 'mamposteria_confinada',
    zonaSismica: 'IIIc',
    niveles: 1,
    estadoEstructural: 'dano_mayor',
    materialTechumbre: 'vigueta_bovedilla',
    capacidadCargaTecho: 140,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 2014: Mercado de Tepepan - Xochimilco (1968)
  2014: {
    tipoEstructura: 'mamposteria_confinada',
    zonaSismica: 'I',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 2015: Mercado Nuevo San Lázaro - V. Carranza (1985)
  2015: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIb',
    niveles: 1,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 240,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },

  // ==========================================================================
  // CANDIDATE ROOFS — Supermercados (IDs 3001-3015)
  // ==========================================================================

  // 3001: Walmart Toreo - GAM (1995)
  3001: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIa',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 3002: Soriana Taxqueña - Coyoacán (2001)
  3002: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIa',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 3003: Chedraui División del Norte - BJ (1998)
  3003: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIb',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 3004: Superama Polanco - MH (2005)
  3004: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIb',
    niveles: 2,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 280,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 3005: La Comer Iztapalapa (1998)
  3005: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIc',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 180,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 3006: Soriana Azcapotzalco (2003)
  3006: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIa',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 3007: Walmart GAM (2000)
  3007: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIa',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 3008: HEB Cuauhtémoc (2015)
  3008: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIa',
    niveles: 2,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 220,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 3009: Bodega Aurrera Tláhuac (2008)
  3009: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIId',
    niveles: 1,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'lamina_metalica',
    capacidadCargaTecho: 150,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 3010: Chedraui Iztacalco (2002)
  3010: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIc',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 180,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 3011: Walmart Cuajimalpa (2010)
  3011: {
    tipoEstructura: 'acero',
    zonaSismica: 'I',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: false,
    riesgoInundacion: 'bajo',
  },
  // 3012: Soriana GAM Norte (2005)
  3012: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIa',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 3013: La Comer Xochimilco (2008)
  3013: {
    tipoEstructura: 'acero',
    zonaSismica: 'I',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: false,
    riesgoInundacion: 'medio',
  },
  // 3014: Chedraui V. Carranza (2000)
  3014: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIb',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 180,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 3015: Bodega Aurrera Magdalena Contreras (2012)
  3015: {
    tipoEstructura: 'acero',
    zonaSismica: 'I',
    niveles: 1,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 200,
    dictamenPostSismo2017: false,
    riesgoInundacion: 'bajo',
  },

  // ==========================================================================
  // CANDIDATE ROOFS — Centros Comerciales (IDs 4001-4015)
  // ==========================================================================

  // 4001: Plaza Oriente Iztapalapa (2005)
  4001: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIc',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 300,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 4002: Plaza Insurgentes - BJ (1999)
  4002: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIb',
    niveles: 4,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 4003: Galerías Coapa - Tlalpan (2010)
  4003: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 4004: Pabellón Polanco - MH (1990)
  4004: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIb',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 4005: Plaza Tepeyac - GAM (1940)
  4005: {
    tipoEstructura: 'mamposteria_confinada',
    zonaSismica: 'IIIa',
    niveles: 2,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'vigueta_bovedilla',
    capacidadCargaTecho: 180,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 4006: Centro Coyoacán (1952)
  4006: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 300,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 4007: Parque Toreo - GAM (2015)
  4007: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIa',
    niveles: 4,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 380,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 4008: Plaza Central de Abastos - Iztapalapa (1960)
  4008: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIc',
    niveles: 2,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 250,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 4009: Galerías Insurgentes - BJ (1992)
  4009: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIb',
    niveles: 4,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 350,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 4010: Multiplaza Aragón - GAM (1975)
  4010: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 2,
    estadoEstructural: 'dano_menor',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 260,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 4011: Paseo Acoxpa - Tlalpan (2008)
  4011: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 320,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'bajo',
  },
  // 4012: Plaza Azcapotzalco (2010)
  4012: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 320,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 4013: Grand Plaza Iztacalco (2012)
  4013: {
    tipoEstructura: 'acero',
    zonaSismica: 'IIIc',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losacero',
    capacidadCargaTecho: 300,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
  // 4014: Plaza Las Américas - GAM (1998)
  4014: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIa',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 300,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'medio',
  },
  // 4015: CC Venustiano Carranza (2005)
  4015: {
    tipoEstructura: 'concreto_armado',
    zonaSismica: 'IIIb',
    niveles: 3,
    estadoEstructural: 'seguro',
    materialTechumbre: 'losa_concreto',
    capacidadCargaTecho: 280,
    dictamenPostSismo2017: true,
    riesgoInundacion: 'alto',
  },
}
