import { greenRoofs } from '~/data/mock-roofs'
import { candidateRoofs } from '~/data/mock-candidates'
import { validationRecords } from '~/data/mock-validations'
import { mockCadastralData } from '~/data/mock-cadastral'
import { mockDatosEstructurales } from '~/data/mock-datos-estructurales'
import { indicesBioticos } from '~/data/mock-indices-bioticos'
import { indicadoresHidricos } from '~/data/mock-indicadores-hidricos'
import { indicadoresEstructurales } from '~/data/mock-indicadores-estructurales'
import type {
  CandidateRoof,
  ValidationRecord,
  SourceMeta,
  WithSourceMeta,
  GreenRoofExtended,
  CandidateRoofExtended,
  ValidationRecordExtended,
  LecturaCalidadAire,
  IndiceBioticoAlcaldia,
  IndicadorHidricoAlcaldia,
  IndicadorEstructuralAlcaldia,
  OrigenDeteccion,
} from '~/types'

function mockMeta(overrides?: Partial<SourceMeta>): SourceMeta {
  return {
    sourceType: 'mock',
    sourceName: 'Mock',
    lastUpdated: '2025-01-15',
    confidenceLevel: 0.6,
    validationStatus: 'sin_verificar',
    ...overrides,
  }
}

export function getMockGreenRoofs(): WithSourceMeta<GreenRoofExtended>[] {
  return greenRoofs.map((roof) => {
    const structural = mockDatosEstructurales[roof.id]
    return {
      ...roof,
      datosCatastrales: structural ? { datosEstructurales: structural } : undefined,
      _source: mockMeta(),
    }
  })
}

export function getMockCandidates(): WithSourceMeta<CandidateRoofExtended>[] {
  return candidateRoofs.map((candidate) => {
    const cadastral = mockCadastralData[candidate.id]
    const structural = mockDatosEstructurales[candidate.id]
    return {
      ...candidate,
      datosCatastrales: cadastral
        ? { ...cadastral, datosEstructurales: structural || undefined }
        : structural
          ? { datosEstructurales: structural }
          : undefined,
      _source: mockMeta(),
    }
  })
}

const origenOptions: OrigenDeteccion[] = ['satelital', 'catastral', 'reporte_ciudadano', 'ia_automatica']

export function getMockValidations(): WithSourceMeta<ValidationRecordExtended>[] {
  return validationRecords.map((record, index) => ({
    ...record,
    origenDeteccion: origenOptions[index % origenOptions.length],
    _source: mockMeta(),
  }))
}

export function getMockAirQuality(): WithSourceMeta<LecturaCalidadAire>[] {
  const estaciones = ['Merced', 'Pedregal', 'Tlalnepantla', 'UAX', 'Ajusco']
  const parametros = ['O3', 'PM2.5', 'PM10', 'NO2', 'CO']
  const readings: WithSourceMeta<LecturaCalidadAire>[] = []

  for (const estacion of estaciones) {
    for (const parametro of parametros) {
      readings.push({
        estacion,
        parametro,
        valor: Math.round(Math.random() * 100 * 10) / 10,
        unidad: parametro === 'CO' ? 'ppm' : 'ppb',
        fecha: '2025-01-15',
        _source: mockMeta({
          sourceName: 'Mock',
          sourceUrl: 'http://datosabiertos.aire.cdmx.gob.mx',
        }),
      })
    }
  }

  return readings
}

export function getMockIndicesBioticos(): WithSourceMeta<IndiceBioticoAlcaldia>[] {
  return indicesBioticos.map((record) => ({
    ...record,
    _source: mockMeta({
      sourceName: 'CONABIO',
      sourceUrl: 'https://www.snib.mx',
    }),
  }))
}

export function getMockIndicadoresHidricos(): WithSourceMeta<IndicadorHidricoAlcaldia>[] {
  return indicadoresHidricos.map((record) => ({
    ...record,
    _source: mockMeta({
      sourceName: 'CONAGUA',
      sourceUrl: 'https://smn.conagua.gob.mx',
    }),
  }))
}

export function getMockIndicadoresEstructurales(): WithSourceMeta<IndicadorEstructuralAlcaldia>[] {
  return indicadoresEstructurales.map((record) => ({
    ...record,
    _source: mockMeta({
      sourceName: 'SIGCDMX',
      sourceUrl: 'https://sig.cdmx.gob.mx',
    }),
  }))
}
