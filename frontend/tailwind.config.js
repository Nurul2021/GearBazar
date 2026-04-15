const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', ...defaultTheme.fontFamily.sans],
        mono: ['Roboto Mono', 'ui-monospace', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        'xs': ['0.8125rem', { lineHeight: '1.25rem' }],
        'sm': ['0.875rem', { lineHeight: '1.375rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.625rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      colors: {
        // Primary - Deep Navy/Industrial Blue for B2B
        navy: {
          50: '#f8fafc',
          100: '#e2e8f0',
          200: '#cbd5e1',
          300: '#94a3b8',
          400: '#64748b',
          500: '#334155', // Primary button, headings
          600: '#1e293b',
          700: '#0f172a',
          800: '#020617',
          900: '#000000',
          950: '#000000',
        },
        // Secondary - Industrial Orange/Red for CTAs, accents
        rust: {
          50: '#fff7ed',
          100: '#fed7aa',
          200: '#fdba74',
          300: '#fb923c',
          400: '#f97316', // Alerts, important buttons
          500: '#ea580c',
          600: '#c2410c',
          700: '#9a3412',
          800: '#7c2d12',
          900: '#4b1d0f',
        },
        // Success - Auto parts green
        gear: {
          50: '#f0fdf4',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        // Neutral Grays - Professional B2B
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Extend existing
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
        'card': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
        'card-lg': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'elevated': '0 35px 60px -12px rgb(0 0 0 / 0.25)',
        'floating': '0 20px 40px -10px rgb(0 0 0 / 0.2)',
        'glow': '0 0 0 1px rgb(59 130 246 / 0.5), 0 0 0 5px rgb(59 130 246 / 0.25)',
        'glow-lg': '0 0 0 1px rgb(59 130 246), 0 0 0 5px rgb(59 130 246 / 0.5), 0 0 0 10px rgb(59 130 246 / 0.25)',
        // Dark mode shadows
        'dark-card': '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 10px 10px -5px rgb(0 0 0 / 0.3)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgb(59 130 246 / 0.5)' },
          '50%': { boxShadow: '0 0 0 10px rgb(59 130 246 / 0.25)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-10px,0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
}

