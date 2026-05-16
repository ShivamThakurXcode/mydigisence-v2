import type { Config } from 'tailwindcss'

// Tailwind v4 reads theme from @theme blocks in globals.css.
// This file is only needed for content scanning and dark mode strategy.
const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
}

export default config
