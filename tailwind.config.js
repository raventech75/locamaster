/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dj-purple': '#8B5CF6',
        'dj-pink': '#EC4899',
        'dj-blue': '#3B82F6',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { 
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' 
          },
          '100%': { 
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' 
          },
        },
      },
    },
  },
  plugins: [],
}