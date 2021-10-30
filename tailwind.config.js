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
        heroHeight: 'calc(100vh / 2.5)',
        '-999em': '-999em',
        '1em': '1em',
        '900px': '900px',
        '600px': '600px',
        '500px': '500px',
        '450px': '450px',
        '300px': '300px',
        '225px': '225px',
        '200px': '200px',
        '150px': '150px',
        '141px': '141px',
        '94px': '94px',
        '68px': '68px',
        '48px': '48px',
        '46px': '46px',
        '38px': '38px',
        '34px': '34px',
        '5px': '5px'
      },
      minWidth: {
        '1em': '1em',
        '600px': '600px',
        '300px': '300px',
        '200px': '200px',
        '150px': '150px'
      },
      maxWidth: {
        '1em': '1em',
        '600px': '600px',
        '300px': '300px',
        '200px': '200px',
        '150px': '150px'
      },
      maxHeight: {
        '1em': '1em',
        '600px': '600px',
        '360px': '360px',
        '300px': '300px',
        '200px': '200px',
        '150px': '150px'
      },
      minHeight: {
        '1em': '1em',
        '600px': '600px',
        '300px': '300px',
        '200px': '200px',
        '150px': '150px',
        '2px': '2px'
      },
      borderRadius: {
        '50%': '50%'
      },
      fontSize: {
        '3em': '3em',
        '2em': '2em',
        '1.5em': '1.5em',
        '1.3em': '1.3em',
        '1.1em': '1.1em',
        '1em': '1em',
        '1rem': '1rem',
        '0.6em': '0.6em',
        '0.4rem': '0.4rem'
      },
      strokeWidth: {
        '10s': '10'
      },
      backgroundPosition: {
        'top-center': 'top center',
        '50-50': '50% 50%'
      },
      zIndex: {
        1: '1'
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
