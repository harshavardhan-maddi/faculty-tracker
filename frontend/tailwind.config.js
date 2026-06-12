/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C9DFF',
          dark: '#5C7CE5',
        },
        secondary: {
          DEFAULT: '#A5D6A7',
          dark: '#81C784',
        },
        customBg: {
          DEFAULT: '#F8FAFC',
          dark: '#0F172A',
        },
        customCard: {
          DEFAULT: '#FFFFFF',
          dark: '#1E293B',
        },
        success: {
          DEFAULT: '#81C784',
          dark: '#66BB6A',
        },
        warning: {
          DEFAULT: '#FFD54F',
          dark: '#FFCA28',
        },
        danger: {
          DEFAULT: '#EF9A9A',
          dark: '#E57373',
        },
        customText: {
          DEFAULT: '#334155',
          dark: '#F1F5F9',
          muted: '#64748B',
          mutedDark: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 8px 32px 0 rgba(124, 157, 255, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
