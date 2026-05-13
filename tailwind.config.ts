import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0E5E3A',
          light: '#1A7A4E',
          dark: '#0A4A2D',
          50: '#E8F5EE',
          100: '#C5E8D4',
          200: '#93D4AF',
          300: '#5FBF89',
          400: '#37A96A',
          500: '#0E5E3A',
          600: '#0C5233',
          700: '#0A452B',
          800: '#073822',
          900: '#042B1A',
        },
        secondary: {
          DEFAULT: '#18A5E3',
          light: '#3BB5E9',
          dark: '#1290CC',
        },
        eco: {
          DEFAULT: '#79C141',
          light: '#8FCD5F',
          dark: '#64A834',
        },
        accent: {
          DEFAULT: '#F2A81D',
          light: '#F5BA45',
          dark: '#D99517',
        },
        alert: {
          DEFAULT: '#D9363E',
          light: '#E05A61',
          dark: '#BF2D34',
        },
        'slate-custom': {
          DEFAULT: '#5E6B78',
          light: '#7A8694',
          dark: '#4A5560',
        },
        surface: {
          DEFAULT: '#F7F8F4',
          warm: '#F5F3EE',
          cool: '#F0F4F8',
        },
        ink: {
          DEFAULT: '#1F2937',
          light: '#374151',
          muted: '#6B7280',
        },
      },
      fontFamily: {
        // 'Inter Variable' = nombre que expone @fontsource-variable/inter.
        // Mantengo 'Inter' como fallback porque algunos navegadores antiguos
        // aún cargan la versión estática local si la tienen instalada.
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk Variable"', '"Space Grotesk"', '"Inter Variable"', 'sans-serif'],
      },
      borderRadius: {
        card: '0.75rem',
        badge: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08)',
        panel: '0 2px 8px rgba(0,0,0,0.06)',
        'glow-primary': '0 0 24px rgba(14, 94, 58, 0.35)',
        'glow-eco': '0 0 24px rgba(121, 193, 65, 0.35)',
        'glow-accent': '0 0 24px rgba(242, 168, 29, 0.35)',
      },
    },
  },
  plugins: [],
}
