module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'pr-clr': '#7269ef',
        'sr-clr': '#f5f7fb',
        'ac-clr': '#e6ebf5',
        'txt-clr': '#8c929b'
      },
      height: {
        'hundred': '100vh'
      }
    },
   
  },
  variants: {
    extend: {
      
    },
  },
  plugins: [],
}
