/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        surface: '#1A1A1A',
        surfaceElevated: '#222222',
        border: '#333333',
        textPrimary: '#EAEAEA',
        textSecondary: '#888888',
        placeholder: '#555555',
        brand: {
          DEFAULT: '#0070F3',
          50: '#ecf3ff',
          100: '#d8e7ff',
          200: '#b1cfff',
          300: '#8ab7ff',
          400: '#639fff',
          500: '#0070F3',
          600: '#2365d1',
          700: '#184da6',
          800: '#10367a',
          900: '#09204f',
        },
        sentiment: {
          positive: '#16A34A',
          negative: '#EF4444',
          neutral: '#EAB308',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      },
      boxShadow: {
        soft: '0 1px 0 0 rgba(255,255,255,0.02) inset, 0 1px 2px 0 rgba(0,0,0,0.4)',
        glow: '0 0 0 2px rgba(59,130,246,0.35)',
      },
      borderRadius: {
        xl: '14px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '1.5rem',
          lg: '2rem',
        },
      },
      transitionTimingFunction: {
        subtle: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [],
}


