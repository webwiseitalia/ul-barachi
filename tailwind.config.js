/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'verde-bosco': '#4A7C59',
        'marrone-legno': '#8B5A2B',
        'bianco-neve': '#FFFFFF',
        'beige-chiaro': '#F5F5DC',
        // Accent colors
        'arancione-caldo': '#E07B39',
        'azzurro-cielo': '#87CEEB',
        'legno-chiaro': '#D4A574',
        // Neutral colors
        'grigio-scuro': '#3D3D3D',
        'grigio-medio': '#6B6B6B',
        'grigio-chiaro': '#E8E8E8',
        'quasi-nero': '#2C2C2C',
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}
