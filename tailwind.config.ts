import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#0f172a',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#cbd5e1',
          300: '#e2e8f0',
          200: '#f1f5f9',
        },
        blue: {
          600: '#2563eb',
          500: '#3b82f6',
          400: '#60a5fa',
        },
        cyan: {
          600: '#0891b2',
          500: '#06b6d4',
          400: '#22d3ee',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
