/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcd9ff',
          300: '#8ec1ff',
          400: '#599cff',
          500: '#3478ff',
          600: '#1f57f5',
          700: '#1843db',
          800: '#1938b0',
          900: '#1a338b',
        },
        accent: {
          400: '#ffb454',
          500: '#ff9a1f',
          600: '#f5790a',
        },
        ink: {
          900: '#0b1220',
          800: '#1a2236',
          700: '#2a3450',
          600: '#475069',
        },
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
        jp: ['Hiragino Sans', 'Yu Gothic', 'sans-serif'],
        kr: ['Apple SD Gothic Neo', 'Malgun Gothic', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(15, 30, 70, 0.18)',
        soft: '0 4px 14px -4px rgba(15, 30, 70, 0.10)',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        pop: 'pop 0.25s ease-out',
        floaty: 'floaty 4s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};
