/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-primary': '#CB182E',
        'medical-secondary': '#A61520',
        'medical-gray-100': '#F3F4F6',
        'medical-gray-200': '#E5E7EB',
        'medical-gray-300': '#D1D5DB',
        'medical-gray-700': '#374151',
        'medical-gray-900': '#111827',
      },
      boxShadow: {
        'medical': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}