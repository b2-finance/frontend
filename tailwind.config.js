/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        appBlueDark: '#22577A',
        appBlueMed: '#38A3A5',
        appGreenDark: '#57CC99',
        appGreenMed: '#80ED99',
        appGreenLight: '#C7F9CC'
      }
    },
    screens: {
      tablet: '640px',
      laptop: '768px',
      desktop: '1024px'
    }
  },
  plugins: []
};
