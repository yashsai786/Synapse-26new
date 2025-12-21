/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        ring: 'var(--ring)',
        // Add other custom colors as needed
      },
      fontFamily: {
        card: ['CardCharacters', 'sans-serif'],
      },
    },
  },
  // ...other config...
}