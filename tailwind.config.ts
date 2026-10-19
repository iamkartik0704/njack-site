import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#07080A",
        foreground: "#F3F4F6",
        obsidian: {
          DEFAULT: '#07080A',
          surface: '#0E1016',
          card: 'rgba(14, 16, 22, 0.65)',
          border: 'rgba(255, 255, 255, 0.07)',
          specular: 'rgba(255, 255, 255, 0.12)',
        },
        accent: {
          DEFAULT: '#CCFF00',
          lime: '#CCFF00',
          dim: 'rgba(204, 255, 0, 0.12)',
          glow: 'rgba(204, 255, 0, 0.35)',
        },
        muted: {
          DEFAULT: '#8A8F98',
          text: '#8A8F98',
          hairline: 'rgba(255, 255, 255, 0.07)',
        },
        njack: {
          50: '#f6fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#a3e635',
          500: '#CCFF00',
          600: '#84cc16',
          700: '#65a30d',
          800: '#4d7c0f',
          900: '#365314',
          accent: '#CCFF00',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'var(--font-space-grotesk)', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'specular-top': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.12)',
        'accent-glow': '0 0 25px -4px rgba(204, 255, 0, 0.45)',
        'obsidian-card': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 20px 40px -15px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'radar-sweep': 'radarSweep 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
