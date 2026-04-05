import type { IndicadorHidricoAlcaldia } from '~/types/sources'

/**
 * Indicadores hídricos por alcaldía — datos de demostración.
 * Precipitación basada en gradiente altitudinal real de CDMX:
 *   - Centro/norte (~2240 msnm): ~700-800 mm/año
 *   - Poniente/oriente (~2300 msnm): ~800-950 mm/año
 *   - Sur/Ajusco (~2800-3000 msnm): ~1000-1200 mm/año
 * Captación pluvial: 15-25 L/m2/año, Eficiencia retención: 50-75%
 */
export const indicadoresHidricos: IndicadorHidricoAlcaldia[] = [
  {
    alcaldia: 'Álvaro Obregón',
    captacionPluvial: 20.5,
    precipitacionMediaAnual: 920,
    escorrentiaEvitada: 185000,
    superficieVerdeCaptadora: 9025,
    eficienciaRetencion: 65,
  },
  {
    alcaldia: 'Azcapotzalco',
    captacionPluvial: 16.2,
    precipitacionMediaAnual: 720,
    escorrentiaEvitada: 98000,
    superficieVerdeCaptadora: 6050,
    eficienciaRetencion: 55,
  },
  {
    alcaldia: 'Benito Juárez',
    captacionPluvial: 17.8,
    precipitacionMediaAnual: 760,
    escorrentiaEvitada: 142000,
    superficieVerdeCaptadora: 7980,
    eficienciaRetencion: 60,
  },
  {
    alcaldia: 'Coyoacán',
    captacionPluvial: 21.3,
    precipitacionMediaAnual: 950,
    escorrentiaEvitada: 198000,
    superficieVerdeCaptadora: 9290,
    eficienciaRetencion: 68,
  },
  {
    alcaldia: 'Cuajimalpa',
    captacionPluvial: 24.1,
    precipitacionMediaAnual: 1100,
    escorrentiaEvitada: 168000,
    superficieVerdeCaptadora: 6970,
    eficienciaRetencion: 72,
  },
  {
    alcaldia: 'Cuauhtémoc',
    captacionPluvial: 15.8,
    precipitacionMediaAnual: 710,
    escorrentiaEvitada: 125000,
    superficieVerdeCaptadora: 7910,
    eficienciaRetencion: 54,
  },
  {
    alcaldia: 'Gustavo A. Madero',
    captacionPluvial: 16.5,
    precipitacionMediaAnual: 740,
    escorrentiaEvitada: 112000,
    superficieVerdeCaptadora: 6790,
    eficienciaRetencion: 56,
  },
  {
    alcaldia: 'Iztacalco',
    captacionPluvial: 15.2,
    precipitacionMediaAnual: 700,
    escorrentiaEvitada: 78000,
    superficieVerdeCaptadora: 5130,
    eficienciaRetencion: 52,
  },
  {
    alcaldia: 'Iztapalapa',
    captacionPluvial: 16.8,
    precipitacionMediaAnual: 780,
    escorrentiaEvitada: 145000,
    superficieVerdeCaptadora: 8630,
    eficienciaRetencion: 55,
  },
  {
    alcaldia: 'Magdalena Contreras',
    captacionPluvial: 24.5,
    precipitacionMediaAnual: 1150,
    escorrentiaEvitada: 152000,
    superficieVerdeCaptadora: 6200,
    eficienciaRetencion: 73,
  },
  {
    alcaldia: 'Miguel Hidalgo',
    captacionPluvial: 17.2,
    precipitacionMediaAnual: 750,
    escorrentiaEvitada: 132000,
    superficieVerdeCaptadora: 7670,
    eficienciaRetencion: 58,
  },
  {
    alcaldia: 'Milpa Alta',
    captacionPluvial: 25.0,
    precipitacionMediaAnual: 1200,
    escorrentiaEvitada: 120000,
    superficieVerdeCaptadora: 4800,
    eficienciaRetencion: 75,
  },
  {
    alcaldia: 'Tláhuac',
    captacionPluvial: 19.5,
    precipitacionMediaAnual: 880,
    escorrentiaEvitada: 108000,
    superficieVerdeCaptadora: 5540,
    eficienciaRetencion: 62,
  },
  {
    alcaldia: 'Tlalpan',
    captacionPluvial: 23.8,
    precipitacionMediaAnual: 1080,
    escorrentiaEvitada: 210000,
    superficieVerdeCaptadora: 8820,
    eficienciaRetencion: 71,
  },
  {
    alcaldia: 'Venustiano Carranza',
    captacionPluvial: 15.5,
    precipitacionMediaAnual: 705,
    escorrentiaEvitada: 82000,
    superficieVerdeCaptadora: 5290,
    eficienciaRetencion: 53,
  },
  {
    alcaldia: 'Xochimilco',
    captacionPluvial: 22.6,
    precipitacionMediaAnual: 1020,
    escorrentiaEvitada: 175000,
    superficieVerdeCaptadora: 7740,
    eficienciaRetencion: 69,
  },
]
