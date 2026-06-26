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
        'sm-bg':      '#eef0f8',
        'sm-bg-alt':  '#f5f6fc',
        'sm-navy':    '#1a2e6e',
        'sm-dark':    '#0f1e52',
        'sm-teal':    '#4ab8c4',
        'sm-teal-bg': '#d4eef1',
        'sm-peach':   '#f9d5c5',
        'sm-yellow':  '#f5d800',
        'sm-purple':  '#4a2fb5',
        'sm-green':   '#00b386',
        'sm-white':   '#ffffff',
        'sm-gray':    '#6b7a99',
        'sm-accent':  '#f5d800',
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
