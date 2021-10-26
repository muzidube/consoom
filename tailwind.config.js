module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        grey: {
          background: '#dbdbdb'
        },
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
        '600px': '600px',
        '500px': '500px',
        '225px': '225px',
        '200px': '200px',
        '150px': '150px',
        '48px': '48px',
        '38px': '38px',
        '34px': '34px',
        '5px': '5px'
      },
      minWidth: {
        '600px': '600px',
        '200px': '200px',
        '150px': '150px'
      },
      borderRadius: {
        '50%': '50%'
      },
      fontSize: {
        '0.6em': '0.6em',
        '0.4rem': '0.4rem',
        '1em': '1em'
      },
      strokeWidth: {
        '10s': '10'
      },
      fill: {
        none: 'none'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
