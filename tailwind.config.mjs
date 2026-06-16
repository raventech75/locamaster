/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Fond blanc chaud, presque crème
        bg: '#FBF9F4',
        surface: '#F2ECE0',
        'surface-2': '#E9E0CE',
        border: '#E4DCCB',
        'border-strong': '#15120D',
        // Encre quasi-noire, chaude
        ink: '#15120D',
        'ink-2': '#3D362B',
        muted: '#857B6A',
        // Accent miel doré — punchy, saturé
        accent: '#F2B01E',
        'accent-hover': '#DC9C0A',
        'accent-dark': '#7A5A06',
        'accent-soft': '#FBEBC4',
        'accent-text': '#5C4404',
        white: '#FFFFFF',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', '"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        '5xl': ['3rem', { lineHeight: '1.02' }],
        '6xl': ['3.75rem', { lineHeight: '0.98' }],
        '7xl': ['4.75rem', { lineHeight: '0.94' }],
        '8xl': ['6.5rem', { lineHeight: '0.9' }],
        '9xl': ['8.5rem', { lineHeight: '0.86' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '128': '32rem',
      },
      maxWidth: {
        'prose-xl': '74ch',
        '8xl': '90rem',
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '8px',
        'md': '12px',
        'lg': '18px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '40px',
      },
      boxShadow: {
        'sm': '0 1px 3px 0 rgb(21 18 13 / 0.05)',
        DEFAULT: '0 2px 12px 0 rgb(21 18 13 / 0.06)',
        'md': '0 8px 30px -6px rgb(21 18 13 / 0.1)',
        'lg': '0 20px 50px -12px rgb(21 18 13 / 0.18)',
        'brutal': '6px 6px 0 0 #15120D',
        'brutal-accent': '6px 6px 0 0 #F2B01E',
        'accent': '0 10px 40px -8px rgb(242 176 30 / 0.5)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.03em',
        'widest': '0.2em',
      },
      aspectRatio: {
        '3/2': '3 / 2',
        '4/3': '4 / 3',
        '16/9': '16 / 9',
        '9/16': '9 / 16',
      },
    },
  },
  plugins: [],
};
