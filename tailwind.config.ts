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
          DEFAULT: '#FF5722',
          orange: '#FF5722',
          amber: '#FF8A00',
          crimson: '#D9381E',
          dim: 'rgba(255, 87, 34, 0.12)',
          glow: 'rgba(255, 87, 34, 0.35)',
        },
        muted: {
          DEFAULT: '#8A8F98',
          text: '#8A8F98',
          hairline: 'rgba(255, 255, 255, 0.07)',
        },
        njack: {
          orange: '#FF5722',
          amber: '#FF8A00',
          crimson: '#D9381E',
          glow: 'rgba(255, 87, 34, 0.35)',
          dim: 'rgba(255, 87, 34, 0.12)',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF5722',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'var(--font-syne)', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'specular-top': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.12)',
        'accent-glow': '0 0 25px -4px rgba(255, 87, 34, 0.45)',
        'njack-glow': '0 0 30px -4px rgba(255, 87, 34, 0.55)',
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
