/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        accent: 'var(--accent-color)',
        background: 'var(--background)',
        text: 'var(--text-color)',
      },
      fontFamily: {
        sans: 'var(--font-family)',
      },
      borderRadius: {
        custom: 'var(--border-radius)',
      },
      boxShadow: {
        custom: 'var(--box-shadow)',
      },
    },
  },
  plugins: [],
}
