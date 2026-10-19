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
        background: "var(--background)",
        foreground: "var(--foreground)",
        njack: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          flame: '#ff5500',
          amber: '#ff8c00',
          glow: '#ff6b00',
        },
        surface: {
          dark: '#060709',
          card: '#0e0f14',
          muted: '#15161c',
          border: 'rgba(255, 107, 0, 0.14)',
          hover: 'rgba(255, 107, 0, 0.08)',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-code)', 'monospace'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -4px rgba(255, 107, 0, 0.45)',
        'glow-flame': '0 0 35px -5px rgba(255, 69, 0, 0.55)',
        'glow-amber': '0 0 25px -4px rgba(245, 158, 11, 0.45)',
        'glow-cyan': '0 0 25px -5px rgba(255, 107, 0, 0.35)',
        'card-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
        'glow-gradient': "radial-gradient(circle at 50% 0%, rgba(255, 85, 0, 0.16) 0%, transparent 60%)",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
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
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        'shimmer-slide': {
          to: {
            transform: 'translate(calc(100cqw - 100%), 0)',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
