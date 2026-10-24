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
        // Neutrals tinted toward the brand hue; never pure #000 / #fff.
        ink: {
          DEFAULT: '#07080A',
          raised: '#0E1016',
          hairline: 'rgba(255, 247, 243, 0.06)',
          line: 'rgba(255, 247, 243, 0.10)',
          edge: 'rgba(255, 247, 243, 0.18)',
        },
        // Secondary: a light inverted surface, not a second accent hue.
        bone: {
          DEFAULT: '#E8E0D4',
          paper: '#F4F1EC',
          deep: '#CFC5B5',
          ink: '#1A1714',
        },
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
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
      },
      spacing: {
        'sec-tight': '3.5rem',
        'sec': '6rem',
        'sec-loose': '9rem',
      },
      maxWidth: {
        prose: '68ch',
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
        // Tinted toward the background hue rather than a neon glow.
        'lift': '0 1px 2px rgba(7, 8, 10, 0.5), 0 12px 32px -12px rgba(7, 8, 10, 0.8)',
        'lift-bone': '0 1px 2px rgba(26, 23, 20, 0.08), 0 12px 32px -12px rgba(26, 23, 20, 0.18)',
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
