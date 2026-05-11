/**
 * useFunPalette — paleta de colores e iconografía para el patrón .fun-card
 *
 * Provee 9 tonos diferenciados (primary, eco, secondary, accent, alert,
 * violet, teal, rose, indigo) más un set de iconos semánticos (24x24).
 * Cualquier página puede importarlo para mantener consistencia visual.
 */

export type FunColorKey =
  | 'primary'
  | 'eco'
  | 'secondary'
  | 'accent'
  | 'alert'
  | 'violet'
  | 'teal'
  | 'rose'
  | 'indigo'

interface FunSwatch {
  hex: string
  light: string
}

const palette: Record<FunColorKey, FunSwatch> = {
  primary: { hex: '#0E5E3A', light: '#ECFDF5' },
  eco: { hex: '#5BAA2E', light: '#F0FAE5' },
  secondary: { hex: '#18A5E3', light: '#E6F6FD' },
  accent: { hex: '#D78A0F', light: '#FEF5E2' },
  alert: { hex: '#D9363E', light: '#FDECEE' },
  violet: { hex: '#7C3AED', light: '#F2EBFC' },
  teal: { hex: '#0EA5A9', light: '#E0F5F5' },
  rose: { hex: '#E11D6F', light: '#FDE8F2' },
  indigo: { hex: '#4F46E5', light: '#EAEAFB' },
}

const iconPaths: Record<string, string[]> = {
  leaf: [
    'M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z',
    'M12 18c2-3 3-6 3-10',
  ],
  area: [
    'M4 4h16v16H4z',
    'M4 4l16 16',
    'M9 4v2',
    'M15 4v2',
    'M4 9h2',
    'M4 15h2',
    'M18 20v-2',
    'M20 15h-2',
  ],
  target: [
    'M12 2v3',
    'M12 19v3',
    'M2 12h3',
    'M19 12h3',
    'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
  ],
  ai: [
    'M9 2v3',
    'M15 2v3',
    'M5 8h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z',
    'M9 13h.01',
    'M15 13h.01',
    'M9 17c1 1 5 1 6 0',
    'M3 12h-1',
    'M22 12h-1',
  ],
  map: [
    'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
    'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  ],
  chart: ['M3 3v18h18', 'M7 16V11', 'M11 16V7', 'M15 16v-3', 'M19 16V9'],
  score: [
    'M6 9V5h12v4a6 6 0 0 1-12 0z',
    'M6 5H4a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4',
    'M18 5h2a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4',
    'M10 15h4v3h-4z',
    'M9 21h6',
  ],
  pilot: [
    'M4.5 16.5L9 12l3 3-4.5 4.5L4.5 16.5z',
    'M14 7c0-5 5-6 5-6s-1 5-6 6',
    'M9 12c-5 0-6 5-6 5s5-1 6-6',
    'M14 7l3 3',
    'M12 15l-1.5 1.5',
    'M14.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z',
  ],
  thermometer: ['M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z'],
  water: ['M12 2.5s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z'],
  co2: [
    'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
    'M3.27 6.96 12 12.01l8.73-5.05',
    'M12 22.08V12',
  ],
  people: [
    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
    'M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    'M23 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
  ],
  satellite: [
    'M2 22l5-5',
    'M7 17a4 4 0 1 1 5.66-5.66l-5.66 5.66z',
    'M16 16l-3-3',
    'M19 13l-2-2',
    'M14 8l3 3',
    'M11 11l3 3a2.83 2.83 0 0 0 4-4l-3-3a2.83 2.83 0 0 0-4 4z',
  ],
  scale: [
    'M12 3v18',
    'M5 8h14',
    'M5 8l-3 5a4 4 0 0 0 6 0z',
    'M19 8l3 5a4 4 0 0 1-6 0z',
    'M8 21h8',
  ],
  flag: ['M4 22V4', 'M4 4h12l-2 4 2 4H4', 'M9 22h-2', 'M9 22a3 3 0 0 0 3-3v-4'],
  shield: [
    'M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z',
    'M9 12l2 2 4-4',
  ],
  book: [
    'M4 19.5A2.5 2.5 0 0 1 6.5 17H20',
    'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  ],
  layers: [
    'M12 2L2 7l10 5 10-5-10-5z',
    'M2 17l10 5 10-5',
    'M2 12l10 5 10-5',
  ],
  cloud: ['M17.5 19a4.5 4.5 0 1 0-2-8.7A6 6 0 0 0 4 12.5 4 4 0 0 0 6 20h11.5z'],
  zap: ['M13 2L3 14h7l-1 8 10-12h-7l1-8z'],
  recycle: [
    'M7 17l-2-3 2-3',
    'M5 14h8a4 4 0 0 0 4-4V7',
    'M17 7l2-2-2-2',
    'M14 21l-1-2-1 2',
    'M13 19a4 4 0 0 0 4-4',
  ],
  hand: [
    'M9 11V6a2 2 0 0 1 4 0v5',
    'M9 11V4a2 2 0 0 1 4 0v7',
    'M13 11V6a2 2 0 0 1 4 0v8',
    'M17 11V8a2 2 0 0 1 4 0v8a6 6 0 0 1-6 6h-1a7 7 0 0 1-7-7v-5a2 2 0 0 1 4 0',
  ],
  building: [
    'M3 21h18',
    'M5 21V7l7-4 7 4v14',
    'M9 9h6',
    'M9 13h6',
    'M9 17h6',
  ],
  heart: [
    'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  ],
  spark: [
    'M12 2v4',
    'M12 18v4',
    'M4.93 4.93l2.83 2.83',
    'M16.24 16.24l2.83 2.83',
    'M2 12h4',
    'M18 12h4',
    'M4.93 19.07l2.83-2.83',
    'M16.24 7.76l2.83-2.83',
  ],
  arrowRight: ['M5 12h14', 'M12 5l7 7-7 7'],
  community: [
    'M17 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'M7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'M2 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2',
    'M14 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2',
  ],
}

export function useFunPalette() {
  const funHex = (key: string | undefined) => palette[(key as FunColorKey) || 'primary']?.hex || palette.primary.hex
  const funLight = (key: string | undefined) =>
    palette[(key as FunColorKey) || 'primary']?.light || palette.primary.light
  const funPaths = (icono: string | undefined) => {
    if (!icono) return iconPaths.leaf
    return iconPaths[icono] || iconPaths.leaf
  }
  const funStyle = (key: string | undefined) => ({
    '--fun-color': funHex(key),
    '--fun-light': funLight(key),
  })

  return { funHex, funLight, funPaths, funStyle }
}
