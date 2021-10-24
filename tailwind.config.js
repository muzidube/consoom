module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: {
          primary: '#F87666'
        },
        blue: {
          primary: '#22254B',
          secondary: '#373b69'
        }
      },
      spacing: {
        '-999em': '-999em',
        mediaW: '600px',
        mediaH: '200px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
