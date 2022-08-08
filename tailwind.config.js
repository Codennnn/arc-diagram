const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        success: colors.emerald,
        warning: colors.amber,
        error: colors.red,
        main: colors.slate,
        'node-container': colors.slate['100'],
      },
      height: {
        header: 'var(--header-height)',
      },
      minWidth: {
        content: 'var(--min-content-width)',
      },
      maxWidth: {
        content: 'var(--max-content-width)',
      },
      padding: {
        header: 'var(--header-height)',
      },
    },
  },

  plugins: [require('@tailwindcss/line-clamp')],

  corePlugins: {
    preflight: false,
  },
}
