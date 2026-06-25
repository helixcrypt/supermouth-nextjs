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
        'sm-navy': '#0a0e1a',
        'sm-dark': '#111827',
        'sm-blue': '#1e3a5f',
        'sm-accent': '#00b4d8',
        'sm-green': '#06d6a0',
        'sm-white': '#f8fafc',
        'sm-gray': '#94a3b8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
